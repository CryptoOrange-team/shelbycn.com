import type { Metadata } from "next";

export const metadata: Metadata = { title: "文档" };

export default function DocsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">文档</h1>
      <p className="text-zinc-400 mb-4">Shelby 中文开发者文档。SDK、CLI、MCP Server。</p>
      <div className="p-8 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center">
        <p className="text-zinc-500">中文文档即将上线。正在翻译中。</p>
      </div>
    </div>
  );
}
