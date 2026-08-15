import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/hero?page=home
 *  → backend: hero/website-read?page=<page>
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (!searchParams.has("page")) searchParams.set("page", "home");
  return proxyBackendGet("hero/website-read", searchParams, { next: { revalidate: 300 } });
}
