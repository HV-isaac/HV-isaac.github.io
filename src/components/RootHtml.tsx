import { Inter } from "next/font/google";
import type { Locale } from "@/content/types";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Aplica el tema antes del primer pintado para evitar el parpadeo blanco al
 * cargar en oscuro. Inline y sin `defer` a propósito: cualquier otra opción se
 * ejecuta demasiado tarde.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

/**
 * Cada idioma tiene su propio root layout (via route groups) porque `lang` debe
 * ir en <html> y en el App Router solo un root layout puede renderizarlo.
 *
 * `theme = false` en las rutas de impresión: el PDF siempre se genera en claro.
 */
export function RootHtml({
  lang,
  children,
  theme = true,
}: {
  lang: Locale;
  children: React.ReactNode;
  theme?: boolean;
}) {
  return (
    <html lang={lang} suppressHydrationWarning>
      {theme && (
        // La regla `no-head-element` es del Pages Router: allí había que usar
        // `next/head`. En el App Router el layout raíz renderiza <head> directamente.
        // eslint-disable-next-line @next/next/no-head-element
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
      )}
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
