"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LandingContainer from "../LandingContainer";

export default function ManipalWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const mobileCarouselRef = useRef(null);
  const desktopCarouselRef = useRef(null);
  const prefix = brand.whyChoosePrefix || "Key Features of";
  const highlight = brand.whyChooseHighlight || brand.name || "Manipal University Online";
  const subtitle =
    brand.whyChooseSubtitle ||
    "Manipal University's online degree courses redefine academic excellence with flexible learning approaches and advanced digital education tools.";
  const sectionBg = brand?.whyChooseBg || "#fdf8f4";
  const primaryColor = brand?.aboutHighlightColor || brand?.primaryColor || "#ee3024";

  if (!whyChoose || whyChoose.length === 0) return null;

  return (
    <section
      id="advantage"
      className="pt-7 sm:pt-9 lg:pt-11 pb-8 sm:pb-10 lg:pb-12 select-none font-['Poppins',sans-serif] scroll-mt-20"
      style={{ backgroundColor: sectionBg }}
    >
      <LandingContainer className="!max-w-[1140px] px-3 sm:px-4">
        {/* 1. Heading & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 px-0">
          <h2 className="text-[24px] sm:text-[27px] lg:text-[29px] font-bold tracking-tight m-0 text-center leading-tight">
            <span style={{ color: primaryColor }}>{prefix} </span>
            <span className="text-[#192f59] font-bold">{highlight}</span>
          </h2>
          {subtitle && (
            <p className="mt-2 text-[13px] sm:text-[13.5px] lg:text-[14px] text-[#222222] leading-normal font-normal m-0 text-center max-w-[980px] mx-auto tracking-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. DESKTOP CAROUSEL VIEW: 4 Items per slide (hidden md:block) */}
        {/* Exact 1:1 match with First Image: larger icons, no dots       */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:block relative w-full max-w-[1140px] mx-auto px-5 sm:px-6 lg:px-8">
          {/* Previous Arrow - Aligned with Title Level */}
          <button
            type="button"
            onClick={() => desktopCarouselRef.current?.prev()}
            aria-label="Previous Feature"
            className="flex absolute -left-1 sm:-left-2 lg:-left-3 top-[92px] sm:top-[96px] lg:top-[100px] z-20 text-[#111111] hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer items-center justify-center active:scale-90"
          >
            <svg
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#111111]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next Arrow - Aligned with Title Level */}
          <button
            type="button"
            onClick={() => desktopCarouselRef.current?.next()}
            aria-label="Next Feature"
            className="flex absolute -right-1 sm:-right-2 lg:-right-3 top-[92px] sm:top-[96px] lg:top-[100px] z-20 text-[#111111] hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer items-center justify-center active:scale-90"
          >
            <svg
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#111111]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="w-full">
            <Carousel
              ref={desktopCarouselRef}
              autoplay={true}
              autoplaySpeed={3500}
              speed={600}
              dots={false}
              slidesToShow={4}
              slidesToScroll={1}
              infinite={whyChoose.length > 4}
              arrows={false}
              draggable
            >
              {whyChoose.map((item, idx) => (
                <div key={idx} className="px-2 sm:px-2.5 box-border outline-none py-1">
                  <div className="flex flex-col items-center text-center">
                    {/* Enlarged Icon/Logo matching First Image */}
                    {item.image && (
                      <div className="relative w-[70px] h-[70px] sm:w-[74px] sm:h-[74px] lg:w-[80px] lg:h-[80px] mx-auto mb-2.5 sm:mb-3 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain"
                          sizes="90px"
                          priority={idx < 4}
                        />
                      </div>
                    )}

                    {/* Card Title */}
                    <h3 className="text-[15px] sm:text-[15.5px] lg:text-[16px] font-bold text-[#192f59] m-0 mb-1.5 leading-snug text-center tracking-normal">
                      {item.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-[12.5px] sm:text-[13px] text-[#333333] leading-[1.55] tracking-normal font-normal m-0 text-center max-w-[215px] sm:max-w-[230px] mx-auto">
                      {item.desc || item.description}
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3. MOBILE VIEW: 1 Item per slide (md:hidden)                  */}
        {/* ------------------------------------------------------------- */}
        <div className="block md:hidden relative w-full max-w-[340px] mx-auto px-7">
          <button
            type="button"
            onClick={() => mobileCarouselRef.current?.prev()}
            aria-label="Previous Feature"
            className="absolute left-0 top-[62%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#ee3024] p-1.5 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => mobileCarouselRef.current?.next()}
            aria-label="Next Feature"
            className="absolute right-0 top-[62%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#ee3024] p-1.5 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          <div className="w-full [&_.slick-dots]:!relative [&_.slick-dots]:!mt-4 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2.5 [&_.slick-dots_li]:!h-2.5 [&_.slick-dots_li]:!mx-1 [&_.slick-dots_li_button]:!w-2.5 [&_.slick-dots_li_button]:!h-2.5 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-[#d9d9d9] [&_.slick-dots_li.slick-active_button]:!bg-[#999999]">
            <Carousel
              ref={mobileCarouselRef}
              autoplay={true}
              autoplaySpeed={3000}
              dots={true}
              slidesToShow={1}
              slidesToScroll={1}
              infinite={whyChoose.length > 1}
              arrows={false}
              draggable
            >
              {whyChoose.map((item, idx) => (
                <div key={idx} className="px-1 py-1 outline-none">
                  <div className="flex flex-col items-center text-center max-w-[280px] mx-auto">
                    {item.image && (
                      <div className="relative w-[85px] h-[85px] sm:w-[90px] sm:h-[90px] mx-auto mb-3 flex items-center justify-center shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain"
                          sizes="90px"
                          priority={idx === 0}
                        />
                      </div>
                    )}
                    <h3 className="text-[17px] font-bold text-[#192f59] m-0 mb-1 leading-snug text-center">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#333333] leading-relaxed font-normal m-0 text-center">
                      {item.desc || item.description}
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}

