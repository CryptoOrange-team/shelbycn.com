import { NextResponse } from "next/server";
import { getShelbyData } from "@/lib/shelby-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getShelbyData();

  const header = "address,active_slots,total_slots,joining_slots,vacated_slots\n";
  const rows = data.nodes
    .map(sp => `${sp.address},${sp.activeSlots},${sp.totalSlots},${sp.joiningSlots},${sp.vacatedSlots}`)
    .join("\n");

  const csv = header + rows;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="shelby-sp-nodes-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
