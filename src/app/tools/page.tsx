export default function ToolsPage() {
  const tools = [
    {
      title: "SP 节点收益计算器",
      desc: "输入存储容量、读取率、硬件成本，预估 SP 节点月收益、年利润、回本周期。与 AWS S3 成本对比。",
      href: "/tools/sp-calculator",
      ready: true,
    },
    {
      title: "测试网数据面板",
      desc: "ShelbyNet 实时数据：总 blobs、活跃 SP 节点、网络使用量。",
      href: "#",
      ready: false,
    },
    {
      title: "批量上传脚本",
      desc: "一键批量上传测试文件到 ShelbyNet。支持多钱包轮换 + 随机文件类型。",
      href: "#",
      ready: false,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">工具</h1>
      <p className="text-zinc-400 mb-8">Shelby 生态实用工具，持续更新。</p>
      <div className="space-y-4">
        {tools.map((t) => (
          <a
            key={t.href}
            href={t.ready ? t.href : undefined}
            className={`block p-5 rounded-xl border bg-zinc-900/50 transition-all ${
              t.ready
                ? "border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 cursor-pointer"
                : "border-zinc-800/50 opacity-50 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{t.title}</h3>
              {!t.ready && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">即将上线</span>
              )}
            </div>
            <p className="text-sm text-zinc-400">{t.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
