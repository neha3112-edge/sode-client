"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { MU_HIRING_PARTNERS } from "./constants";

export default function MuPlacement() {
  const carouselRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesToShow(2);
      } else if (width < 1024) {
        setSlidesToShow(4);
      } else {
        setSlidesToShow(5);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="placement"
      className="w-full bg-[#f7f7f7] py-6 sm:py-8 md:py-9 text-center scroll-mt-16 sm:scroll-mt-20 select-none"
    >
      <Container>
        {/* Section Heading - Compact Height & Tight Line Height */}
        <div className="max-w-3xl mx-auto mb-4 sm:mb-5 text-center">
          <h2 className="text-[#193579] font-bold text-xl sm:text-2xl md:text-[26px] uppercase leading-tight m-0 mb-1.5">
            Mangalayatan University Top-Tier Hiring Partners
          </h2>
          <p className="text-[#555555] text-[11.5px] sm:text-[12.5px] leading-[1.38] max-w-[860px] mx-auto m-0 font-normal">
            Mangalayatan University Online collaborates with several renowned and reputable companies across various fields. These partnerships open pathways to outstanding career opportunities, empowering students to secure positions in leading organisations like Amazon, Infosys, Capgemini, and numerous others.
          </p>
        </div>

        {/* Carousel Slider - Direct Images (No White Box, No Padding) */}
        <div className="relative px-6 sm:px-10 max-w-[1100px] mx-auto">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            className="absolute -left-1 sm:-left-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-xs flex items-center justify-center text-gray-700 hover:text-black cursor-pointer z-10 transition-colors"
            aria-label="Previous Partner"
          >
            <LeftOutlined className="text-xs" />
          </button>

          <Carousel
            key={`mu-placement-${slidesToShow}`}
            ref={carouselRef}
            dots={false}
            arrows={false}
            autoplay={true}
            autoplaySpeed={2200}
            slidesToShow={slidesToShow}
            slidesToScroll={1}
            infinite={true}
          >
            {MU_HIRING_PARTNERS.map((logo, index) => (
              <div key={index} className="px-2 sm:px-3 outline-none">
                <div className="relative w-full h-12 sm:h-14 md:h-16 flex items-center justify-center">
                  <Image
                    src={logo}
                    alt={`Hiring Partner ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 120px, 160px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </Carousel>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            className="absolute -right-1 sm:-right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-xs flex items-center justify-center text-gray-700 hover:text-black cursor-pointer z-10 transition-colors"
            aria-label="Next Partner"
          >
            <RightOutlined className="text-xs" />
          </button>
        </div>
      </Container>
    </section>
  );
}

