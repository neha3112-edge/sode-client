import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/options/fees     → fees/website-options */
export async function GET() {
  return proxyBackendGet("fees/website-options", null, { next: { revalidate: 600 } });
}
