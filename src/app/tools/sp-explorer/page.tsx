import type { Metadata } from "next";
import Link from "next/link";
import { getShelbySPData } from "@/lib/shelby-data";

export const metadata: Metadata = {
  title: "Shelby SP 节点浏览器 — 实时存储提供商目录",
  description: "浏览 ShelbyNet 所有存储提供商(SP)。实时链上数据——配额、状态、位置。",
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

export default async function SPExplorerPage() {
  const data = await getShelbySPData();

  return (
    <div className="max-w-[960px] mx-auto px-5 py-12">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">
        / ShelbyNet
      </div>
      <h1 className="text-[36px] font-extrabold tracking-tight mb-2">SP 节点浏览器</h1>
      <p className="text-sm text-text2 mb-10">
        存储提供商(SP)实时目录。数据直接从 Aptos 链上 view function 读取。
      </p>

      {data.error && (
        <div className="p-6 border border-red-500/30 bg-red-500/5 rounded-lg text-sm text-red-400 mb-8">
          {data.error}
        </div>
      )}

      {/* Network Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-10">
        <StatBox value={data.stats.totalSPs.toString()} label="SP 总数" />
        <StatBox value={data.stats.activeSPs.toString()} label="活跃" color="green" />
        <StatBox value={data.stats.waitlistedSPs.toString()} label="等待中" color="yellow" />
        <StatBox value={formatBytes(data.stats.totalQuotaBytes)} label="总配额" />
      </div>

      {/* SP List */}
      <h2 className="text-xl font-extrabold mb-4">存储提供商列表</h2>
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-surface text-left font-mono text-[10px] text-text3 uppercase tracking-wider">
              <th className="py-3 pl-4 pr-4 font-medium">#</th>
              <th className="py-3 pr-4 font-medium">SP 地址</th>
              <th className="py-3 pr-4 font-medium">区域</th>
              <th className="py-3 pr-4 font-medium text-right">配额</th>
              <th className="py-3 pr-4 font-medium">状态</th>
              <th className="py-3 pr-4 font-medium">标记</th>
            </tr>
          </thead>
          <tbody>
            {data.nodes.length === 0 && !data.error && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-text3">
                  暂无 SP 节点。测试网可能还没有活跃的存储提供商。
                </td>
              </tr>
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
                <td className="py-2.5 pr-4 font-mono text-text2 text-[11px]">{sp.availabilityZone}</td>
                <td className="py-2.5 pr-4 font-mono text-accent font-semibold text-right">
                  {formatBytes(sp.quotaBytes)}
                </td>
                <td className="py-2.5 pr-4">
                  <StatusBadge status={sp.status} />
                </td>
                <td className="py-2.5 pr-4">
                  <div className="flex gap-1">
                    {sp.faulty && <span className="text-[9px] px-1 py-0.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-sm font-semibold">异常</span>}
                    {sp.leaving && <span className="text-[9px] px-1 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 rounded-sm font-semibold">退出中</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <span className={`w-2 h-2 rounded-full ${data.nodes.length > 0 ? "bg-green-400 shadow-[0_0_6px_rgba(34,197,94,.5)]" : "bg-yellow-400"}`} />
        <span className="font-mono text-[10px] text-text3">
          {data.nodes.length > 0 ? "数据来源：ShelbyNet 链上 view function" : "等待 SP 节点上线"}
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
