"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { MANIPAL_TESTIMONIALS } from "./constants";

export default function ManipalTestimonials() {
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
    autoplaySpeed: 4000,
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
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <section
      id="testimonials"
      className="w-full bg-[#fdf8f4] py-6 sm:py-8 lg:py-9 select-none relative"
    >
      <Container>
        {/* Section Heading */}
        <h2 className="font-bold text-[22px] sm:text-[26px] md:text-[28px] leading-tight text-center m-0 mb-4 sm:mb-5">
          <span className="text-[#ee3024]">What Our Students </span>
          <span className="text-[#111827]">Say</span>
        </h2>

        {/* Carousel Container */}
        <div className="relative w-full px-5 sm:px-8 [&_.slick-dots]:mt-4 [&_.slick-dots_li_button]:bg-gray-400 [&_.slick-dots_li.slick-active_button]:bg-[#ee3024]">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            className="absolute -left-1 sm:-left-3 lg:-left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-[#ee3024] hover:border-[#ee3024] transition-colors cursor-pointer select-none"
            aria-label="Previous Testimonial"
          >
            <LeftOutlined className="text-[12px] sm:text-[14px]" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            className="absolute -right-1 sm:-right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-[#ee3024] hover:border-[#ee3024] transition-colors cursor-pointer select-none"
            aria-label="Next Testimonial"
          >
            <RightOutlined className="text-[12px] sm:text-[14px]" />
          </button>

          <Carousel
            key={`testimonials-carousel-${slidesToShow}`}
            ref={carouselRef}
            className="cursor-grab active:cursor-grabbing"
            {...carouselSettings}
          >
            {MANIPAL_TESTIMONIALS.map((t) => (
              <div key={t.name} className="px-2 sm:px-3 py-2">
                <div className="bg-white rounded-[10px] shadow-[0px_3px_15px_rgba(0,0,0,0.06)] p-4 sm:p-5 flex flex-col justify-between h-[260px] sm:h-[275px] max-w-[340px] sm:max-w-none mx-auto text-left border border-gray-100">
                  <p className="text-[#444444] text-[12.5px] sm:text-[13px] leading-[1.48] italic m-0 mb-3 flex-grow overflow-y-auto scrollbar-none">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100 mt-auto shrink-0">
                    <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border border-gray-200">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="text-[#111827] font-bold text-[13.5px] sm:text-[14px] leading-snug m-0">
                        {t.name}
                      </h4>
                      <p className="text-[#ee3024] font-medium text-[11.5px] sm:text-[12px] leading-tight m-0">
                        {t.course}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
