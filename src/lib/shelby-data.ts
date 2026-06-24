"use server";

import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const SHELBY_DEPLOYER = "0x85fdb9a176ab8ef1d9d9c1b60d60b3924f0800ac1de1cc2085fb0b8bb4988e6a";

interface SPInfo {
  address: string;
  ipAddress: string;
  port: string;
  availabilityZone: string;
  state: {
    variant: string;
    quota?: string;
    faulty?: boolean;
    leaving?: boolean;
    frozenReason?: string;
    frozenFrom?: string;
    frozenTill?: string;
  };
}

export interface SPNode {
  address: string;
  ipAddress: string;
  availabilityZone: string;
  status: string;
  quota: string;
  quotaBytes: number;
  faulty: boolean;
  leaving: boolean;
}

interface NetworkStats {
  totalSPs: number;
  activeSPs: number;
  waitlistedSPs: number;
  frozenSPs: number;
  totalQuotaBytes: number;
}

interface ShelbyDataResult {
  nodes: SPNode[];
  stats: NetworkStats;
  error: string | null;
}

export async function getShelbySPData(): Promise<ShelbyDataResult> {
  try {
    const config = new AptosConfig({ network: Network.SHELBYNET });
    const aptos = new Aptos(config);

    const raw = await aptos.view<[SPInfo[]]>({
      payload: {
        function: `${SHELBY_DEPLOYER}::storage_provider_registry::get_all_storage_providers`,
      },
    });

    const spList = Array.isArray(raw) ? (raw[0] as unknown as SPInfo[]) : [];
    if (!Array.isArray(spList)) {
      return { nodes: [], stats: emptyStats(), error: null };
    }

    const nodes: SPNode[] = spList.map((sp) => {
      let quotaStr = "0";
      if (sp.state.variant === "Active" && sp.state.quota) {
        quotaStr = sp.state.quota;
      }
      const quotaBytes = parseInt(quotaStr, 10) || 0;

      return {
        address: sp.address,
        ipAddress: sp.ipAddress ?? "—",
        availabilityZone: sp.availabilityZone ?? "—",
        status: sp.state.variant.toLowerCase(),
        quota: quotaStr,
        quotaBytes,
        faulty: sp.state.faulty ?? false,
        leaving: sp.state.leaving ?? false,
      };
    });

    nodes.sort((a, b) => b.quotaBytes - a.quotaBytes);

    const stats: NetworkStats = {
      totalSPs: nodes.length,
      activeSPs: nodes.filter(n => n.status === "active").length,
      waitlistedSPs: nodes.filter(n => n.status === "waitlisted").length,
      frozenSPs: nodes.filter(n => n.status === "frozen").length,
      totalQuotaBytes: nodes.reduce((sum, n) => sum + n.quotaBytes, 0),
    };

    return { nodes, stats, error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "未知错误";
    return { nodes: [], stats: emptyStats(), error: `无法查询链上数据: ${msg}` };
  }
}

function emptyStats(): NetworkStats {
  return { totalSPs: 0, activeSPs: 0, waitlistedSPs: 0, frozenSPs: 0, totalQuotaBytes: 0 };
}
