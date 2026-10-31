"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles, Info, ArrowRight } from "lucide-react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useFormModal } from "@/hooks/useFormModal";

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
    circleBg: "bg-[#E0F7F6]",
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
    circleBg: "bg-[#F3E8FF]",
    isLink: true,
    linkUrl: "/tools/eligibility-checker",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#AB47BC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
    circleBg: "bg-[#E0E7FF]",
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
    circleBg: "bg-[#FCE4EC]",
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
  const { openFormModal } = useFormModal();
  const [searchQuery, setSearchQuery] = useState("");

  const allTools = useMemo(() => {
    if (Array.isArray(initialTools) && initialTools.length > 0) {
      return initialTools.map((t, idx) => {
        const name = (t.name || t.title || "Tool").trim();
        const lower = name.toLowerCase();

        let sparkleColor = "text-[#00ACC1]";
        let underlineClass = "border-[#00ACC1]";
        let circleBg = "bg-[#E0F7F6]";
        let btnText = name;
        let isLink = true;
        let linkUrl = t.linkUrl || t.url || "/tools/suggest-university";
        let defaultIcon = DEFAULT_TOOLS[0].icon;
        let desc = t.description || "Find universities that match your goals, preferences, and career plans.";

        if (lower.includes("eligib")) {
          sparkleColor = "text-[#AB47BC]";
          underlineClass = "border-[#AB47BC]";
          circleBg = "bg-[#F3E8FF]";
          btnText = "Check Eligibility";
          linkUrl = t.linkUrl || t.url || "/tools/eligibility-checker";
          desc = t.description || "Instantly check which courses and universities you are eligible for.";
          defaultIcon = DEFAULT_TOOLS[1].icon;
        } else if (lower.includes("compar")) {
          sparkleColor = "text-[#1E88E5]";
          underlineClass = "border-[#1E88E5]";
          circleBg = "bg-[#E0E7FF]";
          btnText = "Compare University";
          linkUrl = t.linkUrl || t.url || "/tools/compare-universities";
          desc = t.description || "Compare universities, courses, fees, and key benefits side by side.";
          defaultIcon = DEFAULT_TOOLS[2].icon;
        } else if (lower.includes("course")) {
          sparkleColor = "text-[#EC407A]";
          underlineClass = "border-[#EC407A]";
          circleBg = "bg-[#FCE4EC]";
          btnText = "Suggest Course";
          linkUrl = t.linkUrl || t.url || "/tools/suggest-course";
          desc = t.description || "Discover accredited degree and diploma programs matched to your background.";
          defaultIcon = DEFAULT_TOOLS[3].icon;
        } else if (idx % 4 === 1) {
          sparkleColor = "text-[#AB47BC]";
          underlineClass = "border-[#AB47BC]";
          circleBg = "bg-[#F3E8FF]";
        } else if (idx % 4 === 2) {
          sparkleColor = "text-[#1E88E5]";
          underlineClass = "border-[#1E88E5]";
          circleBg = "bg-[#E0E7FF]";
        } else if (idx % 4 === 3) {
          sparkleColor = "text-[#EC407A]";
          underlineClass = "border-[#EC407A]";
          circleBg = "bg-[#FCE4EC]";
        }

        const rawImg = t.logo || t.image;
        const logoUrl = typeof rawImg === "string" ? rawImg : rawImg?.url || rawImg?.path || "";

        return {
          id: t._id || t.id || String(idx),
          name: name,
          description: t.description || desc,
          logoUrl,
          sparkleColor,
          underlineClass,
          circleBg,
          btnText: t.btnText || btnText,
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
    <div className="w-full bg-[#f8fafc] text-slate-800 font-sans">
      {/* ─── 1. TOP DARK BLUE BANNER (#072C50) ─── */}
      <div className="w-full bg-[#072C50] h-36 sm:h-44 md:h-52" />

      {/* ─── 2. FLOATING WHITE CONTAINER CARD ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-2.5 sm:px-6 md:px-8 -mt-20 sm:-mt-28 md:-mt-32 pb-16 md:pb-24">
        <article className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 p-3.5 sm:p-10 md:p-14 text-[#2D3748]">
          {/* Top Badge */}
          <div className="flex justify-center mb-1.5 sm:mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:px-4 sm:py-1 rounded-full bg-[#F5E5BA] text-[#8C6228] border border-[#E9D195] text-[10px] sm:text-xs font-bold shadow-none">
              <span className="text-[#8C6228] text-xs sm:text-sm font-extrabold">✦</span>
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px]">AI POWERED</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-lg sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight text-center m-0 mb-1">
            Explore AI Powered Tools
          </h2>

          {/* Subtitle */}
          <p className="text-[#64748B] text-[11px] sm:text-sm md:text-base font-normal max-w-xl mx-auto text-center m-0 mb-4 sm:mb-8">
            Make smarter education decisions with AI-powered tools
          </p>

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

          {/* ─── 3. GRID OF AI TOOLS CARDS (EXACT UI/CSS MATCHING HOME & BLOG) ─── */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 text-center">
              {filteredTools.map((tool, idx) => (
                <div
                  key={tool.id || idx}
                  className="relative bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-5 md:p-6 shadow-xs hover:shadow-xl border border-slate-100 flex flex-col items-center text-center justify-between transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Top-Right Sparkle */}
                  <span
                    className={`absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 ${tool.sparkleColor} font-black text-xs select-none group-hover:rotate-12 transition-transform`}
                  >
                    ✦
                  </span>

                  <Link href={tool.linkUrl || "#"} className="flex flex-col items-center space-y-1.5 sm:space-y-3 w-full no-underline">
                    {/* Round Icon with colored background (matching blog page) */}
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-1 transition-transform group-hover:scale-110 shrink-0 ${!tool.logoUrl ? tool.circleBg : ""}`}
                    >
                      {tool.logoUrl ? (
                        <Image
                          src={tool.logoUrl}
                          alt={tool.name}
                          width={55}
                          height={55}
                          unoptimized
                        />
                      ) : (
                        tool.icon
                      )}
                    </div>

                    {/* Title with Centered Short Accent Line */}
                    <div className="w-full flex flex-col items-center justify-center mb-1">
                      <h3 className="text-xs sm:text-base font-semibold text-[#0F172A] tracking-tight m-0 pt-0.5 leading-tight text-center">
                        {tool.name}
                      </h3>
                      <span className={`w-7 sm:w-8 border-b-2 ${tool.underlineClass} mt-1 inline-block`} />
                    </div>

                    {/* Description */}
                    <div className="w-full flex items-center justify-center mt-1">
                      <p className="text-[#64748B] text-[10px] sm:text-[11px] leading-snug font-normal m-0 text-center">
                        {tool.description}
                      </p>
                    </div>
                  </Link>

                  {/* Button with circular arrow badge */}
                  <div className="w-full pt-2.5 sm:pt-3">
                    <Link
                      href={tool.linkUrl || "#"}
                      className="w-full py-1.5 sm:py-2 px-2 sm:px-4 rounded-full bg-[#0B3B7E] hover:bg-[#072859] text-white font-bold text-[9.5px] sm:text-xs shadow-xs transition-all flex items-center justify-center cursor-pointer no-underline group-hover:shadow-md active:scale-95"
                    >
                      <span className="truncate min-w-0">{tool.btnText || tool.name}</span>
                      <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white text-[#0B3B7E] flex items-center justify-center shrink-0 ml-1 sm:ml-1.5 transition-transform group-hover:translate-x-0.5">
                        <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
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
        </article>
      </div>
    </div>
  );
}

export default ToolsView;
