import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shelby SP 节点浏览器 — 实时存储提供商目录",
  description: "浏览 Shelby 网络上的所有存储提供商(SP)节点。查看容量、审计分数、状态、位置——实时链上数据。",
};

interface SlotRow {
  placement_group: string;
  slot_index: number;
  storage_provider: string;
  status: string;
  updated_at: number;
}

interface SPNode {
  address: string;
  slots: number;
  activeSlots: number;
  status: string;
  lastSeen: number;
}

async function getShelbyData() {
  const endpoint = "https://api.shelbynet.aptoslabs.com/nocode/v1/public/alias/shelby/shelbynet/v1/graphql";

  const querySlots = `
    query GetPlacementGroupSlots {
      placement_group_slots(
        order_by: { updated_at: desc }
        limit: 500
      ) {
        placement_group
        slot_index
        storage_provider
        status
        updated_at
      }
    }
  `;

  const queryBlobs = `
    query GetBlobsStats {
      blobs_aggregate {
        aggregate {
          count
          sum { size }
        }
      }
      blob_activities_aggregate {
        aggregate {
          count
        }
      }
    }
  `;

  try {
    const [slotsRes, blobsRes] = await Promise.all([
      fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: querySlots }), next: { revalidate: 300 } }),
      fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: queryBlobs }), next: { revalidate: 300 } }),
    ]);

    const slotsJson = await slotsRes.json();
    const blobsJson = await blobsRes.json();

    const slots: SlotRow[] = slotsJson?.data?.placement_group_slots ?? [];
    const blobCount = blobsJson?.data?.blobs_aggregate?.aggregate?.count ?? 0;
    const totalSize = blobsJson?.data?.blobs_aggregate?.aggregate?.sum?.size ?? 0;
    const activityCount = blobsJson?.data?.blob_activities_aggregate?.aggregate?.count ?? 0;

    // Aggregate by SP
    const spMap = new Map<string, SPNode>();
    for (const s of slots) {
      const existing = spMap.get(s.storage_provider);
      const isActive = s.status === "active";
      if (existing) {
        existing.slots += 1;
        if (isActive) existing.activeSlots += 1;
        if (s.updated_at > existing.lastSeen) existing.lastSeen = s.updated_at;
        existing.status = isActive ? "active" : existing.status;
      } else {
        spMap.set(s.storage_provider, {
          address: s.storage_provider,
          slots: 1,
          activeSlots: isActive ? 1 : 0,
          status: s.status,
          lastSeen: s.updated_at,
        });
      }
    }

    const nodes = Array.from(spMap.values()).sort((a, b) => b.activeSlots - a.activeSlots);

    return {
      nodes,
      totalSPs: nodes.length,
      activeSPs: nodes.filter(n => n.status === "active").length,
      totalSlots: slots.length,
      activeSlots: slots.filter(s => s.status === "active").length,
      blobCount,
      totalSize: totalSize ?? 0,
      activityCount,
      error: null,
    };
  } catch (e) {
    return {
      nodes: [] as SPNode[],
      totalSPs: 0, activeSPs: 0, totalSlots: 0, activeSlots: 0,
      blobCount: 0, totalSize: 0, activityCount: 0,
      error: "无法连接到 Shelby 索引器。请稍后重试。",
    };
  }
}

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  let val = bytes;
  while (val >= 1024 && i < units.length - 1) { val /= 1024; i++; }
  return `${val.toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

function timeAgo(us: number): string {
  if (!us) return "—";
  const ms = us / 1000;
  const seconds = Math.floor((Date.now() - ms) / 1000);
  if (seconds < 60) return `${seconds}秒前`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟前`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}小时前`;
  return `${Math.floor(seconds / 86400)}天前`;
}

function shortenAddr(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default async function SPExplorerPage() {
  const data = await getShelbyData();

  return (
    <div className="max-w-[960px] mx-auto px-5 py-12">
      <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">
        / Shelby 网络
      </div>
      <h1 className="text-[36px] font-extrabold tracking-tight mb-2">SP 节点浏览器</h1>
      <p className="text-sm text-text2 mb-10">
        ShelbyNet 实时存储提供商目录。数据每 5 分钟从链上索引器刷新。
      </p>

      {data.error && (
        <div className="p-6 border border-red-500/30 bg-red-500/5 rounded-lg text-sm text-red-400 mb-8">
          {data.error}
        </div>
      )}

      {/* Network Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-10">
        <StatBox value={data.totalSPs.toString()} label="SP 节点" />
        <StatBox value={data.activeSPs.toString()} label="活跃节点" />
        <StatBox value={data.blobCount.toLocaleString()} label="总 Blobs" />
        <StatBox value={formatBytes(data.totalSize)} label="总存储量" />
      </div>

      {/* SP List */}
      <h2 className="text-xl font-extrabold mb-4">存储提供商列表</h2>
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-surface text-left font-mono text-[10px] text-text3 uppercase tracking-wider">
              <th className="py-3 pl-4 pr-4 font-medium">#</th>
              <th className="py-3 pr-4 font-medium">SP 地址</th>
              <th className="py-3 pr-4 font-medium text-right">槽位</th>
              <th className="py-3 pr-4 font-medium text-right">活跃</th>
              <th className="py-3 pr-4 font-medium">状态</th>
              <th className="py-3 pr-4 font-medium text-right">最后活跃</th>
            </tr>
          </thead>
          <tbody>
            {data.nodes.length === 0 && !data.error && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-text3">
                  暂无数据。测试网可能还没有活跃的 SP 节点。
                </td>
              </tr>
            )}
            {data.nodes.map((sp, i) => (
              <tr key={sp.address} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                <td className="py-2.5 pl-4 pr-4 font-mono text-text3">{i + 1}</td>
                <td className="py-2.5 pr-4">
                  <Link href={`/tools/sp-explorer/${sp.address}`} className="font-mono text-text2 hover:text-accent transition-colors" title={sp.address}>
                    {shortenAddr(sp.address)}
                  </Link>
                </td>
                <td className="py-2.5 pr-4 font-mono text-right">{sp.slots}</td>
                <td className="py-2.5 pr-4 font-mono text-accent font-semibold text-right">{sp.activeSlots}</td>
                <td className="py-2.5 pr-4">
                  <StatusBadge status={sp.status} />
                </td>
                <td className="py-2.5 pr-4 font-mono text-text3 text-right">{timeAgo(sp.lastSeen)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-mono text-[10px] text-text3 mt-4 text-right">
        数据来源：ShelbyNet GraphQL 索引器 · 每 5 分钟刷新
      </p>

      {/* How it works */}
      <section className="mt-16 p-8 rounded-lg border border-border bg-surface">
        <h2 className="text-lg font-extrabold mb-3">工作原理</h2>
        <div className="text-sm text-text2 space-y-2">
          <p>Shelby 的去中心化存储由<b className="text-text">存储提供商 (SP)</b> 节点组成。</p>
          <p>每个 SP 运行硬件服务器，存储被 Clay 纠删码切分的数据块。SP 通过写费用和读费用获得收入。</p>
          <p>数据来自 ShelbyNet 的<b className="text-text">placement_group_slots</b> 索引——每个槽位代表一个 SP 在某个存储组中的位置。</p>
          <p className="text-text3">本浏览器是社区的透明化工具。非官方出品。</p>
        </div>
      </section>
    </div>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-surface p-5 text-center">
      <div className="font-mono text-2xl font-extrabold text-accent leading-none mb-1">{value}</div>
      <div className="text-[10px] font-medium text-text3 uppercase tracking-wide">{label}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-green-500/10 text-green-400 border-green-500/30",
    joining: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    vacated: "bg-red-500/10 text-red-400 border-red-500/30",
  };
  const labels: Record<string, string> = {
    active: "活跃",
    joining: "接入中",
    vacated: "已退出",
  };

  const s = styles[status] ?? "bg-surface2 text-text3 border-border";
  const l = labels[status] ?? status;

  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm border ${s}`}>
      {l}
    </span>
  );
}
