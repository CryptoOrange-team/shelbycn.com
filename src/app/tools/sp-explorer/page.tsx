import type { Metadata } from "next";
import Link from "next/link";
import { getShelbyData } from "@/lib/shelby-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shelby SP 节点浏览器",
  description: "ShelbyNet 实时存储提供商目录。3218万 blobs，链上数据实时更新。",
};

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return "0 B";
  const u = ["B", "KB", "MB", "GB", "TB", "PB"];
  let i = 0; let v = bytes;
  while (v >= 1024 && i < u.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(i > 0 ? 1 : 0)} ${u[i]}`;
}

function shorten(a: string): string { return `${a.slice(0, 6)}...${a.slice(-4)}`; }
function timeAgo(us: number): string {
  if (!us) return "—";
  const s = Math.floor((Date.now() - us / 1000) / 1000);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

function shortenEventType(et: string): string {
  if (et.includes("BlobRegisteredEvent")) return "注册";
  if (et.includes("BlobDeletedEvent")) return "删除";
  if (et.includes("BlobWrittenEvent")) return "写入";
  return et.split("::").pop()?.replace("Event", "") ?? et.slice(-20);
}

export default async function SPExplorerPage() {
  const d = await getShelbyData();

  return (
    <div className="max-w-[960px] mx-auto px-5 py-12">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">/ ShelbyNet</div>
      <h1 className="text-[36px] font-extrabold tracking-tight mb-2">SP 节点浏览器</h1>
      <p className="text-sm text-text2 mb-10">存储提供商实时目录。数据每 2 分钟刷新。</p>

      {d.error && <div className="p-5 border border-red-500/30 bg-red-500/5 rounded-lg text-sm text-red-400 mb-8">{d.error}</div>}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        <Stat label="总 Blobs" value={d.blobCount.toLocaleString()} />
        <Stat label="总存储" value={formatBytes(d.totalSize)} accent />
        <Stat label="总活动" value={d.activityCount.toLocaleString()} />
        <Stat label="SP 节点" value={`${d.activeSPs} 活跃 / ${d.totalSPs} 总`} sub={`${d.activeSlots} 活跃槽位 / ${d.totalSlots} 总`} />
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        {/* SP List */}
        <div>
          <h2 className="text-lg font-extrabold mb-4">存储提供商</h2>
          <div className="border border-border rounded-lg overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-surface text-left font-mono text-[10px] text-text3 uppercase tracking-wider">
                  <th className="py-2.5 pl-3 pr-2 font-medium">SP 地址</th>
                  <th className="py-2.5 px-2 font-medium text-right">活跃</th>
                  <th className="py-2.5 px-2 font-medium text-right">接入</th>
                  <th className="py-2.5 px-2 font-medium text-right">退出</th>
                  <th className="py-2.5 pr-3 pl-2 font-medium text-right">最近</th>
                </tr>
              </thead>
              <tbody>
                {d.nodes.map(sp => (
                  <tr key={sp.address} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                    <td className="py-2 pl-3 pr-2">
                      <Link href={`/tools/sp-explorer/${sp.address}`}
                        className="font-mono text-text2 hover:text-accent transition-colors" title={sp.address}>
                        {shorten(sp.address)}
                      </Link>
                    </td>
                    <td className="py-2 px-2 font-mono text-green-400 font-semibold text-right">{sp.activeSlots}</td>
                    <td className="py-2 px-2 font-mono text-yellow-400 text-right">{sp.joiningSlots || "—"}</td>
                    <td className="py-2 px-2 font-mono text-red-400 text-right">{sp.vacatedSlots || "—"}</td>
                    <td className="py-2 pr-3 pl-2 font-mono text-text3 text-right text-[10px]">{timeAgo(sp.lastSeen)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <h2 className="text-lg font-extrabold mb-4">最近活动</h2>
          <div className="border border-border rounded-lg overflow-hidden">
            {d.recentEvents.length === 0 && (
              <div className="p-4 text-xs text-text3 text-center">暂无活动数据</div>
            )}
            {d.recentEvents.map((a, i) => (
              <div key={`${a.transaction_hash}-${i}`} className="flex items-center gap-2 px-3 py-2 border-b border-border last:border-0 hover:bg-surface transition-colors text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                <span className="font-semibold text-text2 shrink-0">{shortenEventType(a.event_type)}</span>
                <span className="font-mono text-text3 flex-1 truncate" title={a.blob_name}>{shorten(a.blob_name)}</span>
                <span className="font-mono text-text3 shrink-0">{new Date(a.timestamp).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            ))}
          </div>
          <h2 className="text-lg font-extrabold mt-6 mb-4">最新 Blobs</h2>
          <div className="border border-border rounded-lg overflow-hidden">
            {d.recentBlobs.map((b, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 border-b border-border last:border-0 text-[11px]">
                <span className="font-mono text-text3 flex-1 truncate" title={b.blob_name}>{shorten(b.blob_name)}</span>
                <span className="font-mono text-accent shrink-0">{formatBytes(parseInt(b.size, 10) || 0)}</span>
                <span className="font-mono text-text3 shrink-0">{new Date(b.created_at).toLocaleDateString("zh-CN")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="font-mono text-[10px] text-text3 mt-6 text-right">
        数据：ShelbyNet GraphQL · {new Date().toLocaleString("zh-CN")}
      </p>
    </div>
  );
}

function Stat({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className={`font-mono text-xl font-extrabold leading-none mb-0.5 ${accent ? "text-accent" : "text-text"}`}>{value}</div>
      <div className="text-[10px] font-medium text-text3 uppercase tracking-wide">{label}</div>
      {sub && <div className="text-[10px] text-text3 mt-0.5">{sub}</div>}
    </div>
  );
}
