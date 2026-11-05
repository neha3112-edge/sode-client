"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ManipalProgrammes({
  programmes = [],
  universityName = "Manipal University Online",
  brand = {},
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const desktopCarouselRef = useRef(null);
  const mobileCarouselRef = useRef(null);

  const displayUniversity = (universityName || brand.name || "Manipal University Online")
    .replace(/\s+Online$/i, "")
    .trim();

  const cardLogo =
    brand.programmeLogo ||
    brand.logo ||
    "/assets/manipal_v1_images/manipal-logo.webp";

  return (
    <section
      id="programs"
      className="w-full overflow-hidden relative select-none pt-3 sm:pt-5 lg:pt-7 pb-9 sm:pb-11 lg:pb-14 scroll-mt-20 font-['Poppins',sans-serif]"
      style={{ backgroundColor: brand.programmesBg || "#f4ece6" }}
    >
      {/* 1. Section Title */}
      <div className="text-center mb-2 sm:mb-4 lg:mb-6 px-4 max-w-4xl mx-auto">
        <h2 className="text-[25px] sm:text-[29px] lg:text-[32px] font-medium m-0 tracking-normal leading-normal">
          <span className="text-[#ee3024]">
            {brand.programmesPrefix || "Programs Offered by "}
          </span>
          <span className="text-[#000]">
            {brand.programmesHighlight || displayUniversity}
          </span>
        </h2>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. DESKTOP CAROUSEL VIEW (hidden below md, active on md & up) */}
      {/* Exact 1:1 match with Image 1: 346px width, 409px height       */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden md:block w-full max-w-[1140px] mx-auto relative px-7 sm:px-9 lg:px-10">
        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={() => desktopCarouselRef.current?.prev()}
          aria-label="Previous programme"
          className="absolute -left-2 sm:-left-3 lg:-left-4 top-1/2 -translate-y-1/2 z-20 text-[#111111] hover:text-[#ee3024] p-1.5 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={() => desktopCarouselRef.current?.next()}
          aria-label="Next programme"
          className="absolute -right-2 sm:-right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-20 text-[#111111] hover:text-[#ee3024] p-1.5 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90 transition-colors"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
        </button>

        <div className="w-full">
          <Carousel
            ref={desktopCarouselRef}
            autoplay={true}
            autoplaySpeed={4000}
            speed={700}
            dots={false}
            slidesToShow={3}
            slidesToScroll={1}
            infinite={programmes.length > 3}
            arrows={false}
            draggable
          >
            {programmes.map((c, idx) => (
              <div
                key={`desktop-${c.id || c.code}-${idx}`}
                className="box-border px-2 sm:px-2.5 py-2 outline-none"
              >
                {/* Single Card: 1:1 Match with Target Image 1 */}
                <div className="bg-white rounded-[6px] shadow-[0px_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0px_4px_18px_rgba(0,0,0,0.12)] px-[20px] sm:px-[22px] pt-[24px] sm:pt-[26px] pb-[26px] sm:pb-[28px] flex flex-col justify-between h-[410px] text-left border-none transition-shadow select-text">
                  {/* Top content */}
                  <div>
                    {/* Course Code (e.g. BBA, BCA, BCOM, MBA, MCOM, MSC) */}
                    <h3 className="text-[27px] sm:text-[28px] font-semibold text-[#212529] m-0 tracking-tight leading-none">
                      {c.code || c.id?.toUpperCase()}
                    </h3>

                    {/* Course Full Title / Subtitle */}
                    <h4 className="text-[20px] sm:text-[21px] font-normal text-[#212529] mt-2 sm:mt-2.5 mb-3 sm:mb-3.5 leading-[1.15] min-h-[48px] sm:min-h-[50px] line-clamp-2 overflow-hidden tracking-normal">
                      {c.title}
                    </h4>

                    {/* Description Paragraph */}
                    <p className="text-[13.5px] sm:text-[14px] text-[#212529] leading-[21px] font-normal m-0 line-clamp-6 overflow-hidden tracking-normal">
                      {c.description}
                    </p>
                  </div>

                  {/* Bottom Logo & Action Button */}
                  <div className="mt-4 pt-1">
                    {cardLogo && (
                      <div className="relative w-[110px] sm:w-[115px] h-[26px] sm:h-[28px] mb-3.5">
                        <Image
                          src={cardLogo}
                          alt={brand.name || "University Logo"}
                          fill
                          className="object-contain object-left"
                          sizes="130px"
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                      className="w-full h-[42px] sm:h-[44px] rounded-[5px] bg-gradient-to-r from-[#ee3024] to-[#ff6600] text-white font-medium text-[14.5px] sm:text-[15px] flex items-center justify-center gap-2 cursor-pointer border-none shadow-xs hover:opacity-95 active:scale-[0.98] transition-all"
                    >
                      <span>Download Brochure</span>
                      <svg
                        className="w-3.5 h-3.5 fill-current shrink-0"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 1a.75.75 0 0 1 .75.75v6.69l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V1.75A.75.75 0 0 1 8 1zm-6 10.5a.75.75 0 0 1 .75.75v1.25c0 .138.112.25.25.25h10a.25.25 0 0 0 .25-.25v-1.25a.75.75 0 0 1 1.5 0v1.25A1.75 1.75 0 0 1 13 15H3a1.75 1.75 0 0 1-1.75-1.75v-1.25a.75.75 0 0 1 .75-.75z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. MOBILE CAROUSEL VIEW (active below md)                      */}
      {/* ------------------------------------------------------------- */}
      <div className="block md:hidden relative w-full max-w-[340px] sm:max-w-[360px] mx-auto px-6">
        <button
          type="button"
          onClick={() => mobileCarouselRef.current?.prev()}
          aria-label="Previous programme"
          className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 text-[#111111] hover:text-[#ee3024] p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={() => mobileCarouselRef.current?.next()}
          aria-label="Next programme"
          className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 text-[#111111] hover:text-[#ee3024] p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="w-full">
          <Carousel
            ref={mobileCarouselRef}
            autoplay={true}
            autoplaySpeed={4000}
            dots={false}
            slidesToShow={1}
            slidesToScroll={1}
            infinite={programmes.length > 1}
            arrows={false}
            draggable
          >
            {programmes.map((c, idx) => (
              <div
                key={`mobile-${c.id || c.code}-${idx}`}
                className="box-border px-1.5 py-1 outline-none"
              >
                <div className="bg-white rounded-[6px] shadow-[0px_2px_12px_rgba(0,0,0,0.08)] px-[20px] pt-[32px] pb-[26px] flex flex-col justify-between h-[410px] text-left border-none select-text">
                  <div>
                    <h3 className="text-[26px] font-bold text-[#212529] m-0 tracking-tight leading-none">
                      {c.code || c.id?.toUpperCase()}
                    </h3>

                    <h4 className="text-[18px] font-medium text-[#212529] mt-3 mb-3 leading-[1.25] min-h-[46px] line-clamp-2">
                      {c.title}
                    </h4>

                    <p className="text-[13px] text-[#212529] leading-[20px] font-normal m-0 line-clamp-6">
                      {c.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-1">
                    {cardLogo && (
                      <div className="relative w-[110px] h-[26px] mb-3.5">
                        <Image
                          src={cardLogo}
                          alt={brand.name || "University Logo"}
                          fill
                          className="object-contain object-left"
                          sizes="120px"
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                      className="w-full h-[42px] rounded-[5px] bg-gradient-to-r from-[#ee3024] to-[#ff6600] text-white font-medium text-[14.5px] flex items-center justify-center gap-2 cursor-pointer border-none shadow-xs active:scale-[0.98] transition-all"
                    >
                      <span>Download Brochure</span>
                      <svg
                        className="w-3.5 h-3.5 fill-current shrink-0"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 1a.75.75 0 0 1 .75.75v6.69l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V1.75A.75.75 0 0 1 8 1zm-6 10.5a.75.75 0 0 1 .75.75v1.25c0 .138.112.25.25.25h10a.25.25 0 0 0 .25-.25v-1.25a.75.75 0 0 1 1.5 0v1.25A1.75 1.75 0 0 1 13 15H3a1.75 1.75 0 0 1-1.75-1.75v-1.25a.75.75 0 0 1 .75-.75z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
