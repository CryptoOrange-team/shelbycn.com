import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Shelby Protocol 中文技术社区 — Aptos × Jump Crypto 去中心化热存储",
    template: "%s | ShelbyCN",
  },
  description:
    "Shelby 生态中文第一站。了解 Aptos Labs × Jump Crypto 打造的去中心化热存储协议。测试网技术体验指南、SP 节点收益计算器、中文开发者文档。",
  metadataBase: new URL("https://shelbycn.com"),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "ShelbyCN",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="border-b border-zinc-800 sticky top-0 bg-zinc-950/80 backdrop-blur z-50">
      <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-6 text-sm">
        <a href="/" className="font-bold text-base tracking-tight">
          Shelby<span className="text-blue-400">CN</span>
        </a>
        <a href="/learn" className="text-zinc-400 hover:text-white transition-colors">学习</a>
        <a href="/tools" className="text-zinc-400 hover:text-white transition-colors">工具</a>
        <a href="/blog" className="text-zinc-400 hover:text-white transition-colors">文章</a>
        <a href="/docs" className="text-zinc-400 hover:text-white transition-colors">文档</a>
        <a href="/community" className="text-zinc-400 hover:text-white transition-colors">社区</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-800 mt-16 py-8 text-xs text-zinc-500">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          ShelbyCN &copy; 2026 &mdash; Aptos &times; Jump Crypto 去中心化热存储协议中文技术社区。
          非官方社区。本站内容仅供技术教育参考，不构成投资建议。
        </div>
        <div className="flex gap-4">
          <a href="/legal/disclaimer" className="hover:text-zinc-300 transition-colors">风险披露</a>
          <a href="/legal/privacy" className="hover:text-zinc-300 transition-colors">隐私政策</a>
          <a href="/legal/terms" className="hover:text-zinc-300 transition-colors">使用条款</a>
        </div>
      </div>
    </footer>
  );
}
