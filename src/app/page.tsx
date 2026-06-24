export default function Home() {
  return (
    <div className="max-w-[960px] mx-auto px-5">
      <Hero />
      <Stats />
      <QuickLinks />
      <ContentFeed />
      <Comparison />
      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-14 pb-10">
      <h1 className="text-[40px] font-extrabold leading-[1.12] mb-3 max-w-[680px] tracking-tight">
        Decentralized Storage <span className="text-accent">for the AI Era</span>
      </h1>
      <p className="text-base text-text2 max-w-[560px] mb-6 leading-relaxed">
        Shelby is a hot storage protocol built by Aptos Labs &times; Jump Crypto.
        Sub-second reads, 70% cheaper than AWS, on-chain verifiable — designed for AI training data, streaming, and high-frequency workloads.
      </p>
      <div className="flex gap-3 flex-wrap">
        <a href="/learn/what-is-shelby" className="px-5 py-2 text-sm font-bold bg-accent text-white rounded hover:brightness-110 transition-colors">
          Learn More
        </a>
        <a href="/learn/testnet-guide" className="px-5 py-2 text-sm font-semibold border border-border text-text rounded hover:border-accent hover:bg-surface transition-colors">
          Testnet Guide
        </a>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { value: "$0.01", unit: "/GB·mo", label: "Storage Cost" },
    { value: "<2×", unit: "", label: "Replication" },
    { value: "600ms", unit: "", label: "Finality" },
    { value: "30+", unit: " cities", label: "Fiber Network" },
  ];
  return (
    <section className="py-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded overflow-hidden">
        {items.map((s, i) => (
          <div key={i} className="bg-surface p-5 text-center">
            <div className="font-mono text-[28px] font-extrabold text-accent leading-none mb-1">{s.value}<span className="text-xs text-text3 font-medium">{s.unit}</span></div>
            <div className="text-[11px] font-semibold uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickLinks() {
  const links = [
    { title: "Testnet Guide", desc: "Get hands-on with the protocol. Wallet setup, file upload, automation scripts.", href: "/learn/testnet-guide" },
    { title: "SP Profit Calculator", desc: "Jump Crypto cost model. Estimate monthly revenue and breakeven.", href: "/tools/sp-calculator" },
    { title: "Protocol Deep Dive", desc: "Architecture, Pay-Per-Read economics, competitor comparison.", href: "/learn/what-is-shelby" },
    { title: "Developer Docs", desc: "SDK, CLI, MCP Server quickstart and API reference.", href: "/docs" },
  ];
  return (
    <section className="py-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded overflow-hidden">
        {links.map((l, i) => (
          <a key={i} href={l.href} className="bg-surface p-5 hover:bg-surface2 transition-colors group flex flex-col gap-2">
            <h3 className="font-bold text-sm group-hover:text-accent transition-colors">{l.title}</h3>
            <p className="text-xs text-text2 leading-relaxed flex-1">{l.desc}</p>
            <span className="font-mono text-[10px] text-text3 group-hover:text-accent">&rarr;</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function ContentFeed() {
  const posts = [
    { tag: "Guide", title: "Shelby Testnet Guide — Zero-cost protocol walkthrough", date: "06-24" },
    { tag: "Analysis", title: "Decentralized Storage Landscape: Filecoin vs Walrus vs Arweave vs Shelby", date: "06-22" },
    { tag: "Tool", title: "SP Node Profit Calculator — Real-time Jump Crypto cost modeling", date: "06-20" },
    { tag: "Analysis", title: "Pay-Per-Read Deep Dive — Why it's the right model for AI", date: "06-18" },
    { tag: "Docs", title: "Developer Docs: SDK Quickstart + CLI Tools + MCP Server Setup", date: "06-15" },
    { tag: "Guide", title: "Aptos Grant Guide — How to secure $5,000–$50,000 for Shelby projects", date: "06-12" },
    { tag: "Analysis", title: "Shelby Ecosystem Partners: Metaplex + Story Protocol + DoubleZero", date: "06-08" },
    { tag: "Guide", title: "SP Node Deployment — From hardware selection to monitoring", date: "06-05" },
  ];
  return (
    <section className="py-8">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">/ Latest</div>
      <div className="border border-border rounded overflow-hidden">
        {posts.map((p, i) => (
          <a key={i} href="#" className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-surface transition-colors group">
            <span className="font-mono text-[11px] text-text3 w-5 text-right shrink-0">{(i+1).toString().padStart(2,"0")}</span>
            <span className="font-semibold text-sm group-hover:text-accent transition-colors flex-1 min-w-0 truncate">{p.title}</span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm shrink-0 ${p.tag==="Guide"?"bg-accent text-white":"bg-surface2 text-text2 border border-border"}`}>{p.tag}</span>
            <span className="font-mono text-[11px] text-text3 w-12 text-right shrink-0">{p.date}</span>
          </a>
        ))}
      </div>
      <div className="text-center mt-4">
        <a href="/blog" className="font-mono text-xs text-text2 hover:text-text transition-colors">View all &rarr;</a>
      </div>
    </section>
  );
}

function Comparison() {
  const rows = [
    { label: "Type", vals: ["Cold Storage", "General", "Permanent", "AI Hot Storage"] },
    { label: "Read Latency", vals: ["Seconds–Minutes", "Seconds", "Seconds", "Sub-second"] },
    { label: "Incentive", vals: ["Proof-of-Storage", "Mixed", "Prepaid", "Pay-Per-Read"] },
    { label: "$/GB·mo", vals: ["$0.19", "$0.05", "One-time", "$0.01"] },
  ];
  return (
    <section className="py-8">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">/ Comparison</div>
      <div className="border border-border rounded overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-surface text-left font-mono text-[10px] text-text3 uppercase tracking-wider">
              <th className="py-2.5 pl-4 pr-6 font-medium"/><th className="py-2.5 px-5 font-medium">Filecoin</th><th className="py-2.5 px-5 font-medium">Walrus</th><th className="py-2.5 px-5 font-medium">Arweave</th><th className="py-2.5 pr-4 pl-5 font-medium text-accent">Shelby</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.label} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                <td className="py-2.5 pl-4 pr-6 font-semibold">{row.label}</td>
                {row.vals.map((v,j) => <td key={j} className={`py-2.5 px-5 text-text2 ${j===3?"text-accent font-semibold":""}`}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-12">
      <div className="border border-border rounded p-10 text-center bg-surface">
        <h2 className="text-2xl font-extrabold mb-2">Join the Community</h2>
        <p className="text-sm text-text2 mb-6 max-w-md mx-auto">Technical discussions only. Get the latest ecosystem updates, testnet guides, and developer resources.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="https://t.me/ShelbyCN" className="px-6 py-2.5 text-sm font-bold bg-accent text-white rounded hover:brightness-110 transition-colors">Telegram Channel</a>
          <a href="https://t.me/ShelbyCN_Chat" className="px-6 py-2.5 text-sm font-semibold border border-border text-text rounded hover:border-accent transition-colors">Telegram Group</a>
        </div>
      </div>
    </section>
  );
}
