/**
 * Shared backend URL resolver for all Next.js /api/website/* route handlers.
 */
import { NextResponse } from "next/server";

const isRemote = process.env.NEXT_PUBLIC_DEV_REMOTE === "remote";

export const BACKEND_ORIGIN = isRemote
  ? (process.env.NEXT_PUBLIC_REMOTE_BACKEND_SERVER || "https://sode.api.mysode.com")
  : (process.env.NEXT_PUBLIC_LOCAL_BACKEND_SERVER || "http://localhost:5001");

export const BACKEND_API = `${BACKEND_ORIGIN}/api`;

/**
 * Proxy a GET request to the backend and return a NextResponse.
 * @param {string} backendPath - e.g. "course/website-list"
 * @param {URLSearchParams|null} qs - query params to forward
 * @param {object} fetchOptions  - e.g. { next: { revalidate: 60 } } or { cache: "no-store" }
 */
export async function proxyBackendGet(backendPath, qs = null, fetchOptions = { cache: "no-store" }) {
  const url = `${BACKEND_API}/${backendPath}${qs && qs.toString() ? `?${qs}` : ""}`;
  try {
    const res = await fetch(url, fetchOptions);
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, message: `Non-JSON from backend (${res.status})` },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error(`[proxy] ${backendPath}:`, err.message);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
