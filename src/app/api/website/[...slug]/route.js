import { NextResponse } from "next/server";
import { API_BASE_URL, getFetchCacheOptions } from "@/config";

export async function GET(req, { params }) {
  try {
    const { slug } = await params;
    const path = slug.map((segment) => encodeURIComponent(segment)).join("/");
    const searchParams = req.nextUrl?.searchParams?.toString() || "";
    const base = API_BASE_URL.replace(/\/+$/, "");
    const targetUrl = `${base}/${path}${searchParams ? `?${searchParams}` : ""}`;

    const res = await fetch(targetUrl, getFetchCacheOptions(300, slug?.[0] || "website-api"));
    if (!res.ok) {
      return NextResponse.json({ success: false, message: "Backend error" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
