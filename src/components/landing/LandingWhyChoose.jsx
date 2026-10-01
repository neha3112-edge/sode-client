"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel } from "antd";
import LandingContainer from "./LandingContainer";

/**
 * Reusable Landing Why Choose / Key Features Component
 * Supports:
 * 1. VGU Centered Maroon Badge & 3x2 Icon Grid (vgu-grid / vgu)
 * 2. Shoolini Checkerboard Grid (checkerboard)
 * 3. SMU 3-Card Carousel with elevated center card (smu-advantages / smu)
 * 4. Manipal Key Features Slider (slider)
 * 5. Classic 2-Column Grid with Student Photo (Amity, etc.)
 */
export default function LandingWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  if (!whyChoose || whyChoose.length === 0) return null;

  const universityName = brand.name || "University Online";
  const studentImg = brand.whyChooseStudentImage || "/assets/amitylp/Why-choose-amity.png";
  const isLiverpoolLayout =
    brand.whyChooseLayout === "liverpool" || brand.slug === "liverpool";
  const isRushfordLayout =
    !isLiverpoolLayout &&
    (brand.whyChooseLayout === "rushford" || brand.slug === "rushford");
  const isEsgciLayout = !isLiverpoolLayout && !isRushfordLayout && (brand.whyChooseLayout === "esgci" || brand.slug === "esgci");
  const isGguLayout = !isLiverpoolLayout && !isRushfordLayout && !isEsgciLayout && (brand.whyChooseLayout === "ggu" || brand.slug === "ggu");
  const isMuLayout = !isLiverpoolLayout && !isRushfordLayout && !isEsgciLayout && !isGguLayout && (brand.whyChooseLayout === "mu" || brand.whyChooseLayout === "mu-cards" || brand.slug === "mu");
  const isVguLayout = !isLiverpoolLayout && !isRushfordLayout && !isEsgciLayout && !isMuLayout && !isGguLayout && (brand.whyChooseLayout === "vgu-grid" || brand.slug === "vgu");
  const isCheckerboard = !isLiverpoolLayout && !isRushfordLayout && !isEsgciLayout && !isGguLayout && brand.whyChooseLayout === "checkerboard";
  const isSmuLayout = !isLiverpoolLayout && !isRushfordLayout && !isEsgciLayout && !isGguLayout && (brand.whyChooseLayout === "smu-advantages" || brand.slug === "smu");
  const isSlider = !isLiverpoolLayout && !isRushfordLayout && !isEsgciLayout && !isGguLayout && brand.whyChooseLayout === "slider";

  // ==========================================
  // Layout 0-Liverpool: What Makes Liverpool Stand Out (#why-choose)
  // ==========================================
  if (isLiverpoolLayout) {
    const leftCards = whyChoose.slice(0, 3);
    const rightCards = whyChoose.slice(3, 6);
    const heading = brand.whyChooseTitle || "What Makes";
    const subHeading = brand.whyChooseSubtitle || "Liverpool Business School MBA Stand Out?";

    return (
      <section
        id="why-choose"
        className="mba-offer-section w-full select-none py-14 sm:py-18 relative bg-cover bg-center scroll-mt-20 text-white"
        style={{
          backgroundImage: `url(${brand.whyChooseBgImage || "/assets/all_universities_images/liverpool/MID.webp"})`,
        }}
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <h2 className="text-[26px] sm:text-[34px] font-bold text-center mb-10 sm:mb-14 leading-snug m-0">
            {heading} <br />
            <span className="text-[#2de1c2]">{subHeading}</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Cards */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {leftCards.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-white text-black rounded-[12px] p-5 sm:p-6 flex items-center gap-4 shadow-md border border-slate-100"
                >
                  <span className="text-[26px] text-[#1bc9a4] shrink-0">{c.icon || "🎓"}</span>
                  <p className="text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug m-0">
                    {c.title || c.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Center Image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-[320px] h-[340px] sm:h-[400px]">
                <Image
                  src={brand.whyChooseCenterImage || "/assets/all_universities_images/liverpool/MID-2.webp"}
                  alt="Liverpool MBA Stand Out"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Right Cards */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {rightCards.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-white text-black rounded-[12px] p-5 sm:p-6 flex items-center gap-4 shadow-md border border-slate-100"
                >
                  <span className="text-[26px] text-[#1bc9a4] shrink-0">{c.icon || "💼"}</span>
                  <p className="text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug m-0">
                    {c.title || c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0-Rushford: Endless Benefits (#benefits)
  // ==========================================
  if (isRushfordLayout) {
    const title = brand.whyChooseTitle || "Endless Benefits of the online DBA program";
    const subtitle = brand.whyChooseSubtitle || "at Rushford Business School";
    const leftImage = brand.whyChooseImage || "/assets/all_universities_images/rushford/whychosse.webp";

    return (
      <section
        id="benefits"
        data-section="whychoose"
        className="benefits-section w-full bg-white select-none py-12 sm:py-16 scroll-mt-20"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full aspect-[4/3] rounded-[8px] overflow-hidden">
                <Image
                  src={leftImage}
                  alt="Rushford Benefits"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7">
              <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#111111] m-0 mb-1">
                {title}
              </h2>
              <p className="text-[20px] sm:text-[24px] text-[#17479e] font-semibold mt-1 mb-6">
                {subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {whyChoose.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="relative w-12 h-12 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h3 className="text-[15px] sm:text-[16px] font-bold text-[#111111] m-0 mb-1 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[13px] text-[#555555] leading-relaxed m-0">
                        {item.desc || item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-black hover:bg-neutral-900 text-white font-bold text-[14.5px] sm:text-[15px] rounded-[5px] transition-all border-none cursor-pointer shadow-md active:scale-95"
              >
                <span>Enroll &amp; Get Your DBA Degree</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0-ESGCI: Professional Advantages (#benefits)
  // ==========================================
  if (isEsgciLayout) {
    const title = brand.whyChooseTitle || "Professional Advantages of";
    const subtitle = brand.whyChooseSubtitle || "Completing the ESGCI Online DBA";

    return (
      <section
        id="benefits"
        data-section="whychoose"
        className="benefits-section w-full bg-[#04903c] text-white select-none py-12 sm:py-16 scroll-mt-20"
        style={{ backgroundColor: brand.whyChooseBg || "#04903c" }}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-white mb-1 tracking-tight">
            {title}
          </h2>
          <p className="text-[18px] sm:text-[22px] lg:text-[25px] text-white font-medium mb-10 leading-snug">
            {subtitle}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 mb-10">
            {whyChoose.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3 transition-transform group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <h3 className="text-[13px] sm:text-[14px] lg:text-[14.5px] font-bold text-white leading-snug m-0">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onOpenApply?.()}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black hover:bg-neutral-900 text-white font-bold text-[14.5px] sm:text-[15.5px] rounded-[5px] transition-all border-none cursor-pointer shadow-md active:scale-95"
          >
            <span>Enroll &amp; Get Your DBA Degree</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0-GGU: Golden Gate University Learning Outcomes (#benefits)
  // ==========================================
  if (isGguLayout) {
    const title = brand.whyChooseTitle || "LEARNING OUTCOMES";
    const subtitle = brand.whyChooseSubtitle || "After a DBA at GGU";

    return (
      <section
        id="benefits"
        data-section="whychoose"
        className="benefits-section w-full bg-[#003468] text-white select-none overflow-hidden scroll-mt-20"
        style={{ backgroundColor: brand.whyChooseBg || "#003468" }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px] lg:min-h-[520px]">
          {/* Left: Full-Bleed Bridge Image */}
          <div className="lg:col-span-4 xl:col-span-4 relative w-full h-[320px] sm:h-[400px] lg:h-full min-h-[350px] lg:min-h-[520px] bg-slate-900 overflow-hidden">
            <Image
              src={brand.benefitsImage || "/assets/all_universities_images/ggu/learning-outcome-01.webp"}
              alt="Golden Gate Bridge"
              fill
              priority
              className="object-cover object-left"
              sizes="(max-width: 1024px) 100vw, 35vw"
            />
          </div>

          {/* Right: Content & 2-Column Grid */}
          <div className="lg:col-span-8 xl:col-span-8 bg-[#003468] flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-14 xl:px-20 py-12 sm:py-14 lg:py-16 text-white text-left">
            <h2 className="text-white text-[24px] sm:text-[28px] lg:text-[32px] font-extrabold uppercase m-0 leading-tight tracking-tight">
              {title}
            </h2>
            <p className="text-white/95 text-[15px] sm:text-[17px] font-semibold mt-1 mb-8 sm:mb-10 m-0">
              {subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-16 xl:gap-x-24 gap-y-7 sm:gap-y-9 max-w-5xl">
              {whyChoose.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 sm:gap-4 group">
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 transition-transform group-hover:scale-105">
                    <Image
                      src={item.image || "/assets/all_universities_images/ggu/learning-outcone-icon.webp"}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-[14.5px] sm:text-[15.5px] font-bold m-0 leading-tight tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-[11.5px] sm:text-[12.5px] mt-1 m-0 leading-snug font-normal whitespace-normal">
                      {item.desc || item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0: Mangalayatan University (MU) Cards
  // ==========================================
  if (isMuLayout) {
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
                  {showDesc && item.desc && (
                    <p
                      className={
                        brand.whyChooseItemDescClassName ||
                        "text-[11.5px] sm:text-[12px] text-slate-600 leading-tight mt-1 m-0"
                      }
                    >
                      {item.desc}
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

  // ==========================================
  // Layout 1: VGU Centered Badge & 3-Column Icons Grid
  // ==========================================
  if (isVguLayout) {
    return (
      <section id="Resources" className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <LandingContainer>
          <div className="flex justify-center mb-5">
            <div className="bg-[#811811] text-white px-7 sm:px-9 py-3 sm:py-3.5 rounded-[10px] text-center shadow-xs max-w-xl">
              <h2 className="text-[18px] sm:text-[21px] md:text-[22px] font-bold text-white tracking-tight leading-snug m-0">
                Why Vivekananda Global University Online is a<br className="hidden sm:inline" />
                {" "}Smart Choice for learners?
              </h2>
            </div>
          </div>

          {brand.whyChooseDescription && (
            <p className="text-center text-[12.5px] sm:text-[13.5px] text-slate-600 leading-relaxed max-w-4xl mx-auto mb-10 sm:mb-14 font-normal">
              {brand.whyChooseDescription}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-10 sm:gap-y-12 max-w-5xl mx-auto">
            {whyChoose.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group px-2">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-3.5 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    sizes="64px"
                  />
                </div>

                <h3 className="text-[16px] sm:text-[17px] font-bold text-slate-900 m-0 tracking-tight leading-snug mb-1.5">
                  {item.title}
                </h3>

                <p className="text-[12px] sm:text-[12.5px] text-slate-600 leading-relaxed font-normal m-0 max-w-[320px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </LandingContainer>
      </section>
    );
  }

  // ==========================================
  // Layout 2: Shoolini Checkerboard Grid
  // ==========================================
  if (isCheckerboard) {
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
                    backgroundColor: isRed ? (brand.accentColor || "#fd2954") : (brand.hero?.sectionBg || "#fff8f2"),
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

  // ==========================================
  // Layout 3: SMU 3-Card Carousel
  // ==========================================
  if (isSmuLayout) {
    return <SmuWhyChooseCarousel whyChoose={whyChoose} brand={brand} />;
  }

  // ==========================================
  // Layout 4 & 5: Slider or Classic 2-Column
  // ==========================================
  if (isSlider) {
    return <SliderWhyChoose whyChoose={whyChoose} brand={brand} />;
  }

  // Classic Fallback
  return (
    <section id="whychoose" className="py-8 sm:py-12 bg-white">
      <LandingContainer>
        <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-slate-900 tracking-tight m-0 text-center sm:text-left mb-6 sm:mb-8">
          {brand.whyChooseTitle || `Why Choose ${universityName} for Degree Courses`}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6">
              {whyChoose.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3 text-left">
                  {pt.image && (
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-lg p-1 bg-amber-50/50">
                      <Image
                        src={pt.image}
                        alt={pt.title}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <h3
                      className="text-[14.5px] sm:text-[15.5px] font-bold tracking-tight m-0"
                      style={{ color: brand.primaryColor || "#084183" }}
                    >
                      {pt.title}
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-gray-600 leading-relaxed font-normal m-0 max-w-sm">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 text-center sm:text-left">
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="inline-flex items-center justify-center gap-1.5 font-bold text-[14px] px-6 py-2.5 rounded-md shadow-2xs transition-colors cursor-pointer border-none w-full sm:w-fit active:scale-95 hover:opacity-95"
                style={{
                  background: brand.accentColor || "#ffc107",
                  color: brand.primaryColor || "#08417b",
                }}
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[240px] sm:max-w-[300px] h-[240px] sm:h-[300px]">
              <Image
                src={studentImg}
                alt={`Why choose ${universityName}`}
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 260px, 340px"
                priority
              />
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}

// Subcomponent: SMU Advantages Carousel
function SmuWhyChooseCarousel({ whyChoose, brand }) {
  const carouselRef = useRef(null);
  const total = whyChoose.length;

  const sectionTitle =
    brand.whyChooseTitle ||
    `Advantages of ${brand.name || "Sikkim Manipal University Online"}`;

  return (
    <section
      id="whychoose"
      className="w-full py-10 sm:py-14 lg:py-16 bg-white overflow-hidden relative select-none"
    >
      <div className="text-center mb-8 sm:mb-10 px-4 max-w-4xl mx-auto">
        <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#212529] m-0 tracking-tight leading-tight">
          {sectionTitle}
        </h2>
      </div>

      <div className="w-full max-w-[1140px] xl:max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 relative">
        <button
          type="button"
          onClick={() => carouselRef.current?.prev()}
          aria-label="Previous advantage"
          className="absolute -left-1 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 text-[#212529] hover:text-black transition-all cursor-pointer p-2 border-none bg-transparent flex items-center justify-center active:scale-90"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
        </button>

        <div className="w-full overflow-hidden py-5">
          <Carousel
            ref={carouselRef}
            slidesToShow={3}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={3500}
            infinite={total > 3}
            dots={false}
            arrows={false}
            pauseOnHover
            draggable
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  infinite: total > 2,
                },
              },
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: total > 1,
                },
              },
            ]}
          >
            {whyChoose.map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                className="px-2.5 sm:px-3 box-border outline-none py-2"
              >
                <div className="bg-white rounded-[8px] sm:rounded-[10px] overflow-hidden transition-all duration-300 flex flex-col text-center border border-slate-100 shadow-[0px_6px_22px_rgba(0,0,0,0.08)] hover:shadow-[0px_10px_30px_rgba(0,0,0,0.12)] h-full">
                  <div className="relative w-full h-44 sm:h-48 md:h-[195px] overflow-hidden bg-slate-100">
                    <Image
                      src={item.image || "/assets/images/smu_advantage_legacy.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="bg-[#074a76] text-white flex items-center justify-center py-3.5 px-3">
                    <h3 className="font-bold text-white m-0 tracking-tight leading-snug text-[15px] sm:text-[16px]">
                      {item.title}
                    </h3>
                  </div>

                  <div className="bg-white flex items-center justify-center p-4 sm:p-5">
                    <p className="text-[12.5px] sm:text-[13px] text-[#555555] leading-relaxed m-0 font-normal min-h-[58px] sm:min-h-[64px] flex items-center justify-center">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <button
          type="button"
          onClick={() => carouselRef.current?.next()}
          aria-label="Next advantage"
          className="absolute -right-1 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 text-[#212529] hover:text-black transition-all cursor-pointer p-2 border-none bg-transparent flex items-center justify-center active:scale-90"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
        </button>
      </div>
    </section>
  );
}

// Subcomponent: Manipal Key Features Slider
function SliderWhyChoose({ whyChoose, brand }) {
  const prefix = brand.whyChoosePrefix || "Key Features of";
  const highlight = brand.whyChooseHighlight || brand.name || "University Online";
  const subtitle = brand.whyChooseSubtitle || null;
  const sectionBg = brand?.whyChooseBg || "#fdf8f4";
  const primaryColor = brand?.primaryColor || "#ee3024";

  const carouselRef = useRef(null);
  const items = whyChoose;

  return (
    <section
      id="advantage"
      className="py-8 sm:py-10 md:py-11 select-none"
      style={{ backgroundColor: sectionBg }}
    >
      <LandingContainer>
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
          <h2 className="text-2xl sm:text-[28px] md:text-[32px] font-bold tracking-tight m-0 text-center leading-tight">
            <span style={{ color: primaryColor }}>{prefix} </span>
            <span className="text-[#192f59] font-bold">{highlight}</span>
          </h2>
          {subtitle && (
            <p className="mt-2 text-[13px] sm:text-[14px] text-slate-700 leading-normal font-normal m-0 text-center max-w-4xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8">
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            aria-label="Previous Feature"
            className="absolute -left-2 sm:-left-4 top-[28%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            aria-label="Next Feature"
            className="absolute -right-2 sm:-right-4 top-[28%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>

          <div className="overflow-hidden w-full select-none">
            <Carousel
              ref={carouselRef}
              slidesToShow={4}
              slidesToScroll={1}
              autoplay
              autoplaySpeed={2800}
              infinite={items.length > 4}
              dots={false}
              arrows={false}
              pauseOnHover
              draggable
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: items.length > 2,
                  },
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: items.length > 1,
                  },
                },
              ]}
            >
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="px-2 sm:px-3 outline-none"
                >
                  <div className="flex flex-col items-center text-center">
                    {item.image && (
                      <div className="relative w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] mb-2 sm:mb-2.5 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain"
                          sizes="80px"
                        />
                      </div>
                    )}

                    <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#111827] m-0 mb-1 leading-snug text-center">
                      {item.title}
                    </h3>

                    <p className="text-[12px] sm:text-[12.5px] text-slate-700 leading-[1.4] font-normal m-0 text-center max-w-[225px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
