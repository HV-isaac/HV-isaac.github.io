import type { MetadataRoute } from "next";
import { asset } from "@/lib/asset";
import { localePath, locales, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Sin URL pública configurada no se puede emitir un sitemap válido: exige
  // URLs absolutas. Mejor un sitemap vacío que uno con rutas relativas.
  if (!siteUrl) return [];

  return locales.map((locale) => ({
    url: `${siteUrl}${asset(localePath[locale])}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === "es" ? 1 : 0.8,
  }));
}
