export type Locale = "en" | "fr" | "ar";
export type KeyboardCode =
  | "ar"
  | "ja"
  | "ru"
  | "he"
  | "fr"
  | "es"
  | "de"
  | "pt";

export const SUPPORTED_LOCALES: Locale[] = ["en", "fr", "ar"];

// Localized category segment per site language (locale)
export const CATEGORY_BY_LOCALE: Record<Locale, string> = {
  en: "keyboard",
  fr: "clavier",
  // Example keeps "clavier" for Arabic as requested; change anytime
  ar: "clavier",
};

// Slugs for each keyboard code in each locale
export const KEYBOARD_SLUGS: Record<KeyboardCode, Record<Locale, string>> = {
  ar: { en: "arabic", fr: "arabe", ar: "عربي" },
  ja: { en: "japanese", fr: "japonais", ar: "ياباني" },
  ru: { en: "russian", fr: "russe", ar: "روسي" },
  he: { en: "hebrew", fr: "hebreu", ar: "عبري" },
  fr: { en: "french", fr: "francais", ar: "فرنسي" },
  es: { en: "spanish", fr: "espagnol", ar: "إسباني" },
  de: { en: "german", fr: "allemand", ar: "ألماني" },
  pt: { en: "portuguese", fr: "portugais", ar: "برتغالي" },
};

export function localeFromCategorySegment(segment: string): Locale | null {
  const entry = Object.entries(CATEGORY_BY_LOCALE).find(([, v]) => v === segment);
  return (entry?.[0] as Locale) || null;
}

export function slugFor(code: KeyboardCode, locale: Locale): string {
  return KEYBOARD_SLUGS[code]?.[locale];
}

export function codeFromSlug(locale: Locale, slug: string): KeyboardCode | null {
  const entry = (
    Object.entries(KEYBOARD_SLUGS) as [KeyboardCode, Record<Locale, string>][]
  ).find(([, byLocale]) => byLocale[locale] === slug);
  return entry?.[0] || null;
}

export function pathFor(code: KeyboardCode, locale: Locale): string {
  const category = CATEGORY_BY_LOCALE[locale];
  const s = slugFor(code, locale);
  return `/${category}/${s}`;
}
