import type { Metadata } from "next";

export const metadata: Metadata = { title: "博客" };

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">文章</h1>
      <p className="text-zinc-400 mb-8">Shelby 生态深度分析、技术教程、行业研究。</p>
      <div className="p-8 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center">
        <p className="text-zinc-500">内容即将上线。订阅邮件通讯获取最新文章通知。</p>
      </div>
    </div>
  );
}
