import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Shelby Protocol 中文技术社区 · 去中心化热存储",
    template: "%s · ShelbyCN",
  },
  description:
    "Shelby 生态中文第一站。Aptos Labs × Jump Crypto 打造的去中心化热存储协议，专为 AI 数据和实时应用设计。",
  metadataBase: new URL("https://shelbycn.com"),
  openGraph: { type: "website", locale: "zh_CN", siteName: "ShelbyCN" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="bg-[#0a0a0b] text-[#f4f4f6] antialiased min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}

function Nav() {
  const links = [
    { href: "/learn", label: "学习" },
    { href: "/tools", label: "工具" },
    { href: "/blog", label: "文章" },
    { href: "/docs", label: "文档" },
    { href: "/community", label: "社区" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#222228] bg-[#0a0a0b]/85 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-bold text-white">S</span>
          <span className="font-bold text-lg tracking-tight">
            Shelby<span className="text-blue-400">CN</span>
          </span>
        </a>
        <nav className="hidden sm:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm font-medium text-[#9898a0] hover:text-[#f4f4f6] rounded-lg hover:bg-[#18181c] transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="/community"
          className="px-4 py-2 text-sm font-medium bg-[#111114] border border-[#33333a] hover:border-blue-500/50 hover:bg-[#18181c] text-[#f4f4f6] rounded-xl transition-all"
        >
          加入社区 →
        </a>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-[#222228] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">S</span>
              <span className="font-bold">ShelbyCN</span>
            </div>
            <p className="text-sm text-[#65656c] leading-relaxed">
              Shelby 去中心化热存储协议中文技术社区。非官方组织。纯技术讨论，不构成投资建议。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="space-y-2">
              <div className="text-[#65656c] text-xs uppercase tracking-wider mb-3">内容</div>
              <a href="/learn" className="block text-[#9898a0] hover:text-[#f4f4f6] transition-colors">学习</a>
              <a href="/tools" className="block text-[#9898a0] hover:text-[#f4f4f6] transition-colors">工具</a>
              <a href="/blog" className="block text-[#9898a0] hover:text-[#f4f4f6] transition-colors">文章</a>
              <a href="/docs" className="block text-[#9898a0] hover:text-[#f4f4f6] transition-colors">文档</a>
            </div>
            <div className="space-y-2">
              <div className="text-[#65656c] text-xs uppercase tracking-wider mb-3">法律</div>
              <a href="/legal/disclaimer" className="block text-[#9898a0] hover:text-[#f4f4f6] transition-colors">风险披露</a>
              <a href="/legal/privacy" className="block text-[#9898a0] hover:text-[#f4f4f6] transition-colors">隐私政策</a>
              <a href="/legal/terms" className="block text-[#9898a0] hover:text-[#f4f4f6] transition-colors">使用条款</a>
            </div>
          </div>
        </div>
        <div className="text-xs text-[#65656c] pt-8 border-t border-[#222228] text-center">
          &copy; 2026 ShelbyCN. Aptos Labs &times; Jump Crypto 去中心化热存储协议中文技术社区。
        </div>
      </div>
    </footer>
  );
}
