import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get("refresh") || "";

    const apiUrl = `${process.env.API_URL || "http://127.0.0.1:3000"}/api/university-pages/v1/list/${slug}?refresh=${refresh}`;

    const res = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { success: false, message: errorData.message || "Failed to fetch university page" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API proxy error for university-pages/[slug]:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
