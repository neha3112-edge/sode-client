import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      slug,
      title,
      page_url,
      pathname,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      gclid,
      referrer,
    } = body || {};

    if (!slug) {
      return NextResponse.json({ success: false, message: "Slug is required" }, { status: 400 });
    }

    const remoteBackend =
      process.env.NEXT_PUBLIC_REMOTE_BACKEND_SERVER || "https://api.crm.mysode.com";
    const localBackend =
      process.env.NEXT_PUBLIC_LOCAL_BACKEND_SERVER || "http://localhost:3000";
    const backendBase =
      process.env.NEXT_PUBLIC_DEV_REMOTE === "local" ? localBackend : remoteBackend;

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
    const userAgent = req.headers.get("user-agent") || "";

    // Forward click session to CRM backend asynchronously
    fetch(`${backendBase.replace(/\/+$/, "")}/api/tracking/whatsapp-click`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        title,
        page_url,
        // If pathname is blank, extract from page_url as fallback
        pathname: pathname || (page_url ? (() => { try { return new URL(page_url).pathname; } catch { return ''; } })() : ''),
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        gclid,
        referrer,
        ip,
        userAgent,
      }),
    }).catch((err) => {
      // Non-blocking catch
      console.warn("⚠️ [ClickTracker Proxy Warning]:", err.message);
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
