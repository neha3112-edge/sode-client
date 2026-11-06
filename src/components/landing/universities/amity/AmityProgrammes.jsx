"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { amityImg } from "./constants";

export const AMITY_PROGRAMMES = [
  {
    id: "ba",
    code: "BA",
    title: "Bachelor of Arts",
    level: "Graduation",
    duration: "36 Months",
    image: amityImg("BA-amity.png"),
    description:
      "Amity University Online BA is a 3-year program that offers the necessary skills required in different work cultures-critical and innovative thinking, communication, humanities, and understanding of different languages.",
  },
  {
    id: "mba",
    code: "MBA",
    title: "Master of Business Administration",
    level: "Post Graduation",
    duration: "24 Months",
    image: amityImg("MBA-amity.png"),
    description:
      "Amity University Online provides an online 2-year MBA program. Amity University MBA online program is crafted to help learners develop leadership, and business skills for successful careers or entrepreneurship.",
  },
  {
    id: "mca",
    code: "MCA",
    title: "Master of Computer Application",
    level: "Post Graduation",
    duration: "24 Months",
    image: amityImg("MCA-amity.png"),
    description:
      "The Amity University online MCA program provides learning in advanced technologies and tools. The MCA Online Course Amity provides specializations in Blockchain and many other in collaboration with eCornell and TCS iON.",
  },
  {
    id: "mcom",
    code: "MCOM",
    title: "Master of Commerce",
    level: "Post Graduation",
    duration: "24 Months",
    image: amityImg("MCOM-amity.png"),
    description:
      "Amity University Online M.com offers a rock foundation in 3 aspects - Commerce, Finance, and Technology. Amity University Online M.com offers a specialization in Financial Management, with many more providing strong career opportunities.",
  },
  {
    id: "ma",
    code: "MA",
    title: "Master of Arts",
    level: "Post Graduation",
    duration: "24 Months",
    image: amityImg("MA-amity.png"),
    description:
      "Amity Online MA in Journalism & Mass Communication or English fosters high-level research capabilities, media production ethics, digital journalism, and creative writing.",
  },
  {
    id: "msc",
    code: "MSC",
    title: "Master of Science (Data Science)",
    level: "Post Graduation",
    duration: "24 Months",
    image: amityImg("msc-main-img.webp"),
    description:
      "Amity Online MSC in Data Science offers industry-aligned syllabus covering Machine Learning, Big Data pipelines, Neural Networks, Python, and predictive business analytics.",
  },
  {
    id: "bba",
    code: "BBA",
    title: "Bachelor of Business Administration",
    level: "Graduation",
    duration: "36 Months",
    image: amityImg("BBA-amity.png"),
    description:
      "In Amity University online BBA program, students learn topics like managerial economics and many more in-depth. The Amity online BBA Program provides an in-depth study of theoretical and functional areas of BBA.",
  },
  {
    id: "bca",
    code: "BCA",
    title: "Bachelor of Computer Application",
    level: "Graduation",
    duration: "36 Months",
    image: amityImg("BCA-amity.png"),
    description:
      "Amity University Online BCA is a 3-year program that provides knowledge of computer skills in programming, software development, and managing digital data through its online BCA program with top in-demand market areas.",
  },
  {
    id: "bcom",
    code: "BCOM",
    title: "Bachelor of Commerce",
    level: "Graduation",
    duration: "36 Months",
    image: amityImg("BCOM-amity.png"),
    description:
      "Amity University Online offers a 3-year B.COM program providing a solid base in accounting, taxation, business operations, marketing, fund management, and advertising. Amity online B.COM builds students' overall financial knowledge.",
  },
];

export default function AmityProgrammes({ onOpenBrochure }) {
  const carouselSettings = {
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    infinite: true,
    dots: false,
    arrows: false,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderCard = (course, isMobile = false) => (
    <div
      className={`w-full ${
        isMobile ? "max-w-[340px] sm:max-w-[360px] mx-auto h-auto" : "h-[375px]"
      } bg-white rounded-[10px] overflow-hidden shadow-md flex flex-col select-none text-left`}
    >
      {/* Card Thumbnail Image */}
      <div className="relative w-full h-[155px] shrink-0 bg-gray-100 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes={isMobile ? "360px" : "(max-width: 1024px) 33vw, 25vw"}
          className="object-cover"
        />
        {/* Level Badge (Graduation / Post Graduation) */}
        <span className="absolute top-0 left-0 bg-[#00a651] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-br-[5px] select-none shadow-xs">
          {course.level}
        </span>
      </div>

      {/* Card Body */}
      <div className={`p-3.5 sm:p-4 flex flex-col ${isMobile ? "" : "flex-1 justify-between"}`}>
        <div>
          {/* Short Code */}
          <h3 className="text-[#08417b] font-bold text-[20px] sm:text-[21px] leading-tight m-0 tracking-tight">
            {course.code}
          </h3>
          {/* Full Program Title */}
          <h4 className="text-[#08417b] font-semibold text-[12.5px] sm:text-[13px] mt-0.5 mb-1 leading-tight">
            {course.title}
          </h4>
          {/* Description */}
          <p className="text-[#333333] text-[11.5px] sm:text-[12px] leading-[1.35] m-0">
            {course.description}
          </p>
        </div>

        {/* Card Footer: Aligned at bottom with tight, natural spacing */}
        <div
          className={`flex items-center justify-between pt-2.5 border-t border-gray-100 shrink-0 ${
            isMobile ? "mt-3.5" : "mt-2.5 mt-auto"
          }`}
        >
          <button
            type="button"
            onClick={() => onOpenBrochure?.(course.code)}
            className="inline-flex items-center gap-1.5 bg-[#fbcb12] hover:bg-[#eab308] text-[#08417b] font-bold text-[11.5px] sm:text-[12px] px-3 py-1 rounded-[4px] transition-colors cursor-pointer select-none"
          >
            <span>Get Brochure</span>
            <svg
              className="w-2.5 h-2.5 fill-current shrink-0"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              <path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24z" />
            </svg>
          </button>

          <div className="flex items-center gap-1 text-[11.5px] sm:text-[12px] font-medium text-[#222222]">
            <span aria-hidden="true">⌛</span>
            <span>{course.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="programmes"
      className="w-full bg-[#08417b] py-6 sm:py-8 lg:py-8 scroll-mt-16 sm:scroll-mt-20 relative"
    >
      <span id="program" className="sr-only" aria-hidden="true" />
      {/* Full-width container: Wide spread matching production */}
      <div className="w-full max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-5 sm:mb-6 select-none">
          <h2 className="text-white font-bold text-[24px] sm:text-[28px] md:text-[32px] leading-[1.08] m-0">
            Amity University
            <br />
            Online Degree Courses
          </h2>
        </div>

        {/* 1. Mobile View (< md): Vertically stacked cards (Exact match to production media_1793958110929_20eafd5b.jpg) */}
        <div className="block md:hidden w-full px-2">
          <div className="flex flex-col gap-4 w-full">
            {AMITY_PROGRAMMES.map((course) => (
              <div key={`mob-${course.id}`} className="w-full">
                {renderCard(course, true)}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Desktop & Tablet View (>= md): Ant Design Carousel with mouse drag */}
        <div className="hidden md:block w-full cursor-grab active:cursor-grabbing">
          <Carousel
            draggable
            swipe
            swipeToSlide
            touchMove
            {...carouselSettings}
          >
            {AMITY_PROGRAMMES.map((course) => (
              <div key={`desk-${course.id}`} className="px-1.5 sm:px-2 pb-2">
                {renderCard(course, false)}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

