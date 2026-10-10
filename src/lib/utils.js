"use strict";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mediaMap from "@/constants/mediaMap.json";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const DEFAULT_SVG_LOGO =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230f172a'/><path d='M50 22L18 38L50 54L82 38L50 22Z' fill='%233b82f6'/><path d='M30 46.5V64C30 68 39 74 50 74C61 74 70 68 70 64V46.5L50 56.5L30 46.5Z' fill='%2360a5fa'/></svg>";

// In-memory media registry for runtime-populated assets (e.g. from Blog, Course, University APIs)
if (!globalThis.__mediaRegistry) {
  globalThis.__mediaRegistry = new Map();
}

export function registerMediaMapping(key, url) {
  if (!key || !url) return;
  const cleanKey = String(key).trim().toLowerCase();
  globalThis.__mediaRegistry.set(cleanKey, url);
  const nameOnly = cleanKey.replace(/\.[^/.]+$/, "");
  if (nameOnly && nameOnly !== cleanKey) {
    globalThis.__mediaRegistry.set(nameOnly, url);
  }
}

export function resolveMediaMapping(key) {
  if (!key) return null;
  const cleanKey = String(key).trim().toLowerCase();
  if (globalThis.__mediaRegistry && globalThis.__mediaRegistry.has(cleanKey)) {
    return globalThis.__mediaRegistry.get(cleanKey);
  }
  return null;
}

/**
 * Resolves an image/asset path to the correct clean URL (/image/filename)
 * Supports string URLs, static filenames from mediaMap, and populated Media objects ({ _id, url, name, fileName }).
 */
export function getAssetPath(path = "", fallback = DEFAULT_SVG_LOGO) {
  if (!path) return fallback;

  // 1. Populated Media object ({ name, url, fileName, ... })
  if (typeof path === "object" && path !== null) {
    const rawUrl = path.url || path.src || path.path || "";
    let originalName = path.name || path.alt || path.fileName || "";

    if (rawUrl) {
      if (rawUrl.includes("/minio/") || rawUrl.includes(":9000/")) {
        const delimiter = rawUrl.includes("/minio/") ? "/minio/" : ":9000/";
        const relPath = rawUrl.substring(rawUrl.indexOf(delimiter) + delimiter.length).replace(/^\/+/, "");

        if (originalName) {
          const extMatch = rawUrl.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
          const ext = extMatch ? extMatch[1] : "";
          if (ext && !originalName.toLowerCase().endsWith(`.${ext.toLowerCase()}`)) {
            originalName = `${originalName}.${ext}`;
          }
          const safeName = originalName.trim().replace(/[\s/\\?%*:|"<>]+/g, "-");
          const lastFile = relPath.split("/").pop();

          registerMediaMapping(originalName, rawUrl);
          registerMediaMapping(safeName, rawUrl);
          registerMediaMapping(lastFile, rawUrl);

          // If safeName is a distinct friendly name (not just raw hash), embed it cleanly for SEO
          const isJustHash =
            safeName.toLowerCase() === lastFile.toLowerCase() ||
            safeName.replace(/\.[^/.]+$/, "").length === 32;

          if (!isJustHash && safeName) {
            return `/image/${relPath}/${encodeURIComponent(safeName)}`;
          }
        }

        registerMediaMapping(relPath.split("/").pop(), rawUrl);
        return `/image/${relPath}`;
      }

      // Check if static asset in mediaMap
      const staticName = originalName || rawUrl.split("/").pop();
      if (mediaMap[staticName] || mediaMap[staticName?.toLowerCase()]) {
        return `/image/${encodeURIComponent(staticName)}`;
      }

      path = rawUrl;
    } else {
      return fallback;
    }
  }

  if (typeof path !== "string") return fallback;
  let targetPath = path.trim();
  if (!targetPath) return fallback;

  // 2. Data URIs → pass through as-is
  if (targetPath.startsWith("data:image")) return targetPath;

  // 3. Relative /image/ or /media/ paths -> return as-is
  if (targetPath.startsWith("/image/") || targetPath.startsWith("/media/")) return targetPath;

  // 4. Static asset lookup in mediaMap (e.g. "sode-logo.png", "/assets/images/...")
  const lookup = targetPath.toLowerCase();
  const filename = targetPath.split("/").pop();
  const filenameLookup = filename ? filename.toLowerCase() : "";

  const mappedMinioUrl =
    mediaMap[targetPath] ||
    mediaMap[lookup] ||
    (filename ? mediaMap[filename] : null) ||
    (filenameLookup ? mediaMap[filenameLookup] : null);

  if (mappedMinioUrl) {
    const cleanFilename = filename || targetPath;
    registerMediaMapping(cleanFilename, mappedMinioUrl);
    return `/image/${encodeURIComponent(cleanFilename)}`;
  }

  // 5. MinIO URLs (domain or port) -> convert to /image/... proxy path
  if (targetPath.includes("/minio/")) {
    const relativeMedia = targetPath.substring(targetPath.indexOf("/minio/") + 7).replace(/^\/+/, "");
    const lastFile = relativeMedia.split("/").pop();
    registerMediaMapping(lastFile, targetPath);
    return `/image/${relativeMedia}`;
  }
  if (targetPath.includes(":9000/")) {
    const relativeMedia = targetPath.substring(targetPath.indexOf(":9000/") + 6).replace(/^\/+/, "");
    const lastFile = relativeMedia.split("/").pop();
    registerMediaMapping(lastFile, targetPath);
    return `/image/${relativeMedia}`;
  }

  // 6. Generic relative paths
  if (targetPath.startsWith("/")) return targetPath;

  // 7. External URLs
  if (targetPath.startsWith("http://")) {
    return targetPath.replace(/^http:\/\//i, "https://");
  }
  if (targetPath.startsWith("https://")) return targetPath;

  return fallback;
}

const SHORT_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

const MONTH_MAP = {
  jan: "Jan", january: "Jan",
  feb: "Feb", february: "Feb",
  mar: "Mar", march: "Mar",
  apr: "Apr", april: "Apr",
  may: "May",
  jun: "Jun", june: "Jun",
  jul: "Jul", july: "Jul",
  aug: "Aug", august: "Aug",
  sep: "Sept", sept: "Sept", september: "Sept",
  oct: "Oct", october: "Oct",
  nov: "Nov", november: "Nov",
  dec: "Dec", december: "Dec"
};

const FULL_TO_SHORT_MONTH_RE = /\b(january|february|march|april|june|july|august|september|sep|october|november|december)\b/gi;

function replaceFullMonths(str) {
  if (!str) return str;
  return str.replace(FULL_TO_SHORT_MONTH_RE, (match) => {
    return MONTH_MAP[match.toLowerCase()] || match;
  });
}

function getOrdinalSuffix(n) {
  const num = parseInt(n, 10);
  if (isNaN(num)) return "";
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

/**
 * Formats admission deadline with English ordinal suffix and short month:
 * e.g. 15 -> "15th Sept 2026", 30th-sept-2026 -> "30th Sept 2026", "15 September 2026" -> "15th Sept 2026"
 */
export function formatAdmissionDeadline(deadline) {
  if (!deadline && deadline !== 0) return "";
  const str = String(deadline).trim();
  if (!str) return "";

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = SHORT_MONTHS[now.getMonth()];

  // Case 1: Just day number (e.g. 15, 30, "1", "2")
  if (/^\d{1,2}$/.test(str)) {
    const day = parseInt(str, 10);
    return `${day}${getOrdinalSuffix(day)} ${currentMonth} ${currentYear}`;
  }

  // Case 2: Just day number with ordinal (e.g. "15th", "1st", "30th")
  if (/^(\d{1,2})(?:st|nd|rd|th)$/i.test(str)) {
    const match = str.match(/^(\d{1,2})(?:st|nd|rd|th)$/i);
    const day = parseInt(match[1], 10);
    return `${day}${getOrdinalSuffix(day)} ${currentMonth} ${currentYear}`;
  }

  // Case 3: DD-MM-YYYY or DD/MM/YYYY or DD.MM.YYYY (digits only)
  const dmyMatch = str.match(/^(\d{1,2})[-/. ](\d{1,2})[-/. ](\d{4})$/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const mIdx = parseInt(dmyMatch[2], 10) - 1;
    const year = dmyMatch[3];
    const month = (mIdx >= 0 && mIdx < 12) ? SHORT_MONTHS[mIdx] : currentMonth;
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  }

  // Case 4: YYYY-MM-DD (ISO date)
  const ymdMatch = str.match(/^(\d{4})[-/. ](\d{1,2})[-/. ](\d{1,2})$/);
  if (ymdMatch) {
    const year = ymdMatch[1];
    const mIdx = parseInt(ymdMatch[2], 10) - 1;
    const day = parseInt(ymdMatch[3], 10);
    const month = (mIdx >= 0 && mIdx < 12) ? SHORT_MONTHS[mIdx] : currentMonth;
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  }

  // Case 5: "30th-sept-2026", "30-sept-2026", "15 September 2026", "15th September 2026"
  const textDateMatch = str.match(/^(\d{1,2})(?:st|nd|rd|th)?[-/ ]+([a-zA-Z]+)(?:[-/ ]+(\d{4}))?$/);
  if (textDateMatch) {
    const day = parseInt(textDateMatch[1], 10);
    const mStr = textDateMatch[2].toLowerCase();
    const month = MONTH_MAP[mStr] || (mStr.charAt(0).toUpperCase() + mStr.slice(1));
    const year = textDateMatch[3] || currentYear;
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  }

  // Fallback: add ordinal suffix to any leading digits and convert full month names to short
  const formatted = str.replace(/^(\d{1,2})(?!(?:st|nd|rd|th))\b/i, (match, day) => {
    return `${day}${getOrdinalSuffix(day)}`;
  });
  return replaceFullMonths(formatted);
}

