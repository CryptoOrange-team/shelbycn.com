import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-zinc">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p>This site uses Umami for anonymous analytics. Umami collects no personal data, uses no cookies, and stores data on our own servers.</p>
      <h2 className="text-xl font-bold mt-6 mb-3">Information Collected</h2><p>Page views, referral sources, device types, browser types. All anonymous and aggregated.</p>
      <h2 className="text-xl font-bold mt-6 mb-3">Email Subscriptions</h2><p>Newsletters are sent via Resend. We only collect the email address you provide. Unsubscribe anytime.</p>
      <h2 className="text-xl font-bold mt-6 mb-3">Third-Party Services</h2><p>This site uses Vercel for hosting, Resend for email, and Umami for analytics. See their respective privacy policies.</p>
      <p className="text-sm text-zinc-500 mt-10">Last updated: June 2026</p>
    </article>
  );
}
