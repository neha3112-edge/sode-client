"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gguImg, GGU_SPECIALIZATIONS } from "./constants";

export default function GguSpecializations({ onOpenApply }) {
  const carouselRef = useRef(null);
  const [activeTab, setActiveTab] = useState("dba");
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setSlidesToShow(1);
      } else if (w < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentList = GGU_SPECIALIZATIONS[activeTab] || [];

  return (
    <section id="specializations" className="w-full bg-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-black text-black leading-tight m-0 mb-1">
            {activeTab === "dba"
              ? "Online DBA Specialization at GGU"
              : "Online MBA Specialization at GGU"}
          </h2>
          <p className="text-[13.5px] sm:text-[14.5px] text-neutral-600 m-0">
            {activeTab === "dba"
              ? "(Doctorate of business administration)"
              : "(Master of business administration)"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <button
            type="button"
            onClick={() => {
              setActiveTab("dba");
              carouselRef.current?.goTo(0);
            }}
            className={`px-5 sm:px-7 py-2.5 rounded-[6px] text-[13.5px] sm:text-[14px] font-bold transition-all cursor-pointer border-none shadow-xs ${
              activeTab === "dba"
                ? "bg-[#DC520A] text-white"
                : "bg-[#f3f4f6] text-neutral-800 hover:bg-neutral-200"
            }`}
          >
            DBA Specialization
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("mba");
              carouselRef.current?.goTo(0);
            }}
            className={`px-5 sm:px-7 py-2.5 rounded-[6px] text-[13.5px] sm:text-[14px] font-bold transition-all cursor-pointer border-none shadow-xs ${
              activeTab === "mba"
                ? "bg-[#DC520A] text-white"
                : "bg-[#f3f4f6] text-neutral-800 hover:bg-neutral-200"
            }`}
          >
            MBA Specialization
          </button>
        </div>

        {/* Carousel Container with Left/Right Nav Arrows */}
        <div className="relative px-2 sm:px-6">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            aria-label="Previous Slide"
            className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-neutral-50 border border-gray-200 shadow-md flex items-center justify-center text-[#DC520A] cursor-pointer active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Ant Design Carousel with Equal Height Flex Track */}
          <div className="cursor-grab active:cursor-grabbing [&_.slick-track]:!flex [&_.slick-track]:items-stretch [&_.slick-slide]:!h-auto [&_.slick-slide>div]:!h-full [&_.slick-slide>div]:!flex">
            <Carousel
              key={`ggu-spec-${activeTab}-${slidesToShow}`}
              ref={carouselRef}
              dots={true}
              arrows={false}
              autoplay={true}
              autoplaySpeed={4500}
              slidesToShow={slidesToShow}
              slidesToScroll={1}
              infinite={true}
              draggable={true}
              swipe={true}
              touchMove={true}
              swipeToSlide={true}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    draggable: true,
                    swipe: true,
                  },
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    draggable: true,
                    swipe: true,
                  },
                },
              ]}
            >
              {currentList.map((item) => (
                <div key={item.id} className="p-2 sm:p-2.5 h-full w-full flex flex-col">
                  <div className="bg-white rounded-[14px] border border-gray-100 shadow-[0_3px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.09)] transition-all duration-200 overflow-hidden flex flex-col h-full w-full justify-between">
                    {/* Card Thumbnail */}
                    <div className="relative w-full aspect-[16/10] bg-gray-100 shrink-0">
                      <Image
                        src={gguImg(item.image)}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                        className="object-cover pointer-events-none"
                      />
                      {/* Thin bottom accent bar */}
                      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-pink-500 via-orange-400 to-[#003468]" />
                    </div>

                    {/* Card Body with Consistent Vertical Spacing */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-[16px] sm:text-[17px] font-bold text-neutral-900 m-0 mb-2 leading-snug min-h-[46px] flex items-center">
                          {item.title}
                        </h3>
                        <p className="text-neutral-600 text-[12.5px] sm:text-[13px] leading-relaxed m-0 mb-5 font-normal flex-1">
                          {item.description}
                        </p>
                      </div>

                      {/* Apply Now Button - Pinned to bottom */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => onOpenApply?.(item.title, "Apply Now")}
                          className="w-auto px-6 py-2 bg-[#003468] hover:bg-[#002246] text-white rounded-[5px] text-[13px] font-bold transition-colors border-none cursor-pointer active:scale-98"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            aria-label="Next Slide"
            className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-neutral-50 border border-gray-200 shadow-md flex items-center justify-center text-[#DC520A] cursor-pointer active:scale-95 transition-all"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}

