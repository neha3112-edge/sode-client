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
    "MBA | MCA | MCOM | MA | MSC",
    "| BBA | BCA | BCOM | BA",
  ];
  const phoneText = brand.phoneDisplay || brand.phone || "+91 7065 7777 55";

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[#f7fbfc]"
    >
      {/* Responsive Background: Mobile bg on < 768px, Desktop bg on >= 768px */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-top md:hidden"
        style={{
          backgroundImage: `url(${hero.mobileBackgroundImage || "/assets/amitylp/amity_new_mobile_bg.webp"})`,
        }}
      />
      <div
        className="absolute inset-0 -z-20 hidden md:block bg-cover bg-right"
        style={{
          backgroundImage: `url(${hero.backgroundImage || "/assets/amitylp/amity_new_desktop_bg.png"})`,
        }}
      />

      {/* Soft gradient overlay on mobile & desktop so text remains razor-sharp */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/95 via-white/90 to-white/70 md:bg-gradient-to-r md:from-white/95 md:via-white/85 md:to-white/15" />

      <LandingContainer
        className="relative flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10"
        style={{ maxWidth: hero.contentMaxWidth || "1400px" }}
      >
        {/* Left Column: University info, Headings, Degree Courses box */}
        <div className="relative z-10 flex w-full flex-col items-center sm:items-start text-center sm:text-left lg:flex-1 lg:max-w-none pt-1 sm:pt-2">
          {/* University Logo */}
          {(brand.logo || hero.logo) && (
            <div className="mb-2">
              <Image
                src={brand.logo || hero.logo || "/assets/amitylp/Amity-online-logo.png"}
                alt={brand.name || "University Logo"}
                width={175}
                height={48}
                style={{ width: "auto", height: "auto", maxHeight: "44px" }}
                className="w-auto h-9 sm:h-11 object-contain"
                priority
              />
            </div>
          )}

          {/* Hashtag */}
          <p className="m-0 text-[13px] sm:text-[14px] font-semibold text-[#111111]">
            {brand.hashtag || "#YourFutureBeginsHere"}
          </p>

          {/* Headline */}
          <h1
            className="mt-1 mb-0 text-[24px] sm:text-[32px] lg:text-[38px] font-extrabold leading-[1.12] text-[#08417b]"
            style={{ fontFamily: hero.headingFont || "Arial Narrow, Arial, sans-serif" }}
          >
            {brand.headline || brand.name}
          </h1>

          {/* Tagline */}
          <p className="mt-1.5 mb-4 text-[15px] sm:text-[17px] lg:text-[19px] leading-snug text-[#222222]">
            {brand.tagline1 || "Learn from Anywhere,"} <br className="hidden sm:inline" />
            {brand.tagline2 || "Grow Everywhere"}
          </p>

          {/* Online Degree Courses Box */}
          <div className="relative z-20 w-full max-w-sm sm:max-w-none sm:w-fit my-1.5">
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

          {/* Solid Blue Download Brochure Button */}
          <button
            type="button"
            onClick={() => onOpenBrochure?.()}
            className="mt-4 inline-flex w-full sm:w-fit items-center justify-center gap-2 rounded-[6px] bg-[#08417b] hover:bg-[#063366] active:scale-95 px-6 py-2.5 text-[14px] sm:text-[15px] font-semibold text-white transition-all shadow-xs cursor-pointer border-none"
          >
            <span>Download Brochure</span>
            <Download size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Right Column: Lead Form */}
        <div className="relative z-30 w-full max-w-full sm:max-w-[420px] lg:max-w-[460px] mx-auto lg:mr-0 shrink-0">
          <LandingLeadForm
            brand={brand}
            courses={courses}
            universityName={brand.name}
            courseList={courses}
            variant="hero"
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