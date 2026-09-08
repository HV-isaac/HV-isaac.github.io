import type { NextConfig } from "next";

/**
 * El sitio se publica como HTML estático en GitHub Pages, así que no hay runtime
 * de Node en producción: nada de API Routes, Server Actions ni optimización de
 * imágenes bajo demanda.
 *
 * `basePath` depende del nombre del repositorio:
 *   - repo `<usuario>.github.io`  -> el sitio vive en la raíz -> dejar vacío
 *   - repo `cv` (o cualquier otro) -> el sitio vive en /cv    -> NEXT_PUBLIC_BASE_PATH=/cv
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
