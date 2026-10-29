"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { normalizeApprovalItem } from "../ApprovalCard";
import LandingContainer from "../../LandingContainer";

export default function SmuApprovals({ approvals = [], title, subtitle, brand = {} }) {
  const carouselRef = useRef(null);

  if (!approvals || approvals.length === 0) return null;

  const displayTitle = title || brand?.approvalsTitle || "Rankings & Accreditations";

  return (
    <section
      id="approvals"
      className="w-full py-8 sm:py-12 bg-[#efefef] select-none scroll-mt-20 overflow-hidden"
      style={{ backgroundColor: brand?.approvalsBg || "#efefef" }}
    >
      <LandingContainer className="text-center px-3 sm:px-6">
        <div className="text-center w-full max-w-[1200px] mx-auto mb-6 sm:mb-8 lg:mb-10 px-1 sm:px-4">
          <h2 className={brand?.approvalsTitleClassName || "text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-semibold text-[#111827] tracking-tight leading-[1.25] m-0 mb-3 sm:mb-4 max-w-[340px] sm:max-w-xl md:max-w-2xl mx-auto"}>
            {typeof displayTitle === "string" && displayTitle.includes("Rankings & Accreditations") ? (
              <>
                <span className="block sm:inline">Sikkim Manipal University </span>
                <span className="block sm:inline">Online Rankings & </span>
                <span className="block sm:inline">Accreditations</span>
              </>
            ) : (
              displayTitle
            )}
          </h2>
          {subtitle && (
            <p className={brand?.approvalsSubtitleClassName || "text-[12px] sm:text-[12.5px] md:text-[13px] lg:text-[13.5px] text-[#444444] leading-[1.5] font-normal m-0 max-w-[1100px] mx-auto text-center px-1 sm:px-2"}>
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative w-full max-w-[760px] sm:max-w-[860px] md:max-w-[920px] mx-auto px-7 sm:px-10 lg:px-12">
          {/* Smooth Previous Button */}
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            aria-label="Previous approval"
            className="absolute left-0 sm:left-1 top-[42%] -translate-y-1/2 z-20 p-1 text-[#111827] hover:text-[#074a76] bg-transparent border-none shadow-none cursor-pointer flex items-center justify-center transition-transform active:scale-90 focus:outline-none"
          >
            <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
          </button>

          {/* Smooth Sliding Carousel - Exactly 2 items at a time */}
          <div className="w-full [&_.slick-track]:!flex [&_.slick-track]:!items-start [&_.slick-slide]:!h-auto [&_.slick-slide>div]:!h-full">
            <Carousel
              ref={carouselRef}
              autoplay
              autoplaySpeed={3500}
              speed={600}
              infinite={approvals.length > 2}
              slidesToShow={2}
              slidesToScroll={1}
              arrows={false}
              dots={false}
              draggable
            >
              {approvals.map((appr, idx) => {
                const data = normalizeApprovalItem(appr, idx);
                const textContent = appr.text || data.text || data.title;
                return (
                  <div
                    key={`${data.id}-${idx}`}
                    className="px-2 sm:px-3 focus:outline-none select-none"
                  >
                    <div className="flex flex-col items-center justify-start text-center py-1">
                      {/* Increased size for logos */}
                      <div className="relative w-36 sm:w-44 md:w-48 h-24 sm:h-28 md:h-30 mb-2.5 sm:mb-3 flex items-center justify-center">
                        <Image
                          src={data.image}
                          alt={textContent || "Approval"}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
                        />
                      </div>
                      {textContent && (
                        <p className="text-[13.5px] sm:text-[14px] lg:text-[14.5px] font-normal text-[#1e293b] leading-[1.35] text-center max-w-[170px] sm:max-w-[195px] mx-auto m-0">
                          {textContent}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>

          {/* Smooth Next Button */}
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            aria-label="Next approval"
            className="absolute right-0 sm:right-1 top-[42%] -translate-y-1/2 z-20 p-1 text-[#111827] hover:text-[#074a76] bg-transparent border-none shadow-none cursor-pointer flex items-center justify-center transition-transform active:scale-90 focus:outline-none"
          >
            <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
          </button>
        </div>
      </LandingContainer>
    </section>
  );
}
