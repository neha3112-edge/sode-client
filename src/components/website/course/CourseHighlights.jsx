"use client";

import React from "react";
import { BadgeCheck, User } from "lucide-react";
import { FaBuilding, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";

export default function CourseKeyHighlights({
  courseData,
  universityName,
  approvalsSummary,
  highlightsList,
}) {
  return (
    <>
      {/* Quick Facts Bar */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-3.5 sm:p-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-3.5 sm:gap-y-4 lg:gap-y-0">
          {/* Location */}
          <div className="flex items-center gap-2.5 sm:gap-3 pl-2.5 sm:pl-6 lg:justify-center pr-2 border-r border-gray-200">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <FaMapMarkerAlt size={22} className="fill-white" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] sm:text-xs text-gray-500 font-medium block leading-none mb-1">Location</span>
              <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-snug line-clamp-2 sm:truncate">
                {courseData?.location || universityName || "Online"}
              </span>
            </div>
          </div>

          {/* Established */}
          <div className="flex items-center gap-2.5 sm:gap-3 pl-3.5 sm:pl-6 lg:justify-center pr-2 lg:border-r border-gray-200">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <FaBuilding size={17} />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] sm:text-xs text-gray-500 font-medium block leading-none mb-1">Established</span>
              <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-snug line-clamp-2 sm:truncate">
                {courseData?.established || "—"}
              </span>
            </div>
          </div>

          {/* Approvals */}
          <div className="flex items-center gap-2.5 sm:gap-3 pl-2.5 sm:pl-6 lg:justify-center pr-2 border-r border-gray-200">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <BadgeCheck size={22} className="fill-white text-[#0077B6]" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] sm:text-xs text-gray-500 font-medium block leading-none mb-1">Approvals</span>
              <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-snug line-clamp-2 sm:truncate">
                {approvalsSummary || "UGC-DEB"}
              </span>
            </div>
          </div>

          {/* Eligibility */}
          <div className="flex items-center gap-2.5 sm:gap-3 pl-3.5 sm:pl-6 lg:justify-center pr-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
              {courseData?.admissionDeadline ? (
                <FaCalendar size={17} />
              ) : (
                <User size={18} className="fill-white text-[#0077B6]" />
              )}
            </div>
            <div className="min-w-0">
              {courseData?.admissionDeadline ? (
                <>
                  <span className="text-[11px] sm:text-xs text-red-500 font-medium block leading-none mb-1">
                    Admission deadline
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight truncate">
                    {courseData.admissionDeadline}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[11px] sm:text-xs text-gray-500 font-medium block leading-none mb-1">
                    Eligibility
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight truncate">
                    {courseData?.eligibility || "10+2 / Graduation"}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Highlights Table Card */}
      {highlightsList && highlightsList.length > 0 && (
        <div
          id="key-highlights"
          className="scroll-mt-16 bg-white rounded-2xl shadow-xs border border-gray-200 p-6 sm:p-10 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-5 text-center">
            Key Highlights of {courseData?.name || "Course"} {universityName ? `at ${universityName} ` : ""}2026
          </h2>

          <div className="overflow-hidden border border-gray-200 shadow-2xs max-w-5xl mx-auto rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0C2B4E] text-white text-xs sm:text-sm font-bold tracking-wide">
                    <th className="py-2.5 sm:py-3 px-4 sm:px-6 w-[32%] sm:w-70 border-r border-white/20">
                      Category
                    </th>
                    <th className="py-2.5 sm:py-3 px-4 sm:px-6">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-xs sm:text-[13.5px] bg-white">
                  {highlightsList.map((row, idx) => (
                    <tr
                      key={row._id || idx}
                      className="bg-white hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="py-2.5 px-4 sm:px-6 font-bold text-gray-900 border-r border-gray-200 whitespace-nowrap">
                        {row.label}
                      </td>
                      <td className="py-2.5 px-4 sm:px-6 text-gray-800 font-normal">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
