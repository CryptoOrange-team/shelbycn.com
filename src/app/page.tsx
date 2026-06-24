export default function Home() {
  return (
    <div className="max-w-[960px] mx-auto px-5">
      <Hero />
      <Stats />
      <QuickLinks />
      <ContentFeed />
      <Comparison />
      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-14 pb-10">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-4">
        / Shelby Protocol 中文技术社区
      </div>
      <h1 className="text-[40px] font-extrabold leading-[1.12] mb-3 max-w-[680px] tracking-tight">
        为 AI 时代重新定义存储
      </h1>
      <p className="text-base text-text2 max-w-[560px] mb-6 leading-relaxed">
        Shelby 是 Aptos Labs 与 Jump Crypto 合作开发的热存储协议。亚秒级读取、比 AWS 便宜 70%、链上可验证——专为 AI 训练数据、流媒体和高频读取场景设计。
      </p>
      <div className="flex gap-3 flex-wrap">
        <a href="/learn/what-is-shelby"
          className="px-5 py-2 text-sm font-bold bg-accent text-white rounded hover:brightness-110 transition-colors">
          了解 Shelby
        </a>
        <a href="/learn/testnet-guide"
          className="px-5 py-2 text-sm font-semibold border border-border text-text rounded hover:border-accent hover:bg-surface transition-colors">
          测试网体验指南
        </a>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { value: "$0.01", unit: "/GB·月", label: "存储成本" },
    { value: "<2×", unit: "", label: "数据冗余" },
    { value: "600ms", unit: "", label: "最终确认" },
    { value: "30+", unit: " 城市", label: "光纤网络" },
  ];

  return (
    <section className="py-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded overflow-hidden">
        {items.map((s, i) => (
          <div key={i} className="bg-surface p-5 text-center">
            <div className="font-mono text-[28px] font-extrabold text-accent leading-none mb-1">
              {s.value}
              {s.unit && <span className="text-xs text-text3 font-medium">{s.unit}</span>}
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickLinks() {
  const links = [
    { title: "测试网体验指南", desc: "零成本了解协议运作。钱包配置、文件上传、自动化脚本。", href: "/learn/testnet-guide" },
    { title: "SP 收益计算器", desc: "基于 Jump Crypto 成本建模。预估收益与回本周期。", href: "/tools/sp-calculator" },
    { title: "Shelby 协议解析", desc: "技术架构、经济模型、与竞品横向对比。", href: "/learn/what-is-shelby" },
    { title: "中文开发者文档", desc: "SDK、CLI、MCP Server 快速入门与 API 参考。", href: "/docs" },
  ];

  return (
    <section className="py-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded overflow-hidden">
        {links.map((l, i) => (
          <a key={i} href={l.href}
            className="bg-surface p-5 hover:bg-surface2 transition-colors group flex flex-col gap-2">
            <h3 className="font-bold text-sm group-hover:text-accent transition-colors">{l.title}</h3>
            <p className="text-xs text-text2 leading-relaxed flex-1">{l.desc}</p>
            <span className="font-mono text-[10px] text-text3 group-hover:text-accent">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function ContentFeed() {
  const posts = [
    { tag: "指南", title: "Shelby 测试网技术体验指南——零成本了解协议运作机制", date: "06-24" },
    { tag: "分析", title: "去中心化存储赛道全景：Filecoin vs Walrus vs Arweave vs Shelby", date: "06-22" },
    { tag: "工具", title: "SP 节点收益计算器——Jump Crypto 成本建模实时预估", date: "06-20" },
    { tag: "分析", title: "Pay-Per-Read 经济模型深度拆解——为什么是 AI 时代的正确模型", date: "06-18" },
    { tag: "文档", title: "中文开发者文档：SDK 快速入门 + CLI 工具 + MCP Server 配置", date: "06-15" },
    { tag: "指南", title: "Aptos Grant 申请攻略——Shelby 项目怎么拿 $5,000-$50,000", date: "06-12" },
    { tag: "分析", title: "Shelby 生态合作伙伴：Metaplex + Story Protocol + DoubleZero", date: "06-08" },
    { tag: "指南", title: "SP 节点部署实操指南——从硬件选型到监控面板", date: "06-05" },
  ];

  return (
    <section className="py-8">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">
        / 最新内容
      </div>
      <div className="border border-border rounded overflow-hidden">
        {posts.map((p, i) => (
          <a key={i} href="#"
            className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-surface transition-colors group">
            <span className="font-mono text-[11px] text-text3 w-5 text-right shrink-0">
              {(i + 1).toString().padStart(2, "0")}
            </span>
            <span className="font-semibold text-sm group-hover:text-accent transition-colors flex-1 min-w-0 truncate">
              {p.title}
            </span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm shrink-0 ${
              p.tag === "指南" ? "bg-accent text-white" : "bg-surface2 text-text2 border border-border"
            }`}>
              {p.tag}
            </span>
            <span className="font-mono text-[11px] text-text3 w-12 text-right shrink-0">{p.date}</span>
          </a>
        ))}
      </div>
      <div className="text-center mt-4">
        <a href="/blog" className="font-mono text-xs text-text2 hover:text-text transition-colors">
          查看全部 →
        </a>
      </div>
    </section>
  );
}

function Comparison() {
  const rows = [
    { label: "定位", vals: ["冷存储", "通用存储", "永久存储", "AI 热存储"] },
    { label: "读取延迟", vals: ["秒-分级", "秒级", "秒级", "亚秒级"] },
    { label: "激励模型", vals: ["存储证明", "混合", "预付", "Pay-Per-Read"] },
    { label: "$/GB·月", vals: ["$0.19", "$0.05", "一次性", "$0.01"] },
  ];

  return (
    <section className="py-8">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">
        / 赛道全景
      </div>
      <div className="border border-border rounded overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-surface text-left font-mono text-[10px] text-text3 uppercase tracking-wider">
              <th className="py-2.5 pl-4 pr-6 font-medium" />
              <th className="py-2.5 px-5 font-medium">Filecoin</th>
              <th className="py-2.5 px-5 font-medium">Walrus</th>
              <th className="py-2.5 px-5 font-medium">Arweave</th>
              <th className="py-2.5 pr-4 pl-5 font-medium text-accent">Shelby</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.label} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                <td className="py-2.5 pl-4 pr-6 font-semibold">{row.label}</td>
                {row.vals.map((v, j) => (
                  <td key={j} className={`py-2.5 px-5 text-text2 ${j === 3 ? "text-accent font-semibold" : ""}`}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-12">
      <div className="border border-border rounded p-10 text-center bg-surface">
        <h2 className="text-2xl font-extrabold mb-2">加入 Shelby 中文社区</h2>
        <p className="text-sm text-text2 mb-6 max-w-md mx-auto">
          纯技术讨论。获取最新生态动态、测试网教程和开发者资源。
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="https://t.me/ShelbyCN"
            className="px-6 py-2.5 text-sm font-bold bg-accent text-white rounded hover:brightness-110 transition-colors">
            Telegram 频道
          </a>
          <a href="https://t.me/ShelbyCN_Chat"
            className="px-6 py-2.5 text-sm font-semibold border border-border text-text rounded hover:border-accent transition-colors">
            Telegram 讨论群
          </a>
        </div>
      </div>
    </section>
  );
}
