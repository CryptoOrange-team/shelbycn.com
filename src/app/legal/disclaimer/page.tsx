import type { Metadata } from "next";
export const metadata: Metadata = { title: "Disclaimer" };
export default function DisclaimerPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-zinc">
      <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
      <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-sm text-yellow-400 mb-8">Please read this disclaimer carefully before using this website.</div>
      <h2 className="text-xl font-bold mt-6 mb-3">Unofficial Community</h2><p>ShelbyCN is a third-party Chinese technical community for the Shelby Protocol. We are not affiliated with Aptos Labs, Jump Crypto, or the Shelby Protocol.</p>
      <h2 className="text-xl font-bold mt-6 mb-3">Not Investment Advice</h2><p>All content on this website is for educational and informational purposes only. Nothing constitutes investment advice, legal advice, or tax advice.</p>
      <h2 className="text-xl font-bold mt-6 mb-3">Digital Asset Risk</h2><ul className="list-disc ml-5 space-y-1"><li>Digital asset prices are highly volatile</li><li>Past performance does not predict future results</li><li>Decentralized protocols carry smart contract, governance, and regulatory risks</li></ul>
      <h2 className="text-xl font-bold mt-6 mb-3">Information Accuracy</h2><p>We strive for accuracy but make no guarantees about completeness or timeliness.</p>
      <h2 className="text-xl font-bold mt-6 mb-3">Third-Party Links</h2><p>We are not responsible for content on linked third-party websites.</p>
      <h2 className="text-xl font-bold mt-6 mb-3">Jurisdiction</h2><p>This website is hosted outside mainland China. Users are responsible for compliance with local regulations.</p>
      <p className="text-sm text-zinc-500 mt-10">Last updated: June 2026</p>
    </article>
  );
}
