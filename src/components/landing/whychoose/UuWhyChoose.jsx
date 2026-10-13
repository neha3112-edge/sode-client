"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function UuWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const title = brand.whyChooseTitle || `${brand.name || "Uttaranchal University"} Benefits in the`;
  const highlight = brand.whyChooseHighlight || "Online Degree Programs";
  const description =
    brand.whyChooseDescription ||
    "Uttaranchal University Online courses are UGC-Entitled offers the convenience & flexibility of online education with the equivalency of a conventional, on-campus degree. Through Uttaranchal University Online, leading international faculty, it offer world-class education in a true sense.";
  const studentImage = brand.whyChooseStudentImage || "/assets/all_universities_images/uu/image-2nd.webp";
  const btnText = brand.whyChooseButtonText || brand.whyChooseBtnText || "Apply Now";
  const bg = brand.whyChooseBg || brand.primaryColor || "#0A3C7D";
  const accentColor = brand.accentColor || "#62B239";

  return (
    <section
      id="whychoose"
      data-section="whychoose"
      className="w-full select-none py-10 sm:py-16 lg:py-20 scroll-mt-20 text-white"
      style={{ backgroundColor: bg }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left: Student Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[503/600] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-2xl">
              <Image
                src={studentImage}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
            </div>
          </div>

          {/* Right: Text + 2-Column Icon Grid + Apply Button */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <h2 className="text-[20px] sm:text-[26px] lg:text-[30px] font-bold text-white leading-tight m-0 mb-3 text-left">
              {/* Mobile (< sm): 3 lines */}
              <span className="block sm:hidden">
                <span className="block">Uttaranchal University</span>
                <span className="block">
                  Benefits in the{" "}
                  <span style={{ color: accentColor }}>Online Degree</span>
                </span>
                <span className="block" style={{ color: accentColor }}>
                  Programs
                </span>
              </span>

              {/* Laptop & Desktop (>= sm): exact 2 lines from reference Image 1 */}
              <span className="hidden sm:inline">
                Uttaranchal University Benefits in
                <br className="hidden sm:block" />
                the{" "}
                <span style={{ color: accentColor }}>Online Degree Programs</span>
              </span>
            </h2>

            {description && (
              <p className="text-[12.5px] sm:text-[13.5px] text-white/90 font-normal leading-relaxed m-0 mb-6 sm:mb-8 max-w-2xl">
                {description}
              </p>
            )}

            {/* 2-Column Icon Grid */}
            <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6 gap-y-4 sm:gap-y-5 mb-6 sm:mb-8">
              {whyChoose.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 sm:gap-3">
                  {item.image && (
                    <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                        sizes="36px"
                      />
                    </div>
                  )}
                  <span className="text-[12px] sm:text-[14px] font-medium text-white leading-snug">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="inline-flex items-center gap-2 px-6 py-2 sm:px-7 sm:py-2.5 text-white font-bold text-[13.5px] sm:text-[14.5px] rounded-[6px] transition-all border-none cursor-pointer shadow-md active:scale-95"
                style={{ backgroundColor: accentColor }}
              >
                <span>{btnText}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
