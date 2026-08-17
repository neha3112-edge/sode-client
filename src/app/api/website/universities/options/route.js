import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/universities/options?search=...
 *  → backend: universities/v1/options
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  return proxyBackendGet("universities/v1/options", searchParams, { cache: "no-store" });
}
