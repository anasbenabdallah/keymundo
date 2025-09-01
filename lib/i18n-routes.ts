export type Locale = "en" | "fr" | "ar";
export type KeyboardCode =
  | "en" | "ja" | "ru" | "es" | "ar" | "he" | "el" | "pt" | "zh" | "hi"
  | "fr" | "bn" | "id" | "ur" | "de" | "sw" | "mr" | "te" | "tr" | "ta" | "vi" | "ko";

export const SUPPORTED_LOCALES: Locale[] = ["en", "fr", "ar"];

// Localized category segment per site language (locale)
export const CATEGORY_BY_LOCALE: Record<Locale, string> = {
  en: "keyboard",
  fr: "clavier",
  // Arabic reuses "clavier" per your requirement. Locale is disambiguated by slug.
  ar: "clavier",
};

// Slugs for each keyboard code in each locale
export const KEYBOARD_SLUGS: Record<KeyboardCode, Record<Locale, string>> = {
  en: { en: "english", fr: "anglais", ar: "إنجليزي" },
  ar: { en: "arabic", fr: "arabe", ar: "عربي" },
  ja: { en: "japanese", fr: "japonais", ar: "ياباني" },
  ru: { en: "russian", fr: "russe", ar: "روسي" },
  he: { en: "hebrew", fr: "hebreu", ar: "عبري" },
  el: { en: "greek", fr: "grec", ar: "يوناني" },
  fr: { en: "french", fr: "francais", ar: "فرنسي" },
  es: { en: "spanish", fr: "espagnol", ar: "إسباني" },
  de: { en: "german", fr: "allemand", ar: "ألماني" },
  pt: { en: "portuguese", fr: "portugais", ar: "برتغالي" },
  zh: { en: "chinese", fr: "chinois", ar: "صيني" },
  hi: { en: "hindi", fr: "hindi", ar: "هندي" },
  bn: { en: "bengali", fr: "bengali", ar: "بنغالي" },
  id: { en: "indonesian", fr: "indonesien", ar: "إندونيسي" },
  ur: { en: "urdu", fr: "ourdou", ar: "أردو" },
  sw: { en: "swahili", fr: "swahili", ar: "سواحيلية" },
  mr: { en: "marathi", fr: "marathi", ar: "مراثي" },
  te: { en: "telugu", fr: "telugu", ar: "تيلوغو" },
  tr: { en: "turkish", fr: "turc", ar: "تركي" },
  ta: { en: "tamil", fr: "tamil", ar: "تاميل" },
  vi: { en: "vietnamese", fr: "vietnamien", ar: "فيتنامي" },
  ko: { en: "korean", fr: "coreen", ar: "كوري" },
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

// Infer locale by slug when category segment is shared (e.g., "clavier")
export function localeFromSlug(slug: string): Locale | null {
  for (const l of SUPPORTED_LOCALES) {
    for (const [, byLocale] of Object.entries(KEYBOARD_SLUGS)) {
      if (byLocale[l] === slug) return l as Locale;
    }
  }
  return null;
}

export function detectLocale(categorySegment: string, slug: string): Locale {
  const byCategory = localeFromCategorySegment(categorySegment);
  const bySlug = localeFromSlug(slug);
  return (bySlug || byCategory || "en") as Locale;
}

export function pathFor(code: KeyboardCode, locale: Locale): string {
  const category = CATEGORY_BY_LOCALE[locale];
  const s = slugFor(code, locale);
  return `/${category}/${s}`;
}
