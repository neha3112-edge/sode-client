"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

export default function CourseCareerOpportunities({
  careerData,
  courseName = "",
  universityName = "",
}) {
  if (!careerData) return null;

  const { title, jobRoles = [], hiringPartners = [] } = careerData;
  const hasRoles = Array.isArray(jobRoles) && jobRoles.length > 0;
  const hasPartners = Array.isArray(hiringPartners) && hiringPartners.length > 0;

  if (!hasRoles && !hasPartners) {
    return null;
  }

  const displayTitle =
    title ||
    `Career Opportunities & Salary Scope for ${courseName || "Graduates"}${universityName ? ` at ${universityName}` : ""
    }`;

  const recruitersTitle = `Top Recruiters for the ${courseName || "Program"}${universityName ? ` at ${universityName}` : ""
    }`;

  const [isExpanded, setIsExpanded] = useState(false);
  const INITIAL_LIMIT = 5;

  const formatSalary = (role) => {
    const val = role?.salaryRange || role?.avgSalary;
    if (!val) return "Competitive";
    const str = String(val).trim();
    if (/^[₹|Rs|INR]/i.test(str)) {
      return str;
    }
    return `₹${str}`;
  };

  const visibleRoles = isExpanded
    ? jobRoles
    : jobRoles.slice(0, INITIAL_LIMIT);

  return (
    <>
      {/* 1. Job Roles Table Card */}
      {hasRoles && (
        <div
          id="career-opportunities"
          data-nav-label="Career & Scope"
          className="scroll-mt-20 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 space-y-4 sm:space-y-5"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight m-0">
              {displayTitle}
            </h2>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#D9E5F2] shadow-2xs bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-137.5 sm:min-w-full">
                <thead>
                  <tr className="bg-[#EBF3FA] border-b border-[#D9E5F2]">
                    <th className="py-3 px-4 sm:px-6 text-xs sm:text-[13px] font-bold text-gray-900 uppercase tracking-wider border-r border-[#D9E5F2] w-[30%]">
                      JOB ROLE
                    </th>
                    <th className="py-3 px-4 sm:px-6 text-xs sm:text-[13px] font-bold text-gray-900 uppercase tracking-wider border-r border-[#D9E5F2] w-[45%]">
                      ROLE DESCRIPTION
                    </th>
                    <th className="py-3 px-4 sm:px-6 text-xs sm:text-[13px] font-bold text-gray-900 uppercase tracking-wider w-[25%]">
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
                      <td className="py-3 px-4 sm:px-6 text-xs sm:text-[13.5px] font-bold text-gray-900 border-r border-[#E6EEF5] align-middle">
                        {role.title}
                      </td>
                      <td className="py-3 px-4 sm:px-6 text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal border-r border-[#E6EEF5] align-middle">
                        {role.description || "—"}
                      </td>
                      <td className="py-3 px-4 sm:px-6 text-xs sm:text-[13.5px] font-bold text-gray-900 whitespace-nowrap align-middle">
                        {formatSalary(role)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {jobRoles.length > INITIAL_LIMIT && (
            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs sm:text-[13px] px-6 py-2 rounded-lg transition-all cursor-pointer shadow-xs active:scale-95"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. Top Recruiters Separate Card */}
      {hasPartners && (
        <div
          id="top-recruiters"
          data-nav-label="Top Recruiters"
          className="scroll-mt-20 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 space-y-4 sm:space-y-5"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight m-0">
              {recruitersTitle}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3.5">
            {hiringPartners.map((partner, idx) => {
              const logoSrc = partner.logo ? getAssetPath(partner.logo) : null;
              return (
                <div
                  key={partner._id || idx}
                  className="bg-white rounded-lg border border-gray-200/90 hover:border-blue-400 hover:shadow-xs p-3 flex items-center justify-center transition-all h-14 sm:h-16 group"
                >
                  {logoSrc ? (
                    <div className="relative w-full h-7 sm:h-8 flex items-center justify-center">
                      <Image
                        src={logoSrc}
                        alt={partner.name || "Recruiter Logo"}
                        fill
                        sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 180px"
                        className="object-contain transition-transform group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <span className="text-xs sm:text-[13px] font-bold text-gray-800 tracking-tight text-center truncate px-1">
                      {partner.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
