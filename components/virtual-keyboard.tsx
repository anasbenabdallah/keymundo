"use client";

import { Button } from "@/components/ui/button";

interface VirtualKeyboardProps {
  language: string;
  onKeyPress: (key: string) => void;
  labels?: { space?: string; enter?: string; backspace?: string };
}

// Minimal, readable layouts. You can expand with shift/alt layers later.
const keyboardLayouts: Record<string, string[][]> = {
  en: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ],
  es: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ],
  fr: [
    ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
    ["w", "x", "c", "v", "b", "n", "é"],
  ],
  de: [
    ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"],
    ["y", "x", "c", "v", "b", "n", "m"],
  ],
  pt: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ç"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ],
  // Turkish Q layout
  tr: [
    ["q", "w", "e", "r", "t", "y", "u", "ı", "o", "p", "ğ", "ü"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ş", "i"],
    ["z", "x", "c", "v", "b", "n", "m", "ö", "ç"],
  ],
  el: [
    ["ς", "ε", "ρ", "τ", "υ", "θ", "ι", "ο", "π"],
    ["α", "σ", "δ", "φ", "γ", "η", "ξ", "κ", "λ"],
    ["ζ", "χ", "ψ", "ω", "β", "ν", "μ"],
  ],
  he: [
    ["ק", "ר", "א", "ט", "ו", "ן", "ם", "פ"],
    ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף"],
    ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ"],
  ],
  ru: [
    ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х"],
    ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
    ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю"],
  ],
  ar: [
    ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج"],
    ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط"],
    ["ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ"],
  ],
  hi: [
    ["ौ", "ै", "ा", "ी", "ू", "ब", "ह", "ग", "द", "ज", "ड"],
    ["ो", "े", "्", "ि", "ु", "प", "र", "क", "त", "च", "ट"],
    ["ॆ", "ं", "म", "न", "व", "ल", "स", "य", "भ", "फ़"],
  ],
  zh: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ],
  ja: [
    ["た", "て", "い", "す", "か", "ん", "な", "に", "ら", "せ"],
    ["ち", "と", "し", "は", "き", "く", "ま", "の", "り", "れ"],
    ["つ", "さ", "そ", "ひ", "こ", "み", "も", "ね", "る"],
  ],
  ko: [
    ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"],
    ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
    ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"],
  ],
  vi: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ],
  bn: [
    ["ঔ", "ঐ", "আ", "ঈ", "ঊ", "ব", "হ", "গ", "দ", "জ", "ড়"],
    ["ও", "এ", "্", "ই", "উ", "প", "র", "ক", "ত", "চ", "ট"],
    ["ং", "ম", "ন", "ব", "ল", "স", "য", "ভ", "ফ"],
  ],
  id: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ],
  ur: [
    ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج"],
    ["ش", "س", "ی", "ب", "ل", "ا", "ت", "ن", "م", "ک", "ط"],
    ["ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ"],
  ],
  sw: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ],
  mr: [
    ["औ", "ऐ", "आ", "ई", "ऊ", "ब", "ह", "ग", "द", "ज", "ड"],
    ["ओ", "ए", "्", "इ", "उ", "प", "र", "क", "त", "च", "ट"],
    ["ं", "म", "न", "व", "ल", "स", "य", "भ", "फ"],
  ],
  te: [
    ["ఔ", "ఐ", "ఆ", "ఈ", "ఊ", "బ", "హ", "గ", "ద", "జ", "డ"],
    ["ఓ", "ఏ", "్", "ఇ", "ఉ", "ప", "ర", "క", "త", "చ", "ట"],
    ["ం", "మ", "న", "వ", "ల", "స", "య", "భ", "ఫ"],
  ],
  ta: [
    ["ஔ", "ஐ", "ஆ", "ஈ", "ஊ", "ப", "ஹ", "க", "த", "ஜ", "ட"],
    ["ஓ", "ஏ", "்", "இ", "உ", "ப", "ர", "க", "த", "ச", "ட"],
    ["ஂ", "ம", "ந", "வ", "ல", "ஸ", "ய", "ப", "ஃ"],
  ],
};

export function VirtualKeyboard({ language, onKeyPress, labels }: VirtualKeyboardProps) {
  const layout = keyboardLayouts[language] || keyboardLayouts.en;
  const spaceLabel = labels?.space ?? "Space";
  const enterLabel = labels?.enter ?? "Enter";
  const backspaceLabel = labels?.backspace ?? "Backspace";

  return (
    <div className="space-y-3">
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2 flex-wrap">
          {row.map((key, keyIndex) => (
            <Button
              key={keyIndex}
              variant="outline"
              size="default"
              className="min-w-[48px] h-12 text-base font-medium bg-card hover:bg-primary hover:text-primary-foreground border-2 hover:border-primary transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
              onClick={() => onKeyPress(key)}
            >
              {key}
            </Button>
          ))}
        </div>
      ))}

      <div className="flex justify-center gap-3 mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="default"
          className="px-6 h-12 bg-card hover:bg-primary hover:text-primary-foreground border-2 hover:border-primary transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md font-medium"
          onClick={() => onKeyPress("Space")}
        >
          {spaceLabel}
        </Button>
        <Button
          variant="outline"
          size="default"
          className="px-6 h-12 bg-card hover:bg-primary hover:text-primary-foreground border-2 hover:border-primary transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md font-medium"
          onClick={() => onKeyPress("Enter")}
        >
          {enterLabel}
        </Button>
        <Button
          variant="outline"
          size="default"
          className="px-6 h-12 bg-card hover:bg-destructive hover:text-destructive-foreground border-2 hover:border-destructive transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md font-medium"
          onClick={() => onKeyPress("Backspace")}
        >
          {backspaceLabel}
        </Button>
      </div>
    </div>
  );
}
