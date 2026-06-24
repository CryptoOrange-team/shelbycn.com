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
      <body className="bg-[#06060a] text-[#f0f0f5] antialiased min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}

function Nav() {
  const links = ["学习","工具","文章","文档","社区"];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[.06] bg-[#06060a]/80 backdrop-blur-xl">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <span className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-xs font-extrabold text-white shadow-[0_0_16px_rgba(99,102,241,.4)]">
            S
          </span>
          <span className="font-extrabold text-lg tracking-tight text-[#f0f0f5]">
            Shelby<span className="text-indigo-400">CN</span>
          </span>
        </a>
        <nav className="hidden sm:flex items-center gap-0.5">
          {links.map(l => (
            <a key={l} href={l === "学习" ? "/learn" : l === "社区" ? "/community" : `/${l}`}
              className="px-3.5 py-2 text-sm font-medium text-[#9090a8] hover:text-[#f0f0f5] rounded-lg hover:bg-white/[.04] transition-all">
              {l}
            </a>
          ))}
        </nav>
        <a href="/community"
          className="px-4 py-2 text-sm font-semibold bg-white/[.06] border border-white/[.08] hover:border-indigo-400/30 text-[#f0f0f5] rounded-lg transition-all">
          加入社区
        </a>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-white/[.06] mt-32">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-[10px] font-extrabold text-white">S</span>
              <span className="font-extrabold text-lg tracking-tight">Shelby<span className="text-indigo-400">CN</span></span>
            </div>
            <p className="text-sm text-[#585870] leading-relaxed max-w-sm">
              Shelby 去中心化热存储协议中文技术社区。非官方组织。内容仅供技术教育参考，不构成投资建议。
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <div className="text-xs font-semibold text-[#585870] uppercase tracking-widest mb-4">内容</div>
            {["学习","工具","文章","文档","社区"].map(l => (
              <a key={l} href={l === "学习" ? "/learn" : l === "社区" ? "/community" : `/${l}`}
                className="block text-[#9090a8] hover:text-[#f0f0f5] transition-colors">{l}</a>
            ))}
          </div>
          <div className="space-y-3 text-sm">
            <div className="text-xs font-semibold text-[#585870] uppercase tracking-widest mb-4">法律</div>
            {[
              { label: "风险披露", href: "/legal/disclaimer" },
              { label: "隐私政策", href: "/legal/privacy" },
              { label: "使用条款", href: "/legal/terms" },
            ].map(l => (
              <a key={l.href} href={l.href} className="block text-[#9090a8] hover:text-[#f0f0f5] transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
        <div className="text-xs text-[#585870] pt-8 border-t border-white/[.06] text-center">
          &copy; 2026 ShelbyCN &middot; Aptos Labs &times; Jump Crypto 去中心化热存储协议中文技术社区
        </div>
      </div>
    </footer>
  );
}
