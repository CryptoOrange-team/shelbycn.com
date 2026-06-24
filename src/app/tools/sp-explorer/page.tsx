import type { Metadata } from "next";
import Link from "next/link";
import { getShelbyData } from "@/lib/shelby-data";

export const metadata: Metadata = {
  title: "Shelby SP 节点浏览器 — 实时存储提供商目录",
  description: "浏览 ShelbyNet 所有存储提供商。实时数据——3218万 blobs、8363万次活动。",
};

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let i = 0;
  let val = bytes;
  while (val >= 1024 && i < units.length - 1) { val /= 1024; i++; }
  return `${val.toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

function shortenAddr(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function timeAgo(us: number): string {
  if (!us) return "—";
  const ms = us / 1000;
  const seconds = Math.floor((Date.now() - ms) / 1000);
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}

export default async function SPExplorerPage() {
  const data = await getShelbyData();

  return (
    <div className="max-w-[960px] mx-auto px-5 py-12">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">
        / ShelbyNet
      </div>
      <h1 className="text-[36px] font-extrabold tracking-tight mb-2">SP 节点浏览器</h1>
      <p className="text-sm text-text2 mb-10">
        存储提供商实时目录。数据每 5 分钟刷新。
      </p>

      {data.error && (
        <div className="p-6 border border-red-500/30 bg-red-500/5 rounded-lg text-sm text-red-400 mb-8">
          {data.error}
        </div>
      )}

      {/* Network Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-10">
        <StatBox value={data.blobCount.toLocaleString()} label="总 Blobs" />
        <StatBox value={formatBytes(data.totalSize)} label="总存储量" />
        <StatBox value={data.activityCount.toLocaleString()} label="总活动" />
        <StatBox value={`${data.activeSPs}/${data.totalSPs}`} label="活跃/总 SP" color="green" />
      </div>

      {/* SP List */}
      <h2 className="text-xl font-extrabold mb-4">存储提供商（{data.totalSPs} 个节点，{data.totalSlots} 个槽位）</h2>
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-surface text-left font-mono text-[10px] text-text3 uppercase tracking-wider">
              <th className="py-3 pl-4 pr-4 font-medium">#</th>
              <th className="py-3 pr-4 font-medium">SP 地址</th>
              <th className="py-3 pr-4 font-medium text-right">活跃槽位</th>
              <th className="py-3 pr-4 font-medium text-right">接入中</th>
              <th className="py-3 pr-4 font-medium text-right">已退出</th>
              <th className="py-3 pr-4 font-medium">状态</th>
              <th className="py-3 pr-4 font-medium text-right">最后活跃</th>
            </tr>
          </thead>
          <tbody>
            {data.nodes.length === 0 && !data.error && (
              <tr><td colSpan={7} className="py-12 text-center text-text3">暂无数据。</td></tr>
            )}
            {data.nodes.map((sp, i) => (
              <tr key={sp.address} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                <td className="py-2.5 pl-4 pr-4 font-mono text-text3">{i + 1}</td>
                <td className="py-2.5 pr-4">
                  <Link href={`/tools/sp-explorer/${sp.address}`}
                    className="font-mono text-text2 hover:text-accent transition-colors" title={sp.address}>
                    {shortenAddr(sp.address)}
                  </Link>
                </td>
                <td className="py-2.5 pr-4 font-mono text-green-400 font-semibold text-right">{sp.activeSlots}</td>
                <td className="py-2.5 pr-4 font-mono text-yellow-400 text-right">{sp.joiningSlots || "—"}</td>
                <td className="py-2.5 pr-4 font-mono text-red-400 text-right">{sp.vacatedSlots || "—"}</td>
                <td className="py-2.5 pr-4">
                  {sp.activeSlots > 0 ? <StatusBadge status="active" /> : <StatusBadge status="inactive" />}
                </td>
                <td className="py-2.5 pr-4 font-mono text-text3 text-right">{timeAgo(sp.lastSeen)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,.5)]" />
        <span className="font-mono text-[10px] text-text3">
          数据来源：ShelbyNet GraphQL 索引器 · 每 5 分钟刷新
        </span>
      </div>
    </div>
  );
}

function StatBox({ value, label, color }: { value: string; label: string; color?: "green" | "yellow" | "red" }) {
  const colors = { green: "text-green-400", yellow: "text-yellow-400", red: "text-red-400" };
  const textColor = color ? colors[color] : "text-accent";

  return (
    <div className="bg-surface p-5 text-center">
      <div className={`font-mono text-2xl font-extrabold leading-none mb-1 ${textColor}`}>{value}</div>
      <div className="text-[10px] font-medium text-text3 uppercase tracking-wide">{label}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-green-500/10 text-green-400 border-green-500/30",
    waitlisted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    frozen: "bg-red-500/10 text-red-400 border-red-500/30",
  };
  const labels: Record<string, string> = {
    active: "活跃", waitlisted: "等待中", frozen: "冻结",
  };

  const s = styles[status] ?? "bg-surface2 text-text3 border-border";
  const l = labels[status] ?? status;

  return <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm border ${s}`}>{l}</span>;
}
