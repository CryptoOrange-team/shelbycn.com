export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-4 pt-24 pb-16 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
        Shelby Protocol{" "}
        <span className="text-blue-400">中文技术社区</span>
      </h1>
      <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
        Aptos Labs &times; Jump Crypto 联合打造的去中心化热存储协议。
        专为 AI 数据、流媒体、高频读取场景设计。测试网已上线，中文区独家内容。
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <a href="/learn" className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
          开始了解
        </a>
        <a href="/learn/testnet-guide" className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-medium transition-colors">
          测试网技术体验
        </a>
        <a href="/community" className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-medium transition-colors">
          加入社区
        </a>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { label: "存储成本", value: "~$0.01/GB", desc: "比 AWS 便宜 70%" },
    { label: "复制因子", value: "<2×", desc: "Clay 纠删码" },
    { label: "交易确认", value: "600ms", desc: "Aptos 最终性" },
    { label: "底层网络", value: "DoubleZero", desc: "光纤骨干 30+ 城市" },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 border-t border-zinc-800">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-2xl font-bold text-blue-400">{item.value}</div>
            <div className="text-sm text-zinc-300 mt-1">{item.label}</div>
            <div className="text-xs text-zinc-500 mt-0.5">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const cards = [
    {
      title: "测试网技术体验",
      desc: "了解 Shelby 协议运作机制。零成本上手，完整的钱包配置、文件上传、节点交互指南。",
      href: "/learn/testnet-guide",
    },
    {
      title: "SP 节点收益计算器",
      desc: "基于 Jump Crypto 成本建模。输入存储量，输出预估月收益、回本周期、与 AWS 成本对比。",
      href: "/tools/sp-calculator",
    },
    {
      title: "中文开发者文档",
      desc: "Shelby SDK / CLI / MCP Server 中文文档。快速入门、API 参考、示例项目。",
      href: "/docs",
    },
    {
      title: "深度分析文章",
      desc: "去中心化存储赛道全景、Shelby 经济模型拆解、与 Filecoin/Walrus/Arweave 横向对比。",
      href: "/blog",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-center mb-10">核心内容</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {cards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="p-6 rounded-xl border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 hover:bg-zinc-900 transition-all group"
          >
            <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">{card.title}</h3>
            <p className="text-sm text-zinc-400">{card.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 text-center border-t border-zinc-800">
      <h2 className="text-2xl font-bold mb-4">加入 Shelby 中文技术社区</h2>
      <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
        纯技术讨论，不喊单，不带单。了解前沿去中心化存储协议，参与测试网实践。
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <a href="https://t.me/ShelbyCN" className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
          Telegram 频道
        </a>
        <a href="https://t.me/ShelbyCN_Chat" className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-medium transition-colors">
          Telegram 讨论群
        </a>
        <a href="https://x.com/ShelbyCN" className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-medium transition-colors">
          X / Twitter
        </a>
      </div>
    </section>
  );
}
