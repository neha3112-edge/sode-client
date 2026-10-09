"use client";

import React from "react";

export default function ShooliniWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const accentColor = "#fd2954";
  const creamColor = "#fff8f2";
  const gradient = "linear-gradient(to right, #fd202a, #ff4be5)";

  return (
    <section id="Career" className="pt-10 sm:pt-14 pb-0 bg-white select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 text-center mb-8 sm:mb-10">
        <h2
          className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight m-0"
          style={{
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {brand.whyChoosePrefix || "Why Students Trust"}
        </h2>
        <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#000000] mt-1 mb-0">
          {brand.whyChooseHighlight || brand.name || "Shoolini University Online"}
        </h3>
      </div>

      <div className="max-w-[1600px] mx-auto w-full flex flex-col">
        {/* Row 1 */}
        {whyChoose[0] && (
          <div className="flex flex-row w-full">
            <div
              className="w-[calc(44.5%+5px)] p-[35px_16px] sm:p-[45px_30px] lg:p-[50px_90px] flex flex-col justify-center"
              style={{
                backgroundColor: accentColor,
                color: "#ffffff",
              }}
            >
              <h4
                className="text-[14px] xs:text-[15px] sm:text-[18px] lg:text-[20px] font-semibold tracking-tight mb-2 sm:mb-3.5 leading-snug m-0"
                style={{ color: "#ffffff" }}
              >
                {whyChoose[0].title}
              </h4>
              <p
                className="text-[11px] xs:text-[11.5px] sm:text-[12.5px] lg:text-[13px] leading-[1.45] sm:leading-[1.6] font-normal m-0"
                style={{ color: "#ffffff" }}
              >
                {whyChoose[0].desc || whyChoose[0].description}
              </p>
            </div>

            {whyChoose[1] && (
              <div
                className="w-[calc(55.5%-5px)] p-[35px_16px] sm:p-[45px_30px] lg:p-[50px_90px] flex flex-col justify-center"
                style={{
                  backgroundColor: creamColor,
                  color: "#000000",
                }}
              >
                <h4
                  className="text-[14px] xs:text-[15px] sm:text-[18px] lg:text-[20px] font-semibold tracking-tight mb-2 sm:mb-3.5 leading-snug m-0"
                  style={{ color: "#000000" }}
                >
                  {whyChoose[1].title}
                </h4>
                <p
                  className="text-[11px] xs:text-[11.5px] sm:text-[12.5px] lg:text-[13px] leading-[1.45] sm:leading-[1.6] font-normal m-0"
                  style={{ color: "#4d4d4d" }}
                >
                  {whyChoose[1].desc || whyChoose[1].description}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Row 2 */}
        {whyChoose[2] && (
          <div className="flex flex-row w-full">
            <div
              className="w-[calc(55.5%-5px)] p-[35px_16px] sm:p-[45px_30px] lg:p-[50px_90px] flex flex-col justify-center"
              style={{
                backgroundColor: creamColor,
                color: "#000000",
              }}
            >
              <h4
                className="text-[14px] xs:text-[15px] sm:text-[18px] lg:text-[20px] font-semibold tracking-tight mb-2 sm:mb-3.5 leading-snug m-0"
                style={{ color: "#000000" }}
              >
                {whyChoose[2].title}
              </h4>
              <p
                className="text-[11px] xs:text-[11.5px] sm:text-[12.5px] lg:text-[13px] leading-[1.45] sm:leading-[1.6] font-normal m-0"
                style={{ color: "#4d4d4d" }}
              >
                {whyChoose[2].desc || whyChoose[2].description}
              </p>
            </div>

            {whyChoose[3] && (
              <div
                className="w-[calc(44.5%+5px)] p-[35px_16px] sm:p-[45px_30px] lg:p-[50px_90px] flex flex-col justify-center"
                style={{
                  backgroundColor: accentColor,
                  color: "#ffffff",
                }}
              >
                <h4
                  className="text-[14px] xs:text-[15px] sm:text-[18px] lg:text-[20px] font-semibold tracking-tight mb-2 sm:mb-3.5 leading-snug m-0"
                  style={{ color: "#ffffff" }}
                >
                  {whyChoose[3].title}
                </h4>
                <p
                  className="text-[11px] xs:text-[11.5px] sm:text-[12.5px] lg:text-[13px] leading-[1.45] sm:leading-[1.6] font-normal m-0"
                  style={{ color: "#ffffff" }}
                >
                  {whyChoose[3].desc || whyChoose[3].description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
