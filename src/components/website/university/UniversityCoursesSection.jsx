"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Modal } from "antd";
import { Clock, Plus, Check, ChevronDown, Download, Briefcase, GraduationCap, Award, BookOpen, Database, UserCog, ShoppingCart } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";
import { getAssetPath } from "@/lib/utils";

const SPEC_ICONS = [Briefcase, BookOpen, GraduationCap, Award, Database, UserCog, ShoppingCart];

export default function UniversityCoursesSection({
  coursesList = [],
  filteredCourses = [],
  activeCourseFilter = "ALL",
  setActiveCourseFilter,
  visibleCoursesCount = 6,
  setVisibleCoursesCount,
  uniName,
  slug,
  uni,
  logoUrl,
  openFormModal,
}) {
  const { toggleCompare, isInCompare, setIsCompareDrawerOpen } = useCompare();
  const [selectedCourseSpec, setSelectedCourseSpec] = useState(null);

  if (!coursesList || coursesList.length === 0) return null;

  return (
    <div id="university-courses-section" className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 scroll-mt-20">
      <div className="flex flex-col items-center justify-center mb-3 sm:mb-5">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight text-center m-0">
          {uniName} Courses
        </h2>
        {activeCourseFilter !== "ALL" && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-500 font-medium">
              Filter: <span className="font-bold text-[#0D3B66]">{activeCourseFilter}</span>
            </span>
            <button
              type="button"
              onClick={() => setActiveCourseFilter("ALL")}
              className="text-xs text-[#08AEAA] hover:underline font-bold cursor-pointer border-none bg-transparent p-0"
            >
              Clear Filter (Show All {coursesList.length} Courses)
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 auto-rows-fr">
        {filteredCourses.slice(0, visibleCoursesCount).map((item, index) => {
          const cardTitle = item.title || item.name || "";
          const durationText = item.duration || "";
          const feeText = typeof item.fees === "string"
            ? item.fees
            : item.fees?.formattedSemesterFees ||
            (item.fees?.semesterFees ? `₹ ${Number(item.fees.semesterFees).toLocaleString("en-IN")} / Semester` : null) ||
            item.fees?.formattedPerSemesterPayable ||
            item.fees?.formattedActualFees ||
            item.fees?.formattedNetPayable ||
            "";
          const rawCourseSlug = item.slug || encodeURIComponent(cardTitle.toLowerCase());
          const courseDetailHref = rawCourseSlug.includes("/")
            ? `/university/${rawCourseSlug}`
            : `/university/${slug || uni.slug || ""}/${rawCourseSlug}`;
          const specCount = item.specializationsCount || item.subcourses?.length || 0;
          const inCmp = isInCompare(item._id || item.slug || cardTitle);
          const courseRawLogo = item.logo?.url || item.logo?.path || (typeof item.logo === "string" ? item.logo : null);
          const courseLogoUrl = courseRawLogo ? getAssetPath(courseRawLogo) : null;
          const displayCourseLogo = courseLogoUrl || logoUrl;

          return (
            <div
              key={item._id || item.slug || `${cardTitle}-${index}`}
              className={`bg-gray-50 rounded-xl border border-gray-200 hover:border-[#08AEAA] p-2 sm:p-2.5 hover:shadow-md transition-all flex flex-col items-center justify-between text-center relative group min-w-0 w-full h-full shadow-2xs ${
                index === 5 && visibleCoursesCount === 6 ? "flex lg:hidden" : "flex"
              }`}
            >
              {specCount > 0 && (
                <div className="absolute top-0 left-0 z-10">
                  <button
                    type="button"
                    onClick={() => setSelectedCourseSpec(item)}
                    className="bg-[#08AEAA] hover:bg-[#079995] text-white text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-1 rounded-tl-xl rounded-br-xl cursor-pointer transition-colors border-none flex items-center gap-1 shadow-2xs leading-none"
                  >
                    {String(specCount).padStart(2, "0")} Specialisation
                  </button>
                </div>
              )}

              <div className="w-11 h-11 sm:w-11 sm:h-11 rounded-full p-1 flex items-center justify-center relative mt-2.5 sm:mt-3 mb-1.5 sm:mb-2 shrink-0">
                {displayCourseLogo ? (
                  <Link href={courseDetailHref} className="relative w-full h-full block">
                    <Image
                      src={displayCourseLogo}
                      alt={cardTitle || uniName}
                      fill
                      sizes="(max-width: 768px) 48px, 60px"
                      className="object-contain transition-transform group-hover:scale-105"
                    />
                  </Link>
                ) : (
                  <Link href={courseDetailHref} className="w-full h-full rounded-full bg-teal-50 text-[#08AEAA] font-bold flex items-center justify-center text-xs uppercase no-underline">
                    {(cardTitle || uniName).charAt(0)}
                  </Link>
                )}
              </div>

              <div className="w-full flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-center">
                  <Link
                    href={courseDetailHref}
                    className="text-xs sm:text-[13px] font-semibold text-[#0a2540] hover:text-[#08AEAA] line-clamp-2 leading-tight m-0 w-full text-center no-underline transition-colors"
                  >
                    {cardTitle}
                  </Link>
                </div>

                <div className="min-h-9 flex items-center justify-center gap-1 sm:gap-1.5 text-center w-full whitespace-nowrap overflow-hidden pt-0.5">
                  {feeText ? (
                    <span className="text-[11.5px] sm:text-[13px] font-bold text-[#0D3B66] tracking-tight shrink-0">
                      {feeText.replace(/\s*\/\s*Semester/i, " / Sem").replace(/\s*INR$/, "")}
                    </span>
                  ) : null}
                  {feeText && durationText && (
                    <span className="text-gray-300 text-xs shrink-0">•</span>
                  )}
                  {durationText ? (
                    <div className="text-[10.5px] sm:text-[11.5px] text-gray-500 font-normal flex items-center gap-0.5 sm:gap-1 shrink-0">
                      <Clock className="w-3 h-3 shrink-0 text-gray-400" />
                      <span>{durationText}</span>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="w-full mt-auto pt-1.5">
                <div className="w-full grid grid-cols-2 gap-1.5 items-center">
                  <button
                    type="button"
                    onClick={() => {
                      openFormModal &&
                        openFormModal({
                          title: "Apply for Course",
                          subtitle: `${cardTitle} - ${uniName}`,
                          defaultCourse: `${cardTitle} - ${uniName}`,
                          university: uniName,
                          formNameOverride: `CourseCard_${item.slug || uniName}`,
                          submitButtonText: "Apply Now",
                        });
                    }}
                    className="w-full bg-[#F4D068] hover:bg-[#ebc557] text-gray-900 text-[11px] sm:text-xs font-semibold py-2 px-1 rounded-md sm:rounded-lg border-none cursor-pointer transition-colors active:scale-95 flex items-center justify-center text-center whitespace-nowrap leading-none"
                  >
                    Apply Now
                  </button>
                  <Link
                    href={courseDetailHref}
                    className="w-full bg-[#0D3B66] hover:bg-[#072440] text-white border-none text-[11px] sm:text-xs font-semibold py-2 px-1 rounded-md sm:rounded-lg text-center no-underline transition-colors flex items-center justify-center whitespace-nowrap leading-none"
                  >
                    Know More
                  </Link>
                </div>

                <hr className="w-full border-t border-gray-200 my-1.5" />

                <button
                  type="button"
                  onClick={() => {
                    const targetItem = {
                      _id: item._id || item.slug,
                      slug: item.slug || item._id,
                      title: cardTitle,
                      uniName: uniName,
                      logoUrl: displayCourseLogo || logoUrl,
                      feeText: feeText,
                      durationText: durationText,
                    };
                    toggleCompare(targetItem);
                    setIsCompareDrawerOpen(true);
                  }}
                  className={`w-full py-1 text-[11px] sm:text-xs font-medium flex items-center justify-center gap-1 transition-all cursor-pointer mt-1 border-none bg-transparent min-h-[22px] ${
                    inCmp
                      ? "text-[#08AEAA] font-bold"
                      : "text-gray-600 hover:text-[#0D3B66]"
                  }`}
                >
                  {inCmp ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#08AEAA] shrink-0 stroke-[2.5]" />
                      <span>Added to Compare</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 text-gray-500 shrink-0 stroke-2" />
                      <span>Add to Compare</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length > 5 && (
        <div className="flex justify-center mt-4 pt-1">
          <button
            type="button"
            onClick={() =>
              setVisibleCoursesCount((prev) =>
                prev >= filteredCourses.length ? 6 : filteredCourses.length
              )
            }
            className="inline-flex items-center justify-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer shadow-none group"
          >
            <span>
              {visibleCoursesCount >= filteredCourses.length ? "View Less" : "View More"}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                visibleCoursesCount >= filteredCourses.length
                  ? "rotate-180"
                  : "group-hover:translate-y-0.5"
              }`}
            />
          </button>
        </div>
      )}

      {/* Specializations Modal Popup */}
      {selectedCourseSpec && (
        <Modal
          open={Boolean(selectedCourseSpec)}
          onCancel={() => setSelectedCourseSpec(null)}
          footer={null}
          centered
          width={650}
          title={
            <div className="flex items-center gap-2 text-base font-bold text-[#0D3B66]">
              <GraduationCap className="text-[#08AEAA]" size={20} />
              <span>
                {selectedCourseSpec.title || selectedCourseSpec.name} Specialisations at {uniName}
              </span>
            </div>
          }
        >
          <div className="py-2">
            <p className="text-xs text-gray-500 mb-4">
              Explore specialized industry-aligned tracks available under this program:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {(selectedCourseSpec.subcourses || selectedCourseSpec.specializations || []).map((sc, scIdx) => {
                const specName = sc.name || sc.title || `Specialization ${scIdx + 1}`;
                const IconComponent = SPEC_ICONS[scIdx % SPEC_ICONS.length];

                return (
                  <div
                    key={sc._id || scIdx}
                    className="p-3 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-blue-50/40 hover:border-blue-300 transition-all flex items-center gap-2.5"
                  >
                    <IconComponent className="text-[#08AEAA] shrink-0" size={16} />
                    <span className="text-xs font-semibold text-gray-800 line-clamp-2">
                      {specName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
