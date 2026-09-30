import { readFile, access } from "node:fs/promises";
import assert from "node:assert/strict";
const html = await readFile("dist/index.html", "utf8");
assert(!html.includes("<!-- PROJECTS -->"));
assert(!html.includes("<!-- LIVE SYSTEMS -->"));
const liveSystems = JSON.parse(
  await readFile("content/live-systems.json", "utf8"),
);
for (const system of liveSystems)
  assert(
    html.includes(`href="${system.url}"`),
    `Missing live link: ${system.name}`,
  );
for (const id of [
  "work",
  "about",
  "services",
  "expertise",
  "approach",
  "contact",
  "myapp",
  "pos",
  "invoices",
])
  assert(html.includes(`id="${id}"`), `Missing ${id}`);
for (const href of [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(
  (m) => m[1],
)) {
  if (/^(https?:|mailto:|data:)/.test(href)) continue;
  const path = href.split("?")[0];
  await access(
    `dist/${path.replace(/^\//, "")}${path.endsWith("/") ? "index.html" : ""}`,
  );
}
const legacy = await readFile("dist/developer/index.html", "utf8");
assert(legacy.includes('id="command-input"'));
assert(legacy.includes('href="/"'));
assert(legacy.includes('src="/js/terminal.js"'));
const source = await readFile("assets/motion.js", "utf8");
assert(source.includes("prefers-reduced-motion"));
console.log(
  "Static assets, section anchors, project rendering and legacy route checks passed.",
);
