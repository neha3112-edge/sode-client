"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Carousel, Card, Button } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SmuWhyChooseCarousel({ whyChoose = [], brand = {} }) {
  const carouselRef = useRef(null);
  const sectionTitle = brand.whyChooseTitle || `Advantages of ${brand.name || "Sikkim Manipal University Online"}`;

  return (
    <section
      id="whychoose"
      className="w-full py-10 sm:py-14 lg:py-16 bg-white overflow-hidden relative select-none"
    >
      <div className="text-center mb-8 sm:mb-10 px-4 max-w-4xl mx-auto">
        <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#212529] m-0 tracking-tight leading-tight">
          {sectionTitle}
        </h2>
      </div>

      <div className="w-full max-w-[1140px] xl:max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 relative">
        <Button
          type="text"
          onClick={() => carouselRef.current?.prev()}
          aria-label="Previous advantage"
          className="absolute -left-1 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 text-[#212529] hover:!text-black transition-all cursor-pointer p-2 !border-none !bg-transparent flex items-center justify-center active:scale-90 !h-auto !w-auto"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
        </Button>

        <Button
          type="text"
          onClick={() => carouselRef.current?.next()}
          aria-label="Next advantage"
          className="absolute -right-1 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 text-[#212529] hover:!text-black transition-all cursor-pointer p-2 !border-none !bg-transparent flex items-center justify-center active:scale-90 !h-auto !w-auto"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
        </Button>

        <div className="w-full py-5">
          <Carousel
            ref={carouselRef}
            autoplay
            autoplaySpeed={5000}
            dots={false}
            slidesToShow={3}
            slidesToScroll={1}
            infinite={whyChoose.length > 1}
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 2 } },
              { breakpoint: 640, settings: { slidesToShow: 1 } },
            ]}
          >
            {whyChoose.map((item, idx) => (
              <div key={`${item.title}-${idx}`} className="px-2.5 sm:px-3 box-border outline-none py-2">
                <Card
                  bordered={false}
                  styles={{ body: { padding: 0 } }}
                  className="bg-white rounded-[8px] sm:rounded-[10px] overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.07)] hover:shadow-[0px_8px_28px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col text-center border border-slate-100"
                >
                  <div className="relative w-full overflow-hidden bg-slate-100 h-44 sm:h-48 md:h-[195px]">
                    <Image
                      src={item.image || "/assets/images/smu_advantage_legacy.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="bg-[#074a76] text-white flex items-center justify-center py-3.5 px-3">
                    <h3 className="font-bold text-white m-0 tracking-tight leading-snug text-[15px] sm:text-[16px]">
                      {item.title}
                    </h3>
                  </div>

                  <div className="bg-white flex items-center justify-center p-4 sm:p-5">
                    <p className="text-[12.5px] sm:text-[13px] text-[#555555] leading-relaxed m-0 font-normal min-h-[58px] sm:min-h-[64px] flex items-center justify-center">
                      {item.desc}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
