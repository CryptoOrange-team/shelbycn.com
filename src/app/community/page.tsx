export default function CommunityPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">加入社区</h1>
      <p className="text-zinc-400 mb-8">
        Shelby 去中心化存储协议中文技术社区。纯技术讨论，不喊单，不带单。
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <a
          href="https://t.me/ShelbyCN"
          className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-blue-500 transition-all"
        >
          <h3 className="font-semibold text-blue-400 mb-1">Telegram 频道</h3>
          <p className="text-sm text-zinc-400">公告、生态动态、教程更新。只读。</p>
        </a>
        <a
          href="https://t.me/ShelbyCN_Chat"
          className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-blue-500 transition-all"
        >
          <h3 className="font-semibold text-blue-400 mb-1">Telegram 讨论群</h3>
          <p className="text-sm text-zinc-400">技术讨论、问题解答、节点运维交流。</p>
        </a>
        <a
          href="https://x.com/ShelbyCN"
          className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-blue-500 transition-all"
        >
          <h3 className="font-semibold text-blue-400 mb-1">X / Twitter</h3>
          <p className="text-sm text-zinc-400">生态动态速递、技术解读、数据可视化。</p>
        </a>
        <a
          href="https://discord.gg/shelbyserves"
          className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-blue-500 transition-all"
        >
          <h3 className="font-semibold text-blue-400 mb-1">官方 Discord</h3>
          <p className="text-sm text-zinc-400">Shelby 官方社区。英文为主。我们在 #中文 频道活跃。</p>
        </a>
      </div>

      <h2 className="text-xl font-bold mb-4">社区规则</h2>
      <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 text-sm text-zinc-300 space-y-3">
        <p><span className="text-green-400">✅ 允许：</span>Shelby 协议技术讨论、测试网使用体验、节点部署运维交流、去中心化存储行业分析、开源项目和技术工具分享。</p>
        <p><span className="text-yellow-400">⚠️ 谨慎：</span>网络经济模型讨论限于技术分析。不提供投资建议。</p>
        <p><span className="text-red-400">🔴 绝对禁止：</span>喊单带单推荐交易平台、代币价格讨论、钓鱼链接假代币地址、U商/场外交易、"稳赚""高收益"话术、未经证实的空投信息。</p>
      </div>
    </div>
  );
}
