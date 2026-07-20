"use strict";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mediaMap from "@/constants/mediaMap.json";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves an image/asset path to the correct URL.
 *
 * Priority:
 * 1. If already a MinIO URL → convert to /media/... proxy path (SEO-friendly same domain)
 * 2. If a local /assets/* path → look up in mediaMap.json and return MinIO proxy URL
 * 3. If other http/https → pass through
 * 4. Otherwise → return as-is (local public folder path)
 */
export function getAssetPath(path = "") {
  if (!path) return "";

  // 1. Convert MinIO internal URLs to same-domain proxy path
  if (path.startsWith("http://172.236.183.64:9000/")) {
    return path.replace("http://172.236.183.64:9000/", "/media/");
  }

  // 2. Any other external http/https URL → pass through as-is
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  // 3. Local asset path → look up in mediaMap and convert to MinIO proxy
  const lookup = path.toLowerCase();
  if (mediaMap[path]) {
    const minioUrl = mediaMap[path];
    return minioUrl.replace("http://172.236.183.64:9000/", "/media/");
  }
  if (mediaMap[lookup]) {
    const minioUrl = mediaMap[lookup];
    return minioUrl.replace("http://172.236.183.64:9000/", "/media/");
  }

  // 4. Fallback: return path unchanged (serves from Next.js public folder)
  if (path.startsWith("/")) return path;
  return `/${path}`;
}
