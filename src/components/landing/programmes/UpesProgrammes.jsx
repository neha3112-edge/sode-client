"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Download, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Carousel } from "antd";

export default function UpesProgrammes({
  programmes = [],
  brand = {},
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const desktopCarouselRef = useRef(null);
  const mobileCarouselRef = useRef(null);
  const items = programmes && programmes.length > 0 ? programmes : [];

  const renderCard = (course, isMobile = false) => {
    const courseValue = course.value || course.code || course.title;
    const courseTitle = courseValue === "PGP" ? "PGP Programs" : courseValue;
    const fullCourseName = course.label?.includes(" - ")
      ? course.label.split(" - ")[1]
      : (course.subtitle || course.name || course.title);

    return (
      <div key={`${isMobile ? "mob-" : ""}${courseValue}`} className="px-2 sm:px-3 py-2 box-border outline-none">
        <div className={`card-box ${isMobile ? "max-w-[380px] mx-auto" : ""}`}>
          <div className="duration-badge">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{course.duration || "24 Months"}</span>
          </div>
          <div className="relative w-full h-[185px] sm:h-[195px] bg-slate-100 overflow-hidden">
            <Image
              src={course.image}
              alt={course.label || course.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="card-box-cnt">
            <h3>{courseTitle}</h3>
            <p className="full-course-name">({fullCourseName})</p>
            <hr className="my-2 border-t border-slate-200" />
            <p className="course-description">{course.desc || course.description}</p>
            <div className="course_buttons">
              <button
                type="button"
                className="btn-brochure"
                onClick={() => onSelectCourseForBrochure?.(courseValue, `Download ${courseValue} Brochure`)}
              >
                <span>Get Brochure</span>
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="btn-apply"
                onClick={() => onOpenApply?.(courseValue)}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="programs" className="scroll-mt-16">
      <div className="programs-heading">
        <h2>{brand.programmesTitle || "UPES University Online Degree Courses"}</h2>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 programs-container">
        {/* Navigation Arrows for Carousel (Desktop & Tablet) */}
        <button
          type="button"
          onClick={() => desktopCarouselRef.current?.prev()}
          aria-label="Previous Course"
          className="hidden md:flex absolute -left-2 lg:-left-5 top-[45%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 items-center justify-center text-slate-700 hover:text-[#f2167d] hover:border-[#f2167d] transition-all cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={() => desktopCarouselRef.current?.next()}
          aria-label="Next Course"
          className="hidden md:flex absolute -right-2 lg:-right-5 top-[45%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 items-center justify-center text-slate-700 hover:text-[#f2167d] hover:border-[#f2167d] transition-all cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* MOBILE VIEW (block md:hidden): Ant Design Carousel with Single Card */}
        <div className="block md:hidden w-full">
          <Carousel
            ref={mobileCarouselRef}
            dots={true}
            draggable={true}
            arrows={false}
            infinite={true}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {items.map((course) => renderCard(course, true))}
          </Carousel>
        </div>

        {/* DESKTOP & TABLET VIEW (hidden md:block): Exactly unchanged code */}
        <div className="hidden md:block w-full">
          <Carousel
            ref={desktopCarouselRef}
            dots={true}
            draggable={true}
            arrows={false}
            infinite={true}
            slidesToShow={3}
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {items.map((course) => renderCard(course, false))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
