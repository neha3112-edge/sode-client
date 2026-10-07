"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Carousel, Card, Button } from "antd";
import LandingContainer from "./LandingContainer";

/**
 * Reusable Testimonials Carousel Section (#testimonials)
 * Built using Ant Design Carousel, Card, and Button.
 */
export default function LandingTestimonials({
  testimonials = [],
  universityName,
  brand = {},
}) {
  const carouselRef = useRef(null);

  if (!testimonials || testimonials.length === 0) return null;

  const isClassic = brand.testimonialsCardStyle === "classic";
  const items = testimonials;
  const primaryColor = brand?.primaryColor || "#ee3024";
  const university = universityName || brand?.name || "Manipal University Online";

  return (
    <section
      id="testimonials"
      className="py-12 sm:py-16 bg-white overflow-hidden select-none"
    >
      <LandingContainer>
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-slate-900 tracking-tight m-0">
            What Learners Say{" "}
            <span style={{ color: primaryColor }}>About {university}</span>
          </h2>
          {isClassic && (
            <p className="text-xs sm:text-[14px] text-slate-600 max-w-2xl mx-auto mt-2 font-normal">
              Real stories and career transformations from our successful alumni and online learners.
            </p>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-8">
          {/* Controls */}
          <Button
            type="text"
            onClick={() => carouselRef.current?.prev()}
            className="absolute left-0 sm:-left-3 top-1/2 -translate-y-1/2 z-20 text-slate-800 hover:!text-[#ee3024] transition-colors p-1 !bg-transparent !border-none cursor-pointer flex items-center justify-center active:scale-90 !h-auto !w-auto"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
          </Button>

          <Button
            type="text"
            onClick={() => carouselRef.current?.next()}
            className="absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 z-20 text-slate-800 hover:!text-[#ee3024] transition-colors p-1 !bg-transparent !border-none cursor-pointer flex items-center justify-center active:scale-90 !h-auto !w-auto"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
          </Button>

          {/* Ant Design Carousel Viewport */}
          <div className="overflow-hidden">
            <Carousel
              ref={carouselRef}
              slidesToShow={3}
              slidesToScroll={1}
              autoplay
              autoplaySpeed={3200}
              infinite={items.length > 3}
              dots={false}
              arrows={false}
              pauseOnHover
              draggable
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: items.length > 2,
                  },
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: items.length > 1,
                  },
                },
              ]}
            >
              {items.map((item, idx) => (
                <div key={idx} className="px-2.5 sm:px-3.5 py-2 outline-none h-full">
                  {isClassic ? (
                    /* Classic Card */
                    <Card
                      variant="borderless"
                      styles={{ body: { padding: 0 } }}
                      className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3.5 mb-3.5">
                          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-orange-400 shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                          <div>
                            <h4 className="text-[15px] sm:text-[16px] font-bold text-slate-900 m-0">
                              {item.name}
                            </h4>
                            <span
                              className="text-[12px] sm:text-[12.5px] font-semibold"
                              style={{ color: primaryColor }}
                            >
                              {item.course}
                            </span>
                          </div>
                        </div>

                        <hr className="border-t border-slate-100 my-3" />

                        <p className="text-[13px] sm:text-[13.5px] text-slate-700 leading-relaxed font-normal m-0 line-clamp-5">
                          {item.text}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Quote className="w-6 h-6 text-orange-200" />
                      </div>
                    </Card>
                  ) : (
                    /* Clean Card */
                    <Card
                      variant="borderless"
                      styles={{ body: { padding: 0 } }}
                      className="bg-white rounded-[8px] sm:rounded-[10px] p-6 sm:p-7 border border-slate-100 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col justify-start text-left"
                    >
                      {/* Square Photo */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-[4px] overflow-hidden mb-3.5 shrink-0 bg-slate-100 shadow-2xs">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>

                      {/* Name */}
                      <h3 className="text-[17px] sm:text-[18px] font-bold text-slate-900 m-0 leading-tight">
                        {item.name}
                      </h3>

                      {/* Course */}
                      <p className="text-[13px] sm:text-[13.5px] text-slate-600 font-medium mt-1 mb-3.5 leading-tight">
                        {item.course}
                      </p>

                      {/* Review Text */}
                      <p className="text-[12.5px] sm:text-[13px] text-slate-700 leading-relaxed font-normal m-0">
                        {item.text}
                      </p>
                    </Card>
                  )}
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
