import type { Metadata } from "next";
import {
  SUPPORTED_LOCALES,
  CATEGORY_BY_LOCALE,
  KEYBOARD_SLUGS,
  localeFromCategorySegment,
  codeFromSlug,
  pathFor,
} from "@/lib/i18n-routes";

type Params = { category: string; slug: string };

export async function generateMetadata(props: any): Promise<Metadata> {
  const params = props?.params as Params;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://keymundo.com";
  const locale = localeFromCategorySegment(params.category);
  if (!locale) return {};

  const code = codeFromSlug(locale, params.slug);
  if (!code) return {};

  // Title/description derived from slugs for now
  const title = `KeyMundo — ${params.slug} virtual keyboard`;
  const description = `Type with the ${params.slug} keyboard. Multilingual, free, with voice input and instant translation.`;

  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) {
    languages[l] = `${base}${pathFor(code, l)}`;
  }
  languages["x-default"] = `${base}${pathFor(code, "en")}`;

  const canonical = `${base}${pathFor(code, locale)}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
