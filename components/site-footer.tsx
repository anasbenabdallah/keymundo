export function SiteFooter() {
  return (
    <footer className="max-w-5xl mx-auto p-6 space-y-8 text-sm">
      <section className="bg-card/30 p-6 rounded-xl border space-y-4">
        <h2 className="text-2xl font-bold text-center">Why Choose KeyMundo Virtual Keyboard?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold">100% Free</h3>
            <p className="text-muted-foreground">No registration required. Use all features for free.</p>
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-semibold">20+ Languages</h3>
            <p className="text-muted-foreground">Japanese, Russian, Hebrew, Arabic, and more.</p>
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Voice Input</h3>
            <p className="text-muted-foreground">Speech-to-text in multiple languages.</p>
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Fast & Simple</h3>
            <p className="text-muted-foreground">Lightweight, keyboard-focused experience.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        <div>
          <h4 className="font-semibold mb-3">KeyMundo.com - Free Multilingual Virtual Keyboard</h4>
          <h5 className="font-semibold mb-2">Popular Virtual Keyboards</h5>
          <ul className="space-y-1">
            <li>Japanese Keyboard Online</li>
            <li>Russian Keyboard (Cyrillic)</li>
            <li>Hebrew Keyboard</li>
            <li>Arabic Keyboard</li>
            <li>Greek Keyboard</li>
            <li>Chinese Keyboard</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Features</h5>
          <ul className="space-y-1">
            <li>Voice Typing Online</li>
            <li>Speech to Text</li>
            <li>Multilingual Keyboard</li>
            <li>Virtual Keyboard Free</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">About</h5>
          <p className="text-muted-foreground">
            KeyMundo is a free online virtual keyboard for 20+ languages with voice input. Perfect for multilingual typing and language learning — no registration required.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {["Japanese Keyboard","Russian Keyboard","Hebrew Keyboard","Arabic Keyboard","Voice Typing","Multilingual Typing Tool","Katakana Keyboard","Cyrillic Keyboard","Virtual Keyboard Free","Speech to Text"].map((t) => (
          <span key={t} className="bg-muted/50 px-2 py-1 rounded">{t}</span>
        ))}
      </div>

      <div className="text-center text-xs text-muted-foreground space-y-2 pt-4 border-t">
        <div>© 2025 KeyMundo.com - Free Virtual Keyboard for All Languages | All rights reserved</div>
        <div className="flex items-center justify-center gap-3">
          <a className="hover:text-primary" href="#">Privacy Policy</a>
          <span>•</span>
          <a className="hover:text-primary" href="#">Terms of Service</a>
          <span>•</span>
          <a className="hover:text-primary" href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

