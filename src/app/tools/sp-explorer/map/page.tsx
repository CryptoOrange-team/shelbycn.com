import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "SP 节点地图" };

interface SPGeo { address: string; zone: string; lat: number; lng: number; active?: boolean; }

// Zone → approximate lat/lng mapping
const ZONE_COORDS: Record<string, [number, number]> = {
  "us-east-1": [39, -77], "us-east-2": [40, -83], "us-west-1": [37, -122], "us-west-2": [46, -120],
  "us-central": [41, -88], "us-east": [39, -76], "us-west": [37, -122],
  "eu-west-1": [53, -8], "eu-west-2": [51, -0.1], "eu-central-1": [50, 8],
  "eu-north-1": [59, 18], "europe-west": [51, -0.1], "europe": [50, 10],
  "ap-southeast-1": [1, 104], "ap-southeast-2": [-34, 151],
  "ap-northeast-1": [36, 140], "ap-northeast-2": [37, 127],
  "ap-south-1": [19, 73], "asia-east": [36, 140], "asia": [34, 108],
  "sa-east-1": [-24, -46], "south-america": [-15, -55],
};

function parseZone(zoneStr: string): string {
  return zoneStr?.toLowerCase().trim() || "unknown";
}

async function getSPGeo(): Promise<{ nodes: SPGeo[]; error: string | null }> {
  const RPC = "https://fullnode.shelbynet.aptoslabs.com/v1/view";
  const DEPLOYER = "0x85fdb9a176ab8ef1d9d9c1b60d60b3924f0800ac1de1cc2085fb0b8bb4988e6a";

  try {
    const res = await fetch(RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        function: `${DEPLOYER}::storage_provider_registry::get_all_storage_providers`,
        type_arguments: [],
        arguments: [],
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) throw new Error(`RPC ${res.status}`);

    const data = await res.json();
    const raw = Array.isArray(data) ? (Array.isArray(data[0]) ? data[0] : data) : [];

    const nodes: SPGeo[] = [];
    for (const sp of raw) {
      if (!sp?.address) continue;
      const zone = parseZone(sp.availabilityZone || "");
      const match = Object.entries(ZONE_COORDS).find(([k]) => zone.includes(k) || k.includes(zone));
      const [lat, lng] = match ? match[1] : [0, 0];
      const active = sp.state?.variant === "Active";
      nodes.push({ address: sp.address, zone: sp.availabilityZone || "Unknown", lat, lng, active });
    }

    return { nodes, error: null };
  } catch (e) {
    return { nodes: [], error: (e as Error).message };
  }
}

function MapSVG({ nodes }: { nodes: SPGeo[] }) {
  // Simple world dot map
  const activeNodes = nodes.filter(n => n.active);
  const inactiveNodes = nodes.filter(n => !n.active);

  // Convert lat/lng to SVG coordinates (Mercator-like)
  const toSvg = (lat: number, lng: number): [number, number] => {
    const x = ((lng + 180) / 360) * 800;
    const y = ((90 - lat) / 180) * 400;
    return [x, y];
  };

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto rounded-lg">
      {/* Ocean background */}
      <rect width={800} height={400} fill="#1a1a20" rx={8} />

      {/* Grid lines */}
      {[0, 100, 200, 300].map(y => <line key={`h${y}`} x1={0} y1={y} x2={800} y2={y} stroke="#2a2a30" strokeWidth={0.5} />)}
      {[0, 200, 400, 600].map(x => <line key={`v${x}`} x1={x} y1={0} x2={x} y2={400} stroke="#2a2a30" strokeWidth={0.5} />)}

      {/* Simple continent outlines (approximated) */}
      <g fill="#2a2a35" stroke="#3a3a45" strokeWidth={0.5}>
        {/* North America */}
        <path d="M80,80 L200,60 L240,40 L280,50 L320,80 L300,120 L260,140 L200,160 L120,140 L80,100Z"/>
        {/* South America */}
        <path d="M180,180 L220,170 L240,200 L230,240 L200,280 L180,260 L160,220Z"/>
        {/* Europe */}
        <path d="M360,60 L400,40 L440,50 L460,70 L440,100 L400,110 L360,90Z"/>
        {/* Africa */}
        <path d="M370,120 L420,110 L460,130 L450,180 L420,220 L380,200 L360,160Z"/>
        {/* Asia */}
        <path d="M460,40 L540,20 L640,30 L680,50 L660,80 L560,100 L460,80Z"/>
        {/* Australia */}
        <path d="M620,220 L680,210 L700,240 L680,260 L620,250Z"/>
      </g>

      {/* Region labels */}
      <text x={180} y={130} fill="#3a3a45" fontSize={8} textAnchor="middle">北美</text>
      <text x={420} y={80} fill="#3a3a45" fontSize={8} textAnchor="middle">欧洲</text>
      <text x={560} y={65} fill="#3a3a45" fontSize={8} textAnchor="middle">亚洲</text>

      {/* SP Nodes */}
      {activeNodes.map(n => {
        const [x, y] = toSvg(n.lat, n.lng);
        return (
          <g key={n.address}>
            <circle cx={x} cy={y} r={6} fill="#22c55e" fillOpacity={0.8} stroke="#22c55e" strokeWidth={2}>
              <title>{n.address}{"\n"}{n.zone} — Active</title>
            </circle>
            <circle cx={x} cy={y} r={12} fill="none" stroke="#22c55e" strokeWidth={0.5} opacity={0.4}>
              <animate attributeName="r" from={12} to={20} dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" from={0.4} to={0} dur="2s" repeatCount="indefinite"/>
            </circle>
          </g>
        );
      })}
      {inactiveNodes.map(n => {
        const [x, y] = toSvg(n.lat, n.lng);
        return (
          <g key={n.address}>
            <circle cx={x} cy={y} r={4} fill="#5c5c64" stroke="#3a3a40" strokeWidth={1}>
              <title>{n.address}{"\n"}{n.zone} — Inactive</title>
            </circle>
          </g>
        );
      })}

      {/* Legend */}
      <g transform="translate(10,375)">
        <circle cx={0} cy={0} r={4} fill="#22c55e"/><text x={10} y={3} fill="#5c5c64" fontSize={7}>活跃</text>
        <circle cx={50} cy={0} r={4} fill="#5c5c64"/><text x={60} y={3} fill="#5c5c64" fontSize={7}>非活跃</text>
        <text x={100} y={3} fill="#3a3a45" fontSize={7}>· 位置近似（基于可用区）</text>
      </g>
    </svg>
  );
}

export default async function MapPage() {
  const { nodes, error } = await getSPGeo();
  const activeCount = nodes.filter(n => n.active).length;

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-5 py-8 sm:py-12">
      <div className="font-mono text-[10px] sm:text-[11px] font-medium text-text3 uppercase tracking-wider mb-3">/ ShelbyNet 地图</div>
      <h1 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight mb-2">SP 节点分布</h1>
      <p className="text-sm text-text2 mb-8">存储提供商全球分布。数据从链上 view function 实时查询。</p>

      {error && <div className="p-5 border border-red-500/30 bg-red-500/5 rounded-lg text-sm text-red-400 mb-6">{error}</div>}

      <div className="mb-4 flex gap-4 text-xs text-text3">
        <span>总节点: <strong className="text-text">{nodes.length}</strong></span>
        <span>活跃: <strong className="text-green-400">{activeCount}</strong></span>
        <span>非活跃: <strong className="text-text3">{nodes.length - activeCount}</strong></span>
      </div>

      {nodes.length > 0 ? (
        <>
          <MapSVG nodes={nodes} />
          <div className="mt-6 p-4 rounded-xl border border-border bg-surface/50 backdrop-blur">
            <h2 className="text-xs font-semibold text-text3 uppercase tracking-wider mb-3">节点详情</h2>
            <div className="space-y-1.5">
              {nodes.map(n => (
                <div key={n.address} className="flex items-center gap-3 text-[10px]">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${n.active ? "bg-green-400" : "bg-text3"}`}/>
                  <span className="font-mono text-text3 w-20 truncate">{n.address.slice(0,8)}...</span>
                  <span className="text-text2 flex-1">{n.zone}</span>
                  <span className="text-text3">{n.lat.toFixed(0)}°, {n.lng.toFixed(0)}°</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="py-16 text-center text-text3 text-sm">
          {error ? "无法加载节点数据。" : "暂无 SP 节点数据。"}
        </div>
      )}

      <p className="font-mono text-[10px] text-text3 mt-6 text-right">链上数据 · {new Date().toLocaleString("zh-CN")}</p>
    </div>
  );
}
