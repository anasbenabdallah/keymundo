"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Keyboard, Sun, Moon } from "lucide-react";
import { KEYBOARD_SLUGS, CATEGORY_BY_LOCALE, type Locale } from "@/lib/i18n-routes";
import { SiteFooter } from "@/components/site-footer";

export default function LandingPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [siteLocale, setSiteLocale] = useState<Locale>("en");
  const [language, setLanguage] = useState<string>("en");

  // Guess site locale from browser
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const n = navigator.language.toLowerCase();
    if (n.startsWith("fr")) setSiteLocale("fr");
    else if (n.startsWith("ar")) setSiteLocale("ar");
  }, []);

  useEffect(() => {
    document.documentElement.lang = siteLocale;
    document.documentElement.dir = siteLocale === "ar" ? "rtl" : "ltr";
  }, [siteLocale]);

  const locales: Locale[] = ["en", "fr", "ar"];
  const languageOptions = useMemo(() => Object.keys(KEYBOARD_SLUGS), []);

  const LOCALE_LABELS: Record<Locale, string> = { en: "English", fr: "French", ar: "Arabic" };
  const LOCALE_FLAGS: Record<Locale, string> = { en: "🇺🇸", fr: "🇫🇷", ar: "🇸🇦" };

  const KEYBOARD_LABELS: Record<string, string> = {
    en: "English",
    ja: "Japanese",
    ru: "Russian",
    es: "Spanish",
    ar: "Arabic",
    he: "Hebrew",
    el: "Greek",
    pt: "Portuguese",
    zh: "Chinese",
    hi: "Hindi",
    fr: "French",
    bn: "Bengali",
    id: "Indonesian",
    ur: "Urdu",
    de: "German",
    sw: "Swahili",
    mr: "Marathi",
    te: "Telugu",
    tr: "Turkish",
    ta: "Tamil",
    vi: "Vietnamese",
    ko: "Korean",
  };

  const start = () => {
    const category = CATEGORY_BY_LOCALE[siteLocale];
    const slug = (KEYBOARD_SLUGS as any)[language]?.[siteLocale];
    if (!slug) return;
    router.push(`/${category}/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="bg-card/50 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Keyboard className="h-6 w-6 text-primary" />
            <h1 className="font-bold text-lg">KeyMundo</h1>
          </div>
          <div className="flex items-center gap-3">
            <Select value={siteLocale} onValueChange={(v) => setSiteLocale(v as Locale)}>
              <SelectTrigger className="w-40 h-9">
                <SelectValue>
                  <span className="inline-flex items-center gap-2">
                    <span>{LOCALE_FLAGS[siteLocale]}</span>
                    <span>{LOCALE_LABELS[siteLocale]}</span>
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {locales.map((l) => (
                  <SelectItem key={l} value={l} className="gap-2">
                    <span className="mr-2">{LOCALE_FLAGS[l]}</span>
                    {LOCALE_LABELS[l]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        <section className="text-center space-y-3">
          <h2 className="text-4xl font-bold tracking-tight">Start Typing in Any Language</h2>
          <p className="text-muted-foreground text-lg">Select your site language and the keyboard you want to use. We’ll take you to the right page.</p>
        </section>

        <Card className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Input language (keyboard)</div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Choose input language" /></SelectTrigger>
                <SelectContent className="max-h-72 overflow-auto">
                  {languageOptions.map((code) => (
                    <SelectItem key={code} value={code}>{KEYBOARD_LABELS[code] || code}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">This is the virtual keyboard you’ll type with.</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={start} className="px-8 text-base">Continue</Button>
          </div>
        </Card>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <Card className="p-4">
            <h3 className="font-semibold mb-1">20+ Keyboards</h3>
            <p className="text-muted-foreground">Japanese, Russian, Arabic, Hebrew, Turkish, Greek, and more.</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-1">No Install</h3>
            <p className="text-muted-foreground">Works in your browser. Copy or download your text easily.</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-1">RTL Support</h3>
            <p className="text-muted-foreground">Optimized for right-to-left languages like Arabic and Hebrew.</p>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
