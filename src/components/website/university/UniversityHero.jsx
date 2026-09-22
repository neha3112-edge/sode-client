"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Rate } from "antd";
import { Download, BadgeCheck, GraduationCap } from "lucide-react";
import { FaBuilding, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import { getAssetPath, formatAdmissionDeadline } from "@/lib/utils";

export default function UniversityHero({
  uniName,
  heroBannerUrl,
  mobileHeroBannerUrl,
  logoUrl,
  starRatingValue,
  displayRatingText,
  coursePills = [],
  openFormModal,
  handleUniversityCompare,
  isInCompare,
  locationText,
  establishedText,
  approvalsSummary,
  admissionDeadline,
  admissionStatus,
}) {
  return (
    <div className="relative w-full">
      {/* Top Banner Image */}
      <div className="relative w-full h-56 sm:h-74 overflow-hidden">
        {heroBannerUrl || mobileHeroBannerUrl ? (
          <>
            {heroBannerUrl && (
              <Image
                src={heroBannerUrl}
                alt={uniName}
                fill
                sizes="100vw"
                priority
                className={`object-cover object-center ${mobileHeroBannerUrl && mobileHeroBannerUrl !== heroBannerUrl ? "hidden sm:block" : "block"}`}
              />
            )}
            {mobileHeroBannerUrl && mobileHeroBannerUrl !== heroBannerUrl && (
              <Image
                src={mobileHeroBannerUrl}
                alt={uniName}
                fill
                sizes="100vw"
                priority
                className="object-cover object-center block sm:hidden"
              />
            )}
          </>
        ) : null}
      </div>

      {/* Floating Header Card */}
      <div className="relative -mt-16 sm:-mt-24 z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-0">
        <div className="rounded-3xl overflow-hidden border border-transparent">
          <div className="bg-[#0C3A66] text-white px-3.5 py-3.5 sm:px-7 sm:py-5.5">
            <div className="flex flex-row items-center gap-2.5 sm:gap-4">
              {/* Logo */}
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-3xl bg-white p-1 sm:p-1 flex flex-col items-center justify-center text-center shrink-0">
                {logoUrl ? (
                  <div className="relative w-full h-10 sm:h-16">
                    <Image
                      src={logoUrl}
                      alt={uniName}
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold text-base sm:text-lg">
                    🎓
                  </div>
                )}
                <span className="hidden sm:block text-[10px] font-medium text-gray-800 leading-tight line-clamp-2">
                  {uniName}
                </span>
              </div>

              {/* Info Column */}
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1 sm:gap-1.5">
                <h1 className="text-base sm:text-2xl md:text-[28px] font-extrabold text-white tracking-tight leading-tight m-0 truncate sm:whitespace-normal">
                  {uniName}
                </h1>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex items-center shrink-0">
                    <Rate
                      disabled
                      allowHalf
                      value={starRatingValue}
                      style={{
                        fontSize: 15,
                        color: "#fbbf24",
                        "--ant-rate-star-bg": "rgba(255, 255, 255, 0.35)",
                        "--ant-rate-star-color": "#fbbf24",
                      }}
                      className="leading-none [&_.ant-rate-star]:!mr-1 [&_.ant-rate-star-second]:!text-white/35 [&_.ant-rate-star-zero_.ant-rate-star-first]:!text-white/35 [&_.ant-rate-star-full_.ant-rate-star-second]:!text-amber-400 [&_.ant-rate-star-full_.ant-rate-star-first]:!text-amber-400 [&_.ant-rate-star-half_.ant-rate-star-first]:!text-amber-400"
                    />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-xs sm:text-[13px] font-bold text-white leading-none">
                      {displayRatingText}
                    </span>
                    <span className="text-[7.5px] sm:text-[8.5px] font-semibold text-white/70 uppercase tracking-wider mt-0.5">
                      Student Rating
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3 mt-1.5">
                  {coursePills.length > 0 && (
                    <div className="overflow-x-auto no-scrollbar py-0.5 max-w-full">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {coursePills.map((cp) => (
                          <Link
                            key={cp.title}
                            href={
                              cp.slug?.includes("/")
                                ? `/university/${cp.slug}`
                                : `/university/${cp.slug || encodeURIComponent(cp.title.toLowerCase())}`
                            }
                            className="text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer whitespace-nowrap text-center border bg-white/20 text-white border-white/20 hover:bg-white hover:text-[#0C3A66] no-underline inline-flex items-center justify-center shadow-2xs w-auto shrink-0"
                          >
                            {cp.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Desktop Action Buttons */}
                  <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0 ml-auto self-start -mt-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        openFormModal &&
                          openFormModal({
                            title: `Download Brochure - ${uniName}`,
                            subtitle: "Fill details to receive instant digital brochure",
                            defaultCourse: uniName,
                            submitButtonText: "Get Brochure",
                          });
                      }}
                      className="whitespace-nowrap bg-[#00B4D8] hover:bg-[#0096C7] text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-full border-none cursor-pointer flex items-center gap-1.5 shadow-sm transition-all active:scale-95 shrink-0"
                    >
                      <span>Get Brochure</span>
                      <Download size={14} className="stroke-[2.5]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        openFormModal &&
                          openFormModal({
                            title: `Get Counseling - ${uniName}`,
                            subtitle: "Speak directly with academic counselors",
                            defaultCourse: uniName,
                            submitButtonText: "Get Counseling",
                          });
                      }}
                      className="whitespace-nowrap bg-transparent hover:bg-white/10 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-full border border-white cursor-pointer flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
                    >
                      <span>Get Counseling</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleUniversityCompare}
                      className={`whitespace-nowrap font-semibold text-xs sm:text-sm px-4 py-2 rounded-full cursor-pointer flex items-center gap-1.5 transition-all active:scale-95 shrink-0 ${
                        isInCompare
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-xs"
                          : "bg-transparent hover:bg-white/10 text-white border border-white"
                      }`}
                    >
                      <span>{isInCompare ? "In Compare" : "+ Add to Compare"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="grid grid-cols-3 gap-1.5 sm:flex sm:items-center sm:gap-3 shrink-0 mt-3 sm:mt-4 pt-1 lg:hidden">
              <button
                type="button"
                onClick={() => {
                  openFormModal &&
                    openFormModal({
                      title: `Download Brochure - ${uniName}`,
                      subtitle: "Fill details to receive instant digital brochure",
                      defaultCourse: uniName,
                      submitButtonText: "Get Brochure",
                    });
                }}
                className="whitespace-nowrap bg-[#00B4D8] hover:bg-[#0096C7] text-white font-bold text-[10.5px] sm:text-sm px-2 sm:px-5 py-2 sm:py-2.5 rounded-full border-none cursor-pointer flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95"
              >
                <span className="truncate">Brochure</span>
                <Download size={13} className="stroke-[2.5] shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => {
                  openFormModal &&
                    openFormModal({
                      title: `Get Counseling - ${uniName}`,
                      subtitle: "Speak directly with academic counselors",
                      defaultCourse: uniName,
                      submitButtonText: "Get Counseling",
                    });
                }}
                className="whitespace-nowrap bg-transparent hover:bg-white/10 text-white font-semibold text-[10.5px] sm:text-sm px-2 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/80 cursor-pointer flex items-center justify-center gap-1 transition-all active:scale-95 text-center"
              >
                <span className="truncate">Counseling</span>
              </button>

              <button
                type="button"
                onClick={handleUniversityCompare}
                className={`whitespace-nowrap font-semibold text-[10.5px] sm:text-sm px-2 sm:px-5 py-2 sm:py-2.5 rounded-full cursor-pointer flex items-center justify-center gap-1 transition-all active:scale-95 ${
                  isInCompare
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-xs"
                    : "bg-transparent hover:bg-white/10 text-white border border-white/80"
                }`}
              >
                <span className="truncate">{isInCompare ? "In Compare" : "+ Compare"}</span>
              </button>
            </div>
          </div>

          {/* Four-Column Key Stats Strip */}
          <div className="bg-white p-3.5 sm:p-5 grid grid-cols-2 lg:grid-cols-4 gap-y-3.5 sm:gap-y-4 lg:gap-y-0">
            {/* Location */}
            <div className="flex items-center gap-2.5 sm:gap-3 pl-2.5 sm:pl-6 lg:justify-center pr-2 border-r border-gray-200">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <FaMapMarkerAlt size={22} className="fill-white" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs text-gray-500 font-medium block leading-none mb-1">
                  Location
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-snug line-clamp-2 sm:truncate">
                  {locationText || "India"}
                </span>
              </div>
            </div>

            {/* Established */}
            <div className="flex items-center gap-2.5 sm:gap-3 pl-3.5 sm:pl-6 lg:justify-center pr-2 lg:border-r border-gray-200">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <FaBuilding size={17} />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs text-gray-500 font-medium block leading-none mb-1">
                  Established
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-snug line-clamp-2 sm:truncate">
                  {establishedText || "—"}
                </span>
              </div>
            </div>

            {/* Approvals */}
            <div className="flex items-center gap-2.5 sm:gap-3 pl-2.5 sm:pl-6 lg:justify-center pr-2 border-r border-gray-200">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <BadgeCheck size={22} className="fill-white text-[#0077B6]" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs text-gray-500 font-medium block leading-none mb-1">
                  Approvals
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-snug line-clamp-2 sm:truncate">
                  {approvalsSummary || "UGC-DEB"}
                </span>
              </div>
            </div>

            {/* Admission Deadline / Status */}
            <div className="flex items-center gap-2.5 sm:gap-3 pl-3.5 sm:pl-6 lg:justify-center pr-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
                {admissionDeadline ? <FaCalendar size={17} /> : <GraduationCap size={17} />}
              </div>
              <div className="min-w-0">
                {admissionDeadline ? (
                  <>
                    <span className="text-[11px] sm:text-xs text-red-500 font-medium block leading-none mb-1">
                      Admission deadline
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight truncate">
                      {formatAdmissionDeadline(admissionDeadline)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] sm:text-xs text-red-700 font-medium block leading-none mb-1">
                      Admission Status
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight truncate">
                      {admissionStatus || "Admissions Open"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
