export default function ToolsPage() {
  const tools = [
    {
      title: "SP 节点浏览器",
      desc: "ShelbyNet 实时存储提供商目录。查看所有 SP 节点的状态、槽位、活跃度——链上数据，每 5 分钟刷新。",
      href: "/tools/sp-explorer",
      ready: true,
    },
    {
      title: "SP 节点收益计算器",
      desc: "输入存储容量、读取率、硬件成本，预估 SP 节点月收益、年利润、回本周期。与 AWS S3 成本对比。",
      href: "/tools/sp-calculator",
      ready: true,
    },
    {
      title: "批量上传脚本",
      desc: "一键批量上传测试文件到 ShelbyNet。支持多钱包轮换 + 随机文件类型。",
      href: "#",
      ready: false,
    },
  ];

  return (
    <div className="max-w-[960px] mx-auto px-5 py-12">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">/ 工具</div>
      <h1 className="text-[36px] font-extrabold tracking-tight mb-2">工具</h1>
      <p className="text-sm text-text2 mb-10">Shelby 生态实用工具，链上数据驱动。</p>

      <div className="grid sm:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
        {tools.map((t) => (
          <a key={t.href} href={t.ready ? t.href : undefined}
            className={`bg-surface p-6 hover:bg-surface2 transition-colors group flex flex-col gap-2 ${
              !t.ready ? "opacity-40 cursor-not-allowed" : ""
            }`}>
            <h3 className="font-bold text-sm group-hover:text-accent transition-colors">
              {t.title}
              {!t.ready && <span className="ml-2 text-[10px] text-text3 font-normal">即将上线</span>}
            </h3>
            <p className="text-xs text-text2 leading-relaxed flex-1">{t.desc}</p>
            {t.ready && <span className="font-mono text-[10px] text-text3 group-hover:text-accent">→</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
