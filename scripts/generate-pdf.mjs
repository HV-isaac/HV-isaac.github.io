import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { createStaticServer, listen } from "./static-server.mjs";

const OUT = path.resolve(fileURLToPath(new URL("../out", import.meta.url)));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Genera el PDF imprimiendo la propia web ya construida, de modo que el PDF no
 * puede quedar desincronizado del sitio.
 *
 * Se ejecuta DESPUÉS de `next build`: escribe los archivos dentro de `out/`,
 * justo antes de que se suban a GitHub Pages. Los botones de descarga son
 * `<a href>` a estas rutas, no imports, así que no importa que no existan
 * mientras Next construye.
 */
const TARGETS = [
  { locale: "es", route: "/print/", file: "cv-isaac-hernandez-es.pdf" },
  { locale: "en", route: "/en/print/", file: "cv-isaac-hernandez-en.pdf" },
];

const server = createStaticServer({ basePath });
const port = await listen(server);
const origin = `http://127.0.0.1:${port}${basePath}`;

const browser = await chromium.launch();
const context = await browser.newContext({
  // El PDF va siempre en claro, pase lo que pase con la preferencia del sistema.
  colorScheme: "light",
});

try {
  for (const target of TARGETS) {
    const page = await context.newPage();
    const url = `${origin}${target.route}`;

    const response = await page.goto(url, { waitUntil: "networkidle" });
    if (!response?.ok()) {
      throw new Error(`No se pudo cargar ${url} (HTTP ${response?.status()})`);
    }

    // Sin esto la primera página puede imprimirse con la fuente de reserva.
    await page.evaluate(() => document.fonts.ready);

    await page.pdf({
      path: path.join(OUT, target.file),
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true, // respeta el @page de globals.css
      tagged: true,            // PDF accesible, con estructura semántica
    });

    const { size } = await fs.stat(path.join(OUT, target.file));
    console.log(`✓ ${target.file}  (${(size / 1024).toFixed(0)} KB)`);
    await page.close();
  }
} finally {
  await context.close();
  await browser.close();
  server.close();
}
