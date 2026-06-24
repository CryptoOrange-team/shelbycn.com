import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Use" };
export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-zinc">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
      <p>By using this website, you agree to these terms.</p>
      <h2 className="text-xl font-bold mt-6 mb-3">Content License</h2><p>Original content is licensed under CC BY-NC-SA 4.0. Translated content belongs to original authors.</p>
      <h2 className="text-xl font-bold mt-6 mb-3">Community Conduct</h2><p>Joining our community means you agree to follow the community rules (see /community page).</p>
      <h2 className="text-xl font-bold mt-6 mb-3">Disclaimer</h2><p>See the full disclaimer at /legal/disclaimer.</p>
      <p className="text-sm text-zinc-500 mt-10">Last updated: June 2026</p>
    </article>
  );
}
