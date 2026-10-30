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
          const rawLabel = sem.semester || sem.semesterName || `Semester ${idx + 1}`;
          const cleanLabel = String(rawLabel).trim();

          // Check if term is like "Module 1: Introduction to Marketing"
          const moduleMatch = cleanLabel.match(/^(module\s*\d+)\s*[:–—\-]\s*(.+)$/i);
          let semesterTitle = cleanLabel;
          let extractedGroupTitle = null;

          if (moduleMatch) {
            semesterTitle = moduleMatch[1]; // e.g. "Module 1"
            extractedGroupTitle = moduleMatch[2].trim(); // e.g. "Introduction to Marketing"
          } else if (/^\d+$/.test(cleanLabel)) {
            semesterTitle = `Semester ${cleanLabel}`;
          }

          let electivesList = Array.isArray(sem.electives) ? [...sem.electives] : [];
          let subjectsList = Array.isArray(sem.subjects) ? sem.subjects : [];

          // If extracted module group title exists and electives is empty, seamlessly group topics into elective
          if (extractedGroupTitle && electivesList.length === 0 && subjectsList.length > 0) {
            electivesList = [
              {
                groupTitle: extractedGroupTitle,
                selectCount: 1,
                options: subjectsList.map((sub) => (typeof sub === "string" ? sub : sub?.name || "")),
              },
            ];
            subjectsList = [];
          }

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-2xs flex flex-col items-center hover:border-[#08AEAA] transition-colors h-full max-h-[360px] sm:max-h-[400px] w-full"
            >
              <div className="bg-[#0C3A66] text-white px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 shadow-xs shrink-0">
                {semesterTitle}
              </div>

              <div className="w-full h-px bg-gray-100 mb-3 sm:mb-4 shrink-0" />

              <div className="w-full text-left space-y-3 text-xs sm:text-[13px] text-gray-700 m-0 p-0 flex-1 min-h-0 overflow-y-auto pr-1.5 scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
                {subjectsList.length > 0 && (
                  <ul className="space-y-2 sm:space-y-2.5 m-0 p-0 list-none">
                    {subjectsList.map((sub, sIdx) => {
                      const subName = typeof sub === "string" ? sub : (sub.name || "");

                      return (
                        <li key={sIdx} className="flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                          <span className="text-gray-900 font-bold shrink-0">•</span>
                          <span className="text-gray-700 break-words">{subName}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {electivesList.map((elec, eIdx) => {
                  const opts = Array.isArray(elec.options) ? elec.options : [];
                  if (opts.length === 0) return null;
                  const rawTitle = elec.groupTitle || "Electives";
                  const title = rawTitle.replace(/\s*\(\s*choose\s*any\s*\d*\s*\)/gi, "").trim() || "Electives";

                  return (
                    <div
                      key={eIdx}
                      className="mt-2.5 pt-2 border-t border-dashed border-amber-300/80 bg-amber-50/50 rounded-lg p-2.5"
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="inline-block bg-amber-100 text-amber-900 font-semibold text-[11px] px-2 py-0.5 rounded border border-amber-300">
                          {title}
                        </span>
                      </div>
                      <ul className="space-y-1.5 m-0 p-0 list-none text-xs text-amber-950">
                        {opts.map((opt, oIdx) => (
                          <li key={oIdx} className="flex items-start gap-1.5 leading-relaxed pl-1">
                            <span className="text-amber-600 font-semibold shrink-0">○</span>
                            <span className="break-words font-medium">{typeof opt === "string" ? opt : opt.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
