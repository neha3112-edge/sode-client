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
    (brand.name ? `${brand.name.toUpperCase()} SPECIALIZATIONS` : "DOCTORATE SPECIALIZATIONS");

  return (
    <section id="whychoose" className="py-12 sm:py-16 bg-[#ffffff] select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <h2 className="text-center text-[22px] sm:text-[28px] lg:text-[32px] font-bold text-[#111111] mb-8 sm:mb-12 uppercase tracking-tight">
          {heading} <span className="text-[#c11f28]">{highlight}</span>
        </h2>
        <div className="course-slider-wrapper">
          <Carousel
            autoplay
            autoplaySpeed={3000}
            dots={true}
            slidesToShow={3}
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 2 } },
              { breakpoint: 640, settings: { slidesToShow: 1 } },
            ]}
          >
            {programmes.map((p, idx) => (
              <div key={idx} className="px-3 box-border outline-none py-2">
                <div className="bg-[#f2f2f2] rounded-[8px] overflow-hidden border border-slate-200/90 shadow-sm flex flex-col justify-between text-left h-full min-h-[360px] hover:shadow-md transition-shadow">
                  <div className="relative w-full h-[160px] overflow-hidden bg-slate-200">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between bg-[#f2f2f2]">
                    <div>
                      <h3 className="text-[17px] sm:text-[18px] font-bold text-[#111111] mb-2 leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-[12.5px] sm:text-[13px] text-[#555555] leading-relaxed mb-4 font-normal">
                        {p.description || p.desc}
                      </p>
                    </div>
                    <div>
                      <hr className="border-t border-slate-300 mb-4" />
                      <button
                        type="button"
                        onClick={() => onOpenApply?.(p.title)}
                        className="w-full py-2.5 px-4 bg-[#c11f28] hover:bg-[#a81a22] text-white font-bold text-[14px] rounded-[5px] transition-all border-none cursor-pointer active:scale-95 shadow-xs"
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
