"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined, DownloadOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { SMU_PROGRAMMES } from "./constants";

export default function SmuProgrammes({ onOpenBrochure, onOpenApply }) {
  const carouselRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesToShow(1);
      } else if (width < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderCard = (prog) => (
    <div key={prog.code} className="px-2.5 sm:px-3 py-2 text-left">
      <div className="bg-white rounded-[10px] overflow-hidden border border-gray-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all flex flex-col justify-between h-full">
        {/* Top Thumbnail Image */}
        <div className="relative w-full h-[180px] sm:h-[195px] overflow-hidden bg-gray-100">
          <Image
            src={prog.image}
            alt={prog.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-[#074a76] font-bold text-[16px] sm:text-[17px] leading-tight m-0 mb-2">
              {prog.title}
            </h3>
            <p className="text-[#555555] text-[12px] sm:text-[12.5px] leading-[1.38] m-0 mb-4 line-clamp-3">
              {prog.desc}
            </p>
          </div>

          {/* 2 Buttons Side-by-Side: Get Brochure (Orange) & Apply Now (Blue) */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => onOpenBrochure?.(prog.code)}
              className="bg-[#f78d2d] hover:bg-[#e07b22] text-white font-semibold text-[12px] sm:text-[12.5px] py-2 px-2.5 rounded-[5px] shadow-2xs flex items-center justify-center gap-1 cursor-pointer border-none transition-all active:scale-95 select-none"
            >
              <span>Get Brochure</span>
              <DownloadOutlined className="text-[11px]" />
            </button>

            <button
              type="button"
              onClick={() => onOpenApply?.(prog.code)}
              className="bg-[#074a76] hover:bg-[#053758] text-white font-semibold text-[12px] sm:text-[12.5px] py-2 px-2.5 rounded-[5px] shadow-2xs flex items-center justify-center cursor-pointer border-none transition-all active:scale-95 select-none"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="programs"
      className="w-full bg-[#f8fafc] py-10 sm:py-14 scroll-mt-16 sm:scroll-mt-20 select-none text-center"
    >
      <Container>
        {/* Section Heading */}
        <h2 className="font-bold text-[22px] sm:text-[28px] md:text-[32px] leading-tight text-[#111827] m-0 mb-6 sm:mb-8">
          Programs offered by Sikkim Manipal University Online
        </h2>

        {/* Carousel with Navigation Arrows */}
        <div className="relative px-6 sm:px-10">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 cursor-pointer z-10"
            aria-label="Previous"
          >
            <LeftOutlined className="text-[12px]" />
          </button>

          <Carousel
            key={`smu-programmes-${slidesToShow}`}
            ref={carouselRef}
            dots={false}
            arrows={false}
            autoplay={true}
            autoplaySpeed={4000}
            slidesToShow={slidesToShow}
            slidesToScroll={1}
            infinite={true}
          >
            {SMU_PROGRAMMES.map(renderCard)}
          </Carousel>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 cursor-pointer z-10"
            aria-label="Next"
          >
            <RightOutlined className="text-[12px]" />
          </button>
        </div>
      </Container>
    </section>
  );
}

