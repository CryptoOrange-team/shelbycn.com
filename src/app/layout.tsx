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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="bg-[#0d0d10] text-[#eaeaea] antialiased min-h-screen flex flex-col bg-dots">
        <TopNav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

function TopNav() {
  const links = [
    { href: "/learn", label: "学习" },
    { href: "/tools", label: "工具" },
    { href: "/blog", label: "文章" },
    { href: "/docs", label: "文档" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#222228]/60 bg-[#0d0d10]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-sm font-extrabold text-black">
            S
          </span>
          <span className="font-extrabold text-lg tracking-tight">
            Shelby<span className="text-amber-500">CN</span>
          </span>
        </a>
        <nav className="hidden sm:flex items-center gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="px-4 py-2 text-sm font-medium text-[#9898a5] hover:text-[#eaeaea] rounded-lg hover:bg-[#1a1a20] transition-all duration-200">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="/community"
          className="px-5 py-2 text-sm font-semibold bg-[#131317] border border-[#33333d] hover:border-amber-500/40 hover:bg-[#1a1a20] text-[#eaeaea] rounded-xl transition-all duration-200">
          加入社区
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#222228]/60 mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-7 rounded-md bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-xs font-extrabold text-black">S</span>
              <span className="font-extrabold text-lg tracking-tight">Shelby<span className="text-amber-500">CN</span></span>
            </div>
            <p className="text-sm text-[#5e5e68] leading-relaxed max-w-xs">
              Shelby 去中心化热存储协议中文技术社区。非官方组织。内容仅供技术教育参考，不构成投资建议。
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold text-[#5e5e68] uppercase tracking-widest mb-4">内容</div>
            <div className="space-y-2.5 text-sm">
              {["学习","工具","文章","文档","社区"].map(l => (
                <a key={l} href={`/${l === "学习" ? "learn" : l === "社区" ? "community" : l}`}
                  className="block text-[#9898a5] hover:text-[#eaeaea] transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-[#5e5e68] uppercase tracking-widest mb-4">法律</div>
            <div className="space-y-2.5 text-sm">
              {[
                { label: "风险披露", href: "/legal/disclaimer" },
                { label: "隐私政策", href: "/legal/privacy" },
                { label: "使用条款", href: "/legal/terms" },
              ].map(l => (
                <a key={l.href} href={l.href}
                  className="block text-[#9898a5] hover:text-[#eaeaea] transition-colors">{l.label}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-xs text-[#5e5e68] pt-8 border-t border-[#222228]/60 text-center">
          &copy; 2026 ShelbyCN &mdash; Aptos Labs &times; Jump Crypto 去中心化热存储协议中文技术社区
        </div>
      </div>
    </footer>
  );
}
