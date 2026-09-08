import type { MetadataRoute } from "next";
import { asset } from "@/lib/asset";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Las rutas de impresión solo existen para generar el PDF.
      disallow: [asset("/print/"), asset("/en/print/")],
    },
    ...(siteUrl ? { sitemap: `${siteUrl}${asset("/sitemap.xml")}` } : {}),
  };
}
