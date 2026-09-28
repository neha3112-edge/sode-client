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

  // 1. Convert MinIO internal IP/port URLs to same-domain relative proxy path (/media/...)
  if (targetPath.includes(":9000/")) {
    const relativeMedia = targetPath.substring(targetPath.indexOf(":9000/") + 6);
    return `/media/${relativeMedia}`;
  }

  // 2. Data URIs → pass through as-is
  if (targetPath.startsWith("data:image")) return targetPath;

  // 3. Local asset path string → look up in mediaMap
  const lookup = targetPath.toLowerCase();
  if (mediaMap[targetPath]) {
    return mediaMap[targetPath];
  }
  if (mediaMap[lookup]) {
    return mediaMap[lookup];
  }

  // 4. Relative paths or /media/ paths -> return as-is
  if (targetPath.startsWith("/media/") || targetPath.startsWith("/")) return targetPath;

  // 5. Convert any insecure http:// to https:// to prevent Mixed Content security blocking
  if (targetPath.startsWith("http://")) {
    return targetPath.replace(/^http:\/\//i, "https://");
  }

  if (targetPath.startsWith("https://")) return targetPath;

  // 6. Safe fallback for unmapped static strings
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

