"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { normalizeApprovalItem } from "../ApprovalCard";

/**
 * Reusable Circular Badge Approvals Carousel Component (Global)
 *
 * FEATURES:
 * - Powered by Ant Design Carousel with smooth continuous linear card/badge motion.
 * - Circular logo badges matching official accreditation standards.
 * - Bold title + description split typography below each circular badge.
 * - Sharp chevron left/right navigation controls.
 * - Full data-driven configuration: dots toggle, responsive slides, container max-width.
 */
export default function ApprovalsSlider({
  approvals = [],
  activeUniversity = "University Online",
  activeTitle = "Accreditation & Recognition",
  subtitle,
  brand = {},
  intervalTime = 3500,
}) {
  const mobileCarouselRef = useRef(null);
  const desktopCarouselRef = useRef(null);
  const total = approvals?.length || 0;

  if (!total) return null;

  const prefixText =
    brand?.approvalsPrefix !== undefined
      ? brand.approvalsPrefix
      : brand?.approvalsShowUniversity !== false
        ? (activeUniversity || brand?.name || "")
        : "";

  const prefixColor = brand?.approvalsPrefixColor || "#111827";

  const highlightText =
    brand?.approvalsHighlight ||
    activeTitle ||
    brand?.approvalsTitle ||
    "Accreditation & Recognition";

  const highlightColor =
    brand?.approvalsHighlightColor ||
    brand?.approvalsHeaderColor ||
    "#ee3024";

  const showDots =
    brand?.approvalsCarousel?.dots !== undefined
      ? Boolean(brand.approvalsCarousel.dots)
      : Boolean(brand?.approvalsDots);

  const showMobileDots =
    brand?.approvalsCarousel?.mobileDots !== undefined
      ? Boolean(brand.approvalsCarousel.mobileDots)
      : showDots;

  const containerClass =
    brand?.approvalsContainerClassName ||
    (brand?.slug === "manipal"
      ? "max-w-[1180px] mx-auto px-2 sm:px-4"
      : "max-w-[1280px] xl:max-w-[1360px] min-[1600px]:max-w-[1520px] min-[1920px]:max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8");

  const renderItemText = (item, idx) => {
    const rawText = item.text || item.title || item.description || "";
    const colonIdx = rawText.indexOf(":");

    if (colonIdx !== -1) {
      const titlePart = rawText.slice(0, colonIdx + 1);
      const descPart = rawText.slice(colonIdx + 1);
      const cleanDesc = descPart.startsWith(" ") ? descPart : ` ${descPart}`;
      return (
        <p className="text-[11.5px] sm:text-[12px] lg:text-[12.5px] text-[#2b2b2b] leading-[1.35] mt-2 sm:mt-2.5 max-w-[220px] sm:max-w-[235px] lg:max-w-[245px] mx-auto text-center m-0 tracking-normal">
          <strong className="font-semibold text-[#111111]">{titlePart}</strong>
          <span className="text-[#2b2b2b] font-normal">{cleanDesc}</span>
        </p>
      );
    }

    return (
      <p className="text-[11.5px] sm:text-[12px] lg:text-[12.5px] text-[#2b2b2b] leading-[1.35] mt-2 sm:mt-2.5 max-w-[220px] sm:max-w-[235px] lg:max-w-[245px] mx-auto text-center m-0 tracking-normal">
        <strong className="font-semibold text-[#111111]">
          {item.title || item.tag || `Approval ${idx + 1}`}
        </strong>
        {item.description ? (
          <span className="text-[#2b2b2b] font-normal"> {item.description}</span>
        ) : null}
      </p>
    );
  };

  return (
    <section
      id={brand?.approvalsId || "approvals"}
      className="w-full pt-6 sm:pt-7 lg:pt-8 pb-7 sm:pb-8 lg:pb-9 bg-white border-b border-slate-100 select-none scroll-mt-20 overflow-hidden font-['Poppins',sans-serif]"
      style={{ backgroundColor: brand?.approvalsBg || "#ffffff" }}
    >
      <div className={containerClass}>
        {/* Section Heading & Subtitle */}
        <div className="text-center mb-5 sm:mb-6 max-w-5xl mx-auto">
          {brand?.approvalsTitleHtml ? (
            <div dangerouslySetInnerHTML={{ __html: brand.approvalsTitleHtml }} />
          ) : (
            <h2 className="text-[25px] sm:text-[28px] md:text-[31px] lg:text-[33px] font-bold tracking-tight leading-tight m-0">
              {prefixText && (
                <span style={{ color: prefixColor }}>
                  {prefixText}{" "}
                </span>
              )}
              <span style={{ color: highlightColor }}>
                {highlightText}
              </span>
            </h2>
          )}

          {subtitle && (
            <p className="text-[12.5px] sm:text-[13px] lg:text-[13.5px] text-[#333333] mt-2 max-w-[940px] lg:max-w-[965px] mx-auto leading-normal m-0 font-normal tracking-normal text-center">
              {subtitle}
            </p>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MOBILE VIEW: 2 Badges per slide (md:hidden)                   */}
        {/* ------------------------------------------------------------- */}
        <div className="block md:hidden relative w-full max-w-[420px] mx-auto px-6">
          <button
            type="button"
            onClick={() => mobileCarouselRef.current?.prev()}
            aria-label="Previous approval"
            className="absolute -left-1 top-[44%] -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center text-[#111111] hover:text-[#ee3024] p-1 bg-transparent border-none cursor-pointer active:scale-90"
          >
            <svg
              className="w-4 h-4 text-[#111111]"
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

          <button
            type="button"
            onClick={() => mobileCarouselRef.current?.next()}
            aria-label="Next approval"
            className="absolute -right-1 top-[44%] -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center text-[#111111] hover:text-[#ee3024] p-1 bg-transparent border-none cursor-pointer active:scale-90"
          >
            <svg
              className="w-4 h-4 text-[#111111]"
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

          <div className="w-full [&_.slick-dots]:!relative [&_.slick-dots]:!mt-4 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2.5 [&_.slick-dots_li]:!h-2.5 [&_.slick-dots_li]:!mx-1 [&_.slick-dots_li_button]:!w-2.5 [&_.slick-dots_li_button]:!h-2.5 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-[#d9d9d9] [&_.slick-dots_li.slick-active_button]:!bg-[#999999]">
            <Carousel
              ref={mobileCarouselRef}
              autoplay={brand?.approvalsCarousel?.autoplay !== false}
              autoplaySpeed={brand?.approvalsCarousel?.interval || intervalTime}
              speed={600}
              easing="linear"
              pauseOnHover
              dots={showMobileDots}
              infinite={total > 2}
              slidesToShow={brand?.approvalsCarousel?.mobileSlides || 2}
              slidesToScroll={brand?.approvalsCarousel?.mobileSlides || 2}
              arrows={false}
              draggable
            >
              {approvals.map((item, idx) => {
                const data = normalizeApprovalItem(item, idx);
                return (
                  <div
                    key={data.id || `mobile-approval-slide-${idx}`}
                    className="py-1 px-1 focus:outline-none select-none"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-28 h-28 xs:w-32 xs:h-32 mx-auto flex items-center justify-center">
                        {data.image ? (
                          <Image
                            src={data.image}
                            alt={data.title || data.tag || "Approval"}
                            fill
                            className="object-contain select-none"
                            sizes="150px"
                            priority={idx < 2}
                          />
                        ) : null}
                      </div>
                      <div className="max-w-[160px] mx-auto mt-1">
                        {renderItemText(item, idx)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP VIEW: 4 Badges per slide (hidden md:block)            */}
        {/* Exact match with Reference Image: bold chevrons, linear speed */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:block relative w-full px-6 sm:px-7 lg:px-8">
          {/* Previous Arrow - Vertically Centered with Badges */}
          <button
            type="button"
            onClick={() => desktopCarouselRef.current?.prev()}
            aria-label="Previous approval"
            className="absolute left-0 sm:left-1 top-[95px] sm:top-[100px] -translate-y-1/2 z-20 flex items-center justify-center text-[#111111] hover:text-[#ee3024] transition-colors bg-transparent border-none cursor-pointer active:scale-90 p-1"
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

          {/* Next Arrow - Vertically Centered with Badges */}
          <button
            type="button"
            onClick={() => desktopCarouselRef.current?.next()}
            aria-label="Next approval"
            className="absolute right-0 sm:right-1 top-[95px] sm:top-[100px] -translate-y-1/2 z-20 flex items-center justify-center text-[#111111] hover:text-[#ee3024] transition-colors bg-transparent border-none cursor-pointer active:scale-90 p-1"
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

          <div className="w-full [&_.slick-dots]:!relative [&_.slick-dots]:!mt-3.5 sm:[&_.slick-dots]:!mt-4 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2 [&_.slick-dots_li]:!h-2 [&_.slick-dots_li]:!mx-1 [&_.slick-dots_li_button]:!w-2 [&_.slick-dots_li_button]:!h-2 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-slate-300 [&_.slick-dots_li.slick-active_button]:!bg-[#ee3024]">
            <Carousel
              ref={desktopCarouselRef}
              autoplay={brand?.approvalsCarousel?.autoplay !== false}
              autoplaySpeed={brand?.approvalsCarousel?.interval || intervalTime}
              speed={600}
              easing="linear"
              pauseOnHover
              dots={showDots}
              infinite={total > 4}
              slidesToShow={brand?.approvalsCarousel?.desktopSlides || 4}
              slidesToScroll={1}
              arrows={false}
              draggable
              responsive={[
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: brand?.approvalsCarousel?.desktopSlides || 4,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
              ]}
            >
              {approvals.map((item, idx) => {
                const data = normalizeApprovalItem(item, idx);
                return (
                  <div
                    key={data.id || `approval-slide-${idx}`}
                    className="py-1 px-1.5 sm:px-2 md:px-2.5 focus:outline-none select-none"
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Circular Badge Logo (renders 175-195px diameter matching Target Image 1) */}
                      <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-[195px] lg:h-[195px] mx-auto flex items-center justify-center transition-transform duration-300 hover:scale-105">
                        {data.image ? (
                          <Image
                            src={data.image}
                            alt={data.title || data.tag || "Approval"}
                            fill
                            className="object-contain select-none"
                            sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 200px"
                            priority={idx < 4}
                          />
                        ) : null}
                      </div>

                      {/* Descriptive Text below circle */}
                      {renderItemText(item, idx)}
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
