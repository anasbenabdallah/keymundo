"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VirtualKeyboard } from "@/components/virtual-keyboard";
import { Keyboard, Mic, MicOff, Copy, Download, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { SiteFooter } from "@/components/site-footer";
import {
  detectLocale,
  codeFromSlug,
  KEYBOARD_SLUGS,
  type Locale,
} from "@/lib/i18n-routes";

export default function KeyboardPage() {
  const params = useParams<{ category: string; slug: string }>();
  const category = params?.category || "keyboard";
  const slug = params?.slug || "english";
  const siteLocale = useMemo<Locale>(() => detectLocale(String(category), String(slug)) as Locale, [category, slug]);
  const initialCode = useMemo(() => (codeFromSlug(siteLocale, String(slug)) || "en") as string, [siteLocale, slug]);

  const [language, setLanguage] = useState<string>(initialCode);
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    document.documentElement.lang = siteLocale;
    document.documentElement.dir = siteLocale === "ar" ? "rtl" : "ltr";
  }, [siteLocale]);

  // Setup speech recognition (optional)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR: any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e: any) => {
      let finalT = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalT += t;
      }
      if (finalT) setText((prev) => prev + finalT);
    };
    recognitionRef.current = rec;
    return () => rec.stop();
  }, []);

  const toggleVoice = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (isListening) {
      rec.stop();
      setIsListening(false);
    } else {
      try {
        rec.lang = language === "ar" ? "ar-SA" : language === "ru" ? "ru-RU" : "en-US";
        rec.start();
        setIsListening(true);
      } catch {}
    }
  };

  const copyText = async () => {
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  const handleKeyPress = (key: string) => {
    if (key === "Space") setText((t) => t + " ");
    else if (key === "Enter") setText((t) => t + "\n");
    else if (key === "Backspace") setText((t) => t.slice(0, -1));
    else setText((t) => t + key);
  };

  const languageOptions = useMemo(() => Object.keys(KEYBOARD_SLUGS), []);

  // Full names + flags for each language code
  const LANG_META: Record<string, { name: string; flag: string }> = {
    en: { name: "English", flag: "🇺🇸" },
    ja: { name: "Japanese", flag: "🇯🇵" },
    ru: { name: "Russian", flag: "🇷🇺" },
    es: { name: "Spanish", flag: "🇪🇸" },
    ar: { name: "Arabic", flag: "🇸🇦" },
    he: { name: "Hebrew", flag: "🇮🇱" },
    el: { name: "Greek", flag: "🇬🇷" },
    pt: { name: "Portuguese", flag: "🇵🇹" },
    zh: { name: "Chinese", flag: "🇨🇳" },
    hi: { name: "Hindi", flag: "🇮🇳" },
    fr: { name: "French", flag: "🇫🇷" },
    bn: { name: "Bengali", flag: "🇧🇩" },
    id: { name: "Indonesian", flag: "🇮🇩" },
    ur: { name: "Urdu", flag: "🇵🇰" },
    de: { name: "German", flag: "🇩🇪" },
    sw: { name: "Swahili", flag: "🇹🇿" },
    mr: { name: "Marathi", flag: "🇮🇳" },
    te: { name: "Telugu", flag: "🇮🇳" },
    tr: { name: "Turkish", flag: "🇹🇷" },
    ta: { name: "Tamil", flag: "🇮🇳" },
    vi: { name: "Vietnamese", flag: "🇻🇳" },
    ko: { name: "Korean", flag: "🇰🇷" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="bg-card/50 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Keyboard className="h-6 w-6 text-primary" />
            <h1 className="font-bold text-lg">KeyMundo</h1>
          </div>
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
      </header>

      <div className="max-w-5xl mx-auto p-4 space-y-6">
        <Card className="p-6 shadow-lg border-2">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <span className="text-sm text-muted-foreground">Input language:</span>
            <Select value={language} onValueChange={(v) => setLanguage(v)}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-72 overflow-auto">
                {languageOptions.map((code) => {
                  const meta = LANG_META[code] || { name: code, flag: "" };
                  return (
                    <SelectItem key={code} value={code} className="gap-2">
                      <span className="mr-2">{meta.flag}</span>
                      {meta.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <div className="flex-1" />
            <Button onClick={toggleVoice} variant={isListening ? "default" : "outline"} className="gap-2">
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isListening ? "Stop Voice" : "Voice Input"}
            </Button>
            <Button onClick={copyText} variant="outline" className="gap-2">
              <Copy className="h-4 w-4" /> Copy
            </Button>
            <Button onClick={() => {
              const blob = new Blob([text], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url; a.download = `text-${language}.txt`; a.click();
              URL.revokeObjectURL(url);
            }} variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-2">Text Output</h2>
              <textarea
                className="w-full h-64 p-4 border rounded-md bg-muted/30"
                value={text}
                onChange={(e) => setText(e.target.value)}
                dir={["ar", "he", "ur"].includes(language) ? "rtl" : "ltr"}
                placeholder={`Start typing in ${language}...`}
              />
            </Card>
            <Card className="p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">Virtual Keyboard - {language}</h2>
              <VirtualKeyboard language={language} onKeyPress={handleKeyPress} />
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="p-4 h-fit">
              <p className="text-sm text-muted-foreground">
                Type with your chosen layout. No translation or external services.
              </p>
            </Card>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
