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
      style={{
        minHeight: hero.minHeight || "480px",
        backgroundImage: `url(${hero.backgroundImage || "/assets/amitylp/amity_new_desktop_bg.png"})`,
        backgroundPosition: "center right",
        backgroundSize: "cover",
      }}
    >
      {/* Soft gradient overlay on the left so text is crisp and campus building shows through on the right */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/95 via-white/85 to-white/15" />

      <LandingContainer
        className="relative flex min-h-[480px] items-stretch justify-between gap-6 px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: hero.contentMaxWidth || "1400px", padding: hero.contentPadding || "30px 16px 26px" }}
      >
        <div className="relative z-10 flex w-full flex-col justify-center pt-2 sm:pt-0 lg:flex-1 lg:max-w-none">
          {/* University Logo matching Image 1 */}
          {(brand.logo || hero.logo) && (
            <div className="mb-2">
              <Image
                src={brand.logo || hero.logo || "/assets/amitylp/Amity-online-logo.png"}
                alt={brand.name || "University Logo"}
                width={175}
                height={48}
                style={{ width: "auto", height: "auto", maxHeight: "48px" }}
                className="w-auto h-10 sm:h-12 object-contain"
                priority
              />
            </div>
          )}

          {/* Hashtag */}
          <p className="m-0 text-[14px] sm:text-[15px] font-semibold text-[#111111]">
            {brand.hashtag || "#YourFutureBeginsHere"}
          </p>

          {/* Headline */}
          <h1
            className="mt-1 mb-0 text-[30px] font-extrabold leading-[1.08] text-[#08417b] sm:text-[38px]"
            style={{ fontFamily: hero.headingFont || "Arial Narrow, Arial, sans-serif" }}
          >
            {brand.headline || brand.name}
          </h1>

          {/* Tagline */}
          <p className="mt-1.5 mb-5 text-[17px] leading-snug text-[#222222] sm:text-[19px]">
            {brand.tagline1 || "Learn from Anywhere,"} <br className="hidden sm:inline" />
            {brand.tagline2 || "Grow Everywhere"}
          </p>

          {/* Online Degree Courses Box */}
          <div className="relative z-20 w-fit max-w-full my-1">
            <span className="absolute -top-3.5 left-2 z-10 rounded-full bg-[#ffd200] px-3 py-0.5 text-[13px] sm:text-[14px] font-bold leading-normal text-[#08417b] shadow-2xs">
              Online Degree Courses :
            </span>
            <div
              className="rounded-[4px] border-2 bg-white/95 px-3 pb-2 pt-3 text-[18px] font-bold leading-[1.2] text-[#08417b] sm:px-4 sm:text-[20px] shadow-xs"
              style={{ borderColor: hero.courseBorder || brand.primaryColor || "#08417b" }}
            >
              {courseLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>

          {/* Solid Blue Download Brochure Button matching Image 1 */}
          <button
            type="button"
            onClick={() => onOpenBrochure?.()}
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-[4px] bg-[#08417b] hover:bg-[#063366] active:scale-95 px-5 py-2.5 text-[15px] font-semibold text-white transition-all shadow-xs cursor-pointer border-none"
          >
            <span>Download Brochure</span>
            <Download size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Lead Form on the right */}
        <div
          className="relative z-30 w-full self-center lg:self-start flex justify-center lg:justify-end shrink-0 lg:ml-auto"
          style={{ width: hero.formWidth || "550px", maxWidth: hero.formWidth || "550px" }}
        >
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