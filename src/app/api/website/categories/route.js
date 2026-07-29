import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/categories
 *  → backend: category/website-list
 *  Returns { success, result: { categories, tree } }
 */
export async function GET() {
  return proxyBackendGet("category/website-list", null, { next: { revalidate: 60 } });
}
