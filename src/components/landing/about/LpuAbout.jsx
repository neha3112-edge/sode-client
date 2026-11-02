"use client";

import React from "react";
import LandingContainer from "../LandingContainer";

export default function LpuAbout({ about = {}, brand = {}, stats = [] }) {
  const primaryColor = brand.primaryColor || "#f58220";
  const activeStats = stats.length > 0 ? stats : brand.stats || [];

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-white select-none">
      <LandingContainer className="px-3 sm:px-6 space-y-6 sm:space-y-8">
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
          <div className="space-y-3.5 text-[14px] sm:text-[15px] text-slate-700 leading-relaxed w-full text-left">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="m-0 font-normal leading-[1.65]">
                {p}
              </p>
            ))}
          </div>
        )}

        {activeStats.length > 0 && (
          <div className="pt-6 sm:pt-8 md:pt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-y-7 sm:gap-y-8 md:gap-y-0 max-w-full">
              {activeStats.map((st, idx) => {
                const isLast = idx === activeStats.length - 1;
                const isLeftColMobile = idx % 2 === 0;

                const colPadding = isLeftColMobile
                  ? "pl-2.5 sm:pl-4 pr-3 sm:pr-5 md:pl-0 md:pr-0"
                  : "pl-3.5 sm:pl-5 md:pl-0";

                const desktopPadding =
                  idx === 0
                    ? "md:pr-6 lg:pr-10 xl:pr-12"
                    : isLast
                    ? "md:pl-6 lg:pl-10 xl:pl-12"
                    : "md:px-6 lg:px-10 xl:px-12";

                const dividerVisibility =
                  isLeftColMobile
                    ? "block"
                    : !isLast
                    ? "hidden md:block"
                    : null;

                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between w-full ${colPadding} ${desktopPadding}`}
                  >
                    <div className="flex flex-col items-start text-left w-full">
                      <h4
                        className="text-[34px] sm:text-[44px] lg:text-[54px] font-extrabold tracking-tight m-0 leading-none"
                        style={{ color: primaryColor || "#f58220" }}
                      >
                        {st.number}
                      </h4>
                      <p className="text-[13px] sm:text-[14px] lg:text-[15.5px] font-medium tracking-tight text-slate-800 mt-2 sm:mt-2.5 m-0 leading-snug">
                        {st.label}
                      </p>
                    </div>

                    {/* Vertical Divider Line */}
                    {dividerVisibility && (
                      <div
                        aria-hidden="true"
                        className={`${dividerVisibility} w-[1.5px] h-12 sm:h-14 lg:h-16 bg-slate-300 ml-auto shrink-0`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </LandingContainer>
    </section>
  );
}
