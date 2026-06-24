export default function Home() {
  return (
    <div className="max-w-[960px] mx-auto px-5">
      <Hero />
      <Stats />
      <ContentFeed />
      <Comparison />
      <ToolsGrid />
      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-14 pb-10">
      <div className="font-mono text-[11px] font-medium text-[#5c5c64] uppercase tracking-wider mb-4">
        / Shelby Protocol 中文技术社区
      </div>
      <h1 className="text-[40px] font-extrabold leading-[1.12] mb-3 max-w-[680px] tracking-tight">
        为 AI 时代重新定义存储
      </h1>
      <p className="text-base text-[#8b8b94] max-w-[560px] mb-6 leading-relaxed">
        Shelby 是 Aptos Labs 与 Jump Crypto 合作开发的热存储协议。亚秒级读取、比 AWS 便宜 70%、链上可验证——专为 AI 训练数据、流媒体和高频读取场景设计。
      </p>
      <div className="flex gap-3 flex-wrap">
        <a href="/learn/what-is-shelby"
          className="px-5 py-2 text-sm font-bold bg-[#f97316] text-white rounded transition-colors hover:brightness-110">
          了解 Shelby
        </a>
        <a href="/learn/testnet-guide"
          className="px-5 py-2 text-sm font-semibold border border-[#2a2a2e] text-[#e8e8ec] rounded hover:border-[#f97316] hover:bg-[#1f1f22] transition-colors">
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
      <div className="grid grid-cols-4 gap-px bg-[#2a2a2e] rounded overflow-hidden">
        {items.map((s, i) => (
          <div key={i} className="bg-[#1a1a1c] p-5 text-center">
            <div className="font-mono text-[28px] font-extrabold text-[#f97316] leading-none">
              {s.value}
              {s.unit && <span className="text-xs text-[#5c5c64] font-medium">{s.unit}</span>}
            </div>
            <div className="text-[11px] font-medium text-[#8b8b94] mt-1.5 uppercase tracking-wide">{s.label}</div>
          </div>
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

  const tagStyle = (tag: string) => {
    if (tag === "指南") return "bg-[#f97316] text-white";
    if (tag === "分析") return "bg-[#1f1f22] text-[#8b8b94] border border-[#2a2a2e]";
    if (tag === "工具") return "bg-[#1f1f22] text-[#8b8b94] border border-[#2a2a2e]";
    return "bg-[#1f1f22] text-[#8b8b94] border border-[#2a2a2e]";
  };

  return (
    <section className="py-8">
      <div className="font-mono text-[11px] font-medium text-[#5c5c64] uppercase tracking-wider mb-3">
        / 最新内容
      </div>
      <div className="border border-[#2a2a2e] rounded overflow-hidden">
        {posts.map((p, i) => (
          <a key={i} href="#"
            className="flex items-center gap-3 px-4 py-3 border-b border-[#2a2a2e] last:border-0 hover:bg-[#1a1a1c] transition-colors group">
            <span className="font-mono text-[11px] text-[#5c5c64] w-5 text-right shrink-0">
              {(i + 1).toString().padStart(2, "0")}
            </span>
            <span className="font-semibold text-sm text-[#e8e8ec] group-hover:text-[#fb923c] transition-colors flex-1 min-w-0 truncate">
              {p.title}
            </span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm shrink-0 ${tagStyle(p.tag)}`}>
              {p.tag}
            </span>
            <span className="font-mono text-[11px] text-[#5c5c64] w-12 text-right shrink-0">{p.date}</span>
          </a>
        ))}
      </div>
      <div className="text-center mt-4">
        <a href="/blog" className="font-mono text-xs text-[#8b8b94] hover:text-[#e8e8ec] transition-colors">
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
    { label: "激励", vals: ["存储证明", "混合", "预付", "Pay-Per-Read"] },
    { label: "$/GB·月", vals: ["$0.19", "$0.05", "一次性", "$0.01"] },
  ];

  return (
    <section className="py-8">
      <div className="font-mono text-[11px] font-medium text-[#5c5c64] uppercase tracking-wider mb-3">
        / 赛道全景
      </div>
      <div className="border border-[#2a2a2e] rounded overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2a2a2e] bg-[#1a1a1c] text-left font-mono text-[10px] text-[#5c5c64] uppercase tracking-wider">
              <th className="py-2.5 pl-4 pr-6 font-medium" />
              <th className="py-2.5 px-5 font-medium">Filecoin</th>
              <th className="py-2.5 px-5 font-medium">Walrus</th>
              <th className="py-2.5 px-5 font-medium">Arweave</th>
              <th className="py-2.5 pr-4 pl-5 font-medium text-[#f97316]">Shelby</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-[#2a2a2e] last:border-0 hover:bg-[#1a1a1c] transition-colors">
                <td className="py-2.5 pl-4 pr-6 font-semibold text-[#e8e8ec]">{row.label}</td>
                {row.vals.map((v, j) => (
                  <td key={j} className={`py-2.5 px-5 text-[#8b8b94] ${j === 3 ? "text-[#f97316] font-semibold" : ""}`}>
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

function ToolsGrid() {
  const tools = [
    { title: "测试网技术体验指南", desc: "零成本了解协议运作。钱包配置、文件上传、自动化脚本——完整指南。", href: "/learn/testnet-guide" },
    { title: "SP 节点收益计算器", desc: "基于 Jump Crypto 成本建模。输入存储量与读取率，预估收益与回本周期。", href: "/tools/sp-calculator" },
    { title: "Shelby 协议深度解析", desc: "技术架构、经济模型、双层审计机制。与五大竞品横向对比。", href: "/learn/what-is-shelby" },
    { title: "中文开发者文档", desc: "SDK、CLI、MCP Server 中文文档。快速入门与可运行示例。", href: "/docs" },
    { title: "去中心化存储赛道全景", desc: "Filecoin、Arweave、Walrus、Storj、Shelby——五维对比分析。", href: "/blog" },
    { title: "中文技术社区", desc: "Telegram 实时讨论、节点运维交流。纯技术，不喊单。", href: "/community" },
  ];

  return (
    <section className="py-8">
      <div className="font-mono text-[11px] font-medium text-[#5c5c64] uppercase tracking-wider mb-3">
        / 核心内容
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2a2a2e] rounded overflow-hidden">
        {tools.map((t, i) => (
          <a key={i} href={t.href}
            className="bg-[#1a1a1c] p-5 hover:bg-[#1f1f22] transition-colors group flex flex-col gap-2">
            <h3 className="font-bold text-sm text-[#e8e8ec] group-hover:text-[#fb923c] transition-colors">{t.title}</h3>
            <p className="text-xs text-[#8b8b94] leading-relaxed flex-1">{t.desc}</p>
            <span className="font-mono text-[10px] text-[#5c5c64] group-hover:text-[#f97316] transition-colors">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-12">
      <div className="border border-[#2a2a2e] rounded p-10 text-center bg-[#1a1a1c]">
        <h2 className="text-2xl font-extrabold mb-2">加入 Shelby 中文社区</h2>
        <p className="text-sm text-[#8b8b94] mb-6 max-w-md mx-auto">
          纯技术讨论。获取最新生态动态、测试网教程和开发者资源。
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="https://t.me/ShelbyCN"
            className="px-6 py-2.5 text-sm font-bold bg-[#f97316] text-white rounded hover:brightness-110 transition-colors">
            Telegram 频道
          </a>
          <a href="https://t.me/ShelbyCN_Chat"
            className="px-6 py-2.5 text-sm font-semibold border border-[#2a2a2e] text-[#e8e8ec] rounded hover:border-[#f97316] transition-colors">
            Telegram 讨论群
          </a>
        </div>
      </div>
    </section>
  );
}
