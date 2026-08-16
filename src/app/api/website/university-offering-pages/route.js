import { proxyBackendGet } from "@/lib/backendProxy";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "";
  const endpoint = slug
    ? `university-offering-pages/v1/list/${encodeURIComponent(slug)}`
    : `university-offering-pages/v1/list`;
  return proxyBackendGet(endpoint, searchParams, { cache: "no-store" });
}
