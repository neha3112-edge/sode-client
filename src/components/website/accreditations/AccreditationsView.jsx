"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Award, Info } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export function AccreditationsView({ initialAccreditations = [] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const accreditationsList = useMemo(() => {
    if (!Array.isArray(initialAccreditations)) return [];

    return initialAccreditations.map((item, idx) => {
      const logo =
        item.logo?.url || item.logo || item.image?.url || item.image || null;
      const title = item.title || item.name || item.code || "Accreditation";
      const description = item.description || item.name || "";
      const slug = item.slug || (Array.isArray(item.slugs) ? item.slugs[0] : "") || "";

      return {
        id: item._id || item.id || String(idx),
        title,
        logo,
        description,
        name: item.name || item.title || "",
        code: item.code || "",
        slug,
        universityCount: item.universityCount,
      };
    });
  }, [initialAccreditations]);

  const filteredAccreditations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return accreditationsList;

    return accreditationsList.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)
    );
  }, [accreditationsList, searchQuery]);

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      {/* ─── 1. TOP DARK NAVY BANNER ─── */}
      <div className="w-full bg-[#11233E] h-44 sm:h-52 md:h-64" />

      {/* ─── 2. FLOATING WHITE CONTAINER CARD ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 -mt-28 sm:-mt-36 md:-mt-44 pb-16 md:pb-24">
        <article className="w-full bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10 md:p-12 text-[#2D3748]">
          {/* Centered Page Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1F38] text-center tracking-tight m-0 mb-2.5">
            Accreditations & Approvals
          </h1>

          {/* Intro Subtitle Description (no divider line matching reference) */}
          <div className="mb-8 sm:mb-10 text-slate-600 text-xs sm:text-[13.5px] md:text-sm leading-relaxed text-center max-w-3xl mx-auto">
            <p className="m-0">
              Statutory approvals and quality accreditations ensuring that degrees earned across our recognized universities are 100% legally valid for government jobs, higher education, and global careers.
            </p>
          </div>

          {/* Optional Search Bar for large lists */}
          {accreditationsList.length > 10 && (
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search approvals (e.g. UGC, NAAC, AICTE)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11233E] transition-colors"
                />
              </div>
            </div>
          )}

          {/* ─── 3. ACCREDITATIONS CARDS (Exact proportions matching reference screenshot) ─── */}
          {filteredAccreditations.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-4.5 md:gap-5 w-full">
              {filteredAccreditations.map((acc, idx) => {
                const titleText = (acc.name || acc.title || "").trim();
                const lower = titleText.toLowerCase();

                let renderedTitle = (
                  <div className="text-xs sm:text-[13px] text-slate-800 font-semibold leading-snug line-clamp-2 px-1">
                    {titleText}
                  </div>
                );

                if (lower.includes("online")) {
                  renderedTitle = (
                    <div className="text-xs sm:text-[13px] text-slate-800 leading-snug">
                      <span className="block text-slate-700">UGC Approved</span>
                      <span className="block font-medium">
                        <strong className="font-bold text-slate-900">Online</strong> Universities
                      </span>
                    </div>
                  );
                } else if (lower.includes("distance") || lower.includes("deb")) {
                  renderedTitle = (
                    <div className="text-xs sm:text-[13px] text-slate-800 leading-snug">
                      <span className="block text-slate-700">UGC Approved</span>
                      <span className="block font-medium">
                        <strong className="font-bold text-slate-900">Distance</strong> Universities
                      </span>
                    </div>
                  );
                } else if (lower.includes("ugc")) {
                  renderedTitle = (
                    <div className="text-xs sm:text-[13px] text-slate-800 leading-snug">
                      <span className="block text-slate-700">UGC Approved</span>
                      <span className="block font-semibold text-slate-900">Universities</span>
                    </div>
                  );
                } else if (lower.includes("nirf")) {
                  renderedTitle = (
                    <div className="text-xs sm:text-[13px] text-slate-800 leading-snug">
                      <span className="block font-semibold text-slate-900">NIRF Ranked</span>
                      <span className="block text-slate-700">universities</span>
                    </div>
                  );
                } else if (lower.includes("naac")) {
                  renderedTitle = (
                    <div className="text-xs sm:text-[13px] text-slate-800 leading-snug">
                      <span className="block font-semibold text-slate-900">NAAC Accredited</span>
                      <span className="block text-slate-700">Universities</span>
                    </div>
                  );
                } else if (lower.includes("wes")) {
                  renderedTitle = (
                    <div className="text-xs sm:text-[13px] text-slate-800 leading-snug">
                      <span className="block font-semibold text-slate-900">WES Approved</span>
                      <span className="block text-slate-700">Universities</span>
                    </div>
                  );
                } else if (lower.includes("aicte")) {
                  renderedTitle = (
                    <div className="text-xs sm:text-[13px] text-slate-800 leading-snug">
                      <span className="block font-semibold text-slate-900">AICTE Approved</span>
                      <span className="block text-slate-700">Universities</span>
                    </div>
                  );
                }

                const cardContent = (
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-200 p-4 sm:p-5 flex flex-col items-center justify-between text-center w-full h-full transition-all group">
                    {/* Top: Logo Image */}
                    <div className="h-12 sm:h-14 w-full flex items-center justify-center relative mt-1">
                      {acc.logo ? (
                        <Image
                          src={getAssetPath(acc.logo)}
                          alt={acc.title}
                          fill
                          sizes="120px"
                          className="object-contain group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Award className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600 group-hover:scale-110 transition-transform" />
                        </div>
                      )}
                    </div>

                    {/* Middle: Title */}
                    <div className="w-full flex items-center justify-center min-h-[38px] my-auto">
                      {renderedTitle}
                    </div>

                    {/* Bottom: Warm Golden-Sand Capsule Button */}
                    <div className="w-full flex items-center justify-center mb-0.5">
                      <span className="bg-[#E4BE75] group-hover:bg-[#dbb15f] text-[#4A2E00] text-[10.5px] sm:text-xs font-semibold px-3.5 sm:px-4 py-1.5 rounded-full transition-colors inline-block text-center whitespace-nowrap shadow-2xs">
                        View Updated List 2026
                      </span>
                    </div>
                  </div>
                );

                return acc.slug ? (
                  <Link
                    key={acc.id || idx}
                    href={`/accreditations/${acc.slug}`}
                    className="w-[175px] sm:w-[190px] md:w-[200px] h-[195px] sm:h-[210px] md:h-[220px] shrink-0 block no-underline"
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <div
                    key={acc.id || idx}
                    className="w-[175px] sm:w-[190px] md:w-[200px] h-[195px] sm:h-[210px] md:h-[220px] shrink-0"
                  >
                    {cardContent}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center text-slate-500">
              <Info className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="font-semibold text-sm m-0">
                {searchQuery
                  ? `No approvals found matching "${searchQuery}"`
                  : "No accreditations found."}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-xs text-[#11233E] font-bold underline cursor-pointer"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

export default AccreditationsView;
