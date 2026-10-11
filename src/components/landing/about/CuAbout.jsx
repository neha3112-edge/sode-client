"use client";

import React from "react";
import Image from "next/image";

export default function CuAbout({
  about = {},
  brand = {},
  onOpenApply,
}) {
  const text =
    about.text1 ||
    about.description ||
    about.p1 ||
    "Chandigarh university is one of the leading Indian Institute offering its professional and academic excellence in online also for the students and working professionals as well. Chandigarh Unviersity holds 19th rank in NIRF rank, UGC entitled, No.1 private university rank in QS Asia university ranking 2026 and A+ accreditation by NAAC in the first cycle itself and many more. This university offers courses in fields such as management, computers, arts, and science and many more. Chandigarh online University focus on the top-quality education while giving learn from anywhere, anytime concept.";

  const campusImage =
    brand.aboutImage ||
    about.image ||
    "/assets/cu/CU-about-image1.png";

  return (
    <section id="about" className="py-12 sm:py-16 bg-[#1f2846] text-white select-none scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <h2 className="text-[28px] sm:text-[33px] lg:text-[36px] font-bold text-white tracking-tight leading-[1.2] m-0">
              <span className="block">About Chandigarh University</span>
              <span className="block">Online</span>
            </h2>
            <p className="text-[12.5px] sm:text-[13px] text-slate-200/90 leading-[1.65] font-normal m-0 max-w-[480px]">
              {text}
            </p>
            <div className="pt-2 sm:pt-3">
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="bg-[#d11c1f] hover:bg-[#b51619] text-white font-bold text-[13px] sm:text-[14px] px-6 py-2.5 rounded-[6px] shadow-sm inline-flex items-center gap-2 cursor-pointer border-none transition-all active:scale-95"
              >
                <span>Know More</span>
                <span className="text-[15px] leading-none">➔</span>
              </button>
            </div>
          </div>

          {/* Right Campus Artwork */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px] lg:max-w-[650px] h-[260px] sm:h-[400px] lg:h-[500px]">
              <Image
                src={campusImage}
                alt="About Chandigarh University Online"
                fill
                priority
                className="object-contain object-center lg:object-right"
                sizes="(max-width: 1024px) 100vw, 620px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
