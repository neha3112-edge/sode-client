"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Award, Sparkles, Info } from "lucide-react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { getAssetPath } from "@/lib/utils";

export function AccreditationsView({ initialAccreditations = [] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const accreditationsList = useMemo(() => {
    if (!Array.isArray(initialAccreditations)) return [];

    return initialAccreditations.map((item, idx) => {
      const logo =
        item.logo?.url || item.logo || item.image?.url || item.image || null;
      const title = item.code || item.name || "Accreditation";
      const description = item.description || item.name || "";
      const slug = item.slug || (Array.isArray(item.slugs) ? item.slugs[0] : "") || "";

      return {
        id: item._id || item.id || String(idx),
        title,
        logo,
        description,
        name: item.name || "",
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
        item.name.toLowerCase().includes(q)
    );
  }, [accreditationsList, searchQuery]);

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      {/* ─── 1. TOP DARK BLUE BANNER ─── */}
      <div className="w-full bg-[#072C50] h-36 sm:h-44 md:h-52" />

      {/* ─── 2. FLOATING WHITE CONTAINER CARD ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 -mt-20 sm:-mt-28 md:-mt-32 pb-16 md:pb-24">
        <article className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10 md:p-12 text-[#2D3748]">
          {/* Centered Page Title inside the card */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#072C50] text-center tracking-tight m-0 mb-4 sm:mb-5">
            Accreditations & Approvals
          </h1>

          {/* Full-width Divider Line */}
          <div className="w-full h-px bg-slate-200/90 mb-6 sm:mb-8" />

          {/* Intro Description */}
          <div className="mb-8 text-slate-600 text-xs sm:text-sm md:text-[14.5px] leading-relaxed text-center max-w-3xl mx-auto">
            <p className="m-0">
              Statutory approvals and quality accreditations ensuring that degrees earned across our recognized universities are 100% legally valid for government jobs, higher education, and global careers.
            </p>
          </div>

          {/* Search Bar */}
          {accreditationsList.length > 6 && (
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search approvals (e.g. UGC, NAAC, AICTE)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#072C50] transition-colors"
                />
              </div>
            </div>
          )}

          {/* ─── 3. EXACT SECTION & CSS FROM UNIVERSITY PAGE (Clickable Cards with Slug) ─── */}
          {filteredAccreditations.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-2.5 md:gap-3 w-full">
              {filteredAccreditations.map((acc, idx) => {
                const cardContent = (
                  <div
                    className="bg-white rounded-xl border border-gray-200 flex flex-col p-1.5 sm:p-3 items-center justify-between text-center aspect-[4/4.6] sm:aspect-square shadow-2xs hover:border-blue-400 hover:shadow-md transition-all overflow-hidden w-full group cursor-pointer"
                  >
                    <div className="flex-1 min-h-0 w-full relative">
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
                          <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600 group-hover:scale-110 transition-transform" />
                        </div>
                      )}
                    </div>
                    <div className="w-full shrink-0 flex flex-col items-center justify-start text-center pt-1">
                      <div className="w-full h-4 sm:h-5 flex items-center justify-center">
                        <h3 className="text-[10px] sm:text-[11.5px] md:text-[12.5px] font-bold text-gray-900 group-hover:text-blue-600 m-0 tracking-tight leading-tight line-clamp-1 w-full text-center transition-colors">
                          {acc.title}
                        </h3>
                      </div>
                      <div className="w-full h-[22px] sm:h-[26px] flex items-start justify-center mt-0.5">
                        {acc.description ? (
                          <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-600 leading-tight m-0 line-clamp-2 w-full text-center">
                            {acc.description}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );

                return acc.slug ? (
                  <Link key={acc.id || idx} href={`/accreditations/${acc.slug}`} className="block no-underline">
                    {cardContent}
                  </Link>
                ) : (
                  <div key={acc.id || idx}>{cardContent}</div>
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
                  className="mt-3 text-xs text-[#072C50] font-bold underline cursor-pointer"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}

          {/* ─── 4. BOTTOM FREE COUNSELING CALLOUT CARD ─── */}
          <div className="mt-12 bg-gradient-to-r from-[#072C50] to-[#0D3B66] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="text-center md:text-left space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Need Verification Help?</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white m-0">
                Verify University Approvals with Expert Counselors
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 m-0 max-w-xl">
                Get 100% free guidance on UGC-DEB entitlements, NAAC grades, and course validity before you pay any admission fee.
              </p>
            </div>

            <Link
              href="/contact-us"
              className="bg-[#f97316] hover:bg-[#ea580c] text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-md transition-all hover:scale-105 inline-flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Get Free Consultation</span>
              <ArrowRightOutlined />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

export default AccreditationsView;
