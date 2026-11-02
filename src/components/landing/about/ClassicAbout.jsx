"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, User } from "lucide-react";
import LandingButton from "../LandingButton";
import LandingContainer from "../LandingContainer";

/**
 * Reusable Default / Classic About Section
 * Matches reference layout: 50/50 split, Image on Left (default), Content on Right.
 * Image position is configurable via `about.imagePosition` ("left" | "right").
 */
export default function ClassicAbout({ about = {}, brand = {}, onOpenApply }) {
  const universityName = brand.name || "University Online";
  const title = about.title || `About ${universityName}`;
  const imagePosition = about.imagePosition || (brand.aboutLayout === "imageRight" ? "right" : "left");
  const isImageRight = imagePosition === "right";

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const imageSrc =
    about.image ||
    brand.campusImage ||
    brand.buildingAboutImage;

  const imageAlt = about.imageAlt || `${title} Campus`;
  const buttonText = about.buttonText || brand.aboutButtonText || "Apply Now";
  const showApplyButton = about.showButton !== false;

  const primaryColor = brand.primaryColor || "#08417b";
  const buttonBorderColor = about.buttonBorderColor || about.buttonColor || primaryColor;
  const buttonTextColor = about.buttonTextColor || about.buttonColor || primaryColor;
  const buttonBg = about.buttonBg || about.buttonBackground || "transparent";

  const sectionBg =
    about.backgroundColor ||
    about.sectionStyle?.backgroundColor ||
    brand.aboutBg ||
    "#ffffff";

  return (
    <section
      id="about"
      className={`pt-8 sm:pt-10 lg:pt-10 pb-0 select-none ${about.containerClassName || ""}`}
      style={{
        backgroundColor: sectionBg,
        ...about.sectionStyle,
      }}
    >
      <LandingContainer className="amity-about-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start pt-4 sm:pt-4 lg:pt-4 ">
          {/* Image Column */}
          {imageSrc && (
            <div
              className={`lg:col-span-6 flex items-start justify-center ${isImageRight ? "order-1 lg:order-2" : "order-1 lg:order-1"
                }`}
            >
              <div className="relative w-full aspect-[16/9] sm:aspect-[1.82/1] rounded-[4px] overflow-hidden border border-slate-200/80 bg-slate-50">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  className={`object-cover object-center ${about.imageClassName || ""}`}
                  sizes="(max-width: 1024px) 100vw, 580px"
                  style={about.imageStyle}
                />
              </div>
            </div>
          )}

          {/* Content Column */}
          <div
            className={`space-y-3.5 text-left ${imageSrc ? "lg:col-span-6" : "lg:col-span-12"} ${isImageRight ? "order-2 lg:order-1" : "order-2 lg:order-2"
              } ${about.contentClassName || ""}`}
          >
            <h2
              className={`  pb-2 sm:pb-3 lg:pb-3 text-2xl sm:text-[32px] lg:text-[32px] font-medium font-poppins tracking-tight m-0 leading-tight text-left${about.titleClassName || ""
                }`}
              style={{
                color: about.titleColor || "#1f2937",
                ...about.titleStyle,
              }}
            >
              {title}
            </h2>

            {paragraphs.length > 0 && (
              <div
                className={`space-y-3.5 text-[13px] sm:text-[13.5px] lg:text-[13.5px] leading-[1.65] font-normal ${about.paragraphClassName || ""
                  }`}
                style={{
                  color: about.textColor || "#333333",
                  ...about.paragraphStyle,
                }}
              >
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="m-0">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* Optional How-It-Works Box (e.g. Shoolini) */}
            {about.howItWorks && (
              <div className="border-2 border-black p-4 my-4 rounded-none text-left bg-transparent max-w-[490px]">
                <h3 className="text-sm sm:text-[18px] font-bold text-[#000000] m-0 mb-0.5">
                  {about.howItWorks.title || "Here’s how it works:"}
                </h3>
                <h4 className="text-xs sm:text-[14.5px] font-semibold text-[#000000] m-0 mb-2">
                  {about.howItWorks.subtitle || "Pay 70% upfront and the remaining 30% after placement."}
                </h4>
                <p className="text-[11.5px] sm:text-[13.5px] text-[#4d4d4d] m-0 flex items-center gap-1.5 font-normal">
                  <User className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>
                    {about.howItWorks.note || "Pay-After-Placement"}
                  </span>
                </p>
              </div>
            )}

            {showApplyButton && (
              <div className="pt-2 sm:pt-2 flex justify-center lg:justify-start about-apply-btn-wrapper">
                <button
                  type="button"
                  onClick={onOpenApply}
                  className="about-apply-btn inline-flex items-center justify-center gap-2 px-6 h-[44px] border-2 border-[#08417b] text-[#111827] bg-white rounded-[4px] text-[16px] font-normal hover:bg-slate-50 transition-colors cursor-pointer shadow-none"
                  style={{
                    borderColor: buttonBorderColor || "#08417b",
                    color: buttonTextColor || "#111827",
                    backgroundColor: buttonBg !== "transparent" ? buttonBg : "#ffffff",
                  }}
                >
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.4] ml-0.5 text-[#111827]" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section Divider Line (matching reference design) */}
        {about.showDivider !== false && (
          <div
            className="about-divider w-full mt-9 sm:mt-9 lg:mt-[34px] mb-7 sm:mb-7 lg:mb-[78px]"
            style={{
              height: "1px",
              backgroundColor: "#d1d5db",
              borderTop: "1px solid #d1d5db",
              width: "100%",
              display: "block",
              opacity: 1,
              visibility: "visible",
            }}
          />
        )}
      </LandingContainer>
    </section>
  );
}
