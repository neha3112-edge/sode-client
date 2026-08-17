import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/modes/options?search=...
 *  → backend: modeinfo/v1/options
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  return proxyBackendGet("modeinfo/v1/options", searchParams, { cache: "no-store" });
}
