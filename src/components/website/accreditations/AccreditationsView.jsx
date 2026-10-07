"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Award, Info } from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import { Container } from "@/components/common/Container";

export function AccreditationsView({ initialAccreditations = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const currentYear = new Date().getFullYear();

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
      <Container className="relative z-10 -mt-28 sm:-mt-36 md:-mt-44 pb-16 md:pb-24">
        <article className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 p-3 sm:p-8 md:p-10 text-[#2D3748]">
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

          {/* ─── 3. ACCREDITATIONS CARDS (3 cols on mobile starting from left, 5 cols on desktop centered) ─── */}
          {filteredAccreditations.length > 0 ? (
            <div className="flex flex-wrap items-center justify-start md:justify-center gap-1.5 sm:gap-2.5 md:gap-3 w-full">
              {filteredAccreditations.map((acc, idx) => {
                const CardWrapper = acc.slug ? Link : "div";
                const cardProps = acc.slug ? { href: `/accreditations/${acc.slug}` } : {};

                const titleText = (acc.name || acc.title || "").trim();
                const lower = titleText.toLowerCase();

                let renderedTitle = (
                  <div className="text-[10px] sm:text-[11px] md:text-[12px] text-slate-800 font-semibold leading-tight line-clamp-2 px-0.5">
                    {titleText}
                  </div>
                );

                if (lower.includes("online")) {
                  renderedTitle = (
                    <div className="text-[10px] sm:text-[11px] md:text-[12px] text-slate-800 leading-tight">
                      <span className="block text-slate-700">UGC Approved</span>
                      <span className="block font-medium">
                        <strong className="font-bold text-slate-900">Online</strong> Universities
                      </span>
                    </div>
                  );
                } else if (lower.includes("distance") || lower.includes("deb")) {
                  renderedTitle = (
                    <div className="text-[10px] sm:text-[11px] md:text-[12px] text-slate-800 leading-tight">
                      <span className="block text-slate-700">UGC Approved</span>
                      <span className="block font-medium">
                        <strong className="font-bold text-slate-900">Distance</strong> Universities
                      </span>
                    </div>
                  );
                } else if (lower.includes("ugc")) {
                  renderedTitle = (
                    <div className="text-[10px] sm:text-[11px] md:text-[12px] text-slate-800 leading-tight">
                      <span className="block text-slate-700">UGC Approved</span>
                      <span className="block font-semibold text-slate-900">Universities</span>
                    </div>
                  );
                } else if (lower.includes("nirf")) {
                  renderedTitle = (
                    <div className="text-[10px] sm:text-[11px] md:text-[12px] text-slate-800 leading-tight">
                      <span className="block font-semibold text-slate-900">NIRF Ranked</span>
                      <span className="block text-slate-700">Universities</span>
                    </div>
                  );
                } else if (lower.includes("naac")) {
                  renderedTitle = (
                    <div className="text-[10px] sm:text-[11px] md:text-[12px] text-slate-800 leading-tight">
                      <span className="block font-semibold text-slate-900">NAAC Accredited</span>
                      <span className="block text-slate-700">Universities</span>
                    </div>
                  );
                } else if (lower.includes("wes")) {
                  renderedTitle = (
                    <div className="text-[10px] sm:text-[11px] md:text-[12px] text-slate-800 leading-tight">
                      <span className="block font-semibold text-slate-900">WES Approved</span>
                      <span className="block text-slate-700">Universities</span>
                    </div>
                  );
                } else if (lower.includes("aicte")) {
                  renderedTitle = (
                    <div className="text-[10px] sm:text-[11px] md:text-[12px] text-slate-800 leading-tight">
                      <span className="block font-semibold text-slate-900">AICTE Approved</span>
                      <span className="block text-slate-700">Universities</span>
                    </div>
                  );
                }

                return (
                  <CardWrapper
                    key={acc.id || idx}
                    {...cardProps}
                    className="bg-white rounded-xl border border-gray-200 flex flex-col p-1.5 sm:p-2.5 md:p-3 items-center justify-between text-center aspect-[4/5] sm:aspect-square shadow-2xs hover:border-blue-300 transition-colors overflow-hidden shrink-0 w-[calc((100%-12px)/3)] sm:w-[calc((100%-20px)/3)] md:w-[calc((100%-48px)/5)] cursor-pointer no-underline group"
                  >
                    {/* Top: Logo with University page scale (64px mobile, 80px desktop) */}
                    <div className="flex-1 min-h-0 max-h-14 sm:max-h-16 md:max-h-20 w-full relative flex items-center justify-center">
                      {acc.logo ? (
                        <Image
                          src={getAssetPath(acc.logo)}
                          alt={acc.title}
                          fill
                          sizes="(max-width: 768px) 64px, 80px"
                          className="object-contain group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
                        </div>
                      )}
                    </div>

                    {/* Middle: Title with exact University page typography */}
                    <div className="w-full shrink-0 flex items-center justify-center text-center my-0.5 sm:my-1.5 min-h-[26px] sm:min-h-[32px]">
                      {renderedTitle}
                    </div>

                    {/* Bottom: Warm Golden-Sand Capsule Button */}
                    <div className="w-full shrink-0 flex items-center justify-center mb-0.5">
                      <span className="bg-[#E4BE75] group-hover:bg-[#dbb15f] text-[#351C00] text-[9px] sm:text-[10px] md:text-[11px] font-bold px-2 sm:px-3 py-1 sm:py-1 rounded-full transition-colors inline-flex items-center justify-center text-center whitespace-nowrap shadow-2xs leading-none">
                        <span className="hidden sm:inline">View Updated List {currentYear}</span>
                        <span className="sm:hidden">Updated List {currentYear}</span>
                      </span>
                    </div>
                  </CardWrapper>
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
      </Container>
    </div>
  );
}

export default AccreditationsView;
