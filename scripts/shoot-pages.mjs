/**
 * Screenshots the studio's own pages from a running local server, so the
 * multipage build can be reviewed at both widths. Same dependency-free
 * CDP approach as capture-sites.mjs.
 *
 *   npm run build && npm start        # in another shell
 *   node scripts/shoot-pages.mjs
 *
 * Output: .taste-skill/pages/<name>-<desktop|mobile>[-full].jpg
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";
const OUT = ".taste-skill/pages";
const PORT = 9355;
mkdirSync(OUT, { recursive: true });

const PAGES = [
  { name: "home", path: "/" },
  { name: "work-index", path: "/work" },
  { name: "case-study", path: "/work/lifeline-hospitals" },
  { name: "case-study-live", path: "/work/premiumsafeboxes" },
  { name: "services-index", path: "/services" },
  { name: "service-page", path: "/services/web-design" },
  { name: "service-page-2", path: "/services/lead-generation" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
  { name: "privacy", path: "/privacy-policy" },
  { name: "not-found", path: "/definitely-not-a-real-page" },
];

const VIEWPORTS = [
  { label: "desktop", width: 1440, height: 900 },
  { label: "mobile", width: 390, height: 844 },
];

/* ── Tiny CDP client over the global WebSocket ─────────────────── */
class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.events = new Map();
    ws.addEventListener("message", (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      } else if (msg.method) {
        for (const fn of this.events.get(msg.method) ?? []) fn(msg.params);
      }
    });
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`CDP timeout: ${method}`));
        }
      }, 60_000);
    });
  }
  once(method) {
    return new Promise((resolve) => {
      const fn = (params) => {
        this.events.set(method, (this.events.get(method) ?? []).filter((f) => f !== fn));
        resolve(params);
      };
      this.events.set(method, [...(this.events.get(method) ?? []), fn]);
    });
  }
}

async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", () => reject(new Error("ws error")), { once: true });
  });
  return new CDP(ws);
}

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--force-device-scale-factor=1",
    `--user-data-dir=${process.cwd()}/.taste-skill/chrome-shots`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

let wsUrl;
for (let i = 0; i < 60; i++) {
  try {
    wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json())
      .webSocketDebuggerUrl;
    break;
  } catch {
    await sleep(250);
  }
}
const browser = await connect(wsUrl);

const consoleErrors = [];

for (const page of PAGES) {
  for (const vp of VIEWPORTS) {
    const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await browser.send("Target.attachToTarget", {
      targetId,
      flatten: true,
    });
    const send = (method, params = {}) => browser.send(method, params, sessionId);

    try {
      await send("Page.enable");
      await send("Runtime.enable");
      await send("Log.enable");
      await send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.label === "mobile",
      });

      const loaded = browser.once("Page.loadEventFired");
      await send("Page.navigate", { url: `${BASE}${page.path}` });
      await Promise.race([loaded, sleep(30_000)]);
      await sleep(1200);

      // Surface anything the page logged as an error.
      const { result } = await send("Runtime.evaluate", {
        expression: `JSON.stringify({
          title: document.title,
          h1: [...document.querySelectorAll('h1')].map(h => h.textContent.trim()),
          h1count: document.querySelectorAll('h1').length,
          height: document.documentElement.scrollHeight,
          brokenImages: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.currentSrc || i.src),
          missingAlt: [...document.images].filter(i => !i.hasAttribute('alt')).length
        })`,
        returnByValue: true,
      });
      const info = JSON.parse(result.value);

      if (info.h1count !== 1) {
        consoleErrors.push(`${page.path} [${vp.label}] h1 count = ${info.h1count}`);
      }
      if (info.brokenImages.length) {
        consoleErrors.push(
          `${page.path} [${vp.label}] broken images: ${info.brokenImages.join(", ")}`,
        );
      }
      if (info.missingAlt) {
        consoleErrors.push(`${page.path} [${vp.label}] ${info.missingAlt} image(s) without alt`);
      }

      // Fold shot.
      const fold = await send("Page.captureScreenshot", { format: "jpeg", quality: 82 });
      writeFileSync(
        `${OUT}/${page.name}-${vp.label}.jpg`,
        Buffer.from(fold.data, "base64"),
      );

      // Full-page shot for the desktop pass only.
      if (vp.label === "desktop") {
        await send("Emulation.setDeviceMetricsOverride", {
          width: vp.width,
          height: Math.min(info.height, 16000),
          deviceScaleFactor: 1,
          mobile: false,
        });
        await sleep(900);
        const full = await send("Page.captureScreenshot", {
          format: "jpeg",
          quality: 74,
          captureBeyondViewport: true,
          clip: { x: 0, y: 0, width: vp.width, height: Math.min(info.height, 16000), scale: 1 },
        });
        writeFileSync(
          `${OUT}/${page.name}-desktop-full.jpg`,
          Buffer.from(full.data, "base64"),
        );
      }

      console.log(
        `ok    ${page.name.padEnd(18)} ${vp.label.padEnd(8)} h1=${info.h1count} ${info.height}px  "${info.title}"`,
      );
    } catch (err) {
      console.error(`fail  ${page.name} [${vp.label}]: ${err.message}`);
      consoleErrors.push(`${page.path} [${vp.label}] render failed: ${err.message}`);
    } finally {
      await browser.send("Target.closeTarget", { targetId }).catch(() => {});
    }
  }
}

chrome.kill();
if (consoleErrors.length) {
  console.log("\nISSUES");
  for (const issue of consoleErrors) console.log("  - " + issue);
} else {
  console.log("\nno structural issues found");
}
process.exit(0);
