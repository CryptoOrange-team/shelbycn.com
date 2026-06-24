import type { Metadata } from "next";
import Link from "next/link";

interface SlotRow {
  placement_group: string;
  slot_index: number;
  storage_provider: string;
  status: string;
  updated_at: number;
}

async function getSPData(address: string) {
  const endpoint = "https://api.shelbynet.aptoslabs.com/nocode/v1/public/alias/shelby/shelbynet/v1/graphql";

  const query = `
    query GetSPSlots($addr: String!) {
      placement_group_slots(
        where: { storage_provider: { _eq: $addr } }
        order_by: { updated_at: desc }
        limit: 200
      ) {
        placement_group
        slot_index
        storage_provider
        status
        updated_at
      }
    }
  `;

  const variables = { addr: address };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 300 },
    });

    const json = await res.json();
    const slots: SlotRow[] = json?.data?.placement_group_slots ?? [];

    const activeSlots = slots.filter(s => s.status === "active");
    const joiningSlots = slots.filter(s => s.status === "joining");
    const vacatedSlots = slots.filter(s => s.status === "vacated");
    const lastActive = slots.length > 0 ? Math.max(...slots.map(s => s.updated_at)) : 0;

    return {
      address,
      slots,
      totalSlots: slots.length,
      activeSlots: activeSlots.length,
      joiningSlots: joiningSlots.length,
      vacatedSlots: vacatedSlots.length,
      lastActive,
      error: null,
    };
  } catch (e) {
    return {
      address, slots: [] as SlotRow[],
      totalSlots: 0, activeSlots: 0, joiningSlots: 0, vacatedSlots: 0,
      lastActive: 0, error: "无法加载 SP 数据。请稍后重试。",
    };
  }
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

function formatTime(us: number): string {
  if (!us) return "—";
  return new Date(us / 1000).toLocaleString("zh-CN");
}

export async function generateMetadata({ params }: { params: Promise<{ address: string }> }): Promise<Metadata> {
  const { address } = await params;
  return { title: `SP ${address.slice(0, 8)}... — 节点详情` };
}

export default async function SPDetailPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = await params;
  const data = await getSPData(address);

  return (
    <div className="max-w-[960px] mx-auto px-5 py-12">
      <Link href="/tools/sp-explorer" className="font-mono text-xs text-text3 hover:text-text transition-colors">
        ← SP 节点浏览器
      </Link>

      <div className="mt-4 mb-10">
        <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">
          / 存储提供商详情
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight mb-2 break-all">{address}</h1>
        <div className="flex gap-3 flex-wrap mt-3">
          <a href={`https://explorer.shelby.xyz/shelbynet/account/${address}`}
            target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:underline">
            Shelby Explorer ↗
          </a>
          <a href={`https://explorer.aptoslabs.com/account/${address}?network=shelbynet`}
            target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-text3 hover:text-text transition-colors">
            Aptos Explorer ↗
          </a>
        </div>
      </div>

      {data.error && (
        <div className="p-6 border border-red-500/30 bg-red-500/5 rounded-lg text-sm text-red-400 mb-8">
          {data.error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-10">
        <StatBox value={data.totalSlots.toString()} label="总槽位" />
        <StatBox value={data.activeSlots.toString()} label="活跃" color="green" />
        <StatBox value={data.joiningSlots.toString()} label="接入中" color="yellow" />
        <StatBox value={data.vacatedSlots.toString()} label="已退出" color="red" />
      </div>

      {/* Slot Table */}
      <h2 className="text-xl font-extrabold mb-4">槽位详情</h2>
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-surface text-left font-mono text-[10px] text-text3 uppercase tracking-wider">
              <th className="py-3 pl-4 pr-4 font-medium">槽位</th>
              <th className="py-3 pr-4 font-medium">存储组</th>
              <th className="py-3 pr-4 font-medium">状态</th>
              <th className="py-3 pr-4 font-medium text-right">更新时间</th>
            </tr>
          </thead>
          <tbody>
            {data.slots.length === 0 && !data.error && (
              <tr><td colSpan={4} className="py-12 text-center text-text3">该 SP 暂无槽位数据。</td></tr>
            )}
            {data.slots.map((s) => (
              <tr key={`${s.placement_group}-${s.slot_index}`} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                <td className="py-2.5 pl-4 pr-4 font-mono">{s.slot_index}</td>
                <td className="py-2.5 pr-4 font-mono text-text2 text-[11px]" title={s.placement_group}>
                  {s.placement_group.slice(0, 12)}...
                </td>
                <td className="py-2.5 pr-4">
                  <StatusBadge status={s.status} />
                </td>
                <td className="py-2.5 pr-4 font-mono text-text3 text-right">{formatTime(s.updated_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatBox({ value, label, color }: { value: string; label: string; color?: "green" | "yellow" | "red" }) {
  const colors = {
    green: "text-green-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
  };
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
    joining: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    vacated: "bg-red-500/10 text-red-400 border-red-500/30",
  };
  const labels: Record<string, string> = {
    active: "活跃", joining: "接入中", vacated: "已退出",
  };

  const s = styles[status] ?? "bg-surface2 text-text3 border-border";
  const l = labels[status] ?? status;

  return <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm border ${s}`}>{l}</span>;
}
