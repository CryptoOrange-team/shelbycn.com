import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "风险披露声明",
};

export default function DisclaimerPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-zinc">
      <h1 className="text-3xl font-bold mb-6">风险披露声明</h1>

      <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-sm text-yellow-400 mb-8">
        请在使用本网站和参与 Shelby Protocol 生态前仔细阅读本声明。
      </div>

      <h2 className="text-xl font-bold mt-6 mb-3">非官方声明</h2>
      <p>ShelbyCN（shelbycn.com）是 Shelby Protocol 的第三方中文技术社区，非官方组织。本网站与 Aptos Labs、Jump Crypto 及 Shelby Protocol 无隶属关系。</p>

      <h2 className="text-xl font-bold mt-6 mb-3">不构成投资建议</h2>
      <p>本网站所有内容仅供技术教育和信息参考目的，不构成任何形式的投资建议、法律意见或税务建议。任何投资决策请咨询持牌专业人士，并自行承担全部风险。</p>

      <h2 className="text-xl font-bold mt-6 mb-3">数字资产风险</h2>
      <ul className="list-disc ml-5 space-y-1">
        <li>数字资产价格波动极大，可能导致全部本金损失</li>
        <li>过去的表现不预示未来结果</li>
        <li>去中心化协议存在智能合约风险、治理攻击风险、监管不确定性</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-3">信息准确性</h2>
      <p>我们尽力确保信息准确，但不对内容的完整性、准确性或时效性做任何保证。用户应自行核实信息。</p>

      <h2 className="text-xl font-bold mt-6 mb-3">第三方链接</h2>
      <p>本网站包含第三方链接。我们对第三方网站的内容、隐私政策或做法不承担责任。</p>

      <h2 className="text-xl font-bold mt-6 mb-3">管辖</h2>
      <p>本网站服务器不在中国大陆境内。使用本网站即表示您同意自行遵守所在地区的法律法规。</p>

      <p className="text-sm text-zinc-500 mt-10">最后更新：2026 年 6 月</p>
    </article>
  );
}
