"use client";

import React, { useRef } from "react";
import { Carousel } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WHY_CHOOSE_ITEMS = [
  {
    icon: "/assets/galgotias/industry.webp",
    title: "Industry-Expert Designed Programs",
    desc: "Galgotias University online courses curriculum is enhanced in collaboration with industry-led academicians. It ensures that students gain not only relevant theoretical but also practical knowledge.",
  },
  {
    icon: "/assets/galgotias/icon.webp",
    title: "Advanced Learning Facilities",
    desc: "Students enrolled in Galgotias University online courses benefit from modern digital infrastructure. It supports a learning environment that promotes accessible learning and engaging.",
  },
  {
    icon: "/assets/galgotias/carrier.webp",
    title: "Career-Oriented Education",
    desc: "Modern organisations prefer and value individuals that develops advanced skills in respective sectors, such as the online MBA from Galgotias University. Similarly, all the courses are industry-focused and develop skills and knowledge.",
  },
  {
    icon: "/assets/galgotias/lms.webp",
    title: "Integrated Learning Management System (LMS)",
    desc: "The LMS used in Galgotias University online classes is highly advanced. It permits students to attend lectures both live and recorded. They get access to study material and can track their progress easily.",
  },
];

// Duplicate items so the carousel scrolls continuously and infinitely across 4 columns
const SLIDES = [...WHY_CHOOSE_ITEMS, ...WHY_CHOOSE_ITEMS];

export default function GalgotiasWhyChoose({ brand = {} }) {
  const carouselRef = useRef(null);

  return (
    <>
      <section
        id="advantage"
        className="py-10 sm:py-14 bg-[#f9bc08] select-none scroll-mt-20 relative overflow-hidden"
      >
        <style>{`
          .galgotias-carousel .slick-track {
            display: flex !important;
            align-items: stretch !important;
          }
          .galgotias-carousel .slick-slide {
            height: inherit !important;
            outline: none;
          }
          .galgotias-carousel .slick-slide > div {
            height: 100%;
          }
          .galgotias-carousel .slick-dots {
            bottom: -30px !important;
          }
          .galgotias-carousel .slick-dots li button {
            background: rgba(255, 255, 255, 0.7) !important;
            border-radius: 4px;
            height: 5px !important;
            width: 18px !important;
          }
          .galgotias-carousel .slick-dots li.slick-active button {
            background: #bc1820 !important;
            width: 26px !important;
          }
        `}</style>

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div className="w-10 sm:w-12 hidden md:block" />
            <h2 className="text-[24px] sm:text-[30px] lg:text-[32px] font-bold text-center text-[#bc1820] m-0 flex-1">
              Why Choose Galgotias University Online
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => carouselRef.current?.prev()}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#bc1820] shadow-sm hover:bg-slate-100 flex items-center justify-center transition-all border-none cursor-pointer active:scale-95"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => carouselRef.current?.next()}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#bc1820] shadow-sm hover:bg-slate-100 flex items-center justify-center transition-all border-none cursor-pointer active:scale-95"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          <div className="galgotias-carousel pb-6">
            <Carousel
              ref={carouselRef}
              autoplay
              autoplaySpeed={2800}
              infinite
              dots
              pauseOnHover
              slidesToShow={4}
              slidesToScroll={1}
              responsive={[
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 900,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ]}
            >
              {SLIDES.map((item, idx) => (
                <div key={idx} className="px-2.5 py-1 box-border h-full">
                  <div className="item bg-white rounded-[12px] p-6 text-center shadow-xs flex flex-col items-center justify-start min-h-[250px] h-full transition-transform hover:-translate-y-1">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-[50px] h-[50px] object-contain mb-3 mx-auto"
                    />
                    <h3 className="text-[15px] sm:text-[15.5px] font-bold text-[#111111] mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[12.5px] sm:text-[13px] text-[#444444] leading-[1.35] m-0 font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>
      <div id="midScrollTrigger" style={{ height: "1px" }} />
    </>
  );
}
