export default function LearnPage() {
  const guides = [
    { tag: "入门", title: "Shelby 是什么？去中心化热存储协议详解", desc: "技术架构、Pay-Per-Read 经济模型、双层审计机制。与 Filecoin/Walrus/Arweave 横向对比。", href: "/learn/what-is-shelby", ready: true },
    { tag: "操作", title: "测试网技术体验指南", desc: "零成本了解协议运作。Petra 钱包、ShelbyNet 连接、文件上传、自动化脚本。", href: "/learn/testnet-guide", ready: true },
    { tag: "分析", title: "去中心化存储赛道全景", desc: "Filecoin vs Walrus vs Arweave vs Storj vs Shelby——五维对比。冷存储 vs 永久存储 vs AI 热存储。", href: "#", ready: false },
    { tag: "分析", title: "Pay-Per-Read 经济模型深度拆解", desc: "写费用 + 读费用 + 双层审计。Jump Crypto 成本建模数学推导。", href: "#", ready: false },
    { tag: "操作", title: "SP 节点运营入门", desc: "存储提供商节点硬件配置、部署流程、审计分数优化、收益最大化策略。", href: "#", ready: false },
    { tag: "开发", title: "Shelby SDK 开发入门", desc: "TypeScript SDK 快速上手。上传 blob、会话管理、x402 支付集成。", href: "#", ready: false },
  ];

  const tagStyle = (tag: string) => {
    if (tag === "入门") return "bg-[#f97316] text-white";
    if (tag === "操作") return "bg-[#1f1f22] text-[#8b8b94] border border-[#2a2a2e]";
    if (tag === "分析") return "bg-[#1f1f22] text-[#8b8b94] border border-[#2a2a2e]";
    return "bg-[#1f1f22] text-[#8b8b94] border border-[#2a2a2e]";
  };

  return (
    <div className="max-w-[960px] mx-auto px-5 py-12">
      <div className="font-mono text-[11px] font-medium text-[#5c5c64] uppercase tracking-wider mb-3">
        / 学习中心
      </div>
      <h1 className="text-[36px] font-extrabold tracking-tight mb-2">学习</h1>
      <p className="text-sm text-[#8b8b94] mb-10">从零了解 Shelby 协议。教程、分析、操作指南。</p>

      <div className="border border-[#2a2a2e] rounded overflow-hidden">
        {guides.map((g, i) => (
          <a key={i} href={g.ready ? g.href : undefined}
            className={`flex items-center gap-3 px-4 py-3 border-b border-[#2a2a2e] last:border-0 transition-colors group ${
              g.ready ? "hover:bg-[#1a1a1c] cursor-pointer" : "opacity-40 cursor-not-allowed"
            }`}>
            <span className="font-mono text-[11px] text-[#5c5c64] w-5 text-right shrink-0">
              {(i + 1).toString().padStart(2, "0")}
            </span>
            <span className={`font-semibold text-sm flex-1 min-w-0 truncate ${g.ready ? "text-[#e8e8ec] group-hover:text-[#fb923c]" : "text-[#5c5c64]"}`}>
              {g.title}
              {!g.ready && <span className="ml-2 text-[10px] text-[#5c5c64] font-normal">即将上线</span>}
            </span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm shrink-0 ${tagStyle(g.tag)}`}>
              {g.tag}
            </span>
            <span className="font-mono text-[10px] text-[#5c5c64] group-hover:text-[#f97316] transition-colors w-4 shrink-0">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
