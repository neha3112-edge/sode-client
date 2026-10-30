"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { FaClock, FaCalendar } from "react-icons/fa";
import { formatAdmissionDeadline } from "@/lib/utils";

function getSafeMediaUrl(obj) {
  if (!obj) return null;
  let raw = null;
  if (typeof obj === "string") {
    raw = obj;
  } else if (typeof obj === "object") {
    raw = obj.url || obj.path || obj.src || (obj.fileName && typeof obj.fileName === "string" ? obj.fileName : null);
  }
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "[object Object]") return null;
  if (/^[0-9a-fA-F]{24}$/.test(trimmed)) return null;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

export default function CourseHero({
  courseData,
  displayCourseTitle,
  universityName,
  heroBannerSrc,
  mobileHeroBannerSrc,
  universityLogoSrc,
  handleOpenLead,
}) {
  const effectiveUniName =
    courseData?.combinedUniversityName ||
    universityName ||
    courseData?.universityName ||
    courseData?.universityId?.name ||
    courseData?.university?.name ||
    "";

  const effectiveUniSlug =
    courseData?.universitySlug ||
    courseData?.universityId?.slug ||
    courseData?.university?.slug ||
    "";

  const safeHeroBannerSrc = getSafeMediaUrl(heroBannerSrc);
  const safeMobileHeroBannerSrc = getSafeMediaUrl(mobileHeroBannerSrc);
  const safeUniversityLogoSrc = getSafeMediaUrl(universityLogoSrc);

  const collaboratorLogos = React.useMemo(() => {
    const list = [];
    if (Array.isArray(courseData?.collaboratorLogos) && courseData.collaboratorLogos.length > 0) {
      courseData.collaboratorLogos.forEach((c) => {
        const safeUrl = getSafeMediaUrl(c?.logo || c?.logoUrl || c);
        if (safeUrl) {
          list.push({
            name: c.name || "Collaborator",
            slug: c.slug || "",
            logo: safeUrl,
          });
        }
      });
    } else if (Array.isArray(courseData?.collaborations) && courseData.collaborations.length > 0) {
      courseData.collaborations.forEach((c) => {
        const u = c?.universityId || c;
        const safeUrl = getSafeMediaUrl(u?.logo?.url || u?.logo?.path || u?.logo?.fileName || u?.logo);
        if (safeUrl) {
          list.push({
            name: u?.name || "Collaborator",
            slug: u?.slug || "",
            logo: safeUrl,
          });
        }
      });
    }
    return list;
  }, [courseData]);

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-[#0C2B4E] flex flex-col md:grid md:grid-cols-12 min-h-80 md:min-h-90">
      {/* Mobile Image (Top) / Desktop Image (Right) */}
      <div className="order-1 md:order-2 md:col-span-6 relative w-full h-64 sm:h-72 md:h-full overflow-hidden rounded-b-3xl md:rounded-none md:rounded-l-3xl">
        {safeHeroBannerSrc || safeMobileHeroBannerSrc ? (
          <>
            {safeHeroBannerSrc && (
              <Image
                src={safeHeroBannerSrc}
                alt={displayCourseTitle || courseData?.name || "Course Banner"}
                fill
                sizes={
                  safeMobileHeroBannerSrc && safeMobileHeroBannerSrc !== safeHeroBannerSrc
                    ? "(min-width: 768px) 50vw, 1px"
                    : "(max-width: 768px) 100vw, 50vw"
                }
                className={`object-cover object-center ${safeMobileHeroBannerSrc && safeMobileHeroBannerSrc !== safeHeroBannerSrc ? "hidden md:block" : "block"
                  }`}
                priority
                loading="eager"
              />
            )}
            {safeMobileHeroBannerSrc && safeMobileHeroBannerSrc !== safeHeroBannerSrc && (
              <Image
                src={safeMobileHeroBannerSrc}
                alt={displayCourseTitle || courseData?.name || "Course Banner"}
                fill
                sizes="(max-width: 767px) 100vw, 1px"
                className="object-cover object-center block md:hidden"
                priority
                loading="eager"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-[#0C2B4E]" />
        )}

        {/* University Logo(s) - Supports Collaborator Logos */}
        {(safeUniversityLogoSrc || collaboratorLogos.length > 0) && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white rounded-xl shadow-md p-1.5 sm:p-2 flex items-center justify-center gap-1.5 sm:gap-2">
            {safeUniversityLogoSrc && (
              <div className="relative w-11 h-11 sm:w-14 sm:h-14">
                <Image
                  src={safeUniversityLogoSrc}
                  alt={effectiveUniName || "University Logo"}
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 640px) 44px, 56px"
                  className="object-contain"
                />
              </div>
            )}
            {collaboratorLogos.length > 0 && (
              <>
                {safeUniversityLogoSrc && (
                  <span className="text-gray-400 font-bold text-xs sm:text-sm px-0.5 select-none">&amp;</span>
                )}
                {collaboratorLogos.map((collab, idx) => (
                  <div key={idx} className="relative w-11 h-11 sm:w-14 sm:h-14" title={collab.name}>
                    <Image
                      src={collab.logo}
                      alt={collab.name || "Collaborator Logo"}
                      fill
                      priority
                      loading="eager"
                      sizes="(max-width: 640px) 44px, 56px"
                      className="object-contain"
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="order-2 md:order-1 md:col-span-6 text-white p-5 sm:p-7 md:py-9 md:px-9 flex flex-col justify-center space-y-4 md:space-y-5">
        <div className="space-y-1 sm:space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white m-0 leading-tight">
            {courseData?.name || "Online Course"}
          </h1>
          {courseData?.fullName && (
            <p className="text-sm sm:text-base text-blue-100/90 font-medium m-0">
              ( {courseData.fullName} )
            </p>
          )}
          {effectiveUniName && (
            <div>
              {effectiveUniSlug ? (
                <Link
                  href={`/universities/${effectiveUniSlug}`}
                  className="text-xs font-medium text-white transition-colors inline-block tracking-wide"
                >
                  ( {effectiveUniName} )
                </Link>
              ) : (
                <span className="text-xs font-medium text-white tracking-wide">
                  ( {effectiveUniName} )
                </span>
              )}
            </div>
          )}
        </div>
        <div className="space-y-2.5 text-xs sm:text-sm font-medium text-white/95">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {courseData?.duration && (
              <div className="flex items-center gap-1.5">
                <FaClock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{courseData.duration}</span>
              </div>
            )}
            {courseData?.fees && (
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold text-sm sm:text-base">₹</span>
                <span>{courseData.fees.replace(/^₹\s*/, "")}</span>
              </div>
            )}
          </div>
          {courseData?.admissionDeadline && (
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white">
              <FaCalendar className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Admission Deadline: {formatAdmissionDeadline(courseData.admissionDeadline)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 pt-2 w-full">
          <button
            type="button"
            onClick={() => handleOpenLead("Download Brochure")}
            className="flex-1 sm:flex-initial bg-[#E5A93C] hover:bg-[#D4982B] text-gray-950 font-bold px-2.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 text-center leading-tight whitespace-nowrap border-0"
          >
            <span>Download Brochure</span>
            <Download size={14} className="shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => handleOpenLead("Get 100% FREE Counseling")}
            className="flex-1 sm:flex-initial bg-transparent border border-white/80 hover:bg-white/10 text-white font-semibold px-2.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-all cursor-pointer active:scale-95 flex items-center justify-center text-center leading-tight whitespace-nowrap"
          >
            Get 100% FREE Counseling
          </button>
        </div>
      </div>
    </div>
  );
}
