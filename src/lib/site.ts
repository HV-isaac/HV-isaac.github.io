import { es } from "@/content/es";
import { en } from "@/content/en";
import type { Locale, ResumeData } from "@/content/types";

export const locales: Locale[] = ["es", "en"];

export const resumes: Record<Locale, ResumeData> = { es, en };

/** Ruta pública de cada idioma. El español es el idioma por defecto y vive en la raíz. */
export const localePath: Record<Locale, string> = { es: "/", en: "/en/" };

export const otherLocale = (locale: Locale): Locale => (locale === "es" ? "en" : "es");

/**
 * Nombre del PDF descargable. Lleva el nombre completo porque acaba en la
 * carpeta de descargas de quien lo abre: "cv-es.pdf" allí no dice nada.
 *
 * Sin acentos a propósito, para no depender de cómo escape cada cliente los
 * caracteres no ASCII en una URL.
 *
 * `scripts/generate-pdf.mjs` genera exactamente estos nombres; `npm run check`
 * comprueba que no se hayan separado, leyendo el enlace real del HTML ya
 * construido.
 */
export const pdfFile = (locale: Locale) => `Jesus-Isaac-Hernandez-Valdez-CV-${locale}.pdf`;

/**
 * URL pública del sitio. Se usa solo para metadatos absolutos (Open Graph).
 * Se define en el workflow de despliegue; en local no hace falta.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
