export default function CommunityPage() {
  return (
    <div className="max-w-[960px] mx-auto px-5 py-12">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">/ Community</div>
      <h1 className="text-[36px] font-extrabold tracking-tight mb-2">Join the Community</h1>
      <p className="text-sm text-text2 mb-10">Shelby Protocol Chinese technical community. Technical discussions only.</p>

      <div className="grid sm:grid-cols-2 gap-px bg-border rounded overflow-hidden mb-12">
        <Card title="Telegram Channel" desc="Announcements, ecosystem news, tutorial updates. Read-only." href="https://t.me/ShelbyCN" />
        <Card title="Telegram Group" desc="Technical discussions, Q&A, node operations chat." href="https://t.me/ShelbyCN_Chat" />
        <Card title="X / Twitter" desc="Ecosystem updates, technical analysis, data visualization." href="https://x.com/ShelbyCN" />
        <Card title="Official Discord" desc="Shelby official community. English primary. We're active in #chinese channel." href="https://discord.gg/shelbyserves" />
      </div>

      <h2 className="text-lg font-extrabold mb-4">Community Rules</h2>
      <div className="border border-border rounded overflow-hidden">
        <Rule color="green" title="Allowed">Shelby protocol technical discussions, testnet usage, node deployment, decentralized storage industry analysis, open-source project sharing.</Rule>
        <Rule color="yellow" title="Note">Economic model discussions limited to technical analysis. No investment advice.</Rule>
        <Rule color="red" title="Prohibited">Price shilling, exchange referrals, token price discussion, phishing links, OTC trading, "guaranteed returns" claims, unverified airdrop information.</Rule>
      </div>
    </div>
  );
}

function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
  return <a href={href} className="bg-surface p-5 hover:bg-surface2 transition-colors group"><h3 className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">{title}</h3><p className="text-xs text-text2">{desc}</p></a>;
}

function Rule({ color, title, children }: { color: "green"|"yellow"|"red"; title: string; children: React.ReactNode }) {
  const borders={green:"border-l-[#22c55e]",yellow:"border-l-[#eab308]",red:"border-l-[#ef4444]"};
  const dots={green:"bg-[#22c55e]",yellow:"bg-[#eab308]",red:"bg-[#ef4444]"};
  return (
    <div className={`flex items-start gap-3 px-4 py-3 border-b border-border last:border-0 border-l-2 ${borders[color]}`}>
      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${dots[color]}`}/>
      <div><span className="text-xs font-semibold mr-2">{title}</span><span className="text-xs text-text2">{children}</span></div>
    </div>
  );
}
