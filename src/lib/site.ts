import { es } from "@/content/es";
import { en } from "@/content/en";
import type { Locale, ResumeData } from "@/content/types";

export const locales: Locale[] = ["es", "en"];

export const resumes: Record<Locale, ResumeData> = { es, en };

/** Ruta pública de cada idioma. El español es el idioma por defecto y vive en la raíz. */
export const localePath: Record<Locale, string> = { es: "/", en: "/en/" };

export const otherLocale = (locale: Locale): Locale => (locale === "es" ? "en" : "es");

/** Nombre de archivo del PDF generado para cada idioma. */
export const pdfFile = (locale: Locale) => `cv-isaac-hernandez-${locale}.pdf`;

/**
 * URL pública del sitio. Se usa solo para metadatos absolutos (Open Graph).
 * Se define en el workflow de despliegue; en local no hace falta.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
