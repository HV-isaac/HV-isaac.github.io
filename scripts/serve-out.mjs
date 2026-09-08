import { createStaticServer, listen } from "./static-server.mjs";

// Previsualiza la build exactamente como la servirá GitHub Pages.
// Útil para comprobar que no hay 404 cuando el sitio vive en una subruta.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const port = Number(process.env.PORT ?? 4173);

await listen(createStaticServer({ basePath }), port);
console.log(`out/ servido en http://127.0.0.1:${port}${basePath}/`);
