import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/options/categories     → categories/website-options */
export async function GET() {
  return proxyBackendGet("categories/website-options", null, { next: { revalidate: 300 } });
}
