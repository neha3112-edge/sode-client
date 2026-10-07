"use client";

import React from "react";
import Image from "next/image";

/**
 * Standardize approval data structure across all universities.
 * Maps legacy (text, desc, about) properties to uniform (id, title, description, image, tag).
 */
export function normalizeApprovalItem(item, idx = 0) {
  if (!item) return { id: `approval-${idx}`, image: "", title: "", description: "", tag: "" };

  if (typeof item === "string") {
    return {
      id: `approval-${idx}`,
      image: item,
      title: "",
      description: "",
      tag: "",
      raw: item,
    };
  }

  const id =
    item.id ||
    item.tag ||
    (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : null) ||
    (item.text ? item.text.toLowerCase().replace(/[^a-z0-9]+/g, "-") : null) ||
    (item.image ? item.image.split("/").pop() : null) ||
    `approval-${idx}`;

  return {
    id,
    image: item.image || item.logo || item.icon || "",
    title: item.title || item.text || item.name || "",
    description: item.description || item.desc || item.about || "",
    tag: item.tag || item.status || "",
    subtext: item.subtext || "",
    raw: item,
  };
}

/**
 * Reusable Approval Card with multiple display variants.
 */
export default function ApprovalCard({
  item,
  idx = 0,
  variant = "classic",
  className = "",
  style = {},
  showTag = false,
}) {
  const data = normalizeApprovalItem(item, idx);

  switch (variant) {
    case "classic":
      return (
        <div
          className={`bg-white/95 rounded-[12px] p-5 sm:p-6 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow text-slate-900 text-center ${className}`}
          style={style}
        >
          <div className="relative w-20 h-16 sm:w-24 sm:h-18 mb-3">
            <Image
              src={data.image}
              alt={data.title || data.tag || "Approval"}
              fill
              className="object-contain"
              sizes="96px"
            />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 m-0 line-clamp-2">
            {data.title}
          </h3>
          {showTag && data.tag && (
            <span className="mt-1.5 inline-block text-[11px] font-semibold text-[#074a76] bg-[#eef6fc] px-2.5 py-0.5 rounded-full">
              {data.tag}
            </span>
          )}
        </div>
      );

    case "horizontal-amity":
      return (
        <div className={`flex items-center gap-3 sm:gap-3.5 ${className}`} style={style}>
          <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] lg:w-[80px] lg:h-[80px] shrink-0 flex items-center justify-center">
            <Image
              src={data.image}
              alt={data.title || data.tag || "Approval"}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 64px, 80px"
            />
          </div>
          <p className="text-[13px] sm:text-[13.5px] lg:text-[14px] font-medium text-[#111111] leading-[1.3] m-0">
            {data.title}
          </p>
        </div>
      );

    case "badge-circle":
      return (
        <div className={`flex flex-col items-center min-w-[130px] sm:min-w-[150px] ${className}`} style={style}>
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center p-3 shadow-md">
            <Image
              src={data.image}
              alt={data.title || "Approval"}
              fill
              className="object-contain p-2.5"
              sizes="128px"
            />
          </div>
          <div className="mt-3 text-center">
            <p className="text-sm sm:text-base font-extrabold text-white leading-tight m-0">
              {data.title}
            </p>
            {data.tag && (
              <p className="text-xs font-semibold text-slate-300 mt-0.5 m-0 uppercase tracking-wider">
                {data.tag}
              </p>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}
