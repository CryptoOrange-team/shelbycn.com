"use server";

const ENDPOINT = "https://api.shelbynet.aptoslabs.com/nocode/v1/public/alias/shelby/shelbynet/v1/graphql";

function getKey(): string {
  return process.env.SHELBY_API_KEY ?? process.env.NEXT_PUBLIC_SHELBY_API_KEY ?? "";
}

function gqlHeaders(): Record<string, string> {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  const key = getKey();
  if (key) h["Authorization"] = `Bearer ${key}`;
  return h;
}

async function gqlFetch(query: string, variables?: Record<string, unknown>) {
  if (!getKey()) throw new Error("API key not configured");
  const res = await fetch(ENDPOINT, {
    method: "POST", headers: gqlHeaders(),
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 120 },
  });
  if (!res.ok) throw new Error(`GraphQL ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message ?? "GraphQL error");
  return json.data;
}

// ── Types ──

interface SlotRow {
  storage_provider: string;
  status: "active" | "joining" | "vacated";
  slot_index: number;
  placement_group: string;
  updated_at: number;
}

export interface SPNode {
  address: string;
  activeSlots: number;
  totalSlots: number;
  joiningSlots: number;
  vacatedSlots: number;
  lastSeen: number;
}

export interface BlobActivity {
  blob_id: string;
  storage_provider: string;
  activity_type: string;
  size: number;
  created_at: number;
}

export interface SPDetail extends SPNode {
  slots: { placement_group: string; slot_index: number; status: string; updated_at: number }[];
  recentActivity: BlobActivity[];
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
  recentActivity: BlobActivity[];
  error: string | null;
}

// ── Queries ──

export async function getShelbyData(): Promise<ShelbyNetworkData> {
  const query = `
    query NetworkOverview($limit: Int!) {
      placement_group_slots(order_by: { updated_at: desc }, limit: 2000) { storage_provider status slot_index placement_group updated_at }
      blobs_aggregate { aggregate { count sum { size } } }
      blob_activities_aggregate { aggregate { count } }
      blob_activities(order_by: { created_at: desc }, limit: $limit) { blob_id storage_provider activity_type size created_at }
    }
  `;

  try {
    const data = await gqlFetch(query, { limit: 20 });

    const slots: SlotRow[] = data.placement_group_slots ?? [];
    const activities: BlobActivity[] = data.blob_activities ?? [];

    // Aggregate SP nodes
    const spMap = new Map<string, SPNode>();
    for (const s of slots) {
      const existing = spMap.get(s.storage_provider);
      if (existing) {
        existing.totalSlots += 1;
        if (s.status === "active") existing.activeSlots += 1;
        else if (s.status === "joining") existing.joiningSlots += 1;
        else if (s.status === "vacated") existing.vacatedSlots += 1;
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

    return {
      nodes,
      totalSPs: nodes.length,
      activeSPs: nodes.filter(n => n.activeSlots > 0).length,
      totalSlots: slots.length,
      activeSlots: slots.filter(s => s.status === "active").length,
      blobCount: data.blobs_aggregate?.aggregate?.count ?? 0,
      totalSize: parseInt(data.blobs_aggregate?.aggregate?.sum?.size ?? "0", 10) || 0,
      activityCount: data.blob_activities_aggregate?.aggregate?.count ?? 0,
      recentActivity: activities,
      error: null,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "未知错误";
    return { nodes: [], totalSPs: 0, activeSPs: 0, totalSlots: 0, activeSlots: 0, blobCount: 0, totalSize: 0, activityCount: 0, recentActivity: [], error: msg };
  }
}

export async function getSPDetail(address: string): Promise<SPDetail | null> {
  const query = `
    query SPDetail($addr: String!) {
      placement_group_slots(where: { storage_provider: { _eq: $addr } }, order_by: { updated_at: desc }, limit: 200) { placement_group slot_index status updated_at }
      blob_activities(where: { storage_provider: { _eq: $addr } }, order_by: { created_at: desc }, limit: 20) { blob_id activity_type size created_at }
    }
  `;

  try {
    const data = await gqlFetch(query, { addr: address });
    const slots = data.placement_group_slots ?? [];
    const activities = data.blob_activities ?? [];

    return {
      address,
      totalSlots: slots.length,
      activeSlots: slots.filter((s: SlotRow) => s.status === "active").length,
      joiningSlots: slots.filter((s: SlotRow) => s.status === "joining").length,
      vacatedSlots: slots.filter((s: SlotRow) => s.status === "vacated").length,
      lastSeen: slots.length > 0 ? Math.max(...slots.map((s: SlotRow) => s.updated_at)) : 0,
      slots: slots.map((s: SlotRow) => ({ placement_group: s.placement_group, slot_index: s.slot_index, status: s.status, updated_at: s.updated_at })),
      recentActivity: activities,
    };
  } catch {
    return null;
  }
}
