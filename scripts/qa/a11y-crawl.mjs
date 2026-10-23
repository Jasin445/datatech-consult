// Requires a running server (npm run build && npm start) and Google Chrome installed (Playwright channel "chrome").
// Usage: node scripts/qa/a11y-crawl.mjs <baseUrl> <route,route,...>
// 1) crawl internal links from every route, 2) axe WCAG 2.2 AA at 390 and 1280,
// 3) keyboard focus visibility, 4) reduced motion.
import { chromium } from "playwright-core";
import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const axeSource = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const [base, routesArg] = process.argv.slice(2);
const routes = routesArg.split(",");
const browser = await chromium.launch({ channel: "chrome" });
let problems = 0;
const report = (msg) => { problems++; console.log("PROBLEM", msg); };

// 1. Link crawl
const links = new Map();
for (const route of routes) {
  const page = await browser.newPage();
  await page.goto(base + route, { waitUntil: "load" });
  const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  for (const h of hrefs) if (h.startsWith("/") || h.startsWith("#")) links.set(h.startsWith("#") ? route + h : h, route);
  await page.close();
}
for (const [href, from] of links) {
  const [path, hash] = href.split("#");
  const res = await fetch(base + path, { redirect: "manual" });
  if (res.status >= 400) report(`link ${href} (from ${from}) -> ${res.status}`);
  if (hash) {
    const page = await browser.newPage();
    await page.goto(base + path, { waitUntil: "load" });
    if (!(await page.$(`#${hash}`))) report(`anchor #${hash} missing on ${path} (from ${from})`);
    await page.close();
  }
}
console.log(`crawl: ${links.size} unique internal links checked`);

// 2. axe
for (const route of routes) {
  for (const width of [390, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(base + route, { waitUntil: "load" });
    // Let entrance animations finish so contrast is measured on the settled page.
    await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished.catch(() => {}))));
    await page.addScriptTag({ content: axeSource });
    const result = await page.evaluate(async () =>
      axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } }),
    );
    for (const v of result.violations) {
      report(`axe ${route}@${width} [${v.impact}] ${v.id}: ${v.help} -> ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" | ")}`);
    }
    await page.close();
  }
}
console.log("axe: done");

// 3. Keyboard: every focusable element reached by Tab must show a visible outline or box-shadow.
for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(base + route, { waitUntil: "load" });
  const seen = new Set();
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      const visible = (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== "none";
      return { key: el.tagName + (el.getAttribute("href") || el.id || el.textContent?.trim().slice(0, 20)), visible };
    });
    if (!info || seen.has(info.key)) break;
    seen.add(info.key);
    if (!info.visible) report(`focus not visible on ${route}: ${info.key}`);
  }
  if (route === routes[0]) {
    // first Tab must reach the skip link
    await page.goto(base + route, { waitUntil: "load" });
    await page.keyboard.press("Tab");
    const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
    if (first !== "Skip to main content") report(`first Tab stop is "${first}", expected skip link`);
  }
  await page.close();
}
console.log("keyboard: done");

// 4. Reduced motion
{
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(base + routes[0], { waitUntil: "load" });
  const r = await page.evaluate(() => {
    const el = document.querySelector("a.inline-flex, a");
    return { scroll: getComputedStyle(document.documentElement).scrollBehavior, transition: getComputedStyle(el).transitionDuration };
  });
  const durations = r.transition.split(",").map((d) => parseFloat(d));
  if (r.scroll === "smooth" || durations.some((d) => d > 0.01)) report(`reduced motion not respected: ${JSON.stringify(r)}`);
  console.log("reduced motion:", JSON.stringify(r));
  await ctx.close();
}

await browser.close();
console.log(problems ? `${problems} problems` : "ALL CHECKS PASSED");
