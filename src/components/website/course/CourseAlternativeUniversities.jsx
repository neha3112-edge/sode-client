"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Plus, Check, ChevronDown } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";
import { useFormModal } from "@/hooks/useFormModal";

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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 auto-rows-fr">
        {processedPrograms.slice(0, visibleCount).map((item, index) => {
          const uName = item.uniName || "Partner University";
          const cardTitle = item.cardTitle || item.title || "Course Program";
          const logoUrl = item.logoUrl;
          const providerName = item.providerName || null;
          const durationText = item.durationText || null;
          const feeText = item.feeText || null;
          const rawHref = item.courseDetailHref || `/courses`;
          const courseDetailHref =
            rawHref.startsWith("/courses/") && rawHref.split("/").length > 3
              ? rawHref.replace("/courses/", "/university/")
              : rawHref;
          const inCmp = isInCompare(item._id || item.slug || cardTitle);

          return (
            <div
              key={item._uniqueKey || `${cardTitle}-${index}`}
              className={`bg-gray-50 rounded-xl border border-gray-200 hover:border-[#08AEAA] p-2 sm:p-2.5 hover:shadow-md transition-all flex flex-col items-center justify-between text-center relative group min-w-0 w-full h-full shadow-2xs ${
                index === 5 && visibleCount === 6 ? "flex lg:hidden" : "flex"
              }`}
            >
              {Boolean(providerName) && (
                <div className="absolute top-0 right-0 z-10 pointer-events-none">
                  <span className="bg-[#FFF0F3] border-b border-l border-[#FFE4E6] text-[#E52E2E] text-[8.5px] sm:text-[9.5px] font-bold px-1.5 py-0.5 rounded-bl-lg rounded-tr-xl">
                    {providerName}
                  </span>
                </div>
              )}

              <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full p-1 flex items-center justify-center relative mt-2.5 sm:mt-3 mb-1.5 sm:mb-2 shrink-0">
                {logoUrl ? (
                  <Link href={courseDetailHref} className="relative w-full h-full block">
                    <Image
                      src={logoUrl}
                      alt={uName}
                      fill
                      sizes="(max-width: 768px) 48px, 60px"
                      className="object-contain p-0.5 transition-transform group-hover:scale-105"
                    />
                  </Link>
                ) : (
                  <Link href={courseDetailHref} className="w-full h-full rounded-full bg-teal-50 text-[#08AEAA] font-bold flex items-center justify-center text-xs uppercase no-underline">
                    {uName.charAt(0)}
                  </Link>
                )}
              </div>

              <div className="w-full flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-center">
                  <Link
                    href={courseDetailHref}
                    className="text-xs sm:text-[13px] font-semibold text-[#0a2540] hover:text-[#08AEAA] line-clamp-2 leading-tight m-0 w-full text-center no-underline transition-colors"
                  >
                    {uName}
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
                      openFormModal({
                        title: "Apply for Course",
                        subtitle: cardTitle,
                        defaultCourse: cardTitle,
                        university: uName,
                        formNameOverride: `CourseCard_${item.slug || uName}`,
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
                      uniName: uName,
                      logoUrl: logoUrl,
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

      {processedPrograms.length > 5 && (
        <div className="flex justify-center mt-4 pt-1">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((prev) =>
                prev >= processedPrograms.length ? 6 : processedPrograms.length
              )
            }
            className="inline-flex items-center justify-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer shadow-none group"
          >
            <span>
              {visibleCount >= processedPrograms.length ? "View Less" : "View More"}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                visibleCount >= processedPrograms.length
                  ? "rotate-180"
                  : "group-hover:translate-y-0.5"
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
