import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/universities/compare?universityid=id1,id2
 *  → backend: universities/v1/compare?universityid=<ids>
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  return proxyBackendGet("universities/v1/compare", searchParams, { cache: "no-store" });
}
