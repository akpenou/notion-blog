import { MetadataRoute } from "next"
import { CONFIG } from "site.config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${CONFIG.link}/sitemap.xml`,
  }
}
