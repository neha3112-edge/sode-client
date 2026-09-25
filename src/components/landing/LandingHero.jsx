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
        className="absolute inset-0 -z-20 hidden md:block"
        style={{
          backgroundImage: `url(${hero.backgroundImage || "/assets/amitylp/amity_new_desktop_bg.png"})`,
          backgroundPosition: hero.backgroundPosition || "center top",
          backgroundSize: hero.backgroundSize || "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay: Skip if noOverlay is specified */}
      {!hero.noOverlay && (
        hero.isDarkTheme ? (
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#001933]/90 via-[#001933]/70 to-[#001933]/90 md:bg-gradient-to-r md:from-[#001933]/95 md:via-[#001933]/45 md:to-black/20" />
        ) : (
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/95 via-white/90 to-white/70 md:bg-gradient-to-r md:from-white/95 md:via-white/85 md:to-white/15" />
        )
      )}

      <LandingContainer
        className={`relative flex flex-col lg:flex-row items-center lg:items-center justify-between gap-6 sm:gap-8 lg:gap-8 px-4 sm:px-6 lg:px-8 ${
          hero.containerPadding || "py-4 sm:py-6 lg:py-6"
        }`}
        style={{ maxWidth: hero.contentMaxWidth || "1400px" }}
      >
        {/* Left Column: University info, Headings, Degree Courses */}
        <div className="relative z-10 flex w-full flex-col items-center sm:items-start text-center sm:text-left lg:flex-1 lg:max-w-xl pt-1 sm:pt-2">
          {/* Hashtag */}
          <p
            className={`m-0 text-[13px] sm:text-[14px] font-bold tracking-wide ${
              hero.isDarkTheme ? "text-white" : "text-[#111111]"
            }`}
          >
            {brand.hashtag || "#EmpowerToLeadTomorrow"}
          </p>

          {/* Headline */}
          <h1
            className="mt-1.5 mb-1 text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold leading-[1.12]"
            style={{
              fontFamily: hero.headingFont || "'Anton', Arial, sans-serif",
              color: hero.headingColor || (hero.isDarkTheme ? "#ffffff" : brand.primaryColor || "#08417b"),
            }}
          >
            {brand.headline || brand.name}
          </h1>

          {/* Tagline */}
          <p
            className={`mt-1 mb-5 text-[17px] sm:text-[20px] lg:text-[22px] font-medium leading-snug ${
              hero.isDarkTheme ? "text-white" : "text-[#222222]"
            }`}
          >
            {brand.tagline1 || "Education that empowers your ambition"}
            {brand.tagline2 ? (
              <>
                <br className="hidden sm:inline" /> {brand.tagline2}
              </>
            ) : null}
          </p>

          {/* Online Degree Courses: Plain clean text matching user screenshot */}
          {hero.showCourseBox ? (
            <div className="relative z-20 w-full max-w-sm sm:max-w-none sm:w-fit my-1.5">
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 sm:left-3 sm:translate-x-0 z-10 rounded-full px-3 py-0.5 text-[12px] sm:text-[13px] font-bold leading-normal shadow-2xs whitespace-nowrap"
                style={{
                  backgroundColor: brand.accentColor || "#ffd200",
                  color: brand.primaryColor || "#08417b",
                }}
              >
                Online Degree Courses :
              </span>
              <div
                className="rounded-[6px] border-2 bg-white/95 px-3 sm:px-4 pb-2 pt-3.5 text-[15px] sm:text-[18px] lg:text-[20px] font-bold leading-[1.25] shadow-xs text-center sm:text-left"
                style={{
                  borderColor: hero.courseBorder || brand.primaryColor || "#08417b",
                  color: hero.courseTextColor || brand.primaryColor || "#08417b",
                }}
              >
                {courseLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          ) : (
            <div className="my-2 space-y-1 text-white text-[17px] sm:text-[19px] lg:text-[21px] font-bold tracking-wide leading-relaxed">
              {courseLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          )}

          {/* Download Brochure Button */}
          <button
            type="button"
            onClick={() => onOpenBrochure?.()}
            className="mt-6 inline-flex w-full sm:w-fit items-center justify-center gap-2 rounded-[6px] active:scale-95 px-6 py-2.5 text-[14px] sm:text-[15px] font-bold text-white transition-all shadow-md cursor-pointer border-none"
            style={{
              background: hero.buttonGradient || hero.buttonBackground || "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
            }}
          >
            <span>Download Brochure</span>
            <Download size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Right Column: Lead Form */}
        <div className="relative z-20 w-full sm:w-[360px] lg:w-[370px] shrink-0 flex justify-center lg:justify-end">
          <LandingLeadForm
            brand={brand}
            courses={courses}
            courseList={courses}
            universityName={brand.name}
            variant="card"
            title={brand.enquireTitle || "Enquire Now"}
            subtitle={brand.enquireSubtitle || "Take a step towards your success today"}
            buttonText={hero.buttonText || "Submit"}
            phoneText={brand.phoneDisplay || brand.phone}
            phoneHref={brand.phone}
            showPhoneBadge={true}
            onOpenDisclaimer={onOpenDisclaimer}
          />
        </div>
      </LandingContainer>
    </section>
  );
}