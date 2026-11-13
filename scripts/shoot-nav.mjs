/**
 * Captures the two interactive navigation states that a static page shot
 * cannot show: the desktop services dropdown and the open mobile menu.
 *
 *   node scripts/shoot-nav.mjs
 *
 * Output: .taste-skill/pages/nav-*.jpg
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";
const OUT = ".taste-skill/pages";
const PORT = 9366;
mkdirSync(OUT, { recursive: true });

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
      const fn = (p) => {
        this.events.set(method, (this.events.get(method) ?? []).filter((f) => f !== fn));
        resolve(p);
      };
      this.events.set(method, [...(this.events.get(method) ?? []), fn]);
    });
  }
}

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--force-device-scale-factor=1",
    `--user-data-dir=${process.cwd()}/.taste-skill/chrome-nav`,
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
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
const browser = new CDP(ws);

async function openTab(width, height, mobile) {
  const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await browser.send("Target.attachToTarget", { targetId, flatten: true });
  const send = (m, p = {}) => browser.send(m, p, sessionId);
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
  });
  return { targetId, send };
}

async function evaluate(send, expression) {
  const { result } = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.value;
}

async function shot(send, name, quality = 84) {
  const img = await send("Page.captureScreenshot", { format: "jpeg", quality });
  writeFileSync(`${OUT}/${name}.jpg`, Buffer.from(img.data, "base64"));
  console.log(`ok    ${name}.jpg`);
}

/* ── 1. Desktop: open the services dropdown with the pointer ────── */
{
  const { targetId, send } = await openTab(1440, 900, false);
  const loaded = browser.once("Page.loadEventFired");
  await send("Page.navigate", { url: `${BASE}/work` });
  await Promise.race([loaded, sleep(20_000)]);
  await sleep(1200);

  // Drive it exactly as a pointer user would: hover the Services item.
  await evaluate(
    send,
    `(() => {
      const btn = document.querySelector('[aria-controls="services-menu"]');
      const wrapper = btn.closest('div');
      wrapper.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      wrapper.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false }));
      return true;
    })()`,
  );
  await sleep(500);

  const open = await evaluate(
    send,
    `document.querySelector('[aria-controls="services-menu"]').getAttribute('aria-expanded')`,
  );
  if (open !== "true") {
    // Fall back to a click, which is what keyboard and touch users do.
    await evaluate(send, `document.querySelector('[aria-controls="services-menu"]').click()`);
    await sleep(400);
  }

  const panel = await evaluate(
    send,
    `(() => {
      const el = document.getElementById('services-menu');
      const links = [...el.querySelectorAll('a')];
      const r = el.getBoundingClientRect();
      return JSON.stringify({
        hidden: el.hasAttribute('hidden'),
        links: links.length,
        firstLinkHeight: links[0] ? Math.round(links[0].getBoundingClientRect().height) : 0,
        label: links[0] ? links[0].textContent.trim() : null,
        withinViewport: r.left >= 0 && r.right <= window.innerWidth,
        width: Math.round(r.width)
      });
    })()`,
  );
  console.log("      dropdown:", panel);
  await shot(send, "nav-services-dropdown");
  await browser.send("Target.closeTarget", { targetId }).catch(() => {});
}

/* ── 2. Mobile: open the menu and check every target is reachable ── */
{
  const { targetId, send } = await openTab(390, 844, true);
  const loaded = browser.once("Page.loadEventFired");
  await send("Page.navigate", { url: `${BASE}/` });
  await Promise.race([loaded, sleep(20_000)]);
  await sleep(1200);

  await evaluate(send, `document.querySelector('[aria-label="Open menu"]').click()`);
  await sleep(600);

  const audit = await evaluate(
    send,
    `(() => {
      const dialog = document.getElementById('mobile-menu');
      if (!dialog) return JSON.stringify({ error: 'no dialog' });
      const links = [...dialog.querySelectorAll('a')];
      const tooSmall = links
        .map(a => ({ t: a.textContent.trim().slice(0, 28), h: Math.round(a.getBoundingClientRect().height) }))
        .filter(x => x.h < 44);
      return JSON.stringify({
        linkCount: links.length,
        tooSmall,
        scrollHeight: dialog.scrollHeight,
        clientHeight: dialog.clientHeight,
        needsScroll: dialog.scrollHeight > dialog.clientHeight + 2,
        emailVisible: /connect@/.test(dialog.textContent)
      });
    })()`,
  );
  console.log("      mobile menu:", audit);
  await shot(send, "nav-mobile-menu");

  // And once scrolled to the bottom of the menu, so the contact block is checked.
  await evaluate(send, `document.getElementById('mobile-menu').scrollTop = 99999`);
  await sleep(300);
  await shot(send, "nav-mobile-menu-bottom");
  await browser.send("Target.closeTarget", { targetId }).catch(() => {});
}

/* ── 3. Keyboard: focus moves into the panel and Escape closes it ── */
{
  const { targetId, send } = await openTab(1440, 900, false);
  const loaded = browser.once("Page.loadEventFired");
  await send("Page.navigate", { url: `${BASE}/services/web-design` });
  await Promise.race([loaded, sleep(20_000)]);
  await sleep(1200);

  const result = await evaluate(
    send,
    `(async () => {
      const btn = document.querySelector('[aria-controls="services-menu"]');
      btn.focus();
      btn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      btn.click();
      await new Promise(r => setTimeout(r, 350));
      const opened = btn.getAttribute('aria-expanded');
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await new Promise(r => setTimeout(r, 350));
      const closed = btn.getAttribute('aria-expanded');
      const refocused = document.activeElement === btn;
      return JSON.stringify({ opened, closed, refocused });
    })()`,
  );
  console.log("      keyboard:", result);
  await browser.send("Target.closeTarget", { targetId }).catch(() => {});
}

chrome.kill();
process.exit(0);
