import type { Metadata } from "next";
import Link from "next/link";
import { getShelbyData } from "@/lib/shelby-data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "ShelbyNet 浏览器", description: "SP节点、Blob排行榜、实时事件、网络状态。" };

function fmtB(b: number): string {
  if (!b) return "0 B";
  const u = ["B","KB","MB","GB","TB","PB"]; let i=0,v=b;
  while(v>=1024&&i<u.length-1){v/=1024;i++}
  return `${v.toFixed(i>0?1:0)} ${u[i]}`;
}
function short(a:string):string{return`${a.slice(0,6)}...${a.slice(-4)}`}
function shortName(n:string):string{const p=n.split("/");return p[p.length-1]||n.slice(0,30)}
function ago(us:number):string{if(!us)return"—";const s=Math.floor((Date.now()-us/1000)/1000);if(s<60)return`${s}s`;if(s<3600)return`${Math.floor(s/60)}m`;if(s<86400)return`${Math.floor(s/3600)}h`;return`${Math.floor(s/86400)}d`}
function PctBar({pct}:{pct:number}){return<div className="w-full h-1 bg-border rounded-full mt-1"><div className="h-full bg-accent rounded-full" style={{width:`${Math.min(100,pct)}%`}}/></div>}

export default async function SPExplorerPage({ searchParams }: { searchParams: Promise<{ sort?: string; search?: string; tab?: string }> }) {
  const sp = await searchParams;
  const sort = sp.sort ?? "active";
  const search = sp.search ?? "";
  const tab = sp.tab ?? "sp";

  const d = await getShelbyData(sort, search);

  return (
    <div className="max-w-[1100px] mx-auto px-5 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-mono text-[11px] font-medium text-text3 uppercase tracking-wider mb-1">/ ShelbyNet</div>
          <h1 className="text-[36px] font-extrabold tracking-tight">浏览器</h1>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,.5)]"/>
            <span className="font-mono text-[10px] text-text3">实时 · 手动刷新</span>
          </div>
        </div>
      </div>

      {d.error && <div className="p-5 border border-red-500/30 bg-red-500/5 rounded-lg text-sm text-red-400 mb-8">{d.error}</div>}

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        <StatBox label="Blobs" value={d.blobCount.toLocaleString()} />
        <StatBox label="存储量" value={fmtB(d.totalSize)} accent />
        <StatBox label="活动" value={d.activityCount.toLocaleString()} />
        <StatBox label="SP" value={`${d.activeSPs}/${d.totalSPs}`} sub="活跃/总" />
        <StatBox label="槽位" value={`${d.activeSlots}/${d.totalSlots}`} sub="活跃/总" />
        <StatBox label="索引器" value={d.status ? "在线" : "—"} sub={d.status ? `v${d.status.lastVersion.toLocaleString()}` : ""} accent />
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {[
          { key: "sp", label: "SP 节点" },
          { key: "blobs", label: "Blob 排行榜" },
          { key: "events", label: "实时事件" },
          { key: "price", label: "成本对比" },
        ].map(t => (
          <a key={t.key} href={`?tab=${t.key}&sort=${sort}`}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
              tab === t.key ? "border-accent text-text" : "border-transparent text-text3 hover:text-text2"
            }`}>
            {t.label}
          </a>
        ))}
      </div>

      {/* Search & Sort Bar */}
      <div className="flex items-center gap-3 mb-4">
        <form className="flex-1 flex gap-2">
          <input name="search" defaultValue={search} placeholder="搜索 SP 地址..."
            className="flex-1 px-3 py-2 text-xs border border-border rounded bg-surface text-text placeholder:text-text3 focus:outline-none focus:border-accent font-mono" />
          <input type="hidden" name="tab" value={tab} />
          <button type="submit" className="px-4 py-2 text-xs font-semibold bg-accent text-white rounded hover:brightness-110 transition-colors">搜索</button>
          {search && <a href={`?tab=${tab}&sort=${sort}`} className="px-3 py-2 text-xs border border-border rounded text-text3 hover:text-text transition-colors">清除</a>}
        </form>
        <a href="?tab=sp&sort=active" className={`font-mono text-[10px] px-2 py-1 rounded border transition-colors ${sort==="active"&&!search?"border-accent text-accent":"border-border text-text3 hover:text-text"}`}>活跃↓</a>
        <a href="?tab=sp&sort=total" className={`font-mono text-[10px] px-2 py-1 rounded border transition-colors ${sort==="total"&&!search?"border-accent text-accent":"border-border text-text3 hover:text-text"}`}>总槽↓</a>
        <a href="/api/export-sp" className="font-mono text-[10px] px-2 py-1 rounded border border-accent/30 text-accent hover:bg-accent/10 transition-colors">CSV</a>
      </div>

      {/* Tab Content */}
      {tab === "sp" && <SPTable nodes={d.nodes} search={search} />}
      {tab === "blobs" && <BlobTab topBlobs={d.topBlobs} recentBlobs={d.recentBlobs} />}
      {tab === "events" && <EventsTable events={d.events} />}
      {tab === "price" && <PriceComparison activeSlots={d.activeSlots} totalSize={d.totalSize} />}

      {search && d.nodes.length === 0 && tab === "sp" && (
        <div className="py-12 text-center text-text3 text-sm">未找到匹配 &ldquo;{search}&rdquo; 的 SP 节点。</div>
      )}

      <p className="font-mono text-[10px] text-text3 mt-10 text-right">ShelbyNet GraphQL · {new Date().toLocaleString("zh-CN")}</p>
    </div>
  );
}

// ── Sub-components ──

function SPTable({ nodes, search }: { nodes: { address: string; activeSlots: number; totalSlots: number; joiningSlots: number; vacatedSlots: number; lastSeen: number }[]; search: string }) {
  return (
    <div className="border border-border rounded-lg overflow-x-auto">
      <table className="w-full text-xs">
        <thead><tr className="border-b border-border bg-surface text-left font-mono text-[10px] text-text3 uppercase tracking-wider">
          <th className="py-2.5 pl-3 pr-2 font-medium">SP</th>
          <th className="py-2.5 px-2 font-medium text-right">活跃</th>
          <th className="py-2.5 px-2 font-medium text-right">接入</th>
          <th className="py-2.5 px-2 font-medium text-right">退出</th>
          <th className="py-2.5 px-2 font-medium">活跃率</th>
          <th className="py-2.5 pr-3 pl-2 font-medium text-right">最近</th>
        </tr></thead>
        <tbody>
          {nodes.map(sp => {
            const pct = sp.totalSlots > 0 ? (sp.activeSlots / sp.totalSlots) * 100 : 0;
            return (
              <tr key={sp.address} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                <td className="py-2 pl-3 pr-2"><Link href={`/tools/sp-explorer/${sp.address}`} className="font-mono text-text2 hover:text-accent transition-colors" title={sp.address}>{short(sp.address)}</Link></td>
                <td className="py-2 px-2 font-mono text-green-400 font-semibold text-right">{sp.activeSlots}</td>
                <td className="py-2 px-2 font-mono text-yellow-400 text-right">{sp.joiningSlots||"—"}</td>
                <td className="py-2 px-2 font-mono text-red-400 text-right">{sp.vacatedSlots||"—"}</td>
                <td className="py-2 px-2 w-24"><PctBar pct={pct}/></td>
                <td className="py-2 pr-3 pl-2 font-mono text-text3 text-right text-[10px]">{ago(sp.lastSeen)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {search && nodes.length > 0 && <div className="px-3 py-2 text-[10px] text-text3 bg-surface border-t border-border">搜索 &ldquo;{search}&rdquo; — {nodes.length} 个结果</div>}
    </div>
  );
}

function BlobTab({ topBlobs, recentBlobs }: { topBlobs: { name: string; size: number; owner: string; chunksets: number; created: string }[]; recentBlobs: { name: string; size: number; owner: string; chunksets: number; created: string }[] }) {
  return (
    <>
      <h2 className="text-sm font-extrabold mb-3 mt-2">最新上传（30 条）</h2>
      <p className="text-xs text-text2 mb-3">按上传时间倒序。文件名、大小、分片数——实时追踪网络中新数据的流入。</p>
      <BlobTable blobs={recentBlobs} showTime />
      <h2 className="text-sm font-extrabold mb-3 mt-10">最大 Blobs（Top 50）</h2>
      <p className="text-xs text-text2 mb-3">按文件大小排名。</p>
      <BlobTable blobs={topBlobs} />
      <FileTypeStats blobs={topBlobs} />
    </>
  );
}

function BlobTable({ blobs, showTime }: { blobs: { name: string; size: number; owner: string; chunksets: number; created: string }[]; showTime?: boolean }) {
  return (
    <div>
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-xs">
          <thead><tr className="border-b border-border bg-surface text-left font-mono text-[10px] text-text3 uppercase tracking-wider">
            <th className="py-2.5 pl-3 pr-2 font-medium w-8">#</th>
            <th className="py-2.5 px-2 font-medium">文件名</th>
            <th className="py-2.5 px-2 font-medium text-right">大小</th>
            <th className="py-2.5 px-2 font-medium">所有者</th>
            <th className="py-2.5 px-2 font-medium text-right">分片</th>
            {showTime && <th className="py-2.5 pr-3 pl-2 font-medium text-right">时间</th>}
          </tr></thead>
          <tbody>
            {blobs.map((b,i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                <td className="py-2 pl-3 pr-2 font-mono text-text3">{i+1}</td>
                <td className="py-2 px-2 text-text2 truncate max-w-[250px]" title={b.name}>{shortName(b.name)}</td>
                <td className="py-2 px-2 font-mono text-accent font-semibold text-right">{fmtB(b.size)}</td>
                <td className="py-2 px-2 font-mono text-text3 text-[10px]">{short(b.owner)}</td>
                <td className="py-2 px-2 font-mono text-text3 text-right">{b.chunksets}</td>
                {showTime && <td className="py-2 pr-3 pl-2 font-mono text-text3 text-right text-[10px]">{ago(parseInt(b.created,10)/1000)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EventsTable({ events }: { events: { name: string; owner: string; type: string; time: string; hash?: string }[] }) {
  if (!events || events.length === 0) {
    return <div className="py-12 text-center text-text3 text-sm">暂无事件数据。</div>;
  }

  return (
    <div>
      <p className="text-xs text-text2 mb-3">最近 blob 事件。共 {events.length} 条。</p>
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-xs">
          <thead><tr className="border-b border-border bg-surface text-left font-mono text-[10px] text-text3 uppercase tracking-wider">
            <th className="py-2.5 pl-3 pr-2 font-medium w-16">类型</th>
            <th className="py-2.5 px-2 font-medium">Blob</th>
            <th className="py-2.5 px-2 font-medium">TX</th>
            <th className="py-2.5 pr-3 pl-2 font-medium text-right">时间</th>
          </tr></thead>
          <tbody>
            {events.map((e, i) => {
              const isReg = e.type?.includes("Registered");
              const isWritten = e.type?.includes("Written");
              const badgeColor = isReg ? "bg-green-500/10 text-green-400 border-green-500/30" :
                isWritten ? "bg-blue-500/10 text-blue-400 border-blue-500/30" :
                "bg-surface2 text-text3 border-border";
              return (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                  <td className="py-2 pl-3 pr-2">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm border ${badgeColor}`}>
                      {e.type || "事件"}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-text2 truncate max-w-[300px]" title={e.name}>
                    {shortName(e.name)}
                  </td>
                  <td className="py-2 px-2">
                    {e.hash ? (
                      <a href={`https://explorer.aptoslabs.com/txn/${e.hash}?network=shelbynet`}
                        target="_blank" rel="noopener noreferrer"
                        className="font-mono text-[10px] text-accent hover:underline">{short(e.hash)}</a>
                    ) : "—"}
                  </td>
                  <td className="py-2 pr-3 pl-2 font-mono text-text3 text-right text-[10px]">
                    {e.time ? new Date(e.time).toLocaleString("zh-CN") : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FileTypeStats({ blobs }: { blobs: { name: string; size: number }[] }) {
  const types: Record<string, { count: number; size: number }> = {};
  for (const b of blobs) {
    const ext = b.name.split(".").pop()?.toLowerCase() || "other";
    const cat = /^(mp4|mkv|avi|mov|webm)$/.test(ext) ? "视频" :
      /^(jpg|jpeg|png|gif|webp|svg)$/.test(ext) ? "图片" :
      /^(pdf|doc|docx|txt|md|csv|json|xml)$/.test(ext) ? "文档" :
      /^(rar|zip|gz|tar|7z)$/.test(ext) ? "压缩包" :
      /^(bin|dat|raw)$/.test(ext) ? "二进制" : "其他";
    if (!types[cat]) types[cat] = { count: 0, size: 0 };
    types[cat].count += 1;
    types[cat].size += b.size;
  }
  const sorted = Object.entries(types).sort((a,b) => b[1].size - a[1].size);

  return (
    <div className="mt-6">
      <h2 className="text-sm font-extrabold mb-3">文件类型分布（Top 50）</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {sorted.map(([cat,stats]) => (
          <div key={cat} className="p-3 rounded-lg border border-border bg-surface text-center">
            <div className="font-bold text-sm mb-0.5">{cat}</div>
            <div className="font-mono text-xs text-accent">{fmtB(stats.size)}</div>
            <div className="text-[10px] text-text3">{stats.count} 个文件</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriceComparison({ activeSlots, totalSize }: { activeSlots: number; totalSize: number }) {
  const shelbyCost = totalSize > 0 ? (totalSize / (1024**3)) * 0.01 : 0;
  const awsCost = totalSize > 0 ? (totalSize / (1024**3)) * 0.073 : 0;
  const savings = awsCost > 0 ? Math.round((1 - shelbyCost / awsCost) * 100) : 70;

  return (
    <div>
      <p className="text-xs text-text2 mb-3">基于当前网络数据的实时成本估算。更详细的个性化计算请使用 SP 收益计算器。</p>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="p-5 rounded-lg border border-border bg-surface text-center">
          <div className="text-text3 text-xs mb-1">AWS S3 (存储+出口)</div>
          <div className="font-mono text-2xl font-extrabold text-red-400">${awsCost.toFixed(2)}</div>
          <div className="text-[10px] text-text3 mt-1">$0.023/GB 存储 + $0.05/GB 出口</div>
        </div>
        <div className="p-5 rounded-lg border border-border bg-surface text-center">
          <div className="text-text3 text-xs mb-1">Shelby (写+读)</div>
          <div className="font-mono text-2xl font-extrabold text-green-400">${shelbyCost.toFixed(2)}</div>
          <div className="text-[10px] text-text3 mt-1">$0.0096/GB 写 + $0.0138/GB 读</div>
        </div>
        <div className="p-5 rounded-lg border border-accent/30 bg-accent/5 text-center">
          <div className="text-text3 text-xs mb-1">节省</div>
          <div className="font-mono text-2xl font-extrabold text-accent">~{savings}%</div>
          <div className="text-[10px] text-text3 mt-1">基于 {fmtB(totalSize)} 数据量</div>
        </div>
      </div>
      <div className="text-center">
        <a href="/tools/sp-calculator" className="font-mono text-xs text-accent hover:underline">SP 收益计算器 → 输入你的硬件参数获取精确估算</a>
      </div>
    </div>
  );
}

function StatBox({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className={`text-xl font-extrabold leading-none mb-0.5 ${accent?"text-accent":"text-text"}`}>{value}</div>
      <div className="text-[10px] font-medium text-text3 uppercase tracking-wide">{label}</div>
      {sub && <div className="text-[10px] text-text3 mt-0.5">{sub}</div>}
    </div>
  );
}
