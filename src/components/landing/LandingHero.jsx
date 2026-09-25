"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import LandingContainer from "./LandingContainer";
import LandingLeadForm from "./LandingLeadForm";

export default function LandingHero({
  brand = {},
  courses = [],
  onOpenBrochure,
  onOpenDisclaimer,
}) {
  const hero = brand.hero || {};
  const courseLines = brand.coursesStrip || [
    "BA | BCOM | MA",
    "| MBA | MCOM | MCA",
  ];
  const phoneText = brand.phoneDisplay || brand.phone || "+91 7065 7777 55";

  const isDarkMode = hero.darkOverlay !== false && (hero.darkOverlay || hero.theme === "dark" || brand.slug === "smu");

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden"
      style={{
        backgroundColor: hero.backgroundColor || (isDarkMode ? "#074a76" : "#f7fbfc"),
      }}
    >
      {/* Responsive Background */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center md:bg-[52%_center]"
        style={{
          backgroundImage: `url(${hero.backgroundImage || "/assets/images/smu_banner_bg.webp"})`,
        }}
      />

      {/* Overlay - Only on left side on desktop so the center student stays vibrant and clear */}
      {isDarkMode ? (
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#074a76]/90 via-[#074a76]/70 to-[#074a76]/95 lg:bg-gradient-to-r lg:from-[#074a76] lg:via-[#074a76]/85 lg:via-30% lg:to-transparent lg:w-[48%]" />
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/95 via-white/90 to-white/70 md:bg-gradient-to-r md:from-white/95 md:via-white/85 md:to-white/15" />
      )}

      <LandingContainer
        className="relative flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-4 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10"
        style={{ maxWidth: hero.contentMaxWidth || "1400px", minHeight: hero.minHeight || "500px" }}
      >
        {/* Left Column: University info & Titles */}
        <div className="relative z-10 flex w-full flex-col items-center sm:items-start text-center sm:text-left lg:w-[420px] xl:w-[460px] shrink-0 pt-1 sm:pt-2">
          {/* Hashtag */}
          <p
            className="m-0 text-[13px] sm:text-[14px] font-semibold"
            style={{ color: hero.hashtagColor || (isDarkMode ? "#ffffff" : "#111111") }}
          >
            {brand.hashtag || "#WhereAmbitionsFindTheirWings"}
          </p>

          {/* Headline */}
          <h1
            className="mt-1 mb-0 text-[32px] sm:text-[42px] lg:text-[48px] font-extrabold leading-[1.08] tracking-tight whitespace-pre-line"
            style={{
              color: hero.titleColor || (isDarkMode ? "#f78d2d" : "#08417b"),
              fontFamily: hero.headingFont || "'Poppins', sans-serif",
            }}
          >
            {brand.headline || brand.name}
          </h1>

          {/* Tagline */}
          <p
            className="mt-2.5 mb-1.5 text-[15px] sm:text-[18px] lg:text-[19px] font-semibold leading-snug"
            style={{ color: hero.taglineColor || (isDarkMode ? "#ffffff" : "#222222") }}
          >
            {brand.tagline1 || "Learn Without Limits with SMU Online"}
          </p>

          {/* Courses */}
          {hero.hideCourseBox ? (
            <h2
              className="text-[20px] sm:text-[23px] lg:text-[25px] font-extrabold tracking-tight mt-1 mb-4"
              style={{ color: hero.coursesColor || (isDarkMode ? "#ffffff" : "#08417b") }}
            >
              {courseLines.join(" ")}
            </h2>
          ) : (
            <div className="relative z-20 w-full max-w-sm sm:max-w-none sm:w-fit my-2">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 sm:left-3 sm:translate-x-0 z-10 rounded-full bg-[#ffd200] px-3 py-0.5 text-[12px] sm:text-[13px] font-bold leading-normal text-[#08417b] shadow-2xs whitespace-nowrap">
                Online Degree Courses :
              </span>
              <div
                className="rounded-[6px] border-2 bg-white/95 px-3 sm:px-4 pb-2 pt-3.5 text-[15px] sm:text-[18px] lg:text-[20px] font-bold leading-[1.25] text-[#08417b] shadow-xs text-center sm:text-left"
                style={{ borderColor: hero.courseBorder || brand.primaryColor || "#08417b" }}
              >
                {courseLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          )}

          {/* Download Brochure Button */}
          <button
            type="button"
            onClick={() => onOpenBrochure?.()}
            className="mt-3 inline-flex w-full sm:w-fit items-center justify-center gap-2 rounded-[6px] active:scale-95 px-6 py-2.5 text-[14px] sm:text-[15px] font-bold text-white transition-all shadow-md cursor-pointer border-none"
            style={{
              backgroundColor: hero.buttonBackground || (isDarkMode ? "#f78d2d" : "#08417b"),
              color: hero.buttonTextColor || "#ffffff",
            }}
          >
            <span>Download Brochure</span>
            <Download size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Center Column Spacer: Leaves the student in the background image completely open and visible */}
        <div className="hidden lg:block lg:flex-1 min-w-[120px] pointer-events-none" />

        {/* Right Column: Lead Form */}
        <div className="relative z-30 w-full max-w-full sm:max-w-[370px] lg:max-w-[360px] xl:max-w-[375px] mx-auto lg:mr-0 shrink-0">
          <LandingLeadForm
            brand={brand}
            courses={courses}
            universityName={brand.name}
            courseList={courses}
            variant={hero.formCardType === "white" ? "white-card" : "hero"}
            primaryColor={hero.formBackground || brand.primaryColor || "#08417b"}
            accentColor={brand.accentColor || "#fdb913"}
            phoneText={phoneText}
            buttonText="Submit"
            onOpenDisclaimer={onOpenDisclaimer}
          />
        </div>
      </LandingContainer>
    </section>
  );
}