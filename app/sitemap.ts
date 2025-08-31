import type { MetadataRoute } from "next";
import {
  SUPPORTED_LOCALES,
  KEYBOARD_SLUGS,
  CATEGORY_BY_LOCALE,
  type Locale,
} from "@/lib/i18n-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://keymundo.com";
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // Add descriptive multilingual keyboard URLs
  for (const locale of SUPPORTED_LOCALES) {
    const category = CATEGORY_BY_LOCALE[locale as Locale];
    for (const [code, slugs] of Object.entries(KEYBOARD_SLUGS)) {
      const slug = slugs[locale as Locale];
      entries.push({
        url: `${base}/${category}/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  return entries;
}
