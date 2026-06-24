export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsHero />
      <FeatureCards />
      <ComparisonTable />
      <CTABanner />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-aurora">
      <div className="relative max-w-[1200px] mx-auto px-6 pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="max-w-5xl au-1">
          <div className="slash-label text-indigo-400 mb-6">/ Shelby Protocol 中文社区</div>

          <h1 className="text-[3.25rem] sm:text-6xl md:text-[4.5rem] font-extrabold leading-[1.06] tracking-tight mb-6 max-w-4xl">
            <span className="text-[#f0f0f5]">为 AI 时代</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              重新定义存储
            </span>
          </h1>

          <p className="text-lg text-[#9090a8] max-w-2xl leading-relaxed mb-10 au-2">
            Shelby 是 Aptos Labs 与 Jump Crypto 合作开发的热存储协议。
            亚秒级读取、比 AWS 便宜 70%、链上可验证。
          </p>

          <div className="flex gap-3 flex-wrap au-3">
            <a href="/learn/what-is-shelby"
              className="px-6 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-semibold text-sm transition-all shadow-[0_0_24px_rgba(99,102,241,.25)]">
              了解 Shelby
            </a>
            <a href="/learn/testnet-guide"
              className="px-6 py-3.5 bg-white/[.05] hover:bg-white/[.08] border border-white/[.08] hover:border-white/[.12] text-[#f0f0f5] rounded-xl font-semibold text-sm transition-all">
              测试网体验指南
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsHero() {
  const stats = [
    { value: "$0.01", unit: "/GB·月", label: "存储成本", sub: "比 AWS S3 便宜 70%" },
    { value: "<2×", unit: "", label: "数据冗余", sub: "Clay 纠删码高效容错" },
    { value: "600ms", unit: "", label: "交易最终确认", sub: "Aptos 高性能结算层" },
    { value: "30+", unit: " 城市", label: "光纤网络覆盖", sub: "DoubleZero 专用骨干网" },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="slash-label text-[#585870] mb-10">/ 关键数据</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-white/[.04] rounded-2xl overflow-hidden">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#0c0c14] p-7 text-center">
            <div className="text-[2.5rem] font-extrabold text-indigo-400 leading-none mb-2 tracking-tight">
              {s.value}
              {s.unit && <span className="text-lg text-[#585870] font-medium">{s.unit}</span>}
            </div>
            <div className="text-xs font-semibold text-[#f0f0f5] uppercase tracking-wider mb-1">{s.label}</div>
            <div className="text-xs text-[#585870]">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureCards() {
  const features = [
    {
      icon: "📖",
      title: "测试网技术体验",
      desc: "零成本了解 Shelby 协议运作机制。Petra 钱包配置、文件上传、自动化交互——完整操作指南。",
      href: "/learn/testnet-guide",
      gradient: "from-indigo-500/10 to-indigo-500/5",
    },
    {
      icon: "📊",
      title: "SP 节点收益计算器",
      desc: "基于 Jump Crypto 成本建模。输入存储量与读取率，实时预估月收益、ROI 和回本周期。",
      href: "/tools/sp-calculator",
      gradient: "from-cyan-500/10 to-cyan-500/5",
    },
    {
      icon: "🔍",
      title: "Shelby 协议深度解析",
      desc: "技术架构、Pay-Per-Read 经济模型、双层审计机制。与 Filecoin/Walrus/Arweave 横向对比。",
      href: "/learn/what-is-shelby",
      gradient: "from-indigo-500/10 to-indigo-500/5",
    },
    {
      icon: "🛠",
      title: "中文开发者文档",
      desc: "SDK、CLI、MCP Server 中文文档。快速入门、API 参考、可运行的示例项目。",
      href: "/docs",
      gradient: "from-teal-500/10 to-teal-500/5",
    },
    {
      icon: "🌐",
      title: "去中心化存储赛道全景",
      desc: "Filecoin、Arweave、Walrus、Storj、Shelby——五维对比分析。冷存储 vs 永久存储 vs AI 热存储。",
      href: "/blog",
      gradient: "from-purple-500/10 to-purple-500/5",
    },
    {
      icon: "💬",
      title: "中文技术社区",
      desc: "Telegram 实时讨论、问题解答、节点运维交流。纯技术讨论——不喊单，不带单。",
      href: "/community",
      gradient: "from-indigo-500/10 to-indigo-500/5",
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="slash-label text-[#585870] mb-4">/ 核心内容</div>
      <h2 className="text-4xl font-extrabold tracking-tight mb-4">从零开始<span className="text-indigo-400"> 系统了解 </span>Shelby</h2>
      <p className="text-[#9090a8] max-w-xl mb-12 leading-relaxed">
        教程、工具、分析、文档——构建你对下一代去中心化存储协议的完整认知。
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <a key={i} href={f.href}
            className={`group p-6 rounded-2xl border border-white/[.06] bg-gradient-to-b ${f.gradient} hover:border-white/[.12] hover:bg-white/[.06] transition-all duration-300`}>
            <div className="text-2xl mb-4">{f.icon}</div>
            <h3 className="font-bold text-[15px] mb-2 group-hover:text-indigo-300 transition-colors">{f.title}</h3>
            <p className="text-[13px] text-[#9090a8] leading-relaxed">{f.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { label: "定位", vals: ["冷存储", "通用存储", "永久存储", "AI 热存储"] },
    { label: "读取延迟", vals: ["秒-分级", "秒级", "秒级", "亚秒级"] },
    { label: "激励模型", vals: ["存储证明", "混合", "提前付费", "Pay-Per-Read"] },
    { label: "成本/GB·月", vals: ["$0.19", "$0.05", "一次性", "$0.01"] },
    { label: "去中心化度", vals: ["高", "中", "中", "高"] },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="slash-label text-[#585870] mb-4">/ 赛道全景</div>
      <h2 className="text-4xl font-extrabold tracking-tight mb-4">去中心化存储<span className="text-indigo-400"> 横向对比</span></h2>
      <p className="text-[#9090a8] max-w-xl mb-12 leading-relaxed">
        Shelby 是唯一专为 AI 热存储场景设计的协议。速度、成本、验证——全面领先。
      </p>

      <div className="bg-[#0c0c14] rounded-2xl border border-white/[.06] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[.06] text-left text-[#585870] text-xs uppercase tracking-wider">
                <th className="py-4 pl-8 pr-6 font-semibold" />
                <th className="py-4 px-6 font-semibold">Filecoin</th>
                <th className="py-4 px-6 font-semibold">Walrus</th>
                <th className="py-4 px-6 font-semibold">Arweave</th>
                <th className="py-4 pr-8 pl-6 font-semibold text-indigo-400 bg-indigo-500/5">Shelby</th>
              </tr>
            </thead>
            <tbody className="text-[#9090a8]">
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-white/[.04] hover:bg-white/[.02] transition-colors">
                  <td className="py-3.5 pl-8 pr-6 font-semibold text-[#f0f0f5] text-xs">{row.label}</td>
                  {row.vals.map((v, j) => (
                    <td key={j} className={`py-3.5 px-6 text-xs ${j === 3 ? "text-indigo-400 font-semibold bg-indigo-500/[.03]" : ""}`}>
                      {v}
                    </td>
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

function CTABanner() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#0c0c14] border border-white/[.06] p-12 md:p-16 text-center bg-aurora">
        <h2 className="text-4xl font-extrabold tracking-tight mb-3">加入 Shelby 中文社区</h2>
        <p className="text-[#9090a8] mb-10 max-w-lg mx-auto leading-relaxed">
          纯技术讨论。获取最新生态动态、测试网教程和开发者资源。
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="https://t.me/ShelbyCN"
            className="px-7 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-semibold text-sm transition-all shadow-[0_0_24px_rgba(99,102,241,.25)]">
            Telegram 频道
          </a>
          <a href="https://t.me/ShelbyCN_Chat"
            className="px-7 py-3.5 bg-white/[.05] hover:bg-white/[.08] border border-white/[.08] text-[#f0f0f5] rounded-xl font-semibold text-sm transition-all">
            Telegram 讨论群
          </a>
          <a href="https://x.com/ShelbyCN"
            className="px-7 py-3.5 text-[#9090a8] hover:text-[#f0f0f5] font-semibold text-sm transition-colors">
            X / Twitter →
          </a>
        </div>
      </div>
    </section>
  );
}
