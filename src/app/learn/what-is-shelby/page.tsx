import type { Metadata } from "next";
export const metadata: Metadata = { title: "What is Shelby?", description: "Shelby is a decentralized hot storage protocol by Aptos Labs × Jump Crypto. Architecture, Pay-Per-Read model, competitor comparison." };

export default function WhatIsShelbyPage() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-12 prose prose-invert prose-zinc">
      <h1 className="text-3xl font-extrabold mb-2">What is Shelby?</h1>
      <p className="text-lg text-text2 mb-8">A deep dive into the decentralized hot storage protocol.</p>

      <h2 className="text-xl font-bold mt-8 mb-3">TL;DR</h2>
      <p>Shelby is a <strong>decentralized hot storage</strong> protocol co-developed by <strong>Aptos Labs</strong> and <strong>Jump Crypto</strong>. Unlike Filecoin/Arweave (cold storage), Shelby is purpose-built for high-frequency read workloads — AI training data, streaming media, gaming assets. It delivers sub-second reads at ~70% less cost than AWS S3, with on-chain verifiability via the Aptos blockchain.</p>

      <h2 className="text-xl font-bold mt-8 mb-3">Core Innovation: Pay-Per-Read</h2>
      <p>Traditional storage charges by the amount stored. Shelby charges by the number of reads:</p>
      <ul className="list-disc ml-5 space-y-1">
        <li><strong>Write fee</strong>: ~$0.0096/GB/month (covers storage cost)</li>
        <li><strong>Read fee</strong>: ~$0.0138/GB (earned when data is accessed)</li>
        <li>Storage providers earn ongoing revenue — not just a one-time payment</li>
        <li>vs AWS S3: $0.023/GB storage + $0.05/GB egress = ~70% savings</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-3">Architecture</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm"><thead><tr className="border-b border-zinc-700"><th className="text-left py-2 pr-4">Layer</th><th className="text-left py-2 pr-4">Technology</th><th className="text-left py-2">Details</th></tr></thead><tbody>
          <tr className="border-b border-zinc-800"><td className="py-2 pr-4 font-medium">Data Plane</td><td className="py-2 pr-4">DoubleZero Fiber</td><td className="py-2">Dedicated fiber backbone across 30+ cities on 5 continents</td></tr>
          <tr className="border-b border-zinc-800"><td className="py-2 pr-4 font-medium">Redundancy</td><td className="py-2 pr-4">Clay Erasure Coding</td><td className="py-2">Replication factor &lt;2× (vs Filecoin 3-6×, Arweave 15×)</td></tr>
          <tr className="border-b border-zinc-800"><td className="py-2 pr-4 font-medium">Settlement</td><td className="py-2 pr-4">Aptos Blockchain</td><td className="py-2">600ms finality, 30K TPS, ~$0.0005 gas</td></tr>
          <tr><td className="py-2 pr-4 font-medium">Verification</td><td className="py-2 pr-4">Dual Audit System</td><td className="py-2">Off-chain high-frequency + on-chain spot checks. Incentive-compatible (proven in arXiv paper 2510.11866)</td></tr>
        </tbody></table>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-3">vs Competitors</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm"><thead><tr className="border-b border-zinc-700"><th className="text-left py-2 pr-4"/><th className="text-left py-2 pr-4">Filecoin</th><th className="text-left py-2 pr-4">Walrus</th><th className="text-left py-2 text-accent font-semibold">Shelby</th></tr></thead><tbody>
          <tr className="border-b border-zinc-800"><td className="py-2 pr-4 font-medium">Type</td><td className="py-2 pr-4">Cold Storage</td><td className="py-2 pr-4">General</td><td className="py-2 text-accent font-semibold">AI Hot Storage</td></tr>
          <tr className="border-b border-zinc-800"><td className="py-2 pr-4 font-medium">Read Speed</td><td className="py-2 pr-4">Seconds–Minutes</td><td className="py-2 pr-4">Seconds</td><td className="py-2 text-accent font-semibold">Sub-second</td></tr>
          <tr><td className="py-2 pr-4 font-medium">Model</td><td className="py-2 pr-4">Proof-of-Storage</td><td className="py-2 pr-4">Mixed</td><td className="py-2 text-accent font-semibold">Pay-Per-Read</td></tr>
        </tbody></table>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-3">Ecosystem Partners</h2>
      <ul className="list-disc ml-5 space-y-1"><li><strong>Metaplex</strong> — Solana NFT platform using Shelby for asset storage</li><li><strong>Story Protocol</strong> — On-chain IP management with Shelby for data persistence</li><li><strong>DoubleZero</strong> — Fiber network provider powering the data plane</li></ul>

      <h2 className="text-xl font-bold mt-8 mb-3">Current Status</h2>
      <ul className="list-disc ml-5 space-y-1"><li>Testnet (ShelbyNet) live since March 2026</li><li>Mainnet targeted H2 2026</li><li>TGE (Token Generation Event) not yet occurred</li><li>Aptos Labs actively hiring Shelby commercial team</li><li>$50M Aptos ecosystem fund — Shelby is a designated beneficiary</li></ul>

      <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-sm mt-10">
        <p className="font-medium mb-1">References</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>Website: <a href="https://shelby.xyz" className="text-accent hover:underline">shelby.xyz</a></li>
          <li>Whitepaper: <a href="https://arxiv.org/html/2506.19233v1" className="text-accent hover:underline">arxiv.org</a></li>
          <li>Game Theory Proof: <a href="https://arxiv.org/abs/2510.11866" className="text-accent hover:underline">arxiv.org</a></li>
          <li>Cost Model: <a href="https://jumpcrypto.com/resources/shelby-cost-modeling" className="text-accent hover:underline">jumpcrypto.com</a></li>
          <li>Grant: <a href="https://aptosnetwork.com/grants/ecosystem" className="text-accent hover:underline">aptosnetwork.com/grants</a></li>
        </ul>
      </div>
    </article>
  );
}
