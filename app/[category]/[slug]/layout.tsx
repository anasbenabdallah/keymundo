import type { Metadata } from "next";
import {
  SUPPORTED_LOCALES,
  detectLocale,
  codeFromSlug,
  pathFor,
} from "@/lib/i18n-routes";

type Params = { category: string; slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, slug } = await params;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://keymundo.com";
  const locale = detectLocale(category, slug);
  if (!locale) return {};

  const code = codeFromSlug(locale, slug);
  if (!code) return {};

  const title = `KeyMundo — ${slug} virtual keyboard`;
  const description = `Type with the ${slug} keyboard. Multilingual and free, with optional voice input.`;

  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) languages[l] = `${base}${pathFor(code, l)}`;
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
        { url: "/og-image.jpg", width: 1200, height: 630, alt: title },
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
