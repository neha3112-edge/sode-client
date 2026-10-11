"use client";

import React, { useRef } from "react";
import { Carousel } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PartnerLogoIcon, formatTwoLineText } from "./CategoryIcons";

export default function UniversityCarouselBlock({
  block,
  slidesToShowCount = 8,
  handleSlidePointerDown,
  handleSlidePointerMove,
  handleSlideClick,
}) {
  const carouselRef = useRef(null);
  const effectiveSlidesCount = Math.min(Number(slidesToShowCount) || 8, 8);
  const hasMultipleItems = Array.isArray(block?.children) && block.children.length > effectiveSlidesCount;

  return (
    <div className="relative w-full mx-auto group/carousel">
      {/* Left Chevron - Overlay vertically centered on top */}
      {hasMultipleItems && (
        <button
          type="button"
          onClick={() => carouselRef.current?.prev()}
          aria-label="Previous partners"
          className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 bg-white/95 hover:bg-white text-slate-700 flex items-center justify-center shadow-md cursor-pointer hover:border-blue-400 hover:text-blue-600 active:scale-95 transition-all z-20"
        >
          <ChevronLeft size={15} />
        </button>
      )}

      {/* Antd Carousel Container - 100% full width to align perfectly with cards grid */}
      <Carousel
        ref={carouselRef}
        arrows={false}
        key={effectiveSlidesCount}
        autoplay={true}
        autoplaySpeed={4000}
        pauseOnHover={true}
        dots={false}
        draggable={true}
        swipe={true}
        swipeToSlide={true}
        touchMove={true}
        touchThreshold={10}
        slidesToShow={effectiveSlidesCount}
        slidesToScroll={1}
        className="w-full relative"
      >
        {block.children.map((child, idx) => (
          <div key={child._id || idx} className="px-0.75 sm:px-1.25 py-0.5">
            <div
              onPointerDown={handleSlidePointerDown}
              onPointerMove={handleSlidePointerMove}
              onClick={(e) => handleSlideClick(e, child)}
              className="w-full aspect-square bg-white hover:bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2 sm:p-2.5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-200 group min-w-0"
            >
              <div className="mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                <PartnerLogoIcon partner={child} />
              </div>
              <div className="flex items-center justify-center w-full min-w-0 px-0.5">
                <h5 className="m-0 text-[9.5px] min-[360px]:text-[10px] sm:text-[10.5px] leading-[1.1] font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-center w-full min-w-0">
                  {formatTwoLineText(child.name)}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Right Chevron - Overlay vertically centered on top */}
      {hasMultipleItems && (
        <button
          type="button"
          onClick={() => carouselRef.current?.next()}
          aria-label="Next partners"
          className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 bg-white/95 hover:bg-white text-slate-700 flex items-center justify-center shadow-md cursor-pointer hover:border-blue-400 hover:text-blue-600 active:scale-95 transition-all z-20"
        >
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
