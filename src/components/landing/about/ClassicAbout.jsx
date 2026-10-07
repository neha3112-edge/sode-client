"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, User } from "lucide-react";
import LandingButton from "../LandingButton";

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
      className={`py-12 sm:py-16 md:py-20 select-none ${about.containerClassName || ""}`}
      style={{
        backgroundColor: sectionBg,
        ...about.sectionStyle,
      }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
          {/* Image Column */}
          {imageSrc && (
            <div
              className={`lg:col-span-6 flex items-center justify-center ${
                isImageRight ? "order-1 lg:order-2" : "order-1 lg:order-1"
              }`}
            >
              <div className="relative w-full aspect-[16/9] sm:aspect-[1.75/1] rounded-[6px] overflow-hidden shadow-xs border border-slate-100/90 bg-slate-50">
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
            className={`space-y-4 text-left ${imageSrc ? "lg:col-span-6" : "lg:col-span-12"} ${
              isImageRight ? "order-2 lg:order-1" : "order-2 lg:order-2"
            } ${about.contentClassName || ""}`}
          >
            <h2
              className={`text-2xl sm:text-[28px] lg:text-[32px] font-bold tracking-tight m-0 leading-tight ${
                about.titleClassName || "text-slate-900"
              }`}
              style={{
                color: about.titleColor || "#0f172a",
                ...about.titleStyle,
              }}
            >
              {title}
            </h2>

            {paragraphs.length > 0 && (
              <div
                className={`space-y-3.5 text-[13.5px] sm:text-[14px] leading-relaxed font-normal ${
                  about.paragraphClassName || "text-slate-700"
                }`}
                style={{
                  color: about.textColor || "#334155",
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
              <div className="pt-2 sm:pt-3">
                <LandingButton
                  variant="outline"
                  onClick={onOpenApply}
                  borderColor={buttonBorderColor}
                  textColor={buttonTextColor}
                  bg={buttonBg}
                  icon={<ArrowRight className="w-4 h-4 stroke-[2.2]" />}
                  iconPosition="right"
                  className="!font-semibold !rounded-[4px] !py-2.5 !px-6 !text-[14.5px] sm:!text-[15px] border hover:!opacity-90 active:scale-95"
                >
                  {buttonText}
                </LandingButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
