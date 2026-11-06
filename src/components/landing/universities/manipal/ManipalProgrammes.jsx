"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { MANIPAL_PROGRAMMES } from "./constants";

export default function ManipalProgrammes({ onOpenBrochure }) {
  const carouselRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width < 768) {
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

  const carouselSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderCard = (prog) => (
    <div
      className="w-full max-w-[340px] sm:max-w-none mx-auto h-[260px] bg-white rounded-[6px] shadow-[0px_3px_15px_rgba(0,0,0,0.08)] p-3.5 sm:p-4 flex flex-col justify-between text-left border border-gray-100 select-none"
    >
      {/* Top: Code, Title, Description */}
      <div className="flex flex-col">
        <h3 className="text-[#111827] font-bold text-[20px] sm:text-[22px] leading-none m-0">
          {prog.code}
        </h3>
        <h4 className="text-[#222222] font-semibold text-[12.5px] sm:text-[13px] leading-tight mt-1 mb-1.5">
          {prog.title}
        </h4>
        <p className="text-[#444444] text-[11px] sm:text-[11.5px] leading-[1.35] m-0">
          {prog.description}
        </p>
      </div>

      {/* Bottom: University Logo & Action Button with tight gap */}
      <div className="pt-1 mt-auto shrink-0">
        <div className="relative w-22 h-10 mb-1.5">
          <Image
            src={prog.logo}
            alt="Online Manipal"
            fill
            className="object-contain object-left"
            sizes="88px"
          />
        </div>

        <button
          type="button"
          onClick={() => onOpenBrochure?.(prog.code)}
          className="w-full text-white font-bold text-[12px] py-1.5 px-3 rounded-[4px] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer border-none transition-opacity hover:opacity-95 select-none"
          style={{
            background: "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
          }}
        >
          <span>Download Brochure</span>
          <DownloadOutlined className="text-[11px]" />
        </button>
      </div>
    </div>
  );

  return (
    <section
      id="programs"
      className="w-full bg-[#f4ece6] py-5 sm:py-6 scroll-mt-16 sm:scroll-mt-20 select-none relative"
    >
      <Container>
        {/* Section Heading */}
        <h2 className="font-bold text-[22px] sm:text-[26px] md:text-[28px] leading-tight text-center m-0 mb-4 sm:mb-5">
          <span className="text-[#ee3024]">Programs Offered by </span>
          <span className="text-[#111827]">Manipal University Online</span>
        </h2>

        {/* Carousel across all screen sizes (1 on mobile, 2 on tablet, 3 on desktop) */}
        <div className="relative w-full px-5 sm:px-8 [&_.slick-dots]:mt-3 [&_.slick-dots_li_button]:bg-gray-400 [&_.slick-dots_li.slick-active_button]:bg-[#ee3024]">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            className="absolute -left-1 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-[#ee3024] hover:border-[#ee3024] transition-colors cursor-pointer select-none text-[20px] sm:text-[22px] leading-none"
            aria-label="Previous Program"
          >
            &#8249;
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            className="absolute -right-1 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-[#ee3024] hover:border-[#ee3024] transition-colors cursor-pointer select-none text-[20px] sm:text-[22px] leading-none"
            aria-label="Next Program"
          >
            &#8250;
          </button>

          <Carousel
            key={`programmes-carousel-${slidesToShow}`}
            ref={carouselRef}
            className="cursor-grab active:cursor-grabbing"
            {...carouselSettings}
          >
            {MANIPAL_PROGRAMMES.map((prog) => (
              <div key={prog.id} className="px-2 sm:px-3.5 lg:px-4 py-2">
                {renderCard(prog)}
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
