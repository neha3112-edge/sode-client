"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { SMU_ADVANTAGES } from "./constants";

export default function SmuAdvantages() {
  const carouselRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(1);

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

  return (
    <section className="pt-2 pb-8 sm:py-12 md:py-16 bg-[#f7f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1a202c] tracking-tight">
            Advantages of Sikkim Manipal University Online
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-[#f58220] mx-auto mt-2 sm:mt-3 rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative px-2 sm:px-8">
          {/* Custom Arrows */}
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            aria-label="Previous slide"
            className="absolute -left-1 sm:-left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-[#074a76] shadow-md border border-gray-200 flex items-center justify-center hover:bg-[#074a76] hover:text-white transition-all cursor-pointer"
          >
            <LeftOutlined className="text-xs sm:text-sm font-bold" />
          </button>
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            aria-label="Next slide"
            className="absolute -right-1 sm:-right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-[#074a76] shadow-md border border-gray-200 flex items-center justify-center hover:bg-[#074a76] hover:text-white transition-all cursor-pointer"
          >
            <RightOutlined className="text-xs sm:text-sm font-bold" />
          </button>

          <Carousel
            key={`smu-advantages-${slidesToShow}`}
            ref={carouselRef}
            dots={true}
            arrows={false}
            autoplay={true}
            autoplaySpeed={4500}
            slidesToShow={slidesToShow}
            slidesToScroll={1}
            infinite={true}
          >
            {SMU_ADVANTAGES.map((item, idx) => (
              <div key={idx} className="p-2 sm:p-3">
                <div className="max-w-sm sm:max-w-none mx-auto bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
                  {/* Card Image */}
                  <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={500}
                      height={320}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Dark Blue Title Bar */}
                  <div className="bg-[#074a76] text-white py-2.5 sm:py-3 px-4 text-center font-bold text-sm sm:text-base tracking-wide shadow-inner">
                    {item.title}
                  </div>

                  {/* Description */}
                  <div className="p-4 sm:p-5 flex-1 flex items-center justify-center">
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center">
                      {item.desc}
                    </p>
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
