"use server";

const ENDPOINT = "https://api.shelbynet.aptoslabs.com/nocode/v1/public/alias/shelby/shelbynet/v1/graphql";

function getApiKey(): string {
  if (process.env.SHELBY_API_KEY) return process.env.SHELBY_API_KEY;
  if (process.env.NEXT_PUBLIC_SHELBY_API_KEY) return process.env.NEXT_PUBLIC_SHELBY_API_KEY;
  return "";
}

function headers(): Record<string, string> {
  const key = getApiKey();
  if (!key) return { "Content-Type": "application/json" };
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${key}`,
  };
}

interface SlotRow {
  storage_provider: string;
  status: "active" | "joining" | "vacated";
  slot_index: number;
  placement_group: string;
  updated_at: number;
}

interface AggregateResult {
  aggregate: { count: number; sum?: { size?: string } };
}

export interface SPNode {
  address: string;
  activeSlots: number;
  totalSlots: number;
  joiningSlots: number;
  vacatedSlots: number;
  lastSeen: number;
}

export interface ShelbyNetworkData {
  nodes: SPNode[];
  totalSPs: number;
  activeSPs: number;
  totalSlots: number;
  activeSlots: number;
  blobCount: number;
  totalSize: number;
  activityCount: number;
  error: string | null;
}

export async function getShelbyData(): Promise<ShelbyNetworkData> {
  const query = `
    query NetworkOverview {
      placement_group_slots(order_by: { updated_at: desc }, limit: 2000) {
        storage_provider
        status
        slot_index
        placement_group
        updated_at
      }
      blobs_aggregate {
        aggregate { count sum { size } }
      }
      blob_activities_aggregate {
        aggregate { count }
      }
    }
  `;

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const text = await res.text();
      return emptyResult(`GraphQL 返回错误 (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = await res.json();

    if (json.errors) {
      return emptyResult(`GraphQL 错误: ${json.errors[0]?.message ?? "未知错误"}`);
    }

    const slots: SlotRow[] = json?.data?.placement_group_slots ?? [];
    const blobsAgg: AggregateResult = json?.data?.blobs_aggregate ?? { aggregate: { count: 0 } };
    const activitiesAgg: AggregateResult = json?.data?.blob_activities_aggregate ?? { aggregate: { count: 0 } };

    // Aggregate by SP
    const spMap = new Map<string, SPNode>();
    for (const s of slots) {
      const existing = spMap.get(s.storage_provider);
      if (existing) {
        existing.totalSlots += 1;
        if (s.status === "active") existing.activeSlots += 1;
        if (s.status === "joining") existing.joiningSlots += 1;
        if (s.status === "vacated") existing.vacatedSlots += 1;
        if (s.updated_at > existing.lastSeen) existing.lastSeen = s.updated_at;
      } else {
        spMap.set(s.storage_provider, {
          address: s.storage_provider,
          totalSlots: 1,
          activeSlots: s.status === "active" ? 1 : 0,
          joiningSlots: s.status === "joining" ? 1 : 0,
          vacatedSlots: s.status === "vacated" ? 1 : 0,
          lastSeen: s.updated_at,
        });
      }
    }

    const nodes = Array.from(spMap.values()).sort((a, b) => b.activeSlots - a.activeSlots);
    const activeNodes = nodes.filter(n => n.activeSlots > 0);

    return {
      nodes,
      totalSPs: nodes.length,
      activeSPs: activeNodes.length,
      totalSlots: slots.length,
      activeSlots: slots.filter(s => s.status === "active").length,
      blobCount: blobsAgg.aggregate?.count ?? 0,
      totalSize: parseInt(blobsAgg.aggregate?.sum?.size ?? "0", 10) || 0,
      activityCount: activitiesAgg.aggregate?.count ?? 0,
      error: null,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "未知错误";
    return emptyResult(`无法连接 ShelbyNet: ${msg}`);
  }
}

function emptyResult(error: string): ShelbyNetworkData {
  return {
    nodes: [], totalSPs: 0, activeSPs: 0, totalSlots: 0, activeSlots: 0,
    blobCount: 0, totalSize: 0, activityCount: 0, error,
  };
}
