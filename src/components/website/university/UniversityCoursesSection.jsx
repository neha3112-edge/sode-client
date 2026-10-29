"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Modal } from "antd";
import {
  Clock,
  Plus,
  Check,
  ChevronDown,
  Download,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Database,
  UserCog,
  ShoppingCart,
  CheckCircle2,
  ArrowLeft,
  X,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { FaCalendar, FaClock } from "react-icons/fa";
import { useCompare } from "@/hooks/useCompare";
import { formatAdmissionDeadline } from "@/lib/utils";
import { openWhatsAppBrochure } from "@/lib/whatsappBrochure";
import { request } from "@/services/request";
import { getFullSpecName, getCleanSpecName } from "../course/CourseSpecializations";

const getMediaUrl = (obj) => (typeof obj === "string" ? obj : obj?.url || obj?.path || obj?.src || null);

const extractDurationText = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number") return `${val} Months`;
  if (typeof val === "object") {
    if (val.name) return String(val.name);
    if (val.months) return `${val.months} Months`;
  }
  return "";
};

const extractFeeText = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number") return `₹ ${Number(val).toLocaleString("en-IN")}`;
  if (typeof val === "object") {
    const defaultPlan = val.defaultPlan || (val.ledger?.semester ? "semester" : (val.ledger?.yearly ? "yearly" : "fullfees"));

    if (defaultPlan === "fullfees" || (!val.ledger?.semester && !val.ledger?.yearly)) {
      const full = val.ledger?.fullfees;
      if (full?.formattedBasePayable) return String(full.formattedBasePayable);
      if (full?.formattedPayable) return String(full.formattedPayable);
      if (val.formattedBasePayable) return String(val.formattedBasePayable);
      if (val.formattedNetPayable) return String(val.formattedNetPayable);
      if (val.formattedActualFees) return String(val.formattedActualFees);
      if (val.basePayable) return `₹ ${Number(val.basePayable).toLocaleString("en-IN")}`;
      if (val.netPayable) return `₹ ${Number(val.netPayable).toLocaleString("en-IN")}`;
      if (val.actualFees) return `₹ ${Number(val.actualFees).toLocaleString("en-IN")}`;
      if (val.amount) return `₹ ${Number(val.amount).toLocaleString("en-IN")}`;
      if (val.name) return String(val.name);
    }

    if (defaultPlan === "yearly" && val.ledger?.yearly) {
      const yr = val.ledger.yearly;
      if (yr.formattedBasePayable) return String(yr.formattedBasePayable);
      if (yr.formattedPayable) return String(yr.formattedPayable);
    }

    if (defaultPlan === "semester" && val.ledger?.semester) {
      const sem = val.ledger.semester;
      if (sem.formattedBasePayable) return String(sem.formattedBasePayable);
      if (sem.formattedPayable) return String(sem.formattedPayable);
      if (val.formattedSemesterFees) return String(val.formattedSemesterFees);
      if (val.semesterFees) return `₹ ${Number(val.semesterFees).toLocaleString("en-IN")} / Semester`;
      if (val.formattedPerSemesterPayable) return String(val.formattedPerSemesterPayable);
      if (val.perSemesterPayable) return `₹ ${Number(val.perSemesterPayable).toLocaleString("en-IN")} / Semester`;
    }

    if (val.ledger?.semester?.formattedBasePayable) return String(val.ledger.semester.formattedBasePayable);
    if (val.formattedSemesterFees && !val.formattedSemesterFees.includes("NaN")) return String(val.formattedSemesterFees);
    if (val.formattedBasePayable) return String(val.formattedBasePayable);
    if (val.formattedNetPayable) return String(val.formattedNetPayable);
    if (val.formattedActualFees) return String(val.formattedActualFees);
    if (val.basePayable) return `₹ ${Number(val.basePayable).toLocaleString("en-IN")}`;
    if (val.netPayable) return `₹ ${Number(val.netPayable).toLocaleString("en-IN")}`;
    if (val.actualFees) return `₹ ${Number(val.actualFees).toLocaleString("en-IN")}`;
    if (val.amount) return `₹ ${Number(val.amount).toLocaleString("en-IN")}`;
    if (val.name) return String(val.name);
  }
  return "";
};

const SPEC_ICONS = [Briefcase, BookOpen, GraduationCap, Award, Database, UserCog, ShoppingCart];

export default function UniversityCoursesSection({
  coursesList = [],
  filteredCourses = [],
  activeCourseFilter = "ALL",
  setActiveCourseFilter,
  visibleCoursesCount = 5,
  setVisibleCoursesCount,
  uniName,
  slug,
  uni,
  logoUrl,
  heroBannerUrl,
  openFormModal,
}) {
  const router = useRouter();
  const { toggleCompare, isInCompare, setIsCompareDrawerOpen, compareList } = useCompare();
  const [selectedCourseSpec, setSelectedCourseSpec] = useState(null);
  const [selectedSubSpec, setSelectedSubSpec] = useState(null);
  const [selectedSpecDetail, setSelectedSpecDetail] = useState(null);
  const [specFullData, setSpecFullData] = useState(null);
  const [loadingSpecDetail, setLoadingSpecDetail] = useState(false);
  const [activeSpecSem, setActiveSpecSem] = useState(0);
  const brandColor = uni?.color_code || "#08AEAA";

  const handleCloseSpecModal = () => {
    setSelectedCourseSpec(null);
    setSelectedSubSpec(null);
    setSelectedSpecDetail(null);
    setSpecFullData(null);
    setActiveSpecSem(0);
  };

  const handleBackToSpecList = () => {
    setSelectedSpecDetail(null);
    setSpecFullData(null);
    setActiveSpecSem(0);
  };

  const handleOpenSpecDetail = async (sc, parentData) => {
    const scObj = typeof sc === "string" ? { name: sc, title: sc } : sc;
    setSelectedSpecDetail(scObj);
    setSpecFullData(null);
    setLoadingSpecDetail(true);
    setActiveSpecSem(0);

    try {
      const cleanUni = String(slug || uni?.slug || "university").toLowerCase().trim();
      let rawCourseSlug = String(parentData?.slug || parentData?.title || parentData?.name || "").toLowerCase().trim();
      let cleanCourse = rawCourseSlug.replace(new RegExp(`^${cleanUni}[/-]?`), "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

      let slugPath = "";
      if (parentData?.slug && parentData.slug.includes("/")) {
        slugPath = parentData.slug;
      } else if (cleanUni && cleanCourse) {
        slugPath = `${cleanUni}/${cleanCourse}`;
      }

      let detailResult = null;
      if (slugPath) {
        const res = await request.dynamicRead({
          entity: "courses",
          endPoint: "v1/list",
          id: slugPath,
          revalidate: 300,
        });
        detailResult = res?.result || res;
      }

      if (!detailResult || (!Array.isArray(detailResult.subcourses) && !Array.isArray(detailResult.subCourses))) {
        const uSlug = slug || uni?.slug;
        const cSlug = parentData?.slug ? parentData.slug.replace(new RegExp(`^${cleanUni}[/-]?`), "") : "";
        if (uSlug && cSlug) {
          const res2 = await request.dynamicRead({
            entity: "courses",
            endPoint: "v1/list",
            id: `${uSlug}/${cSlug}`,
            revalidate: 300,
          });
          detailResult = res2?.result || res2;
        }
      }

      const list = detailResult?.subcourses || detailResult?.subCourses || parentData?.subcourses || parentData?.subCourses;
      if (Array.isArray(list)) {
        const subSlug = (scObj.slug || scObj.name || "").toLowerCase().trim();
        const scIdStr = String(scObj._id || scObj.id || "");
        const matched = list.find((item) => {
          if (!item) return false;
          if (scIdStr && (String(item._id) === scIdStr || String(item.id) === scIdStr)) return true;
          if (item.slug && item.slug.toLowerCase().trim() === subSlug) return true;
          const iName = (item.name || "").toLowerCase().trim();
          if (iName === subSlug || iName.includes(subSlug) || subSlug.includes(iName)) return true;
          return false;
        });
        if (matched) {
          setSpecFullData(matched);
        }
      }
    } catch (err) {
      console.error("Failed to fetch specialization details:", err);
    } finally {
      setLoadingSpecDetail(false);
    }
  };

  if (!coursesList || coursesList.length === 0) return null;

  return (
    <div
      id="programs"
      data-nav-label="Programs"
      className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 scroll-mt-20 relative"
    >
      <span id="courses" className="sr-only" />
      <span id="university-courses-section" className="sr-only" />
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
        {filteredCourses.slice(0, visibleCoursesCount).map((item, index) => {
          const cardTitle = item.title || item.name || "";
          const durationText = item.duration || "";
          const feeText = extractFeeText(item.fees);
          const rawCourseSlug = item.slug || encodeURIComponent(cardTitle.toLowerCase());
          const courseDetailHref = rawCourseSlug.includes("/")
            ? `/universities/${rawCourseSlug}`
            : `/universities/${slug || uni.slug || ""}/${rawCourseSlug}`;
          const specCount = item.isDirectCard ? 0 : (item.specializationsCount || item.subcourses?.length || 0);
          const inCmp = isInCompare(item._id || item.slug || cardTitle);
          const courseLogoUrl = item.logo ? getMediaUrl(item.logo) : null;
          const displayCourseLogo = courseLogoUrl || logoUrl;

          return (
            <div
              key={item._id || item.slug || `${cardTitle}-${index}`}
              className="bg-gray-50 rounded-xl border border-gray-200 hover:border-[#08AEAA] p-1.5 min-[360px]:p-2 sm:p-2.5 hover:shadow-md transition-all flex flex-col items-center justify-between text-center relative group min-w-0 w-full aspect-square shadow-2xs overflow-hidden"
            >
              {specCount > 0 && (
                <div className="absolute top-0 left-0 z-10">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCourseSpec(item);
                      setSelectedSubSpec(null);
                      setSelectedSpecDetail(null);
                      setSpecFullData(null);
                      setActiveSpecSem(0);
                    }}
                    style={{ backgroundColor: brandColor }}
                    className="hover:opacity-90 text-white text-[8.5px] min-[360px]:text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-tl-xl rounded-br-xl cursor-pointer transition-opacity border-none flex items-center gap-1 shadow-2xs leading-none"
                  >
                    {String(specCount).padStart(2, "0")} Specialisation
                  </button>
                </div>
              )}

              {/* Course Logo */}
              <div className="w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 sm:w-11 sm:h-11 rounded-full p-0.5 sm:p-1 flex items-center justify-center relative mt-2 min-[360px]:mt-2.5 sm:mt-3 mb-0.5 sm:mb-1 shrink-0">
                {displayCourseLogo ? (
                  <Link href={courseDetailHref} className="relative w-full h-full block">
                    <Image
                      src={displayCourseLogo}
                      alt={cardTitle || uniName}
                      fill
                      sizes="(max-width: 768px) 44px, 56px"
                      className="object-contain transition-transform group-hover:scale-105"
                    />
                  </Link>
                ) : (
                  <Link href={courseDetailHref} className="w-full h-full rounded-full bg-teal-50 text-[#08AEAA] font-bold flex items-center justify-center text-xs uppercase no-underline">
                    {(cardTitle || uniName).charAt(0)}
                  </Link>
                )}
              </div>

              {/* Title & Duration/Fees Info */}
              <div className="w-full flex-1 flex flex-col justify-center min-h-0 px-0.5">
                <div className="flex items-center justify-center">
                  <Link
                    href={courseDetailHref}
                    className="text-[11px] min-[360px]:text-xs sm:text-[13px] font-semibold text-[#0a2540] hover:text-[#08AEAA] line-clamp-1 sm:line-clamp-2 leading-tight m-0 w-full text-center no-underline transition-colors"
                  >
                    {cardTitle}
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-1 text-center w-full whitespace-nowrap overflow-hidden pt-0.5">
                  {feeText ? (
                    <span className="text-[10px] min-[360px]:text-[11px] sm:text-[12px] font-bold text-[#0D3B66] tracking-tight shrink-0">
                      {feeText.replace(/\s*\/\s*Semester/i, " / Sem").replace(/\s*INR$/, "")}
                    </span>
                  ) : null}
                  {feeText && durationText && (
                    <span className="text-gray-300 text-[10px] shrink-0">•</span>
                  )}
                  {durationText ? (
                    <div className="text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] text-gray-500 font-normal flex items-center gap-0.5 shrink-0">
                      <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 text-gray-400" />
                      <span>{durationText}</span>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="w-full mt-auto shrink-0 pt-0.5">
                <div className="w-full grid grid-cols-2 gap-1 sm:gap-1.5 items-center">
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
                    className="w-full bg-[#F4D068] hover:bg-[#ebc557] text-gray-900 text-[9.5px] min-[360px]:text-[10.5px] sm:text-xs font-semibold py-1 sm:py-1.5 px-0.5 sm:px-1 rounded-md sm:rounded-lg border-none cursor-pointer transition-colors active:scale-95 flex items-center justify-center text-center whitespace-nowrap leading-none"
                  >
                    Apply Now
                  </button>
                  <Link
                    href={courseDetailHref}
                    className="w-full bg-[#0D3B66] hover:bg-[#072440] text-white border-none text-[9.5px] min-[360px]:text-[10.5px] sm:text-xs font-semibold py-1 sm:py-1.5 px-0.5 sm:px-1 rounded-md sm:rounded-lg text-center no-underline transition-colors flex items-center justify-center whitespace-nowrap leading-none"
                  >
                    Know More
                  </Link>
                </div>

                <hr className="w-full border-t border-gray-200 my-0.5 min-[360px]:my-1 sm:my-1.5" />

                <button
                  type="button"
                  onClick={() => {
                    const cleanSlug = slug || uni?.slug || (item.slug && !item.slug.includes("/") ? item.slug : null) || item.slug?.split("/")[0] || item._id;
                    if (inCmp) {
                      const slugs = (compareList || [])
                        .map((u) => u.uniSlug || (u.slug && !u.slug.includes("/") ? u.slug : null) || u.slug?.split("/")[0] || u._id || u.id)
                        .filter(Boolean);
                      const combinedSlugs = Array.from(new Set([...slugs, cleanSlug])).filter(Boolean).slice(0, 3);
                      const crsParam = cardTitle || item.rawName || "";
                      router.push(
                        `/tools/compare-universities?university=${encodeURIComponent(combinedSlugs.join(","))}${crsParam ? `&course=${encodeURIComponent(crsParam)}` : ""}`
                      );
                    } else {
                      const targetItem = {
                        _id: item._id || cleanSlug,
                        slug: cleanSlug,
                        uniSlug: cleanSlug,
                        name: uniName,
                        uniName: uniName,
                        title: cardTitle,
                        courseName: cardTitle,
                        course: cardTitle,
                        logoUrl: displayCourseLogo || logoUrl,
                        logoSrc: displayCourseLogo || logoUrl,
                        feeText: feeText,
                        durationText: durationText,
                      };
                      toggleCompare(targetItem);
                      setIsCompareDrawerOpen(true);
                    }
                  }}
                  className={`w-full py-0.5 text-[9.5px] min-[360px]:text-[10.5px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer border-none bg-transparent min-h-[18px] sm:min-h-[22px] ${inCmp
                    ? "text-[#08AEAA] font-bold hover:underline"
                    : "text-gray-600 hover:text-[#0D3B66]"
                    }`}
                >
                  {inCmp ? (
                    <>
                      <Check className="w-3 h-3 text-[#08AEAA] shrink-0 stroke-[2.5]" />
                      <span>Compare Now</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3 text-gray-500 shrink-0 stroke-2" />
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
            onClick={() => {
              if (visibleCoursesCount >= filteredCourses.length) {
                setVisibleCoursesCount(5);
                const section = document.getElementById("programs") || document.getElementById("university-courses-section");
                if (section) {
                  const yOffset = -70;
                  const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
                }
              } else {
                setVisibleCoursesCount((prev) => prev + 5);
              }
            }}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer shadow-none group"
          >
            <span>
              {visibleCoursesCount >= filteredCourses.length ? "View Less" : "View More"}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${visibleCoursesCount >= filteredCourses.length
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
        const modalFeeText = extractFeeText(selectedCourseSpec.fees);

        const cDuration = selectedCourseSpec.duration || "";
        const itemDeadline = formatAdmissionDeadline(selectedCourseSpec.admissionDeadline || uni?.admissionDeadline || uni?.admission_deadline || "");
        const itemDesc = selectedCourseSpec.description?.trim() || selectedCourseSpec.overview?.trim() || selectedCourseSpec.desc?.trim() || "";

        const specializationsList = selectedCourseSpec.isDirectCard
          ? []
          : (Array.isArray(selectedCourseSpec.subcourses) && selectedCourseSpec.subcourses.length > 0
            ? selectedCourseSpec.subcourses
            : Array.isArray(selectedCourseSpec.subCourses)
              ? selectedCourseSpec.subCourses
              : []);

        const uniLogoSrc = logoUrl || (selectedCourseSpec.logo ? getMediaUrl(selectedCourseSpec.logo) : null);

        const rawCourseSlug = selectedCourseSpec.slug || encodeURIComponent(cTitle.toLowerCase());
        const baseCourseDetailHref = rawCourseSlug.includes("/")
          ? `/universities/${rawCourseSlug}`
          : `/universities/${slug || uni?.slug || ""}/${rawCourseSlug}`;

        const bannerSrc = selectedCourseSpec.banner || selectedCourseSpec.coursepageimage || selectedCourseSpec.bannerImage || heroBannerUrl;

        return (
          <Modal
            open={Boolean(selectedCourseSpec)}
            onCancel={handleCloseSpecModal}
            footer={null}
            centered
            closable={false}
            destroyOnHidden
            width={selectedSpecDetail ? 1150 : (specializationsList.length > 0 ? 1120 : 880)}
            className="max-w-[95vw] [&_.ant-modal-content]:rounded-2xl sm:[&_.ant-modal-content]:rounded-3xl [&_.ant-modal-content]:p-4 sm:[&_.ant-modal-content]:p-6 md:[&_.ant-modal-content]:p-7"
          >
            {selectedSpecDetail ? (
              // ── VIEW 2: SPECIALIZATION DETAIL VIEW (WITH CURRICULUM, SYLLABUS, SEMESTERS) ──
              (() => {
                const cleanSpecTitle = getCleanSpecName(selectedSpecDetail.name, cTitle);
                const detailTitle = getFullSpecName(selectedSpecDetail.name, cTitle);
                const fullDetailWithUni = detailTitle.toLowerCase().includes(uniName.toLowerCase())
                  ? detailTitle
                  : `${detailTitle} - ${uniName}`;

                const itemDuration =
                  extractDurationText(specFullData?.duration) ||
                  extractDurationText(selectedSpecDetail?.duration) ||
                  extractDurationText(cDuration) ||
                  "";

                const rawDeadline =
                  specFullData?.admissionDeadline ||
                  selectedSpecDetail?.admissionDeadline ||
                  selectedCourseSpec.admissionDeadline ||
                  uni?.admissionDeadline ||
                  uni?.admission_deadline ||
                  "";
                const specDeadline = rawDeadline ? formatAdmissionDeadline(rawDeadline) : "";

                const rawDesc =
                  specFullData?.description ||
                  selectedSpecDetail?.description ||
                  itemDesc;
                const specDesc = typeof rawDesc === "string" ? rawDesc.trim() : "";

                const itemFeesFormatted =
                  extractFeeText(specFullData?.fees) ||
                  extractFeeText(specFullData?.fee) ||
                  extractFeeText(selectedSpecDetail?.fees) ||
                  extractFeeText(selectedSpecDetail?.fee) ||
                  extractFeeText(modalFeeText) ||
                  "";

                const specDesktopBannerRaw =
                  specFullData?.bannerImage ||
                  specFullData?.bannerImg ||
                  specFullData?.banner ||
                  specFullData?.image ||
                  selectedSpecDetail?.bannerImage ||
                  selectedSpecDetail?.bannerImg ||
                  selectedSpecDetail?.banner ||
                  selectedSpecDetail?.image ||
                  bannerSrc ||
                  "";
                const specDesktopBanner = specDesktopBannerRaw ? (getMediaUrl(specDesktopBannerRaw) || "") : "";

                const specMobileBannerRaw =
                  specFullData?.bannerImageMobile ||
                  specFullData?.mobileBannerImg ||
                  selectedSpecDetail?.bannerImageMobile ||
                  selectedSpecDetail?.mobileBannerImg ||
                  specDesktopBannerRaw;
                const specMobileBanner = specMobileBannerRaw ? (getMediaUrl(specMobileBannerRaw) || specDesktopBanner) : specDesktopBanner;

                const specCurriculum = (() => {
                  if (Array.isArray(specFullData?.curriculum) && specFullData.curriculum.length > 0) {
                    return specFullData.curriculum
                      .filter((c) => c && ((Array.isArray(c.subjects) && c.subjects.length > 0) || (Array.isArray(c.electives) && c.electives.length > 0)))
                      .map((c, idx) => ({
                        semester: c.semesterName || `Semester ${idx + 1}`,
                        subjects: Array.isArray(c.subjects) ? c.subjects : [],
                        electives: Array.isArray(c.electives) ? c.electives : [],
                      }));
                  }
                  if (Array.isArray(selectedSpecDetail?.curriculum) && selectedSpecDetail.curriculum.length > 0) {
                    return selectedSpecDetail.curriculum
                      .filter((c) => c && ((Array.isArray(c.subjects) && c.subjects.length > 0) || (Array.isArray(c.electives) && c.electives.length > 0)))
                      .map((c, idx) => ({
                        semester: c.semesterName || `Semester ${idx + 1}`,
                        subjects: Array.isArray(c.subjects) ? c.subjects : [],
                        electives: Array.isArray(c.electives) ? c.electives : [],
                      }));
                  }
                  return [];
                })();

                const activeCurriculum = specCurriculum[activeSpecSem] || specCurriculum[0];

                const cleanUniSlug = String(slug || uni?.slug || "university").toLowerCase().trim();
                const rawCourseSlug = String(selectedCourseSpec.slug || cTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")).toLowerCase().trim();
                const cleanCourseSlug = rawCourseSlug.replace(new RegExp(`^${cleanUniSlug}[/-]?`), "");
                const specSlug =
                  selectedSpecDetail?.slug ||
                  (selectedSpecDetail?.name
                    ? selectedSpecDetail.name
                      .toLowerCase()
                      .replace(/^online\s+[a-z0-9+-]+\s+in\s+/i, "")
                      .replace(/^distance\s+[a-z0-9+-]+\s+in\s+/i, "")
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, "")
                    : "");
                const fullSlug = specSlug && !cleanCourseSlug.toLowerCase().includes(specSlug)
                  ? `${cleanUniSlug}/${cleanCourseSlug}/${specSlug}`
                  : `${cleanUniSlug}/${cleanCourseSlug}`;

                return (
                  <div className="relative text-left max-h-[82vh] overflow-y-auto pr-1 scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
                    {/* Top Bar with Back Button & Close Button */}
                    <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 gap-2">
                      <button
                        type="button"
                        onClick={handleBackToSpecList}
                        className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-bold text-[#0B2546] bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-0 shrink-0"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to Specializations</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCloseSpecModal}
                        className="w-8 h-8 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer border-0 ml-auto shrink-0"
                        aria-label="Close modal"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row items-stretch gap-5 sm:gap-6">
                      {/* Left Column: Portrait Banner Card */}
                      <div className="relative w-full md:w-80 lg:w-88 shrink-0 h-36 sm:h-44 md:h-auto min-h-36 sm:min-h-44 md:min-h-[350px] md:max-h-[460px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 shadow-xs flex items-stretch">
                        {specDesktopBanner && (
                          <Image
                            src={specDesktopBanner}
                            alt={detailTitle}
                            fill
                            sizes="(max-width: 768px) 100vw, 370px"
                            className={`object-cover object-center ${specMobileBanner && specMobileBanner !== specDesktopBanner ? "hidden md:block" : "block"
                              }`}
                          />
                        )}

                        {specMobileBanner && specMobileBanner !== specDesktopBanner && (
                          <Image
                            src={specMobileBanner}
                            alt={detailTitle}
                            fill
                            sizes="100vw"
                            className="object-cover object-center block md:hidden"
                          />
                        )}

                        {!specDesktopBanner && !specMobileBanner && (
                          <div className="w-full h-full bg-linear-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                            <span className="text-slate-400 font-bold text-sm">No Image</span>
                          </div>
                        )}

                        {(selectedSpecDetail?.logo || (uniLogoSrc && !uniName?.toLowerCase().includes("manipal"))) && (
                          <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 bg-white rounded-xl shadow-md p-1.5 sm:p-2.5 flex flex-col items-center justify-center text-center min-w-[64px] sm:min-w-[74px] max-w-[80px] sm:max-w-[90px]">
                            <div className="relative w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center">
                              <Image
                                src={getMediaUrl(selectedSpecDetail?.logo) || uniLogoSrc}
                                alt={selectedSpecDetail?.logo ? cleanSpecTitle : (uniName || "University")}
                                fill
                                sizes="36px"
                                className="object-contain"
                              />
                            </div>
                            <span className="text-[8.5px] sm:text-[9.5px] font-bold text-gray-900 leading-tight mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                              {selectedSpecDetail?.logo ? cleanSpecTitle : uniName}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right Column: Content */}
                      <div className="flex-1 flex flex-col justify-start text-left gap-3 sm:gap-3.5">
                        <div>
                          <h3 className="text-xl sm:text-2xl lg:text-[25px] font-black text-[#0C2B4E] tracking-tight leading-tight mb-2.5">
                            {detailTitle}
                          </h3>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500 font-medium mb-2.5">
                            {itemDuration && (
                              <div className="flex items-center gap-1.5">
                                <FaClock className="w-3 h-3 text-[#072C50] shrink-0" />
                                <span>{itemDuration}</span>
                              </div>
                            )}
                            {itemFeesFormatted && (
                              <span className="font-bold text-gray-500">{itemFeesFormatted}</span>
                            )}
                            {specDeadline && (
                              <div className="flex items-center gap-1.5">
                                <FaCalendar className="w-3 h-3 text-[#072C50] shrink-0" />
                                <span className="text-red-500">
                                  Admission Deadline: <strong className="font-semibold text-gray-500">{specDeadline}</strong>
                                </span>
                              </div>
                            )}
                          </div>

                          <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mb-0 font-normal">
                            {specDesc}
                          </p>
                        </div>

                        {/* Course Curriculum Section */}
                        {specCurriculum.length > 0 ? (
                          <div>
                            <div className="flex items-center gap-3 mb-2.5">
                              <h4 className="text-sm sm:text-base font-bold text-[#0C2B4E] m-0 tracking-tight shrink-0">
                                Course Curriculum
                              </h4>
                              <div className="flex-1 h-px bg-gray-200" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-stretch">
                              <div className="col-span-12 md:col-span-3 grid grid-cols-3 md:flex md:flex-col gap-2">
                                {specCurriculum.map((sem, sIdx) => {
                                  const isActive = activeSpecSem === sIdx;
                                  return (
                                    <button
                                      key={sIdx}
                                      type="button"
                                      onClick={() => setActiveSpecSem(sIdx)}
                                      className={`w-full py-1.5 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer border-none ${isActive
                                        ? "bg-[#0C2B4E] text-white shadow-xs md:w-full"
                                        : "bg-[#EEF3FA] text-[#475569] hover:bg-[#dde7f5] md:w-[88%]"
                                        }`}
                                    >
                                      <span className="flex items-center justify-between w-full">
                                        <span>{sem.semester}</span>
                                        {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>

                              <div className="col-span-12 md:col-span-9 bg-linear-to-br from-blue-50/50 via-blue-50/30 to-slate-50/40 border border-blue-100/80 rounded-2xl p-3.5 sm:p-4 min-h-[135px] flex items-start">
                                <div className="w-full space-y-3">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 w-full">
                                    {(activeCurriculum?.subjects || []).map((sub, subIdx) => (
                                      <div key={subIdx} className="flex items-start gap-2 text-xs text-gray-700 leading-snug">
                                        <span className="text-gray-900 font-bold shrink-0 leading-none mt-0.5">•</span>
                                        <span className="font-medium text-gray-800 line-clamp-1">
                                          {typeof sub === "string" ? sub : sub.name || ""}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                  {(activeCurriculum?.electives || []).map((elec, eIdx) => {
                                    const title = elec.groupTitle || `Elective (Choose Any ${elec.selectCount || 1})`;
                                    const opts = Array.isArray(elec.options) ? elec.options : [];
                                    if (opts.length === 0) return null;
                                    return (
                                      <div key={eIdx} className="pt-2 border-t border-dashed border-amber-300 bg-amber-50/60 rounded-lg p-2">
                                        <div className="text-[11px] font-semibold text-amber-900 mb-1 inline-block bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                                          {title}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-amber-950">
                                          {opts.map((opt, oIdx) => (
                                            <div key={oIdx} className="flex items-start gap-1.5 leading-snug">
                                              <span className="text-amber-600 font-semibold shrink-0">○</span>
                                              <span className="font-medium">{typeof opt === "string" ? opt : opt.name}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : loadingSpecDetail ? (
                          <div className="my-2 bg-slate-50/90 rounded-xl p-3 sm:p-4 border border-slate-200/70 flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-[#08AEAA] border-t-transparent rounded-full animate-spin" />
                            <span className="text-xs text-gray-600 font-medium">Loading specialization curriculum...</span>
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

                        {/* Bottom Action Buttons */}
                        <div className="flex items-center gap-2 sm:gap-3 pt-2 mt-auto w-full">
                          <button
                            type="button"
                            onClick={() => {
                              handleCloseSpecModal();
                              openWhatsAppBrochure({
                                title: fullDetailWithUni,
                                slug: fullSlug,
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
                              handleCloseSpecModal();
                              openFormModal &&
                                openFormModal({
                                  title: "Book Free Counseling",
                                  subtitle: fullDetailWithUni,
                                  defaultCourse: fullDetailWithUni,
                                  university: uniName,
                                  formNameOverride: `CourseDetailModal_${cleanUniSlug}_${cleanCourseSlug}_${selectedSpecDetail.slug || selectedSpecDetail.name}`,
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
                  </div>
                );
              })()
            ) : (
              // ── VIEW 1: SPECIALIZATIONS GRID OVERVIEW (INITIAL MODAL STATE) ──
              <div className="relative text-left">
                {/* Close Button Top-Right */}
                <button
                  type="button"
                  onClick={handleCloseSpecModal}
                  className="absolute -top-1 -right-1 sm:top-0 sm:right-0 z-20 w-8 h-8 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer border-0"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col md:flex-row items-stretch gap-4 sm:gap-6 p-0 sm:p-1 pb-1 max-h-[85vh] overflow-y-auto overflow-x-hidden">
                  {/* Left Column: Portrait Banner Card */}
                  <div className="relative w-full md:w-80 lg:w-88 shrink-0 h-36 sm:h-44 md:h-auto min-h-36 sm:min-h-44 md:min-h-[350px] md:max-h-[460px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 shadow-xs flex items-stretch">
                    {bannerSrc ? (
                      <Image
                        src={getMediaUrl(bannerSrc)}
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
                        <Link
                          href={baseCourseDetailHref}
                          onClick={handleCloseSpecModal}
                          className="text-[#0C2B4E] hover:text-[#08AEAA] no-underline transition-colors cursor-pointer"
                        >
                          {cTitle}
                        </Link>
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
                              Admission Deadline: <strong className="font-semibold text-gray-500">{itemDeadline}</strong>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Middle: Specializations OR Program Highlights */}
                    {specializationsList.length > 0 ? (
                      <div className="my-1">
                        <div className="flex items-center justify-between gap-2.5 sm:gap-3 mb-2">
                          <h4 className="text-xs sm:text-sm md:text-base font-bold text-[#0C2B4E] m-0 tracking-tight shrink-0">
                            {specializationsList.length} Specializations Available
                          </h4>
                          <span className="text-[10px] sm:text-[11px] text-gray-500 font-normal">
                            Click specialization to view details
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 sm:gap-2 max-h-36 sm:max-h-44 overflow-y-auto pr-1">
                          {specializationsList.map((sub, idx) => {
                            const subName = typeof sub === "string" ? sub : sub.name || "";
                            return (
                              <div
                                key={idx}
                                onClick={() => handleOpenSpecDetail(sub, selectedCourseSpec)}
                                className="flex items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-xs font-semibold px-2.5 sm:px-3 py-2 rounded-lg sm:rounded-xl border transition-all cursor-pointer group/spec bg-blue-50/50 text-[#0C2B4E] border-blue-100 hover:border-[#08AEAA] hover:bg-blue-100/70"
                              >
                                <CheckCircle2
                                  size={13}
                                  className="text-[#08AEAA] group-hover/spec:scale-110 transition-transform shrink-0"
                                />
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

                    {itemDesc && (
                      <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mb-0 font-normal">
                        {itemDesc}
                      </p>
                    )}

                    {/* Bottom: Action Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3 pt-2 mt-auto w-full">
                      {(() => {
                        const cleanUniSlug = String(slug || uni?.slug || "university").toLowerCase().trim();
                        const rawCourseSlug = String(selectedCourseSpec.slug || cTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")).toLowerCase().trim();
                        const cleanCourseSlug = rawCourseSlug.replace(new RegExp(`^${cleanUniSlug}[/-]?`), "");

                        return (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                handleCloseSpecModal();
                                openWhatsAppBrochure({
                                  title: `${cTitle} - ${uniName}`,
                                  slug: `${cleanUniSlug}/${cleanCourseSlug}`,
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
                                handleCloseSpecModal();
                                openFormModal &&
                                  openFormModal({
                                    title: "Book Free Counseling",
                                    subtitle: `${cTitle} - ${uniName}`,
                                    defaultCourse: `${cTitle} - ${uniName}`,
                                    university: uniName,
                                    formNameOverride: `CourseDetailModal_${cleanUniSlug}_${cleanCourseSlug}`,
                                    submitButtonText: "Get Counseling",
                                  });
                              }}
                              className="flex-1 min-w-0 bg-white hover:bg-gray-50 text-[#0C2B4E] border border-[#0C2B4E] text-[10.5px] min-[380px]:text-[11.5px] sm:text-xs md:text-sm font-semibold py-2.5 px-1.5 sm:px-4 rounded-xl flex items-center justify-center text-center transition-all cursor-pointer shadow-xs active:scale-95"
                            >
                              <span className="truncate">Get 100% FREE Counseling</span>
                            </button>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        );
      })()}
    </div>
  );
}
