import type { MetadataRoute } from "next";

const SUPPORTED = ["en", "ar", "fr", "ja", "ru", "he"] as const;

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://keymundo.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      crawlDelay: 1,
    },
    sitemap: [`${base}/sitemap.xml`],
    host: base,
  };
}

