"use client";

import React, { useState } from "react";

export default function GalgotiasGrid({ programmes, brand = {}, onSelectCourseForBrochure }) {
  const [category, setCategory] = useState("master");

  const masterList = programmes.filter(
    (c) => c.category === "master" || c.level?.toLowerCase().includes("post") || ["MA", "MCA", "MBA", "MCOM"].includes(c.code)
  );

  const bachelorList = programmes.filter(
    (c) => c.category === "bachelor" || c.level?.toLowerCase().includes("under") || c.level?.toLowerCase().includes("grad") || ["BBA", "BCA", "BCOM", "BA"].includes(c.code)
  );

  const activeList = category === "master" ? masterList : bachelorList;

  return (
    <section id="program" className="py-12 sm:py-16 bg-white select-none">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#002b49] text-center tracking-tight leading-tight m-0 mb-6 sm:mb-8">
          {brand.programmesTitle || "Courses Offered by Galgotias University Online"}
        </h2>

        {/* Tab Switcher */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          {[
            { id: "master", label: "Master Course" },
            { id: "bachelor", label: "Bachelor Course" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategory(tab.id)}
              className={`px-6 sm:px-7 py-2 sm:py-2.5 rounded-[8px] text-[14px] sm:text-[15px] font-bold transition-all cursor-pointer border-none ${
                category === tab.id ? "bg-[#d9d9d9] text-black shadow-xs" : "bg-[#e5e7eb]/80 hover:bg-[#e2e8f0] text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${category === "master" ? "lg:grid-cols-4" : "lg:grid-cols-3 max-w-[1020px] mx-auto"} gap-5 sm:gap-6`}>
          {activeList.map((course, idx) => (
            <div
              key={course.code || idx}
              className="bg-[#f0f8fd] rounded-[6px] sm:rounded-[8px] p-6 sm:p-7 flex flex-col items-center justify-between text-center min-h-[250px] sm:min-h-[270px] transition-all hover:shadow-md"
            >
              <div className="w-full flex flex-col items-center">
                <h3 className="text-[26px] sm:text-[28px] font-bold text-black tracking-tight leading-tight m-0 mb-3 sm:mb-4">
                  {course.code}
                </h3>
                <p className="text-[13px] sm:text-[13.5px] text-slate-700 leading-relaxed font-normal m-0 mb-6">
                  {course.description || course.desc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectCourseForBrochure?.(course.code)}
                className="bg-[#5cb85c] hover:bg-[#4ea84e] active:scale-95 text-white font-bold text-[13px] sm:text-[13.5px] px-6 py-2 rounded-[4px] shadow-xs cursor-pointer border-none transition-all"
              >
                Know More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
