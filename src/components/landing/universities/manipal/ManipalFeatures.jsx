"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { Container } from "@/components/common/Container";
import { MANIPAL_FEATURES } from "./constants";

export default function ManipalFeatures() {
  const carouselRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesToShow(1);
      } else if (width < 992) {
        setSlidesToShow(2);
      } else if (width < 1200) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const carouselSettings = {
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 440,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <section
      id="features"
      className="w-full bg-[#fdf8f4] py-10 sm:py-14 scroll-mt-16 sm:scroll-mt-20 select-none relative"
    >
      <Container>
        {/* Section Heading */}
        <h2 className="font-bold text-[22px] sm:text-[28px] md:text-[32px] leading-tight text-center m-0">
          <span className="text-[#ee3024]">Key Features of </span>
          <span className="text-[#111827]">Manipal University Online</span>
        </h2>

        {/* Subtitle */}
        <p className="text-[#444444] text-[13px] sm:text-[14px] leading-relaxed text-center max-w-[900px] mx-auto mt-2 mb-8 sm:mb-10 font-normal">
          Manipal University&apos;s online degree courses redefine academic excellence with flexible
          learning approaches and advanced digital education tools.
        </p>

        {/* Features Slider */}
        <div className="relative w-full px-4 sm:px-8 [&_.slick-dots]:mt-4 [&_.slick-dots_li_button]:bg-gray-300 [&_.slick-dots_li.slick-active_button]:bg-[#ee3024]">
          {/* Left Chevron Arrow */}
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            className="absolute -left-2 sm:-left-4 top-[40%] -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-[#111827] hover:text-[#ee3024] cursor-pointer bg-transparent border-none p-0 select-none text-[28px] leading-none transition-colors"
            aria-label="Previous Feature"
          >
            &#8249;
          </button>

          {/* Right Chevron Arrow */}
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            className="absolute -right-2 sm:-right-4 top-[40%] -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-[#111827] hover:text-[#ee3024] cursor-pointer bg-transparent border-none p-0 select-none text-[28px] leading-none transition-colors"
            aria-label="Next Feature"
          >
            &#8250;
          </button>

          <Carousel
            key={`features-carousel-${slidesToShow}`}
            ref={carouselRef}
            className="cursor-grab active:cursor-grabbing"
            {...carouselSettings}
          >
            {MANIPAL_FEATURES.map((feat) => (
              <div key={feat.title} className="px-3 pb-3 text-center">
                {/* Feature Icon */}
                <div className="flex items-center justify-center mx-auto mb-3">
                  <Image
                    src={feat.image}
                    alt={feat.title}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-contain mx-auto"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>

                {/* Feature Title */}
                <h4 className="text-[#111827] font-semibold text-[15px] sm:text-[16px] leading-snug m-0 mb-1.5">
                  {feat.title}
                </h4>

                {/* Feature Description */}
                <p className="text-[#555555] text-[12px] sm:text-[12.5px] leading-relaxed m-0 max-w-[220px] mx-auto min-h-[48px]">
                  {feat.desc}
                </p>
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
