import { readFile, writeFile, mkdir, cp } from "node:fs/promises";
const projects = JSON.parse(await readFile("content/projects.json", "utf8"));
const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const previews = {
  workflow: `<div class="erp-preview"><div class="preview-toolbar"><span class="app-mark">M</span> MyApp <span class="preview-tag">BUSINESS WORKSPACE</span></div><div class="erp-body"><div class="preview-eyebrow">ONE CONNECTED WORKFLOW</div><h4>Every document.<br>One clear next step.</h4><div class="workflow"><span><b>01</b> Purchase order</span><i>↗</i><span><b>02</b> Delivery challan</span><i>↗</i><span><b>03</b> Invoice & payment</span></div><div class="document-stack"><div>PO<span>ORDER RECEIVED</span></div><div>DC<span>DELIVERY RECORDED</span></div><div>INV<span>READY TO BILL</span></div></div></div></div>`,
  pos: `<div class="real-preview"><a href="/assets/pos-demo-1440.webp" target="_blank" rel="noopener noreferrer" aria-label="View full-size Ledger POS demo screenshot"><img src="/assets/pos-demo-1440.webp" srcset="/assets/pos-demo-720.webp 720w, /assets/pos-demo-1440.webp 1440w" sizes="(max-width:700px) 88vw, 87vw" width="1440" height="1000" alt="Actual Ledger POS demo dashboard showing sales, checkout terminals, shifts and invoicing, using fictional PrimeMart data" loading="lazy"><span>View full-size capture ↗</span></a></div>`,
  invoice: `<div class="invoice-preview"><div class="preview-toolbar"><span class="app-mark">I</span> InvoicePro <span class="preview-tag">ACCOUNTS RECEIVABLE</span></div><div class="invoice-body"><div><div class="preview-eyebrow">BILLING, WITH CLARITY</div><h4>Less chasing.<br>More visibility.</h4><div class="balance"><small>Illustrative balance</small><strong>Rs 12,000</strong><span>PARTIALLY PAID</span></div></div><div class="paper"><span>STUDIO EXAMPLE</span><h5>Invoice</h5><small>INV-001 · Sample only</small><hr><div>Development <b>20,000</b></div><div>Payment <b>−8,000</b></div><hr><div>Balance <b>12,000</b></div><div class="paper-line"></div><div class="paper-line short"></div></div></div></div>`,
};
const cards = projects
  .map(
    (p) =>
      `<article class="project reveal" id="${esc(p.id)}"><div class="project-heading"><span class="mono">${p.number} / ${esc(p.category)}</span><h3>${esc(p.name)}</h3></div><figure class="project-preview">${previews[p.preview]}<figcaption>${esc(p.caption)}</figcaption></figure><div class="project-copy"><div><h4>${esc(p.headline)}</h4><p>${esc(p.summary)}</p><p class="project-role">${esc(p.role)}</p><div class="tags">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</div></div><div><ul>${p.capabilities.map((c) => `<li>${esc(c)}</li>`).join("")}</ul><details><summary>Inside the engineering <span>+</span></summary><p>${esc(p.decision)}</p></details><div class="project-links">${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener noreferrer">View repository ↗</a>` : '<span class="private-note">Private repository</span>'}${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer">Visit application ↗</a>` : ""}</div></div></div></article>`,
  )
  .join("");
let html = await readFile("src/index.html", "utf8");
html = html.replace("<!-- PROJECTS -->", cards);
await writeFile("index.html", html);
await mkdir("dist", { recursive: true });
for (const path of [
  "index.html",
  "assets",
  "developer",
  "css",
  "js",
  "resume",
  "cover-letter",
  "robots.txt",
  "sitemap.xml",
  ".nojekyll",
])
  await cp(path, `dist/${path}`, { recursive: true });
console.log("Built static portfolio and Developer Mode in dist/.");
