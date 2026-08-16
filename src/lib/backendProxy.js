/**
 * Shared backend URL resolver for all Next.js /api/website/* route handlers.
 */
import { NextResponse } from "next/server";

const isProduction = process.env.NODE_ENV === "production";
const isRemote = process.env.NEXT_PUBLIC_DEV_REMOTE === "remote" || isProduction;

export const BACKEND_ORIGIN = isRemote
  ? (process.env.NEXT_PUBLIC_REMOTE_BACKEND_SERVER || process.env.API_URL || "https://new.crm.api.mysode.com")
  : (process.env.NEXT_PUBLIC_LOCAL_BACKEND_SERVER || "http://localhost:3000");

export const BACKEND_API = `${BACKEND_ORIGIN}/api`;

/**
 * Proxy a GET request to the backend and return a NextResponse.
 * @param {string} backendPath - e.g. "course/website-list"
 * @param {URLSearchParams|null} qs - query params to forward
 * @param {object} fetchOptions  - e.g. { next: { revalidate: 60 } } or { cache: "no-store" }
 */
export async function proxyBackendGet(backendPath, qs = null, fetchOptions = { cache: "no-store" }) {
  const queryStr = qs && qs.toString() ? `?${qs}` : "";
  const primaryUrl = `${BACKEND_API}/${backendPath}${queryStr}`;

  try {
    const res = await fetch(primaryUrl, fetchOptions);
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    }
  } catch (err) {
    // Primary failed, will try fallback below
  }

  // Fallback to local if remote was attempted or vice-versa
  const fallbackOrigin = BACKEND_ORIGIN.includes("localhost")
    ? "https://new.crm.api.mysode.com"
    : "http://localhost:3000";
  const fallbackUrl = `${fallbackOrigin}/api/${backendPath}${queryStr}`;

  try {
    const fallbackRes = await fetch(fallbackUrl, fetchOptions);
    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      return NextResponse.json(data, { status: fallbackRes.status });
    }
    return NextResponse.json({ success: false, message: `Backend responded with ${fallbackRes.status}` }, { status: fallbackRes.status });
  } catch (err) {
    console.error(`[proxy fallback error] ${backendPath}:`, err.message);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
