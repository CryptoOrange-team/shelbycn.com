export default function LearnPage() {
  const guides = [
    {
      title: "Shelby 是什么？",
      desc: "去中心化热存储协议概述。Pay-per-Read 经济模型、技术架构、与 Filecoin/Walrus 的对比。",
      href: "/learn/what-is-shelby",
      ready: true,
    },
    {
      title: "测试网技术体验指南",
      desc: "零成本了解 Shelby 协议运作机制：Petra 钱包配置、ShelbyNet 连接、文件上传、多场景测试。",
      href: "/learn/testnet-guide",
      ready: true,
    },
    {
      title: "Shelby vs Filecoin vs Walrus",
      desc: "去中心化存储赛道三强对比。冷存储 vs 热存储 vs 永久存储。成本、性能、生态、团队四维分析。",
      href: "/learn/comparison",
      ready: false,
    },
    {
      title: "Pay-per-Read 经济模型深度拆解",
      desc: "写费用 + 读费用 + 审计机制。Jump Crypto 成本建模数学推导。为什么按读取付费是 AI 时代的正确模型。",
      href: "/learn/economics",
      ready: false,
    },
    {
      title: "SP 节点运营入门",
      desc: "存储提供商节点硬件配置、部署流程、审计分数优化、收益最大化策略。",
      href: "/learn/sp-node-guide",
      ready: false,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">学习</h1>
      <p className="text-zinc-400 mb-8">从零了解 Shelby 协议。教程、分析、操作指南。</p>
      <div className="space-y-4">
        {guides.map((g) => (
          <a
            key={g.href}
            href={g.ready ? g.href : undefined}
            className={`block p-5 rounded-xl border bg-zinc-900/50 transition-all ${
              g.ready
                ? "border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 cursor-pointer"
                : "border-zinc-800/50 opacity-50 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{g.title}</h3>
              {!g.ready && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">即将上线</span>
              )}
            </div>
            <p className="text-sm text-zinc-400">{g.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
