export default function LearnPage() {
  const guides = [
    { tag: "Intro", title: "What is Shelby? — Decentralized Hot Storage Protocol", desc: "Architecture, Pay-Per-Read economics, dual audit mechanism. Comparison vs Filecoin/Walrus/Arweave.", href: "/learn/what-is-shelby", ready: true },
    { tag: "Guide", title: "Testnet Walkthrough", desc: "Zero-cost protocol exploration. Petra wallet, ShelbyNet connection, file upload, automation.", href: "/learn/testnet-guide", ready: true },
    { tag: "Analysis", title: "Decentralized Storage Landscape", desc: "Filecoin vs Walrus vs Arweave vs Storj vs Shelby — five-dimensional comparison.", href: "#", ready: false },
    { tag: "Analysis", title: "Pay-Per-Read Deep Dive", desc: "Write fees + read fees + dual audit. Jump Crypto cost model mathematical derivation.", href: "#", ready: false },
    { tag: "Guide", title: "SP Node Operations 101", desc: "Hardware configuration, deployment, audit score optimization, revenue strategies.", href: "#", ready: false },
    { tag: "Dev", title: "Shelby SDK Quickstart", desc: "TypeScript SDK. Upload blob, session management, x402 payment integration.", href: "#", ready: false },
  ];

  return (
    <div className="max-w-[960px] mx-auto px-5 py-12">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">/ Learn</div>
      <h1 className="text-[36px] font-extrabold tracking-tight mb-2">Learn</h1>
      <p className="text-sm text-text2 mb-10">Understand the Shelby Protocol from zero. Tutorials, analysis, guides.</p>
      <div className="border border-border rounded overflow-hidden">
        {guides.map((g, i) => (
          <a key={i} href={g.ready ? g.href : undefined} className={`flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 transition-colors group ${g.ready ? "hover:bg-surface cursor-pointer" : "opacity-40 cursor-not-allowed"}`}>
            <span className="font-mono text-[11px] text-text3 w-5 text-right shrink-0">{(i+1).toString().padStart(2,"0")}</span>
            <span className={`font-semibold text-sm flex-1 min-w-0 truncate ${g.ready ? "group-hover:text-accent" : ""}`}>{g.title}{!g.ready && <span className="ml-2 text-[10px] text-text3 font-normal">Coming soon</span>}</span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm shrink-0 ${g.tag==="Intro"?"bg-accent text-white":"bg-surface2 text-text2 border border-border"}`}>{g.tag}</span>
            <span className="font-mono text-[10px] text-text3 group-hover:text-accent transition-colors w-4 shrink-0">&rarr;</span>
          </a>
        ))}
      </div>
    </div>
  );
}
