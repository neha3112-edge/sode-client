"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { Container } from "@/components/common/Container";
import { MANIPAL_APPROVALS } from "./constants";

export default function ManipalApprovals() {
  const carouselRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width < 768) {
        setSlidesToShow(2);
      } else if (width < 1024) {
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
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <section
      id="approvals"
      className="w-full bg-white py-8 sm:py-12 scroll-mt-16 sm:scroll-mt-20 select-none relative"
    >
      <Container>
        {/* Section Title */}
        <h2 className="font-bold text-[22px] sm:text-[26px] md:text-[30px] leading-tight text-center m-0">
          <span className="text-[#111827]">Manipal University Online </span>
          <span className="text-[#ee3024]">Accreditation &amp; Recognition</span>
        </h2>

        {/* Section Subtitle */}
        <p className="text-[#444444] text-[12.5px] sm:text-[13.5px] leading-[1.4] text-center max-w-[920px] mx-auto mt-2 mb-6 sm:mb-8 font-normal">
          A distinguished branch of Manipal University Jaipur, Manipal University Online provides
          online degree programs to improve the professional prospects of more than a thousand
          students in India.
        </p>

        {/* Carousel Container with Chevrons and Dots */}
        <div className="relative w-full px-6 sm:px-8 [&_.slick-dots]:mt-4 [&_.slick-dots_li_button]:bg-gray-300 [&_.slick-dots_li.slick-active_button]:bg-[#ee3024]">
          {/* Left Chevron Arrow */}
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            className="absolute left-0 sm:-left-3 top-[36%] sm:top-[38%] -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[#111827] hover:text-[#ee3024] cursor-pointer bg-transparent border-none p-0 select-none text-[28px] sm:text-[32px] leading-none transition-colors"
            aria-label="Previous Approval"
          >
            &#8249;
          </button>

          {/* Right Chevron Arrow */}
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            className="absolute right-0 sm:-right-3 top-[36%] sm:top-[38%] -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[#111827] hover:text-[#ee3024] cursor-pointer bg-transparent border-none p-0 select-none text-[28px] sm:text-[32px] leading-none transition-colors"
            aria-label="Next Approval"
          >
            &#8250;
          </button>

          {/* Ant Design Carousel */}
          <Carousel
            key={`approvals-carousel-${slidesToShow}`}
            ref={carouselRef}
            {...carouselSettings}
          >
            {MANIPAL_APPROVALS.map((item) => (
              <div key={item.tag} className="px-2 sm:px-3 pb-2 text-center cursor-grab active:cursor-grabbing">
                {/* Circular Badge */}
                <div className="flex items-center justify-center mx-auto">
                  <Image
                    src={item.image}
                    alt={item.tag}
                    width={150}
                    height={150}
                    sizes="(max-width: 640px) 112px, 150px"
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain mx-auto"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>

                {/* Badge Description Text */}
                <p className="text-[11.5px] sm:text-[12.5px] text-[#222222] font-normal leading-[1.35] mt-1.5 sm:mt-2 max-w-[170px] sm:max-w-[210px] mx-auto min-h-[44px]">
                  {item.text}
                </p>
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
