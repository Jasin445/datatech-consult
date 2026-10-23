// Requires a running server (npm run build && npm start) and Google Chrome installed (Playwright channel "chrome").
// Usage: node scripts/qa/responsive.mjs <baseUrl> <route,route,...> [shotsDir]
import { chromium } from "playwright-core";
import fs from "node:fs";

const [base, routesArg, shots] = process.argv.slice(2);
const routes = routesArg.split(",");
const widths = [320, 390, 820, 1280, 1680];
const browser = await chromium.launch({ channel: "chrome", headless: true });
if (shots) fs.mkdirSync(shots, { recursive: true });
let failures = 0;

for (const route of routes) {
  for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    const res = await page.goto(base + route, { waitUntil: "load" });
    const info = await page.evaluate(() => {
      const doc = document.documentElement;
      const wide = [...document.querySelectorAll("body *")]
        .filter((el) => el.getBoundingClientRect().right > doc.clientWidth + 1)
        .slice(0, 3)
        .map((el) => el.tagName + "." + (el.className?.toString?.() || "").slice(0, 50));
      return {
        overflow: doc.scrollWidth > doc.clientWidth,
        wide,
        h1: document.querySelectorAll("h1").length,
        title: document.title,
      };
    });
    const ok = res.status() < 400 && !info.overflow && info.h1 === 1 && errors.length === 0;
    if (!ok) failures++;
    console.log(`${ok ? "OK  " : "FAIL"} ${route} @${w} status=${res.status()} h1=${info.h1} overflow=${info.overflow} ${info.wide.join(" | ")} ${errors.join(" ; ")}`);
    if (shots && (w === 390 || w === 1280)) {
      await page.screenshot({ path: `${shots}/${route.replace(/\//g, "_") || "_home"}-${w}.png`, fullPage: true });
    }
    await page.close();
  }
}
await browser.close();
console.log(failures ? `${failures} failures` : "all passed");
process.exit(failures ? 1 : 0);
