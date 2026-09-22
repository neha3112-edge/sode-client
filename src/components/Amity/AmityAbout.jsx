"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AmityAbout({ onOpenApply }) {
  return (
    <section id="about" className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Campus Image */}
          <div className="lg:col-span-6">
            <div className="relative h-64 sm:h-80 lg:h-96 w-full rounded-sm overflow-hidden shadow-md">
              <Image
                src="/assets/images/amity_building_about.png"
                alt="Amity University Campus Building"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Column: About Details */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight leading-tight">
              About Amity University Online
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              Amity University Online is India’s first UGC-approved online university. This
              university offers a total of 24 bachelor’s and master’s degree programs with a wide
              range of specializations. Amity University Uttar Pradesh, ‘A+’ NAAC grade, and is
              recognized by WES, AIU, making it eligible to conduct online courses in different
              fields. Amity University Online Degree Programs offers an in-demand, up-to-date
              curriculum. It follows the anytime, anywhere mantra for course content, providing
              all content, live & recorded lectures.
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              The university also gives career support, expert mentorship, and placement
              assistance. With flexible learning options, EMI-based fee payment, and a strong
              academic reputation, it offers to its students.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenApply?.()}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-sm border-2 border-[#08417b] bg-white text-[#08417b] font-bold text-xs sm:text-sm hover:bg-[#08417b] hover:text-white transition-all duration-200 cursor-pointer shadow-xs group"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
