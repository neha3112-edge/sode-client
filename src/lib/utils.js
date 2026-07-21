"use strict";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mediaMap from "@/constants/mediaMap.json";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const DEFAULT_SVG_LOGO =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230f172a'/><path d='M50 22L18 38L50 54L82 38L50 22Z' fill='%233b82f6'/><path d='M30 46.5V64C30 68 39 74 50 74C61 74 70 68 70 64V46.5L50 56.5L30 46.5Z' fill='%2360a5fa'/></svg>";

/**
 * Resolves an image/asset path to the correct URL from backend Media or MinIO.
 * Supports string URLs and populated Media objects ({ _id, url, name }).
 */
export function getAssetPath(path = "", fallback = DEFAULT_SVG_LOGO) {
  if (!path) return fallback;
  let targetPath = path;

  if (typeof path === "object" && path !== null) {
    targetPath = path?.url || path?.src || path?.path || "";
  }

  if (typeof targetPath !== "string") return fallback;
  targetPath = targetPath.trim();
  if (!targetPath) return fallback;

  // 1. Convert MinIO internal URLs to same-domain proxy path (/media/...)
  if (targetPath.startsWith("http://172.236.183.64:9000/")) {
    return targetPath.replace("http://172.236.183.64:9000/", "/media/");
  }

  // 2. Any other external http/https URL → pass through as-is
  if (targetPath.startsWith("http://") || targetPath.startsWith("https://")) return targetPath;

  // 3. Data URIs → pass through as-is
  if (targetPath.startsWith("data:image")) return targetPath;

  // 4. Local asset path string → look up in mediaMap and convert to MinIO proxy
  const lookup = targetPath.toLowerCase();
  if (mediaMap[targetPath]) {
    const minioUrl = mediaMap[targetPath];
    return minioUrl.replace("http://172.236.183.64:9000/", "/media/");
  }
  if (mediaMap[lookup]) {
    const minioUrl = mediaMap[lookup];
    return minioUrl.replace("http://172.236.183.64:9000/", "/media/");
  }

  // 5. If path starts with /media/, return as-is
  if (targetPath.startsWith("/media/")) return targetPath;

  // 6. Safe fallback for unmapped static strings
  return fallback;
}
