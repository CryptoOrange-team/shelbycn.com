import type { Metadata } from "next";

export const metadata: Metadata = { title: "隐私政策" };

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-zinc">
      <h1 className="text-3xl font-bold mb-6">隐私政策</h1>
      <p>本网站使用 Umami 进行匿名访问统计。Umami 不收集个人身份信息，不使用 Cookie，数据存储在我们的自有服务器上。</p>
      <h2 className="text-xl font-bold mt-6 mb-3">收集的信息</h2>
      <p>页面浏览量、访问来源、设备类型、浏览器类型。均为匿名、聚合数据，无法用于个人追踪。</p>
      <h2 className="text-xl font-bold mt-6 mb-3">邮箱订阅</h2>
      <p>邮件订阅通过 Resend 服务发送。仅收集您主动提供的邮箱地址，仅用于发送社区周报。可随时退订。</p>
      <h2 className="text-xl font-bold mt-6 mb-3">第三方服务</h2>
      <p>本网站使用 Vercel 托管、Resend 邮件服务、Umami 统计。请参阅相应服务的隐私政策。</p>
      <p className="text-sm text-zinc-500 mt-10">最后更新：2026 年 6 月</p>
    </article>
  );
}
