"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Carousel, Card } from "antd";

/**
 * Reusable Why Choose Feature Slider Component (Global)
 *
 * FEATURES:
 * - Powered by Ant Design Carousel with smooth continuous linear card motion.
 * - Sharp chevron left/right navigation controls.
 * - Toggleable bottom dots via brand.whyChooseDots / brand.whyChooseCarousel.dots.
 * - 1140px container alignment.
 */
export default function SliderWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const mobileCarouselRef = useRef(null);
  const desktopCarouselRef = useRef(null);
  const prefix = brand.whyChoosePrefix || "Key Features of";
  const highlight = brand.whyChooseHighlight || brand.name || "University Online";
  const subtitle = brand.whyChooseSubtitle || null;
  const sectionBg = brand?.whyChooseBg || "#fdf8f4";
  const primaryColor = brand?.primaryColor || "#ee3024";

  if (!whyChoose || whyChoose.length === 0) return null;

  const showDots =
    brand?.whyChooseCarousel?.dots !== undefined
      ? Boolean(brand.whyChooseCarousel.dots)
      : (brand?.whyChooseDots !== undefined ? Boolean(brand.whyChooseDots) : false);

  const showMobileDots =
    brand?.whyChooseCarousel?.mobileDots !== undefined
      ? Boolean(brand.whyChooseCarousel.mobileDots)
      : showDots;

  const containerClass =
    brand?.whyChooseContainerClassName ||
    (brand?.slug === "manipal"
      ? "max-w-[1140px] mx-auto px-4 sm:px-6"
      : "max-w-6xl mx-auto px-4 sm:px-6");

  return (
    <section
      id="advantage"
      className="pt-7 sm:pt-9 lg:pt-11 pb-7 sm:pb-8 lg:pb-10 select-none overflow-hidden font-['Poppins',sans-serif]"
      style={{ backgroundColor: sectionBg }}
    >
      <div className={containerClass}>
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-5 sm:mb-7 px-4">
          <h2 className="text-[23px] sm:text-[27px] lg:text-[31px] font-bold tracking-tight m-0 text-center leading-tight">
            <span style={{ color: primaryColor }}>{prefix} </span>
            <span className="text-[#192f59] font-bold">{highlight}</span>
          </h2>
          {subtitle && (
            <p className="mt-2 text-[12.5px] sm:text-[13.5px] text-[#333333] leading-relaxed font-normal m-0 text-center max-w-4xl mx-auto">
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
            className="absolute left-0 top-[62%] -translate-y-1/2 z-20 flex items-center justify-center text-[#111111] hover:text-[#ee3024] p-1 bg-transparent border-none cursor-pointer active:scale-90"
          >
            <svg
              className="w-4 h-4 text-[#111111]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => mobileCarouselRef.current?.next()}
            aria-label="Next Feature"
            className="absolute right-0 top-[62%] -translate-y-1/2 z-20 flex items-center justify-center text-[#111111] hover:text-[#ee3024] p-1 bg-transparent border-none cursor-pointer active:scale-90"
          >
            <svg
              className="w-4 h-4 text-[#111111]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Carousel Viewport */}
          <div className="w-full [&_.slick-dots]:!relative [&_.slick-dots]:!mt-4 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2.5 [&_.slick-dots_li]:!h-2.5 [&_.slick-dots_li]:!mx-1 [&_.slick-dots_li_button]:!w-2.5 [&_.slick-dots_li_button]:!h-2.5 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-[#d9d9d9] [&_.slick-dots_li.slick-active_button]:!bg-[#999999]">
            <Carousel
              ref={mobileCarouselRef}
              autoplay={brand?.whyChooseCarousel?.autoplay !== false}
              autoplaySpeed={brand?.whyChooseCarousel?.interval || 3000}
              speed={600}
              easing="linear"
              dots={showMobileDots}
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
                      <div className="relative w-[85px] h-[85px] sm:w-[90px] sm:h-[90px] mx-auto mb-3 flex items-center justify-center shrink-0">
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
                    <h3 className="text-[17px] font-bold text-[#192f59] m-0 mb-1 leading-snug text-center">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#333333] leading-relaxed font-normal m-0 text-center">
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
        <div className="hidden md:block relative w-full px-5 sm:px-6 lg:px-7">
          <button
            type="button"
            onClick={() => desktopCarouselRef.current?.prev()}
            aria-label="Previous Feature"
            className="flex absolute -left-1 sm:-left-2 lg:-left-3.5 top-[44%] -translate-y-1/2 z-20 text-[#111111] hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer items-center justify-center active:scale-90"
          >
            <svg
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#111111]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => desktopCarouselRef.current?.next()}
            aria-label="Next Feature"
            className="flex absolute -right-1 sm:-right-2 lg:-right-3.5 top-[44%] -translate-y-1/2 z-20 text-[#111111] hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer items-center justify-center active:scale-90"
          >
            <svg
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#111111]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="w-full [&_.slick-dots]:!relative [&_.slick-dots]:!mt-4 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2 [&_.slick-dots_li]:!h-2 [&_.slick-dots_li]:!mx-1 [&_.slick-dots_li_button]:!w-2 [&_.slick-dots_li_button]:!h-2 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-slate-300 [&_.slick-dots_li.slick-active_button]:!bg-[#ee3024]">
            <Carousel
              ref={desktopCarouselRef}
              autoplay={brand?.whyChooseCarousel?.autoplay !== false}
              autoplaySpeed={brand?.whyChooseCarousel?.interval || 3000}
              speed={600}
              easing="linear"
              pauseOnHover
              dots={showDots}
              slidesToShow={brand?.whyChooseCarousel?.desktopSlides || 4}
              slidesToScroll={1}
              infinite={whyChoose.length > 4}
              arrows={false}
              draggable
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
                <div key={idx} className="px-2 sm:px-2.5 box-border outline-none py-1">
                  <Card
                    variant="borderless"
                    styles={{ body: { padding: "8px" } }}
                    className="!bg-transparent shadow-none flex flex-col items-center text-center"
                  >
                    {item.image && (
                      <div className="relative w-[78px] h-[78px] sm:w-[84px] sm:h-[84px] mx-auto mb-2 sm:mb-2.5 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105">
                        <Image src={item.image} alt={item.title} fill className="object-contain" sizes="90px" />
                      </div>
                    )}
                    <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#111111] m-0 mb-1 leading-snug text-center">
                      {item.title}
                    </h3>
                    <p className="text-[11.5px] sm:text-[12px] text-[#333333] leading-[1.4] font-normal m-0 text-center max-w-[240px] sm:max-w-[215px] mx-auto">
                      {item.desc || item.description}
                    </p>
                  </Card>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
