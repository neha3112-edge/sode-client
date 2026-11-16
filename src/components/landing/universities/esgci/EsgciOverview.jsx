"use client";

import React from "react";
import { Download } from "lucide-react";

export default function EsgciOverview({ onOpenBrochure }) {
  return (
    <section id="overview" className="w-full bg-white pt-8 sm:pt-10 pb-4 sm:pb-5 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-[1000px] mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-black text-black leading-tight m-0 mb-2.5 sm:mb-3">
          Overview of <span className="text-[#04903c]">ESGCI Online DBA Program</span>
        </h2>

        {/* Overview Paragraph */}
        <p className="text-neutral-700 text-[13px] sm:text-[13.5px] leading-relaxed max-w-[960px] mx-auto m-0 mb-4 sm:mb-5 font-normal">
          The ESGCI Online DBA helps professionals gain advanced skills in business and management. The 36-month program includes foundation, leadership, and dissertation phases, giving a clear path for learning. Students receive personal guidance from experienced ESGCI faculty to support their research and studies. The program offers interactive learning and global exposure, helping students develop strong leadership and practical skills. It also allows students to use their knowledge on real-world business challenges. Graduates earn a globally recognized doctoral degree, improving career opportunities. After completing the DBA, alumni can work in consulting, research, teaching, or executive roles worldwide.
        </p>

        {/* Yellow Get Curriculum Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => onOpenBrochure?.("Overview Get Curriculum", "Get Curriculum")}
            className="inline-flex items-center justify-center gap-1.5 px-6 sm:px-7 py-2.5 bg-[#ffd200] hover:bg-[#e6bd00] text-black rounded-[5px] text-[14px] sm:text-[14.5px] font-bold shadow-xs active:scale-98 transition-all border-none cursor-pointer"
          >
            <span>Get Curriculum</span>
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

