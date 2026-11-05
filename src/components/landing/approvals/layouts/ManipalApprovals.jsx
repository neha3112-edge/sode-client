"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function ManipalApprovals({
  approvals = [],
  activeUniversity = "Manipal University Online",
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
        ? (activeUniversity || brand?.name || "Manipal University Online")
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
      const cleanDesc = descPart.startsWith(" ") ? descPart : ` ${descPart}`;
      return (
        <p className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-[#333333] leading-[1.38] mt-2 sm:mt-2.5 max-w-[205px] sm:max-w-[220px] mx-auto text-center m-0 tracking-normal">
          <strong className="font-bold text-[#111111]">{titlePart}</strong>
          <span className="text-[#333333] font-normal">{cleanDesc}</span>
        </p>
      );
    }

    return (
      <p className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-[#333333] leading-[1.38] mt-2 sm:mt-2.5 max-w-[205px] sm:max-w-[220px] mx-auto text-center m-0 tracking-normal">
        <strong className="font-bold text-[#111111]">
          {item.title || item.tag || `Approval ${idx + 1}`}
        </strong>
        {item.description ? (
          <span className="text-[#333333] font-normal"> {item.description}</span>
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
      {/* Container aligned with FAQ section max-width (1140px) */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        {/* Section Heading & Subtitle */}
        <div className="text-center mb-5 sm:mb-6 max-w-4xl mx-auto">
          {brand?.approvalsTitleHtml ? (
            <div dangerouslySetInnerHTML={{ __html: brand.approvalsTitleHtml }} />
          ) : (
            <h2 className="text-[23px] sm:text-[27px] lg:text-[30px] font-bold tracking-tight leading-tight m-0">
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
            <p className="text-[12px] sm:text-[13px] text-[#333333] mt-1.5 max-w-[850px] mx-auto leading-relaxed m-0 font-normal tracking-normal text-center">
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
            className="absolute -left-1 top-[35%] -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center text-[#111111] hover:text-[#ee3024] p-1 bg-transparent border-none cursor-pointer active:scale-90"
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
            className="absolute -right-1 top-[35%] -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center text-[#111111] hover:text-[#ee3024] p-1 bg-transparent border-none cursor-pointer active:scale-90"
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

          <div className="w-full">
            <Carousel
              ref={mobileCarouselRef}
              autoplay={true}
              autoplaySpeed={intervalTime}
              speed={600}
              easing="linear"
              pauseOnHover
              dots={false}
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
                      <div className="relative w-28 h-28 xs:w-[130px] xs:h-[130px] mx-auto flex items-center justify-center">
                        {data.image ? (
                          <Image
                            src={data.image}
                            alt={data.title || data.tag || "Approval"}
                            fill
                            className="object-contain select-none"
                            sizes="130px"
                            priority={idx < 2}
                          />
                        ) : null}
                      </div>
                      <div className="max-w-[155px] mx-auto mt-1">
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
        {/* Exact 1:1 match with First Image: bold arrows, no dots, 1140px */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:block relative w-full px-5 sm:px-6 lg:px-8">
          {/* Previous Arrow - Vertically Centered with Badges */}
          <button
            type="button"
            onClick={() => desktopCarouselRef.current?.prev()}
            aria-label="Previous approval"
            className="absolute -left-1 sm:-left-2 lg:-left-3.5 top-[80px] sm:top-[85px] lg:top-[90px] -translate-y-1/2 z-20 flex items-center justify-center text-[#111111] hover:text-[#ee3024] transition-colors bg-transparent border-none cursor-pointer active:scale-90 p-1"
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
            className="absolute -right-1 sm:-right-2 lg:-right-3.5 top-[80px] sm:top-[85px] lg:top-[90px] -translate-y-1/2 z-20 flex items-center justify-center text-[#111111] hover:text-[#ee3024] transition-colors bg-transparent border-none cursor-pointer active:scale-90 p-1"
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
              easing="linear"
              pauseOnHover
              dots={false}
              infinite={total > 4}
              slidesToShow={4}
              slidesToScroll={1}
              arrows={false}
              draggable
              responsive={[
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: 4,
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
                      {/* Circular Badge Logo (renders 140px diameter ring matching Target Image 1) */}
                      <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-[176px] lg:h-[176px] mx-auto flex items-center justify-center transition-transform duration-300 hover:scale-105">
                        {data.image ? (
                          <Image
                            src={data.image}
                            alt={data.title || data.tag || "Approval"}
                            fill
                            className="object-contain select-none"
                            sizes="(max-width: 640px) 140px, (max-width: 1024px) 176px, 180px"
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
