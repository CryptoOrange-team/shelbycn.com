export default function CommunityPage() {
  return (
    <div className="max-w-[960px] mx-auto px-5 py-12">
      <div className="font-mono text-[11px] font-medium text-[#5c5c64] uppercase tracking-wider mb-3">
        / 社区
      </div>
      <h1 className="text-[36px] font-extrabold tracking-tight mb-2">加入社区</h1>
      <p className="text-sm text-[#8b8b94] mb-10">Shelby 去中心化存储协议中文技术社区。纯技术讨论，不喊单，不带单。</p>

      <div className="grid sm:grid-cols-2 gap-px bg-[#2a2a2e] rounded overflow-hidden mb-12">
        <PlatformCard title="Telegram 频道" desc="公告、生态动态、教程更新。只读。" href="https://t.me/ShelbyCN" />
        <PlatformCard title="Telegram 讨论群" desc="技术讨论、问题解答、节点运维交流。" href="https://t.me/ShelbyCN_Chat" />
        <PlatformCard title="X / Twitter" desc="生态动态速递、技术解读、数据可视化。" href="https://x.com/ShelbyCN" />
        <PlatformCard title="官方 Discord" desc="Shelby 官方社区。英文为主。我们在 #中文 频道活跃。" href="https://discord.gg/shelbyserves" />
      </div>

      <h2 className="text-lg font-extrabold mb-4">社区规则</h2>
      <div className="border border-[#2a2a2e] rounded overflow-hidden">
        <RuleLine color="green" title="允许">
          Shelby 协议技术讨论、测试网使用体验、节点部署运维交流、去中心化存储行业分析、开源项目和技术工具分享。
        </RuleLine>
        <RuleLine color="yellow" title="注意">
          网络经济模型讨论限于技术分析。不提供投资建议。
        </RuleLine>
        <RuleLine color="red" title="禁止">
          喊单带单、推荐交易平台、代币价格讨论、钓鱼链接、U 商/场外交易、"稳赚""高收益"话术、未经证实的空投信息。
        </RuleLine>
      </div>
    </div>
  );
}

function PlatformCard({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <a href={href} className="bg-[#1a1a1c] p-5 hover:bg-[#1f1f22] transition-colors group">
      <h3 className="font-bold text-sm mb-1 group-hover:text-[#fb923c] transition-colors">{title}</h3>
      <p className="text-xs text-[#8b8b94]">{desc}</p>
    </a>
  );
}

function RuleLine({ color, title, children }: { color: "green" | "yellow" | "red"; title: string; children: React.ReactNode }) {
  const dots = { green: "bg-[#22c55e]", yellow: "bg-[#eab308]", red: "bg-[#ef4444]" };
  const borders = { green: "border-l-[#22c55e]", yellow: "border-l-[#eab308]", red: "border-l-[#ef4444]" };

  return (
    <div className={`flex items-start gap-3 px-4 py-3 border-b border-[#2a2a2e] last:border-0 border-l-2 ${borders[color]}`}>
      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${dots[color]}`} />
      <div>
        <span className="text-xs font-semibold text-[#e8e8ec] mr-2">{title}</span>
        <span className="text-xs text-[#8b8b94]">{children}</span>
      </div>
    </div>
  );
}
