import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("../out", import.meta.url)));

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

/**
 * Sirve `out/` tal cual lo hará GitHub Pages: sin reescrituras, resolviendo
 * `/ruta/` a `/ruta/index.html`. Es deliberadamente tonto — si aquí falta un
 * archivo, también faltará en producción.
 */
export function createStaticServer({ basePath = "" } = {}) {
  return http.createServer((req, res) => {
    let pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);

    if (basePath && pathname.startsWith(basePath)) {
      pathname = pathname.slice(basePath.length) || "/";
    }

    let filePath = path.join(ROOT, pathname);

    // Evita salir de `out/` con rutas tipo `../../etc/passwd`.
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403).end("Forbidden");
      return;
    }

    if (pathname.endsWith("/")) filePath = path.join(filePath, "index.html");
    else if (!path.extname(filePath) && fs.existsSync(`${filePath}/index.html`)) {
      filePath = path.join(filePath, "index.html");
    }

    fs.readFile(filePath, (error, body) => {
      if (error) {
        res.writeHead(404, { "content-type": "text/plain" }).end("Not found");
        return;
      }
      res.writeHead(200, { "content-type": MIME[path.extname(filePath)] ?? "application/octet-stream" });
      res.end(body);
    });
  });
}

export function listen(server, port = 0) {
  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => resolve(server.address().port));
  });
}
