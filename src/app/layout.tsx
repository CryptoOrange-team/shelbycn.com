import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ShelbyCN · 去中心化热存储中文社区", template: "%s · ShelbyCN" },
  description: "Shelby 生态中文第一站。Aptos Labs × Jump Crypto 的去中心化热存储协议，专为 AI 数据和实时应用设计。",
  metadataBase: new URL("https://shelbycn.com"),
  openGraph: { type: "website", locale: "zh_CN", siteName: "ShelbyCN" },
  twitter: { card: "summary_large_image" },
};

const navLinks = [
  { href: "/learn", label: "学习" },
  { href: "/tools", label: "工具" },
  { href: "/blog", label: "文章" },
  { href: "/docs", label: "文档" },
  { href: "/community", label: "社区" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#141415] text-[#e8e8ec] antialiased min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#2a2a2e] bg-[#141415]">
      <div className="max-w-[960px] mx-auto px-5 h-[52px] flex items-center justify-between">
        <a href="/" className="font-bold text-lg flex items-center gap-2">
          <span className="font-mono text-sm text-[#5c5c64]">~/</span>
          Shelby<span className="text-[#f97316]">CN</span>
        </a>
        <nav className="hidden sm:flex items-center gap-0.5">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}
              className="px-3.5 py-2 text-[13px] font-medium text-[#8b8b94] hover:text-[#e8e8ec] hover:bg-[#1f1f22] rounded transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="/community"
          className="px-4 py-1.5 text-[13px] font-semibold border border-[#2a2a2e] hover:border-[#f97316] text-[#e8e8ec] rounded transition-colors">
          加入社区
        </a>
      </div>
    </header>
  );
}

function SiteFooter() {
  const linkStyle = "text-[#8b8b94] hover:text-[#e8e8ec] transition-colors no-underline";

  return (
    <footer className="border-t border-[#2a2a2e] mt-24">
      <div className="max-w-[960px] mx-auto px-5 py-12">
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-10">
          <div className="max-w-xs">
            <div className="font-bold mb-2">Shelby<span className="text-[#f97316]">CN</span></div>
            <p className="text-xs text-[#5c5c64] leading-relaxed">
              Shelby 去中心化热存储协议中文技术社区。非官方组织。内容仅供技术教育参考，不构成投资建议。
            </p>
          </div>
          <div className="flex gap-10 text-xs">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-[#5c5c64] uppercase tracking-wider mb-1">内容</span>
              {["学习","工具","文章","文档","社区"].map(l => (
                <a key={l} href={l === "学习" ? "/learn" : l === "社区" ? "/community" : `/${l}`}
                  className={linkStyle}>{l}</a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-[#5c5c64] uppercase tracking-wider mb-1">法律</span>
              {[
                { label: "风险披露", href: "/legal/disclaimer" },
                { label: "隐私政策", href: "/legal/privacy" },
                { label: "使用条款", href: "/legal/terms" },
              ].map(l => (
                <a key={l.href} href={l.href} className={linkStyle}>{l.label}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="font-mono text-[10px] text-[#5c5c64] pt-8 border-t border-[#2a2a2e] text-center">
          &copy; 2026 ShelbyCN &middot; Aptos Labs &times; Jump Crypto 去中心化热存储协议中文技术社区
        </div>
      </div>
    </footer>
  );
}
