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
    "BA | BCOM | MA",
    "| MBA | MCOM | MCA",
  ];

  const isDarkMode =
    hero.darkOverlay !== false &&
    (hero.darkOverlay || hero.theme === "dark" || brand.slug === "smu");

  const phoneText = brand.phoneDisplay || brand.phone || "+91 7065 7777 55";
  const isLpu = brand.slug === "lpu" || brand.shortName === "LPU" || brand.name === "LPU Online" || hero.isLpuStyle;

  if (isLpu) {
    return (
      <>
        <section
          id="hero"
          className="relative isolate overflow-hidden bg-[#fff8f2] py-8 sm:py-12 border-b border-orange-100"
          style={{
            backgroundImage: "url('/assets/lpu/new-desktop-front-bg.webp')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <LandingContainer className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 max-w-[1360px] px-4 sm:px-6 lg:px-8">
            {/* Left Column: Heading, Strips, Fees, CTA */}
            <div className="flex-1 space-y-4 text-center sm:text-left">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#4d4d4d] tracking-tight leading-tight m-0">
                  <span className="underline decoration-[#f58220] underline-offset-8 decoration-4">
                    LPU Online
                  </span>
                  <br />
                  <span className="text-slate-800">Career ka </span>
                  <span className="text-[#f58220]">Turning Point</span>
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-700 mt-3 mb-0">
                  LPU Online & Distance Education Courses
                </p>
              </div>

              {/* Orange Course Strips */}
              <div className="space-y-1.5 pt-1">
                <div>
                  <div className="bg-[#f58220] text-white font-extrabold text-base sm:text-xl lg:text-[22px] px-3.5 sm:px-4 py-1.5 rounded-xs shadow-xs inline-block tracking-wide">
                    MBA | MCA | MA | MSc Maths
                  </div>
                </div>
                <div>
                  <div className="bg-[#f58220] text-white font-extrabold text-base sm:text-xl lg:text-[22px] px-3.5 sm:px-4 py-1.5 rounded-xs shadow-xs inline-block tracking-wide">
                    MCOM | BCA | BBA | BA
                  </div>
                </div>
              </div>

              {/* Pricing & Zero Cost EMI Stats */}
              <div className="flex items-center justify-center sm:justify-start gap-6 pt-2">
                <div>
                  <p className="text-xs font-semibold text-[#f58220] uppercase tracking-wider m-0">
                    Fees Starting at
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 m-0">
                    ₹20,000/- Sem
                  </h3>
                </div>

                <div className="h-9 w-[1px] bg-slate-300" />

                <div>
                  <p className="text-xs font-semibold text-[#f58220] uppercase tracking-wider m-0">
                    Zero Cost
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 m-0">
                    EMI Available
                  </h3>
                </div>
              </div>

              {/* Download Brochure Button */}
              <div className="pt-2">
                <LandingButton
                  variant="brochure"
                  icon={<Download size={16} strokeWidth={2.5} />}
                  iconPosition="right"
                  onClick={() => onOpenBrochure?.()}
                  className="py-2.5 px-6 text-[14px] font-bold rounded-[4px] border-none shadow-md"
                  style={{ backgroundColor: "#4d4d4d", color: "#ffffff" }}
                >
                  Download Brochure
                </LandingButton>
              </div>
            </div>

            {/* Right Column: Free Counseling Lead Form */}
            <div className="w-full sm:w-[360px] shrink-0 flex justify-center lg:justify-end">
              <LandingLeadForm
                brand={brand}
                courses={courses}
                courseList={courses}
                universityName={brand.name}
                variant="white-card"
                title="Free Counseling"
                subtitle="Have Doubt? Talk FREE to Our Expert"
                primaryColor="#f58220"
                accentColor="#f58220"
                buttonText="Submit"
                phoneText={phoneText}
                phoneHref={brand.phone}
                showPhoneBadge={true}
                onOpenDisclaimer={onOpenDisclaimer}
              />
            </div>
          </LandingContainer>
        </section>

        {/* Admissions Open Bottom Strip */}
        <section className="bg-[#f9f9f9] border-y border-slate-200 py-4 sm:py-5">
          <LandingContainer className="max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <p className="text-base sm:text-xl font-bold text-slate-800 m-0">
                  Admissions are Open!{" "}
                  <span className="text-[#f58220]">LPU Online Degree Courses</span> - 2026 Batch
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    const heroEl = document.getElementById("hero");
                    heroEl?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[#f58220] hover:bg-[#e07115] text-white font-bold text-sm px-8 py-2.5 rounded-full shadow-xs cursor-pointer border-none transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </LandingContainer>
        </section>
      </>
    );
  }

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
          backgroundImage: `url(${
            hero.mobileBackgroundImage ||
            hero.backgroundImage ||
            "/assets/images/smu_banner_bg.webp"
          })`,
          backgroundPosition: hero.mobileBackgroundPosition || "center 0%",
          ...hero.mobileBgStyle,
        }}
      />

      {/* Desktop Background */}
      <div
        className="absolute inset-0 -z-20 hidden md:block bg-cover bg-center md:bg-[52%_center]"
        style={{
          backgroundImage: `url(${
            hero.backgroundImage || "/assets/images/smu_banner_bg.webp"
          })`,
          backgroundPosition: hero.backgroundPosition || "center 0%",
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
          <h1
            className={`mt-1 mb-1 text-[30px] sm:text-[36px] lg:text-[42px] font-extrabold leading-[1.12] tracking-tight whitespace-pre-line ${
              hero.headingClassName || ""
            }`}
            style={{
              fontFamily: hero.headingFont || "'Poppins', sans-serif",
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
            {hero.headlineText || brand.headline || brand.name}
          </h1>

          {/* Tagline */}
          <p
            className={`mt-1 mb-2 text-[15px] sm:text-[17px] lg:text-[18px] font-medium leading-snug max-w-[480px] ${
              hero.taglineClassName || ""
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
              className={`my-2 sm:my-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-[8px] font-bold text-center leading-snug w-full sm:w-auto ${
                hero.highlightBox.className || ""
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
          {hero.hideCourseBox ? (
            <h2
              className={`my-2 space-y-0.5 text-[17px] sm:text-[20px] lg:text-[22px] font-extrabold tracking-tight leading-snug ${
                hero.courseStripClassName || ""
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
            </h2>
          ) : hero.coursesStripOnly ? (
            <div
              className={`my-2 space-y-0.5 text-[16px] sm:text-[18px] lg:text-[19px] font-bold tracking-wide leading-snug ${
                hero.courseStripClassName || ""
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
            className={`mt-3 sm:mt-4 py-2.5 px-7 text-[14px] sm:text-[15.5px] font-bold ${
              hero.buttonRadius || "rounded-[6px]"
            }`}
            style={{
              background:
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
        <div className="hidden lg:block lg:flex-1 min-w-[100px] pointer-events-none" />

        {/* Right Column: Lead Form */}
        <div
          className={`relative z-20 w-full sm:w-[350px] lg:w-[340px] xl:w-[360px] shrink-0 flex justify-center lg:justify-end ${
            hero.formContainerClassName || ""
          }`}
          style={hero.formContainerStyle}
        >
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