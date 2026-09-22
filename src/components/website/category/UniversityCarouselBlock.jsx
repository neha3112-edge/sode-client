"use client";

import React from "react";
import { Carousel } from "antd";
import { PartnerLogoIcon, formatTwoLineText } from "./CategoryIcons";

export default function UniversityCarouselBlock({
  block,
  slidesToShowCount,
  handleSlidePointerDown,
  handleSlidePointerMove,
  handleSlideClick,
}) {
  return (
    <div className="relative w-full mx-auto min-h-22.5 sm:min-h-27.5">
      <Carousel
        arrows={true}
        key={slidesToShowCount}
        autoplay={true}
        autoplaySpeed={4000}
        pauseOnHover={true}
        dots={false}
        draggable={true}
        swipe={true}
        swipeToSlide={true}
        touchMove={true}
        touchThreshold={10}
        slidesToShow={slidesToShowCount}
        slidesToScroll={1}
        className="w-full relative"
      >
        {block.children.map((child, idx) => (
          <div key={child._id || idx} className="px-1 py-0.5">
            <div
              onPointerDown={handleSlidePointerDown}
              onPointerMove={handleSlidePointerMove}
              onClick={(e) => handleSlideClick(e, child)}
              className="w-full aspect-square bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl p-1 min-[360px]:p-1.5 sm:p-2 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all duration-200 hover:shadow hover:-translate-y-0.5 group min-w-0"
            >
              <div className="mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                <PartnerLogoIcon partner={child} />
              </div>
              <div className="h-6 min-[360px]:h-7 sm:h-8 flex items-center justify-center w-full min-w-0">
                <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight px-0.5 min-w-0 leading-tight line-clamp-2">
                  {formatTwoLineText(child.name)}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
