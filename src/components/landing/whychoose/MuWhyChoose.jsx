"use client";

import React from "react";
import Image from "next/image";
import LandingContainer from "../LandingContainer";

export default function MuWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const titleLine1 = brand.whyChooseTitle || "WHY CHOOSE";
  const titleLine2 =
    brand.whyChooseSubtitle ||
    brand.whyChooseHighlight ||
    `${brand.name || "MANGALAYATAN UNIVERSITY"} ONLINE DEGREE COURSES?`;
  const showDesc = brand.whyChooseShowDesc ?? false;

  return (
    <section
      id="whychoose"
      data-section="whychoose"
      className={`why-choose-section text-white select-none ${brand.whyChooseSectionClassName || "py-6 sm:py-8 md:py-10"}`}
      style={{
        backgroundColor: brand.whyChooseBg || brand.primaryColor || "#193579",
        ...brand.whyChooseSectionStyle,
      }}
    >
      <LandingContainer className={brand.whyChooseContainerClassName || "max-w-[1240px]"}>
        <div className={brand.whyChooseHeaderClassName || "text-center mb-5 sm:mb-7"}>
          <h2
            className={
              brand.whyChooseTitleClassName ||
              "text-[22px] sm:text-[26px] lg:text-[29px] font-bold text-white tracking-wide uppercase leading-tight m-0"
            }
            style={brand.whyChooseTitleStyle}
          >
            {titleLine1} <br />
            <span className={brand.whyChooseSubtitleClassName || "text-white uppercase font-bold"}>
              {titleLine2}
            </span>
          </h2>
        </div>

        <div
          className={
            brand.whyChooseGridClassName ||
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-[1200px] mx-auto"
          }
        >
          {whyChoose.map((item, idx) => (
            <div
              key={idx}
              className={
                brand.whyChooseCardClassName ||
                "bg-white text-slate-900 rounded-[6px] px-4 py-2.5 sm:px-5 sm:py-3 flex items-center gap-3.5 sm:gap-4 shadow-xs hover:shadow-sm transition-all"
              }
              style={brand.whyChooseCardStyle}
            >
              {item.image && (
                <div
                  className={
                    brand.whyChooseImageWrapperClassName ||
                    "relative w-12 h-12 sm:w-13 sm:h-13 shrink-0 flex items-center justify-center"
                  }
                >
                  <Image
                    src={item.image}
                    alt={item.title || item.line1 || "Feature"}
                    fill
                    className="object-contain"
                    sizes="56px"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="m-0 leading-tight">
                  {item.line1 ? (
                    <>
                      <span
                        className={`block leading-[1.25] ${
                          brand.whyChooseCardTitleClassName ||
                          "text-[15px] sm:text-[16px] font-bold text-slate-900"
                        }`}
                        style={brand.whyChooseCardTitleStyle}
                      >
                        {item.line1}
                      </span>
                      <span
                        className={`block leading-[1.25] mt-0.5 ${
                          brand.whyChooseCardSubtitleClassName ||
                          "text-[13.5px] sm:text-[14.5px] font-normal text-slate-800"
                        }`}
                        style={brand.whyChooseCardSubtitleStyle}
                      >
                        {item.line2}
                      </span>
                    </>
                  ) : (
                    <span
                      className={`block leading-[1.25] ${
                        brand.whyChooseCardTitleClassName ||
                        "text-[15px] sm:text-[16px] font-bold text-slate-900"
                      }`}
                      style={brand.whyChooseCardTitleStyle}
                    >
                      {item.title}
                    </span>
                  )}
                </h3>
                {showDesc && (item.desc || item.description) && (
                  <p
                    className={
                      brand.whyChooseItemDescClassName ||
                      "text-[11.5px] sm:text-[12px] text-slate-600 leading-tight mt-1 m-0"
                    }
                  >
                    {item.desc || item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}
