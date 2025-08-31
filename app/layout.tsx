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
    "KeyMundo - Multilingual Virtual Keyboard | Type in 20+ Languages Online",
  description:
    "Free online multilingual virtual keyboard supporting 20+ languages including Japanese keyboard, Russian keyboard, Arabic keyboard. Type, translate and convert text with voice input. English to Spanish, Russian to English translation tools.",
  keywords:
    "virtual keyboard, multilingual keyboard, japanese keyboard, russian keyboard, hebrew keyboard, katakana, english to spanish, spanish to english, russian to english, greek to english, portuguese to english, online keyboard, voice typing, language translator",
  generator: "KeyMundo.com",
  metadataBase: new URL("https://keymundo.com"),
  openGraph: {
    title: "KeyMundo - Multilingual Virtual Keyboard",
    description:
      "Type in 20+ languages with our free virtual keyboard. Supports Japanese, Russian, Arabic, Hebrew keyboards and more.",
    url: "https://keymundo.com",
    siteName: "KeyMundo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KeyMundo - Multilingual Virtual Keyboard",
    description: "Free online keyboard for 20+ languages with voice input",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.ico", // 👈 added favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
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
