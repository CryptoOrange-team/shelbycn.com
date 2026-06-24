export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturesGrid />
      <ComparisonTeaser />
      <CTASection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 glow-blue" />
      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111114] border border-[#33333a] text-xs text-[#9898a0] mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          测试网已上线 · 主网 2026 下半年
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 max-w-4xl mx-auto">
          <span className="text-[#f4f4f6]">去中心化存储</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            为 AI 时代而建
          </span>
        </h1>
        <p className="text-lg text-[#9898a0] max-w-2xl mx-auto mb-10 leading-relaxed">
          Shelby 是 Aptos Labs 与 Jump Crypto 合作开发的热存储协议。
          亚秒级读取、比 AWS 便宜 70%、链上可验证——专为 AI 训练数据、流媒体和高频读取场景设计。
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="/learn/what-is-shelby" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40">
            了解 Shelby →
          </a>
          <a href="/learn/testnet-guide" className="px-6 py-3 bg-[#111114] hover:bg-[#18181c] border border-[#33333a] hover:border-[#55555d] text-[#f4f4f6] rounded-xl font-semibold text-sm transition-all">
            测试网体验指南
          </a>
          <a href="/community" className="px-6 py-3 bg-[#111114] hover:bg-[#18181c] border border-[#33333a] hover:border-[#55555d] text-[#9898a0] rounded-xl font-semibold text-sm transition-all">
            加入社区
          </a>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const items = [
    { value: "~$0.01", label: "每 GB 月费", sub: "比 AWS 便宜 70%" },
    { value: "<2×", label: "复制因子", sub: "Clay 纠删码" },
    { value: "600ms", label: "交易最终性", sub: "Aptos 结算层" },
    { value: "30+", label: "覆盖城市", sub: "DoubleZero 光纤网络" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#222228] rounded-2xl overflow-hidden">
        {items.map((s, i) => (
          <div key={i} className="bg-[#111114] p-6 text-center">
            <div className="text-3xl font-extrabold text-blue-400 mb-1 tracking-tight">{s.value}</div>
            <div className="text-sm font-medium text-[#f4f4f6]">{s.label}</div>
            <div className="text-xs text-[#65656c] mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesGrid() {
  const cards = [
    {
      tag: "指南",
      title: "测试网技术体验",
      desc: "零成本了解 Shelby 协议运作机制。Petra 钱包配置、文件上传、自动化脚本——完整操作指南。",
      href: "/learn/testnet-guide",
      accent: "blue" as const,
    },
    {
      tag: "工具",
      title: "SP 节点收益计算器",
      desc: "基于 Jump Crypto 成本建模。输入存储量与读取率，实时预估月收益、ROI 和回本周期。",
      href: "/tools/sp-calculator",
      accent: "green" as const,
    },
    {
      tag: "分析",
      title: "Shelby 协议详解",
      desc: "技术架构、经济模型、竞争对手对比。为什么 Pay-per-Read 是 AI 时代存储的正确模型。",
      href: "/learn/what-is-shelby",
      accent: "blue" as const,
    },
    {
      tag: "开发者",
      title: "中文文档与工具",
      desc: "Shelby SDK、CLI、MCP Server 中文文档。快速入门、API 参考、示例项目。",
      href: "/docs",
      accent: "purple" as const,
    },
  ];

  const accentStyles = {
    blue: "border-blue-500/20 hover:border-blue-500/40 bg-blue-500/5",
    green: "border-green-500/20 hover:border-green-500/40 bg-green-500/5",
    purple: "border-purple-500/20 hover:border-purple-500/40 bg-purple-500/5",
  };

  const tagStyles = {
    blue: "bg-blue-500/10 text-blue-400",
    green: "bg-green-500/10 text-green-400",
    purple: "bg-purple-500/10 text-purple-400",
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight mb-3">核心内容</h2>
        <p className="text-[#9898a0]">
          从零了解 Shelby 协议。教程、工具、分析、文档——全部中文。
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {cards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className={`group p-6 rounded-2xl border transition-all duration-300 ${accentStyles[card.accent]} hover:scale-[1.01]`}
          >
            <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium mb-4 ${tagStyles[card.accent]}`}>
              {card.tag}
            </span>
            <h3 className="text-xl font-bold mb-2 group-hover:text-[#f4f4f6] text-[#ededee] transition-colors">
              {card.title}
            </h3>
            <p className="text-sm text-[#9898a0] leading-relaxed">{card.desc}</p>
            <div className="mt-4 text-sm font-medium text-[#65656c] group-hover:text-[#9898a0] transition-colors">
              查看详情 →
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ComparisonTeaser() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-[#222228]">
      <div className="bg-[#111114] rounded-3xl p-8 md:p-12 border border-[#222228] relative overflow-hidden">
        <div className="absolute inset-0 glow-green opacity-50" />
        <div className="relative">
          <h2 className="text-2xl font-extrabold tracking-tight mb-6">Shelby vs 竞品</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#33333a] text-[#65656c] text-left">
                  <th className="py-3 pr-6 font-medium" />
                  <th className="py-3 pr-6 font-medium">Filecoin</th>
                  <th className="py-3 pr-6 font-medium">Walrus</th>
                  <th className="py-3 font-medium text-blue-400">Shelby</th>
                </tr>
              </thead>
              <tbody className="text-[#9898a0]">
                <tr className="border-b border-[#222228]">
                  <td className="py-3 pr-6 font-medium text-[#f4f4f6]">类型</td>
                  <td className="py-3 pr-6">冷存储</td>
                  <td className="py-3 pr-6">去中心化存储</td>
                  <td className="py-3 text-blue-400 font-medium">AI 热存储</td>
                </tr>
                <tr className="border-b border-[#222228]">
                  <td className="py-3 pr-6 font-medium text-[#f4f4f6]">读取延迟</td>
                  <td className="py-3 pr-6">秒-分钟</td>
                  <td className="py-3 pr-6">秒级</td>
                  <td className="py-3 text-blue-400 font-medium">亚秒级</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6 font-medium text-[#f4f4f6]">激励模型</td>
                  <td className="py-3 pr-6">存储证明</td>
                  <td className="py-3 pr-6">混合</td>
                  <td className="py-3 text-blue-400 font-medium">Pay-Per-Read</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <a href="/learn/what-is-shelby" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              阅读完整对比分析 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-[#222228]">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight mb-4">加入 Shelby 中文社区</h2>
        <p className="text-[#9898a0] mb-8 leading-relaxed">
          纯技术讨论。了解前沿去中心化存储协议，参与测试网实践，获取最新生态动态。
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="https://t.me/ShelbyCN" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/25">
            Telegram 频道
          </a>
          <a href="https://t.me/ShelbyCN_Chat" className="px-6 py-3 bg-[#111114] hover:bg-[#18181c] border border-[#33333a] hover:border-[#55555d] text-[#f4f4f6] rounded-xl font-semibold text-sm transition-all">
            Telegram 讨论群
          </a>
          <a href="https://x.com/ShelbyCN" className="px-6 py-3 bg-[#111114] hover:bg-[#18181c] border border-[#33333a] hover:border-[#55555d] text-[#f4f4f6] rounded-xl font-semibold text-sm transition-all">
            X / Twitter
          </a>
        </div>
      </div>
    </section>
  );
}
