export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Comparison />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 glow-t" />
      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#131317] border border-[#222228] text-xs font-medium text-[#9898a5] mb-10 animate-in">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(16,185,129,.5)]" />
            测试网已上线 &middot; 主网 2026 下半年
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black leading-[1.06] tracking-tight mb-8 animate-in">
            为 AI 时代
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 bg-clip-text text-transparent">
              重新定义存储
            </span>
          </h1>

          <p className="text-lg text-[#9898a5] max-w-2xl leading-relaxed mb-12 animate-in">
            Shelby 是 Aptos Labs 与 Jump Crypto 合作开发的热存储协议。
            亚秒级读取、比 AWS 便宜 70%、链上可验证——
            专为 AI 训练数据、流媒体和高频读取场景设计。
          </p>

          <div className="flex gap-3 flex-wrap animate-in">
            <a href="/learn/what-is-shelby"
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold text-sm transition-all shadow-[0_0_30px_rgba(245,158,11,.2)] hover:shadow-[0_0_40px_rgba(245,158,11,.35)]">
              了解 Shelby
            </a>
            <a href="/learn/testnet-guide"
              className="px-6 py-3.5 bg-[#131317] hover:bg-[#1a1a20] border border-[#33333d] hover:border-[#55555d] text-[#eaeaea] rounded-xl font-semibold text-sm transition-all">
              测试网体验指南
            </a>
            <a href="/community"
              className="px-6 py-3.5 text-[#9898a5] hover:text-[#eaeaea] font-semibold text-sm transition-colors">
              加入社区 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { value: "$0.01", label: "存储 / GB · 月", note: "比 AWS S3 便宜 70%" },
    { value: "<2×", label: "数据冗余", note: "Clay 纠删码，高效容错" },
    { value: "600ms", label: "交易最终确认", note: "Aptos 高性能结算层" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid sm:grid-cols-3 gap-px bg-[#222228]/40 rounded-2xl overflow-hidden">
        {items.map((s, i) => (
          <div key={i} className="bg-[#131317] p-8 animate-in">
            <div className="text-4xl font-extrabold text-amber-500 mb-2 tracking-tight font-display">{s.value}</div>
            <div className="text-sm font-semibold text-[#eaeaea] mb-1">{s.label}</div>
            <div className="text-xs text-[#5e5e68]">{s.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const cards = [
    {
      num: "01",
      title: "测试网技术体验",
      desc: "零成本了解 Shelby 协议运作机制。完整操作指南：钱包配置、文件上传、多场景交互。",
      href: "/learn/testnet-guide",
      accent: "amber" as const,
    },
    {
      num: "02",
      title: "SP 节点收益计算器",
      desc: "基于 Jump Crypto 成本建模。输入存储量与读取率，实时预估月收益和回本周期。",
      href: "/tools/sp-calculator",
      accent: "green" as const,
    },
    {
      num: "03",
      title: "Shelby 协议深度解析",
      desc: "技术架构、Pay-Per-Read 经济模型、与 Filecoin/Walrus/Arweave 横向对比。",
      href: "/learn/what-is-shelby",
      accent: "blue" as const,
    },
    {
      num: "04",
      title: "中文开发者文档",
      desc: "SDK、CLI、MCP Server 中文文档。快速入门、API 参考、可运行示例项目。",
      href: "/docs",
      accent: "purple" as const,
    },
  ];

  const accents = {
    amber: { border: "border-amber-500/15 hover:border-amber-500/30", bg: "bg-amber-500/5", num: "text-amber-500" },
    green: { border: "border-green-500/15 hover:border-green-500/30", bg: "bg-green-500/5", num: "text-green-500" },
    blue: { border: "border-blue-500/15 hover:border-blue-500/30", bg: "bg-blue-500/5", num: "text-blue-400" },
    purple: { border: "border-purple-500/15 hover:border-purple-500/30", bg: "bg-purple-500/5", num: "text-purple-400" },
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="mb-16 animate-in">
        <div className="text-xs font-semibold text-[#5e5e68] uppercase tracking-widest mb-4">核心内容</div>
        <h2 className="font-display text-4xl font-black tracking-tight mb-4">
          从零开始，<span className="text-amber-500">系统了解</span> Shelby
        </h2>
        <p className="text-[#9898a5] max-w-xl leading-relaxed">
          教程、工具、分析、文档——构建你对下一代去中心化存储协议的完整认知。
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {cards.map((c) => (
          <a key={c.num} href={c.href}
            className={`group p-7 rounded-2xl border ${accents[c.accent].border} ${accents[c.accent].bg} transition-all duration-300 hover:scale-[1.01] animate-in`}>
            <div className={`font-mono text-xs font-bold mb-5 ${accents[c.accent].num}`}>{c.num}</div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-[#eaeaea] transition-colors">{c.title}</h3>
            <p className="text-sm text-[#9898a5] leading-relaxed mb-4">{c.desc}</p>
            <span className="text-sm font-semibold text-[#5e5e68] group-hover:text-amber-500 transition-colors">探索 →</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Comparison() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 border-t border-[#222228]/60">
      <div className="mb-16 animate-in">
        <div className="text-xs font-semibold text-[#5e5e68] uppercase tracking-widest mb-4">赛道全景</div>
        <h2 className="font-display text-4xl font-black tracking-tight mb-4">
          去中心化存储 <span className="text-amber-500">横向对比</span>
        </h2>
        <p className="text-[#9898a5] max-w-xl leading-relaxed">
          Shelby 是唯一专为 AI 热存储场景设计的协议。读取速度、成本模型、数据验证机制——全面领先。
        </p>
      </div>

      <div className="bg-[#131317] rounded-3xl border border-[#222228]/60 overflow-hidden animate-in">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#222228] text-left text-[#5e5e68] text-xs uppercase tracking-wider">
                <th className="py-5 pl-8 pr-6 font-semibold" />
                <th className="py-5 px-6 font-semibold">Filecoin</th>
                <th className="py-5 px-6 font-semibold">Walrus</th>
                <th className="py-5 px-6 font-semibold">Arweave</th>
                <th className="py-5 pr-8 pl-6 font-semibold text-amber-500">Shelby</th>
              </tr>
            </thead>
            <tbody className="text-[#9898a5]">
              {[
                { label: "定位", vals: ["冷存储", "通用存储", "永久存储", "AI 热存储"] },
                { label: "读取延迟", vals: ["秒-分级", "秒级", "秒级", "亚秒级"] },
                { label: "激励模型", vals: ["存储证明", "混合", "提前付费", "Pay-Per-Read"] },
                { label: "成本/GB·月", vals: ["$0.19", "$0.05", "一次性", "$0.01"] },
              ].map((row) => (
                <tr key={row.label} className="border-b border-[#222228]/60 hover:bg-[#1a1a20]/50 transition-colors">
                  <td className="py-4 pl-8 pr-6 font-semibold text-[#eaeaea] text-xs">{row.label}</td>
                  {row.vals.map((v, j) => (
                    <td key={j} className={`py-4 px-6 text-xs ${j === 4 ? "text-amber-500 font-semibold" : ""}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 border-t border-[#222228]/60">
      <div className="relative overflow-hidden rounded-3xl bg-[#131317] border border-[#222228]/60 p-12 md:p-16 text-center">
        <div className="absolute inset-0 glow-b opacity-60" />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="font-display text-4xl font-black tracking-tight mb-4">准备好开始了吗？</h2>
          <p className="text-[#9898a5] mb-10 leading-relaxed">
            加入 Shelby 中文技术社区。纯技术讨论，获取最新生态动态、测试网教程和开发者资源。
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="https://t.me/ShelbyCN"
              className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold text-sm transition-all shadow-[0_0_30px_rgba(245,158,11,.2)]">
              Telegram 频道
            </a>
            <a href="https://t.me/ShelbyCN_Chat"
              className="px-7 py-3.5 bg-[#0d0d10] hover:bg-[#1a1a20] border border-[#33333d] hover:border-[#55555d] text-[#eaeaea] rounded-xl font-semibold text-sm transition-all">
              Telegram 讨论群
            </a>
            <a href="https://x.com/ShelbyCN"
              className="px-7 py-3.5 text-[#9898a5] hover:text-[#eaeaea] font-semibold text-sm transition-colors">
              X / Twitter →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
