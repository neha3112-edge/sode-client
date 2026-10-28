"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SmuWhyChooseCarousel({ whyChoose = [], brand = {}, onOpenApply }) {
  const carouselRef = useRef(null);
  const sectionTitle = brand.whyChooseTitle || `Advantages of ${brand.name || "Sikkim Manipal University Online"}`;
  const headerBg = brand.primaryColor || "#074a76";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!whyChoose || whyChoose.length === 0) return null;

  return (
    <section
      id="whychoose"
      className="w-full pt-10 sm:pt-14 lg:pt-16 pb-4 sm:pb-6 lg:pb-6 bg-white overflow-hidden relative select-none"
    >
      {/* Dynamic Scoped CSS for Butter-Smooth Center-Scale Carousel */}
      <style>{`
        .smu-adv-carousel .slick-slider {
          position: relative;
        }
        .smu-adv-carousel .slick-track {
          display: flex !important;
          align-items: center !important;
          padding: 40px 0 !important;
        }
        .smu-adv-carousel .slick-slide {
          padding: 0 14px;
          box-sizing: border-box;
          outline: none;
          transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s ease;
          transform: scale(0.86);
          opacity: 0.82;
          cursor: pointer;
        }
        .smu-adv-carousel .slick-slide.slick-center {
          transform: scale(1.1);
          opacity: 1;
          z-index: 20;
          cursor: default;
        }
        .smu-adv-carousel .slick-slide.slick-center .smu-adv-card {
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.16) !important;
          border-color: rgba(7, 74, 118, 0.15) !important;
        }
        .smu-adv-carousel .slick-slide.slick-center .smu-adv-header {
          min-height: 56px !important;
        }
        .smu-adv-carousel .slick-slide.slick-center .smu-adv-body {
          min-height: 115px !important;
        }
        @media (max-width: 767px) {
          .smu-adv-carousel .slick-track {
            padding: 16px 0 !important;
          }
          .smu-adv-carousel .slick-slide {
            transform: none !important;
            opacity: 1 !important;
            padding: 0 6px !important;
            cursor: default !important;
          }
          .smu-adv-carousel .slick-slide.slick-center {
            transform: none !important;
            opacity: 1 !important;
          }
          .smu-adv-carousel .slick-slide.slick-center .smu-adv-card {
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1) !important;
          }
          .smu-adv-carousel .smu-adv-header {
            min-height: 52px !important;
          }
          .smu-adv-carousel .smu-adv-body {
            min-height: 105px !important;
          }
        }
      `}</style>

      {/* Heading */}
      <div className="text-center mb-6 sm:mb-8 px-4 max-w-5xl mx-auto">
        <h2 className={brand.whyChooseTitleClassName || "text-[24px] sm:text-[30px] lg:text-[34px] font-semibold text-[#1a202c] m-0 tracking-tight leading-tight"}>
          {sectionTitle}
        </h2>
      </div>

      {/* Full-width container */}
      <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 relative">
        {/* Previous Navigation Button */}
        <button
          type="button"
          onClick={() => carouselRef.current?.prev()}
          aria-label="Previous advantage"
          className="absolute left-0 sm:left-2 lg:left-3 xl:left-4 top-1/2 -translate-y-1/2 z-30 text-[#1a202c] hover:text-[#074a76] hover:scale-110 active:scale-95 transition-all p-1.5 sm:p-2 bg-white/70 sm:bg-transparent rounded-full border-none cursor-pointer flex items-center justify-center outline-none shadow-sm sm:shadow-none"
        >
          <ChevronLeft className="w-7 h-7 sm:w-10 sm:h-10 lg:w-11 lg:h-11 stroke-[2.5]" />
        </button>

        {/* Next Navigation Button */}
        <button
          type="button"
          onClick={() => carouselRef.current?.next()}
          aria-label="Next advantage"
          className="absolute right-0 sm:right-2 lg:right-3 xl:right-4 top-1/2 -translate-y-1/2 z-30 text-[#1a202c] hover:text-[#074a76] hover:scale-110 active:scale-95 transition-all p-1.5 sm:p-2 bg-white/70 sm:bg-transparent rounded-full border-none cursor-pointer flex items-center justify-center outline-none shadow-sm sm:shadow-none"
        >
          <ChevronRight className="w-7 h-7 sm:w-10 sm:h-10 lg:w-11 lg:h-11 stroke-[2.5]" />
        </button>

        {/* Smooth Scrolling Carousel */}
        <div className="w-full smu-adv-carousel">
          <Carousel
            key={isMobile ? "mobile" : "desktop"}
            ref={carouselRef}
            autoplay
            autoplaySpeed={3000}
            speed={650}
            cssEase="cubic-bezier(0.25, 1, 0.5, 1)"
            dots={false}
            centerMode={!isMobile}
            centerPadding="0px"
            slidesToShow={isMobile ? 1 : 3}
            slidesToScroll={1}
            initialSlide={isMobile ? 0 : 1}
            infinite
            pauseOnHover
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  centerMode: true,
                  centerPadding: "0px",
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  centerMode: false,
                  centerPadding: "0px",
                },
              },
            ]}
          >
            {whyChoose.map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                onClick={() => carouselRef.current?.goTo(idx)}
                className="box-border outline-none py-2"
              >
                <div className={brand.whyChooseCardClassName || "smu-adv-card bg-white rounded-[10px] overflow-hidden shadow-[0px_4px_22px_rgba(0,0,0,0.07)] border border-slate-100 flex flex-col text-center transition-all duration-500 max-w-[325px] sm:max-w-[360px] md:max-w-none mx-auto"}>
                  <div className="relative w-full h-[210px] sm:h-[230px] lg:h-[250px] bg-slate-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div
                    className={brand.whyChooseHeaderClassName || "smu-adv-header py-3.5 px-3 text-white flex items-center justify-center min-h-[52px] sm:min-h-[56px] transition-all duration-500"}
                    style={{ backgroundColor: headerBg }}
                  >
                    <h3 className={brand.whyChooseItemTitleClassName || "font-bold text-white m-0 tracking-tight leading-snug text-[16px] sm:text-[17.5px]"}>
                      {item.title}
                    </h3>
                  </div>

                  <div className={brand.whyChooseBodyClassName || "smu-adv-body bg-white p-4 sm:p-5 flex items-center justify-center min-h-[105px] sm:min-h-[115px] transition-all duration-500"}>
                    <p className={brand.whyChooseDescriptionClassName || "text-[15px] sm:text-[15.5px] text-[#444444] leading-relaxed m-0 font-normal"}>
                      {item.desc || item.description}
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
