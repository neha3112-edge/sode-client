import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/options/courses     → courses/website-options */
export async function GET() {
  return proxyBackendGet("courses/website-options", null, { next: { revalidate: 300 } });
}
