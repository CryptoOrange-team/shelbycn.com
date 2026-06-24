import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ShelbyCN · Decentralized Hot Storage Community", template: "%s · ShelbyCN" },
  description: "The #1 Chinese community for Shelby Protocol. Aptos Labs × Jump Crypto decentralized hot storage for AI data and real-time apps.",
  metadataBase: new URL("https://shelbycn.com"),
  openGraph: { type: "website", locale: "zh_CN", siteName: "ShelbyCN" },
  twitter: { card: "summary_large_image" },
};

const navLinks = [
  { href: "/learn", label: "Learn" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/docs", label: "Docs" },
  { href: "/community", label: "Community" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:ital,wght@0,200..800;1,200..800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `
          try { var t=localStorage.getItem('theme'); if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)) document.documentElement.classList.add('dark'); } catch(e) {}
        `}} />
      </head>
      <body className="bg-bg text-text antialiased min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <div className="max-w-[960px] mx-auto px-5 h-[52px] flex items-center justify-between">
        <a href="/" className="font-extrabold text-lg tracking-tight">
          Shelby<span className="text-accent">CN</span>
        </a>
        <nav className="hidden sm:flex items-center gap-0.5">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="px-3.5 py-2 text-[13px] font-medium text-text2 hover:text-text hover:bg-surface2 rounded transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="/community" className="px-4 py-1.5 text-[13px] font-semibold border border-border hover:border-accent text-text rounded transition-colors">
            Join
          </a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-[960px] mx-auto px-5 py-12">
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-10">
          <div className="max-w-xs">
            <div className="font-extrabold mb-2">Shelby<span className="text-accent">CN</span></div>
            <p className="text-xs text-text3 leading-relaxed">
              Shelby Protocol Chinese technical community. Unofficial. Content for educational reference only.
            </p>
          </div>
          <div className="flex gap-10 text-xs">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-text3 uppercase tracking-wider mb-1">Content</span>
              {["Learn","Tools","Blog","Docs","Community"].map(l => (
                <a key={l} href={`/${l.toLowerCase()}`} className="text-text2 hover:text-text transition-colors no-underline">{l}</a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-text3 uppercase tracking-wider mb-1">Legal</span>
              {[{ label: "Disclaimer", href: "/legal/disclaimer" }, { label: "Privacy", href: "/legal/privacy" }, { label: "Terms", href: "/legal/terms" }].map(l => (
                <a key={l.href} href={l.href} className="text-text2 hover:text-text transition-colors no-underline">{l.label}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="font-mono text-[10px] text-text3 pt-8 border-t border-border text-center">
          &copy; 2026 ShelbyCN &middot; Aptos Labs &times; Jump Crypto Decentralized Hot Storage Protocol
        </div>
      </div>
    </footer>
  );
}
