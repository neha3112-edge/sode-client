"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { PartnerLogoIcon, CourseIcon, getItemSlug, isObjectId } from "./CategoryIcons";
import UniversityCarouselBlock from "./UniversityCarouselBlock";

export default function CategorySectionBlock({
  block,
  bIdx,
  slidesToShowCount,
  visibleCounts,
  setVisibleCounts,
  expandedSections,
  setExpandedSections,
  handleCardClick,
  handleSlidePointerDown,
  handleSlidePointerMove,
  handleSlideClick,
  router,
}) {
  const blockKey = String(block._id || block.slug || bIdx);
  const isCourse = Boolean(block.isCourseBlock);
  const isExpanded = isCourse
    ? (visibleCounts[blockKey] || 8) >= block.children.length
    : Boolean(expandedSections[blockKey]);
  const currentVisibleCount = isCourse ? (visibleCounts[blockKey] || 8) : block.children.length;

  return (
    <section
      key={blockKey}
      className="py-3 bg-white relative overflow-hidden"
      suppressHydrationWarning
    >
      <Container>
        <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 transition-colors duration-200 w-full mx-auto">
          {/* Section Title Header */}
          <div className="flex items-center justify-between mb-3 gap-2">
            <div className="flex items-center gap-2.5 truncate">
              <span className="w-1.5 h-5 rounded-full inline-block shrink-0 bg-blue-500" />
              <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight truncate">
                {block.title}
              </h3>
            </div>


          </div>

          {/* Content: Course Grid OR University Carousel */}
          {isCourse || isExpanded ? (
            <div className="grid grid-cols-4 md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-1.5 sm:gap-2.5 w-full mx-auto items-stretch animate-in fade-in duration-200">
              {block.children.slice(0, currentVisibleCount).map((child, idx) => {
                const isUni = !isCourse;

                return (
                  <div
                    key={child._id || idx}
                    onClick={() => {
                      if (isUni) {
                        handleCardClick(child);
                      } else {
                        const cleanSlug = getItemSlug(child);
                        if (child.targetUrl && !/[0-9a-fA-F]{24}/.test(child.targetUrl)) {
                          router.push(child.targetUrl);
                        } else if (child.targetUrl && cleanSlug && !isObjectId(cleanSlug)) {
                          router.push(child.targetUrl.replace(/[0-9a-fA-F]{24}/g, encodeURIComponent(cleanSlug)));
                        } else {
                          router.push(`/courses?course=${encodeURIComponent(cleanSlug)}`);
                        }
                      }
                    }}
                    className="w-full aspect-square bg-white hover:bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2 sm:p-2.5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-200 group min-w-0"
                  >
                    <div className="mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                      {isUni ? (
                        <PartnerLogoIcon partner={child} />
                      ) : (
                        <CourseIcon course={child} />
                      )}
                    </div>
                    <div className="h-6 min-[360px]:h-7 sm:h-8 flex items-center justify-center w-full min-w-0">
                      <span className="line-clamp-2 text-center leading-tight uppercase font-semibold text-[10px] min-[360px]:text-[11px] sm:text-xs text-gray-700 group-hover:text-blue-500 transition-colors w-full px-0.5">
                        {child.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <UniversityCarouselBlock
              block={block}
              slidesToShowCount={slidesToShowCount}
              handleSlidePointerDown={handleSlidePointerDown}
              handleSlidePointerMove={handleSlidePointerMove}
              handleSlideClick={handleSlideClick}
            />
          )}

          {/* ── BOTTOM VIEW MORE / VIEW LESS (COURSES + UNIVERSITIES) ── */}
          {isCourse && block.children && block.children.length > 8 && (
            <div className="flex justify-center mt-2.5">
              <button
                type="button"
                onClick={(e) => {
                  const btnElement = e.currentTarget;
                  const sectionElement = btnElement.closest("section");

                  if (isExpanded) {
                    setVisibleCounts((prev) => ({ ...prev, [blockKey]: 8 }));
                    setTimeout(() => {
                      if (sectionElement) {
                        const yOffset = -70;
                        const y = sectionElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
                      }
                    }, 60);
                  } else {
                    setVisibleCounts((prev) => ({ ...prev, [blockKey]: (prev[blockKey] || 8) + 8 }));
                    setTimeout(() => {
                      const scrollDelta = window.innerWidth < 768 ? 220 : 180;
                      window.scrollBy({ top: scrollDelta, behavior: "smooth" });
                    }, 100);
                  }
                }}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer shadow-none group"
              >
                <span>{isExpanded ? "View Less" : "View More"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : "group-hover:translate-y-0.5"
                  }`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          )}

          {/* University section View More button - bottom center */}
          {!isCourse && block.children && block.children.length > slidesToShowCount && (
            <div className="flex justify-center mt-2.5">
              <button
                type="button"
                onClick={(e) => {
                  const btnElement = e.currentTarget;
                  const sectionElement = btnElement.closest("section");

                  if (isExpanded) {
                    setExpandedSections((prev) => ({ ...prev, [blockKey]: false }));
                    setTimeout(() => {
                      if (sectionElement) {
                        const yOffset = -70;
                        const y = sectionElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
                      }
                    }, 60);
                  } else {
                    setExpandedSections((prev) => ({ ...prev, [blockKey]: true }));
                    setTimeout(() => {
                      const scrollDelta = window.innerWidth < 768 ? 220 : 180;
                      window.scrollBy({ top: scrollDelta, behavior: "smooth" });
                    }, 100);
                  }
                }}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer shadow-none group"
              >
                <span>{isExpanded ? "View Less" : "View More"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : "group-hover:translate-y-0.5"
                  }`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
