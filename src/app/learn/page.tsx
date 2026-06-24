export default function LearnPage() {
  const guides = [
    {
      title: "Shelby 是什么？",
      desc: "去中心化热存储协议概述。架构、经济模型、与 Filecoin/Walrus 的详细对比。",
      href: "/learn/what-is-shelby",
      ready: true, tag: "入门",
    },
    {
      title: "测试网技术体验指南",
      desc: "零成本了解协议运作。Petra 钱包、ShelbyNet 连接、文件上传、自动化脚本。",
      href: "/learn/testnet-guide",
      ready: true, tag: "操作",
    },
    {
      title: "Shelby vs Filecoin vs Walrus",
      desc: "去中心化存储赛道三强对比。冷存储 vs 热存储 vs 永久存储。成本/性能/生态/团队四维分析。",
      href: "#", ready: false, tag: "分析",
    },
    {
      title: "Pay-per-Read 经济模型深度拆解",
      desc: "写费用 + 读费用 + 双层审计。Jump Crypto 成本建模。按读取付费 vs 按存储付费。",
      href: "#", ready: false, tag: "分析",
    },
    {
      title: "SP 节点运营入门",
      desc: "存储提供商节点配置、部署流程、审计分数优化、收益最大化策略。",
      href: "#", ready: false, tag: "操作",
    },
    {
      title: "Shelby SDK 开发入门",
      desc: "TypeScript SDK 快速上手。上传 blob、会话管理、x402 支付集成。",
      href: "#", ready: false, tag: "开发",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">学习中心</h1>
        <p className="text-[#9898a0] text-lg">从零了解 Shelby 协议。教程、分析、操作指南。</p>
      </div>
      <div className="grid gap-4">
        {guides.map((g) => (
          <a
            key={g.href}
            href={g.ready ? g.href : undefined}
            className={`flex items-start gap-5 p-5 rounded-2xl border transition-all ${
              g.ready
                ? "border-[#222228] bg-[#111114] hover:bg-[#18181c] hover:border-[#33333a] cursor-pointer group"
                : "border-[#222228]/50 bg-[#111114]/50 opacity-40 cursor-not-allowed"
            }`}
          >
            <span className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-medium mt-0.5 ${
              g.ready ? "bg-blue-500/10 text-blue-400" : "bg-zinc-800 text-zinc-600"
            }`}>
              {g.tag}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold text-lg mb-1 ${g.ready ? "group-hover:text-[#f4f4f6] text-[#ededee]" : "text-[#65656c]"}`}>
                {g.title}
                {!g.ready && <span className="ml-2 text-xs text-[#65656c] font-normal">即将上线</span>}
              </h3>
              <p className="text-sm text-[#9898a0]">{g.desc}</p>
            </div>
            {g.ready && <span className="shrink-0 text-[#65656c] group-hover:text-[#9898a0] transition-colors mt-1">→</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
