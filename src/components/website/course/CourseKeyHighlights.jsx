"use client";

import React from "react";
import { formatAdmissionDeadline } from "@/lib/utils";

function renderHighlightValue(val, label = "", itemsProp = null) {
  const lblLower = (label || "").toLowerCase();

  // 1. Eligibility rendered in styled bullet points
  if (lblLower.includes("eligib")) {
    let items = [];
    if (Array.isArray(itemsProp) && itemsProp.length > 0) {
      items = itemsProp;
    } else if (Array.isArray(val) && val.length > 0) {
      items = val;
    } else if (typeof val === "string" && val.trim()) {
      items = val.split(/(?:\s*[•\n\r]+\s*|;\s+)/);
    }

    const cleanItems = items
      .map((it) => (typeof it === "string" ? it.replace(/^[•\-\*\s]+/, "").trim() : String(it || "").trim()))
      .filter(Boolean);

    if (cleanItems.length > 0) {
      return (
        <ul className="space-y-1.5 my-0.5 text-gray-800 list-none p-0 m-0">
          {cleanItems.map((item, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs sm:text-[13.5px] -ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-1.5 shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    }
  }

  if (typeof val !== "string") return val;

  if (lblLower.includes("deadline") || lblLower.includes("admission")) {
    val = formatAdmissionDeadline(val);
  }

  // Check if string contains "Read More" or "..."
  if (val.includes("Read More") || val.includes("...")) {
    const parts = val.split(/(?:Read More|\.\.\.)/g);
    return (
      <span>
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <a
                href="#specializations"
                onClick={(e) => {
                  e.preventDefault();
                  const target =
                    document.getElementById("specializations") ||
                    document.getElementById("admission");
                  if (target) {
                    const navHeight = 60;
                    const rect = target.getBoundingClientRect();
                    const scrollTop =
                      window.pageYOffset || document.documentElement.scrollTop;
                    window.scrollTo({
                      top: Math.max(0, rect.top + scrollTop - navHeight - 16),
                      behavior: "smooth",
                    });
                  }
                }}
                className="text-[#0077B6] hover:text-[#0C2B4E] font-semibold underline underline-offset-2 ml-1 cursor-pointer transition-colors inline-block"
              >
                Read More
              </a>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  }

  // If contains HTML tags
  if (/<[a-z][\s\S]*>/i.test(val)) {
    return (
      <span
        dangerouslySetInnerHTML={{ __html: val }}
        className="[&_a]:text-[#0077B6] [&_a]:hover:text-[#0C2B4E] [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2"
      />
    );
  }

  return val;
}

export default function CourseKeyHighlights({
  courseData,
  universityName,
  highlightsList,
}) {
  if (!highlightsList || highlightsList.length === 0) return null;

  return (
    <div
      id="key-highlights"
      data-nav-label="Highlights"
      className="scroll-mt-20 bg-white rounded-2xl shadow-xs border border-gray-200 p-6 sm:p-10 space-y-6"
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
              {highlightsList.map((row, idx) => {
                const isElig = (row.label || "").toLowerCase().includes("eligib");
                const eligItems = row.items || (isElig && Array.isArray(courseData?.eligibility) ? courseData.eligibility : null);
                return (
                  <tr
                    key={row._id || idx}
                    className="bg-white hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="py-2.5 px-4 sm:px-6 font-bold text-gray-900 border-r border-gray-200 whitespace-nowrap">
                      {row.label}
                    </td>
                    <td className="py-2.5 px-4 sm:px-6 text-gray-800 font-normal">
                      {renderHighlightValue(row.value, row.label, eligItems)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

