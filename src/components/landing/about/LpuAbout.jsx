"use client";

import React from "react";

export default function LpuAbout({ about = {}, brand = {}, stats = [] }) {
  const primaryColor = brand.primaryColor || "#f58220";
  const activeStats = stats.length > 0 ? stats : brand.stats || [];

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-white select-none">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 space-y-6 sm:space-y-8">
        <div className="space-y-1.5 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#b0b7c3] tracking-tight m-0 leading-tight">
            {about.subtitle || "About"}
          </h2>
          <h3 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-black tracking-tight m-0 leading-tight">
            {about.titlePrefix || brand.shortName || "LPU"}{" "}
            <span style={{ color: primaryColor }}>
              {about.titleHighlight || "Online University"}
            </span>
          </h3>
          <p className="text-[15px] sm:text-base font-bold mt-1.5 sm:mt-2 m-0" style={{ color: primaryColor }}>
            {about.subName || `(${brand.fullName || brand.name || "Lovely Professional University Online"})`}
          </p>
        </div>

        {paragraphs.length > 0 && (
          <div className="space-y-3.5 text-[14px] sm:text-[15px] text-slate-700 leading-relaxed max-w-[1240px] text-left">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="m-0 font-normal leading-[1.65]">
                {p}
              </p>
            ))}
          </div>
        )}

        {activeStats.length > 0 && (
          <div className="pt-6 sm:pt-8 md:pt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-0 items-start">
              {activeStats.map((st, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-start text-left ${
                    idx > 0 ? "md:pl-8 lg:pl-12" : ""
                  } ${
                    idx < activeStats.length - 1
                      ? "md:border-r md:border-slate-300 md:pr-8 lg:pr-12"
                      : ""
                  }`}
                >
                  <h4
                    className="text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight m-0 leading-none"
                    style={{ color: primaryColor }}
                  >
                    {st.number}
                  </h4>
                  <p className="text-[13.5px] sm:text-[14.5px] md:text-[15px] font-bold text-slate-900 mt-2 sm:mt-2.5 m-0 leading-snug">
                    {st.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
