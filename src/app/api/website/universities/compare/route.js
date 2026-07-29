import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/universities/compare?slugs=slug1,slug2
 *  → backend: partneruniversities/compare?slugs=<slugs>
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  return proxyBackendGet("partneruniversities/compare", searchParams, { cache: "no-store" });
}
