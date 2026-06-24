import type { Metadata } from "next";
import Link from "next/link";
import { getShelbyData } from "@/lib/shelby-data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Shelby SP 节点浏览器", description: "ShelbyNet 实时数据。SP节点、Blob排行榜、网络状态。" };

function fmtB(b: number): string {
  if (!b) return "0 B";
  const u = ["B", "KB", "MB", "GB", "TB", "PB"];
  let i = 0; let v = b;
  while (v >= 1024 && i < u.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(i > 0 ? 1 : 0)} ${u[i]}`;
}
function short(a: string): string { return `${a.slice(0, 6)}...${a.slice(-4)}`; }
function shortName(n: string): string {
  const parts = n.split("/");
  return parts[parts.length - 1] || n.slice(0, 30);
}
function ago(us: number): string {
  if (!us) return "—";
  const s = Math.floor((Date.now() - us / 1000) / 1000);
  if (s < 60) return `${s}s`; if (s < 3600) return `${Math.floor(s / 60)}m`; if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

function PctBar({ pct }: { pct: number }) {
  return <div className="w-full h-1 bg-border rounded-full mt-1"><div className="h-full bg-accent rounded-full" style={{ width: `${Math.min(100, pct)}%` }} /></div>;
}

export default async function SPExplorerPage() {
  const d = await getShelbyData();

  return (
    <div className="max-w-[1100px] mx-auto px-5 py-12">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">/ ShelbyNet</div>
      <h1 className="text-[36px] font-extrabold tracking-tight mb-2">SP 节点浏览器</h1>
      <p className="text-sm text-text2 mb-10">ShelbyNet 实时数据仪表板。每 2 分钟自动刷新。</p>

      {d.error && <div className="p-5 border border-red-500/30 bg-red-500/5 rounded-lg text-sm text-red-400 mb-8">{d.error}</div>}

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        <StatBox label="Blobs" value={d.blobCount.toLocaleString()} />
        <StatBox label="存储量" value={fmtB(d.totalSize)} accent />
        <StatBox label="活动" value={d.activityCount.toLocaleString()} />
        <StatBox label="SP 节点" value={`${d.activeSPs}/${d.totalSPs}`} sub="活跃/总" />
        <StatBox label="槽位" value={`${d.activeSlots}/${d.totalSlots}`} sub="活跃/总" />
        <StatBox label="状态" value={d.status ? "在线" : "—"} sub={d.status ? `v${d.status.lastVersion.toLocaleString()}` : ""} accent />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        {/* Left: SP List + Search */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold">存储提供商</h2>
            <div className="flex gap-2 items-center">
              <a href="?sort=active" className="font-mono text-[10px] px-2 py-1 rounded border border-border text-text3 hover:text-text transition-colors">活跃↓</a>
              <a href="?sort=total" className="font-mono text-[10px] px-2 py-1 rounded border border-border text-text3 hover:text-text transition-colors">总槽位↓</a>
              <span className="text-text3 mx-1">|</span>
              <a href="/api/export-sp" className="font-mono text-[10px] px-2 py-1 rounded border border-accent/30 text-accent hover:bg-accent/10 transition-colors">CSV ↓</a>
            </div>
          </div>
          <div className="border border-border rounded-lg overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-surface text-left font-mono text-[10px] text-text3 uppercase tracking-wider">
                  <th className="py-2.5 pl-3 pr-2 font-medium">SP</th>
                  <th className="py-2.5 px-2 font-medium text-right">活跃</th>
                  <th className="py-2.5 px-2 font-medium text-right">接入</th>
                  <th className="py-2.5 px-2 font-medium text-right">退出</th>
                  <th className="py-2.5 px-2 font-medium">活跃率</th>
                  <th className="py-2.5 pr-3 pl-2 font-medium text-right">最近</th>
                </tr>
              </thead>
              <tbody>
                {d.nodes.map(sp => {
                  const pct = sp.totalSlots > 0 ? (sp.activeSlots / sp.totalSlots) * 100 : 0;
                  return (
                    <tr key={sp.address} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                      <td className="py-2 pl-3 pr-2">
                        <Link href={`/tools/sp-explorer/${sp.address}`} className="font-mono text-text2 hover:text-accent transition-colors" title={sp.address}>{short(sp.address)}</Link>
                      </td>
                      <td className="py-2 px-2 font-mono text-green-400 font-semibold text-right">{sp.activeSlots}</td>
                      <td className="py-2 px-2 font-mono text-yellow-400 text-right">{sp.joiningSlots || "—"}</td>
                      <td className="py-2 px-2 font-mono text-red-400 text-right">{sp.vacatedSlots || "—"}</td>
                      <td className="py-2 px-2"><PctBar pct={pct} /></td>
                      <td className="py-2 pr-3 pl-2 font-mono text-text3 text-right text-[10px]">{ago(sp.lastSeen)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Price Comparison */}
      <div className="mb-8 p-5 rounded-lg border border-border bg-surface">
        <h2 className="text-sm font-extrabold mb-3">Shelby vs AWS S3 成本对比</h2>
        <div className="grid grid-cols-3 gap-3 text-center text-[11px]">
          <div>
            <div className="text-text3 mb-1">AWS S3</div>
            <div className="font-mono text-red-400 font-bold">$0.023/GB</div>
            <div className="text-text3 text-[10px]">存储 + $0.05/GB 出口</div>
          </div>
          <div>
            <div className="text-text3 mb-1">Shelby</div>
            <div className="font-mono text-green-400 font-bold">$0.01/GB</div>
            <div className="text-text3 text-[10px]">写 + $0.014/GB 读</div>
          </div>
          <div>
            <div className="text-text3 mb-1">节省</div>
            <div className="font-mono text-accent font-bold">~70%</div>
            <div className="text-text3 text-[10px]">vs AWS 总成本</div>
          </div>
        </div>
        <div className="mt-3 text-center">
          <a href="/tools/sp-calculator" className="font-mono text-[10px] text-accent hover:underline">详细计算器 →</a>
        </div>
      </div>

      {/* Right: Activity + Top Blobs */}
        <div className="space-y-6">
          {/* Activity Feed */}
          <div>
            <h2 className="text-lg font-extrabold mb-3">最近事件</h2>
            <div className="border border-border rounded-lg overflow-hidden">
              {d.events.slice(0, 12).map((e, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 border-b border-border last:border-0 hover:bg-surface transition-colors text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  <span className="font-semibold text-text2 shrink-0">{e.type || "事件"}</span>
                  <span className="font-mono text-text3 flex-1 truncate" title={e.name}>{shortName(e.name)}</span>
                  <span className="font-mono text-text3 shrink-0 text-[10px]">{new Date(e.time).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Blobs */}
          <div>
            <h2 className="text-lg font-extrabold mb-3">最大 Blobs</h2>
            <div className="border border-border rounded-lg overflow-hidden">
              {d.topBlobs.map((b, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 border-b border-border last:border-0 text-[11px]">
                  <span className="font-mono text-text3 w-4 text-right shrink-0">{i + 1}</span>
                  <span className="flex-1 min-w-0 truncate text-text2" title={b.name}>{shortName(b.name)}</span>
                  <span className="font-mono text-accent font-semibold shrink-0">{fmtB(b.size)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="font-mono text-[10px] text-text3 mt-8 text-right">ShelbyNet GraphQL · {new Date().toLocaleString("zh-CN")}</p>
    </div>
  );
}

function StatBox({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className={`text-xl font-extrabold leading-none mb-0.5 ${accent ? "text-accent" : "text-text"}`}>{value}</div>
      <div className="text-[10px] font-medium text-text3 uppercase tracking-wide">{label}</div>
      {sub && <div className="text-[10px] text-text3 mt-0.5">{sub}</div>}
    </div>
  );
}
