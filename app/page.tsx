"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Download, Globe, Mic, MicOff, Volume2, Moon, Sun } from "lucide-react"
import { VirtualKeyboard } from "@/components/virtual-keyboard"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸", keywords: "english keyboard, english typing" },
  { code: "ja", name: "Japanese", flag: "🇯🇵", keywords: "japanese keyboard, katakana, hiragana typing" },
  { code: "ru", name: "Russian", flag: "🇷🇺", keywords: "russian keyboard, russian to english, cyrillic keyboard" },
  { code: "es", name: "Spanish", flag: "🇪🇸", keywords: "spanish keyboard, english to spanish, spanish typing" },
  { code: "ar", name: "Arabic", flag: "🇸🇦", keywords: "arabic keyboard, arabic typing, rtl keyboard" },
  { code: "he", name: "Hebrew", flag: "🇮🇱", keywords: "hebrew keyboard, hebrew typing" },
  { code: "el", name: "Greek", flag: "🇬🇷", keywords: "greek keyboard, greek to english, greek typing" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹", keywords: "portuguese keyboard, portuguese to english" },
  { code: "zh", name: "Chinese (Mandarin)", flag: "🇨🇳", keywords: "chinese keyboard, mandarin typing" },
  { code: "hi", name: "Hindi", flag: "🇮🇳", keywords: "hindi keyboard, devanagari typing" },
  { code: "fr", name: "French", flag: "🇫🇷", keywords: "french keyboard, french typing" },
  { code: "bn", name: "Bengali", flag: "🇧🇩", keywords: "bengali keyboard, bangla typing" },
  { code: "id", name: "Indonesian", flag: "🇮🇩", keywords: "indonesian keyboard" },
  { code: "ur", name: "Urdu", flag: "🇵🇰", keywords: "urdu keyboard, urdu typing" },
  { code: "de", name: "German", flag: "🇩🇪", keywords: "german keyboard, german typing" },
  { code: "sw", name: "Swahili", flag: "🇰🇪", keywords: "swahili keyboard" },
  { code: "mr", name: "Marathi", flag: "🇮🇳", keywords: "marathi keyboard" },
  { code: "te", name: "Telugu", flag: "🇮🇳", keywords: "telugu keyboard" },
  { code: "tr", name: "Turkish", flag: "🇹🇷", keywords: "turkish keyboard" },
  { code: "ta", name: "Tamil", flag: "🇮🇳", keywords: "tamil keyboard" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳", keywords: "vietnamese keyboard" },
  { code: "ko", name: "Korean", flag: "🇰🇷", keywords: "korean keyboard, hangul typing" },
]

export default function MultilingualKeyboard() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [text, setText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isVoiceSupported, setIsVoiceSupported] = useState(false)
  const recognitionRef = useRef<any>(null)
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setIsVoiceSupported(true)
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()

      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ""
        let interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        if (finalTranscript) {
          setText((prev) => prev + finalTranscript)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
        toast({
          title: "Voice input error",
          description: "There was an issue with voice recognition. Please try again.",
          variant: "destructive",
        })
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [toast])

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
      }
      recognitionRef.current.lang = langMap[selectedLanguage] || "en-US"
    }
  }, [selectedLanguage])

  const toggleVoiceInput = () => {
    if (!isVoiceSupported) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input.",
        variant: "destructive",
      })
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
      toast({
        title: "Voice input started",
        description: `Listening in ${selectedLang?.name}...`,
      })
    }
  }

  const speakText = () => {
    if (!text.trim()) {
      toast({
        title: "No text to speak",
        description: "Please type some text first.",
        variant: "destructive",
      })
      return
    }

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = selectedLanguage === "zh" ? "zh-CN" : selectedLanguage === "ar" ? "ar-SA" : selectedLanguage
      speechSynthesis.speak(utterance)

      toast({
        title: "Speaking text",
        description: "Text is being read aloud.",
      })
    } else {
      toast({
        title: "Text-to-speech not supported",
        description: "Your browser doesn't support text-to-speech.",
        variant: "destructive",
      })
    }
  }

  const handleKeyPress = (key: string) => {
    if (key === "Backspace") {
      setText((prev) => prev.slice(0, -1))
    } else if (key === "Space") {
      setText((prev) => prev + " ")
    } else if (key === "Enter") {
      setText((prev) => prev + "\n")
    } else {
      setText((prev) => prev + key)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Text copied to clipboard successfully.",
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy text to clipboard.",
        variant: "destructive",
      })
    }
  }

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `text-${selectedLanguage}-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: "Text file downloaded successfully.",
    })
  }

  const selectedLang = languages.find((lang) => lang.code === selectedLanguage)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header with Dark Mode Toggle */}
        <div className="text-center space-y-4 py-8">
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-10 w-10"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-primary/10">
              <Globe className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground text-balance">
                KeyMundo - Multilingual Virtual Keyboard
              </h1>
              <p className="text-lg text-primary font-medium">Type • Speak • Translate • Create</p>
            </div>
          </div>
          <p className="text-muted-foreground text-balance max-w-2xl mx-auto text-lg">
            Free online virtual keyboard supporting Japanese keyboard, Russian keyboard, Hebrew keyboard, and 20+
            languages. Type with voice input, translate English to Spanish, Russian to English, and more with our
            multilingual typing tool.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-muted-foreground">
            <span className="bg-muted/50 px-3 py-1 rounded-full">Japanese Keyboard</span>
            <span className="bg-muted/50 px-3 py-1 rounded-full">Russian Keyboard</span>
            <span className="bg-muted/50 px-3 py-1 rounded-full">Hebrew Keyboard</span>
            <span className="bg-muted/50 px-3 py-1 rounded-full">English to Spanish</span>
            <span className="bg-muted/50 px-3 py-1 rounded-full">Voice Typing</span>
          </div>
        </div>

        {/* Language Selector - Enhanced Design */}
        <Card className="p-8 shadow-lg border-2 hover:border-primary/20 transition-colors">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <label htmlFor="language-select" className="text-lg font-semibold text-foreground">
                Choose Language
              </label>
            </div>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full sm:w-80 h-12 text-base">
                <SelectValue>
                  {selectedLang && (
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{selectedLang.flag}</span>
                      <span className="font-medium">{selectedLang.name}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Text Input Area - Enhanced with Voice Controls */}
        <Card className="p-8 shadow-lg border-2 hover:border-primary/20 transition-colors">
          <div className="space-y-6">
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
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
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

            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Start typing or use voice input in ${selectedLang?.name || "the selected language"}...`}
                className="w-full h-40 p-6 border-2 border-border rounded-xl bg-card text-card-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-base leading-relaxed"
                dir={["ar", "ur", "he"].includes(selectedLanguage) ? "rtl" : "ltr"}
              />
              {isListening && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  Listening...
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
              <div className="flex gap-6">
                <span>
                  Characters: <span className="font-medium text-foreground">{text.length}</span>
                </span>
                <span>
                  Words:{" "}
                  <span className="font-medium text-foreground">
                    {text.trim() ? text.trim().split(/\s+/).length : 0}
                  </span>
                </span>
              </div>
              <div className="text-xs">
                Language: <span className="font-medium text-foreground">{selectedLang?.name}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Virtual Keyboard - Enhanced Design */}
        <Card className="p-8 shadow-lg border-2 hover:border-primary/20 transition-colors">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <span className="text-lg">{selectedLang?.flag}</span>
              </div>
              Virtual Keyboard - {selectedLang?.name}
            </h2>
            <VirtualKeyboard language={selectedLanguage} onKeyPress={handleKeyPress} />
          </div>
        </Card>

        <footer className="text-center py-8 text-sm text-muted-foreground border-t">
          <div className="space-y-4">
            <p className="font-medium">KeyMundo.com - Free Multilingual Virtual Keyboard</p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <span>Japanese Keyboard</span> • <span>Russian Keyboard</span> • <span>Hebrew Keyboard</span> •
              <span>Arabic Keyboard</span> • <span>English to Spanish</span> • <span>Voice Typing</span> •
              <span>Online Translator</span> • <span>Multilingual Typing Tool</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
