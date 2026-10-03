"use client";

import React from "react";
import Image from "next/image";
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
  const hasCoursesStrip =
    hero.hideCourses !== true &&
    hero.coursesStrip !== false &&
    Boolean(hero.coursesStrip || brand.coursesStrip);
  const courseLines = hero.coursesStrip || brand.coursesStrip || [];

  const isDarkMode =
    hero.darkOverlay !== false &&
    (hero.darkOverlay || hero.theme === "dark" || brand.slug === "smu");

  const phoneText = brand.phoneDisplay || brand.phone || "1800 202 2424";

  return (
    <section
      id="hero"
      className={`relative isolate overflow-hidden ${hero.sectionClassName || ""}`}
      style={{
        backgroundColor:
          hero.backgroundColor ||
          hero.sectionBg ||
          (isDarkMode ? "#074a76" : "#f7fbfc"),
        ...hero.sectionStyle,
      }}
    >
      {/* Mobile Background */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center md:hidden"
        style={{
          backgroundImage: `url(${hero.mobileBackgroundImage ||
            hero.backgroundImage ||
            "/assets/images/smu_banner_bg.webp"
            })`,
          backgroundPosition: hero.mobileBackgroundPosition || "center 0%",
          ...hero.mobileBgStyle,
        }}
      />

      {/* Desktop Background */}
      <div
        className="absolute inset-0 -z-20 hidden md:block bg-cover bg-center"
        style={{
          backgroundImage: `url(${hero.backgroundImage || "/assets/images/smu_banner_bg.webp"
            })`,
          backgroundPosition: hero.backgroundPosition || "center top",
          backgroundSize: hero.backgroundSize || "cover",
          backgroundRepeat: "no-repeat",
          ...hero.desktopBgStyle,
        }}
      />

      {/* Overlay - Only on left side on desktop so the center student stays vibrant and clear */}
      {!hero.noOverlay && (
        isDarkMode ? (
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#074a76]/90 via-[#074a76]/70 to-[#074a76]/95 lg:bg-gradient-to-r lg:from-[#074a76] lg:via-[#074a76]/85 lg:via-30% lg:to-transparent lg:w-[48%]" />
        ) : (
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/95 via-white/90 to-white/70 md:bg-gradient-to-r md:from-white/95 md:via-white/85 md:to-white/15" />
        )
      )}

      {/* Main Container */}
      <LandingContainer
        className={`relative flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-7 lg:py-6 max-w-[1360px] ${
          hero.containerClassName || ""
        }`}
        style={{
          minHeight: hero.minHeight || "500px",
          ...hero.containerStyle,
        }}
      >
        {/* Left Column: University info, Headings, Degree Courses */}
        <div
          className={`relative z-10 flex w-full flex-col items-center sm:items-start text-center sm:text-left lg:flex-1 lg:max-w-xl ${
            hero.contentClassName || ""
          }`}
          style={hero.contentStyle}
        >
          {/* Welcome Text block */}
          {hero.welcomeText && (
            <div className={`mb-1 text-center sm:text-left ${hero.welcomeContainerClassName || ""}`}>
              <span
                className={
                  hero.welcomeBadgeClassName ||
                  "inline-block bg-white text-[#f97316] font-semibold text-[15.5px] sm:text-[16px] px-8 py-2 min-w-[210px] text-center rounded-[7px] shadow-sm mb-2 select-none"
                }
                style={hero.welcomeTextStyle}
              >
                {hero.welcomeText}
              </span>
              {hero.welcomeSubtext && (
                <span
                  className={
                    hero.welcomeSubtextClassName ||
                    "text-[15.5px] sm:text-[17px] text-white/95 font-normal block mb-1"
                  }
                  style={hero.welcomeSubtextStyle}
                >
                  {hero.welcomeSubtext}
                </span>
              )}
            </div>
          )}

          {/* Hashtag */}
          {(hero.hashtagText || brand.hashtag) && (
            <p
              className={`m-0 text-[13px] sm:text-[14px] font-bold tracking-wide ${
                hero.hashtagClassName || ""
              }`}
              style={{
                color:
                  hero.hashtagColor ||
                  (hero.isDarkTheme === false
                    ? "#fd202a"
                    : isDarkMode
                    ? "#ffffff"
                    : "#111111"),
                ...hero.hashtagStyle,
              }}
            >
              {hero.hashtagText || brand.hashtag}
            </p>
          )}

          {/* Headline */}
          {/* Headline */}
          <h1
            className={`whitespace-pre-line ${
              hero.headingClassName ||
              "mt-1 mb-1 text-[30px] sm:text-[36px] lg:text-[42px] font-extrabold leading-[1.12] tracking-tight"
            }`}
            style={{
              fontFamily: hero.headingFont || "inherit",
              color:
                hero.headingColor ||
                hero.titleColor ||
                (hero.isDarkTheme === false
                  ? "#111827"
                  : isDarkMode
                  ? "#f78d2d"
                  : "#08417b"),
              ...hero.headingStyle,
            }}
          >
            {hero.highlightTitle ? (
              <>
                <span
                  className={hero.highlightTitleClassName || ""}
                  style={{
                    color: hero.highlightTitleColor || "#f97316",
                    fontFamily: hero.headingFont || "inherit",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    lineHeight: "inherit",
                    letterSpacing: "inherit",
                    ...hero.highlightTitleStyle,
                  }}
                >
                  {hero.highlightTitle}
                </span>
                <br />
                <span
                  className={hero.headlineTextClassName || ""}
                  style={{
                    color: hero.headlineColor || "#ffffff",
                    fontFamily: hero.headingFont || "inherit",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    lineHeight: "inherit",
                    letterSpacing: "inherit",
                    ...hero.headlineTextStyle,
                  }}
                >
                  {hero.headlineText || brand.headline || brand.name}
                </span>
              </>
            ) : (
              hero.headlineText || brand.headline || brand.name
            )}
          </h1>

          {/* Tagline */}
          <p
            className={`${
              hero.taglineClassName ||
              "mt-1 mb-2 text-[15px] sm:text-[17px] lg:text-[18px] font-medium leading-snug max-w-[480px]"
            }`}
            style={{
              color:
                hero.taglineColor ||
                (hero.isDarkTheme === false
                  ? "#374151"
                  : isDarkMode
                  ? "#ffffff"
                  : "#222222"),
              ...hero.taglineStyle,
            }}
          >
            {hero.taglineText ||
              brand.tagline1 ||
              "Education that empowers your ambition"}
            {!hero.taglineText && brand.tagline2 ? (
              <>
                <br className="hidden sm:inline" /> {brand.tagline2}
              </>
            ) : null}
          </p>

          {/* Highlight Callout Box (e.g. Pay-After-Placement) */}
          {hero.highlightBox && (
            <div
              className={`my-2 sm:my-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-[8px] font-bold text-center leading-snug w-full sm:w-auto ${hero.highlightBox.className || ""
                }`}
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

          {/* Online Degree Courses Strip or Course Box */}
          {!hasCoursesStrip || hero.hideCourses || hero.coursesStrip === false ? null : hero.hideCourseBox ? (
            <div
              className={`my-2 space-y-0.5 text-[13.5px] sm:text-[14px] font-medium tracking-normal leading-[1.5] ${hero.courseStripClassName || ""
                }`}
              style={{
                color:
                  hero.coursesColor ||
                  hero.courseTextColor ||
                  (hero.isDarkTheme === false
                    ? "#111827"
                    : isDarkMode
                      ? "#ffffff"
                      : "#08417b"),
                ...hero.courseStripStyle,
              }}
            >
              {courseLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          ) : hero.coursesStripOnly ? (
            <div
              className={`my-2 space-y-0.5 text-[16px] sm:text-[18px] lg:text-[19px] font-bold tracking-wide leading-snug ${hero.courseStripClassName || ""
                }`}
              style={{
                color:
                  hero.courseTextColor ||
                  (hero.isDarkTheme === false ? "#111827" : "#ffffff"),
                ...hero.courseStripStyle,
              }}
            >
              {courseLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          ) : (
            <div className="relative z-20 w-full max-w-sm sm:max-w-none sm:w-fit my-2">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 sm:left-3 sm:translate-x-0 z-10 rounded-full bg-[#ffd200] px-3 py-0.5 text-[12px] sm:text-[13px] font-bold leading-normal text-[#08417b] shadow-2xs whitespace-nowrap">
                Online Degree Courses :
              </span>
              <div
                className="rounded-[6px] border-2 bg-white/95 px-3 sm:px-4 pb-2 pt-3.5 text-[15px] sm:text-[18px] lg:text-[20px] font-bold leading-[1.25] text-[#08417b] shadow-xs text-center sm:text-left"
                style={{
                  borderColor:
                    hero.courseBorder || brand.primaryColor || "#08417b",
                }}
              >
                {courseLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          )}

          {/* Download Brochure Button */}
          <LandingButton
            variant="brochure"
            icon={<Download size={15} strokeWidth={2.5} />}
            iconPosition="right"
            onClick={() => onOpenBrochure?.()}
            className={`${
              hero.buttonClassName ||
              `mt-3 sm:mt-4 py-2.5 px-7 text-[14px] sm:text-[15.5px] font-bold ${
                hero.buttonRadius || "rounded-[6px]"
              }`
            }`}
            style={{
              background:
                hero.buttonStyle?.background ||
                hero.buttonStyle?.backgroundColor ||
                hero.buttonGradient ||
                hero.buttonBackground ||
                (isDarkMode
                  ? "#f78d2d"
                  : "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)"),
              color: hero.buttonTextColor || "#ffffff",
              ...hero.buttonStyle,
            }}
          >
            {hero.brochureButtonText || "Download Brochure"}
          </LandingButton>
        </div>

        {/* Center Column Spacer: Leaves the student in the background image completely open and visible */}
        <div className="hidden lg:block flex-1 min-w-[10px] pointer-events-none" />

        {/* Right Column: Lead Form */}
        <div
          className={`relative z-20 w-full sm:w-[350px] lg:w-[340px] xl:w-[360px] shrink-0 flex flex-col items-center lg:items-end justify-center ${
            hero.formContainerClassName || ""
          }`}
          style={hero.formContainerStyle}
        >
          {hero.mobileStudentImage && (
            <div className="block md:hidden w-full max-w-[280px] -mt-3 mb-2 relative aspect-[16/9]">
              <Image
                src={hero.mobileStudentImage}
                alt={brand.name || "University"}
                fill
                className="object-contain"
                sizes="280px"
              />
            </div>
          )}
          <LandingLeadForm
            brand={brand}
            courses={courses}
            courseList={courses}
            universityName={brand.name}
            variant={hero.formCardType === "white" ? "white-card" : "card"}
            title={brand.enquireTitle || "Enquire Now"}
            subtitle={
              brand.enquireSubtitle || "Take a step towards your success today"
            }
            primaryColor={hero.formBackground || brand.primaryColor || "#08417b"}
            accentColor={brand.accentColor || "#fdb913"}
            buttonText={hero.buttonText || "Submit"}
            phoneText={phoneText}
            phoneHref={brand.phone}
            showPhoneBadge={true}
            onOpenDisclaimer={onOpenDisclaimer}
          />
        </div>
      </LandingContainer>
    </section>
  );
}