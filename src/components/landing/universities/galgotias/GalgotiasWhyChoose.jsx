"use client";

import React from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { WHY_CHOOSE_ITEMS } from "./constants";

export default function GalgotiasWhyChoose() {
  return (
    <section
      id="advantage"
      className="py-10 sm:py-14 bg-[#f9bc08] select-none scroll-mt-20 relative overflow-hidden"
    >
      <style>{`
        .galgotias-whychoose-carousel .slick-dots {
          bottom: -24px !important;
        }
        .galgotias-whychoose-carousel .slick-dots li button {
          background: rgba(0, 0, 0, 0.25) !important;
          border-radius: 50% !important;
          height: 9px !important;
          width: 9px !important;
        }
        .galgotias-whychoose-carousel .slick-dots li.slick-active button {
          background: #000000 !important;
          height: 10px !important;
          width: 10px !important;
        }
      `}</style>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-[24px] sm:text-[30px] lg:text-[32px] font-bold text-center text-[#bc1820] m-0">
            Why Choose Galgotias University Online
          </h2>
        </div>

        {/* Desktop 4 Columns Grid (no carousel buttons) */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[14px] p-6 text-center shadow-xs flex flex-col items-center justify-start min-h-[250px] transition-transform hover:-translate-y-1"
            >
              <div className="w-[58px] h-[58px] flex items-center justify-center mb-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={52}
                  height={52}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-[15.5px] font-bold text-[#111111] mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-[12.5px] sm:text-[13px] text-[#444444] leading-[1.4] m-0 font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Carousel (1 slide at a time, no buttons, clean dots) */}
        <div className="block lg:hidden galgotias-whychoose-carousel pb-6">
          <Carousel
            autoplay
            autoplaySpeed={3000}
            dots
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {WHY_CHOOSE_ITEMS.map((item, idx) => (
              <div key={idx} className="px-3 py-1 box-border">
                <div className="bg-white rounded-[14px] p-6 text-center shadow-xs flex flex-col items-center justify-start min-h-[240px] max-w-[340px] mx-auto">
                  <div className="w-[54px] h-[54px] flex items-center justify-center mb-4">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-[15.5px] font-bold text-[#111111] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[12.5px] text-[#444444] leading-[1.4] m-0 font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
