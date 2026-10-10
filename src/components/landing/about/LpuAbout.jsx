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
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#b0b7c3] tracking-wide m-0 leading-tight">
            {about.subtitle || "About"}
          </h2>
          <h3 className="text-[28px] sm:text-[34px] lg:text-[44px] font-black text-black tracking-wide m-0 leading-tight">
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
          <div className="hidden md:block pt-8 sm:pt-10 md:pt-12">
            <div className="grid grid-cols-4 items-center max-w-full">
              {activeStats.map((st, idx) => {
                const isLast = idx === activeStats.length - 1;

                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between ${
                      idx > 0 ? "pl-6 lg:pl-10 xl:pl-12" : ""
                    } ${!isLast ? "pr-6 lg:pr-10 xl:pr-12" : ""}`}
                  >
                    <div className="flex flex-col items-start text-left">
                      <h4
                        className="text-[44px] sm:text-[50px] lg:text-[54px] font-extrabold tracking-tight m-0 leading-none"
                        style={{ color: primaryColor || "#f58220" }}
                      >
                        {st.number}
                      </h4>
                      <p className="text-[14px] sm:text-[15px] lg:text-[15.5px] font-medium tracking-wide text-black mt-2.5 m-0 leading-snug">
                        {st.label}
                      </p>
                    </div>

                    {/* Vertical Divider Line between stats on Desktop */}
                    {!isLast && (
                      <div
                        aria-hidden="true"
                        className="w-[1.5px] h-14 lg:h-16 bg-black/80 ml-auto shrink-0"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
