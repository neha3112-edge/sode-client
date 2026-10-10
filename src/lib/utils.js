"use strict";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function slugifyFileName(name = "", fallbackExt = "webp") {
  if (!name) return "";
  let baseName = String(name).trim();
  let ext = "";
  const extMatch = baseName.match(/\.([a-zA-Z0-9]+)$/);
  if (extMatch) {
    ext = extMatch[1].toLowerCase();
    baseName = baseName.replace(/\.[a-zA-Z0-9]+$/, "");
  } else {
    ext = fallbackExt;
  }
  const slug = baseName
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug || "image"}.${ext}`;
}

/**
 * Formats image alt text cleanly into human-readable text.
 * Example: 'data-data' -> 'Data Data'
 *          'data_data.webp' -> 'Data Data'
 *          'Manipal University Jaipur' -> 'Manipal University Jaipur'
 */
export function formatAltText(text = "") {
  if (!text || typeof text !== "string") return "";

  // 1. Remove file extensions (.webp, .png, .jpg, .jpeg, .svg, .gif, .pdf, etc.)
  let clean = text.replace(/\.(webp|png|jpe?g|svg|gif|avif|bmp|pdf|ico)$/i, "").trim();

  // 2. Replace hyphens and underscores with spaces (e.g. data-data -> data data, data_data -> data data)
  if (/[-_]/.test(clean)) {
    clean = clean.replace(/[-_]+/g, " ");
  }

  // 3. Normalize multiple whitespace
  clean = clean.replace(/\s+/g, " ").trim();
  if (!clean) return "";

  // 4. Title case each word: 'data data' -> 'Data Data'
  // If a word is already an all-caps abbreviation/acronym like 'MBA', 'MCA', 'AI', 'IIT', keep it.
  return clean
    .split(" ")
    .map((word) => {
      if (!word) return "";
      // Acronym check (e.g., MBA, MCA, AI, IIT, IIM)
      if (word === word.toUpperCase() && word.length > 1 && !/^[0-9]+$/.test(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Returns image alt text dynamically based on media object { name, alt } or fallback.
 * Prioritizes the image's name, and cleans formatted slugs (e.g. 'data-data' -> 'Data Data').
 */
export function getAssetAlt(media, fallbackAlt = "") {
  if (!media) return formatAltText(fallbackAlt);

  let target = "";
  if (typeof media === "object" && media !== null) {
    // 1. Prioritize image's name first!
    target = media.name || media.alt || media.title || fallbackAlt || "";
    if (!target && media.fileName) {
      target = media.fileName;
    }
  } else if (typeof media === "string") {
    if (fallbackAlt && !media.includes("/")) {
      target = media || fallbackAlt;
    } else if (media.startsWith("http") || media.startsWith("/")) {
      target = fallbackAlt || media.split("/").pop().split("?")[0];
    } else {
      target = media || fallbackAlt;
    }
  }

  return formatAltText(target);
}

function extractMinioRelPath(rawPath, mediaObj = null) {
  if (!rawPath && !mediaObj) return "";
  const str = typeof rawPath === "string" ? rawPath.trim() : "";

  if (str.includes("/minio/")) {
    return str.substring(str.indexOf("/minio/") + 7).replace(/^\/+/, "");
  }
  if (str.includes(":9000/")) {
    return str.substring(str.indexOf(":9000/") + 6).replace(/^\/+/, "");
  }
  if (
    str.startsWith("crm-media/") ||
    str.startsWith("images/") ||
    str.startsWith("uploads/")
  ) {
    return str.replace(/^\/+/, "");
  }
  if (mediaObj && typeof mediaObj === "object") {
    if (mediaObj.bucket && mediaObj.key) {
      return `${mediaObj.bucket}/${mediaObj.key}`.replace(/^\/+/, "");
    }
    if (mediaObj.path && typeof mediaObj.path === "string") {
      const p = mediaObj.path.trim().replace(/^\/+/, "");
      if (
        p.startsWith("crm-media/") ||
        p.startsWith("images/") ||
        p.startsWith("uploads/")
      ) {
        return p;
      }
    }
  }
  return "";
}

/**
 * Resolves an image/asset path to the correct clean URL (/image/:name)
 * Dynamically builds SEO-friendly URLs based on media name (NOT fileName).
 */
export function getAssetPath(path = "", fallback = DEFAULT_SVG_LOGO, customName = "") {
  if (!path) return fallback;

  // 1. Populated Media object ({ name, url, fileName, alt, ... })
  if (typeof path === "object" && path !== null) {
    const rawUrl = path.url || path.src || path.path || "";
    const name = path.name || path.title || path.imageName || customName || path.alt || "";

    if (rawUrl) {
      const urlExtMatch = rawUrl.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
      const ext = urlExtMatch ? urlExtMatch[1] : (path.fileName?.split(".").pop() || "webp");
      const relPath = extractMinioRelPath(rawUrl, path);

      // Use the image's name (NOT fileName!)
      if (name) {
        const cleanName = slugifyFileName(name, ext);
        registerMediaMapping(cleanName, rawUrl);
        registerMediaMapping(name, rawUrl);
        registerMediaMapping(encodeURIComponent(cleanName), rawUrl);
        const baseSlug = cleanName.replace(/\.[^/.]+$/, "");
        if (baseSlug) {
          registerMediaMapping(baseSlug, rawUrl);
        }
        if (path.fileName) {
          registerMediaMapping(path.fileName, rawUrl);
        }

        return `/image/${encodeURIComponent(cleanName)}`;
      }

      // If no name is provided, fallback to fileName only if fileName exists
      if (path.fileName) {
        registerMediaMapping(path.fileName, rawUrl);
        return `/image/${encodeURIComponent(path.fileName)}`;
      }

      const relMinio = extractMinioRelPath(rawUrl, path);
      if (relMinio) {
        registerMediaMapping(relMinio.split("/").pop(), rawUrl);
        return `/image/${relMinio}`;
      }

      path = rawUrl;
    } else {
      return fallback;
    }
  }

  if (typeof path !== "string") return fallback;
  let targetPath = path.trim();
  if (!targetPath) return fallback;

  // If customName is provided for a string URL
  if (customName && (targetPath.startsWith("http") || targetPath.includes("/minio/"))) {
    const urlExtMatch = targetPath.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
    const ext = urlExtMatch ? urlExtMatch[1] : "webp";
    const cleanName = slugifyFileName(customName, ext);
    registerMediaMapping(cleanName, targetPath);
    registerMediaMapping(customName, targetPath);
    registerMediaMapping(encodeURIComponent(cleanName), targetPath);

    return `/image/${encodeURIComponent(cleanName)}`;
  }

  // 2. Data URIs → pass through as-is
  if (targetPath.startsWith("data:image")) return targetPath;

  // 3. Relative /image/ or /media/ paths -> return as-is
  if (targetPath.startsWith("/image/") || targetPath.startsWith("/media/")) return targetPath;

  // 4. MinIO URLs (domain or port) -> convert to /image/... proxy path
  const relMinio = extractMinioRelPath(targetPath);
  if (relMinio) {
    const lastFile = relMinio.split("/").pop();
    registerMediaMapping(lastFile, targetPath);
    return `/image/${relMinio}`;
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

