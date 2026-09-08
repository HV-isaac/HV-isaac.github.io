import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { createStaticServer, listen } from "./static-server.mjs";

const OUT = path.resolve(fileURLToPath(new URL("../out", import.meta.url)));
const PUBLIC = path.resolve(fileURLToPath(new URL("../public", import.meta.url)));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Genera el PDF imprimiendo la propia web ya construida, de modo que el PDF no
 * puede quedar desincronizado del sitio.
 *
 * Se ejecuta DESPUÉS de `next build`, y escribe cada PDF en dos sitios:
 *
 *   - `out/`    — lo que se despliega en esta misma ejecución.
 *   - `public/` — para que el servidor de desarrollo pueda servirlo, ya que
 *                 `next dev` no ve `out/`. Sin esta copia el botón de descarga
 *                 daría 404 durante todo el desarrollo.
 *
 * Los botones son `<a href>` a estas rutas, no imports, así que no importa que
 * el archivo no exista mientras Next construye.
 */
const TARGETS = [
  { locale: "es", route: "/print/", file: "cv-isaac-hernandez-es.pdf" },
  { locale: "en", route: "/en/print/", file: "cv-isaac-hernandez-en.pdf" },
];

// Imprimir requiere el sitio ya construido. Sin esta comprobación el fallo
// aparecería como un 404 dentro de Playwright, mucho más difícil de leer.
try {
  await fs.access(path.join(OUT, "index.html"));
} catch {
  console.error("No existe out/index.html. Ejecuta primero `npm run build` (o usa `npm run build:full`).");
  process.exit(1);
}

await fs.mkdir(PUBLIC, { recursive: true });

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

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true, // respeta el @page de globals.css
      tagged: true,            // PDF accesible, con estructura semántica
    });

    await Promise.all([
      fs.writeFile(path.join(OUT, target.file), pdf),
      fs.writeFile(path.join(PUBLIC, target.file), pdf),
    ]);

    console.log(`✓ ${target.file}  (${(pdf.length / 1024).toFixed(0)} KB)  → out/ y public/`);
    await page.close();
  }
} finally {
  await context.close();
  await browser.close();
  server.close();
}
