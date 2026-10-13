"use client";

import React from "react";
import Image from "next/image";

export default function RushfordWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const title = brand.whyChooseTitle || "Endless Benefits of the online DBA program";
  const subtitle = brand.whyChooseSubtitle || `at ${brand.name || "Rushford Business School"}`;
  const leftImage = brand.whyChooseImage || "/assets/all_universities_images/rushford/whychosse.webp";
  const btnText = brand.whyChooseButtonText || brand.whyChooseBtnText || "Enroll & Get Your DBA Degree";

  return (
    <section
      id="benefits"
      data-section="whychoose"
      className="benefits-section w-full bg-[#EFEFEF] select-none mt-1 sm:mt-9 lg:mt-[42px] mb-0 lg:mb-[45px] pt-4 sm:pt-9 lg:pt-12 pb-0 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          {/* Desktop Left Image - flush with bottom of section on desktop/laptop */}
          <div className="hidden lg:flex lg:col-span-5 justify-center items-end self-end">
            <div className="relative w-full max-w-[430px] xl:max-w-[460px] h-[450px] xl:h-[490px]">
              <Image
                src={leftImage}
                alt={title}
                fill
                priority
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>

          {/* Right / Main Content Column */}
          <div className="lg:col-span-7 pb-0 lg:pb-12 pt-1 sm:pt-2">
            {/* Title & Subtitle */}
            <h2 className="text-[#FF0066] text-[24px] sm:text-[28px] lg:text-[32px] xl:text-[34px] font-normal leading-[1.25] m-0 mb-1 tracking-tight">
              {title}
            </h2>
            <p className="text-black text-[20px] sm:text-[23px] lg:text-[25px] xl:text-[26px] font-normal leading-[1.25] m-0 mb-6 sm:mb-8">
              {subtitle}
            </p>

            {/* 4 Benefits in 2-column grid */}
            <div className="grid grid-cols-2 gap-x-3.5 sm:gap-x-6 lg:gap-x-8 gap-y-5 sm:gap-y-6 mb-6 sm:mb-8">
              {whyChoose.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3.5">
                  {item.image && (
                    <div className="relative w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] lg:w-[62px] lg:h-[62px] shrink-0 mb-0.5 sm:mb-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13.5px] sm:text-[15px] lg:text-[16px] font-bold text-black m-0 mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11.5px] sm:text-[12.5px] lg:text-[13px] text-[#333333] leading-[1.38] m-0 font-normal">
                      {item.desc || item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mb-6 lg:mb-0">
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 bg-black hover:bg-neutral-800 text-white font-semibold text-[13.5px] sm:text-[14.5px] rounded-[5px] transition-all border-none cursor-pointer shadow-sm active:scale-95"
              >
                <span>{btnText}</span>
                <span className="text-[15px] font-bold leading-none">➔</span>
              </button>
            </div>

            {/* Mobile / Tablet Image - below button, flush at bottom (hidden on desktop) */}
            <div className="flex lg:hidden justify-center items-end mt-4 -mb-1">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] h-[340px] sm:h-[380px]">
                <Image
                  src={leftImage}
                  alt={title}
                  fill
                  priority
                  className="object-contain object-bottom"
                  sizes="(max-width: 640px) 320px, 360px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
