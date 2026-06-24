import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shelby 是什么？— 去中心化热存储协议详解",
  description:
    "Shelby 是 Aptos Labs × Jump Crypto 联合打造的去中心化热存储协议。Pay-per-Read 经济模型、DoubleZero 光纤网络、Clay 纠删码。专为 AI 数据和实时应用设计。",
};

export default function WhatIsShelbyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-zinc">
      <h1 className="text-3xl font-bold mb-2">Shelby 是什么？</h1>
      <p className="text-lg text-zinc-400 mb-8">去中心化热存储协议详解。</p>

      <h2 className="text-xl font-bold mt-8 mb-3">一句话</h2>
      <p>
        Shelby 是 Aptos Labs 和 Jump Crypto 联合打造的去中心化热存储（Hot Storage）协议。
        与 Filecoin/Arweave 等冷存储不同，Shelby 专为高频读取场景设计——AI 训练数据、流媒体、游戏资产。
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">核心创新：Pay-Per-Read</h2>
      <p>传统存储按存储量付费。Shelby 按读取次数付费：</p>
      <ul className="list-disc ml-5 space-y-1">
        <li>写费用 ~$0.0096/GB/月（覆盖存储成本）</li>
        <li>读费用 ~$0.0138/GB（数据被读取时产生）</li>
        <li>比 AWS S3 便宜约 70%</li>
        <li>存储节点持续赚取读取收入——不是存了就完事</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-3">技术架构</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left py-2 pr-4">层</th>
              <th className="text-left py-2 pr-4">技术</th>
              <th className="text-left py-2">说明</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-800">
              <td className="py-2 pr-4 font-medium">数据层</td>
              <td className="py-2 pr-4">DoubleZero 光纤骨干</td>
              <td className="py-2">5 大洲 30+ 城市，专用光纤，非公共互联网</td>
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="py-2 pr-4 font-medium">冗余</td>
              <td className="py-2 pr-4">Clay 纠删码</td>
              <td className="py-2">复制因子 &lt;2×，比 Filecoin(3-6×) Arweave(15×) 高效</td>
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="py-2 pr-4 font-medium">结算层</td>
              <td className="py-2 pr-4">Aptos 区块链</td>
              <td className="py-2">600ms 最终性，3 万 TPS，Gas ~$0.0005</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">验证</td>
              <td className="py-2 pr-4">双层审计</td>
              <td className="py-2">链下高频 + 链上低频抽查。学术论文证明激励相容。</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-3">与竞品对比</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left py-2 pr-4">维度</th>
              <th className="text-left py-2 pr-4">Filecoin</th>
              <th className="text-left py-2 pr-4">Walrus</th>
              <th className="text-left py-2 font-medium text-blue-400">Shelby</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-800">
              <td className="py-2 pr-4">类型</td>
              <td className="py-2 pr-4">冷存储</td>
              <td className="py-2 pr-4">去中心化存储</td>
              <td className="py-2 text-blue-400 font-medium">AI 热存储</td>
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="py-2 pr-4">读取速度</td>
              <td className="py-2 pr-4">秒-分钟</td>
              <td className="py-2 pr-4">秒级</td>
              <td className="py-2 text-blue-400 font-medium">亚秒级</td>
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="py-2 pr-4">激励模型</td>
              <td className="py-2 pr-4">存储证明</td>
              <td className="py-2 pr-4">混合</td>
              <td className="py-2 text-blue-400 font-medium">Pay-Per-Read</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">链</td>
              <td className="py-2 pr-4">自建</td>
              <td className="py-2 pr-4">Sui</td>
              <td className="py-2 text-blue-400 font-medium">Aptos</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-3">生态合作伙伴</h2>
      <ul className="list-disc ml-5 space-y-1">
        <li>Metaplex — Solana NFT 平台，使用 Shelby 存储 NFT 资产</li>
        <li>Story Protocol — IP 链上管理，使用 Shelby 存储 IP 数据</li>
        <li>DoubleZero — 底层光纤网络提供商</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-3">当前阶段</h2>
      <ul className="list-disc ml-5 space-y-1">
        <li>测试网 ShelbyNet 已上线（2026 年 3 月）</li>
        <li>主网目标 2026 下半年</li>
        <li>TGE（代币生成事件）尚未发生</li>
        <li>Aptos Labs 正在招聘 Shelby 商业团队</li>
      </ul>

      <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-sm mt-10">
        <p className="font-medium mb-1">参考资源</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>官网：<a href="https://shelby.xyz" className="text-blue-400">shelby.xyz</a></li>
          <li>白皮书：<a href="https://arxiv.org/html/2506.19233v1" className="text-blue-400">arxiv.org/html/2506.19233v1</a></li>
          <li>博弈论分析：<a href="https://arxiv.org/abs/2510.11866" className="text-blue-400">arxiv.org/abs/2510.11866</a></li>
          <li>成本建模：<a href="https://jumpcrypto.com/resources/shelby-cost-modeling" className="text-blue-400">jumpcrypto.com</a></li>
          <li>Grant 申请：<a href="https://aptosnetwork.com/grants/ecosystem" className="text-blue-400">aptosnetwork.com/grants</a></li>
        </ul>
      </div>
    </article>
  );
}
