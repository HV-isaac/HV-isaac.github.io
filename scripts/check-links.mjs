import { chromium } from "playwright";
import { createStaticServer, listen } from "./static-server.mjs";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const server = createStaticServer({ basePath });
const port = await listen(server);
const origin = `http://127.0.0.1:${port}${basePath}`;

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();

const failures = [];
page.on("response", (r) => {
  if (r.status() >= 400) failures.push(`${r.status()} ${r.url()}`);
});
page.on("pageerror", (e) => failures.push(`JS error: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") failures.push(`console: ${m.text()}`);
});

for (const route of ["/", "/en/", "/print/", "/en/print/"]) {
  const res = await page.goto(`${origin}${route}`, { waitUntil: "networkidle" });
  console.log(`${res.status()}  ${route}`);
}

// Los PDFs se sirven desde la misma raíz que los enlaces de descarga.
for (const f of ["cv-isaac-hernandez-es.pdf", "cv-isaac-hernandez-en.pdf"]) {
  const res = await page.request.get(`${origin}/${f}`);
  console.log(`${res.status()}  /${f}`);
  if (!res.ok()) failures.push(`${res.status()} /${f}`);
}

await browser.close();
server.close();

if (failures.length) {
  console.log("\nFALLOS:");
  for (const f of failures) console.log("  " + f);
  process.exit(1);
}
console.log("\nSin 404 ni errores de consola.");
