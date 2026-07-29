import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/blogs
 *  → backend: blog/list
 */
export async function GET() {
  return proxyBackendGet("blog/list", null, { next: { revalidate: 300 } });
}
