import type { Metadata } from "next";
export const metadata: Metadata = { title: "ShelbyNet Testnet Guide", description: "Zero-cost walkthrough of the Shelby Protocol testnet. Petra wallet setup, file upload, automation scripts." };

export default function TestnetGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-12 prose prose-invert prose-zinc">
      <p className="text-sm text-text3 mb-2">Last updated: June 2026</p>
      <h1 className="text-3xl font-extrabold mb-2">ShelbyNet Testnet Guide</h1>
      <p className="text-lg text-text2 mb-8">Zero-cost walkthrough of the Shelby Protocol. Wallet setup, file upload, automation.</p>

      <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-sm text-yellow-400 mb-8">
        <strong>Disclaimer:</strong> This guide is for educational purposes only. Shelby has never announced any airdrop or token incentive. All operations are on testnet — no real assets involved. Not investment advice.
      </div>

      <h2 className="text-xl font-bold mt-10 mb-4">1. Install Petra Wallet</h2>
      <p>Petra is the official Aptos ecosystem wallet.</p>
      <ol className="list-decimal ml-5 space-y-2">
        <li>Chrome: open <a href="https://petra.app" className="text-accent hover:underline">petra.app</a> and install</li>
        <li>Create a new wallet (use a dedicated test wallet, separate from your main)</li>
        <li>Back up your seed phrase — write it down, never screenshot</li>
      </ol>

      <h2 className="text-xl font-bold mt-10 mb-4">2. Switch to ShelbyNet</h2>
      <ol className="list-decimal ml-5 space-y-2">
        <li>Petra → Settings → Network</li>
        <li>Select <strong>Shelbynet</strong> (auto-detected in newer Petra versions)</li>
        <li>Verify your address starts with 0x</li>
      </ol>

      <h2 className="text-xl font-bold mt-10 mb-4">3. Get Test Tokens</h2>
      <ol className="list-decimal ml-5 space-y-2">
        <li>Visit <a href="https://docs.shelby.xyz" className="text-accent hover:underline">docs.shelby.xyz</a> to find the faucet</li>
        <li>Paste your wallet address and click Fund for APT test tokens</li>
        <li>Repeat for ShelbyUSD test tokens (may require Google login)</li>
        <li>If the faucet link is unavailable, join the official Discord: <a href="https://discord.gg/shelbyserves" className="text-accent hover:underline">discord.gg/shelbyserves</a></li>
      </ol>

      <h2 className="text-xl font-bold mt-10 mb-4">4. Upload Files</h2>
      <ol className="list-decimal ml-5 space-y-2">
        <li>Go to <a href="https://explorer.shelby.xyz/shelbynet" className="text-accent hover:underline">explorer.shelby.xyz/shelbynet</a></li>
        <li>Connect your Petra wallet</li>
        <li>Click Account → View Account → Upload Files</li>
        <li>Select a file and confirm the transaction in wallet</li>
      </ol>

      <h2 className="text-xl font-bold mt-10 mb-4">5. Multi-Scenario Testing Tips</h2>
      <ul className="list-disc ml-5 space-y-1">
        <li>Upload different file types: JPG, PDF, JSON, MP4</li>
        <li>Try various sizes: 10KB to 50MB</li>
        <li>Use the CLI for programmatic access: <code>npm install -g @shelby-protocol/cli</code></li>
        <li>Transfer test tokens between wallets</li>
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-4">6. Automation Script</h2>
      <pre className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-sm overflow-x-auto">{`# Install Shelby CLI
npm install -g @shelby-protocol/cli

# Daily upload script
dd if=/dev/urandom of=test-$(date +%Y%m%d).bin bs=1024 count=500 2>/dev/null
shelby upload test-$(date +%Y%m%d).bin
rm test-*.bin`}</pre>

      <h2 className="text-xl font-bold mt-10 mb-4">7. Check Your Activity</h2>
      <p>Visit <a href="https://explorer.shelby.xyz/shelbynet" className="text-accent hover:underline">explorer.shelby.xyz/shelbynet</a>, enter your wallet address to view uploaded files, transaction history, and balance.</p>

      <h2 className="text-xl font-bold mt-10 mb-4">FAQ</h2>
      <dl className="space-y-6">
        <div><dt className="font-semibold">Does this cost money?</dt><dd className="text-text2">No. Test tokens are free. All operations are on testnet.</dd></div>
        <div><dt className="font-semibold">When is mainnet?</dt><dd className="text-text2">Official target: H2 2026. No exact date.</dd></div>
        <div><dt className="font-semibold">Where can I follow updates?</dt><dd className="text-text2">Official Discord: discord.gg/shelbyserves | X: @shelbyserves | Chinese community: t.me/ShelbyCN</dd></div>
      </dl>
    </article>
  );
}
