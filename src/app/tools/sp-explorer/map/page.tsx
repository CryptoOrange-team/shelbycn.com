import type { Metadata } from "next";
import Link from "next/link";
import { getShelbyData } from "@/lib/shelby-data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "SP 网络拓扑" };

function short(a: string): string { return `${a.slice(0,6)}...${a.slice(-4)}`; }
function ago(us: number): string { if (!us) return "—"; const s = Math.floor((Date.now()-us/1000)/1000); if (s<60)return`${s}s`; if (s<3600)return`${Math.floor(s/60)}m`; return`${Math.floor(s/3600)}h`; }

export default async function MapPage() {
  const d = await getShelbyData();
  const nodes = d.nodes;

  // Radial layout positions
  const cx = 400, cy = 400, maxR = 320;
  const positioned = nodes.slice(0, 20).map((sp, i) => {
    const angle = (i / Math.max(1, nodes.length)) * Math.PI * 2 - Math.PI / 2;
    const r = 80 + (sp.activeSlots / Math.max(1, Math.max(...nodes.map(n => n.activeSlots)))) * (maxR - 80);
    return { ...sp, x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, r: 12 + sp.activeSlots * 2 };
  });

  const maxSlots = Math.max(...nodes.map(n => n.activeSlots), 1);

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-5 py-8 sm:py-12">
      <Link href="/tools/sp-explorer" className="font-mono text-xs text-text3 hover:text-text transition-colors">← 浏览器</Link>
      <div className="mt-4 mb-6">
        <div className="font-mono text-[10px] sm:text-[11px] font-medium text-text3 uppercase tracking-wider mb-1">/ ShelbyNet 拓扑</div>
        <h1 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight mb-2">节点分布图</h1>
        <p className="text-sm text-text2">存储提供商在 ShelbyNet 中的分布。基于活跃槽位数量的径向布局。</p>
      </div>

      {d.error && <div className="p-5 border border-red-500/30 bg-red-500/5 rounded-lg text-sm text-red-400 mb-6">{d.error}</div>}

      {nodes.length === 0 ? (
        <div className="py-16 text-center text-text3 text-sm">暂无 SP 节点数据。</div>
      ) : (
        <>
          {/* Radial Map */}
          <div className="p-4 rounded-xl border border-border bg-surface/50 backdrop-blur overflow-hidden">
            <svg viewBox="0 0 800 800" className="w-full max-w-[600px] mx-auto">
              {/* Rings */}
              {[80, 160, 240, 320].map(r => (
                <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#2a2a30" strokeWidth={r===80?1:0.5} strokeDasharray={r===80?"":"4 4"}/>
              ))}
              {/* Radial lines */}
              {positioned.map((sp, i) => {
                const angle = (i / Math.max(1, nodes.length)) * Math.PI * 2 - Math.PI / 2;
                return <line key={`line${i}`} x1={cx} y1={cy} x2={cx+Math.cos(angle)*maxR} y2={cy+Math.sin(angle)*maxR} stroke="#2a2a30" strokeWidth={0.3}/>;
              })}

              {/* Connections between SPs — show network mesh */}
              {positioned.map((a, i) =>
                positioned.slice(i+1, i+4).map((b, j) => (
                  <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#f97316" strokeWidth={0.3} opacity={0.15}/>
                ))
              )}

              {/* SP Nodes */}
              {positioned.map((sp, i) => {
                const hue = 25;
                const sat = 90;
                const light = 50 + (1 - sp.activeSlots/maxSlots) * 25;
                const size = Math.max(12, 10 + (sp.activeSlots/maxSlots) * 30);
                return (
                  <g key={sp.address}>
                    <circle cx={sp.x} cy={sp.y} r={size} fill={`hsl(${hue},${sat}%,${light}%)`} fillOpacity={0.85} stroke="#f97316" strokeWidth={1.5}>
                      <title>{sp.address}{"\n"}活跃: {sp.activeSlots}/{sp.totalSlots} 槽位{"\n"}最近: {ago(sp.lastSeen)}</title>
                    </circle>
                    <text x={sp.x} y={sp.y + size + 12} fill="#9090a8" fontSize={9} textAnchor="middle" fontFamily="monospace">
                      {short(sp.address)}
                    </text>
                  </g>
                );
              })}

              {/* Center */}
              <circle cx={cx} cy={cy} r={30} fill="#141415" stroke="#f97316" strokeWidth={2}/>
              <text x={cx} y={cy-4} fill="#f97316" fontSize={12} fontWeight={700} textAnchor="middle" fontFamily="monospace">ShelbyNet</text>
              <text x={cx} y={cy+12} fill="#9090a8" fontSize={10} textAnchor="middle" fontFamily="monospace">{d.activeSPs} 活跃</text>

              {/* Legend */}
              <g transform="translate(20,760)">
                <circle cx={0} cy={0} r={5} fill="#f97316"/><text x={10} y={3} fill="#5c5c64" fontSize={9}>活跃 SP</text>
                <text x={100} y={3} fill="#3a3a45" fontSize={9}>节点大小 = 活跃槽位</text>
                <text x={280} y={3} fill="#3a3a45" fontSize={9}>连线 = 网络连接</text>
              </g>
            </svg>
          </div>

          {/* Node Table */}
          <div className="mt-6 p-4 rounded-xl border border-border bg-surface/50 backdrop-blur">
            <h2 className="text-xs font-semibold text-text3 uppercase tracking-wider mb-3">节点列表</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {nodes.map(sp => {
                const health = sp.totalSlots > 0 ? Math.round((sp.activeSlots/sp.totalSlots)*60 + (sp.lastSeen?Math.max(0,100-((Date.now()-sp.lastSeen/1000)/3600000)*10):0)*40) : 0;
                const hc = health>=80?"text-green-400":health>=50?"text-yellow-400":"text-red-400";
                return (
                  <Link key={sp.address} href={`/tools/sp-explorer/${sp.address}`}
                    className="flex items-center gap-2 p-2 rounded-lg border border-border bg-surface hover:bg-surface2 transition-colors text-[10px]">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${sp.activeSlots>0?"bg-green-400":"bg-text3"}`}/>
                    <span className="font-mono text-text3 truncate flex-1">{short(sp.address)}</span>
                    <span className={`font-mono font-bold ${hc}`}>{health}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}

      <div className="mt-6 p-4 rounded-xl border border-border bg-surface/30 text-xs text-text3">
        <span className="font-semibold text-text">说明：</span>
        地理坐标数据（latitude/longitude）不可用——GraphQL 索引器和链上 RPC 均不暴露 SP 的地理位置。
        本图基于活跃槽位数量进行径向分布。主网上线后，SP 的 availability_zone 数据可用于真实地理分布。
      </div>

      <p className="font-mono text-[10px] text-text3 mt-6 text-right">{new Date().toLocaleString("zh-CN")}</p>
    </div>
  );
}
