import type { Metadata } from "next";
import Link from "next/link";
import { getShelbyData } from "@/lib/shelby-data";
import { AutoRefresh } from "@/components/AutoRefresh";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "ShelbyNet 浏览器", description: "SP节点 · Blob排行榜 · 实时事件 · 成本对比" };

function fmtB(b: number): string {
  if (!b) return "0 B";
  const u = ["B","KB","MB","GB","TB","PB"]; let i=0,v=b;
  while(v>=1024&&i<u.length-1){v/=1024;i++}
  return `${v.toFixed(i>0?1:0)} ${u[i]}`;
}
function fmtN(n: number): string {
  if (n>=1_000_000)return`${(n/1_000_000).toFixed(1)}M`;
  if (n>=1_000)return`${(n/1_000).toFixed(1)}K`;
  return n.toLocaleString();
}
function short(a:string):string{return`${a.slice(0,6)}...${a.slice(-4)}`}
function shortName(n:string):string{const p=n.split("/");return p[p.length-1]||n.slice(0,30)}
function ago(us:number):string{if(!us)return"—";const s=Math.floor((Date.now()-us/1000)/1000);if(s<60)return`${s}s`;if(s<3600)return`${Math.floor(s/60)}m`;if(s<86400)return`${Math.floor(s/3600)}h`;return`${Math.floor(s/86400)}d`}

export default async function SPExplorerPage({ searchParams }: { searchParams: Promise<{ sort?:string;search?:string;tab?:string}> }) {
  const sp = await searchParams;
  const sort = sp.sort??"active",search=sp.search??"",tab=sp.tab??"sp";
  const d = await getShelbyData(sort,search);

  const insight = d.error ? "数据获取异常" :
    `当前 ${d.activeSPs} 个活跃 SP 维护 ${d.activeSlots} 个槽位，网络累计 ${fmtN(d.blobCount)} 个 Blobs（${fmtB(d.totalSize)}），完成 ${fmtN(d.activityCount)} 次活动。存储成本比 AWS S3 低约 70%。`;

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-5 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="font-mono text-[10px] sm:text-[11px] font-medium text-text3 uppercase tracking-wider mb-1">/ ShelbyNet 浏览器</div>
          <h1 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight">网络概览</h1>
        </div>
        <AutoRefresh interval={30} />
      </div>

      {/* AI Insight */}
      <div className="mb-6 p-4 rounded-xl border border-border bg-surface/50 backdrop-blur">
        <div className="flex items-start gap-2">
          <span className="text-sm shrink-0 mt-0.5">📊</span>
          <p className="text-xs sm:text-sm text-text2 leading-relaxed">{insight}</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 pt-3 border-t border-border text-xs text-text3">
          <span>近 7 日新增 <strong className="text-text">{fmtN(d.growth.weekBlobs)}</strong> blobs（{fmtB(d.growth.weekSize)}）</span>
          <span>近 24h 新增 <strong className="text-text">{fmtN(d.growth.dayBlobs)}</strong> blobs（{fmtB(d.growth.daySize)}）</span>
          <span>24h 新增占比 <strong className="text-accent">{d.blobCount > 0 ? ((d.growth.dayBlobs/d.blobCount)*100).toFixed(1) : "0"}%</strong></span>
        </div>
      </div>

      {/* Growth Visual */}
      <div className="mb-6 p-4 rounded-xl border border-border bg-surface/50 backdrop-blur">
        <div className="text-xs font-semibold text-text3 uppercase tracking-wider mb-3">存储增长分布</div>
        <div className="space-y-2">
          {(() => {
            const oldPct = d.blobCount > 0 ? ((d.blobCount - d.growth.weekBlobs)/d.blobCount)*100 : 0;
            const weekPct = d.blobCount > 0 ? ((d.growth.weekBlobs - d.growth.dayBlobs)/d.blobCount)*100 : 0;
            const dayPct = d.blobCount > 0 ? (d.growth.dayBlobs/d.blobCount)*100 : 0;
            const items = [
              { label: "早期 (>7天)", pct: oldPct, count: d.blobCount - d.growth.weekBlobs, color: "bg-border" },
              { label: "近 7 天", pct: weekPct, count: d.growth.weekBlobs - d.growth.dayBlobs, color: "bg-blue-400/60" },
              { label: "近 24h", pct: dayPct, count: d.growth.dayBlobs, color: "bg-accent" },
            ];
            return items.map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-[10px] text-text3 w-20 shrink-0">{item.label}</span>
                <div className="flex-1 h-4 bg-border rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all`} style={{width:`${Math.max(1,item.pct)}%`}}/>
                </div>
                <span className="font-mono text-[10px] text-text2 w-16 text-right">{fmtN(item.count)}</span>
                <span className="font-mono text-[10px] text-text3 w-10 text-right">{item.pct.toFixed(1)}%</span>
              </div>
            ));
          })()}
        </div>
      </div>

      {d.error && <div className="p-4 border border-red-500/30 bg-red-500/5 rounded-lg text-sm text-red-400 mb-6">{d.error}</div>}

      {/* Live Ticker */}
      {d.events.length > 0 && (
        <div className="mb-6 p-3 rounded-xl border border-accent/20 bg-accent/5 overflow-hidden">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0"/>
            <span className="font-mono text-[10px] text-accent font-semibold shrink-0">LIVE</span>
            <div className="overflow-x-hidden relative flex-1">
              <div className="flex gap-6 whitespace-nowrap" style={{animation:"scroll-x 30s linear infinite"}}>
                {d.events.slice(0, 8).map((e,i) => (
                  <span key={i} className="text-text3 text-[11px]">
                    {e.type} <span className="text-text2">{shortName(e.name)}</span>
                    <span className="text-text3 ml-2">{new Date(e.time).toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"})}</span>
                    {i < 7 && <span className="text-border mx-3">|</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-6">
        <StatBox label="Blobs" value={fmtN(d.blobCount)} />
        <StatBox label="存储量" value={fmtB(d.totalSize)} accent />
        <StatBox label="活动" value={fmtN(d.activityCount)} />
        <StatBox label="SP 节点" value={`${d.activeSPs}/${d.totalSPs}`} sub="活跃/总" />
        <StatBox label="槽位" value={`${d.activeSlots}/${d.totalSlots}`} sub="活跃/总" />
        <StatBox label="索引器" value={d.status?"在线":"—"} sub={d.status?`v${d.status.lastVersion.toLocaleString()}`:""} accent />
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 mb-5 border-b border-border overflow-x-auto">
        {[
          {key:"sp",label:"SP 节点"},{key:"blobs",label:"Blob 排行"},
          {key:"events",label:"实时事件"},{key:"price",label:"成本对比"},
          {key:"dev",label:"开发者"},
        ].map(t=>(
          <a key={t.key} href={`?tab=${t.key}&sort=${sort}`}
            className={`shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              tab===t.key?"border-accent text-text":"border-transparent text-text3 hover:text-text2"
            }`}>{t.label}</a>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
        <form className="flex-1 flex gap-2">
          <input name="search" defaultValue={search}
            placeholder={tab==="blobs"?"搜索 Blob 名...":"搜索 SP 地址..."}
            className="flex-1 px-3 py-2 text-xs border border-border rounded-lg bg-surface text-text placeholder:text-text3 focus:outline-none focus:border-accent font-mono min-w-0" />
          <input type="hidden" name="tab" value={tab}/>
          <button type="submit" className="shrink-0 px-4 py-2 text-xs font-semibold bg-accent text-white rounded-lg hover:brightness-110 transition-colors">搜索</button>
          {search&&<a href={`?tab=${tab}&sort=${sort}`} className="shrink-0 px-3 py-2 text-xs border border-border rounded-lg text-text3 hover:text-text transition-colors">清除</a>}
        </form>
        <div className="flex gap-1 shrink-0">
          <a href="?tab=sp&sort=active" className={`font-mono text-[10px] px-2 py-1 rounded border transition-colors ${sort==="active"&&!search?"border-accent text-accent bg-accent/5":"border-border text-text3 hover:text-text"}`}>活跃</a>
          <a href="?tab=sp&sort=total" className={`font-mono text-[10px] px-2 py-1 rounded border transition-colors ${sort==="total"&&!search?"border-accent text-accent bg-accent/5":"border-border text-text3 hover:text-text"}`}>总槽</a>
          <a href="/api/export-sp" className="font-mono text-[10px] px-2 py-1 rounded border border-accent/30 text-accent hover:bg-accent/10 transition-colors">CSV</a>
        </div>
      </div>

      {/* Tab Content */}
      {tab==="sp"&&<SPTable nodes={d.nodes} search={search}/>}
      {tab==="blobs"&&<BlobTab topBlobs={d.topBlobs} recentBlobs={d.recentBlobs}/>}
      {tab==="events"&&<EventsTable events={d.events}/>}
      {tab==="price"&&<PriceComparison totalSize={d.totalSize}/>}
      {tab==="dev"&&<DevResources />}

      {tab==="sp"&&d.nodes.length>0&&!search&&(
        <div className="mt-6 p-4 rounded-xl border border-border bg-surface/50 backdrop-blur">
          <h2 className="text-xs font-semibold text-text3 uppercase tracking-wider mb-3">SP 对比 · 活跃槽位</h2>
          <div className="space-y-1.5">
            {d.nodes.slice(0,10).map(sp=>{
              const maxSlots = Math.max(...d.nodes.map(n=>n.activeSlots),1);
              const w = (sp.activeSlots/maxSlots)*100;
              return (
                <div key={sp.address} className="flex items-center gap-2 text-[10px]">
                  <span className="font-mono text-text3 w-16 truncate">{short(sp.address)}</span>
                  <div className="flex-1 h-3 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{width:`${w}%`}}/>
                  </div>
                  <span className="font-mono text-accent font-semibold w-6 text-right">{sp.activeSlots}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {search&&tab==="sp"&&d.nodes.length===0&&<div className="py-12 text-center text-text3 text-sm">未找到 &ldquo;{search}&rdquo;。</div>}

      <p className="font-mono text-[10px] text-text3 mt-10 text-right">ShelbyNet GraphQL · {new Date().toLocaleString("zh-CN")}</p>
    </div>
  );
}

// ── Stat Card ──
function StatBox({label,value,sub,accent}:{label:string;value:string;sub?:string;accent?:boolean}) {
  return (
    <div className="bg-surface/70 backdrop-blur border border-border rounded-xl p-3 sm:p-4 hover:border-border-hover transition-colors">
      <div className={`text-lg sm:text-xl font-extrabold leading-none mb-0.5 ${accent?"text-accent":"text-text"}`}>{value}</div>
      <div className="text-[9px] sm:text-[10px] font-medium text-text3 uppercase tracking-wide">{label}</div>
      {sub&&<div className="text-[9px] sm:text-[10px] text-text3 mt-0.5">{sub}</div>}
    </div>
  );
}

// ── SP Table ──
function SPTable({nodes,search}:{nodes:{address:string;activeSlots:number;totalSlots:number;joiningSlots:number;vacatedSlots:number;lastSeen:number}[],search:string}) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <table className="w-full text-xs">
        <thead><tr className="border-b border-border bg-surface text-left font-mono text-[10px] text-text3 uppercase tracking-wider">
          <th className="py-3 pl-4 pr-2 font-medium">SP 地址</th>
          <th className="py-3 px-2 font-medium text-right">活跃</th>
          <th className="py-3 px-2 font-medium text-right">接入</th>
          <th className="py-3 px-2 font-medium text-right">退出</th>
          <th className="py-3 px-2 font-medium hidden sm:table-cell">活跃率</th>
          <th className="py-3 px-2 font-medium text-right">健康分</th>
          <th className="py-3 pr-4 pl-2 font-medium text-right">最近</th>
        </tr></thead>
        <tbody>
          {nodes.map(sp=>{
            const pct=sp.totalSlots>0?(sp.activeSlots/sp.totalSlots)*100:0;
            // Health score: active ratio (60%) + recency (40%)
            const hoursAgo = sp.lastSeen ? (Date.now() - sp.lastSeen/1000) / 3600000 : 999;
            const recencyScore = Math.max(0, 100 - hoursAgo * 10); // 0 after 10h
            const healthScore = Math.round(pct * 0.6 + recencyScore * 0.4);
            const healthColor = healthScore >= 80 ? "text-green-400" : healthScore >= 50 ? "text-yellow-400" : "text-red-400";
            return (
              <tr key={sp.address} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                <td className="py-2.5 pl-4 pr-2">
                  <Link href={`/tools/sp-explorer/${sp.address}`} className="font-mono text-text2 hover:text-accent transition-colors" title={sp.address}>{short(sp.address)}</Link>
                </td>
                <td className="py-2.5 px-2 font-mono text-green-400 font-semibold text-right">{sp.activeSlots}</td>
                <td className="py-2.5 px-2 font-mono text-yellow-400 text-right">{sp.joiningSlots||"—"}</td>
                <td className="py-2.5 px-2 font-mono text-red-400 text-right">{sp.vacatedSlots||"—"}</td>
                <td className="py-2.5 px-2 hidden sm:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden"><div className="h-full bg-accent rounded-full transition-all" style={{width:`${Math.min(100,pct)}%`}}/></div>
                    <span className="font-mono text-[10px] text-text3 w-8 text-right">{Math.round(pct)}%</span>
                  </div>
                </td>
                <td className="py-2.5 px-2 text-right"><span className={`font-mono text-[10px] font-bold ${healthColor}`}>{healthScore}</span></td>
                <td className="py-2.5 pr-4 pl-2 font-mono text-text3 text-right text-[10px]">{ago(sp.lastSeen)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {search&&nodes.length>0&&<div className="px-4 py-2 text-[10px] text-text3 bg-surface border-t border-border">{nodes.length} 个匹配</div>}
    </div>
  );
}

// ── Blob Tab ──
function BlobTab({topBlobs,recentBlobs}:{topBlobs:{name:string;size:number;owner:string;chunksets:number;created:string}[],recentBlobs:{name:string;size:number;owner:string;chunksets:number;created:string}[]}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-sm font-extrabold mb-3">最新上传 <span className="text-text3 font-normal text-xs">({recentBlobs.length} 条)</span></h2>
        <BlobTable blobs={recentBlobs} showTime/>
      </div>
      <div>
        <h2 className="text-sm font-extrabold mb-3">最大 Blobs <span className="text-text3 font-normal text-xs">({topBlobs.length} 条)</span></h2>
        <BlobTable blobs={topBlobs}/>
      </div>
      <FileStats blobs={topBlobs}/>
    </div>
  );
}

function BlobTable({blobs,showTime}:{blobs:{name:string;size:number;owner:string;chunksets:number;created:string;expires?:string;isDeleted?:boolean;isWritten?:boolean}[],showTime?:boolean}) {
  if(!blobs||blobs.length===0)return<div className="py-12 text-center text-text3 text-sm">暂无数据。</div>;
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <table className="w-full text-xs">
        <thead><tr className="border-b border-border bg-surface text-left font-mono text-[10px] text-text3 uppercase tracking-wider">
          <th className="py-2.5 pl-4 pr-2 font-medium w-8">#</th>
          <th className="py-2.5 px-2 font-medium">文件名</th>
          <th className="py-2.5 px-2 font-medium text-right">大小</th>
          <th className="py-2.5 px-2 font-medium">状态</th>
          <th className="py-2.5 px-2 font-medium hidden sm:table-cell">所有者</th>
          <th className="py-2.5 px-2 font-medium text-right">分片</th>
          {showTime&&<th className="py-2.5 pr-4 pl-2 font-medium text-right">已存</th>}
        </tr></thead>
        <tbody>
          {blobs.map((b,i)=>{
            const deleted = b.isDeleted;
            const written = b.isWritten !== false;
            const expSoon = b.expires && parseInt(b.expires,10) < Date.now()*1000 + 86400_000_000; // 1 day
            let badge, badgeStyle;
            if (deleted) { badge="已删除"; badgeStyle="bg-red-500/10 text-red-400 border-red-500/30"; }
            else if (!written) { badge="写入中"; badgeStyle="bg-yellow-500/10 text-yellow-400 border-yellow-500/30"; }
            else if (expSoon) { badge="即将过期"; badgeStyle="bg-yellow-500/10 text-yellow-400 border-yellow-500/30"; }
            else { badge="活跃"; badgeStyle="bg-green-500/10 text-green-400 border-green-500/30"; }
            return (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                <td className="py-2 pl-4 pr-2 font-mono text-text3">{i+1}</td>
                <td className="py-2 px-2 text-text2 truncate max-w-[180px] sm:max-w-[300px]" title={b.name}>{shortName(b.name)}</td>
                <td className="py-2 px-2 font-mono text-accent font-semibold text-right">{fmtB(b.size)}</td>
                <td className="py-2 px-2"><span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-sm border ${badgeStyle}`}>{badge}</span></td>
                <td className="py-2 px-2 font-mono text-text3 text-[10px] hidden sm:table-cell">
                  <Link href={`/tools/sp-explorer/owner/${b.owner}`} className="hover:text-accent transition-colors">{short(b.owner)}</Link>
                </td>
                <td className="py-2 px-2 font-mono text-text3 text-right">{b.chunksets}</td>
                {showTime&&<td className="py-2 pr-4 pl-2 font-mono text-text3 text-right text-[10px]">{ago(parseInt(b.created,10)/1000)}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function FileStats({blobs}:{blobs:{name:string;size:number}[]}) {
  const types:Record<string,{count:number;size:number}>={};
  for(const b of blobs){
    const ext=b.name.split(".").pop()?.toLowerCase()||"other";
    const cat=/^(mp4|mkv|avi|mov|webm)$/.test(ext)?"🎬 视频":/^(jpg|jpeg|png|gif|webp|svg)$/.test(ext)?"🖼 图片":/^(pdf|doc|docx|txt|md|csv|json|xml)$/.test(ext)?"📄 文档":/^(rar|zip|gz|tar|7z)$/.test(ext)?"📦 压缩包":"📁 其他";
    if(!types[cat])types[cat]={count:0,size:0};
    types[cat].count+=1;types[cat].size+=b.size;
  }
  const sorted=Object.entries(types).sort((a,b)=>b[1].size-a[1].size);
  return (
    <div>
      <h2 className="text-sm font-extrabold mb-3">文件类型分布</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {sorted.map(([cat,s])=>(
          <div key={cat} className="p-3 sm:p-4 rounded-xl border border-border bg-surface/70 backdrop-blur hover:border-border-hover transition-colors">
            <div className="font-bold text-sm mb-1">{cat}</div>
            <div className="font-mono text-xs text-accent">{fmtB(s.size)}</div>
            <div className="text-[10px] text-text3 mt-0.5">{s.count} 个文件</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Events Table ──
function EventsTable({events}:{events:{name:string;owner:string;type:string;time:string;hash?:string}[]}) {
  if(!events||events.length===0)return<div className="py-16 text-center text-text3 text-sm">暂无事件数据。</div>;
  return (
    <div>
      <p className="text-xs text-text2 mb-3">最近 {events.length} 条链上事件。</p>
      <div className="border border-border rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead><tr className="border-b border-border bg-surface text-left font-mono text-[10px] text-text3 uppercase tracking-wider">
            <th className="py-2.5 pl-4 pr-2 font-medium">类型</th>
            <th className="py-2.5 px-2 font-medium">Blob 名称</th>
            <th className="py-2.5 px-2 font-medium hidden sm:table-cell">交易哈希</th>
            <th className="py-2.5 pr-4 pl-2 font-medium text-right">时间</th>
          </tr></thead>
          <tbody>
            {events.map((e,i)=>{
              const c=e.type?.includes("Registered")?"bg-green-500/10 text-green-400 border-green-500/30":e.type?.includes("Written")?"bg-blue-500/10 text-blue-400 border-blue-500/30":"bg-surface2 text-text3 border-border";
              return (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                  <td className="py-2 pl-4 pr-2"><span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm border ${c}`}>{e.type||"事件"}</span></td>
                  <td className="py-2 px-2 text-text2 truncate max-w-[200px] sm:max-w-[350px]" title={e.name}>{shortName(e.name)}</td>
                  <td className="py-2 px-2 hidden sm:table-cell"><span className="font-mono text-[10px] text-text3" title={e.hash}>{e.hash?short(e.hash):"—"}</span></td>
                  <td className="py-2 pr-4 pl-2 font-mono text-text3 text-right text-[10px]">{e.time?new Date(e.time).toLocaleString("zh-CN"):"—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Price Comparison ──
// ── Developer Resources ──
function DevResources() {
  const links = [
    { title: "Shelby 官网", desc: "项目主页", href: "https://shelby.xyz" },
    { title: "开发文档", desc: "SDK、CLI、API 参考", href: "https://docs.shelby.xyz" },
    { title: "GitHub", desc: "示例代码和 SDK 源码", href: "https://github.com/shelby/examples" },
    { title: "Early Access", desc: "申请开发者权限", href: "https://developers.shelby.xyz" },
    { title: "Discord", desc: "官方社区讨论", href: "https://discord.gg/shelbyserves" },
    { title: "X / Twitter", desc: "@shelbyserves", href: "https://x.com/shelbyserves" },
  ];
  const pkgs = [
    { name: "@shelby-protocol/sdk", desc: "TypeScript SDK", cmd: "npm install @shelby-protocol/sdk" },
    { name: "@shelby-protocol/cli", desc: "命令行工具", cmd: "npm install -g @shelby-protocol/cli" },
    { name: "shelby-mcp", desc: "AI Agent MCP Server", cmd: "npx shelbymcp" },
    { name: "x402s", desc: "x402 支付桥接", cmd: "npm install x402s" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-sm font-extrabold mb-4">开发者资源</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {links.map(l => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
              className="p-4 rounded-xl border border-border bg-surface/70 backdrop-blur hover:border-accent/30 hover:bg-surface transition-all group">
              <h3 className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">{l.title}</h3>
              <p className="text-xs text-text3">{l.desc}</p>
            </a>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-extrabold mb-4">SDK 安装</h2>
        <div className="space-y-2">
          {pkgs.map(p => (
            <div key={p.name} className="p-4 rounded-xl border border-border bg-surface/70 backdrop-blur flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono text-xs text-accent font-semibold">{p.name}</span>
                <span className="text-xs text-text3 ml-2">{p.desc}</span>
              </div>
              <code className="font-mono text-[11px] text-text2 bg-surface2 px-3 py-1 rounded select-all">{p.cmd}</code>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl border border-border bg-surface/70 backdrop-blur space-y-3">
        <div>
          <h2 className="text-sm font-extrabold mb-2">REST API</h2>
          <p className="text-xs text-text2 mb-2">程序化访问网络数据：</p>
          <code className="font-mono text-[11px] text-accent bg-surface2 px-3 py-1.5 rounded select-all block">
            GET /api/network-stats
          </code>
          <a href="/api/network-stats" target="_blank" className="font-mono text-[10px] text-text3 hover:text-accent transition-colors mt-1 inline-block">打开测试 →</a>
        </div>
        <div className="pt-3 border-t border-border">
          <h2 className="text-sm font-extrabold mb-2">关于 ShelbyNet</h2>
        <p className="text-xs text-text2 leading-relaxed">
          ShelbyNet 是 Shelby 协议的公共测试网，由 Aptos Labs 和 Jump Crypto 维护。
          Data Plane 运行在 DoubleZero 光纤骨干上，Control Plane 由 Aptos 区块链提供结算和验证。
          测试网数据不具持久性保证——主网上线后可能重置。
        </p>
        </div>
      </div>
    </div>
  );
}

// ── Price Comparison ──
function PriceComparison({totalSize}:{totalSize:number}) {
  const gb=totalSize>0?totalSize/(1024**3):0;
  const shelbyCost=gb*0.01,awsCost=gb*0.073;
  const savings=awsCost>0?Math.round((1-shelbyCost/awsCost)*100):70;
  return (
    <div>
      <p className="text-xs text-text2 mb-4">基于网络 {fmtB(totalSize)} 数据的实时成本估算。实际费用取决于读取频率。</p>
      <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="p-4 sm:p-5 rounded-xl border border-border bg-surface/70 backdrop-blur text-center">
          <div className="text-text3 text-xs mb-1">AWS S3</div>
          <div className="font-mono text-xl sm:text-2xl font-extrabold text-red-400">${awsCost.toFixed(2)}</div>
          <div className="text-[10px] text-text3 mt-1">$0.023/GB + $0.05/GB</div>
        </div>
        <div className="p-4 sm:p-5 rounded-xl border border-border bg-surface/70 backdrop-blur text-center">
          <div className="text-text3 text-xs mb-1">Shelby</div>
          <div className="font-mono text-xl sm:text-2xl font-extrabold text-green-400">${shelbyCost.toFixed(2)}</div>
          <div className="text-[10px] text-text3 mt-1">$0.01/GB 写 + $0.014/GB 读</div>
        </div>
        <div className="p-4 sm:p-5 rounded-xl border border-accent/30 bg-accent/5 backdrop-blur text-center">
          <div className="text-text3 text-xs mb-1">节省</div>
          <div className="font-mono text-xl sm:text-2xl font-extrabold text-accent">~{savings}%</div>
          <div className="text-[10px] text-text3 mt-1">vs AWS 总成本</div>
        </div>
      </div>
      <a href="/tools/sp-calculator" className="font-mono text-xs text-accent hover:underline">SP 收益计算器 →</a>
    </div>
  );
}
