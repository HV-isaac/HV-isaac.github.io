import type { Metadata } from "next";
import { asset } from "@/lib/asset";
import { localePath, otherLocale, siteUrl } from "@/lib/site";
import type { ResumeData } from "@/content/types";

/** Metadatos de una página pública, con enlaces alternos entre idiomas. */
export function pageMetadata(data: ResumeData): Metadata {
  const other = otherLocale(data.locale);

  return {
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    title: data.meta.title,
    description: data.meta.description,
    authors: [{ name: data.profile.name }],
    // A diferencia de `next/link`, los metadatos no reciben el basePath
    // automáticamente: hay que aplicarlo a mano o el canonical apunta a la raíz
    // del dominio en vez de a la subruta donde vive el sitio.
    alternates: {
      canonical: asset(localePath[data.locale]),
      languages: {
        [data.locale]: asset(localePath[data.locale]),
        [other]: asset(localePath[other]),
      },
    },
    openGraph: {
      type: "profile",
      locale: data.locale === "es" ? "es_MX" : "en_US",
      title: data.meta.title,
      description: data.meta.description,
      url: asset(localePath[data.locale]),
    },
    twitter: {
      card: "summary",
      title: data.meta.title,
      description: data.meta.description,
    },
  };
}

/** Las rutas de impresión existen solo para generar el PDF: fuera del índice. */
export const printMetadata = (data: ResumeData): Metadata => ({
  title: data.meta.title,
  robots: { index: false, follow: false },
});
