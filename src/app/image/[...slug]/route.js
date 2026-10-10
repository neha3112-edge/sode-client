import { NextResponse } from "next/server";
import { resolveMediaMapping } from "@/lib/utils";
import mediaMap from "@/constants/mediaMap.json";

const MINIO_PUBLIC_URL = (
  process.env.NEXT_PUBLIC_MINIO_URL || "https://new.crm.api.mysode.com/minio"
).replace(/\/+$/, "");

export async function GET(request, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    const slugArray = resolvedParams?.slug || [];

    if (!slugArray || slugArray.length === 0) {
      return new NextResponse("File Not Found", { status: 404 });
    }

    const fullPath = slugArray.map((s) => decodeURIComponent(s)).join("/");
    const filename = decodeURIComponent(slugArray[slugArray.length - 1]);

    // Check query params for explicit src fallback (?src=... or ?u=...)
    const { searchParams } = new URL(request.url);
    const explicitSrc = searchParams.get("src") || searchParams.get("u");

    let minioTargetUrl = null;

    if (explicitSrc) {
      minioTargetUrl = explicitSrc.startsWith("http")
        ? explicitSrc
        : `${MINIO_PUBLIC_URL}/${explicitSrc.replace(/^\/+/, "")}`;
    }

    // 1. Check if slugArray has an embedded MinIO path followed by a friendly SEO filename
    // e.g. /image/crm-media/2026/09/21/hash.webp/Hero-Slide-1.webp
    // or /image/images/2026/08/11/hash.webp/sode-logo.webp
    if (!minioTargetUrl && slugArray.length >= 2) {
      for (let i = 0; i < slugArray.length - 1; i++) {
        const seg = slugArray[i];
        if (
          /\.(webp|png|jpe?g|svg|pdf|ico|gif)$/i.test(seg) ||
          /^[a-f0-9]{32}$/i.test(seg)
        ) {
          const subPath = slugArray.slice(0, i + 1).join("/");
          const finalSubPath = subPath.includes(".")
            ? subPath
            : `${subPath}.${filename.split(".").pop()}`;
          minioTargetUrl = `${MINIO_PUBLIC_URL}/${finalSubPath}`;
          break;
        }
      }
    }

    // 2. Direct MinIO path: /image/crm-media/... or /image/images/...
    if (!minioTargetUrl) {
      if (
        fullPath.startsWith("crm-media/") ||
        fullPath.startsWith("images/") ||
        fullPath.startsWith("uploads/")
      ) {
        minioTargetUrl = `${MINIO_PUBLIC_URL}/${fullPath}`;
      }
    }

    // 3. Resolve MinIO URL from in-memory registry or static mediaMap
    if (!minioTargetUrl) {
      minioTargetUrl =
        resolveMediaMapping(filename) ||
        resolveMediaMapping(fullPath) ||
        mediaMap[filename] ||
        mediaMap[filename.toLowerCase()] ||
        mediaMap[fullPath] ||
        mediaMap[fullPath.toLowerCase()] ||
        mediaMap[`/assets/images/${filename}`] ||
        mediaMap[`/assets/pdf/${filename}`];
    }

    // 4. Fallback: search values in mediaMap that end with this filename
    if (!minioTargetUrl) {
      const lowerName = filename.toLowerCase();
      for (const [key, val] of Object.entries(mediaMap)) {
        if (typeof val === "string" && val.toLowerCase().endsWith(lowerName)) {
          minioTargetUrl = val;
          break;
        }
      }
    }

    // 5. Last fallback: try direct MinIO URL with fullPath
    if (!minioTargetUrl) {
      minioTargetUrl = `${MINIO_PUBLIC_URL}/${fullPath}`;
    }

    if (minioTargetUrl.startsWith("//")) {
      minioTargetUrl = `https:${minioTargetUrl}`;
    }

    const res = await fetch(minioTargetUrl, {
      cache: "force-cache",
      next: { revalidate: 86400 * 30 },
    });

    if (!res.ok) {
      return new NextResponse("File Not Found", { status: res.status });
    }

    let contentType = res.headers.get("content-type");
    const lowerFile = filename.toLowerCase();
    if (!contentType || contentType === "application/octet-stream") {
      if (lowerFile.endsWith(".pdf")) contentType = "application/pdf";
      else if (lowerFile.endsWith(".webp")) contentType = "image/webp";
      else if (lowerFile.endsWith(".png")) contentType = "image/png";
      else if (lowerFile.endsWith(".jpg") || lowerFile.endsWith(".jpeg")) contentType = "image/jpeg";
      else if (lowerFile.endsWith(".svg")) contentType = "image/svg+xml";
      else if (lowerFile.endsWith(".ico")) contentType = "image/x-icon";
      else if (lowerFile.endsWith(".gif")) contentType = "image/gif";
      else contentType = "application/octet-stream";
    }

    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(filename)}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      },
    });
  } catch (err) {
    console.error("[Image/PDF Route Error]:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
