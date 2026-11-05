"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Carousel, Card } from "antd";

/**
 * Reusable Testimonials Carousel Section (#testimonials)
 * Provides dedicated 1-card carousel on mobile and 3-card carousel on desktop.
 * Matches 1:1 with Target reference: linear/smooth motion, no bottom dots, compact bottom margin, 1140px container.
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
  const showDots = Boolean(brand.testimonialsDots);

  return (
    <section
      id="testimonials"
      className={`bg-white overflow-hidden select-none font-['Poppins',sans-serif] ${brand.testimonialsPadding || (isClassic ? "py-10 sm:py-16" : "pt-7 sm:pt-9 lg:pt-10 pb-5 sm:pb-6 lg:pb-7")}`}
      style={{ backgroundColor: brand?.testimonialsBg || "#ffffff" }}
    >
      <div
        className={
          brand.testimonialsContainerClassName ||
          (isClassic
            ? "w-full px-3.5 sm:px-4 md:max-w-4xl lg:max-w-6xl 2xl:max-w-7xl mx-auto"
            : "max-w-[1140px] mx-auto px-4 sm:px-6")
        }
      >
        {/* Heading */}
        <div className="text-center mb-5 sm:mb-7">
          {brand.testimonialsTitleHtml ? (
            <div dangerouslySetInnerHTML={{ __html: brand.testimonialsTitleHtml }} />
          ) : (
            <h2 className="text-[23px] sm:text-[27px] lg:text-[30px] font-bold text-[#111111] tracking-tight m-0 leading-tight">
              {brand.testimonialsTitlePrefix || "What Learners Say"}{" "}
              <span style={{ color: primaryColor }}>
                {brand.testimonialsHighlight || `About ${university}`}
              </span>
            </h2>
          )}
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
            className="absolute left-0.5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center text-[#111111] hover:text-[#ee3024] p-1 bg-transparent border-none cursor-pointer active:scale-90"
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
            aria-label="Next testimonial"
            className="absolute right-0.5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center text-[#111111] hover:text-[#ee3024] p-1 bg-transparent border-none cursor-pointer active:scale-90"
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
          <div className="w-full [&_.slick-dots]:!relative [&_.slick-dots]:!mt-4 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2 [&_.slick-dots_li]:!h-2 [&_.slick-dots_li]:!mx-1 [&_.slick-dots_li_button]:!w-2 [&_.slick-dots_li_button]:!h-2 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-slate-300 [&_.slick-dots_li.slick-active_button]:!bg-[#ee3024]">
            <Carousel
              ref={mobileCarouselRef}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={brand.testimonialsAutoplay !== false}
              autoplaySpeed={brand.testimonialsInterval || 3500}
              speed={600}
              easing="linear"
              infinite={items.length > 1}
              dots={showDots}
              arrows={false}
              draggable
            >
              {items.map((item, idx) => (
                <div key={idx} className="px-1 py-1.5 outline-none">
                  <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#ececec] shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col justify-start text-left w-full min-h-[320px]">
                    {/* Rectangular Photo matching Target Image 1 */}
                    {item.image ? (
                      <div className="relative w-[120px] h-[86px] rounded-none overflow-hidden mb-3.5 bg-slate-100 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="130px"
                        />
                      </div>
                    ) : null}

                    {/* Student Name */}
                    <h3 className="text-[18px] sm:text-[19px] font-semibold text-[#212529] m-0 mb-1 leading-snug tracking-normal">
                      {item.name}
                    </h3>

                    {/* Course */}
                    <p className="text-[13.5px] sm:text-[14px] font-medium text-[#212529] m-0 mb-3 leading-snug tracking-normal">
                      {item.course}
                    </p>

                    {/* Review Text */}
                    <p className="text-[13.5px] sm:text-[14px] text-[#212529] leading-[1.6] font-normal tracking-normal m-0">
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
        <div className="hidden md:block relative w-full px-5 sm:px-6 lg:px-7">
          {/* Controls */}
          <button
            type="button"
            onClick={() => desktopCarouselRef.current?.prev()}
            aria-label="Previous testimonial"
            className="absolute -left-2 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center text-[#111111] hover:text-[#ee3024] transition-colors bg-transparent border-none cursor-pointer active:scale-90 p-1"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-[#111111]"
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
            aria-label="Next testimonial"
            className="absolute -right-2 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center text-[#111111] hover:text-[#ee3024] transition-colors bg-transparent border-none cursor-pointer active:scale-90 p-1"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-[#111111]"
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
          <div className="w-full [&_.slick-track]:!flex [&_.slick-slide]:!h-auto [&_.slick-slide>div]:!h-full [&_.slick-dots]:!relative [&_.slick-dots]:!mt-4 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2 [&_.slick-dots_li]:!h-2 [&_.slick-dots_li]:!mx-1 [&_.slick-dots_li_button]:!w-2 [&_.slick-dots_li_button]:!h-2 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-slate-300 [&_.slick-dots_li.slick-active_button]:!bg-[#ee3024]">
            <Carousel
              ref={desktopCarouselRef}
              slidesToShow={3}
              slidesToScroll={1}
              autoplay={brand.testimonialsAutoplay !== false}
              autoplaySpeed={brand.testimonialsInterval || 3500}
              speed={600}
              easing="linear"
              infinite={items.length > 3}
              dots={showDots}
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
                <div key={idx} className="px-2.5 sm:px-3 py-2 outline-none h-full">
                  {isClassic ? (
                    <Card
                      variant="borderless"
                      styles={{ body: { padding: 0 } }}
                      className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow h-full min-h-[380px] sm:min-h-[390px] md:min-h-[400px] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3.5 mb-3.5">
                          {item.image ? (
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-orange-400 shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                          ) : null}
                          <div>
                            <h4 className="text-[16px] font-semibold text-slate-900 m-0">
                              {item.name}
                            </h4>
                            <span
                              className="text-[12.5px] font-medium"
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
                      className="bg-white rounded-lg p-6 sm:p-7 border border-[#ececec] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow h-full min-h-[350px] sm:min-h-[360px] flex flex-col justify-start text-left"
                    >
                      {/* Rectangular Photo matching Target Image 1 */}
                      {item.image ? (
                        <div className="relative w-[130px] h-[94px] rounded-none overflow-hidden mb-4 bg-slate-100 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="140px"
                          />
                        </div>
                      ) : null}

                      {/* Name */}
                      <h3 className="text-[19px] sm:text-[20px] font-semibold text-[#212529] m-0 mb-1 leading-snug tracking-normal">
                        {item.name}
                      </h3>

                      {/* Course */}
                      <p className="text-[14px] sm:text-[14.5px] font-medium text-[#212529] m-0 mb-3.5 leading-snug tracking-normal">
                        {item.course}
                      </p>

                      {/* Review Text */}
                      <p className="text-[14px] sm:text-[14.5px] text-[#212529] leading-[1.6] font-normal tracking-normal m-0">
                        {item.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
