"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { LIVERPOOL_CERTIFICATES, liverpoolImg } from "./constants";

export default function LiverpoolCertificates({ onOpenDegree }) {
  const carouselRef = useRef(null);

  const carouselSettings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    pauseOnHover: true,
    swipeToSlide: true,
  };

  return (
    <section
      id="view-sample-degree"
      className="mba-journey-cert-wrapper w-full bg-[#071d41] py-10 sm:py-14 lg:py-16 select-none text-white overflow-hidden scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: 1-Slide Full View Ant Design Carousel (No Side Cuts) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full">
            <div className="relative w-full max-w-[480px] px-6 sm:px-8">
              {/* Prev Button (Circular with white border) */}
              <button
                type="button"
                onClick={() => carouselRef.current?.prev()}
                className="absolute left-0 sm:-left-1 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full text-[#00e5d1] flex items-center justify-center cursor-pointer transition-all shadow-xl active:scale-95"
                aria-label="Previous Certificate"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Ant Design Carousel Component (Single Card In View) */}
              <div className="liverpool-cert-slider w-full overflow-hidden rounded-lg">
                <Carousel
                  ref={carouselRef}
                  {...carouselSettings}
                  className="liverpool-cert-carousel"
                >
                  {LIVERPOOL_CERTIFICATES.map((cert, idx) => (
                    <div key={idx} className="outline-hidden! py-2 px-1">
                      <div className="flex items-center justify-center min-h-[300px] sm:min-h-[340px] md:min-h-[370px]">
                        <Image
                          src={liverpoolImg(cert.image)}
                          alt={cert.title}
                          width={480}
                          height={360}
                          className="max-h-[290px] sm:max-h-[330px] md:max-h-[360px] w-auto max-w-full object-contain shadow-2xl rounded-[4px] bg-white mx-auto"
                          style={{ width: "auto", height: "auto" }}
                          priority={idx === 0}
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>

              {/* Next Button (Circular Cyan with white border) */}
              <button
                type="button"
                onClick={() => carouselRef.current?.next()}
                className="absolute right-0 sm:-right-1 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full text-[#00e5d1] flex items-center justify-center cursor-pointer transition-all shadow-xl active:scale-95"
                aria-label="Next Certificate"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
              </button>
            </div>

            {/* Custom Styles for Antd Carousel Dots */}
            <style jsx global>{`
              .liverpool-cert-carousel .slick-dots {
                position: relative !important;
                bottom: 0 !important;
                margin-top: 14px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 6px !important;
              }
              .liverpool-cert-carousel .slick-dots li {
                width: auto !important;
                height: auto !important;
                margin: 0 !important;
              }
              .liverpool-cert-carousel .slick-dots li button {
                width: 8px !important;
                height: 8px !important;
                border-radius: 9999px !important;
                background: #94a3b8 !important;
                opacity: 0.7 !important;
                transition: all 0.3s ease !important;
              }
              .liverpool-cert-carousel .slick-dots li.slick-active button {
                width: 24px !important;
                height: 8px !important;
                border-radius: 9999px !important;
                background: #00e5d1 !important;
                opacity: 1 !important;
              }
            `}</style>
          </div>

          {/* Right Column: Information & Action */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-[22px] sm:text-[26px] lg:text-[29px] font-bold text-[#00e5d1] m-0 leading-tight">
              LBS MBA Pathway + IIM Udaipur
            </h2>
            <h3 className="text-[19px] sm:text-[22px] font-bold text-white mt-1 mb-3.5 leading-snug">
              Double Certification Edge
            </h3>

            {/* Compact paragraph with tight line-height */}
            <p className="text-[13px] sm:text-[14px] text-slate-200 leading-[1.42] sm:leading-[1.46] m-0 mb-5 font-normal max-w-[560px]">
              Professionals and learners can earn an Executive Programme in Business Management &amp;
              AI Leadership certification from IIM Udaipur while developing advanced business
              strategies, AI leadership skills, and management capabilities required for future
              leadership roles. This is complemented by the Liverpool Business School MBA, a
              WES-recognised qualification from Liverpool John Moores University with AACSB membership.
              Together, these credentials offer a powerful learning experience with double certification,
              alumni status, and practical career-focused learning opportunities through the Liverpool
              online MBA journey.
            </p>

            <button
              type="button"
              onClick={() => onOpenDegree?.("Certificates Section", "Get Degree")}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-[6px] bg-[#00e5d1] hover:bg-[#00cbb9] active:scale-95 text-[#071d41] font-bold text-[14px] sm:text-[14.5px] border-none cursor-pointer transition-all shadow-md"
            >
              <span>Get Degree</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
