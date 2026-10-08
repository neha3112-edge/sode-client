"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function RushfordWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const title = brand.whyChooseTitle || "Endless Benefits of the online DBA program";
  const subtitle = brand.whyChooseSubtitle || `at ${brand.name || "Rushford Business School"}`;
  const leftImage = brand.whyChooseImage || "/assets/all_universities_images/rushford/whychosse.webp";
  const btnText = brand.whyChooseButtonText || brand.whyChooseBtnText || "Enroll & Get Your DBA Degree";

  return (
    <section
      id="benefits"
      data-section="whychoose"
      className="benefits-section w-full bg-white select-none py-12 sm:py-16 scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full aspect-[4/3] rounded-[8px] overflow-hidden">
              <Image
                src={leftImage}
                alt={title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7">
            <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#111111] m-0 mb-1">
              {title}
            </h2>
            <p className="text-[20px] sm:text-[24px] text-[#17479e] font-semibold mt-1 mb-6">
              {subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {whyChoose.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  {item.image && (
                    <div className="relative w-12 h-12 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-[#111111] m-0 mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#555555] leading-relaxed m-0 font-normal">
                      {item.desc || item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onOpenApply?.()}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-black hover:bg-neutral-900 text-white font-bold text-[14.5px] sm:text-[15px] rounded-[5px] transition-all border-none cursor-pointer shadow-md active:scale-95"
            >
              <span>{btnText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
