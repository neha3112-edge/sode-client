"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Carousel, Card } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LandingContainer from "../LandingContainer";

export default function SliderWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const mobileCarouselRef = useRef(null);
  const desktopCarouselRef = useRef(null);
  const prefix = brand.whyChoosePrefix || "Key Features of";
  const highlight = brand.whyChooseHighlight || brand.name || "University Online";
  const subtitle = brand.whyChooseSubtitle || null;
  const sectionBg = brand?.whyChooseBg || "#fdf8f4";
  const primaryColor = brand?.primaryColor || "#ee3024";

  if (!whyChoose || whyChoose.length === 0) return null;

  return (
    <section
      id="advantage"
      className="py-8 sm:py-10 md:py-11 select-none"
      style={{ backgroundColor: sectionBg }}
    >
      <LandingContainer>
        {/* Heading */}
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

        {/* ------------------------------------------------------------- */}
        {/* MOBILE VIEW: Exactly 1 Item per slide (md:hidden)             */}
        {/* ------------------------------------------------------------- */}
        <div className="block md:hidden relative w-full max-w-[340px] mx-auto px-7">
          {/* Controls */}
          <button
            type="button"
            onClick={() => mobileCarouselRef.current?.prev()}
            aria-label="Previous Feature"
            className="absolute left-0 top-[40%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#ee3024] p-1.5 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => mobileCarouselRef.current?.next()}
            aria-label="Next Feature"
            className="absolute right-0 top-[40%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#ee3024] p-1.5 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Carousel Viewport */}
          <div className="w-full [&_.slick-dots]:!relative [&_.slick-dots]:!mt-5 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2 [&_.slick-dots_li]:!h-2 [&_.slick-dots_li]:!mx-1 [&_.slick-dots_li_button]:!w-2 [&_.slick-dots_li_button]:!h-2 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-slate-300 [&_.slick-dots_li.slick-active_button]:!bg-slate-500">
            <Carousel
              ref={mobileCarouselRef}
              autoplay={brand?.whyChooseCarousel?.autoplay !== false}
              autoplaySpeed={brand?.whyChooseCarousel?.interval || 3000}
              dots={brand?.whyChooseCarousel?.dots !== undefined ? brand.whyChooseCarousel.dots : (brand?.whyChooseDots ?? true)}
              slidesToShow={1}
              slidesToScroll={1}
              infinite={whyChoose.length > 1}
              arrows={false}
              draggable
            >
              {whyChoose.map((item, idx) => (
                <div key={idx} className="px-1 py-1 outline-none">
                  <div className="flex flex-col items-center text-center max-w-[280px] mx-auto">
                    {item.image && (
                      <div className="relative w-20 h-20 mx-auto mb-3 flex items-center justify-center shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain"
                          sizes="90px"
                          priority={idx === 0}
                        />
                      </div>
                    )}
                    <h3 className="text-[16.5px] font-bold text-[#111827] m-0 mb-1.5 leading-snug text-center">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-slate-700 leading-relaxed font-normal m-0 text-center">
                      {item.desc || item.description}
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP VIEW: Multiple Items per slide (hidden md:block)      */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:block relative max-w-6xl mx-auto px-6 sm:px-8">
          <button
            type="button"
            onClick={() => desktopCarouselRef.current?.prev()}
            aria-label="Previous Feature"
            className="flex absolute left-0 sm:-left-4 top-[50%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer items-center justify-center active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => desktopCarouselRef.current?.next()}
            aria-label="Next Feature"
            className="flex absolute right-0 sm:-right-4 top-[50%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer items-center justify-center active:scale-90"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>

          <div className="w-full [&_.slick-dots]:!relative [&_.slick-dots]:!mt-5 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2 [&_.slick-dots_li]:!h-2 [&_.slick-dots_li]:!mx-1 [&_.slick-dots_li_button]:!w-2 [&_.slick-dots_li_button]:!h-2 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-slate-300 [&_.slick-dots_li.slick-active_button]:!bg-slate-500">
            <Carousel
              ref={desktopCarouselRef}
              autoplay={brand?.whyChooseCarousel?.autoplay !== false}
              autoplaySpeed={brand?.whyChooseCarousel?.interval || 2500}
              dots={brand?.whyChooseCarousel?.dots !== undefined ? brand.whyChooseCarousel.dots : (brand?.whyChooseDots ?? true)}
              slidesToShow={brand?.whyChooseCarousel?.desktopSlides || 4}
              slidesToScroll={1}
              infinite={whyChoose.length > 1}
              responsive={[
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: brand?.whyChooseCarousel?.desktopSlides || 4,
                  },
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: brand?.whyChooseCarousel?.tabletSlides || 2,
                  },
                },
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
                      <div className="relative w-[70px] h-[70px] sm:w-[70px] sm:h-[70px] mx-auto mb-2 sm:mb-2.5 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105">
                        <Image src={item.image} alt={item.title} fill className="object-contain" sizes="80px" />
                      </div>
                    )}
                    <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#111827] m-0 mb-1 leading-snug text-center">
                      {item.title}
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-slate-700 leading-[1.45] font-normal m-0 text-center max-w-[280px] sm:max-w-[225px] mx-auto">
                      {item.desc || item.description}
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
