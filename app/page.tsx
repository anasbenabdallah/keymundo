"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Copy,
  Download,
  Globe,
  Mic,
  MicOff,
  Volume2,
  Moon,
  Sun,
  Keyboard,
  Languages,
  Zap,
  Clock,
  Shield,
} from "lucide-react";
import { VirtualKeyboard } from "@/components/virtual-keyboard";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

const languages = [
  {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    keywords: "english keyboard, english typing",
    nativeName: "English",
  },
  {
    code: "ja",
    name: "Japanese",
    flag: "🇯🇵",
    keywords: "japanese keyboard, katakana, hiragana typing",
    nativeName: "日本語",
  },
  {
    code: "ru",
    name: "Russian",
    flag: "🇷🇺",
    keywords: "russian keyboard, russian to english, cyrillic keyboard",
    nativeName: "Русский",
  },
  {
    code: "es",
    name: "Spanish",
    flag: "🇪🇸",
    keywords: "spanish keyboard, english to spanish, spanish typing",
    nativeName: "Español",
  },
  {
    code: "ar",
    name: "Arabic",
    flag: "🇸🇦",
    keywords: "arabic keyboard, arabic typing, rtl keyboard",
    nativeName: "العربية",
  },
  {
    code: "he",
    name: "Hebrew",
    flag: "🇮🇱",
    keywords: "hebrew keyboard, hebrew typing",
    nativeName: "עברית",
  },
  {
    code: "el",
    name: "Greek",
    flag: "🇬🇷",
    keywords: "greek keyboard, greek to english, greek typing",
    nativeName: "Ελληνικά",
  },
  {
    code: "pt",
    name: "Portuguese",
    flag: "🇵🇹",
    keywords: "portuguese keyboard, portuguese to english",
    nativeName: "Português",
  },
  {
    code: "zh",
    name: "Chinese (Mandarin)",
    flag: "🇨🇳",
    keywords: "chinese keyboard, mandarin typing",
    nativeName: "中文",
  },
  {
    code: "hi",
    name: "Hindi",
    flag: "🇮🇳",
    keywords: "hindi keyboard, devanagari typing",
    nativeName: "हिन्दी",
  },
  {
    code: "fr",
    name: "French",
    flag: "🇫🇷",
    keywords: "french keyboard, french typing",
    nativeName: "Français",
  },
  {
    code: "bn",
    name: "Bengali",
    flag: "🇧🇩",
    keywords: "bengali keyboard, bangla typing",
    nativeName: "বাংলা",
  },
  {
    code: "id",
    name: "Indonesian",
    flag: "🇮🇩",
    keywords: "indonesian keyboard",
    nativeName: "Bahasa Indonesia",
  },
  {
    code: "ur",
    name: "Urdu",
    flag: "🇵🇰",
    keywords: "urdu keyboard, urdu typing",
    nativeName: "اردو",
  },
  {
    code: "de",
    name: "German",
    flag: "🇩🇪",
    keywords: "german keyboard, german typing",
    nativeName: "Deutsch",
  },
  {
    code: "sw",
    name: "Swahili",
    flag: "🇰🇪",
    keywords: "swahili keyboard",
    nativeName: "Kiswahili",
  },
  {
    code: "mr",
    name: "Marathi",
    flag: "🇮🇳",
    keywords: "marathi keyboard",
    nativeName: "मराठी",
  },
  {
    code: "te",
    name: "Telugu",
    flag: "🇮🇳",
    keywords: "telugu keyboard",
    nativeName: "తెలుగు",
  },
  {
    code: "tr",
    name: "Turkish",
    flag: "🇹🇷",
    keywords: "turkish keyboard",
    nativeName: "Türkçe",
  },
  {
    code: "ta",
    name: "Tamil",
    flag: "🇮🇳",
    keywords: "tamil keyboard",
    nativeName: "தமிழ்",
  },
  {
    code: "vi",
    name: "Vietnamese",
    flag: "🇻🇳",
    keywords: "vietnamese keyboard",
    nativeName: "Tiếng Việt",
  },
  {
    code: "ko",
    name: "Korean",
    flag: "🇰🇷",
    keywords: "korean keyboard, hangul typing",
    nativeName: "한국어",
  },
];

const popularTranslations = [
  { from: "en", to: "es", label: "English to Spanish", searches: "11.1M" },
  { from: "es", to: "en", label: "Spanish to English", searches: "11.1M" },
  { from: "ru", to: "en", label: "Russian to English", searches: "246K" },
  { from: "el", to: "en", label: "Greek to English", searches: "60.5K" },
  { from: "en", to: "el", label: "English to Greek", searches: "90.5K" },
  { from: "pt", to: "en", label: "Portuguese to English", searches: "301K" },
];

export default function MultilingualKeyboard() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [isListening, setIsListening] = useState(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      setIsVoiceSupported(true);
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setText((prev) => prev + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        toast({
          title: "Voice input error",
          description:
            "There was an issue with voice recognition. Please try again.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [toast]);

  useEffect(() => {
    if (recognitionRef.current && selectedLanguage) {
      const langMap: { [key: string]: string } = {
        en: "en-US",
        es: "es-ES",
        fr: "fr-FR",
        de: "de-DE",
        ru: "ru-RU",
        ar: "ar-SA",
        hi: "hi-IN",
        zh: "zh-CN",
        ja: "ja-JP",
        ko: "ko-KR",
        pt: "pt-PT",
        tr: "tr-TR",
        vi: "vi-VN",
        bn: "bn-BD",
        id: "id-ID",
        ur: "ur-PK",
        sw: "sw-KE",
        mr: "mr-IN",
        te: "te-IN",
        el: "el-GR",
        he: "he-IL",
      };
      recognitionRef.current.lang = langMap[selectedLanguage] || "en-US";
    }
  }, [selectedLanguage]);

  const toggleVoiceInput = () => {
    if (!isVoiceSupported) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      toast({
        title: "Voice input started",
        description: `Listening in ${selectedLang?.name}...`,
      });
    }
  };

  const speakText = () => {
    if (!text.trim()) {
      toast({
        title: "No text to speak",
        description: "Please type some text first.",
        variant: "destructive",
      });
      return;
    }

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang =
        selectedLanguage === "zh"
          ? "zh-CN"
          : selectedLanguage === "ar"
          ? "ar-SA"
          : selectedLanguage;
      speechSynthesis.speak(utterance);

      toast({
        title: "Speaking text",
        description: "Text is being read aloud.",
      });
    } else {
      toast({
        title: "Text-to-speech not supported",
        description: "Your browser doesn't support text-to-speech.",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === "Backspace") {
      setText((prev) => prev.slice(0, -1));
    } else if (key === "Space") {
      setText((prev) => prev + " ");
    } else if (key === "Enter") {
      setText((prev) => prev + "\n");
    } else {
      setText((prev) => prev + key);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard successfully.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `text-${selectedLanguage}-${
      new Date().toISOString().split("T")[0]
    }.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Text file downloaded successfully.",
    });
  };

  const translateText = async () => {
    if (!text.trim()) {
      toast({
        title: "No text to translate",
        description: "Please type some text first.",
        variant: "destructive",
      });
      return;
    }

    setShowTranslation(true);

    try {
      toast({
        title: "Translating...",
        description: "Please wait while we translate your text.",
      });

      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=${selectedLanguage}|${targetLanguage}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Translation service unavailable");
      }

      const data = await response.json();

      if (data.responseData && data.responseData.translatedText) {
        setTranslatedText(data.responseData.translatedText);
        toast({
          title: "Translation complete",
          description: `Translated from ${selectedLang?.name} to ${
            languages.find((l) => l.code === targetLanguage)?.name
          }`,
        });
      } else {
        throw new Error("Translation failed");
      }
    } catch (error) {
      console.error("Translation error:", error);

      const simpleTranslations: { [key: string]: { [key: string]: string } } = {
        "en-es": {
          hello: "hola",
          "how are you": "cómo estás",
          "good morning": "buenos días",
          "good afternoon": "buenas tardes",
          "good evening": "buenas noches",
          "thank you": "gracias",
          goodbye: "adiós",
          yes: "sí",
          no: "no",
          please: "por favor",
          sorry: "lo siento",
          "excuse me": "disculpe",
          welcome: "bienvenido",
          "see you later": "hasta luego",
          "i love you": "te amo",
          friend: "amigo",
          family: "familia",
          water: "agua",
          food: "comida",
          house: "casa",
          car: "coche",
          work: "work",
          school: "escuela",
          book: "libro",
          computer: "computadora",
          phone: "teléfono",
        },
        "es-en": {
          hola: "hello",
          "cómo estás": "how are you",
          "buenos días": "good morning",
          "buenas tardes": "good afternoon",
          "buenas noches": "good evening",
          gracias: "thank you",
          adiós: "goodbye",
          sí: "yes",
          no: "no",
          "por favor": "please",
          "lo siento": "sorry",
          disculpe: "disculpe",
          bienvenido: "welcome",
          "hasta luego": "see you later",
          "te amo": "i love you",
          amigo: "friend",
          familia: "family",
          agua: "agua",
          comida: "comida",
          casa: "casa",
          coche: "car",
          trabajo: "work",
          escuela: "school",
          libro: "book",
          computadora: "computadora",
          teléfono: "teléfono",
        },
        "en-ru": {
          hello: "привет",
          "how are you": "как дела",
          "good morning": "доброе утро",
          "thank you": "спасибо",
          goodbye: "до свидания",
          yes: "да",
          no: "нет",
          please: "пожалуйста",
          sorry: "извините",
          water: "вода",
          food: "еда",
          house: "дом",
          work: "работа",
          friend: "друг",
        },
        "ru-en": {
          привет: "hello",
          "как дела": "how are you",
          "доброе утро": "good morning",
          спасибо: "thank you",
          "до свидания": "goodbye",
          да: "yes",
          нет: "no",
          пожалуйста: "please",
          извините: "sorry",
          вода: "water",
          еда: "food",
          дом: "house",
          работа: "работа",
          друг: "friend",
        },
        "en-fr": {
          hello: "bonjour",
          "how are you": "comment allez-vous",
          "thank you": "merci",
          goodbye: "au revoir",
          yes: "oui",
          no: "non",
          please: "s'il vous plaît",
          sorry: "désolé",
          water: "eau",
          food: "nourriture",
          house: "maison",
        },
        "fr-en": {
          bonjour: "hello",
          "comment allez-vous": "how are you",
          merci: "thank you",
          "au revoir": "goodbye",
          oui: "yes",
          non: "no",
          "s'il vous plaît": "please",
          désolé: "sorry",
          eau: "water",
          nourriture: "food",
          maison: "house",
        },
      };

      const translationKey = `${selectedLanguage}-${targetLanguage}`;
      const translations = simpleTranslations[translationKey];

      if (translations) {
        const lowerText = text.toLowerCase().trim();
        const translated = translations[lowerText];

        if (translated) {
          setTranslatedText(translated);
          toast({
            title: "Translation complete",
            description: "Using offline translation service",
          });
        } else {
          setTranslatedText(`Translation not available for: "${text}"`);
          toast({
            title: "Translation unavailable",
            description:
              "This phrase is not in our offline dictionary. Please try a simpler phrase.",
            variant: "destructive",
          });
        }
      } else {
        setTranslatedText(
          `Translation from ${selectedLang?.name} to ${targetLang?.name} not supported offline`
        );
        toast({
          title: "Translation service unavailable",
          description:
            "This language pair requires internet connection. Please check your connection.",
          variant: "destructive",
        });
      }
    }
  };

  const selectedLang = languages.find((lang) => lang.code === selectedLanguage);
  const targetLang = languages.find((lang) => lang.code === targetLanguage);

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
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
            aria-label="Toggle dark mode"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-4 space-y-6">
        <section className="text-center space-y-6 py-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-primary/10 border-2 border-primary/20">
              <Keyboard className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Free Virtual Keyboard Online
              </h1>
              <h2 className="text-xl text-primary font-medium mt-2">
                Japanese • Russian • Hebrew • Arabic • 20+ Languages
              </h2>
            </div>
          </div>

          <p className="text-muted-foreground text-balance max-w-3xl mx-auto text-lg leading-relaxed">
            Type in any language with our free multilingual virtual keyboard.
            Supports <strong>Japanese keyboard</strong>,{" "}
            <strong>Russian keyboard</strong>, <strong>Hebrew keyboard</strong>,
            and <strong>Arabic keyboard</strong>. Translate{" "}
            <strong>English to Spanish</strong>,{" "}
            <strong>Russian to English</strong>,{" "}
            <strong>Greek to English</strong> with voice input and instant
            translation.
          </p>

          <div className="bg-muted/30 p-6 rounded-xl mt-8">
            <h3 className="text-lg font-semibold mb-4">
              Most Popular Virtual Keyboards
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="p-3 bg-card rounded-lg border">
                <strong>Japanese Keyboard</strong>
                <p className="text-muted-foreground mt-1">
                  Hiragana, Katakana, Kanji
                </p>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <strong>Russian Keyboard</strong>
                <p className="text-muted-foreground mt-1">Cyrillic alphabet</p>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <strong>Hebrew Keyboard</strong>
                <p className="text-muted-foreground mt-1">
                  Right-to-left typing
                </p>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <strong>Arabic Keyboard</strong>
                <p className="text-muted-foreground mt-1">RTL script support</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border">
              <Zap className="h-8 w-8 text-primary" />
              <div className="text-left">
                <h3 className="font-semibold">Instant Typing</h3>
                <p className="text-sm text-muted-foreground">
                  20+ languages supported
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border">
              <Mic className="h-8 w-8 text-primary" />
              <div className="text-left">
                <h3 className="font-semibold">Voice Input</h3>
                <p className="text-sm text-muted-foreground">
                  Speech-to-text in any language
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border">
              <Languages className="h-8 w-8 text-primary" />
              <div className="text-left">
                <h3 className="font-semibold">Translation</h3>
                <p className="text-sm text-muted-foreground">
                  Instant text translation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border">
              <Shield className="h-8 w-8 text-primary" />
              <div className="text-left">
                <h3 className="font-semibold">Secure & Free</h3>
                <p className="text-sm text-muted-foreground">
                  No registration required
                </p>
              </div>
            </div>
          </div>
        </section>

        <Card className="p-6 shadow-lg border-2 hover:border-primary/20 transition-colors">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <label
                htmlFor="language-select"
                className="text-lg font-semibold text-foreground"
              >
                Choose Input Language
              </label>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger className="w-full sm:w-80 h-12 text-base">
                  <SelectValue>
                    {selectedLang && (
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{selectedLang.flag}</span>
                        <div>
                          <span className="font-medium">
                            {selectedLang.name}
                          </span>
                          <span className="text-sm text-muted-foreground ml-2">
                            {selectedLang.nativeName}
                          </span>
                        </div>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem
                      key={lang.code}
                      value={lang.code}
                      className="py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{lang.flag}</span>
                        <div>
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            {lang.nativeName}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Translate to:
                </span>
                <Select
                  value={targetLanguage}
                  onValueChange={setTargetLanguage}
                >
                  <SelectTrigger className="w-48 h-12">
                    <SelectValue>
                      {targetLang && (
                        <div className="flex items-center gap-2">
                          <span>{targetLang.flag}</span>
                          <span className="font-medium">{targetLang.name}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {languages
                      .filter((lang) => lang.code !== selectedLanguage)
                      .map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main text output section - takes 3 columns */}
          <div className="lg:col-span-3">
            <Card className="p-6 shadow-lg border-2 hover:border-primary/20 transition-colors">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Copy className="h-5 w-5 text-primary" />
                    </div>
                    Text Output
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={toggleVoiceInput}
                      disabled={!isVoiceSupported}
                      variant={isListening ? "default" : "outline"}
                      size="default"
                      className="flex items-center gap-2 h-11 px-4"
                    >
                      {isListening ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                      {isListening ? "Stop Voice" : "Voice Input"}
                    </Button>
                    <Button
                      onClick={speakText}
                      disabled={!text.trim()}
                      variant="outline"
                      size="default"
                      className="flex items-center gap-2 h-11 px-4 bg-transparent"
                    >
                      <Volume2 className="h-4 w-4" />
                      Speak
                    </Button>
                    <Button
                      onClick={translateText}
                      disabled={!text.trim()}
                      variant="outline"
                      size="default"
                      className="flex items-center gap-2 h-11 px-4 bg-transparent"
                    >
                      <Languages className="h-4 w-4" />
                      Translate
                    </Button>
                    <Button
                      onClick={handleCopy}
                      disabled={!text}
                      variant="outline"
                      size="default"
                      className="flex items-center gap-2 h-11 px-4 bg-transparent"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                    <Button
                      onClick={handleDownload}
                      disabled={!text}
                      size="default"
                      className="flex items-center gap-2 h-11 px-4"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>

                <div
                  className={
                    showTranslation
                      ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
                      : "space-y-0"
                  }
                >
                  <div className="relative">
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      {showTranslation
                        ? `Input Text (${selectedLang?.name})`
                        : `Text Input (${selectedLang?.name})`}
                    </label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder={`Start typing or use voice input in ${
                        selectedLang?.name || "the selected language"
                      }...`}
                      className={`w-full p-4 border-2 border-border rounded-xl bg-card text-card-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-base leading-relaxed ${
                        showTranslation ? "h-40" : "h-64"
                      }`}
                      dir={
                        ["ar", "ur", "he"].includes(selectedLanguage)
                          ? "rtl"
                          : "ltr"
                      }
                    />
                    {isListening && (
                      <div className="absolute top-8 right-4 flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        Listening...
                      </div>
                    )}
                  </div>

                  {showTranslation && (
                    <div className="relative">
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Translation ({targetLang?.name})
                      </label>
                      <textarea
                        value={translatedText}
                        readOnly
                        className="w-full h-40 p-4 border-2 border-border rounded-xl bg-muted/30 text-card-foreground resize-none text-base leading-relaxed"
                        dir={
                          ["ar", "ur", "he"].includes(targetLanguage)
                            ? "rtl"
                            : "ltr"
                        }
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                  <div className="flex gap-6">
                    <span>
                      Characters:{" "}
                      <span className="font-medium text-foreground">
                        {text.length}
                      </span>
                    </span>
                    <span>
                      Words:{" "}
                      <span className="font-medium text-foreground">
                        {text.trim() ? text.trim().split(/\s+/).length : 0}
                      </span>
                    </span>
                  </div>
                  <div className="text-xs">
                    Language:{" "}
                    <span className="font-medium text-foreground">
                      {selectedLang?.name}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-lg border-2 hover:border-primary/20 transition-colors mt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="p-3 rounded-full bg-primary/10">
                    <span className="text-lg">{selectedLang?.flag}</span>
                  </div>
                  Virtual Keyboard - {selectedLang?.name}
                </h2>
                <VirtualKeyboard
                  language={selectedLanguage}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-4 shadow-lg border-2 hover:border-primary/20 transition-colors h-fit">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Popular Translations
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {popularTranslations.slice(0, 3).map((trans, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full h-auto p-3 justify-start border-2 bg-card hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:border-purple-400 dark:hover:border-purple-600 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200"
                    onClick={() => {
                      setSelectedLanguage(trans.from);
                      setTargetLanguage(trans.to);
                      setShowTranslation(true);
                    }}
                  >
                    <div className="text-left w-full">
                      <div className="font-medium text-sm mb-1">
                        {trans.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {trans.searches} searches
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {popularTranslations.slice(3, 6).map((trans, index) => (
                  <Button
                    key={index + 3}
                    variant="outline"
                    className="w-full h-auto p-3 justify-start border-2 bg-card hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:border-purple-400 dark:hover:border-purple-600 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200"
                    onClick={() => {
                      setSelectedLanguage(trans.from);
                      setTargetLanguage(trans.to);
                      setShowTranslation(true);
                    }}
                  >
                    <div className="text-left w-full">
                      <div className="font-medium text-sm mb-1">
                        {trans.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {trans.searches} searches
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <section className="bg-card/30 p-8 rounded-xl border space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Why Choose KeyMundo Virtual Keyboard?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">100% Free</h3>
              <p className="text-sm text-muted-foreground">
                No registration required. Use all features for free.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto">
                <Languages className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">20+ Languages</h3>
              <p className="text-sm text-muted-foreground">
                Japanese, Russian, Hebrew, Arabic, and more.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto">
                <Mic className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">Voice Input</h3>
              <p className="text-sm text-muted-foreground">
                Speech-to-text in multiple languages.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">Instant Translation</h3>
              <p className="text-sm text-muted-foreground">
                Translate between languages instantly.
              </p>
            </div>
          </div>
        </section>

        <footer className="text-center py-8 text-sm text-muted-foreground border-t space-y-6">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">
              KeyMundo.com - Free Multilingual Virtual Keyboard
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  Popular Virtual Keyboards
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <a href="#japanese-keyboard" className="hover:text-primary">
                      Japanese Keyboard Online
                    </a>
                  </li>
                  <li>
                    <a href="#russian-keyboard" className="hover:text-primary">
                      Russian Keyboard (Cyrillic)
                    </a>
                  </li>
                  <li>
                    <a href="#hebrew-keyboard" className="hover:text-primary">
                      Hebrew Keyboard
                    </a>
                  </li>
                  <li>
                    <a href="#arabic-keyboard" className="hover:text-primary">
                      Arabic Keyboard
                    </a>
                  </li>
                  <li>
                    <a href="#greek-keyboard" className="hover:text-primary">
                      Greek Keyboard
                    </a>
                  </li>
                  <li>
                    <a href="#chinese-keyboard" className="hover:text-primary">
                      Chinese Keyboard
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  Popular Translations
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <a
                      href="#english-to-spanish"
                      className="hover:text-primary"
                    >
                      English to Spanish Translator
                    </a>
                  </li>
                  <li>
                    <a
                      href="#spanish-to-english"
                      className="hover:text-primary"
                    >
                      Spanish to English Translator
                    </a>
                  </li>
                  <li>
                    <a
                      href="#russian-to-english"
                      className="hover:text-primary"
                    >
                      Russian to English Translator
                    </a>
                  </li>
                  <li>
                    <a href="#greek-to-english" className="hover:text-primary">
                      Greek to English Translator
                    </a>
                  </li>
                  <li>
                    <a
                      href="#portuguese-to-english"
                      className="hover:text-primary"
                    >
                      Portuguese to English
                    </a>
                  </li>
                  <li>
                    <a href="#english-to-greek" className="hover:text-primary">
                      English to Greek
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Features</h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <a href="#voice-typing" className="hover:text-primary">
                      Voice Typing Online
                    </a>
                  </li>
                  <li>
                    <a href="#speech-to-text" className="hover:text-primary">
                      Speech to Text
                    </a>
                  </li>
                  <li>
                    <a
                      href="#multilingual-keyboard"
                      className="hover:text-primary"
                    >
                      Multilingual Keyboard
                    </a>
                  </li>
                  <li>
                    <a href="#online-translator" className="hover:text-primary">
                      Online Translator Free
                    </a>
                  </li>
                  <li>
                    <a href="#virtual-keyboard" className="hover:text-primary">
                      Virtual Keyboard Free
                    </a>
                  </li>
                  <li>
                    <a
                      href="#language-converter"
                      className="hover:text-primary"
                    >
                      Language Converter
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-xl">
              <h4 className="font-semibold text-foreground mb-4">
                About KeyMundo Virtual Keyboard
              </h4>
              <p className="max-w-4xl mx-auto leading-relaxed text-sm">
                KeyMundo is the best free online virtual keyboard supporting{" "}
                <strong>Japanese keyboard</strong>,{" "}
                <strong>Russian keyboard</strong>,{" "}
                <strong>Hebrew keyboard</strong>,{" "}
                <strong>Arabic keyboard</strong>, and 20+ languages. Our
                multilingual virtual keyboard offers voice input, instant
                translation from <strong>English to Spanish</strong>,{" "}
                <strong>Russian to English</strong>,{" "}
                <strong>Greek to English</strong>, and{" "}
                <strong>Portuguese to English</strong>. Perfect for multilingual
                typing, language learning, international communication, and
                professional translation needs. No registration required - start
                typing in any language instantly with our free virtual keyboard
                tool.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <span className="bg-muted/50 px-2 py-1 rounded">
                Japanese Keyboard
              </span>
              <span className="bg-muted/50 px-2 py-1 rounded">
                Russian Keyboard
              </span>
              <span className="bg-muted/50 px-2 py-1 rounded">
                Hebrew Keyboard
              </span>
              <span className="bg-muted/50 px-2 py-1 rounded">
                Arabic Keyboard
              </span>
              <span className="bg-muted/50 px-2 py-1 rounded">
                English to Spanish
              </span>
              <span className="bg-muted/50 px-2 py-1 rounded">
                Voice Typing
              </span>
              <span className="bg-muted/50 px-2 py-1 rounded">
                Online Translator
              </span>
              <span className="bg-muted/50 px-2 py-1 rounded">
                Multilingual Typing Tool
              </span>
              <span className="bg-muted/50 px-2 py-1 rounded">
                Katakana Keyboard
              </span>
              <span className="bg-muted/50 px-2 py-1 rounded">
                Cyrillic Keyboard
              </span>
              <span className="bg-muted/50 px-2 py-1 rounded">
                Virtual Keyboard Free
              </span>
              <span className="bg-muted/50 px-2 py-1 rounded">
                Speech to Text
              </span>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs">
                © 2025 KeyMundo.com - Free Virtual Keyboard for All Languages |
                All rights reserved
              </p>
              <p className="text-xs mt-2">
                <a href="/privacy" className="hover:text-primary">
                  Privacy Policy
                </a>{" "}
                |
                <a href="/terms" className="hover:text-primary ml-2">
                  Terms of Service
                </a>{" "}
                |
                <a href="/sitemap.xml" className="hover:text-primary ml-2">
                  Sitemap
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
