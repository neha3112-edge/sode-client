"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { useToolWizard } from "@/components/tool/ToolWizardContext";
import { CareerExpertsSection } from "@/components/website/counselor";
import { getAssetPath } from "@/lib/utils";

const DEFAULT_TOOLS = [
  {
    name: "Suggest University",
    description: "Find universities that match your goals, preferences, and career plans.",
    linkUrl: "/tools/suggest-university",
    btnText: "Suggest University",
  },
  {
    name: "Check Eligibility",
    description: "Instantly check which courses and universities you are eligible for.",
    linkUrl: "/tools/eligibility-checker",
    btnText: "Check Eligibility",
  },
  {
    name: "Compare University",
    description: "Compare universities, courses, fees, and key benefits side by side.",
    linkUrl: "/tools/compare-universities",
    btnText: "Compare University",
  },
  {
    name: "Suggest Course",
    description: "Find the best online and distance programs aligned with your aspirations.",
    linkUrl: "/tools/suggest-course",
    btnText: "Suggest Course",
  },
];

export default function AiToolsAndScholarship({ block, bIdx, counselors = [] }) {
  const { openTool } = useToolWizard();

  const toolsList =
    Array.isArray(block?.children) && block.children.length > 0
      ? block.children.slice(0, 4)
      : DEFAULT_TOOLS;

  return (
    <section
      key={block?._id || block?.slug || bIdx}
      className="w-full relative py-8 sm:py-12 md:py-14 bg-[#F1F5F9] text-center"
      suppressHydrationWarning
    >
      <Container className="relative z-10 !max-w-7xl">
        <div className="w-full mx-auto text-center">
          {/* Top Badge */}
          <div className="flex justify-center mb-1.5 sm:mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:px-4 sm:py-1 rounded-full bg-[#F5E5BA] text-[#8C6228] border border-[#E9D195] text-[10px] sm:text-xs font-bold shadow-none">
              <span className="text-[#8C6228] text-xs sm:text-sm font-extrabold">✦</span>
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px]">AI POWERED</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-lg sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight m-0 mb-1">
            Explore AI Powered Tools
          </h2>

          {/* Subtitle */}
          <p className="text-[#64748B] text-[11px] sm:text-sm md:text-base font-normal max-w-xl mx-auto m-0 mb-4 sm:mb-8">
            Make smarter education decisions with AI-powered tools
          </p>

          {/* 4 Cards Grid (Strictly 4 on Home) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 text-center">
            {toolsList.map((child, cIdx) => {
              const fullName = (child.name || child.title || "Tool").trim();
              const cName = fullName.toLowerCase();

              // Split name into prefix and underlineWord (like blog tools)
              const parts = fullName.split(/\s+/);
              const underlineWord = parts.length > 1 ? parts.pop() : fullName;
              const prefix = parts.join(" ");

              let sparkleColor = "text-[#00ACC1]";
              let underlineClass = "border-[#00ACC1]";
              let circleBg = "bg-[#E0F7F6]";
              let btnText = "Suggest University";
              let desc = "Find universities that match your goals, preferences, and career plans.";
              let isLink = true;
              let linkUrl = child.linkUrl || child.url || "/tools/suggest-university";

              let iconSvg = (
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#00ACC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              );

              if (cName.includes("eligib")) {
                sparkleColor = "text-[#AB47BC]";
                underlineClass = "border-[#AB47BC]";
                circleBg = "bg-[#F3E8FF]";
                btnText = "Check Eligibility";
                desc = "Instantly check which courses and universities you're eligible for.";
                isLink = true;
                linkUrl = child.linkUrl || child.url || "/tools/eligibility-checker";
                iconSvg = (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#AB47BC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                );
              } else if (cName.includes("compar")) {
                sparkleColor = "text-[#1E88E5]";
                underlineClass = "border-[#1E88E5]";
                circleBg = "bg-[#E0E7FF]";
                btnText = "Compare University";
                desc = "Compare universities, courses, fees, and key benefits side by side.";
                isLink = true;
                linkUrl = child.linkUrl || child.url || "/tools/compare-universities";
                iconSvg = (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#1E88E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                );
              } else if (cName.includes("course")) {
                sparkleColor = "text-[#EC407A]";
                underlineClass = "border-[#EC407A]";
                circleBg = "bg-[#FCE4EC]";
                btnText = "Suggest Course";
                desc = "Discover accredited degree and diploma programs matched to your background.";
                isLink = true;
                linkUrl = child.linkUrl || child.url || "/tools/suggest-course";
                iconSvg = (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#EC407A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                );
              } else if (cIdx % 4 === 1) {
                sparkleColor = "text-[#AB47BC]";
                underlineClass = "border-[#AB47BC]";
                circleBg = "bg-[#F3E8FF]";
              } else if (cIdx % 4 === 2) {
                sparkleColor = "text-[#1E88E5]";
                underlineClass = "border-[#1E88E5]";
                circleBg = "bg-[#E0E7FF]";
              } else if (cIdx % 4 === 3) {
                sparkleColor = "text-[#EC407A]";
                underlineClass = "border-[#EC407A]";
                circleBg = "bg-[#FCE4EC]";
              }

              const rawLogo = child.logo || child.image;
              const logoUrl = rawLogo ? getAssetPath(rawLogo) : null;

              return (
                <div
                  key={child._id || child.slug || cIdx}
                  className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xs hover:shadow-xl border border-slate-100 flex flex-col items-center text-center justify-between transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Top-Right Sparkle */}
                  <span
                    className={`absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 ${sparkleColor} font-black text-xs select-none group-hover:rotate-12 transition-transform`}
                  >
                    ✦
                  </span>

                  <Link href={linkUrl} className="flex flex-col items-center space-y-2 sm:space-y-3 w-full no-underline">
                    {/* Round Icon with colored background (matching blog page) */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${circleBg} flex items-center justify-center mb-1 transition-transform group-hover:scale-110 shrink-0`}
                    >
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt={fullName}
                          width={48}
                          height={48}
                          unoptimized
                          className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                        />
                      ) : (
                        iconSvg
                      )}
                    </div>

                    {/* Title with Underlined Word */}
                    <h3 className="text-xs sm:text-base font-bold text-[#0F172A] tracking-tight m-0 pt-0.5 leading-tight">
                      {prefix ? `${prefix} ` : ""}
                      <span className={`border-b-2 ${underlineClass} pb-0.5 inline-block`}>
                        {underlineWord}
                      </span>
                    </h3>

                    {/* Description */}
                    <div className="w-full flex items-center justify-center min-h-[30px] sm:min-h-[38px]">
                      <p className="text-[#64748B] text-[10px] sm:text-xs md:text-[12.5px] leading-snug sm:leading-relaxed font-normal m-0 line-clamp-2 sm:line-clamp-3 text-center">
                        {child.description || desc}
                      </p>
                    </div>
                  </Link>

                  {/* Button with circular arrow badge */}
                  <div className="w-full pt-3 sm:pt-4">
                    {isLink ? (
                      <Link
                        href={linkUrl}
                        className="w-full py-2 px-3 sm:px-4 rounded-full bg-[#0B3B7E] hover:bg-[#072859] text-white font-bold text-[10px] sm:text-xs shadow-xs transition-all flex items-center justify-between cursor-pointer truncate no-underline group-hover:shadow-md active:scale-95"
                      >
                        <span className="truncate">{child.btnText || btnText}</span>
                        <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-[#0B3B7E] flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 ml-1.5 transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openTool(linkUrl)}
                        className="w-full py-2 px-3 sm:px-4 rounded-full bg-[#0B3B7E] hover:bg-[#072859] text-white font-bold text-[10px] sm:text-xs shadow-xs transition-all flex items-center justify-between cursor-pointer truncate border-0 group-hover:shadow-md active:scale-95"
                      >
                        <span className="truncate">{child.btnText || btnText}</span>
                        <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-[#0B3B7E] flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 ml-1.5 transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Link to view all tools */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B3B7E] hover:text-[#072859] bg-white hover:bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full shadow-2xs transition-colors no-underline"
            >
              <span>Explore All AI Tools</span>
              <span className="text-xs">→</span>
            </Link>
          </div>

          {/* ── MEET OUR CAREER EXPERTS (INSIDE SAME TOOLS SECTION) ── */}
          <CareerExpertsSection counselors={counselors} />
        </div>
      </Container>
    </section>
  );
}
