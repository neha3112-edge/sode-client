"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Check, ChevronDown } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";
import { useFormModal } from "@/hooks/useFormModal";
import { getAssetPath } from "@/lib/utils";

export default function CourseAlternativeUniversities({
  processedPrograms,
  courseData,
}) {
  const [visibleCount, setVisibleCount] = useState(6);
  const { toggleCompare, isInCompare, setIsCompareDrawerOpen } = useCompare();
  const { openFormModal } = useFormModal();

  if (!processedPrograms || processedPrograms.length === 0) return null;

  return (
    <div
      id="alternative"
      className="scroll-mt-16 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-6 sm:mb-8 m-0">
        Top Universities Offering {courseData?.name || "Online Courses"}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {processedPrograms.slice(0, visibleCount).map((item, index) => {
          const uName = item.uniName || "Partner University";
          const cardTitle = item.cardTitle || item.title || "Course Program";
          const logoUrl = item.logoUrl;
          const providerName = item.providerName || null;
          const coursesOfferedText = `${item.coursesCount || item.programsCount || 10}+ Programs`;
          const rawHref = item.courseDetailHref || `/courses`;
          const courseDetailHref =
            rawHref.startsWith("/courses/") && rawHref.split("/").length > 3
              ? rawHref.replace("/courses/", "/university/")
              : rawHref;
          const inCmp = isInCompare(item._id || item.slug || cardTitle || uName);

          return (
            <div
              key={item._uniqueKey || `${cardTitle}-${index}`}
              className={`bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-400 p-2 sm:p-2.5 hover:shadow-md transition-all flex flex-col items-center justify-between text-center relative group min-w-0 shadow-2xs ${
                index === 5 && visibleCount === 6 ? "flex lg:hidden" : "flex"
              }`}
            >
              {/* Top Right Corner Pinned Provider Badge */}
              {Boolean(providerName) && (
                <div className="absolute top-0 right-0 z-10 pointer-events-none">
                  <span className="bg-[#FFF0F3] border-b border-l border-[#FFE4E6] text-[#E52E2E] text-[8.5px] sm:text-[9.5px] font-bold px-1.5 py-0.5 rounded-bl-lg rounded-tr-xl">
                    {providerName}
                  </span>
                </div>
              )}

              {/* Circular Logo Container without border */}
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full p-1 flex items-center justify-center bg-white relative my-0.5 shrink-0 overflow-hidden">
                {logoUrl ? (
                  <Link href={courseDetailHref} className="relative w-full h-full block">
                    <Image
                      src={logoUrl}
                      alt={uName}
                      fill
                      sizes="56px"
                      className="object-contain"
                    />
                  </Link>
                ) : (
                  <Link
                    href={courseDetailHref}
                    className="w-full h-full rounded-full bg-blue-50 text-blue-600 font-semibold flex items-center justify-center text-xs uppercase no-underline"
                  >
                    {uName.charAt(0) || "U"}
                  </Link>
                )}
              </div>

              {/* University Name & Courses Count */}
              <div className="w-full space-y-0.5 my-0.5">
                <div className="min-h-7 sm:min-h-8 flex items-center justify-center">
                  <Link
                    href={courseDetailHref}
                    className="text-xs sm:text-[12.5px] font-semibold text-[#0a2540] hover:text-blue-600 line-clamp-2 leading-tight m-0 w-full text-center no-underline transition-colors"
                  >
                    {uName}
                  </Link>
                </div>
                <div className="text-[10px] sm:text-[11px] text-gray-500 font-normal flex items-center justify-center">
                  <span className="truncate">{item.location || coursesOfferedText}</span>
                </div>
              </div>

              {/* Full-width Add to Compare Pill */}
              <button
                type="button"
                onClick={() => {
                  const targetItem = {
                    _id: item._id || item.slug,
                    slug: item.slug || item._id,
                    title: cardTitle,
                    uniName: uName,
                    logoUrl: logoUrl,
                    feeText: item.feeText,
                    durationText: item.durationText,
                  };
                  toggleCompare(targetItem);
                  setIsCompareDrawerOpen(true);
                }}
                className={`w-full py-1 px-2 rounded-lg text-[10px] sm:text-[11px] font-semibold transition-all flex items-center justify-center gap-1 border cursor-pointer mt-1 ${
                  inCmp
                    ? "bg-teal-50 text-teal-700 border-teal-600 shadow-2xs"
                    : "bg-white text-[#0a2540] border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                {inCmp ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 stroke-2" />
                    <span>Added to Compare</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 text-gray-500 shrink-0 stroke-2" />
                    <span>Add to Compare</span>
                  </>
                )}
              </button>

              {/* Action Buttons: Apply Now & Know More */}
              <div className="w-full grid grid-cols-2 gap-1.5 mt-1.5 items-center">
                <button
                  type="button"
                  onClick={() => {
                    openFormModal &&
                      openFormModal({
                        title: `Apply to ${uName}`,
                        subtitle: cardTitle,
                        defaultCourse: cardTitle,
                        university: uName,
                        formNameOverride: `CourseCard_${item.slug || uName}`,
                        submitButtonText: "Apply Now",
                      });
                  }}
                  className="w-full bg-[#F4D068] hover:bg-[#ebc557] text-gray-900 text-[11px] sm:text-xs font-semibold py-1.5 px-1 rounded-md sm:rounded-lg border-none cursor-pointer transition-colors active:scale-95 flex items-center justify-center text-center whitespace-nowrap leading-none"
                >
                  Apply Now
                </button>
                <Link
                  href={courseDetailHref}
                  className="w-full bg-white hover:bg-gray-50 text-[#0a2540] hover:text-blue-600 border border-gray-200 text-[11px] sm:text-xs font-semibold py-1.5 px-1 rounded-md sm:rounded-lg text-center no-underline transition-colors flex items-center justify-center whitespace-nowrap leading-none"
                >
                  Know More
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More / View Less Button */}
      {processedPrograms.length > 5 && (
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((prev) =>
                prev >= processedPrograms.length ? 6 : processedPrograms.length
              )
            }
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 text-[#0077B6] hover:bg-blue-100 transition-colors text-xs font-semibold border-none cursor-pointer"
          >
            <span>
              {visibleCount >= processedPrograms.length ? "View Less" : "View More"}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                visibleCount >= processedPrograms.length ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
