"use client";

import React from "react";
import { Download } from "lucide-react";
import LandingContainer from "./LandingContainer";
import LandingLeadForm from "./LandingLeadForm";
import LandingButton from "./LandingButton";

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

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[#001933]"
    >
      {/* Responsive Background Images */}
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
          backgroundPosition: "center 0%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Main Container: Controlled padding for optimal hero height */}
      <LandingContainer className="relative flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-7 lg:py-4 max-w-[1360px]">
        {/* Left Column: University info, Headings, Degree Courses */}
        <div className="relative z-10 flex w-full flex-col items-center sm:items-start text-center sm:text-left lg:flex-1 lg:max-w-xl">
          {/* Hashtag */}
          <p className="m-0 text-[12.5px] sm:text-[13.5px] font-bold tracking-wide text-white">
            {brand.hashtag || "#EmpowerToLeadTomorrow"}
          </p>

          {/* Headline */}
          <h1
            className="mt-1 mb-1 text-[28px] sm:text-[34px] lg:text-[40px] font-extrabold leading-[1.12] text-white"
            style={{
              fontFamily: hero.headingFont || "inherit",
            }}
          >
            {brand.headline || brand.name}
          </h1>

          {/* Tagline */}
          <p className="mt-1.5 mb-3 text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-snug text-white">
            {brand.tagline1 || "Education that empowers your ambition"}
            {brand.tagline2 ? (
              <>
                <br className="hidden sm:inline" /> {brand.tagline2}
              </>
            ) : null}
          </p>

          {/* Online Degree Courses Strip */}
          <div className="my-2 space-y-0.5 text-white text-[16px] sm:text-[18px] lg:text-[20px] font-bold tracking-wide leading-snug">
            {courseLines.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>

          {/* Download Brochure Button (Reusable LandingButton) */}
          <LandingButton
            variant="brochure"
            icon={<Download size={15} strokeWidth={2.5} />}
            iconPosition="right"
            onClick={() => onOpenBrochure?.()}
            className="mt-4 sm:mt-6 py-2.5 px-6 text-[14px] sm:text-[15px]"
            style={{
              background:
                hero.buttonGradient ||
                hero.buttonBackground ||
                "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
            }}
          >
            Download Brochure
          </LandingButton>
        </div>

        {/* Right Column: Lead Form */}
        <div className="relative z-20 w-full sm:w-[340px] lg:w-[330px] shrink-0 flex justify-center lg:justify-end lg:mr-9">
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