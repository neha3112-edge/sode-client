import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/options/durations     → durations/website-options */
export async function GET() {
  return proxyBackendGet("durations/website-options", null, { next: { revalidate: 600 } });
}
