"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles, Info } from "lucide-react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { getAssetPath } from "@/lib/utils";

// --- Standard Suite of Educational AI Tools ---
const DEFAULT_TOOLS = [
  {
    id: "suggest-university",
    code: "suggest-university",
    name: "Suggest University",
    description: "Find universities that match your goals, preferences, and career plans.",
    btnText: "Suggest University",
    sparkleColor: "text-[#00ACC1]",
    underlineClass: "border-[#00ACC1]",
    isLink: true,
    linkUrl: "/tools/suggest-university",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#00ACC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "check-eligibility",
    code: "check-eligibility",
    name: "Check Eligibility",
    description: "Instantly check which courses and universities you are eligible for.",
    btnText: "Check Eligibility",
    sparkleColor: "text-[#AB47BC]",
    underlineClass: "border-[#AB47BC]",
    isLink: true,
    linkUrl: "/tools/eligibility-checker",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#AB47BC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "compare-university",
    code: "compare-university",
    name: "Compare University",
    description: "Compare universities, courses, fees, and key benefits side by side.",
    btnText: "Compare University",
    sparkleColor: "text-[#1E88E5]",
    underlineClass: "border-[#1E88E5]",
    isLink: true,
    linkUrl: "/tools/compare-universities",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#1E88E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    id: "suggest-course",
    code: "suggest-course",
    name: "Suggest Course",
    description: "Find the best online and distance programs aligned with your aspirations.",
    btnText: "Suggest Course",
    sparkleColor: "text-[#EC407A]",
    underlineClass: "border-[#EC407A]",
    isLink: true,
    linkUrl: "/tools/suggest-course",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#EC407A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

export function ToolsView({ initialTools = [] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const allTools = useMemo(() => {
    if (Array.isArray(initialTools) && initialTools.length > 0) {
      return initialTools.map((t, idx) => {
        const name = t.name || t.title || "Tool";
        const lower = name.toLowerCase();

        let sparkleColor = "text-[#00ACC1]";
        let underlineClass = "border-[#00ACC1]";
        let btnText = name;
        let isLink = true;
        let linkUrl = "/tools/suggest-university";
        let defaultIcon = (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#00ACC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );

        if (lower.includes("eligib")) {
          sparkleColor = "text-[#AB47BC]";
          underlineClass = "border-[#AB47BC]";
          btnText = "Check Eligibility";
          linkUrl = "/tools/eligibility-checker";
          defaultIcon = (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#AB47BC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          );
        } else if (lower.includes("compar")) {
          sparkleColor = "text-[#1E88E5]";
          underlineClass = "border-[#1E88E5]";
          btnText = "Compare University";
          linkUrl = "/tools/compare-universities";
          defaultIcon = (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#1E88E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          );
        } else if (lower.includes("course")) {
          sparkleColor = "text-[#EC407A]";
          underlineClass = "border-[#EC407A]";
          btnText = "Suggest Course";
          linkUrl = "/tools/suggest-course";
          defaultIcon = (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#EC407A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          );
        }

        const logoUrl = getAssetPath(
          t.logo?.url || t.logo || t.image?.url || t.image,
          ""
        );

        return {
          id: t._id || t.id || String(idx),
          name: name,
          description:
            t.description ||
            `Smart AI guidance tool to help you evaluate and choose the right academic path.`,
          logoUrl,
          sparkleColor,
          underlineClass,
          btnText,
          isLink,
          linkUrl,
          icon: defaultIcon,
        };
      });
    }

    return DEFAULT_TOOLS;
  }, [initialTools]);

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allTools;

    return allTools.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [allTools, searchQuery]);

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      {/* ─── 1. TOP DARK BLUE BANNER (#072C50) ─── */}
      <div className="w-full bg-[#072C50] h-36 sm:h-44 md:h-52" />

      {/* ─── 2. FLOATING WHITE CONTAINER CARD ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 -mt-20 sm:-mt-28 md:-mt-32 pb-16 md:pb-24">
        <article className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10 md:p-14 text-[#2D3748]">
          {/* Top Badge */}
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5E5BA] text-[#8C6228] border border-[#E9D195] text-xs font-bold shadow-none">
              <span className="text-[#8C6228] text-xs sm:text-sm font-extrabold">✦</span>
              <span className="tracking-wider uppercase text-[11px]">AI POWERED</span>
            </div>
          </div>

          {/* Centered Page Title inside the card */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#072C50] text-center tracking-tight m-0 mb-3">
            Explore AI Powered Tools
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-xs sm:text-sm md:text-base text-center max-w-2xl mx-auto m-0 mb-6">
            Make smarter education decisions with AI-powered tools designed to help you discover courses, compare universities, and check your eligibility.
          </p>

          {/* Full-width Divider Line */}
          <div className="w-full h-px bg-slate-200/90 mb-8" />

          {/* Search Bar */}
          {allTools.length > 4 && (
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search tools (e.g. Suggest University, Eligibility)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#072C50] transition-colors"
                />
              </div>
            </div>
          )}

          {/* ─── 3. GRID OF AI TOOLS CARDS (EQUAL HEIGHT & ALIGNED) ─── */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
              {filteredTools.map((tool, idx) => (
                <div
                  key={tool.id || idx}
                  className="relative bg-white rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-xl border border-slate-100 flex flex-col items-center text-center justify-between transition-all duration-300 hover:-translate-y-1 group h-full"
                >
                  <span
                    className={`absolute top-3.5 right-3.5 ${tool.sparkleColor} font-black text-xs group-hover:rotate-12 transition-transform`}
                  >
                    ✦
                  </span>

                  <Link href={tool.linkUrl || "#"} className="flex flex-col items-center w-full no-underline">
                    {/* Fixed Height Icon Container */}
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
                      {tool.logoUrl ? (
                        <div className="relative w-10 h-10">
                          <Image
                            src={tool.logoUrl}
                            alt={tool.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        tool.icon || (
                          <Sparkles className="w-7 h-7 text-[#072C50]" />
                        )
                      )}
                    </div>

                    {/* Fixed Height Title Container */}
                    <div className="w-full h-8 flex items-center justify-center mb-1">
                      <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight m-0 leading-tight line-clamp-1 w-full text-center">
                        <span className={`border-b-2 ${tool.underlineClass} pb-0.5 inline-block`}>
                          {tool.name}
                        </span>
                      </h3>
                    </div>

                    {/* Fixed Height Description Container */}
                    <div className="w-full h-14 sm:h-16 flex items-center justify-center">
                      <p className="text-[#64748B] text-xs sm:text-[13px] leading-relaxed font-normal m-0 line-clamp-3 text-center">
                        {tool.description}
                      </p>
                    </div>
                  </Link>

                  {/* Pinned Bottom Button */}
                  <div className="w-full mt-auto pt-4">
                    <Link
                      href={tool.linkUrl || "#"}
                      className="w-full py-2.5 px-4 rounded-full bg-[#0B3B7E] hover:bg-[#072859] text-white font-bold text-xs shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer truncate"
                    >
                      <span className="truncate">{tool.btnText || tool.name}</span>
                      <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] shrink-0 group-hover:translate-x-0.5 transition-transform">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-slate-500">
              <Info className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="font-semibold text-sm m-0">No tools found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs text-[#072C50] font-bold underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* ─── 4. BOTTOM FREE COUNSELING CALLOUT CARD ─── */}
          <div className="mt-12 bg-gradient-to-r from-[#072C50] to-[#0D3B66] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="text-center md:text-left space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Need Personalized Guidance?</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white m-0">
                Talk to Our Expert Academic Counselors
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 m-0 max-w-xl">
                Get 100% free guidance on selecting the right university, course eligibility, fees structure, and EMI options.
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

export default ToolsView;
