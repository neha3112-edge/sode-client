"use client";

import React from "react";
import Image from "next/image";
import { Clock, Laptop } from "lucide-react";
import { FaDownload, FaArrowRight } from "react-icons/fa";
import { Container } from "@/components/common/Container";
import { UU_UG_COURSES, UU_PG_COURSES } from "./constants";

export default function UuProgrammes({ onOpenBrochure, onOpenApply }) {
  const renderCourseCard = (course) => (
    <div
      key={course.title}
      className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col"
    >
      {/* Course Banner Image */}
      <div className="relative w-full h-[180px] sm:h-[195px] overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Course Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Title with green vertical bar */}
        <h3 className="text-[#003399] font-bold text-base sm:text-[17px] leading-snug m-0 flex items-center gap-1.5">
          <span className="text-[#62B239] font-bold">|</span>
          <span>{course.title}</span>
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed mt-2 mb-3 flex-1 line-clamp-3">
          {course.description}
        </p>

        {/* Info Strip (Duration & Type) */}
        <div className="flex items-center justify-between py-2 border-t border-b border-gray-100 mb-4 text-xs font-semibold text-gray-700">
          <span className="flex items-center gap-1.5 text-gray-700">
            <Clock size={14} className="text-[#62B239]" />
            <span>{course.duration}</span>
          </span>
          <span className="flex items-center gap-1.5 text-gray-700">
            <Laptop size={14} className="text-[#62B239]" />
            <span>{course.type}</span>
          </span>
        </div>

        {/* CTA Action Buttons (Single line whitespace-nowrap) */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onOpenBrochure?.(course.title)}
            className="w-full inline-flex items-center justify-center gap-1 border border-[#62B239] text-[#62B239] hover:bg-[#62B239] hover:text-white font-semibold text-[11px] sm:text-xs py-2 px-2 rounded-md transition-colors whitespace-nowrap cursor-pointer bg-white"
          >
            <span>Download Brochure</span>
            <FaDownload className="text-[10px] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => onOpenApply?.(course.title)}
            className="w-full inline-flex items-center justify-center gap-1 bg-[#62B239] hover:bg-[#529e2f] text-white font-semibold text-[11px] sm:text-xs py-2 px-2 rounded-md transition-colors whitespace-nowrap cursor-pointer border-none shadow-xs"
          >
            <span>Apply Now</span>
            <FaArrowRight className="text-[10px] shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="program" className="w-full py-10 sm:py-14 bg-[#f8fafc] select-none">
      <Container>
        {/* 1. Undergraduate Programs */}
        <div className="mb-10 sm:mb-14">
          <h2 className="text-[#003399] font-bold text-xl sm:text-2xl md:text-[28px] m-0 mb-6 text-center sm:text-left">
            Uttaranchal University Online{" "}
            <span className="text-[#62B239]">Undergraduate programs</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {UU_UG_COURSES.map(renderCourseCard)}
          </div>
        </div>

        {/* 2. Postgraduate Programs */}
        <div>
          <h2 className="text-[#003399] font-bold text-xl sm:text-2xl md:text-[28px] m-0 mb-6 text-center sm:text-left">
            Uttaranchal University Online{" "}
            <span className="text-[#62B239]">Postgraduate programs</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {UU_PG_COURSES.map(renderCourseCard)}
          </div>
        </div>
      </Container>
    </section>
  );
}

