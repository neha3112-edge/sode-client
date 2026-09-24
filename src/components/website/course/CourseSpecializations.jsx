"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Modal } from "antd";
import {
  Briefcase,
  BookOpen,
  GraduationCap,
  Award,
  Database,
  UserCog,
  ShoppingCart,
  Download,
  ChevronRight,
} from "lucide-react";
import { FaClock, FaCalendar } from "react-icons/fa";
import { getAssetPath, formatAdmissionDeadline } from "@/lib/utils";

const SPEC_ICONS = [Briefcase, BookOpen, GraduationCap, Award, Database, UserCog, ShoppingCart];

const normalizeString = (str) =>
  (str || "")
    .toLowerCase()
    .replace(/^online\s+/i, "")
    .replace(/^distance\s+/i, "")
    .replace(/^regular\s+/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const findMatchingSpecialization = (specList, query) => {
  if (!query || !Array.isArray(specList) || specList.length === 0) return null;
  const rawQuery = decodeURIComponent(String(query)).toLowerCase().trim();
  const cleanQuerySlug = normalizeString(rawQuery);
  const queryWords = cleanQuerySlug.replace(/-/g, " ");

  return (
    specList.find((item) => {
      if (!item) return false;
      if (item._id && String(item._id) === rawQuery) return true;
      if (item.slug && item.slug.toLowerCase().trim() === cleanQuerySlug) return true;
      const itemNameSlug = normalizeString(item.name);
      if (itemNameSlug === cleanQuerySlug) return true;
      if (itemNameSlug.endsWith(`-${cleanQuerySlug}`) || itemNameSlug.includes(cleanQuerySlug)) return true;
      const itemNameLower = (item.name || "").toLowerCase();
      if (queryWords && itemNameLower.includes(queryWords)) return true;
      return false;
    }) || null
  );
};

export default function CourseSpecializations({
  specializations,
  courseData,
  universityName,
  universityLogoSrc,
  heroBannerSrc,
  activeLedgerData,
  handleOpenLead,
  targetSpecSlug = "",
}) {
  const [selectedSpecModal, setSelectedSpecModal] = useState(null);
  const [activeSpecSem, setActiveSpecSem] = useState(0);
  const [activeSpecId, setActiveSpecId] = useState(null);
  const specializationSectionRef = useRef(null);
  const hasAutoOpenedRef = useRef(false);

  const getBaseCourseUrl = useCallback(() => {
    if (typeof window === "undefined") return "";
    const pathname = window.location.pathname || "";
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length >= 3) {
      const prefix = segments[0] === "courses" ? "universities" : segments[0];
      return `/${prefix}/${segments[1]}/${segments[2]}`;
    }
    if (courseData?.slug && courseData.slug.includes("/")) {
      return `/universities/${courseData.slug}`;
    }
    return pathname;
  }, [courseData?.slug]);

  const updateUrlForSpecialization = useCallback(
    (specItem) => {
      if (typeof window === "undefined") return;
      const baseUrl = getBaseCourseUrl();
      if (!baseUrl) return;

      if (specItem) {
        const specSlug =
          specItem.slug ||
          normalizeString(specItem.name);

        const newUrl = `${baseUrl}/${encodeURIComponent(specSlug)}#specializations`;
        if (window.location.pathname + window.location.hash !== newUrl) {
          window.history.replaceState(null, "", newUrl);
        }
      } else {
        const newUrl = `${baseUrl}#specializations`;
        if (window.location.pathname + window.location.hash !== newUrl) {
          window.history.replaceState(null, "", newUrl);
        }
      }
    },
    [getBaseCourseUrl]
  );

  const handleOpenSpecModal = useCallback(
    (item) => {
      setActiveSpecId(item._id || item.name);
      setSelectedSpecModal(item);
      updateUrlForSpecialization(item);
    },
    [updateUrlForSpecialization]
  );

  const handleCloseSpecModal = useCallback(() => {
    setSelectedSpecModal(null);
    updateUrlForSpecialization(null);
  }, [updateUrlForSpecialization]);

  useEffect(() => {
    setActiveSpecSem(0);
  }, [selectedSpecModal]);

  useEffect(() => {
    hasAutoOpenedRef.current = false;
  }, [targetSpecSlug]);

  useEffect(() => {
    if (hasAutoOpenedRef.current) return;
    if (!Array.isArray(specializations) || specializations.length === 0) return;

    let query = targetSpecSlug;
    if (!query && typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      query =
        urlParams.get("specialization") ||
        urlParams.get("subcourse") ||
        urlParams.get("spec") ||
        urlParams.get("subSlug");

      if (!query) {
        const segments = window.location.pathname.split("/").filter(Boolean);
        // e.g. /courses/uni/course/subcourse or /universities/uni/course/subcourse
        if (segments.length >= 4) {
          query = segments[3];
        }
      }
    }

    if (query) {
      const matched = findMatchingSpecialization(specializations, query);
      if (matched) {
        hasAutoOpenedRef.current = true;
        setSelectedSpecModal(matched);
        setActiveSpecId(matched._id || matched.name);
        updateUrlForSpecialization(matched);

        const timer = setTimeout(() => {
          const el = specializationSectionRef.current || document.getElementById("specializations");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 400);

        return () => clearTimeout(timer);
      }
    }
  }, [targetSpecSlug, specializations, updateUrlForSpecialization]);

  if (!specializations || specializations.length === 0) return null;

  return (
    <div
      id="specializations"
      data-nav-label="Specialisations"
      ref={specializationSectionRef}
      className="scroll-mt-20 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 relative transition-all"
    >
      <span id="admission" className="sr-only" />
      <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-5 sm:mb-7 m-0">
        {universityName ? `${universityName} ` : ""}{courseData?.name || "Course"} Specialisations
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4">
        {specializations.map((item, idx) => {
          const IconComponent = SPEC_ICONS[idx % SPEC_ICONS.length];
          const specTitle = item.name || "Specialization";
          const isHighlighted =
            (activeSpecId && (activeSpecId === item._id || activeSpecId === item.name)) ||
            (selectedSpecModal && (selectedSpecModal._id === item._id || selectedSpecModal.name === item.name));

          return (
            <div
              key={item._id || idx}
              onClick={() => handleOpenSpecModal(item)}
              className={`bg-white rounded-xl border p-2.5 sm:p-3.5 md:p-4 flex items-center gap-2 sm:gap-3.5 cursor-pointer transition-all group ${
                isHighlighted
                  ? "border-[#08AEAA] ring-2 ring-[#08AEAA]/20 shadow-xs bg-teal-50/15"
                  : "border-gray-200 hover:border-[#08AEAA] hover:shadow-xs"
              }`}
            >
              {item.logo ? (
                <div className="relative w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                  <Image
                    src={getAssetPath(item.logo)}
                    alt={specTitle}
                    fill
                    sizes="24px"
                    className="object-contain"
                  />
                </div>
              ) : (
                <IconComponent className={`shrink-0 w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 transition-colors ${
                  isHighlighted ? "text-[#08AEAA]" : "text-[#0C3A66] group-hover:text-[#08AEAA]"
                }`} />
              )}
              <span className={`text-[11px] sm:text-xs md:text-[13.5px] font-bold tracking-tight leading-snug transition-colors ${
                isHighlighted ? "text-[#08AEAA]" : "text-gray-900 group-hover:text-[#08AEAA]"
              }`}>
                {specTitle}
              </span>
            </div>
          );
        })}
      </div>

      {/* Specialization Details Modal */}
      {selectedSpecModal && (() => {
        const specTitle = selectedSpecModal.name || "Specialization";
        const modalTitle = specTitle;
        const itemDuration = selectedSpecModal.duration || courseData?.duration || "";
        const itemDeadline = formatAdmissionDeadline(selectedSpecModal.admissionDeadline || courseData?.admissionDeadline || "");
        const itemDesc = selectedSpecModal.description?.trim() || "";

        const itemFeesFormatted =
          activeLedgerData?.semester?.formattedPayable ||
          selectedSpecModal.fees ||
          selectedSpecModal.fee ||
          courseData?.calculatedSemesterFee ||
          "";

        const specDesktopBannerRaw =
          selectedSpecModal?.bannerImage ||
          selectedSpecModal?.bannerImg?.url ||
          selectedSpecModal?.banner ||
          selectedSpecModal?.image ||
          courseData?.bannerImage ||
          courseData?.universityId?.bannerImg?.url ||
          heroBannerSrc ||
          "";
        const specDesktopBanner = specDesktopBannerRaw ? getAssetPath(specDesktopBannerRaw) : "";

        const specMobileBannerRaw =
          selectedSpecModal?.bannerImageMobile ||
          selectedSpecModal?.mobileBannerImg?.url ||
          selectedSpecModal?.mobileBannerImg ||
          courseData?.mobileBannerImage ||
          courseData?.universityId?.mobileBannerImg?.url ||
          specDesktopBannerRaw;
        const specMobileBanner = specMobileBannerRaw ? getAssetPath(specMobileBannerRaw) : specDesktopBanner;

        const specLogo = selectedSpecModal?.logo ? getAssetPath(selectedSpecModal.logo) : null;

        const specCurriculum = (() => {
          if (Array.isArray(selectedSpecModal?.curriculum) && selectedSpecModal.curriculum.length > 0) {
            return selectedSpecModal.curriculum
              .filter((c) => c && Array.isArray(c.subjects) && c.subjects.length > 0)
              .map((c, idx) => ({
                semester: c.semesterName || `Semester ${idx + 1}`,
                subjects: c.subjects,
              }));
          }
          return [];
        })();

        const activeCurriculum = specCurriculum[activeSpecSem] || specCurriculum[0];

        return (
          <Modal
            open={Boolean(selectedSpecModal)}
            onCancel={handleCloseSpecModal}
            footer={null}
            width={1150}
            centered
            className="max-w-[96vw] [&_.ant-modal-content]:rounded-3xl [&_.ant-modal-content]:p-4 sm:[&_.ant-modal-content]:p-6 md:[&_.ant-modal-content]:p-7 [&_.ant-modal-close]:top-4 [&_.ant-modal-close]:right-4 [&_.ant-modal-content]:max-h-[85vh] [&_.ant-modal-content]:overflow-y-auto [&_.ant-modal-content]:overflow-x-hidden"
          >
            <div className="flex flex-col md:flex-row items-stretch gap-5 sm:gap-6">
              {/* Left Column: Portrait Banner Card */}
              <div className="relative w-full md:w-80 lg:w-88 shrink-0 h-36 sm:h-44 md:h-auto min-h-36 sm:min-h-44 md:min-h-[350px] md:max-h-[460px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 shadow-xs flex items-stretch">
                {specDesktopBanner && (
                  <Image
                    src={specDesktopBanner}
                    alt={modalTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 370px"
                    className={`object-cover object-center ${
                      specMobileBanner && specMobileBanner !== specDesktopBanner ? "hidden md:block" : "block"
                    }`}
                  />
                )}

                {specMobileBanner && specMobileBanner !== specDesktopBanner && (
                  <Image
                    src={specMobileBanner}
                    alt={modalTitle}
                    fill
                    sizes="100vw"
                    className="object-cover object-center block md:hidden"
                  />
                )}

                {(specLogo || (universityLogoSrc && !universityName?.toLowerCase().includes("manipal"))) && (
                  <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 bg-white rounded-xl shadow-md p-1.5 sm:p-2.5 flex flex-col items-center justify-center text-center min-w-[64px] sm:min-w-[74px] max-w-[80px] sm:max-w-[90px]">
                    <div className="relative w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center">
                      <Image
                        src={specLogo || universityLogoSrc}
                        alt={specLogo ? specTitle : (universityName || "University")}
                        fill
                        sizes="36px"
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[8.5px] sm:text-[9.5px] font-bold text-gray-900 leading-tight mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                      {specLogo ? specTitle : universityName}
                    </span>
                  </div>
                )}
              </div>

              {/* Right Column: Content */}
              <div className="flex-1 flex flex-col justify-start text-left gap-3 sm:gap-3.5">
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-[25px] font-black text-[#0C2B4E] tracking-tight leading-tight mb-2.5">
                    {modalTitle}
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
                    {itemDeadline && (
                      <div className="flex items-center gap-1.5">
                        <FaCalendar className="w-3 h-3 text-[#072C50] shrink-0" />
                        <span className="text-red-500">
                          Admission Deadline : <strong className="font-semibold text-gray-500">{itemDeadline}</strong>
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mb-0 font-normal">
                    {itemDesc}
                  </p>
                </div>

                {/* Course Curriculum Section */}
                {specCurriculum.length > 0 && (
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
                              className={`w-full py-1.5 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer border-none ${
                                isActive
                                  ? "bg-[#0C2B4E] text-white shadow-sm md:w-full"
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

                      <div className="col-span-12 md:col-span-9 bg-gradient-to-br from-blue-50/50 via-blue-50/30 to-slate-50/40 border border-blue-100/80 rounded-2xl p-3.5 sm:p-4 min-h-[135px] flex items-start">
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
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const title = modalTitle;
                      handleCloseSpecModal();
                      handleOpenLead("Download Brochure", title);
                    }}
                    className="flex-1 min-w-0 bg-[#0C2B4E] hover:bg-[#071c33] text-white text-[11px] sm:text-xs md:text-sm font-bold py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-sm border-none active:scale-95"
                  >
                    <span className="truncate">Download Brochure</span>
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const title = modalTitle;
                      handleCloseSpecModal();
                      handleOpenLead("Free Counseling", title);
                    }}
                    className="flex-1 min-w-0 bg-white hover:bg-gray-50 text-[#0C2B4E] border border-[#0C2B4E] text-[10.5px] min-[380px]:text-[11.5px] sm:text-xs md:text-sm font-bold py-2.5 sm:py-3 px-1.5 sm:px-4 rounded-xl flex items-center justify-center text-center transition-all cursor-pointer shadow-sm active:scale-95"
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
