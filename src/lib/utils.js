"use strict";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mediaMap from "@/constants/mediaMap.json";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves an image/asset path to the correct URL.
 * Supports both string URLs and populated Media objects ({ _id, url, name }).
 */
export function getAssetPath(path = "") {
  if (!path) return "";
  let targetPath = path;

  if (typeof path === "object" && path !== null) {
    targetPath = path?.url || path?.src || path?.path || "";
  }

  if (typeof targetPath !== "string") return "";
  targetPath = targetPath.trim();
  if (!targetPath) return "";

  // 1. Convert MinIO internal URLs to same-domain proxy path
  if (targetPath.startsWith("http://172.236.183.64:9000/")) {
    return targetPath.replace("http://172.236.183.64:9000/", "/media/");
  }

  // 2. Any other external http/https URL → pass through as-is
  if (targetPath.startsWith("http://") || targetPath.startsWith("https://")) return targetPath;

  // 3. Local asset path → look up in mediaMap and convert to MinIO proxy
  const lookup = targetPath.toLowerCase();
  if (mediaMap[targetPath]) {
    const minioUrl = mediaMap[targetPath];
    return minioUrl.replace("http://172.236.183.64:9000/", "/media/");
  }
  if (mediaMap[lookup]) {
    const minioUrl = mediaMap[lookup];
    return minioUrl.replace("http://172.236.183.64:9000/", "/media/");
  }

  // 4. Fallback: return path unchanged (serves from Next.js public folder)
  if (targetPath.startsWith("/")) return targetPath;
  return `/${targetPath}`;
}
