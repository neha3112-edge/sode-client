import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/blogs
 *  → backend: blogs/v1/list
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.toString();
  const endpoint = query ? `blogs/v1/list?${query}` : "blogs/v1/list";
  return proxyBackendGet(endpoint, null, { next: { revalidate: 60 } });
}
