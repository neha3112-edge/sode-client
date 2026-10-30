"use client";

import React, { useState, useRef } from "react";
import { Carousel } from "antd";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export default function CourseCurriculum({
  curriculumList,
  courseData,
  universityName,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const carouselRef = useRef(null);

  if (!curriculumList || curriculumList.length === 0) return null;

  const hasCarousel = curriculumList.length > 4 && !isExpanded;

  const renderCurriculumCard = (sem, idx) => {
    const rawLabel = sem.semester || sem.semesterName || `Semester ${idx + 1}`;
    const cleanLabel = String(rawLabel).trim();

    // Check if term is like "Module 1: Introduction to Marketing"
    const moduleMatch = cleanLabel.match(/^(module\s*\d+)\s*[:–—\-]\s*(.+)$/i);
    let semesterTitle = cleanLabel;
    let extractedGroupTitle = null;

    if (moduleMatch) {
      semesterTitle = moduleMatch[1]; // e.g. "Module 1"
      extractedGroupTitle = moduleMatch[2].trim(); // e.g. "Introduction to Marketing"
    } else if (/^\d+$/.test(cleanLabel)) {
      semesterTitle = `Semester ${cleanLabel}`;
    }

    let electivesList = Array.isArray(sem.electives) ? [...sem.electives] : [];
    let subjectsList = Array.isArray(sem.subjects) ? sem.subjects : [];

    // If extracted module group title exists and electives is empty, seamlessly group topics into elective
    if (extractedGroupTitle && electivesList.length === 0 && subjectsList.length > 0) {
      electivesList = [
        {
          groupTitle: extractedGroupTitle,
          selectCount: 1,
          options: subjectsList.map((sub) => (typeof sub === "string" ? sub : sub?.name || "")),
        },
      ];
      subjectsList = [];
    }

    return (
      <div
        key={idx}
        className="bg-white rounded-2xl border border-gray-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col items-center hover:border-[#08AEAA] transition-colors h-[300px] sm:h-[330px] w-full"
      >
        <div className="bg-[#0C3A66] text-white px-4 py-1 rounded-full text-xs sm:text-[13px] font-semibold mb-2.5 shadow-xs shrink-0">
          {semesterTitle}
        </div>

        <div className="w-full h-px bg-gray-100 mb-2.5 shrink-0" />

        <div className="w-full text-left space-y-3 text-xs sm:text-[13px] text-gray-700 m-0 p-0 flex-1 min-h-0 overflow-y-auto pr-1.5 scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
          {subjectsList.length > 0 && (
            <ul className="space-y-2 sm:space-y-2.5 m-0 p-0 list-none">
              {subjectsList.map((sub, sIdx) => {
                const subName = typeof sub === "string" ? sub : (sub.name || "");

                return (
                  <li key={sIdx} className="flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                    <span className="text-gray-900 font-bold shrink-0">•</span>
                    <span className="text-gray-700 break-words">{subName}</span>
                  </li>
                );
              })}
            </ul>
          )}

          {electivesList.map((elec, eIdx) => {
            const opts = Array.isArray(elec.options) ? elec.options : [];
            if (opts.length === 0) return null;
            const rawTitle = elec.groupTitle || "Electives";
            const title = rawTitle.replace(/\s*\(\s*choose\s*any\s*\d*\s*\)/gi, "").trim() || "Electives";

            return (
              <div
                key={eIdx}
                className="mt-2.5 pt-2 border-t border-dashed border-amber-300/80 bg-amber-50/50 rounded-lg p-2.5"
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="inline-block bg-amber-100 text-amber-900 font-semibold text-[11px] px-2 py-0.5 rounded border border-amber-300">
                    {title}
                  </span>
                </div>
                <ul className="space-y-1.5 m-0 p-0 list-none text-xs text-amber-950">
                  {opts.map((opt, oIdx) => (
                    <li key={oIdx} className="flex items-start gap-1.5 leading-relaxed pl-1">
                      <span className="text-amber-600 font-semibold shrink-0">○</span>
                      <span className="break-words font-medium">{typeof opt === "string" ? opt : opt.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      id="syllabus"
      data-nav-label="Syllabus"
      className="scroll-mt-20 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-4 sm:mb-6 m-0">
        {courseData?.name || "Course"} Course Updated Syllabus 2026 {universityName ? `at ${universityName}` : ""}
      </h2>

      {hasCarousel ? (
        <div className="relative group/curriculum-carousel px-0 sm:px-1">
          {/* Navigation Chevron Left */}
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            aria-label="Previous syllabus module"
            className="absolute -left-2.5 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-gray-200/90 shadow-md text-gray-700 hover:text-[#0C3A66] hover:border-gray-300 hover:shadow-lg flex items-center justify-center cursor-pointer transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Antd Carousel Container */}
          <Carousel
            ref={carouselRef}
            dots={false}
            infinite={false}
            draggable={true}
            swipeToSlide={true}
            touchMove={true}
            slidesToShow={4}
            slidesToScroll={1}
            responsive={[
              { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 1 } },
              { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
              { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
              { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            ]}
            className="w-full [&_.slick-track]:flex! [&_.slick-track]:items-stretch! [&_.slick-slide]:h-auto! [&_.slick-slide]:flex! [&_.slick-slide>div]:h-full! [&_.slick-slide>div]:w-full! [&_.slick-slide>div]:flex! [&_.slick-slide>div]:flex-col!"
          >
            {curriculumList.map((sem, idx) => (
              <div key={idx} className="p-1.5 sm:p-2 h-full flex flex-col">
                {renderCurriculumCard(sem, idx)}
              </div>
            ))}
          </Carousel>

          {/* Navigation Chevron Right */}
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            aria-label="Next syllabus module"
            className="absolute -right-2.5 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-gray-200/90 shadow-md text-gray-700 hover:text-[#0C3A66] hover:border-gray-300 hover:shadow-lg flex items-center justify-center cursor-pointer transition-all active:scale-95"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 animate-in fade-in duration-200">
          {curriculumList.map((sem, idx) => (
            <div key={idx} className="w-full h-full">
              {renderCurriculumCard(sem, idx)}
            </div>
          ))}
        </div>
      )}

      {/* View More / View Less Toggle Button */}
      {curriculumList.length > 4 && (
        <div className="flex justify-center mt-3.5 sm:mt-4">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center justify-center gap-1 px-3.5 sm:px-4 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer shadow-none group"
          >
            <span>{isExpanded ? "View Less" : "View More"}</span>
            <ChevronDown
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : "group-hover:translate-y-0.5"
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
