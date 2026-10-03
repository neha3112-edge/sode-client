"use client";

import React from "react";

export default function ShooliniWhyChoose({ whyChoose = [], brand = {} }) {
  return (
    <section id="Career" className="py-10 sm:py-14 bg-white select-none">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2
            className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight m-0"
            style={{
              background: brand.themeGradient || "linear-gradient(to right, #fd202a, #ff4be5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {brand.whyChoosePrefix || "Why Students Trust"}
          </h2>
          <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#000000] mt-1 m-0">
            {brand.whyChooseHighlight || brand.name || "Shoolini University Online"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {whyChoose.map((item, idx) => {
            const isRed = idx === 0 || idx === 3;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 lg:p-10 rounded-[6px] transition-transform duration-300 hover:shadow-md"
                style={{
                  backgroundColor: isRed ? brand.accentColor || "#fd2954" : brand.hero?.sectionBg || "#fff8f2",
                  color: isRed ? "#ffffff" : "#4d4d4d",
                }}
              >
                <h4
                  className="text-lg sm:text-[20px] font-bold tracking-tight mb-3 leading-snug"
                  style={{ color: isRed ? "#ffffff" : "#000000" }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-[13.5px] sm:text-[14.5px] leading-relaxed font-normal m-0"
                  style={{ color: isRed ? "#ffffff" : "#4d4d4d" }}
                >
                  {item.desc || item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
