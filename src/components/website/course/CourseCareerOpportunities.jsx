"use client";

import React, { useState } from "react";

export default function CourseCareerOpportunities({
  careerData,
  courseName = "",
  universityName = "",
}) {
  if (!careerData) return null;

  const { title, jobRoles = [] } = careerData;
  const hasRoles = Array.isArray(jobRoles) && jobRoles.length > 0;

  if (!hasRoles) {
    return null;
  }

  const displayTitle =
    title ||
    `Career Opportunities & Salary Scope for ${courseName || "Graduates"}${
      universityName ? ` at ${universityName}` : ""
    }`;

  const STEP = 5;
  const [visibleCount, setVisibleCount] = useState(STEP);

  const formatSalary = (role) => {
    const val = role?.salaryRange || role?.avgSalary;
    if (!val) return "Competitive";
    const str = String(val).trim();
    if (/^[₹|Rs|INR]/i.test(str)) {
      return str;
    }
    return `₹${str}`;
  };

  const totalRoles = jobRoles.length;
  const isAllExpanded = visibleCount >= totalRoles;
  const visibleRoles = jobRoles.slice(0, visibleCount);

  const handleToggle = () => {
    if (isAllExpanded) {
      setVisibleCount(STEP);
      const section = document.getElementById("career-opportunities");
      if (section) {
        const yOffset = -70;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    } else {
      setVisibleCount((prev) => prev + STEP);
    }
  };

  return (
    <div
      id="career-opportunities"
      data-nav-label="Career & Scope"
      suppressHydrationWarning
      className="scroll-mt-20 bg-white rounded-xl border border-gray-200/90 shadow-xs p-3.5 sm:p-7 md:p-8 space-y-4 sm:space-y-5"
    >
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight m-0">
          {displayTitle}
        </h2>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#D9E5F2] shadow-2xs bg-white w-full">
        <table suppressHydrationWarning className="table-fixed w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#EBF3FA] border-b border-[#D9E5F2]">
              <th className="py-2.5 sm:py-3 px-2 sm:px-5 text-[10px] sm:text-[13px] font-bold text-gray-900 uppercase tracking-wider border-r border-[#D9E5F2] w-[30%] sm:w-[28%] align-middle break-words">
                JOB ROLE
              </th>
              <th className="py-2.5 sm:py-3 px-2 sm:px-5 text-[10px] sm:text-[13px] font-bold text-gray-900 uppercase tracking-wider border-r border-[#D9E5F2] w-[44%] sm:w-[48%] align-middle break-words">
                ROLE DESCRIPTION
              </th>
              <th className="py-2.5 sm:py-3 px-2 sm:px-5 text-[10px] sm:text-[13px] font-bold text-gray-900 uppercase tracking-wider w-[26%] sm:w-[24%] align-middle break-words">
                SALARY RANGE IN INDIA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6EEF5] bg-white">
            {visibleRoles.map((role, idx) => (
              <tr
                key={role._id || idx}
                className="hover:bg-blue-50/25 transition-colors"
              >
                <td className="py-2.5 sm:py-3.5 px-2 sm:px-5 text-[11px] sm:text-[13.5px] font-bold text-gray-900 border-r border-[#E6EEF5] align-middle break-words leading-snug">
                  {role.title}
                </td>
                <td className="py-2.5 sm:py-3.5 px-2 sm:px-5 text-[10.5px] sm:text-[13px] text-gray-700 leading-snug sm:leading-relaxed font-normal border-r border-[#E6EEF5] align-middle break-words">
                  {role.description || "—"}
                </td>
                <td className="py-2.5 sm:py-3.5 px-2 sm:px-5 text-[11px] sm:text-[13.5px] font-bold text-gray-900 align-middle break-words leading-snug">
                  {formatSalary(role)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalRoles > STEP && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={handleToggle}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer shadow-none group"
          >
            <span>{isAllExpanded ? "View Less" : "View More"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isAllExpanded ? "rotate-180" : "group-hover:translate-y-0.5"
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
