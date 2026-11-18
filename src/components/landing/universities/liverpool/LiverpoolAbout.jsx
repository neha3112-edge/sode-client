"use client";

import React from "react";
import { Download } from "lucide-react";

export default function LiverpoolAbout({ onOpenBrochure }) {
  return (
    <section id="about" className="w-full bg-white pt-10 sm:pt-12 pb-6 sm:pb-8 select-none">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-black text-[#111111] leading-tight m-0 mb-4 sm:mb-5 text-center">
          About{" "}
          <span className="text-[#2de1c2]">Online MBA From Liverpool Business School</span>
        </h2>

        {/* 3 Paragraphs - Centered */}
        <div className="text-[13px] sm:text-[14.5px] text-[#333333] leading-[1.5] sm:leading-[1.55] max-w-[1000px] mx-auto text-center font-normal flex flex-col gap-3.5 sm:gap-4">
          <p className="m-0">
            The Liverpool Online MBA programme is an 18-month MBA journey designed to develop
            strategic thinking, leadership capabilities, and practical business skills. The
            programme combines the academic expertise of Liverpool Business School with the
            Executive Programme in Business Management &amp; AI Leadership certification from
            IIM Udaipur.
          </p>
          <p className="m-0">
            MBA in Liverpool is a distinctive and intellectually challenging course designed for
            professionals seeking career growth. This Liverpool online MBA offers a personalised,
            research-focused learning experience with live sessions, industry-led insights, HBR
            case studies, simulations, and hands-on projects.
          </p>
          <p className="m-0">
            Learners can customise their curriculum through specialisations in this MBA Liverpool
            University programme, which helps professionals enhance their business expertise and
            leadership potential with a global alumni network.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6">
          {/* Get Curriculum Button */}
          <button
            type="button"
            onClick={() => onOpenBrochure?.("About Section", "Get Curriculum")}
            className="py-2.5 sm:py-3 px-6 sm:px-8 rounded-[4px] sm:rounded-[6px] bg-[#2de1c2] hover:bg-[#25c4a8] text-white font-bold text-[13.5px] sm:text-[14px] flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 transition-all border-none"
          >
            <span>Get Curriculum</span>
            <Download className="w-4 h-4 shrink-0" />
          </button>

          {/* Know More Button */}
          <a
            href="#courses"
            className="py-2.5 sm:py-3 px-6 sm:px-8 rounded-[4px] sm:rounded-[6px] bg-[#000000] hover:bg-[#1a1a1a] text-white font-bold text-[13.5px] sm:text-[14px] flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 transition-all border-none no-underline"
          >
            <span>Know More</span>
            <span className="text-[10px] sm:text-[11px] shrink-0">▼</span>
          </a>
        </div>
      </div>
    </section>
  );
}
