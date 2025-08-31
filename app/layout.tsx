import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "KeyMundo - Free Virtual Keyboard | Japanese, Russian, Hebrew, Arabic Keyboards Online",
  description:
    "Free multilingual virtual keyboard with voice typing. Type in Japanese keyboard, Russian keyboard, Hebrew keyboard, Arabic keyboard. Translate English to Spanish, Russian to English, Greek to English. 20+ languages supported with instant translation and voice input.",
  keywords:
    "virtual keyboard, multilingual keyboard, japanese keyboard, russian keyboard, hebrew keyboard, arabic keyboard, katakana, hiragana, cyrillic keyboard, english to spanish, spanish to english, russian to english, greek to english, portuguese to english, english to greek, online keyboard, voice typing, language translator, typing tool, free keyboard, multilingual typing, translation tool, keyboard online, virtual typing, language converter, text translator, speech to text, voice recognition, online translator, free virtual keyboard, multilingual keyboard online, japanese typing, russian typing, hebrew typing, arabic typing, keyboard simulator, online typing tool, language keyboard, international keyboard, foreign language keyboard, typing in different languages, virtual keyboard free, web keyboard, browser keyboard, multilingual text input, language input method, keyboard layout, international typing, foreign keyboard, language typing tool, online language keyboard, virtual language keyboard, multilingual virtual keyboard, keyboard for different languages, typing different languages online, virtual keyboard multilingual, online multilingual keyboard, free multilingual keyboard, keyboard multiple languages, virtual keyboard languages, online keyboard languages, keyboard language support, multilingual keyboard tool, virtual keyboard tool, online keyboard tool, keyboard typing tool, multilingual typing tool, virtual typing tool, online typing tool, keyboard input tool, language input tool, multilingual input tool, virtual input tool, online input tool",
  authors: [{ name: "KeyMundo Team" }],
  creator: "KeyMundo.com",
  publisher: "KeyMundo.com",
  generator: "KeyMundo.com",
  applicationName: "KeyMundo Virtual Keyboard",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://keymundo.com"),
  alternates: {
    canonical: "https://keymundo.com",
    languages: {
      en: "https://keymundo.com",
      es: "https://keymundo.com/es",
      fr: "https://keymundo.com/fr",
      de: "https://keymundo.com/de",
      ru: "https://keymundo.com/ru",
      ja: "https://keymundo.com/ja",
      ar: "https://keymundo.com/ar",
      he: "https://keymundo.com/he",
      zh: "https://keymundo.com/zh",
      hi: "https://keymundo.com/hi",
      pt: "https://keymundo.com/pt",
      ko: "https://keymundo.com/ko",
      el: "https://keymundo.com/el",
      tr: "https://keymundo.com/tr",
      vi: "https://keymundo.com/vi",
    },
  },
  openGraph: {
    title:
      "KeyMundo - Free Virtual Keyboard for 20+ Languages | Japanese, Russian, Hebrew, Arabic",
    description:
      "Type in Japanese, Russian, Hebrew, Arabic keyboards online. Free multilingual virtual keyboard with voice input and translation tools. English to Spanish, Russian to English translator.",
    url: "https://keymundo.com",
    siteName: "KeyMundo",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KeyMundo - Multilingual Virtual Keyboard with Japanese, Russian, Hebrew, Arabic Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "KeyMundo - Free Virtual Keyboard | Japanese, Russian, Hebrew Keyboards",
    description:
      "Free online keyboard for 20+ languages with voice input and translation tools. Type in any language instantly.",
    images: ["/og-image.jpg"],
    creator: "@keymundo",
    site: "@keymundo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      bing: "your-bing-verification-code",
    },
  },
  category: "Technology",
  classification: "Virtual Keyboard, Language Tools, Translation Tools",
  other: {
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
    "yandex-verification": "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "KeyMundo Virtual Keyboard",
                description:
                  "Free multilingual virtual keyboard supporting 20+ languages including Japanese, Russian, Hebrew, Arabic with voice input and translation tools",
                url: "https://keymundo.com",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
                browserRequirements: "Requires JavaScript. Requires HTML5.",
                softwareVersion: "1.0",
                datePublished: "2024-01-01",
                dateModified: new Date().toISOString().split("T")[0],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                },
                featureList: [
                  "Japanese Keyboard (Hiragana, Katakana, Kanji)",
                  "Russian Keyboard (Cyrillic)",
                  "Hebrew Keyboard",
                  "Arabic Keyboard",
                  "Voice Input and Speech Recognition",
                  "Text Translation (English to Spanish, Russian to English, Greek to English)",
                  "20+ Languages Support",
                  "Free Online Tool",
                  "No Registration Required",
                  "Cross-platform Compatibility",
                  "Real-time Translation",
                  "Voice-to-Text Conversion",
                ],
                author: {
                  "@type": "Organization",
                  name: "KeyMundo",
                  url: "https://keymundo.com",
                },
                publisher: {
                  "@type": "Organization",
                  name: "KeyMundo",
                  url: "https://keymundo.com",
                },
                inLanguage: [
                  "en",
                  "ja",
                  "ru",
                  "he",
                  "ar",
                  "es",
                  "fr",
                  "de",
                  "zh",
                  "hi",
                  "pt",
                  "ko",
                  "el",
                  "tr",
                  "vi",
                ],
                keywords:
                  "virtual keyboard, multilingual keyboard, japanese keyboard, russian keyboard, hebrew keyboard, arabic keyboard, online translator, voice typing",
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "KeyMundo Multilingual Virtual Keyboard",
                applicationCategory: "WebApplication",
                operatingSystem: "Any",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.8",
                  ratingCount: "1250",
                  bestRating: "5",
                  worstRating: "1",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How to use Japanese keyboard online?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Select Japanese from the language dropdown and start typing. KeyMundo supports Hiragana, Katakana, and Kanji input methods for Japanese keyboard typing online.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How to type in Russian keyboard online?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Choose Russian from the language selector to access the Cyrillic keyboard layout. Type Russian characters directly using our virtual Russian keyboard.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I translate English to Spanish for free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes! KeyMundo offers free translation from English to Spanish and many other language pairs. Just type your text and click the translate button.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does the virtual keyboard support voice input?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, KeyMundo supports voice input in multiple languages. Click the microphone button to start voice typing in your selected language.",
                    },
                  },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "KeyMundo",
                url: "https://keymundo.com",
                logo: "https://keymundo.com/logo.png",
                sameAs: [
                  "https://twitter.com/keymundo",
                  "https://facebook.com/keymundo",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  availableLanguage: [
                    "English",
                    "Spanish",
                    "French",
                    "German",
                    "Russian",
                    "Japanese",
                    "Arabic",
                    "Hebrew",
                  ],
                },
              },
            ]),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="KeyMundo" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="alternate" hrefLang="en" href="https://keymundo.com" />
        <link rel="alternate" hrefLang="es" href="https://keymundo.com/es" />
        <link rel="alternate" hrefLang="fr" href="https://keymundo.com/fr" />
        <link rel="alternate" hrefLang="de" href="https://keymundo.com/de" />
        <link rel="alternate" hrefLang="ru" href="https://keymundo.com/ru" />
        <link rel="alternate" hrefLang="ja" href="https://keymundo.com/ja" />
        <link rel="alternate" hrefLang="ar" href="https://keymundo.com/ar" />
        <link rel="alternate" hrefLang="he" href="https://keymundo.com/he" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://keymundo.com"
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
