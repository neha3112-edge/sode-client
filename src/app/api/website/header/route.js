import { NextResponse } from "next/server";
import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/header
 *  → backend: header/website-list
 *  Revalidated every 60s (nav rarely changes)
 */
export async function GET() {
  return proxyBackendGet("header/website-list", null, { next: { revalidate: 60 } });
}
