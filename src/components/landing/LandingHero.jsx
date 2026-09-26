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
  const courseLines = hero.coursesStrip || brand.coursesStrip || [
    "MBA | MCA | MCOM | MA | MSC",
    "| BBA | BCA | BCOM | BA",
  ];

  return (
    <section
      id="hero"
      className={`relative isolate overflow-hidden ${hero.sectionClassName || ""}`}
      style={{
        backgroundColor: hero.sectionBg || "#001933",
        ...hero.sectionStyle,
      }}
    >
      {/* Responsive Background Images */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-top md:hidden"
        style={{
          backgroundImage: `url(${hero.mobileBackgroundImage || "/assets/amitylp/amity_new_mobile_bg.webp"})`,
          backgroundPosition: hero.mobileBackgroundPosition || "center 0%",
          ...hero.mobileBgStyle,
        }}
      />
      <div
        className="absolute inset-0 -z-20 hidden md:block"
        style={{
          backgroundImage: `url(${hero.backgroundImage || "/assets/amitylp/amity_new_desktop_bg.png"})`,
          backgroundPosition: hero.backgroundPosition || "center 0%",
          backgroundSize: hero.backgroundSize || "cover",
          backgroundRepeat: "no-repeat",
          ...hero.desktopBgStyle,
        }}
      />

      {/* Main Container: Controlled padding for optimal hero height */}
      <LandingContainer
        className={`relative flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-7 lg:py-6 max-w-[1360px] ${hero.containerClassName || ""}`}
        style={hero.containerStyle}
      >
        {/* Left Column: University info, Headings, Degree Courses */}
        <div
          className={`relative z-10 flex w-full flex-col items-center sm:items-start text-center sm:text-left lg:flex-1 lg:max-w-xl ${hero.contentClassName || ""}`}
          style={hero.contentStyle}
        >
          {/* Hashtag */}
          <p
            className={`m-0 text-[13px] sm:text-[14px] font-bold tracking-wide ${hero.hashtagClassName || ""}`}
            style={{
              color: hero.hashtagColor || (hero.isDarkTheme === false ? "#fd202a" : "#ffffff"),
              ...hero.hashtagStyle,
            }}
          >
            {hero.hashtagText || brand.hashtag || "#EmpowerToLeadTomorrow"}
          </p>

          {/* Headline */}
          <h1
            className={`mt-1 mb-1 text-[30px] sm:text-[36px] lg:text-[42px] font-extrabold leading-[1.12] ${hero.headingClassName || ""}`}
            style={{
              fontFamily: hero.headingFont || "inherit",
              color: hero.headingColor || (hero.isDarkTheme === false ? "#111827" : "#ffffff"),
              ...hero.headingStyle,
            }}
          >
            {hero.headlineText || brand.headline || brand.name}
          </h1>

          {/* Tagline */}
          <p
            className={`mt-1 mb-2 text-[16px] sm:text-[18px] lg:text-[19px] font-medium leading-snug ${hero.taglineClassName || ""}`}
            style={{
              color: hero.taglineColor || (hero.isDarkTheme === false ? "#374151" : "#ffffff"),
              ...hero.taglineStyle,
            }}
          >
            {hero.taglineText || brand.tagline1 || "Education that empowers your ambition"}
            {!hero.taglineText && brand.tagline2 ? (
              <>
                <br className="hidden sm:inline" /> {brand.tagline2}
              </>
            ) : null}
          </p>

          {/* Highlight Callout Box (e.g. Pay-After-Placement) */}
          {hero.highlightBox && (
            <div
              className={`my-2 sm:my-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-[8px] font-bold text-center leading-snug w-full sm:w-auto ${hero.highlightBox.className || ""}`}
              style={{
                background: hero.highlightBox.background || "#fd202a",
                color: hero.highlightBox.color || "#ffffff",
                ...hero.highlightBox.style,
              }}
            >
              {hero.highlightBox.lines ? (
                hero.highlightBox.lines.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))
              ) : (
                hero.highlightBox.text
              )}
            </div>
          )}

          {/* Online Degree Courses Strip */}
          <div
            className={`my-2 space-y-0.5 text-[16px] sm:text-[18px] lg:text-[19px] font-bold tracking-wide leading-snug ${hero.courseStripClassName || ""}`}
            style={{
              color: hero.courseTextColor || (hero.isDarkTheme === false ? "#111827" : "#ffffff"),
              ...hero.courseStripStyle,
            }}
          >
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
            className="mt-4 sm:mt-5 py-2.5 px-6 text-[14px] sm:text-[15px]"
            style={{
              background:
                hero.buttonGradient ||
                hero.buttonBackground ||
                "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
              ...hero.buttonStyle,
            }}
          >
            {hero.brochureButtonText || "Download Brochure"}
          </LandingButton>
        </div>

        {/* Right Column: Lead Form */}
        <div
          className={`relative z-20 w-full sm:w-[340px] lg:w-[330px] shrink-0 flex justify-center lg:justify-end lg:mr-9 ${hero.formContainerClassName || ""}`}
          style={hero.formContainerStyle}
        >
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