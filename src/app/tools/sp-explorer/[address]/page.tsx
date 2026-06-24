import type { Metadata } from "next";
import Link from "next/link";
import { getShelbyData } from "@/lib/shelby-data";

export async function generateMetadata({ params }: { params: Promise<{ address: string }> }): Promise<Metadata> {
  const { address } = await params;
  return { title: `SP ${address.slice(0, 10)}... — 详情` };
}

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let i = 0; let val = bytes;
  while (val >= 1024 && i < units.length - 1) { val /= 1024; i++; }
  return `${val.toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

export default async function SPDetailPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = await params;
  const data = await getShelbyData();
  const sp = data.nodes.find(n => n.address.toLowerCase() === address.toLowerCase());

  if (!sp && !data.error) {
    return (
      <div className="max-w-[960px] mx-auto px-5 py-12">
        <Link href="/tools/sp-explorer" className="font-mono text-xs text-text3 hover:text-text transition-colors">← SP 节点浏览器</Link>
        <div className="mt-16 text-center py-20">
          <h1 className="text-2xl font-extrabold mb-4">SP 未找到</h1>
          <p className="text-text2 text-sm">网络中未找到该地址。</p>
          <Link href="/tools/sp-explorer" className="text-accent text-sm mt-4 inline-block">返回列表 →</Link>
        </div>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="max-w-[960px] mx-auto px-5 py-12">
        <Link href="/tools/sp-explorer" className="font-mono text-xs text-text3 hover:text-text transition-colors">← SP 节点浏览器</Link>
        <div className="mt-10 p-6 border border-red-500/30 bg-red-500/5 rounded-lg text-sm text-red-400">
          {data.error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[960px] mx-auto px-5 py-12">
      <Link href="/tools/sp-explorer" className="font-mono text-xs text-text3 hover:text-text transition-colors">
        ← SP 节点浏览器
      </Link>

      <div className="mt-4 mb-10">
        <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">
          / 存储提供商详情
        </div>
        <h1 className="text-xl font-extrabold tracking-tight mb-2 break-all">{sp!.address}</h1>
        <a href={`https://explorer.shelby.xyz/shelbynet/account/${sp!.address}`}
          target="_blank" rel="noopener noreferrer"
          className="font-mono text-xs text-accent hover:underline mt-2 inline-block">
          Shelby Explorer ↗
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-10">
        <DetailBox label="总槽位" value={sp!.totalSlots.toString()} />
        <DetailBox label="活跃槽位" value={sp!.activeSlots.toString()} color="text-green-400" />
        <DetailBox label="接入中" value={sp!.joiningSlots.toString() || "—"} color="text-yellow-400" />
        <DetailBox label="已退出" value={sp!.vacatedSlots.toString() || "—"} color="text-red-400" />
      </div>

      <div className="p-8 rounded-lg border border-border bg-surface">
        <h2 className="text-lg font-extrabold mb-3">关于存储提供商</h2>
        <div className="text-sm text-text2 space-y-2">
          <p>存储提供商(SP)运行物理服务器，为 Shelby 网络贡献硬盘空间和带宽。</p>
          <p>每个<b className="text-text">槽位(Slot)</b>代表该 SP 在一个存储组(Placement Group)中的位置。</p>
          <p>SP 通过<b className="text-text">写费用</b>（存储数据）和<b className="text-text">读费用</b>（提供数据）获得收入。</p>
        </div>
      </div>
    </div>
  );
}

function DetailBox({ label, value, accent, mono, color, children }: {
  label: string;
  value?: string;
  accent?: boolean;
  mono?: boolean;
  color?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-surface p-5">
      <div className="text-[10px] font-medium text-text3 uppercase tracking-wider mb-1.5">{label}</div>
      {children ? children : (
        <div className={`text-sm font-semibold ${accent ? "text-accent" : color ?? "text-text"} ${mono ? "font-mono text-xs break-all" : ""}`}>
          {value ?? "—"}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-green-500/10 text-green-400 border-green-500/30",
    waitlisted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    frozen: "bg-red-500/10 text-red-400 border-red-500/30",
  };
  const labels: Record<string, string> = { active: "活跃", waitlisted: "等待中", frozen: "冻结" };

  const s = styles[status] ?? "bg-surface2 text-text3 border-border";
  const l = labels[status] ?? status;

  return <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm border ${s}`}>{l}</span>;
}
