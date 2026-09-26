"use client";

import React from "react";
import Image from "next/image";
import { User } from "lucide-react";

/**
 * Reusable Landing About Section
 * Supports:
 * 1. Campus Stats Layout (Manipal - Centered heading, description, 4 stats, and wide panoramic building)
 * 2. Classic 2-Column Layout (Amity - Left image, right text with Apply button)
 */
export default function LandingAbout({ about = {}, brand = {}, stats = [], onOpenApply }) {
  const universityName = brand.name || "University Online";
  const title = about.title || `About ${universityName}`;
  const isCampusStats = brand.aboutLayout === "campusStats";
  const primaryColor = brand.primaryColor || "#ee3024";

  const paragraphs = about.paragraphs || [
    about.text1,
    about.text2,
    about.text3,
  ].filter(Boolean);

  const buttonText = about.buttonText || "Apply Now";
  const imageSrc =
    about.image ||
    brand.campusImage ||
    brand.buildingAboutImage ||
    "/assets/manipal_v1_images/manipal-about.webp";

  const activeStats = stats.length > 0 ? stats : brand.stats || [];

  if (isCampusStats) {
    return (
      <section id="about" className="pt-10 sm:pt-14 pb-0 bg-white relative overflow-hidden select-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight m-0 mb-3">
            About{" "}
            <span style={{ color: primaryColor }}>
              {brand.aboutHighlight || brand.name || "Manipal University Online"}
            </span>
          </h2>

          {/* Description Paragraphs */}
          <div className="max-w-4xl mx-auto space-y-2.5 mb-8 sm:mb-12">
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={`text-[12.5px] sm:text-[13.5px] text-slate-700 leading-relaxed font-normal m-0 ${idx === 1 ? "font-semibold italic text-slate-800" : ""
                  }`}
              >
                {p}
              </p>
            ))}
          </div>

          {/* 4 Stats Metrics Row positioned above the building wings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-2 sm:px-4 relative z-10">
            {activeStats.map((st, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div
                  className="text-[26px] sm:text-[30px] lg:text-[34px] font-black leading-tight tracking-tight"
                  style={{ color: primaryColor }}
                >
                  {st.number}
                </div>
                <div className="text-[11px] sm:text-[12px] text-slate-600 font-medium mt-0.5 leading-snug max-w-[190px]">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panoramic Campus Building Spanning the Section (1500x525 natural aspect ratio) */}
        <div className="relative w-full max-w-[1440px] 2xl:max-w-[1500px] mx-auto -mt-6 sm:-mt-10 md:-mt-14 z-0">
          <Image
            src={imageSrc}
            alt={about.title || universityName}
            width={1500}
            height={525}
            priority
            className="w-full h-auto object-contain block mx-auto"
            sizes="(max-width: 1536px) 100vw, 1500px"
          />
        </div>
      </section>
    );
  }

  const isImageRight =
    brand.aboutLayout === "imageRight" ||
    about.imagePosition === "right";
  const showApplyButton = about.showButton !== false;

  const sectionBg =
    brand.aboutBg ||
    (brand.themeGradient && brand.primaryColor === "#fd202a"
      ? "linear-gradient(to right, #fcf1f1, #ffffff)"
      : "#ffffff");

  return (
    <section id="about" className="py-10 sm:py-14 select-none" style={{ background: sectionBg }}>
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Text Column */}
          <div
            className={`lg:col-span-6 xl:col-span-6 space-y-3.5 ${isImageRight ? "order-1 lg:order-1" : "order-2 lg:order-2"
              } text-left max-w-[500px]`}
          >
            <h2
              className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight m-0 leading-[1.18]"
              style={
                brand.aboutTitleGradient || (brand.themeGradient && brand.primaryColor === "#fd202a")
                  ? {
                    background: brand.themeGradient || "linear-gradient(to right, #fd202a, #ff4be5)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                  : { color: "#111827" }
              }
            >
              {title.includes(" Online") ? (
                <>
                  {title.replace(/\s+Online$/i, "")} <br className="hidden sm:inline" />Online
                </>
              ) : (
                title
              )}
            </h2>

            <div className="space-y-2 text-[13px] sm:text-[15px] text-[#333333] leading-[1.55] max-w-[580px]">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="m-0">
                  {p}
                </p>
              ))}
            </div>

            {/* How It Works (Pay-After-Placement) Callout Box - Sharp rectangular 2px black border matching First Image */}
            {about.howItWorks && (
              <div className="border-2 border-black p-4 sm:p-4 my-4 rounded-none text-left bg-transparent max-w-[490px]">
                <h3 className="text-sm sm:text-[20px] font-bold text-[#000000] m-0 mb-0.5">
                  {about.howItWorks.title || "Here’s how it works:"}
                </h3>
                <h4 className="text-xs sm:text-[15px] font-semibold text-[#000000] m-0 mb-2">
                  {about.howItWorks.subtitle || "Pay 70% upfront and the remaining 30% after placement."}
                </h4>
                <p className="text-[11.5px] sm:text-[14.5px] text-[#4d4d4d] m-0 flex items-center gap-1.5 font-normal">
                  <User className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>{about.howItWorks.note || "Pay-After-Placement: Why Students Trust Shoolini University Online"}</span>
                </p>
              </div>
            )}

            {showApplyButton && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[4px] font-semibold text-[13px] sm:text-[14px] transition-all cursor-pointer border-2 bg-transparent hover:text-white active:scale-95 w-full sm:w-fit"
                  style={{
                    color: primaryColor,
                    borderColor: primaryColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = primaryColor;
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = primaryColor;
                  }}
                >
                  <span>{buttonText}</span>
                  <span className="text-base font-bold leading-none">→</span>
                </button>
              </div>
            )}
          </div>

          {/* Image Column - Full uncropped megaphone image matching First Image */}
          <div
            className={`lg:col-span-6 xl:col-span-6 ${isImageRight ? "order-2 lg:order-2" : "order-1 lg:order-1"
              } flex items-center justify-center`}
          >
            <div className="relative w-full max-w-[460px] mx-auto flex items-center justify-center">
              <Image
                src={imageSrc}
                alt={title}
                width={460}
                height={450}
                priority
                className="w-full h-auto object-contain max-h-[460px]"
                sizes="(max-width: 1024px) 100vw, 460px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
