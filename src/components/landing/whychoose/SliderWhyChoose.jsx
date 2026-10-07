"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Carousel, Card, Button } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LandingContainer from "../LandingContainer";

export default function SliderWhyChoose({ whyChoose = [], brand = {} }) {
  const carouselRef = useRef(null);
  const prefix = brand.whyChoosePrefix || "Key Features of";
  const highlight = brand.whyChooseHighlight || brand.name || "University Online";
  const subtitle = brand.whyChooseSubtitle || null;
  const sectionBg = brand?.whyChooseBg || "#fdf8f4";
  const primaryColor = brand?.primaryColor || "#ee3024";

  return (
    <section
      id="advantage"
      className="py-8 sm:py-10 md:py-11 select-none"
      style={{ backgroundColor: sectionBg }}
    >
      <LandingContainer>
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
          <h2 className="text-2xl sm:text-[28px] md:text-[32px] font-bold tracking-tight m-0 text-center leading-tight">
            <span style={{ color: primaryColor }}>{prefix} </span>
            <span className="text-[#192f59] font-bold">{highlight}</span>
          </h2>
          {subtitle && (
            <p className="mt-2 text-[13px] sm:text-[14px] text-slate-700 leading-normal font-normal m-0 text-center max-w-4xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8">
          <Button
            type="text"
            onClick={() => carouselRef.current?.prev()}
            aria-label="Previous Feature"
            className="absolute -left-2 sm:-left-4 top-[35%] -translate-y-1/2 z-20 text-slate-900 hover:!text-[#ee3024] transition-colors p-1 !bg-transparent !border-none cursor-pointer flex items-center justify-center active:scale-90 !h-auto !w-auto"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </Button>

          <Button
            type="text"
            onClick={() => carouselRef.current?.next()}
            aria-label="Next Feature"
            className="absolute -right-2 sm:-right-4 top-[35%] -translate-y-1/2 z-20 text-slate-900 hover:!text-[#ee3024] transition-colors p-1 !bg-transparent !border-none cursor-pointer flex items-center justify-center active:scale-90 !h-auto !w-auto"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </Button>

          <div className="w-full">
            <Carousel
              ref={carouselRef}
              autoplay
              autoplaySpeed={2500}
              dots={false}
              slidesToShow={4}
              slidesToScroll={1}
              infinite={whyChoose.length > 1}
              responsive={[
                { breakpoint: 1024, settings: { slidesToShow: 2 } },
                { breakpoint: 640, settings: { slidesToShow: 1 } },
              ]}
            >
              {whyChoose.map((item, idx) => (
                <div key={idx} className="px-2 sm:px-3 box-border outline-none py-1">
                  <Card
                    variant="borderless"
                    styles={{ body: { padding: "12px" } }}
                    className="!bg-transparent shadow-none flex flex-col items-center text-center"
                  >
                    {item.image && (
                      <div className="relative w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] mx-auto mb-2 sm:mb-2.5 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105">
                        <Image src={item.image} alt={item.title} fill className="object-contain" sizes="80px" />
                      </div>
                    )}
                    <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#111827] m-0 mb-1 leading-snug text-center">
                      {item.title}
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-slate-700 leading-[1.4] font-normal m-0 text-center max-w-[225px] mx-auto">
                      {item.desc}
                    </p>
                  </Card>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
