/**
 * Measures the rendered box of an element matching a selector, so aspect-ratio
 * claims can be checked against the real DOM rather than eyeballed.
 *
 *   node scripts/measure-box.mjs "/#work" "section[aria-label=\"How a project runs\"] figure > div"
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME =
  process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const [, , path = "/", selector = "h1"] = process.argv;
const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";
const PORT = 9388;

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--force-device-scale-factor=1",
    "--window-size=1440,900",
    `--user-data-dir=${process.cwd()}/.taste-skill/chrome-measure`,
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
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const p = pending.get(m.id);
    pending.delete(m.id);
    if (m.error) p.reject(new Error(JSON.stringify(m.error)));
    else p.resolve(m.result);
  }
});
const raw = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const i = ++id;
    pending.set(i, { resolve, reject });
    ws.send(JSON.stringify({ id: i, method, params, ...(sessionId ? { sessionId } : {}) }));
    setTimeout(() => {
      if (pending.has(i)) {
        pending.delete(i);
        reject(new Error("timeout " + method));
      }
    }, 60_000);
  });

const { targetId } = await raw("Target.createTarget", { url: "about:blank" });
const { sessionId } = await raw("Target.attachToTarget", { targetId, flatten: true });
const send = (m, p = {}) => raw(m, p, sessionId);
await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url: `${BASE}${path}` });
await sleep(4000);

const { result } = await send("Runtime.evaluate", {
  expression: `(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return JSON.stringify({ found: false });
    const r = el.getBoundingClientRect();
    return JSON.stringify({
      found: true,
      width: Math.round(r.width),
      height: Math.round(r.height),
      ratio: (r.width / r.height).toFixed(3)
    });
  })()`,
  returnByValue: true,
});
console.log(`${path}  ${selector}`);
console.log(`  ${result.value}`);

chrome.kill();
process.exit(0);
