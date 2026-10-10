"use client";

import React from "react";
import Image from "next/image";
import { Carousel } from "antd";

export default function SsbmProgrammes({
  programmes = [],
  brand = {},
  onOpenApply,
}) {
  const heading = brand.programmesTitle || "TOP ONLINE DBA";
  const highlight =
    brand.programmesHighlight ||
    (brand.name ? `${brand.name.toUpperCase()} SPECIALIZATIONS` : "SSBM DOCTORATE SPECIALIZATIONS");

  return (
    <section id="whychoose" className="py-10 sm:py-14 bg-[#ffffff] select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <h2 className="text-center text-[24px] sm:text-[28px] lg:text-[32px] font-extrabold text-[#111111] mb-6 sm:mb-8 tracking-tight uppercase">
          {heading} <span className="text-[#c11f28]">{highlight}</span>
        </h2>
        {/* Mobile View: Single card carousel (block md:hidden) */}
        <div className="course-slider-wrapper block md:hidden max-w-[340px] xs:max-w-[360px] mx-auto">
          <Carousel
            autoplay
            autoplaySpeed={3200}
            dots={true}
            slidesToShow={1}
            slidesToScroll={1}
            infinite={programmes.length > 1}
          >
            {programmes.map((p, idx) => (
              <div key={idx} className="px-1 box-border outline-none py-1">
                <div className="bg-[#F2F2F2] rounded-none sm:rounded-[2px] overflow-hidden border border-[#e5e5e5] flex flex-col justify-between text-left h-full transition-shadow">
                  {/* Card Image */}
                  <div className="relative w-full h-[190px] overflow-hidden bg-slate-200">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-[#F2F2F2]">
                    <div>
                      <h3 className="text-[17px] sm:text-[18px] font-bold text-[#111111] mb-2 leading-[1.3] line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-[13px] sm:text-[13.5px] text-[#444444] leading-[1.5] mb-3 min-h-[40px] line-clamp-2 font-normal">
                        {p.description || p.desc}
                      </p>
                    </div>
                    <div>
                      <hr className="border-t border-[#d8d8d8] my-3.5" />
                      <button
                        type="button"
                        onClick={() => onOpenApply?.(p.title)}
                        className="py-2 px-5 bg-[#c11f28] hover:bg-[#a81a22] text-white font-bold text-[14px] rounded-[4px] transition-all border-none cursor-pointer active:scale-95 shadow-none inline-block w-fit"
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

        {/* Desktop View: Multi-card carousel (hidden md:block) */}
        <div className="course-slider-wrapper hidden md:block">
          <Carousel
            autoplay
            autoplaySpeed={3200}
            dots={true}
            slidesToShow={3}
            slidesToScroll={1}
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 2 } },
            ]}
            infinite={programmes.length > 3}
          >
            {programmes.map((p, idx) => (
              <div key={idx} className="px-2.5 sm:px-3 box-border outline-none py-1">
                <div className="bg-[#F2F2F2] rounded-none sm:rounded-[2px] overflow-hidden border border-[#e5e5e5] flex flex-col justify-between text-left h-full transition-shadow">
                  {/* Card Image */}
                  <div className="relative w-full h-[180px] sm:h-[195px] overflow-hidden bg-slate-200">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-5 flex-1 flex flex-col justify-between bg-[#F2F2F2]">
                    <div>
                      <h3 className="text-[17px] sm:text-[18px] font-bold text-[#111111] mb-2 leading-[1.3] line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-[13px] sm:text-[13.5px] text-[#444444] leading-[1.5] mb-3 min-h-[40px] line-clamp-2 font-normal">
                        {p.description || p.desc}
                      </p>
                    </div>
                    <div>
                      <hr className="border-t border-[#d8d8d8] my-3.5" />
                      <button
                        type="button"
                        onClick={() => onOpenApply?.(p.title)}
                        className="py-2 px-5 bg-[#c11f28] hover:bg-[#a81a22] text-white font-bold text-[14px] rounded-[4px] transition-all border-none cursor-pointer active:scale-95 shadow-none inline-block w-fit"
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
      </div>
    </section>
  );
}
