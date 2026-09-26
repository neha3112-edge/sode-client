"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { useToolWizard } from "@/components/tool/ToolWizardContext";
import { CareerExpertsSection } from "@/components/website/counselor";

export default function AiToolsAndScholarship({ block, bIdx }) {
  const { openTool } = useToolWizard();

  return (
    <section
      key={block._id || block.slug || bIdx}
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

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 text-center">
            {block.children.map((child, cIdx) => {
              const cName = (child.name || child.title || "").toLowerCase();

              let sparkleColor = "text-[#00ACC1]";
              let underlineClass = "border-[#00ACC1]";
              let btnText = "Suggest University";
              let desc = "Find universities that match your goals, preferences, and career plans.";
              let clickHandler = () => openTool("suggest-university");
              let isLink = false;
              let linkUrl = "#";

              let iconSvg = (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              );

              if (cName.includes("eligib")) {
                sparkleColor = "text-[#AB47BC]";
                underlineClass = "border-[#AB47BC]";
                btnText = "Check Eligibility";
                desc = "Instantly check which courses and universities you're eligible for.";
                clickHandler = () => openTool("check-eligibility");
                iconSvg = (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                );
              } else if (cName.includes("compar")) {
                sparkleColor = "text-[#1E88E5]";
                underlineClass = "border-[#1E88E5]";
                btnText = "Compare University";
                desc = "Compare universities, courses, fees, and key benefits side by side.";
                isLink = true;
                linkUrl = "/compare-university";
                iconSvg = (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                );
              } else if (cName.includes("course")) {
                sparkleColor = "text-[#EC407A]";
                underlineClass = "border-[#EC407A]";
                btnText = "Suggest Course";
                desc = "Discover accredited degree and diploma programs matched to your background.";
                clickHandler = () => openTool("suggest-course");
                iconSvg = (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                );
              }

              return (
                <div
                  key={child._id || cIdx}
                  className="relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-sm hover:shadow-xl border border-slate-100/90 flex flex-col items-center text-center justify-between transition-all duration-300 hover:-translate-y-1 group"
                >
                  <span
                    className={`absolute top-2 right-2 sm:top-3.5 sm:right-3.5 ${sparkleColor} font-black text-[10px] sm:text-xs group-hover:rotate-12 transition-transform`}
                  >
                    ✦
                  </span>

                  <div className="flex flex-col items-center space-y-2 sm:space-y-3 w-full">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {child.logo?.url || (typeof child.logo === "string" && child.logo) ? (
                        <Image
                          src={child.logo?.url || child.logo}
                          alt={child.name || "Tool icon"}
                          width={48}
                          height={48}
                          unoptimized
                          className="w-9 h-9 sm:w-12 sm:h-12 md:w-13 md:h-13 object-contain"
                        />
                      ) : (
                        iconSvg
                      )}
                    </div>

                    <h3 className="text-xs sm:text-base font-bold text-[#0F172A] tracking-tight m-0 pt-0.5 leading-tight">
                      <span className={`border-b-2 ${underlineClass} pb-0.5 inline-block`}>
                        {child.name}
                      </span>
                    </h3>

                    <p className="text-[#64748B] text-[10px] sm:text-xs md:text-[12.5px] leading-snug sm:leading-relaxed font-normal m-0 line-clamp-2 sm:line-clamp-3">
                      {child.description || desc}
                    </p>
                  </div>

                  <div className="w-full pt-3 sm:pt-5">
                    {isLink ? (
                      <Link
                        href={linkUrl}
                        className="w-full py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-full bg-[#0B3B7E] hover:bg-[#072859] text-white font-bold text-[10px] sm:text-xs shadow-none transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer truncate"
                      >
                        <span className="truncate">{btnText}</span>
                        <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white/20 flex items-center justify-center text-[9px] sm:text-[10px] shrink-0 group-hover:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={clickHandler}
                        className="w-full py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-full bg-[#0B3B7E] hover:bg-[#072859] text-white font-bold text-[10px] sm:text-xs shadow-none transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer truncate border-0"
                      >
                        <span className="truncate">{btnText}</span>
                        <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white/20 flex items-center justify-center text-[9px] sm:text-[10px] shrink-0 group-hover:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── MEET OUR CAREER EXPERTS (INSIDE SAME TOOLS SECTION) ── */}
          <CareerExpertsSection />
        </div>
      </Container>
    </section>
  );
}
