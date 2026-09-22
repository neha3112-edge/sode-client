"use client";

import React from "react";

export default function CourseKeyHighlights({
  courseData,
  universityName,
  highlightsList,
}) {
  if (!highlightsList || highlightsList.length === 0) return null;

  return (
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
  );
}
