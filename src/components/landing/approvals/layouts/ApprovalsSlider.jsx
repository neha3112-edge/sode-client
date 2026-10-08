"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { normalizeApprovalItem } from "../ApprovalCard";

/**
 * Reusable Circular Badge Approvals Carousel Component
 *
 * FEATURES:
 * - Powered by Ant Design Carousel with infinite right-to-left loop autoplay.
 * - Circular logo badges with prominent theme-colored border and ambient glow shadow.
 * - Bold title + description split typography below each circular badge.
 * - Left and Right navigation buttons with smooth transitions.
 * - 100% Reusable, responsive and data-driven across all university landing pages.
 */
export default function ApprovalsSlider({
  approvals = [],
  activeUniversity = "University Online",
  activeTitle = "Accreditation & Recognition",
  subtitle,
  brand = {},
  intervalTime = 3000,
}) {
  const mobileCarouselRef = useRef(null);
  const desktopCarouselRef = useRef(null);
  const total = approvals?.length || 0;

  if (!total) return null;

  const circleBorder =
    brand?.approvalsBorderColor ||
    brand?.primaryColor ||
    "#f35a06";

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

  const renderItemText = (item, idx) => {
    const rawText = item.text || item.title || item.description || "";
    const colonIdx = rawText.indexOf(":");

    if (colonIdx !== -1) {
      const titlePart = rawText.slice(0, colonIdx + 1);
      const descPart = rawText.slice(colonIdx + 1);
      return (
        <p className="text-[11px] sm:text-[12px] md:text-[12.5px] lg:text-[13px] text-slate-800 leading-[1.38] sm:leading-[1.45] mt-2 sm:mt-2.5 max-w-[155px] sm:max-w-[200px] md:max-w-[240px] mx-auto text-center m-0">
          <strong className="font-bold text-slate-900">{titlePart}</strong>
          <span className="text-slate-700 font-normal">{descPart}</span>
        </p>
      );
    }

    return (
      <p className="text-[11px] sm:text-[12px] md:text-[12.5px] lg:text-[13px] text-slate-800 leading-[1.38] sm:leading-[1.45] mt-2 sm:mt-2.5 max-w-[155px] sm:max-w-[200px] md:max-w-[240px] mx-auto text-center m-0">
        <strong className="font-bold text-slate-900">
          {item.title || item.tag || `Approval ${idx + 1}`}
        </strong>
        {item.description ? (
          <span className="text-slate-700 font-normal"> {item.description}</span>
        ) : null}
      </p>
    );
  };

  return (
    <section
      id={brand?.approvalsId || "approvals"}
      className="w-full py-4 sm:py-5 lg:py-6 bg-white border-b border-slate-200/80 select-none scroll-mt-20 overflow-hidden"
      style={{ backgroundColor: brand?.approvalsBg || "#ffffff" }}
    >
      <div className="max-w-[1280px] xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-3 sm:mb-4 max-w-4xl mx-auto">
          {brand?.approvalsTitleHtml ? (
            <div dangerouslySetInnerHTML={{ __html: brand.approvalsTitleHtml }} />
          ) : (
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight leading-tight m-0">
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
            <p className="text-xs sm:text-[13px] text-slate-600 mt-1 max-w-3xl mx-auto leading-relaxed m-0 font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MOBILE VIEW: Exactly 2 Badges per slide (md:hidden)           */}
        {/* ------------------------------------------------------------- */}
        <div className="block md:hidden relative w-full max-w-[420px] mx-auto px-6">
          <button
            type="button"
            onClick={() => mobileCarouselRef.current?.prev()}
            aria-label="Previous approval"
            className="absolute -left-1 top-[35%] -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center text-slate-800 hover:text-[#ee3024] p-1 bg-transparent border-none cursor-pointer active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => mobileCarouselRef.current?.next()}
            aria-label="Next approval"
            className="absolute -right-1 top-[35%] -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center text-slate-800 hover:text-[#ee3024] p-1 bg-transparent border-none cursor-pointer active:scale-90"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          <div className="w-full [&_.slick-dots]:!relative [&_.slick-dots]:!mt-3.5 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2.5 [&_.slick-dots_li]:!h-2.5 [&_.slick-dots_li]:!mx-1.5 [&_.slick-dots_li_button]:!w-2.5 [&_.slick-dots_li_button]:!h-2.5 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-slate-300 [&_.slick-dots_li.slick-active_button]:!bg-slate-500">
            <Carousel
              ref={mobileCarouselRef}
              autoplay={brand?.approvalsCarousel?.autoplay !== false}
              autoplaySpeed={brand?.approvalsCarousel?.interval || intervalTime}
              pauseOnHover
              dots={brand?.approvalsCarousel?.dots !== undefined ? brand.approvalsCarousel.dots : (brand?.approvalsDots ?? true)}
              infinite={total > 2}
              slidesToShow={2}
              slidesToScroll={2}
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
                      {/* Badge image directly - no nested border */}
                      <div className="relative w-28 h-28 xs:w-[120px] xs:h-[120px] mx-auto flex items-center justify-center transition-transform duration-300">
                        <Image
                          src={data.image}
                          alt={data.title || data.tag || "Approval"}
                          fill
                          className="object-contain select-none"
                          sizes="130px"
                          priority={idx < 2}
                        />
                      </div>
                      <div className="max-w-[145px] mx-auto mt-1">
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
        {/* DESKTOP VIEW: Multiple Badges per slide (hidden md:block)     */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:block relative w-full px-5 sm:px-8 lg:px-10">
          <button
            type="button"
            onClick={() => desktopCarouselRef.current?.prev()}
            aria-label="Previous approval"
            className="absolute left-0 sm:left-1 lg:left-2 top-[35%] sm:top-[38%] -translate-y-1/2 z-20 w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-slate-800 hover:text-[#ee3024] transition-all bg-transparent border-none cursor-pointer active:scale-90 p-0"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => desktopCarouselRef.current?.next()}
            aria-label="Next approval"
            className="absolute right-0 sm:right-1 lg:right-2 top-[35%] sm:top-[38%] -translate-y-1/2 z-20 w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-slate-800 hover:text-[#ee3024] transition-all bg-transparent border-none cursor-pointer active:scale-90 p-0"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>

          <div className="w-full [&_.slick-dots]:!relative [&_.slick-dots]:!mt-3.5 sm:[&_.slick-dots]:!mt-4 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2 [&_.slick-dots_li]:!h-2 [&_.slick-dots_li]:!mx-1 [&_.slick-dots_li_button]:!w-2 [&_.slick-dots_li_button]:!h-2 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-slate-300 [&_.slick-dots_li.slick-active_button]:!bg-slate-400">
            <Carousel
              ref={desktopCarouselRef}
              autoplay={brand?.approvalsCarousel?.autoplay !== false}
              autoplaySpeed={brand?.approvalsCarousel?.interval || intervalTime}
              pauseOnHover
              dots={brand?.approvalsCarousel?.dots !== undefined ? brand.approvalsCarousel.dots : (brand?.approvalsDots ?? false)}
              infinite={total > 1}
              slidesToShow={brand?.approvalsCarousel?.desktopSlides || 4}
              slidesToScroll={1}
              responsive={[
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: brand?.approvalsCarousel?.desktopSlides || 4,
                  },
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: Math.min(3, brand?.approvalsCarousel?.desktopSlides || 4),
                  },
                },
              ]}
            >
              {approvals.map((item, idx) => {
                const data = normalizeApprovalItem(item, idx);
                return (
                  <div
                    key={data.id || `approval-slide-${idx}`}
                    className="py-1 px-1.5 sm:px-2 md:px-3 focus:outline-none select-none"
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Badge image directly - no nested border, fills nicely */}
                      <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-[190px] lg:h-[190px] xl:w-[200px] xl:h-[200px] mx-auto flex items-center justify-center transition-transform duration-300 hover:scale-105">
                        <Image
                          src={data.image}
                          alt={data.title || data.tag || "Approval"}
                          fill
                          className="object-contain select-none"
                          sizes="(max-width: 640px) 140px, (max-width: 1024px) 185px, 210px"
                          priority={idx < 4}
                        />
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
