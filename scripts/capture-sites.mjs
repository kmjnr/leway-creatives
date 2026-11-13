/**
 * Captures long, full-page screenshots of the live project sites through the
 * Chrome DevTools Protocol — no Playwright, no Puppeteer, no extra deps.
 *
 *   node scripts/capture-sites.mjs [slug ...]
 *
 * Output: .taste-skill/full/<slug>.png (1440px wide, whole page).
 * The images are used to slice real case-study galleries; nothing is faked.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT_DIR = ".taste-skill/full";
const PORT = 9333;
const WIDTH = 1440;

const SITES = {
  "lifeline-hospitals": "https://thelifelinegroupofhospitals.netlify.app/",
  adorntech: "https://adorntech.netlify.app",
  overlandhire: "https://overlandhire.netlify.app",
  solarizeke: "https://solarizeke.netlify.app",
  forestwood: "https://fleetwoodltd.netlify.app/",
  "hadiyed-flowers": "https://hadiyedflowersecomm.netlify.app",
  paidtaskers: "https://paidtaskers.app",
  docsfast: "https://docsfast.tech",
  curatelove: "https://curatelove.netlify.app/",
  premiumsafeboxes: "https://premiumsafeboxes.netlify.app",
};

const wanted = process.argv.slice(2);
const targets = Object.entries(SITES).filter(
  ([slug]) => wanted.length === 0 || wanted.includes(slug),
);

mkdirSync(OUT_DIR, { recursive: true });

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
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
      } else if (msg.method) {
        for (const fn of this.events.get(msg.method) ?? []) fn(msg.params);
      }
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
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
      const list = this.events.get(method) ?? [];
      const fn = (params) => {
        this.events.set(method, (this.events.get(method) ?? []).filter((f) => f !== fn));
        resolve(params);
      };
      this.events.set(method, [...list, fn]);
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

/* ── Launch one Chrome and reuse a fresh tab per site ──────────── */
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
    "--window-size=1440,900",
    `--user-data-dir=${process.cwd()}/.taste-skill/chrome-profile`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

async function browserWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      return (await res.json()).webSocketDebuggerUrl;
    } catch {
      await sleep(250);
    }
  }
  throw new Error("Chrome did not expose a debugging port");
}

const browser = await connect(await browserWs());

const results = [];
for (const [slug, url] of targets) {
  const dest = `${OUT_DIR}/${slug}.png`;
  if (existsSync(dest) && !process.env.FORCE) {
    console.log(`skip  ${slug} (exists — set FORCE=1 to recapture)`);
    continue;
  }
  const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await browser.send("Target.attachToTarget", { targetId, flatten: true });

  const send = (method, params) =>
    browser.send(method, params).catch((err) => {
      throw err;
    });

  // Route session-scoped messages through the flat session id.
  const tab = {
    send: (method, params = {}) => {
      const id = ++browser.id;
      return new Promise((resolve, reject) => {
        browser.pending.set(id, { resolve, reject });
        browser.ws.send(JSON.stringify({ id, method, params, sessionId }));
        setTimeout(() => {
          if (browser.pending.has(id)) {
            browser.pending.delete(id);
            reject(new Error(`CDP timeout: ${method}`));
          }
        }, 60_000);
      });
    },
    once: (method) => {
      return new Promise((resolve) => {
        const fn = (params) => {
          browser.events.set(method, (browser.events.get(method) ?? []).filter((f) => f !== fn));
          resolve(params);
        };
        browser.events.set(method, [...(browser.events.get(method) ?? []), fn]);
      });
    },
  };

  try {
    await tab.send("Page.enable");
    await tab.send("Runtime.enable");
    await tab.send("Emulation.setDeviceMetricsOverride", {
      width: WIDTH,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    const loaded = tab.once("Page.loadEventFired");
    await tab.send("Page.navigate", { url });
    await Promise.race([loaded, sleep(30_000)]);
    await sleep(2500); // fonts, lazy images, entry animations

    // Scroll the whole page once so lazy content loads, then return to top.
    await tab.send("Runtime.evaluate", {
      expression: `(async () => {
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 150));
        }
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 500));
        return document.documentElement.scrollHeight;
      })()`,
      awaitPromise: true,
    });

    // Grow the viewport to the whole document. Every lazy image is now inside
    // the viewport, so IntersectionObserver fires and nothing is captured as
    // an empty placeholder card.
    const { result: heightResult } = await tab.send("Runtime.evaluate", {
      expression: "document.documentElement.scrollHeight",
      returnByValue: true,
    });
    const fullHeight = Math.round(heightResult.value);

    await tab.send("Emulation.setDeviceMetricsOverride", {
      width: WIDTH,
      height: Math.min(fullHeight, 12000),
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(1200);

    // Second scroll pass at the tall viewport, so anything still deferred
    // gets a chance, then wait for decode.
    await tab.send("Runtime.evaluate", {
      expression: `(async () => {
        for (const img of document.images) {
          img.loading = "eager";
          if (!img.complete) img.dispatchEvent(new Event("loadstart"));
        }
        await Promise.all(
          [...document.images].map(img =>
            img.complete ? null : new Promise(r => {
              img.addEventListener("load", r, { once: true });
              img.addEventListener("error", r, { once: true });
            })
          )
        );
        await new Promise(r => setTimeout(r, 600));
        return document.images.length;
      })()`,
      awaitPromise: true,
    });
    await sleep(800);

    const { result } = await tab.send("Runtime.evaluate", {
      expression: "Math.min(document.documentElement.scrollHeight, 12000)",
      returnByValue: true,
    });
    const height = Math.round(result.value);

    const shot = await tab.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: WIDTH, height, scale: 1 },
    });

    writeFileSync(dest, Buffer.from(shot.data, "base64"));
    results.push({ slug, height });
    console.log(`ok    ${slug}  ${WIDTH}x${height}`);
  } catch (err) {
    console.error(`fail  ${slug}: ${err.message}`);
  } finally {
    await browser.send("Target.closeTarget", { targetId }).catch(() => {});
  }
}

chrome.kill();
writeFileSync(`${OUT_DIR}/captures.json`, JSON.stringify(results, null, 2));
process.exit(0);
