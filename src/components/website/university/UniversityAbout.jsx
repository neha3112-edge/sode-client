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
      className="scroll-mt-16 bg-white rounded-2xl shadow-xs border border-gray-200 p-6 sm:p-10 space-y-4 text-center"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight m-0 text-center">
        {aboutTitle || `About ${uniName}`}
      </h2>
      <div className="w-full max-w-4xl mx-auto h-px bg-gray-200/80 my-2" />
      <div className="space-y-4 text-xs sm:text-[13.5px] text-gray-700 leading-relaxed max-w-5xl mx-auto font-normal text-center">
        <p className="m-0 whitespace-pre-line">{aboutText}</p>
      </div>
    </div>
  );
}
