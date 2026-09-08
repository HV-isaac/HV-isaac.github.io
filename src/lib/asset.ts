const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Antepone el basePath a un asset estático.
 *
 * `next/link` y `next/image` aplican el basePath solos, pero un `<a href>` hacia
 * un archivo de `public/` (el PDF, el favicon) no pasa por Next: hay que
 * construir la ruta a mano o se rompe cuando el sitio vive en una subruta de
 * GitHub Pages.
 */
export function asset(path: string): string {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
