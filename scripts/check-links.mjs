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

// Los enlaces de descarga se leen del HTML ya construido en lugar de escribirlos
// aquí a mano: si el nombre del PDF cambia en el sitio pero no en el generador
// (o al revés), esto lo detecta, en vez de seguir comprobando un nombre viejo
// que ya no usa nadie.
//
// Los certificados se recogen igual, por su extensión: son archivos de
// `public/` enlazados a mano, y uno que falte daría 404 solo en producción.
const downloads = new Set();

for (const route of ["/", "/en/", "/print/", "/en/print/"]) {
  const res = await page.goto(`${origin}${route}`, { waitUntil: "networkidle" });
  console.log(`${res.status()}  ${route}`);

  // Las rutas de impresión no llevan botón de descarga: sería redundante.
  if (route.includes("print")) continue;

  const href = await page.getAttribute("a[download]", "href");
  if (href) downloads.add(href);
  else failures.push(`${route} no tiene enlace de descarga`);

  const pdfLinks = await page.$$eval('a[href$=".pdf"]', (links) =>
    links.map((link) => link.getAttribute("href")),
  );
  for (const link of pdfLinks) downloads.add(link);
}

for (const href of downloads) {
  const res = await page.request.get(new URL(href, origin).toString());
  const body = res.ok() ? await res.body() : Buffer.alloc(0);
  const isPdf = body.subarray(0, 5).toString() === "%PDF-";

  console.log(
    `${res.status()}  ${href}${isPdf ? `  (PDF, ${(body.length / 1024).toFixed(0)} KB)` : ""}`,
  );

  if (!res.ok()) failures.push(`${res.status()} ${href}`);
  // Un 200 no basta: bastaría con que el servidor devolviera el index.html para
  // cualquier ruta y el botón "descargaría" una página HTML.
  else if (!isPdf) failures.push(`${href} responde 200 pero no es un PDF`);
}

await browser.close();
server.close();

if (failures.length) {
  console.log("\nFALLOS:");
  for (const f of failures) console.log("  " + f);
  process.exit(1);
}
console.log("\nSin 404 ni errores de consola.");
