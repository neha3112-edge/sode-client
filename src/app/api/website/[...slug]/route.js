import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/config";

export async function GET(req, { params }) {
  try {
    const { slug } = await params;
    const path = slug.map((segment) => encodeURIComponent(segment)).join("/");
    const searchParams = req.nextUrl?.searchParams?.toString() || "";
    const base = API_BASE_URL.replace(/\/+$/, "");
    const targetUrl = `${base}/${path}${searchParams ? `?${searchParams}` : ""}`;

    const res = await fetch(targetUrl, { next: { revalidate: 300 } });
    if (!res.ok) {
      return NextResponse.json({ success: false, message: "Backend error" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
