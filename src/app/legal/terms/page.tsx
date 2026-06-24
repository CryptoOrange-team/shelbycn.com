import type { Metadata } from "next";

export const metadata: Metadata = { title: "使用条款" };

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-zinc">
      <h1 className="text-3xl font-bold mb-6">使用条款</h1>
      <p>使用本网站即表示您同意以下条款。请仔细阅读。</p>
      <h2 className="text-xl font-bold mt-6 mb-3">内容所有权</h2>
      <p>本网站原创内容采用 CC BY-NC-SA 4.0 许可证。翻译内容版权归原作者所有。</p>
      <h2 className="text-xl font-bold mt-6 mb-3">社区行为准则</h2>
      <p>加入社区即表示您同意遵守社区规则（见 /community 页面）。违反规则可能导致移除。</p>
      <h2 className="text-xl font-bold mt-6 mb-3">免责</h2>
      <p>详见风险披露声明（/legal/disclaimer）。</p>
      <p className="text-sm text-zinc-500 mt-10">最后更新：2026 年 6 月</p>
    </article>
  );
}
