"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

// Category Icon Component - Renders MinIO Media Asset image/SVG from backend using Next.js Image
export function CategoryIcon({ cat }) {
  const [imgError, setImgError] = useState(false);
  const iconUrl = getAssetPath(cat?.logo, null);

  if (iconUrl && !imgError) {
    return (
      <div className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 relative shrink-0">
        <Image
          src={iconUrl}
          alt={cat?.name || "Category icon"}
          fill
          sizes="48px"
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50 text-blue-500 font-semibold flex items-center justify-center text-[10px] sm:text-xs">
      {cat?.name?.charAt(0) || "C"}
    </div>
  );
}

// Course Icon Component - Renders logo/image or circular badge with initial
export function CourseIcon({ course }) {
  const [imgError, setImgError] = useState(false);
  const iconUrl = getAssetPath(course?.logo, null);

  if (iconUrl && !imgError) {
    return (
      <div className="w-7 h-7 md:w-8 md:h-8 relative shrink-0">
        <Image
          src={iconUrl}
          alt={course?.name || "Course icon"}
          fill
          sizes="48px"
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50/80 text-[#0B3B7E] font-semibold flex items-center justify-center text-[10px] sm:text-xs border border-blue-100">
      {course?.name?.charAt(0) || "P"}
    </div>
  );
}

// Helper component to render backend logo/icon or fallback letter badge
export function PartnerLogoIcon({ partner }) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = getAssetPath(partner?.logo, null);

  if (logoUrl && !imgError) {
    return (
      <div className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 relative shrink-0">
        <Image
          src={logoUrl}
          alt={partner?.name || "University logo"}
          fill
          sizes="48px"
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50 text-blue-500 font-semibold flex items-center justify-center text-[10px] sm:text-xs">
      {partner?.name?.charAt(0) || "U"}
    </div>
  );
}

export function formatTwoLineText(text = "") {
  if (!text) return "";
  const cleaned = text.trim();

  // Custom smart splits for common education domains & institutions
  if (/^business\s*&\s*entrepr/i.test(cleaned)) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
        <span className="block text-center w-full font-semibold truncate">Business &</span>
        <span className="block text-center w-full font-semibold truncate text-[8.5px] min-[360px]:text-[9px] sm:text-[10px]">Entrepreneurship</span>
      </span>
    );
  }
  if (/^data science\s*&\s*analytics/i.test(cleaned)) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
        <span className="block text-center w-full font-semibold truncate">Data Science &</span>
        <span className="block text-center w-full font-semibold truncate">Analytics</span>
      </span>
    );
  }
  if (/^ai\s*&\s*machine learning/i.test(cleaned)) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
        <span className="block text-center w-full font-semibold truncate">AI & Machine</span>
        <span className="block text-center w-full font-semibold truncate">Learning</span>
      </span>
    );
  }
  if (/^energy\s*&\s*infrastructure/i.test(cleaned)) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
        <span className="block text-center w-full font-semibold truncate">Energy &</span>
        <span className="block text-center w-full font-semibold truncate text-[8.5px] min-[360px]:text-[9px] sm:text-[10px]">Infrastructure</span>
      </span>
    );
  }
  if (/^logistics\s*&\s*supply chain/i.test(cleaned)) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
        <span className="block text-center w-full font-semibold truncate">Logistics &</span>
        <span className="block text-center w-full font-semibold truncate">Supply Chain</span>
      </span>
    );
  }
  if (/^journalism\s*&\s*mass/i.test(cleaned)) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
        <span className="block text-center w-full font-semibold truncate">Journalism &</span>
        <span className="block text-center w-full font-semibold truncate text-[8.5px] min-[360px]:text-[9px] sm:text-[10px]">Mass Comm.</span>
      </span>
    );
  }

  const words = cleaned.split(/\s+/);
  if (words.length === 1) {
    return <span className="block text-center w-full leading-tight font-semibold truncate">{cleaned}</span>;
  }

  if (words.length === 2) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
        <span className="block text-center w-full font-semibold truncate">{words[0]}</span>
        <span className="block text-center w-full font-semibold truncate mt-0.5">{words[1]}</span>
      </span>
    );
  }

  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");

  return (
    <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
      <span className="block text-center w-full font-semibold truncate">{line1}</span>
      <span className="block text-center w-full font-semibold truncate mt-0.5">{line2}</span>
    </span>
  );
}

export function isObjectId(val) {
  return Boolean(val && /^[0-9a-fA-F]{24}$/.test(String(val).trim()));
}

export function slugifyText(text) {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getItemSlug(item) {
  if (!item) return "";

  // 1. If item is a primitive string
  if (typeof item === "string") {
    const trimmed = item.trim();
    if (!isObjectId(trimmed)) {
      return slugifyText(trimmed);
    }
    return trimmed;
  }

  // 2. Explicit clean slug on item (e.g. item.slug, item.courseSlug, item.parentCourseSlug)
  if (item.slug && typeof item.slug === "string" && !isObjectId(item.slug)) {
    return slugifyText(item.slug);
  }
  if (item.courseSlug && typeof item.courseSlug === "string" && !isObjectId(item.courseSlug)) {
    return slugifyText(item.courseSlug);
  }

  // 3. Short name or code (e.g. "BBA", "MBA", "MCA", "B.Tech")
  if (item.shortName && typeof item.shortName === "string" && !isObjectId(item.shortName)) {
    const s = slugifyText(item.shortName);
    if (s && !isObjectId(s)) return s;
  }
  if (item.code && typeof item.code === "string" && !isObjectId(item.code)) {
    const s = slugifyText(item.code);
    if (s && !isObjectId(s)) return s;
  }

  // 4. Readable Name, Title, Label, or DisplayName (e.g. "BBA" -> "bba")
  const readableName = item.name || item.title || item.label || item.displayName;
  if (readableName && typeof readableName === "string") {
    const s = slugifyText(readableName);
    if (s && !isObjectId(s)) return s;
  }

  // 5. Target URL parameter extraction if it contains a non-ObjectId slug
  if (item.targetUrl && typeof item.targetUrl === "string") {
    const match = item.targetUrl.match(/[?&](?:course|category|university|subcourse)=([^&#]+)/);
    if (match && match[1]) {
      const decoded = decodeURIComponent(match[1]);
      if (!isObjectId(decoded)) {
        return slugifyText(decoded);
      }
    }
  }

  // 6. Absolute last fallback (only if no name, title, shortName, code exists)
  return (!isObjectId(item.slug) ? item.slug : "") || item._id || "";
}

