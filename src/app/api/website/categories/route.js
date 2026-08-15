import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/categories
 *  → backend: category/v1/list
 *  Returns { success: true, total: X, result: [...] }
 */
export async function GET() {
  return proxyBackendGet("category/v1/list", null, { next: { revalidate: 60 } });
}
