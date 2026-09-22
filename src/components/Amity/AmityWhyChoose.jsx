"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AmityWhyChoose({ onOpenApply }) {
  const points = [
    {
      title: "International Recognition",
      desc: "Amity Online is India's only university accredited by WASC (USA). Its degrees are WES-recognized in the USA and Canada, enabling global education.",
    },
    {
      title: "QS Ranked Online MBA",
      desc: "Amity offers India's only Online MBA ranked in the Asia Pacific Top 10 by QS, ensuring strong global recognition.",
    },
    {
      title: "Industry-Ready Certifications",
      desc: "Amity University Online includes top in-demand industry certificates and programs. Amity online programs from Amity University enhance students' skills and knowledge.",
    },
    {
      title: "AI-Powered Career Discovery Platform",
      desc: "Amity University online curriculum helps in building a strong resume for market-standard with AI-Powered Career Discovery Platform access to mock interviews, tools related to resumes, and jobs.",
    },
  ];

  return (
    <section id="whychoose" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight mb-8 sm:mb-10">
          Why Choose Amity University Online for Degree Courses
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: 2x2 Feature Points & Yellow Button */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
              {points.map((pt, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-[#08417b] tracking-tight">
                    {pt.title}
                  </h3>
                  <p className="text-[11.5px] sm:text-xs text-slate-700 leading-relaxed font-normal">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Yellow Apply Now CTA */}
            <div className="pt-2">
              <button
                onClick={() => onOpenApply?.()}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-sm bg-[#ffd200] hover:bg-[#ffc107] text-[#08417b] font-bold text-xs sm:text-sm shadow-xs transition-all duration-200 cursor-pointer group"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Student with Laptop on Armchair */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square">
              <Image
                src="/assets/images/why_choose_student.png"
                alt="Student studying with Amity Online on laptop"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 420px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
