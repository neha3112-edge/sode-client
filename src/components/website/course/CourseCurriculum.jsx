"use client";

import React from "react";

export default function CourseCurriculum({
  curriculumList,
  courseData,
  universityName,
}) {
  if (!curriculumList || curriculumList.length === 0) return null;

  return (
    <div
      id="syllabus"
      data-nav-label="Syllabus"
      className="scroll-mt-20 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-3 sm:mb-4 m-0">
        {courseData?.name || "Course"} Course Updated Syllabus 2026 {universityName ? `at ${universityName}` : ""}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {curriculumList.map((sem, idx) => {
          const rawLabel = sem.semester || `Semester ${idx + 1}`;
          const numMatch = rawLabel.match(/\d+/);
          const semesterTitle = numMatch ? `Semester ${numMatch[0]}` : rawLabel;

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-2xs flex flex-col items-center hover:border-[#08AEAA] transition-colors h-full max-h-[340px] sm:max-h-[360px] w-full"
            >
              <div className="bg-[#0C3A66] text-white px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 shadow-xs shrink-0">
                {semesterTitle}
              </div>

              <div className="w-full h-px bg-gray-100 mb-3 sm:mb-4 shrink-0" />

              <ul className="w-full text-left space-y-2 sm:space-y-2.5 text-xs sm:text-[13px] text-gray-700 m-0 p-0 list-none flex-1 min-h-0 overflow-y-auto pr-1.5 scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
                {sem.subjects.map((sub, sIdx) => {
                  const subName = typeof sub === "string" ? sub : (sub.name || "");

                  return (
                    <li key={sIdx} className="flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                      <span className="text-gray-900 font-bold shrink-0">•</span>
                      <span className="text-gray-700 break-words">{subName}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
