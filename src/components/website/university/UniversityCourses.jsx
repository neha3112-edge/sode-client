"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Modal } from "antd";
import { Clock, Plus, Check, ChevronDown, Download, Briefcase, GraduationCap, Award, BookOpen, Database, UserCog, ShoppingCart, CheckCircle2 } from "lucide-react";
import { FaCalendar, FaClock } from "react-icons/fa";
import { useCompare } from "@/hooks/useCompare";
import { getAssetPath, formatAdmissionDeadline } from "@/lib/utils";

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
  heroBannerUrl,
  openFormModal,
}) {
  const { toggleCompare, isInCompare, setIsCompareDrawerOpen } = useCompare();
  const [selectedCourseSpec, setSelectedCourseSpec] = useState(null);

  if (!coursesList || coursesList.length === 0) return null;

  return (
    <div
      id="university-courses-section"
      data-nav-label="Courses"
      className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 scroll-mt-20"
    >
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
            ? `/universities/${rawCourseSlug}`
            : `/universities/${slug || uni.slug || ""}/${rawCourseSlug}`;
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

      {/* Course Details Modal */}
      {selectedCourseSpec && (() => {
        const cTitle = selectedCourseSpec.title || selectedCourseSpec.name || "Course Details";
        const semFee = selectedCourseSpec.fees?.formattedSemesterFees || (selectedCourseSpec.fees?.semesterFees ? `₹ ${Number(selectedCourseSpec.fees.semesterFees).toLocaleString("en-IN")} / Semester` : "");
        const fullFee = selectedCourseSpec.fees?.formattedPerSemesterPayable
          ? selectedCourseSpec.fees.formattedPerSemesterPayable
          : selectedCourseSpec.fees?.formattedActualFees || selectedCourseSpec.fees?.formattedNetPayable || "";
        const rawFee = semFee || fullFee;
        const modalFeeText = rawFee ? (String(rawFee).trim().startsWith("₹") ? rawFee : `₹ ${rawFee}`) : "";

        const cDuration = selectedCourseSpec.duration || "";
        const itemDeadline = formatAdmissionDeadline(selectedCourseSpec.admissionDeadline || uni?.admissionDeadline || uni?.admission_deadline || "");
        const itemDesc = selectedCourseSpec.description?.trim() || selectedCourseSpec.overview?.trim() || selectedCourseSpec.desc?.trim() || (cTitle ? `This Program focuses on ${cTitle}, covering specialized concepts and practical applications. Learners build analysis and professional problem-solving through degree study, preparing for relevant professional and industry roles and supporting confident professional growth.` : "");

        const specializationsList = Array.isArray(selectedCourseSpec.subcourses) && selectedCourseSpec.subcourses.length > 0
          ? selectedCourseSpec.subcourses
          : Array.isArray(selectedCourseSpec.subCourses)
            ? selectedCourseSpec.subCourses
            : [];

        const courseRawLogo = selectedCourseSpec.logo?.url || selectedCourseSpec.logo?.path || (typeof selectedCourseSpec.logo === "string" ? selectedCourseSpec.logo : null);
        const uniLogoSrc = logoUrl || (courseRawLogo ? getAssetPath(courseRawLogo) : null);

        const bannerSrc = selectedCourseSpec.banner || selectedCourseSpec.coursepageimage || selectedCourseSpec.bannerImage || heroBannerUrl;

        return (
          <Modal
            open={Boolean(selectedCourseSpec)}
            onCancel={() => setSelectedCourseSpec(null)}
            footer={null}
            centered
            width={(selectedCourseSpec?.subcourses?.length || selectedCourseSpec?.subCourses?.length || 0) > 0 ? 1120 : 880}
            className="max-w-[95vw] [&_.ant-modal-content]:rounded-2xl sm:[&_.ant-modal-content]:rounded-3xl [&_.ant-modal-content]:p-4 sm:[&_.ant-modal-content]:p-6 md:[&_.ant-modal-content]:p-7 [&_.ant-modal-close]:top-3.5 [&_.ant-modal-close]:right-3.5 sm:[&_.ant-modal-close]:top-4 sm:[&_.ant-modal-close]:right-4"
          >
            <div className="flex flex-col md:flex-row items-stretch gap-4 sm:gap-6 p-0 sm:p-1 pb-1 max-h-[85vh] overflow-y-auto overflow-x-hidden">
              {/* Left Column: Portrait Banner Card */}
              <div className="relative w-full md:w-80 lg:w-88 shrink-0 h-36 sm:h-44 md:h-auto min-h-36 sm:min-h-44 md:min-h-[350px] md:max-h-[460px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 shadow-xs flex items-stretch">
                {bannerSrc ? (
                  <Image
                    src={getAssetPath(bannerSrc)}
                    alt={cTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-[#0C2B4E] to-[#0077B6] flex items-center justify-center">
                    <GraduationCap className="w-14 h-14 sm:w-16 sm:h-16 text-white/40" />
                  </div>
                )}

                {/* Top-Left Logo Badge: University Logo */}
                {uniLogoSrc && (
                  <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 bg-white rounded-lg sm:rounded-xl shadow-md p-1.5 sm:p-2 flex flex-col items-center justify-center text-center min-w-[60px] sm:min-w-[74px] max-w-[76px] sm:max-w-[90px]">
                    <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                      <Image
                        src={uniLogoSrc}
                        alt={uniName || "University"}
                        fill
                        sizes="32px"
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-bold text-gray-900 leading-tight mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                      {uniName}
                    </span>
                  </div>
                )}
              </div>

              {/* Right Column: Details & Actions */}
              <div className="flex-1 flex flex-col justify-start text-left gap-3 sm:gap-3.5">
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-[25px] font-black text-[#0C2B4E] tracking-tight leading-tight mb-2.5">
                    {cTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs text-gray-500 font-medium mb-2.5">
                    {cDuration && (
                      <div className="flex items-center gap-1.5">
                        <FaClock className="w-3 h-3 text-[#072C50] shrink-0" />
                        <span>{cDuration}</span>
                      </div>
                    )}
                    {modalFeeText && (
                      <span className="font-bold text-gray-500">{modalFeeText}</span>
                    )}
                    {itemDeadline && (
                      <div className="flex items-center gap-1.5">
                        <FaCalendar className="w-3 h-3 text-[#072C50] shrink-0" />
                        <span className="text-red-500">
                          Admission Deadline : <strong className="font-semibold text-gray-500">{itemDeadline}</strong>
                        </span>
                      </div>
                    )}
                  </div>

                  {itemDesc && (
                    <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mb-0 font-normal line-clamp-3 sm:line-clamp-4">
                      {itemDesc}
                    </p>
                  )}
                </div>

                {/* Middle: Specializations OR Program Highlights */}
                {specializationsList.length > 0 ? (
                  <div className="my-1">
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
                      <h4 className="text-xs sm:text-sm md:text-base font-bold text-[#0C2B4E] m-0 tracking-tight shrink-0">
                        {specializationsList.length} Specializations Available
                      </h4>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 sm:gap-2 max-h-32 sm:max-h-40 overflow-y-auto pr-1">
                      {specializationsList.map((sub, idx) => {
                        const subName = typeof sub === "string" ? sub : sub.name || "";
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-blue-50/50 text-[#0C2B4E] border border-blue-100 hover:bg-blue-100/50 transition-colors"
                          >
                            <CheckCircle2 size={13} className="text-[#08AEAA] shrink-0" />
                            <span className="truncate leading-tight" title={subName}>
                              {subName}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="my-1 bg-slate-50/90 rounded-xl p-3 sm:p-3.5 border border-slate-200/70">
                    <div className="text-[11px] sm:text-xs font-bold text-[#0C2B4E] mb-2 tracking-tight uppercase">
                      Program Highlights
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#08AEAA] shrink-0" />
                        <span className="font-medium text-gray-800 text-[11px] sm:text-xs">100% Online & Flexible</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#08AEAA] shrink-0" />
                        <span className="font-medium text-gray-800 text-[11px] sm:text-xs">UGC & DEB Entitled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#08AEAA] shrink-0" />
                        <span className="font-medium text-gray-800 text-[11px] sm:text-xs">Career & Placement Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#08AEAA] shrink-0" />
                        <span className="font-medium text-gray-800 text-[11px] sm:text-xs">Industry-Aligned Curriculum</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom: Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-3 pt-2 mt-auto w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCourseSpec(null);
                      openFormModal &&
                        openFormModal({
                          title: "Download Brochure",
                          subtitle: `${cTitle} - ${uniName}`,
                          defaultCourse: `${cTitle} - ${uniName}`,
                          university: uniName,
                          formNameOverride: `BrochureModal_${selectedCourseSpec.slug || uniName}`,
                          isBrochureForm: true,
                          submitButtonText: "Download Brochure",
                        });
                    }}
                    className="flex-1 min-w-0 bg-[#0C2B4E] hover:bg-[#081f38] text-white text-[11px] sm:text-xs md:text-sm font-semibold py-2.5 px-2 sm:px-4 rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-xs active:scale-95 border-none"
                  >
                    <span className="truncate">Download Brochure</span>
                    <Download className="w-3.5 h-3.5 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCourseSpec(null);
                      openFormModal &&
                        openFormModal({
                          title: "Book Free Counseling",
                          subtitle: `${cTitle} - ${uniName}`,
                          defaultCourse: `${cTitle} - ${uniName}`,
                          university: uniName,
                          formNameOverride: `CourseDetailModal_${selectedCourseSpec.slug || uniName}`,
                          submitButtonText: "Get Counseling",
                        });
                    }}
                    className="flex-1 min-w-0 bg-white hover:bg-gray-50 text-[#0C2B4E] border border-[#0C2B4E] text-[10.5px] min-[380px]:text-[11.5px] sm:text-xs md:text-sm font-semibold py-2.5 px-1.5 sm:px-4 rounded-xl flex items-center justify-center text-center transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <span className="truncate">Get 100% FREE Counseling</span>
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        );
      })()}
    </div>
  );
}
