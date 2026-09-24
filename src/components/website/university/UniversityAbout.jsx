"use client";

import React from "react";

export default function UniversityAbout({
  aboutTitle,
  aboutText,
  uniName,
}) {
  if (!aboutText) return null;

  return (
    <div
      id="about"
      data-nav-label="About"
      className="scroll-mt-20 bg-white rounded-2xl shadow-xs border border-gray-200 p-6 sm:p-8 space-y-4 text-center"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-4 text-center">
        {aboutTitle || `About ${uniName}`}
      </h2>
      <div
        dangerouslySetInnerHTML={{ __html: aboutText }}
        className="space-y-4 text-xs sm:text-[13.5px] text-gray-700 leading-relaxed max-w-5xl mx-auto font-normal text-center"
      />
    </div>
  );
}


