"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Carousel, Button } from "antd";
import { ChevronLeft, ChevronRight, Hourglass } from "lucide-react";
import { FaDownload } from "react-icons/fa";

/**
 * UPES Online Degree Courses Section
 * Synchronized with https://distanceeducationschool.com/upes/
 */
export default function UpesProgrammes({
  programmes = [],
  brand = {},
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const carouselRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
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

  if (!programmes?.length) return null;

  return (
    <section
      id="programs"
      className="w-full bg-white py-8 sm:py-12 select-none border-b border-slate-100"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-bold text-[#003399] tracking-tight leading-tight m-0">
            {brand.programmesTitle || "UPES University Online Degree Courses"}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          {/* Left Arrow */}
          <Button
            type="text"
            onClick={() => carouselRef.current?.prev()}
            aria-label="Previous programme"
            className="flex absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 text-[#003399] hover:!text-[#f2167d] transition-colors p-1 !bg-white/90 sm:!bg-transparent !border-none cursor-pointer items-center justify-center active:scale-90 !h-10 !w-10 rounded-full shadow-sm sm:shadow-none"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
          </Button>

          {/* Right Arrow */}
          <Button
            type="text"
            onClick={() => carouselRef.current?.next()}
            aria-label="Next programme"
            className="flex absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 text-[#003399] hover:!text-[#f2167d] transition-colors p-1 !bg-white/90 sm:!bg-transparent !border-none cursor-pointer items-center justify-center active:scale-90 !h-10 !w-10 rounded-full shadow-sm sm:shadow-none"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
          </Button>

          <Carousel
            ref={carouselRef}
            autoplay
            autoplaySpeed={3500}
            dots={slidesToShow === 1}
            slidesToShow={slidesToShow}
            slidesToScroll={1}
            infinite={programmes.length > 1}
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
              { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            ]}
          >
            {programmes.map((c, idx) => (
              <div key={c.id || c.code || idx} className="box-border px-2 sm:px-3 py-3">
                <div className="bg-white rounded-[10px] shadow-[0_10px_24px_rgba(0,0,0,0.12)] sm:shadow-[0_16px_20px_rgba(0,0,0,0.14)] border border-slate-100 flex flex-col justify-between h-full overflow-hidden transition-transform duration-200 hover:-translate-y-1">
                  {/* Top Image + Duration Tag */}
                  <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
                    {/* Purple Duration Badge */}
                    <div className="absolute top-3 right-3 bg-[#5a359d] text-white text-[13px] font-bold px-2.5 py-1 rounded-[5px] flex items-center gap-1.5 shadow-sm z-10 select-none">
                      <Hourglass className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                      <span>{c.duration || "24 Months"}</span>
                    </div>

                    <Image
                      src={c.image || "/assets/upes/mba-upes.webp"}
                      alt={c.title || "UPES Course"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-center">
                    <div>
                      <h3 className="text-[20px] font-bold text-black tracking-tight leading-tight m-0">
                        {c.code || c.title}
                      </h3>
                      <p className="text-[13px] font-semibold text-[#555555] mt-1 mb-2 m-0">
                        {c.subtitle || (c.title !== c.code ? `(${c.title})` : "")}
                      </p>
                      <hr className="border-t border-slate-200 my-2.5" />
                      <p className="text-[12px] text-[#444444] leading-[1.75] line-clamp-4 min-h-[60px] m-0 mb-3 text-center">
                        {c.description}
                      </p>
                    </div>

                    {/* Action Buttons Grid */}
                    <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                        className="bg-[#003399] hover:bg-[#002673] active:scale-95 text-white font-semibold text-[12px] py-2.5 px-2 rounded-[5px] flex items-center justify-center gap-1.5 cursor-pointer border-none shadow-xs transition-all"
                      >
                        <span>Get Brochure</span>
                        <FaDownload className="w-3 h-3 text-white shrink-0" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenApply?.(c.code || c.title)}
                        className="bg-[#009933] hover:bg-[#00802b] active:scale-95 text-white font-bold text-[12px] py-2.5 px-2 rounded-[5px] flex items-center justify-center cursor-pointer border-none shadow-xs transition-all"
                      >
                        <span>Apply Now</span>
                      </button>
                    </div>
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
