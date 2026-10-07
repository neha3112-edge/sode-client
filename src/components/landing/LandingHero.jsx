"use client";

import React from "react";
import Image from "next/image";

import LandingContainer from "./LandingContainer";
import LandingLeadForm from "./LandingLeadForm";
import LandingButton from "./LandingButton";

/**
 * Reusable Landing Hero Component
 *
 * ARCHITECTURE:
 * - 100% Reusable, Clean & Data-Driven.
 * - No hardcoded university-specific styles, fallback colors, icons, or conditions.
 * - All buttons are powered by Ant Design (via LandingButton) and configured directly from the LP JSON.
 * - Supports single brochure button or dynamic actionButtons array from JSON.
 * - Form uses the common Ant Design LandingLeadForm.
 */
export default function LandingHero({
  brand = {},
  courses = [],
  onOpenBrochure,
  onOpenDisclaimer,
}) {
  const hero = brand?.hero || {};

  /* ----------------------------- Helpers ----------------------------- */

  const joinClassNames = (...values) =>
    values.filter(Boolean).join(" ");

  const phoneText =
    hero.phoneDisplay ||
    brand.phoneDisplay ||
    brand.phone ||
    "+91 7065 7777 55";

  const courseLines = Array.isArray(hero.courseLines)
    ? hero.courseLines
    : Array.isArray(hero.coursesStrip)
      ? hero.coursesStrip
      : Array.isArray(brand.coursesStrip)
        ? brand.coursesStrip
        : [];

  const headingText =
    hero.headingText ||
    hero.headlineText ||
    brand.headline ||
    brand.name ||
    "";

  const taglineText =
    hero.taglineText ??
    brand.tagline ??
    brand.tagline1 ??
    "";

  const descriptionText =
    hero.description ??
    brand.description ??
    "";

  /* -------------------------- Background CSS -------------------------- */

  const backgroundImage =
    hero.backgroundImage ||
    hero.desktopBackgroundImage ||
    "";

  const mobileBackgroundImage =
    hero.mobileBackgroundImage ||
    backgroundImage;

  const sectionStyle = {
    ...hero.sectionStyle,
    ...(hero.sectionBackgroundStyle || {}),
  };

  const desktopBackgroundStyle = {
    backgroundImage: backgroundImage
      ? `url("${backgroundImage}")`
      : undefined,
    backgroundPosition:
      hero.backgroundPosition ||
      hero.desktopBackgroundPosition ||
      "center center",
    backgroundSize:
      hero.backgroundSize ||
      hero.desktopBackgroundSize ||
      "cover",
    backgroundRepeat:
      hero.backgroundRepeat ||
      hero.desktopBackgroundRepeat ||
      "no-repeat",
    backgroundAttachment:
      hero.backgroundAttachment ||
      hero.desktopBackgroundAttachment,
    ...hero.backgroundStyle,
    ...hero.desktopBackgroundStyle,
  };

  const mobileBackgroundStyle = {
    backgroundImage: mobileBackgroundImage
      ? `url("${mobileBackgroundImage}")`
      : undefined,
    backgroundPosition:
      hero.mobileBackgroundPosition ||
      hero.backgroundPosition ||
      "center center",
    backgroundSize:
      hero.mobileBackgroundSize ||
      hero.backgroundSize ||
      "cover",
    backgroundRepeat:
      hero.mobileBackgroundRepeat ||
      hero.backgroundRepeat ||
      "no-repeat",
    backgroundAttachment:
      hero.mobileBackgroundAttachment ||
      hero.backgroundAttachment,
    ...hero.mobileBackgroundStyle,
  };

  /* --------------------------- Text Styles --------------------------- */

  const headingStyle = {
    fontFamily: hero.headingFont,
    color: hero.headingColor || hero.titleColor,
    ...hero.headingStyle,
  };

  const taglineStyle = {
    color: hero.taglineColor,
    ...hero.taglineStyle,
  };

  const descriptionStyle = {
    color: hero.descriptionColor,
    ...hero.descriptionStyle,
  };

  /* --------------------------- Course Styles -------------------------- */

  const courseLabel =
    hero.courseLabel !== undefined
      ? hero.courseLabel
      : hero.coursePillText !== undefined
        ? hero.coursePillText
        : " Online Degree Courses :";

  const courseLabelStyle = {
    backgroundColor:
      hero.coursePillBg ||
      hero.courseLabelBackground ||
      brand.accentColor ||
      "#fdb913",
    color:
      hero.coursePillTextColor ||
      hero.courseLabelColor ||
      hero.headingColor ||
      "#004172",
    ...hero.courseLabelStyle,
  };

  const courseBoxStyle = {
    borderColor:
      hero.courseBorder ||
      hero.courseBoxBorderColor ||
      brand.primaryColor ||
      "#004172",
    color:
      hero.coursesColor ||
      hero.courseTextColor ||
      hero.headingColor ||
      "#004172",
    ...hero.courseBoxStyle,
  };

  const renderCourseContent = () => {
    if (!courseLines.length) return null;

    if (hero.hideCourseBox) {
      return (
        <div
          className={
            hero.courseStripClassName ||
            "my-2 space-y-0.5 text-[17px] sm:text-[20px] lg:text-[22px] font-extrabold leading-snug"
          }
          style={courseBoxStyle}
        >
          {courseLines.map((line, index) => (
            <div key={`course-line-${index}`}>{line}</div>
          ))}
        </div>
      );
    }

    if (hero.coursesStripOnly) {
      return (
        <div
          className={
            hero.courseStripClassName ||
            "my-2 space-y-0.5 text-[16px] sm:text-[18px] lg:text-[19px] font-bold leading-snug"
          }
          style={courseBoxStyle}
        >
          {courseLines.map((line, index) => (
            <div key={`course-only-line-${index}`}>{line}</div>
          ))}
        </div>
      );
    }

    return (
      <div
        className={joinClassNames(
          "relative z-20 w-full sm:w-fit my-2",
          hero.courseWrapperClassName
        )}
        style={hero.courseWrapperStyle}
      >
        {courseLabel && (
          <span
            className={
              hero.courseLabelClassName ||
              "absolute -top-3 left-1/2 -translate-x-1/2 sm:left-3 sm:translate-x-0 z-10 rounded-full px-3.5 py-0.5 text-[12px] sm:text-[13px] font-bold leading-normal shadow-sm whitespace-nowrap"
            }
            style={courseLabelStyle}
          >
            {courseLabel}
          </span>
        )}

        <div
          className={
            hero.courseBoxClassName ||
            "rounded-[6px] border-2 bg-white/95 px-3 sm:px-4 pb-2 pt-3.5 text-[15px] sm:text-[18px] lg:text-[20px] font-bold leading-[1.25] shadow-sm text-center sm:text-left"
          }
          style={courseBoxStyle}
        >
          {courseLines.map((line, index) => (
            <div key={`course-box-line-${index}`}>{line}</div>
          ))}
        </div>
      </div>
    );
  };

  /* ------------------------------ Logo ------------------------------- */

  const logoSrc =
    typeof hero.logo === "string" && hero.logo.trim()
      ? hero.logo
      : typeof brand.heroLogo === "string" && brand.heroLogo.trim()
        ? brand.heroLogo
        : "";

  const renderLogo = () => {
    if (!logoSrc) return null;

    return (
      <div
        className={joinClassNames(
          "mb-2 sm:mb-3",
          hero.logoContainerClassName
        )}
        style={hero.logoContainerStyle}
      >
        <div
          className={
            hero.logoWrapperClassName ||
            "relative w-44 sm:w-56 h-11 sm:h-[52px]"
          }
        >
          <Image
            src={logoSrc}
            alt={hero.logoAlt || brand.name || "University"}
            fill
            priority
            className={hero.logoClassName || "object-contain object-left"}
            sizes="(max-width: 640px) 180px, 240px"
          />
        </div>
      </div>
    );
  };

  /* --------------------------- Optional Overlay ----------------------- */

  const renderOverlay = () => {
    if (hero.noOverlay || hero.overlay === false) return null;

    if (hero.overlayStyle || hero.overlayClassName) {
      return (
        <div
          aria-hidden="true"
          className={joinClassNames(
            "absolute inset-0 pointer-events-none",
            hero.overlayClassName
          )}
          style={hero.overlayStyle}
        />
      );
    }

    if (hero.overlayGradient) {
      return (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: hero.overlayGradient,
            opacity: hero.overlayOpacity,
          }}
        />
      );
    }

    return null;
  };

  /* ---------------------------- Buttons ------------------------------ */

  const renderButtons = () => {
    // 1. Multiple action buttons directly configured in LP JSON
    const actionButtons = hero.actionButtons || hero.buttons;
    if (Array.isArray(actionButtons) && actionButtons.length > 0) {
      return (
        <div
          className={joinClassNames(
            "flex flex-wrap items-center gap-3 sm:gap-4 pt-3",
            hero.actionButtonsWrapperClassName
          )}
          style={hero.actionButtonsWrapperStyle}
        >
          {actionButtons.map((btn, index) => (
            <LandingButton
              key={`hero-action-btn-${index}`}
              variant={btn.variant || "primary"}
              background={btn.bg || btn.background || btn.backgroundColor}
              textColor={btn.color || btn.textColor}
              border={btn.border || btn.borderColor}
              icon={btn.icon}
              iconPosition={btn.iconPosition || "right"}
              onClick={() => {
                if (btn.onClick) {
                  btn.onClick();
                } else {
                  onOpenBrochure?.(btn.course, btn.label || btn.text);
                }
              }}
              className={btn.className}
              style={btn.style}
              skewEffect={btn.skewEffect || false}
              disabled={btn.disabled}
            >
              {btn.label || btn.text}
            </LandingButton>
          ))}
        </div>
      );
    }

    // 2. Single Brochure Button: color & text come from LP JSON
    if (hero.showBrochureButton !== false) {
      const buttonLabel = hero.brochureButtonText || hero.buttonText || "Download Brochure";
      return (
        <LandingButton
          variant="brochure"
          background={hero.buttonBackground || hero.buttonGradient}
          textColor={hero.buttonTextColor}
          border={hero.buttonBorder}
          icon={hero.brochureIcon}
          iconPosition={hero.brochureIconPosition || "right"}
          onClick={() => onOpenBrochure?.(null, buttonLabel)}
          disabled={hero.brochureButtonDisabled}
          className={hero.buttonClassName}
          style={hero.buttonStyle}
          skewEffect={hero.brochureButtonSkewEffect || false}
        >
          {buttonLabel}
        </LandingButton>
      );
    }

    return null;
  };

  /* ------------------------------ Render ------------------------------ */

  return (
    <>
      <section
        id={hero.sectionId || "hero"}
        className={joinClassNames(
          "relative isolate overflow-hidden",
          hero.sectionClassName
        )}
        style={{
          backgroundColor:
            hero.backgroundColor ||
            hero.sectionBg ||
            "transparent",
          ...sectionStyle,
        }}
      >
        {/* Desktop Background */}
        {backgroundImage && (
          <div
            aria-hidden="true"
            className={joinClassNames(
              "absolute inset-0 -z-20 hidden md:block",
              hero.backgroundClassName
            )}
            style={desktopBackgroundStyle}
          />
        )}

        {/* Mobile Background */}
        {mobileBackgroundImage && (
          <div
            aria-hidden="true"
            className={joinClassNames(
              "absolute inset-0 -z-20 md:hidden",
              hero.mobileBackgroundClassName || hero.backgroundClassName
            )}
            style={mobileBackgroundStyle}
          />
        )}

        {renderOverlay()}

        <LandingContainer
          className={joinClassNames(
            "relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-7 lg:py-6",
            hero.containerClassName
          )}
          style={{
            minHeight: hero.minHeight,
            ...hero.containerStyle,
          }}
        >
          {/* ------------------------- LEFT CONTENT ------------------------- */}
          <div
            className={joinClassNames(
              "relative z-10 flex w-full flex-col items-center sm:items-start text-center sm:text-left lg:flex-1",
              hero.contentClassName
            )}
            style={hero.contentStyle}
          >
            {renderLogo()}

            {hero.welcomeText && (
              <div
                className={hero.welcomeClassName || "mb-2 sm:mb-3"}
                style={hero.welcomeStyle}
              >
                {hero.welcomeText}
              </div>
            )}

            {(hero.hashtagText || brand.hashtag) && (
              <p
                className={
                  hero.hashtagClassName ||
                  "m-0 text-[13px] sm:text-[14px] font-bold tracking-wide"
                }
                style={{
                  color: hero.hashtagColor,
                  ...hero.hashtagStyle,
                }}
              >
                {hero.hashtagText || brand.hashtag}
              </p>
            )}

            {hero.titleHtml ? (
              <h1
                className={
                  hero.headingClassName ||
                  "mt-1 mb-1 text-[30px] sm:text-[36px] lg:text-[42px] font-extrabold leading-[1.12] tracking-tight whitespace-pre-line"
                }
                style={headingStyle}
                dangerouslySetInnerHTML={{ __html: hero.titleHtml }}
              />
            ) : headingText ? (
              <h1
                className={
                  hero.headingClassName ||
                  "mt-1 mb-1 text-[30px] sm:text-[36px] lg:text-[42px] font-extrabold leading-[1.12] tracking-tight whitespace-pre-line"
                }
                style={headingStyle}
              >
                {headingText}
              </h1>
            ) : null}

            {/* Courses before tagline */}
            {(hero.coursesBeforeTagline || hero.coursesFirst) &&
              renderCourseContent()}

            {taglineText && (
              <div
                className={
                  hero.taglineClassName ||
                  "mt-1 mb-2 text-[15px] sm:text-[17px] lg:text-[18px] font-medium leading-snug max-w-[520px]"
                }
                style={taglineStyle}
              >
                {Array.isArray(taglineText)
                  ? taglineText.map((item, index) => (
                    <React.Fragment key={`tagline-${index}`}>
                      {item}
                    </React.Fragment>
                  ))
                  : taglineText}
              </div>
            )}

            {descriptionText && (
              <p
                className={
                  hero.descriptionClassName ||
                  "mt-2 mb-3 text-[14px] sm:text-[15.5px] leading-relaxed max-w-[520px]"
                }
                style={descriptionStyle}
              >
                {descriptionText}
              </p>
            )}

            {/* Optional Approval Badges (from LP JSON) */}
            {Array.isArray(hero.approvalIcons) && hero.approvalIcons.length > 0 && (
              <div
                className={joinClassNames(
                  "flex items-center gap-3 sm:gap-4 pt-1",
                  hero.approvalIconsContainerClassName
                )}
                style={hero.approvalIconsContainerStyle}
              >
                {hero.approvalIcons.map((app, idx) => (
                  <div
                    key={`approval-icon-${idx}`}
                    className={
                      hero.approvalIconWrapperClassName ||
                      "relative w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] flex items-center justify-center transition-transform hover:scale-105"
                    }
                  >
                    <Image
                      src={app.img || app.src}
                      alt={app.alt || "Approval"}
                      fill
                      className="object-contain"
                      sizes="68px"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Optional Course Pills (from LP JSON) */}
            {Array.isArray(hero.coursePills) && hero.coursePills.length > 0 && (
              <div
                className={joinClassNames(
                  "flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1",
                  hero.coursePillsContainerClassName
                )}
                style={hero.coursePillsContainerStyle}
              >
                {hero.coursePills.map((pill, idx) => {
                  const pillLabel = typeof pill === "string" ? pill : pill.label;
                  const pillCourse = typeof pill === "string" ? pill : pill.course || pill.label;
                  return (
                    <LandingButton
                      key={`course-pill-${idx}`}
                      variant="pill"
                      background={hero.coursePillBg}
                      textColor={hero.coursePillTextColor}
                      onClick={() => onOpenBrochure?.(pillCourse)}
                      className={hero.coursePillClassName}
                      style={hero.coursePillItemStyle}
                    >
                      {pillLabel}
                    </LandingButton>
                  );
                })}
              </div>
            )}

            {/* Dynamic Pricing Stats (from LP JSON) */}
            {Array.isArray(hero.pricingStats) && hero.pricingStats.length > 0 && (
              <div
                className={
                  hero.pricingStatsClassName ||
                  "flex items-center justify-center sm:justify-start gap-6 pt-2 my-2"
                }
                style={hero.pricingStatsStyle}
              >
                {hero.pricingStats.map((stat, idx) => (
                  <React.Fragment key={`pricing-stat-${idx}`}>
                    {idx > 0 && <div className="h-9 w-[1px] bg-slate-300" />}
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider m-0"
                        style={{
                          color:
                            hero.pricingStatLabelColor ||
                            brand.primaryColor ||
                            "#f58220",
                        }}
                      >
                        {stat.label}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 m-0">
                        {stat.value}
                      </h3>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}

            {hero.highlightBox && (
              <div
                className={
                  hero.highlightBox.className ||
                  "my-2 sm:my-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-[8px] font-bold text-center leading-snug"
                }
                style={{
                  background:
                    hero.highlightBox.background || "#fd202a",
                  color:
                    hero.highlightBox.color || "#ffffff",
                  ...hero.highlightBox.style,
                }}
              >
                {hero.highlightBox.lines?.length
                  ? hero.highlightBox.lines.map((line, index) => (
                    <div key={`highlight-${index}`}>{line}</div>
                  ))
                  : hero.highlightBox.text}
              </div>
            )}

            {/* Courses after tagline/description */}
            {!hero.coursesBeforeTagline &&
              !hero.coursesFirst &&
              renderCourseContent()}

            {/* Dynamic Buttons (single or array of action buttons from LP JSON) */}
            {renderButtons()}

            {hero.extraContent}
          </div>

          {/* -------------------- CENTER STUDENT / IMAGE ------------------- */}
          {(hero.studentImage || hero.centerImage || brand.heroStudentImage) && (
            <div
              className={joinClassNames(
                "hidden lg:flex lg:flex-1 justify-center items-end self-end pointer-events-none -mb-4 sm:-mb-6 lg:-mb-6 z-10",
                hero.studentImageWrapperClassName
              )}
              style={hero.studentImageWrapperStyle}
            >
              <img
                src={
                  hero.studentImage ||
                  hero.centerImage ||
                  brand.heroStudentImage
                }
                alt={hero.studentImageAlt || brand.name || "Student"}
                className={
                  hero.studentImageClassName ||
                  "max-h-[380px] xl:max-h-[430px] w-auto object-contain object-bottom drop-shadow-md"
                }
                style={hero.studentImageStyle}
              />
            </div>
          )}

          {/* --------------------------- RIGHT FORM -------------------------- */}
          <div
            className={joinClassNames(
              "hero-form-col relative z-20 w-full sm:w-[350px] lg:w-[340px] xl:w-[360px] shrink-0 flex flex-col items-center lg:items-end justify-center",
              hero.formContainerClassName
            )}
            style={hero.formContainerStyle}
          >
            {hero.mobileStudentImage && (
              <div
                className={joinClassNames(
                  "hero-mobile-image-wrapper block md:hidden w-full relative w-full h-[220px] sm:h-[260px] overflow-hidden mb-3",
                  hero.mobileStudentImageWrapperClassName
                )}
              >
                <Image
                  src={hero.mobileStudentImage}
                  alt={brand.name || "University"}
                  fill
                  className={joinClassNames(
                    "object-cover",
                    hero.mobileStudentImageClassName
                  )}
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                />
              </div>
            )}

            <LandingLeadForm
              config={hero.form}
              brand={brand}
              courses={courses}
              courseList={hero.formCourseList || hero.form?.courseList || courses}
              universityName={hero.formUniversityName || hero.form?.universityName || brand.name}
              variant={
                hero.formCardType === "white"
                  ? "white-card"
                  : hero.formCardType || "card"
              }
              title={
                hero.enquireTitle ||
                brand.enquireTitle ||
                "Enquire Now"
              }
              subtitle={
                hero.enquireSubtitle ||
                brand.enquireSubtitle ||
                "Take a step towards your success today"
              }
              primaryColor={
                hero.formBackground ||
                brand.primaryColor ||
                "#08417b"
              }
              accentColor={
                hero.formAccentColor ||
                brand.accentColor ||
                "#fdb913"
              }
              buttonText={
                hero.formButtonText ||
                hero.buttonText ||
                "Submit"
              }
              phoneText={phoneText}
              phoneHref={hero.phoneHref || brand.phone}
              showPhoneBadge={hero.showPhoneBadge !== false}
              onOpenDisclaimer={onOpenDisclaimer}
              className={hero.formClassName}
              style={hero.formStyle}
            />
          </div>
        </LandingContainer>
      </section>

      {/* --------------------- OPTIONAL BOTTOM STRIP --------------------- */}
      {hero.bottomStrip && (
        <section
          className={
            hero.bottomStrip.className ||
            "bg-[#f9f9f9] border-y border-slate-200 py-4 sm:py-5"
          }
          style={hero.bottomStrip.style}
        >
          <LandingContainer className="max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                {hero.bottomStrip.textHtml ? (
                  <p
                    className="text-base sm:text-xl font-bold text-slate-800 m-0"
                    dangerouslySetInnerHTML={{
                      __html: hero.bottomStrip.textHtml,
                    }}
                  />
                ) : (
                  <p className="text-base sm:text-xl font-bold text-slate-800 m-0">
                    {hero.bottomStrip.text}
                  </p>
                )}
              </div>
              <div>
                <LandingButton
                  variant="primary"
                  background={hero.bottomStrip.buttonBg || brand.primaryColor}
                  textColor={hero.bottomStrip.buttonTextColor}
                  onClick={() => {
                    const el = document.getElementById(
                      hero.sectionId || "hero"
                    );
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={
                    hero.bottomStrip.buttonClassName ||
                    "!rounded-full text-sm px-8 !h-auto py-2.5 shadow-xs"
                  }
                  style={hero.bottomStrip.buttonStyle}
                >
                  {hero.bottomStrip.buttonText || "Apply Now"}
                </LandingButton>
              </div>
            </div>
          </LandingContainer>
        </section>
      )}
    </>
  );
}