export default function CommunityPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">加入社区</h1>
        <p className="text-[#9898a0] text-lg">
          Shelby 去中心化存储协议中文技术社区。纯技术讨论，不喊单，不带单。
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        <PlatformCard
          title="Telegram 频道"
          desc="公告、生态动态、教程更新。只读。"
          href="https://t.me/ShelbyCN"
          color="blue"
        />
        <PlatformCard
          title="Telegram 讨论群"
          desc="技术讨论、问题解答、节点运维交流。"
          href="https://t.me/ShelbyCN_Chat"
          color="blue"
        />
        <PlatformCard
          title="X / Twitter"
          desc="生态动态速递、技术解读、数据可视化。"
          href="https://x.com/ShelbyCN"
          color="purple"
        />
        <PlatformCard
          title="官方 Discord"
          desc="Shelby 官方社区。英文为主。我们在 #中文 频道活跃。"
          href="https://discord.gg/shelbyserves"
          color="green"
        />
      </div>

      <div className="bg-[#111114] rounded-3xl p-8 border border-[#222228]">
        <h2 className="text-xl font-bold mb-6">社区规则</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <RuleBlock color="green" title="允许">
            Shelby 协议技术讨论、测试网使用体验、节点部署运维交流、去中心化存储行业分析、开源项目和技术工具分享。
          </RuleBlock>
          <RuleBlock color="yellow" title="注意">
            网络经济模型讨论限于技术分析。不提供投资建议。
          </RuleBlock>
          <RuleBlock color="red" title="禁止">
            喊单带单、推荐交易平台、代币价格讨论、钓鱼链接、U 商/场外交易、"稳赚""高收益"话术、未经证实的空投信息。
          </RuleBlock>
        </div>
      </div>
    </div>
  );
}

function PlatformCard({ title, desc, href, color }: {
  title: string; desc: string; href: string; color: "blue" | "green" | "purple";
}) {
  const borders = { blue: "hover:border-blue-500/50", green: "hover:border-green-500/50", purple: "hover:border-purple-500/50" };
  const texts = { blue: "text-blue-400", green: "text-green-400", purple: "text-purple-400" };

  return (
    <a href={href} className={`block p-5 rounded-2xl border border-[#222228] bg-[#111114] hover:bg-[#18181c] ${borders[color]} transition-all`}>
      <h3 className={`font-bold text-lg mb-1 ${texts[color]}`}>{title}</h3>
      <p className="text-sm text-[#9898a0]">{desc}</p>
    </a>
  );
}

function RuleBlock({ color, title, children }: {
  color: "green" | "yellow" | "red"; title: string; children: React.ReactNode;
}) {
  const styles = {
    green: "border-l-green-500/50 bg-green-500/5",
    yellow: "border-l-yellow-500/50 bg-yellow-500/5",
    red: "border-l-red-500/50 bg-red-500/5",
  };
  const dots = { green: "bg-green-400", yellow: "bg-yellow-400", red: "bg-red-400" };

  return (
    <div className={`pl-4 pr-4 py-3 rounded-r-xl border-l-2 ${styles[color]}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={`w-2 h-2 rounded-full ${dots[color]}`} />
        <span className="font-semibold text-[#f4f4f6]">{title}</span>
      </div>
      <p className="text-[#9898a0]">{children}</p>
    </div>
  );
}
