import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Aviso al arrancar `next dev`.
 *
 * Los PDF los genera la build, no el servidor de desarrollo, así que en un clon
 * recién descargado el botón de descarga daría 404 sin ninguna explicación.
 * Esto no bloquea nada: solo dice qué hay que ejecutar.
 */
const PUBLIC = path.resolve(fileURLToPath(new URL("../public", import.meta.url)));

const missing = ["Jesus-Isaac-Hernandez-Valdez-CV-es.pdf", "Jesus-Isaac-Hernandez-Valdez-CV-en.pdf"].filter(
  (file) => !fs.existsSync(path.join(PUBLIC, file)),
);

if (missing.length > 0) {
  console.warn(
    [
      "",
      "  Aviso: aún no se han generado los PDF, así que el botón «Descargar CV",
      "  en PDF» dará 404 en desarrollo.",
      "",
      "  Ejecuta `npm run build:full` una vez y el botón funcionará.",
      "",
    ].join("\n"),
  );
}
