import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shelby 测试网技术体验指南 — 零成本了解去中心化热存储协议",
  description:
    "ShelbyNet 测试网参与指南。Petra 钱包配置、ShelbyNet 网络切换、测试币领取、文件上传、多场景交互。了解 Aptos × Jump Crypto 去中心化热存储协议运作机制。",
};

export default function TestnetGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-zinc">
      <p className="text-sm text-zinc-500 mb-2">最后更新：2026 年 6 月</p>
      <h1 className="text-3xl font-bold mb-2">Shelby 测试网技术体验指南</h1>
      <p className="text-lg text-zinc-400 mb-8">
        零成本了解 Aptos Labs &times; Jump Crypto 去中心化热存储协议的运作机制。
        本指南带你完成钱包配置、网络连接、文件上传全流程。
      </p>

      <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-sm text-yellow-400 mb-8">
        风险提示：本指南仅供技术教育目的。Shelby 官方从未宣布任何空投或代币激励计划。
        所有操作均在测试网环境进行，不涉及真实资产。不构成任何投资建议。
      </div>

      <h2 className="text-xl font-bold mt-10 mb-4">1. 安装 Petra 钱包</h2>
      <p>Petra 是 Aptos 生态官方钱包，用于连接 ShelbyNet 测试网。</p>
      <ol className="list-decimal ml-5 space-y-2">
        <li>Chrome 浏览器打开 <a href="https://petra.app" className="text-blue-400">petra.app</a> 安装扩展</li>
        <li>创建新钱包（建议用专门的测试钱包，与主钱包隔离）</li>
        <li>手写备份助记词，不要截图或存电子设备</li>
      </ol>

      <h2 className="text-xl font-bold mt-10 mb-4">2. 切换到 ShelbyNet</h2>
      <ol className="list-decimal ml-5 space-y-2">
        <li>Petra → 设置 → Network</li>
        <li>选择 Shelbynet（新版 Petra 自动显示）</li>
        <li>确认地址以 0x 开头即正常</li>
      </ol>

      <h2 className="text-xl font-bold mt-10 mb-4">3. 领取测试币</h2>
      <ol className="list-decimal ml-5 space-y-2">
        <li>访问 <a href="https://docs.shelby.xyz" className="text-blue-400">docs.shelby.xyz</a> 找到 Faucet 入口</li>
        <li>粘贴钱包地址，点击 Fund 领取 APT 测试币</li>
        <li>同样方式领取 ShelbyUSD 测试币（可能需要 Google 登录）</li>
        <li>如找不到水龙头，加入官方 Discord（<a href="https://discord.gg/shelbyserves" className="text-blue-400">discord.gg/shelbyserves</a>）查看 #faucet 频道</li>
      </ol>

      <h2 className="text-xl font-bold mt-10 mb-4">4. 上传文件</h2>
      <ol className="list-decimal ml-5 space-y-2">
        <li>访问 <a href="https://explorer.shelby.xyz/shelbynet" className="text-blue-400">explorer.shelby.xyz/shelbynet</a></li>
        <li>连接 Petra 钱包</li>
        <li>点击 Account → View Account → Upload Files</li>
        <li>选择文件上传，钱包确认交易</li>
      </ol>

      <h2 className="text-xl font-bold mt-10 mb-4">5. 多场景测试建议</h2>
      <p>以下操作有助全面了解协议各功能模块：</p>
      <ul className="list-disc ml-5 space-y-1">
        <li>上传不同类型文件：JPG、PDF、JSON、MP4</li>
        <li>尝试不同文件大小：10KB 到 50MB</li>
        <li>使用 SDK/CLI 命令行上传（<code>npm install -g @shelby-protocol/cli</code>）</li>
        <li>多个钱包之间转账测试币</li>
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-4">6. 自动化脚本</h2>
      <pre className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-sm overflow-x-auto">
{`# 安装 Shelby CLI
npm install -g @shelby-protocol/cli

# 每日上传脚本
dd if=/dev/urandom of=test-\$(date +%Y%m%d).bin bs=1024 count=500 2>/dev/null
shelby upload test-\$(date +%Y%m%d).bin
rm test-*.bin`}
      </pre>

      <h2 className="text-xl font-bold mt-10 mb-4">7. 查看测试记录</h2>
      <p>
        访问 <a href="https://explorer.shelby.xyz/shelbynet" className="text-blue-400">explorer.shelby.xyz/shelbynet</a>，
        输入钱包地址可查看上传文件数、交易历史、账户余额。
      </p>

      <h2 className="text-xl font-bold mt-10 mb-4">常见问题</h2>
      <dl className="space-y-6">
        <div>
          <dt className="font-semibold">需要投入资金吗？</dt>
          <dd className="text-zinc-400">不需要。测试币免费领取，所有操作在测试网环境进行。</dd>
        </div>
        <div>
          <dt className="font-semibold">主网什么时候上线？</dt>
          <dd className="text-zinc-400">官方目标 2026 下半年，无确切日期。</dd>
        </div>
        <div>
          <dt className="font-semibold">如何关注最新动态？</dt>
          <dd className="text-zinc-400">
            官方 Discord：discord.gg/shelbyserves | X：@shelbyserves |
            中文社区 Telegram：t.me/ShelbyCN
          </dd>
        </div>
      </dl>
    </article>
  );
}
