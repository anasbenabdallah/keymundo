"use client"

import { Button } from "@/components/ui/button"

interface VirtualKeyboardProps {
  language: string
  onKeyPress: (key: string) => void
}

const keyboardLayouts = {
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
    ["w", "x", "c", "v", "b", "n", "ç"],
  ],
  de: [
    ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"],
    ["y", "x", "c", "v", "b", "n", "m", "ß"],
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
    ["क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ"],
    ["ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न"],
    ["प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह"],
  ],
  zh: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ],
  ja: [
    ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ"],
    ["い", "き", "し", "ち", "に", "ひ", "み", "ゆ", "り", "を"],
    ["う", "く", "す", "つ", "ぬ", "ふ", "む", "よ", "る", "ん"],
    ["え", "け", "せ", "て", "ね", "へ", "め", "れ"],
    ["お", "こ", "そ", "と", "の", "ほ", "も", "ろ"],
  ],
  ko: [
    ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"],
    ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
    ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"],
  ],
  pt: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ç"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ],
  tr: [
    ["q", "w", "e", "r", "t", "y", "u", "ı", "o", "p", "ğ", "ü"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ş", "i"],
    ["z", "x", "c", "v", "b", "n", "m", "ö", "ç"],
  ],
  vi: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ],
  // Simplified layouts for other languages using English QWERTY as base
  bn: [
    ["ক", "খ", "গ", "ঘ", "ঙ", "চ", "ছ", "জ", "ঝ", "ঞ"],
    ["ট", "ঠ", "ড", "ঢ", "ণ", "ত", "থ", "দ", "ধ", "ন"],
    ["প", "ফ", "ব", "ভ", "ম", "য", "র", "ল", "শ", "ষ", "স", "হ"],
  ],
  id: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ],
  ur: [
    ["ق", "و", "ع", "ر", "ت", "ے", "ء", "ی", "ہ", "پ"],
    ["ا", "س", "د", "ف", "گ", "ھ", "ج", "ک", "ل"],
    ["ز", "ش", "چ", "ط", "ب", "ن", "م"],
  ],
  sw: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ],
  mr: [
    ["क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ"],
    ["ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न"],
    ["प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह"],
  ],
  te: [
    ["క", "ఖ", "గ", "ఘ", "ఙ", "చ", "ఛ", "జ", "ఝ", "ఞ"],
    ["ట", "ఠ", "డ", "ఢ", "ణ", "త", "థ", "ద", "ధ", "న"],
    ["ప", "ఫ", "బ", "భ", "మ", "య", "ర", "ల", "వ", "శ", "ష", "స", "హ"],
  ],
  ta: [
    ["க", "ங", "ச", "ஞ", "ட", "ண", "த", "ந", "ப", "ம"],
    ["ய", "ர", "ல", "வ", "ழ", "ள", "ற", "ன"],
    ["அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ"],
  ],
}

export function VirtualKeyboard({ language, onKeyPress }: VirtualKeyboardProps) {
  const layout = keyboardLayouts[language as keyof typeof keyboardLayouts] || keyboardLayouts.en

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

      {/* Special keys row */}
      <div className="flex justify-center gap-3 mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="default"
          className="px-6 h-12 bg-card hover:bg-primary hover:text-primary-foreground border-2 hover:border-primary transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md font-medium"
          onClick={() => onKeyPress("Space")}
        >
          Space
        </Button>
        <Button
          variant="outline"
          size="default"
          className="px-6 h-12 bg-card hover:bg-primary hover:text-primary-foreground border-2 hover:border-primary transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md font-medium"
          onClick={() => onKeyPress("Enter")}
        >
          Enter
        </Button>
        <Button
          variant="outline"
          size="default"
          className="px-6 h-12 bg-card hover:bg-destructive hover:text-destructive-foreground border-2 hover:border-destructive transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md font-medium"
          onClick={() => onKeyPress("Backspace")}
        >
          Backspace
        </Button>
      </div>
    </div>
  )
}
