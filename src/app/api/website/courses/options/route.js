import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/courses/options?search=...
 *  → backend: courses/v1/options
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  return proxyBackendGet("courses/v1/options", searchParams, { cache: "no-store" });
}
