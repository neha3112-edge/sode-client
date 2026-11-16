"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { esgciImg, ESGCI_WHY_CHOOSE } from "./constants";

export default function EsgciWhyChoose({ onOpenApply }) {
  const carouselRef = useRef(null);
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

  return (
    <section id="why-choose" className="w-full bg-white pt-6 sm:pt-8 pb-4 sm:pb-5 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Heading - Compact Spacing */}
        <div className="text-center mb-5 sm:mb-7">
          <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-black text-black leading-tight m-0">
            Why Choose ESGCI Online DBA Program
          </h2>
        </div>

        {/* Carousel Container with Left/Right Nav Arrows */}
        <div className="relative px-2 sm:px-6">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            aria-label="Previous Slide"
            className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-neutral-50 border border-gray-200 shadow-md flex items-center justify-center text-[#04903c] cursor-pointer active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Ant Design Carousel */}
          <div className="cursor-grab active:cursor-grabbing">
            <Carousel
              key={`esgci-whychoose-${slidesToShow}`}
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
              {ESGCI_WHY_CHOOSE.map((item) => (
                <div key={item.title} className="p-2 sm:p-2.5 h-full">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col h-full min-h-[380px] justify-between">
                    {/* Card Image */}
                    <div className="relative w-full aspect-[16/10] bg-gray-100 shrink-0">
                      <Image
                        src={esgciImg(item.image)}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                        className="object-cover pointer-events-none"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-[16px] sm:text-[17px] font-bold text-neutral-900 m-0 mb-2 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-neutral-600 text-[12.5px] sm:text-[13px] leading-relaxed m-0 mb-4 font-normal">
                          {item.desc}
                        </p>
                      </div>

                      {/* Apply Now Button */}
                      <div>
                        <button
                          type="button"
                          onClick={() => onOpenApply?.(item.title, "Apply Now")}
                          className="w-auto px-5 py-2 bg-[#04903c] hover:bg-[#037a33] text-white rounded-[4px] text-[13px] font-semibold transition-colors border-none cursor-pointer active:scale-98"
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
            className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-neutral-50 border border-gray-200 shadow-md flex items-center justify-center text-[#04903c] cursor-pointer active:scale-95 transition-all"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
