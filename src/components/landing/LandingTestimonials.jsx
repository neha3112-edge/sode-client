"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Carousel, Card } from "antd";
import LandingContainer from "./LandingContainer";

/**
 * Reusable Testimonials Carousel Section (#testimonials)
 * Provides dedicated 1-card carousel on mobile and 3-card carousel on desktop.
 */
export default function LandingTestimonials({
  testimonials = [],
  universityName,
  brand = {},
}) {
  const mobileCarouselRef = useRef(null);
  const desktopCarouselRef = useRef(null);

  if (!testimonials || testimonials.length === 0) return null;

  const isClassic = brand.testimonialsCardStyle === "classic";
  const items = testimonials;
  const primaryColor = brand?.primaryColor || "#ee3024";
  const university = universityName || brand?.name || "Manipal University Online";

  return (
    <section
      id="testimonials"
      className="py-10 sm:py-16 bg-white overflow-hidden select-none"
    >
      <LandingContainer>
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-slate-900 tracking-tight m-0 leading-snug">
            What Learners Say{" "}
            <span style={{ color: primaryColor }}>About</span>{" "}
            <span className="block sm:inline" style={{ color: primaryColor }}>
              {university}
            </span>
          </h2>
          {isClassic && (
            <p className="text-xs sm:text-[14px] text-slate-600 max-w-2xl mx-auto mt-2 font-normal">
              Real stories and career transformations from our successful alumni and online learners.
            </p>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MOBILE VIEW: Exactly 1 Card per slide (md:hidden)             */}
        {/* ------------------------------------------------------------- */}
        <div className="block md:hidden relative w-full max-w-[390px] mx-auto px-7">
          {/* Controls */}
          <button
            type="button"
            onClick={() => mobileCarouselRef.current?.prev()}
            aria-label="Previous testimonial"
            className="absolute left-0.5 top-[46%] -translate-y-1/2 z-20 text-slate-800 hover:text-[#ee3024] p-1.5 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => mobileCarouselRef.current?.next()}
            aria-label="Next testimonial"
            className="absolute right-0.5 top-[46%] -translate-y-1/2 z-20 text-slate-800 hover:text-[#ee3024] p-1.5 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Carousel Viewport */}
          <div className="w-full [&_.slick-dots]:!relative [&_.slick-dots]:!mt-5 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2.5 [&_.slick-dots_li]:!h-2.5 [&_.slick-dots_li]:!mx-1 [&_.slick-dots_li_button]:!w-2.5 [&_.slick-dots_li_button]:!h-2.5 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-[#d9d9d9] [&_.slick-dots_li.slick-active_button]:!bg-[#8c8c8c]">
            <Carousel
              ref={mobileCarouselRef}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay
              autoplaySpeed={3500}
              infinite={items.length > 1}
              dots={brand.testimonialsDots !== undefined ? brand.testimonialsDots : true}
              arrows={false}
              draggable
            >
              {items.map((item, idx) => (
                <div key={idx} className="px-1 py-2 outline-none">
                  <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col justify-start text-left w-full min-h-[350px] sm:min-h-[360px]">
                    {/* Square Photo at Top Left */}
                    <div className="relative w-20 h-20 rounded-md overflow-hidden mb-3.5 bg-slate-100 shrink-0 shadow-2xs">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Student Name */}
                    <h3 className="text-[17px] font-bold text-slate-900 m-0 mb-1 leading-snug">
                      {item.name}
                    </h3>

                    {/* Course */}
                    <p className="text-[13px] font-medium text-slate-600 m-0 mb-3.5 leading-snug">
                      {item.course}
                    </p>

                    {/* Review Text */}
                    <p className="text-[13px] text-slate-700 leading-relaxed font-normal m-0">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP VIEW: 3 Cards per slide (hidden md:block)             */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:block relative max-w-6xl mx-auto px-10">
          {/* Controls */}
          <button
            type="button"
            onClick={() => desktopCarouselRef.current?.prev()}
            aria-label="Previous testimonial"
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 text-slate-800 hover:text-[#ee3024] p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
          >
            <ChevronLeft className="w-8 h-8 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => desktopCarouselRef.current?.next()}
            aria-label="Next testimonial"
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-slate-800 hover:text-[#ee3024] p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
          >
            <ChevronRight className="w-8 h-8 stroke-[2.5]" />
          </button>

          {/* Carousel Viewport */}
          <div className="w-full [&_.slick-track]:!flex [&_.slick-slide]:!h-auto [&_.slick-slide>div]:!h-full [&_.slick-dots]:!relative [&_.slick-dots]:!mt-6 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2.5 [&_.slick-dots_li]:!h-2.5 [&_.slick-dots_li]:!mx-1.5 [&_.slick-dots_li_button]:!w-2.5 [&_.slick-dots_li_button]:!h-2.5 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-[#d9d9d9] [&_.slick-dots_li.slick-active_button]:!bg-[#8c8c8c]">
            <Carousel
              ref={desktopCarouselRef}
              slidesToShow={3}
              slidesToScroll={1}
              autoplay
              autoplaySpeed={3500}
              infinite={items.length > 3}
              dots={brand.testimonialsDots !== undefined ? brand.testimonialsDots : true}
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
              ]}
            >
              {items.map((item, idx) => (
                <div key={idx} className="px-3 py-3 outline-none h-full">
                  {isClassic ? (
                    <Card
                      variant="borderless"
                      styles={{ body: { padding: 0 } }}
                      className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow h-full min-h-[380px] sm:min-h-[390px] md:min-h-[400px] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3.5 mb-3.5">
                          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-orange-400 shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                          <div>
                            <h4 className="text-[16px] font-bold text-slate-900 m-0">
                              {item.name}
                            </h4>
                            <span
                              className="text-[12.5px] font-semibold"
                              style={{ color: primaryColor }}
                            >
                              {item.course}
                            </span>
                          </div>
                        </div>

                        <hr className="border-t border-slate-100 my-3" />

                        <p className="text-[13.5px] text-slate-700 leading-relaxed font-normal m-0 line-clamp-5">
                          {item.text}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Quote className="w-6 h-6 text-orange-200" />
                      </div>
                    </Card>
                  ) : (
                    <div
                      className="bg-white rounded-xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-lg transition-shadow h-full min-h-[380px] sm:min-h-[390px] md:min-h-[400px] flex flex-col justify-start text-left"
                    >
                      {/* Square Photo */}
                      <div className="relative w-20 h-20 rounded-md overflow-hidden mb-3.5 bg-slate-100 shrink-0 shadow-2xs">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Name */}
                      <h3 className="text-[18px] font-bold text-slate-900 m-0 mb-1 leading-snug">
                        {item.name}
                      </h3>

                      {/* Course */}
                      <p className="text-[13.5px] font-medium text-slate-600 m-0 mb-3.5 leading-snug">
                        {item.course}
                      </p>

                      {/* Review Text */}
                      <p className="text-[13.5px] text-slate-700 leading-relaxed font-normal m-0">
                        {item.text}
                      </p>
                    </div>
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
