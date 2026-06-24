export default function LearnPage() {
  const guides = [
    { tag: "入门", title: "Shelby 是什么？去中心化热存储协议详解", desc: "技术架构、Pay-Per-Read 经济模型、双层审计机制。", href: "/learn/what-is-shelby", ready: true },
    { tag: "操作", title: "测试网技术体验指南", desc: "零成本了解协议运作。Petra 钱包、ShelbyNet 连接、文件上传。", href: "/learn/testnet-guide", ready: true },
    { tag: "分析", title: "去中心化存储赛道全景", desc: "Filecoin vs Walrus vs Arweave vs Storj vs Shelby 五维对比。", href: "#", ready: false },
    { tag: "分析", title: "Pay-Per-Read 经济模型深度拆解", desc: "写费用 + 读费用 + 双层审计。Jump Crypto 成本建模推导。", href: "#", ready: false },
    { tag: "操作", title: "SP 节点运营入门", desc: "硬件配置、部署流程、审计分数优化、收益最大化策略。", href: "#", ready: false },
    { tag: "开发", title: "Shelby SDK 开发入门", desc: "TypeScript SDK 快速上手。上传 blob、会话管理、x402 集成。", href: "#", ready: false },
  ];

  return (
    <div className="max-w-[960px] mx-auto px-5 py-12">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">
        / 学习中心
      </div>
      <h1 className="text-[36px] font-extrabold tracking-tight mb-2">学习</h1>
      <p className="text-sm text-text2 mb-10">从零了解 Shelby 协议。教程、分析、操作指南。</p>

      <div className="border border-border rounded overflow-hidden">
        {guides.map((g, i) => (
          <a key={i} href={g.ready ? g.href : undefined}
            className={`flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 transition-colors group ${
              g.ready ? "hover:bg-surface cursor-pointer" : "opacity-40 cursor-not-allowed"
            }`}>
            <span className="font-mono text-[11px] text-text3 w-5 text-right shrink-0">
              {(i + 1).toString().padStart(2, "0")}
            </span>
            <span className={`font-semibold text-sm flex-1 min-w-0 truncate ${g.ready ? "group-hover:text-accent" : ""}`}>
              {g.title}
              {!g.ready && <span className="ml-2 text-[10px] text-text3 font-normal">即将上线</span>}
            </span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm shrink-0 ${
              g.tag === "入门" ? "bg-accent text-white" : "bg-surface2 text-text2 border border-border"
            }`}>
              {g.tag}
            </span>
            <span className="font-mono text-[10px] text-text3 group-hover:text-accent transition-colors w-4 shrink-0">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
