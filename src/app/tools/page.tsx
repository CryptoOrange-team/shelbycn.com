export default function ToolsPage() {
  const tools = [
    { title: "SP Node Explorer", desc: "Real-time storage provider directory. Live on-chain data — 32M blobs, SP health scores, blob leaderboard.", href: "/tools/sp-explorer", ready: true },
    { title: "SP Profit Calculator", desc: "Input storage capacity, read rate, hardware cost. Estimate monthly revenue, annual profit, and AWS savings.", href: "/tools/sp-calculator", ready: true },
    { title: "Batch Upload Script", desc: "One-click batch upload test files to ShelbyNet. Multi-wallet rotation + random file types.", href: "#", ready: false },
  ];
  return (
    <div className="max-w-[960px] mx-auto px-5 py-12">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">/ Tools</div>
      <h1 className="text-[36px] font-extrabold tracking-tight mb-2">Tools</h1>
      <p className="text-sm text-text2 mb-10">Shelby ecosystem utilities. On-chain data driven.</p>
      <div className="grid sm:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
        {tools.map(t => (
          <a key={t.href} href={t.ready?t.href:undefined} className={`bg-surface p-6 hover:bg-surface2 transition-colors group flex flex-col gap-2 ${!t.ready?"opacity-40 cursor-not-allowed":""}`}>
            <h3 className="font-bold text-sm group-hover:text-accent transition-colors">{t.title}{!t.ready&&<span className="ml-2 text-[10px] text-text3 font-normal">Soon</span>}</h3>
            <p className="text-xs text-text2 leading-relaxed flex-1">{t.desc}</p>
            {t.ready&&<span className="font-mono text-[10px] text-text3 group-hover:text-accent">&rarr;</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
