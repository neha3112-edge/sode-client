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
  const courseLines = hero.coursesStrip || brand.coursesStrip || [
    "BA | BCOM | MA",
    "| MBA | MCOM | MCA",
  ];

  const isDarkMode =
    hero.darkOverlay !== false &&
    (hero.darkOverlay || hero.theme === "dark" || brand.slug === "smu");

  const phoneText = brand.phoneDisplay || brand.phone || "+91 7065 7777 55";
  const isLpu = brand.slug === "lpu" || brand.shortName === "LPU" || brand.name === "LPU Online" || hero.isLpuStyle;
  const isIim = brand.slug === "iim" || hero.style === "iim";
  const isGalgotias =
    brand.slug === "galgotias" ||
    brand.shortName === "Galgotias" ||
    brand.heroStyle === "galgotias" ||
    hero.isGalgotiasStyle;

  // Dedicated IIM Kozhikode Hero
  if (isIim) {
    return (
      <div id="hero-section">
        <div className="container">
          <div className="banner">
            <div className="banner-info">
              <div className="un_image_container">
                <a href={brand.officialUrl || "https://distanceeducationschool.com/iim/"}>
                  <img src="/assets/iim/upgrade_iim_logo.png" alt="IIM Kozhikode via upGrad" />
                </a>
              </div>

              <h1>HRM Analytics<br />Online Certification</h1>

              <div className="new_banner_heading">
                By <span className="underline_text">IIM Kozhikode</span> via <span className="underline_text">Upgrade</span>
              </div>

              <p className="banner_content">
                Earn a 6-month professional certificate from IIM Kozhikode. This HR Analytics course covers recruitment, job posting, and workforce management via case studies &amp; real-world projects.
              </p>
              <br />
              <p className="t1">🕒 6 Months</p>
              <br />
              <button
                type="button"
                onClick={() => onOpenBrochure?.()}
                className="downloadBrochureBtn"
                data-brochure="/assets/iim/main_brochure.pdf"
              >
                Get Brochure <Download className="inline-block w-4 h-4 ml-1.5 stroke-[2.5]" />
              </button>
            </div>

            <div className="col-md-3 custom_img_section" style={{ padding: "0px" }}>
              <img src="/assets/iim/iim_mobile_new_img.png" alt="IIM Kozhikode" />
            </div>

            <div className="banner-form w-full sm:w-[350px] lg:w-[340px] xl:w-[360px] shrink-0 flex justify-center lg:justify-end">
              <LandingLeadForm
                brand={brand}
                courses={courses}
                courseList={courses}
                universityName={brand.name}
                variant="white-card"
                title={brand.enquireTitle || "Admission Open"}
                subtitle={brand.enquireSubtitle || "Academic Experts will assist you!"}
                primaryColor={brand.primaryColor || "#17479e"}
                accentColor={brand.accentColor || "#0cb1ef"}
                buttonText="Submit"
                phoneText={phoneText}
                phoneHref={brand.phone}
                showPhoneBadge={true}
                onOpenDisclaimer={onOpenDisclaimer}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 1. Galgotias Dedicated Hero
  if (isGalgotias) {
    const coursePills = ["MA", "M.COM", "MBA", "MCA", "BCA", "BBA"];
    const approvalIcons = [
      { img: "/assets/images/approvals/ugc_approval.png", alt: "UGC" },
      { img: "/assets/images/approvals/naac_a_plus.png", alt: "NAAC A+" },
      { img: "/assets/images/approvals/nirf_ranking.png", alt: "NIRF" },
      { img: "/assets/images/approvals/aicte_approval.png", alt: "AICTE" },
    ];

    return (
      <section
        id="hero"
        className="relative bg-white pt-6 sm:pt-10 pb-8 sm:pb-12 border-b border-slate-200/80"
      >
        <LandingContainer className="max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Title, Description, Approvals, Course Pills, CTAs */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.15] m-0">
                Galgotias Online University
              </h1>

              <p className="text-[13.5px] sm:text-[15px] text-slate-700 leading-relaxed font-normal m-0">
                Grow your career skills by pursuing online courses at Galgotias University in 2026. Recognised by the <strong className="text-slate-900 font-bold">UGC</strong> and accredited with an <strong className="text-slate-900 font-bold">NAAC A+</strong> grade, Galgotias University is among the top institutions in India, with a remarkable NAAC score of 3.37 out of 4.
              </p>

              {/* 4 Circular Approval Badges */}
              <div className="flex items-center gap-3 sm:gap-4 pt-1">
                {approvalIcons.map((app, idx) => (
                  <div
                    key={`galgotias-app-${idx}`}
                    className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] flex items-center justify-center transition-transform hover:scale-105"
                  >
                    <Image
                      src={app.img}
                      alt={app.alt}
                      fill
                      className="object-contain"
                      sizes="68px"
                    />
                  </div>
                ))}
              </div>

              {/* Course Pills */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
                {coursePills.map((c, idx) => (
                  <button
                    key={`galgotias-pill-${idx}`}
                    type="button"
                    onClick={() => onOpenBrochure?.(c)}
                    className="bg-[#dff3fd] hover:bg-[#cbeafc] text-[#006da8] font-bold text-xs sm:text-[13px] px-3.5 sm:px-4 py-1.5 rounded-[6px] transition-colors cursor-pointer border-none"
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Action Buttons: 100% Free Counseling & Add to Compare + */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => onOpenBrochure?.("MBA")}
                  className="bg-[#ff5a00] hover:bg-[#e65100] active:scale-98 text-white font-bold text-xs sm:text-[14px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-[8px] shadow-sm transition-all cursor-pointer border-none"
                >
                  Get 100% Free Counseling
                </button>

                <button
                  type="button"
                  onClick={() => onOpenBrochure?.("MBA")}
                  className="bg-[#058427] hover:bg-[#046e20] active:scale-98 text-white font-bold text-xs sm:text-[14px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-[8px] shadow-sm transition-all cursor-pointer border-none"
                >
                  Add to Compare +
                </button>
              </div>
            </div>

            {/* Right Column: Campus Image Card with floating badges */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[540px] aspect-[16/10.5] sm:aspect-[16/10] rounded-[16px] sm:rounded-[22px] overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100 group">
                <Image
                  src={hero.backgroundImage || "/assets/galgotias/galgotias_banner.webp"}
                  alt="Galgotias University Campus"
                  fill
                  priority
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 540px"
                />

                {/* Top-Right Floating Badge: 5 Gold Stars */}
                <div className="absolute top-3.5 sm:top-4 right-3.5 sm:right-4 bg-white/95 backdrop-blur-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[8px] shadow-md border border-slate-100 flex items-center gap-1 text-[#f59e0b] text-xs sm:text-sm font-black">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            </div>
          </div>
        </LandingContainer>
      </section>
    );
  }

  // 2. LPU Dedicated Hero
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

  // 3. Universal Hero for All Other Universities
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
        className="absolute inset-0 -z-20 hidden md:block bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            hero.backgroundImage || "/assets/images/smu_banner_bg.webp"
          })`,
          backgroundPosition: hero.backgroundPosition || "center center",
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
          className={`relative z-10 flex w-full flex-col items-center sm:items-start text-center sm:text-left lg:flex-1 ${
            hero.contentClassName || "lg:max-w-xl"
          }`}
          style={hero.contentStyle}
        >
          {/* Top Logo / Badge */}
          {(hero.logo || hero.welcomeText || brand.heroLogo) && (
            <div
              className={`mb-2 sm:mb-3 ${hero.logoContainerClassName || ""}`}
              style={hero.logoContainerStyle}
            >
              {React.isValidElement(hero.welcomeText) ? (
                hero.welcomeText
              ) : (
                <div className={`relative ${hero.logoWrapperClassName || "w-44 sm:w-56 h-11 sm:h-13"}`}>
                  <Image
                    src={hero.logo || brand.heroLogo || hero.welcomeText}
                    alt={brand.name || "University"}
                    fill
                    priority
                    className="object-contain object-left"
                    sizes="(max-width: 640px) 180px, 240px"
                  />
                </div>
              )}
            </div>
          )}

          {/* Hashtag */}
          {(hero.hashtagText || brand.hashtag) && (
            <p
              className={`m-0 ${
                hero.hashtagClassName || "text-[13px] sm:text-[14px] font-bold tracking-wide"
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
            className={
              hero.headingClassName
                ? `whitespace-pre-line ${hero.headingClassName}`
                : "mt-1 mb-1 text-[30px] sm:text-[36px] lg:text-[42px] font-extrabold leading-[1.12] tracking-tight whitespace-pre-line"
            }
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
            {typeof (hero.headlineText || brand.headline || brand.name) === "string" &&
            (hero.headlineText || brand.headline || brand.name).includes("\n")
              ? (hero.headlineText || brand.headline || brand.name)
                  .split("\n")
                  .map((line, i) => (
                    <span key={`headline-line-${i}`} className="block">
                      {line}
                    </span>
                  ))
              : hero.headlineText || brand.headline || brand.name}
          </h1>

          {/* If coursesBeforeTagline or coursesFirst, render courses before tagline */}
          {(hero.coursesBeforeTagline || hero.coursesFirst) && (
            hero.hideCourseBox ? (
              <h2
                className={
                  hero.courseStripClassName ||
                  "my-2 space-y-0.5 text-[17px] sm:text-[20px] lg:text-[22px] font-extrabold tracking-tight leading-snug"
                }
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
                  <div key={`course-strip-line-${idx}`}>{line}</div>
                ))}
              </h2>
            ) : hero.coursesStripOnly ? (
              <div
                className={
                  hero.courseStripClassName ||
                  "my-2 space-y-0.5 text-[16px] sm:text-[18px] lg:text-[19px] font-bold tracking-wide leading-snug"
                }
                style={{
                  color:
                    hero.courseTextColor ||
                    (hero.isDarkTheme === false ? "#111827" : "#ffffff"),
                  ...hero.courseStripStyle,
                }}
              >
                {courseLines.map((line, idx) => (
                  <div key={`courses-only-line-${idx}`}>{line}</div>
                ))}
              </div>
            ) : (
              <div className="relative z-20 w-full max-w-sm sm:max-w-none sm:w-fit my-2">
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 sm:left-3 sm:translate-x-0 z-10 rounded-full px-3.5 py-0.5 text-[12px] sm:text-[13px] font-bold leading-normal shadow-2xs whitespace-nowrap"
                  style={{
                    backgroundColor:
                      hero.coursePillBg || brand.accentColor || "#fdb913",
                    color:
                      hero.coursePillTextColor ||
                      hero.headingColor ||
                      "#004172",
                  }}
                >
                  Online Degree Courses :
                </span>
                <div
                  className="rounded-[6px] border-2 bg-white/95 px-3 sm:px-4 pb-2 pt-3.5 text-[15px] sm:text-[18px] lg:text-[20px] font-bold leading-[1.25] shadow-xs text-center sm:text-left"
                  style={{
                    borderColor:
                      hero.courseBorder || brand.primaryColor || "#004172",
                    color:
                      hero.coursesColor ||
                      hero.courseTextColor ||
                      hero.headingColor ||
                      "#004172",
                  }}
                >
                  {courseLines.map((line, idx) => (
                    <div key={`course-box-line-${idx}`}>{line}</div>
                  ))}
                </div>
              </div>
            )
          )}

          {/* Tagline */}
          <div
            className={
              hero.taglineClassName ||
              "mt-1 mb-2 text-[15px] sm:text-[17px] lg:text-[18px] font-medium leading-snug max-w-[480px]"
            }
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
            {Array.isArray(hero.taglineText)
              ? hero.taglineText.map((item, idx) =>
                  React.isValidElement(item) ? (
                    React.cloneElement(item, { key: item.key || `tagline-item-${idx}` })
                  ) : (
                    <span key={`tagline-item-${idx}`}>{item}</span>
                  )
                )
              : React.isValidElement(hero.taglineText)
              ? React.cloneElement(hero.taglineText, {
                  key: hero.taglineText.key || "tagline-root",
                })
              : hero.taglineText || brand.tagline1 || "Education that empowers your ambition"}
            {!hero.taglineText && brand.tagline2 ? (
              <>
                <br className="hidden sm:inline" /> {brand.tagline2}
              </>
            ) : null}
          </div>

          {/* Description or Highlight Callout Box (e.g. Pay-After-Placement) */}
          {hero.description ? (
            <p
              className={
                hero.descriptionClassName ||
                "mt-2 mb-3 text-[14px] sm:text-[15.5px] leading-relaxed text-[#444444] max-w-[500px]"
              }
              style={{
                color: hero.descriptionColor,
                ...hero.descriptionStyle,
              }}
            >
              {hero.description}
            </p>
          ) : hero.highlightBox ? (
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
                  <div key={`highlight-box-line-${idx}`}>{line}</div>
                ))
              ) : (
                hero.highlightBox.text
              )}
            </div>
          ) : null}

          {/* Online Degree Courses Strip or Course Box (when NOT coursesBeforeTagline) */}
          {!(hero.coursesBeforeTagline || hero.coursesFirst) && (
            hero.hideCourseBox ? (
              <h2
                className={
                  hero.courseStripClassName ||
                  "my-2 space-y-0.5 text-[17px] sm:text-[20px] lg:text-[22px] font-extrabold tracking-tight leading-snug"
                }
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
                  <div key={`course-strip-line-${idx}`}>{line}</div>
                ))}
              </h2>
            ) : hero.coursesStripOnly ? (
              <div
                className={
                  hero.courseStripClassName ||
                  "my-2 space-y-0.5 text-[16px] sm:text-[18px] lg:text-[19px] font-bold tracking-wide leading-snug"
                }
                style={{
                  color:
                    hero.courseTextColor ||
                    (hero.isDarkTheme === false ? "#111827" : "#ffffff"),
                  ...hero.courseStripStyle,
                }}
              >
                {courseLines.map((line, idx) => (
                  <div key={`courses-only-line-${idx}`}>{line}</div>
                ))}
              </div>
            ) : (
              <div className="relative z-20 w-full max-w-sm sm:max-w-none sm:w-fit my-2">
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 sm:left-3 sm:translate-x-0 z-10 rounded-full px-3.5 py-0.5 text-[12px] sm:text-[13px] font-bold leading-normal shadow-2xs whitespace-nowrap"
                  style={{
                    backgroundColor:
                      hero.coursePillBg || brand.accentColor || "#fdb913",
                    color:
                      hero.coursePillTextColor ||
                      hero.headingColor ||
                      "#004172",
                  }}
                >
                  Online Degree Courses :
                </span>
                <div
                  className="rounded-[6px] border-2 bg-white/95 px-3 sm:px-4 pb-2 pt-3.5 text-[15px] sm:text-[18px] lg:text-[20px] font-bold leading-[1.25] shadow-xs text-center sm:text-left"
                  style={{
                    borderColor:
                      hero.courseBorder || brand.primaryColor || "#004172",
                    color:
                      hero.coursesColor ||
                      hero.courseTextColor ||
                      hero.headingColor ||
                      "#004172",
                  }}
                >
                  {courseLines.map((line, idx) => (
                    <div key={`course-box-line-${idx}`}>{line}</div>
                  ))}
                </div>
              </div>
            )
          )}

          {/* Download Brochure Button */}
          <LandingButton
            variant="brochure"
            icon={
              hero.brochureIcon || (
                <svg
                  className="w-3.5 h-3.5 fill-current shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
              )
            }
            iconPosition="right"
            onClick={() => onOpenBrochure?.()}
            className={
              hero.buttonClassName ||
              `mt-3 sm:mt-4 py-2 sm:py-2.5 px-6 sm:px-7 text-[14px] sm:text-[15px] font-bold tracking-tight hover:shadow-md transition-all ${
                hero.buttonRadius || "rounded-[6px]"
              }`
            }
            style={{
              background:
                hero.buttonBackground ||
                hero.buttonGradient ||
                (isDarkMode
                  ? "#f78d2d"
                  : "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)"),
              color: hero.buttonTextColor || "#ffffff",
              border:
                hero.buttonBorder ||
                (hero.buttonStyle?.border ? undefined : "none"),
              ...hero.buttonStyle,
            }}
          >
            {hero.brochureButtonText || "Download Brochure"}
          </LandingButton>
        </div>

        {/* Center Column: Student Image or Spacer */}
        {hero.studentImage || brand.heroStudentImage ? (
          <div className="hidden lg:flex lg:flex-1 justify-center items-end self-end pointer-events-none -mb-4 sm:-mb-6 lg:-mb-6 z-10">
            <img
              src={hero.studentImage || brand.heroStudentImage}
              alt="Online Student"
              className="max-h-[380px] xl:max-h-[430px] w-auto object-contain object-bottom drop-shadow-md"
            />
          </div>
        ) : (
          <div className="hidden lg:block lg:flex-1 min-w-[100px] pointer-events-none" />
        )}

        {/* Right Column: Lead Form */}
        <div
          className={`hero-form-col relative z-20 w-full sm:w-[350px] lg:w-[340px] xl:w-[360px] shrink-0 flex flex-col items-center lg:items-end justify-center ${
            hero.formContainerClassName || ""
          }`}
          style={hero.formContainerStyle}
        >
          {hero.mobileStudentImage && (
            <div
              className={`hero-mobile-image-wrapper block md:hidden w-full ${
                hero.mobileStudentImageWrapperClassName ||
                "relative w-full h-[220px] sm:h-[260px] overflow-hidden mb-3"
              }`}
            >
              <Image
                src={hero.mobileStudentImage}
                alt={brand.name || "University"}
                fill
                className={`object-cover ${hero.mobileStudentImageClassName || ""}`}
                sizes="(max-width: 768px) 100vw, 420px"
                priority
              />
            </div>
          )}
          <LandingLeadForm
            brand={brand}
            courses={courses}
            courseList={courses}
            universityName={brand.name}
            variant={hero.formCardType === "white" ? "white-card" : "card"}
            title={hero.enquireTitle || brand.enquireTitle || "Enquire Now"}
            subtitle={
              hero.enquireSubtitle ||
              brand.enquireSubtitle ||
              "Take a step towards your success today"
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