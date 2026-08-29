"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "antd";
import { Container } from "@/components/common/Container";
import { useFormModal } from "@/hooks/useFormModal";

// Smart Helper to detect if background color is light or dark
function isLightColor(hexColor) {
  if (!hexColor) return false;
  const hex = hexColor.replace("#", "").trim();
  if (hex.length === 3) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 160;
  }
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 160;
  }
  return false;
}

export function Hero({ initialHeroData = null }) {
  const { openFormModal } = useFormModal();

  const heroData = initialHeroData?.result || initialHeroData || {};

  const openCounsellingForm = (customTitle, customSubtitle) => {
    openFormModal({
      title: customTitle || "Book 1:1 Personalised Counselling",
      subtitle: customSubtitle || "Select your course and our academic experts will assist you",
      submitButtonText: "Book Counselling",
    });
  };

  const getMediaUrl = (mediaObj) => {
    if (!mediaObj) return null;
    if (typeof mediaObj === "string") return mediaObj;
    if (typeof mediaObj === "object" && mediaObj.url) return mediaObj.url;
    return null;
  };

  // Carousel Settings
  const isCarousel = Boolean(
    heroData?.is_carousel && Array.isArray(heroData?.slides) && heroData.slides.length > 0
  );
  const carouselSettings = heroData?.carousel_settings || {};
  const isAutoplay = carouselSettings.autoplay !== false;
  const autoplayInterval = Number(carouselSettings.autoplay_interval) || 5000;
  const showDots = carouselSettings.show_dots !== false;
  const showArrows = Boolean(carouselSettings.show_arrows);

  // Helper to render styled dual-color headings matching each slide's exact reference
  const renderSlideHeading = (rawTitle, isLight, titleColor) => {
    if (!rawTitle) return null;

    const lower = rawTitle.toLowerCase();

    // 1. Slide 2: Compare 50+ Universities (Blue & Brown) / Choose with Confidence.
    if (lower.includes("choose with confidence") || lower.includes("compare 50+")) {
      return (
        <h1 className="text-lg sm:text-2xl md:text-[28px] lg:text-[32px] font-black leading-[1.15] tracking-tight m-0 font-sans">
          <span className="block" style={{ color: "#072C50" }}>
            Compare <span style={{ color: "#996633" }}>50+ Universities</span>
          </span>
          <span className="block" style={{ color: "#072C50" }}>
            Choose with <span style={{ color: "#996633" }}>Confidence.</span>
          </span>
        </h1>
      );
    }

    // 2. Slide 4: GOVERNOR OF KERALA (Brown) / HONORABLE SH. ARIF MOHAMMED KHAN (Blue)
    if (lower.includes("governor of kerala") || lower.includes("arif mohammed")) {
      return (
        <div className="flex flex-col space-y-0.5">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-black tracking-wide m-0" style={{ color: "#996633" }}>
            GOVERNOR OF KERALA
          </h1>
          <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-wider" style={{ color: "#072C50" }}>
            HONORABLE SH. ARIF MOHAMMED KHAN
          </span>
        </div>
      );
    }

    // 3. Slide 3: 5 Lakh+ Students Found Their Right Career Path
    if (lower.includes("5 lakh") || lower.includes("career path")) {
      return (
        <h1 className="text-lg sm:text-2xl md:text-[28px] lg:text-[32px] font-extrabold leading-[1.18] tracking-tight text-white m-0">
          <span className="block">5 Lakh+ Students Found</span>
          <span className="block text-amber-200">Their Right Career Path</span>
        </h1>
      );
    }

    // 4. Slide 1 / Default: Certifications & Online Degree Courses...
    return (
      <h1
        style={{ color: titleColor }}
        className={`text-base sm:text-xl md:text-2xl lg:text-[28px] font-extrabold leading-[1.18] tracking-tight m-0 ${isLight ? "" : "text-white drop-shadow-sm"
          }`}
      >
        {rawTitle}
      </h1>
    );
  };

  // Helper to render badge per slide style
  const renderSlideBadge = (badgeText, isLight) => {
    if (!badgeText) return null;

    const lower = badgeText.toLowerCase();

    // #1 School of Online & Distance Education
    if (badgeText.startsWith("#1") || lower.includes("school of online")) {
      return (
        <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm tracking-wide">
          <span className="font-serif italic font-extrabold text-amber-300 text-sm sm:text-base">#1</span>
          <span className="font-medium text-slate-100 italic">{badgeText.replace(/^#1\s*/i, "")}</span>
        </div>
      );
    }

    // Standard Styled Badge (Rounded rectangle with star)
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] sm:text-xs font-semibold tracking-normal border shadow-2xs ${isLight
            ? "bg-[#996633]/8 text-[#996633] border-[#996633]/30"
            : "bg-white/10 text-amber-200 border-white/20 backdrop-blur-md"
          }`}
      >
        <span className="text-amber-500 font-bold text-xs leading-none">★</span>
        <span className="leading-tight">{badgeText.replace(/^[#★1\s*]+/i, "").trim() || badgeText}</span>
      </div>
    );
  };

  // Single Slide / Hero Renderer
  const renderHeroContent = (data, isSlide = false, index = 0) => {
    if (!data) return null;

    const badgeText = data?.badge_text;
    const title = data?.title;
    const subtitle = data?.subtitle;

    // Custom or dynamic text colors
    const bgColor = data?.background_color || "#0f1f38";
    const isLight = isLightColor(bgColor);

    const titleColor = data?.title_color || (isLight ? "#072C50" : "#ffffff");
    const subtitleColor = data?.subtitle_color || (isLight ? "#996633" : "#cbd5e1");

    // Dynamic Categories from CRM
    const categoryItems = Array.isArray(data?.categories)
      ? data.categories
        .filter(Boolean)
        .map((c) => ({
          _id: c?._id || c,
          name: c?.name || (typeof c === "string" ? c : ""),
          url: `/${c?.slug || (c?.name ? c.name.toLowerCase().replace(/\s+/g, "-") : "")}`,
        }))
        .filter((item) => Boolean(item.name))
      : [];

    // Background Banner Images from DB / API
    const desktopBannerUrl =
      getMediaUrl(data?.banner_image) ||
      getMediaUrl(data?.background_image) ||
      getMediaUrl(data?.bgImage);

    const mobileBannerUrl =
      getMediaUrl(data?.banner_image_mobile) || desktopBannerUrl;

    const primaryBtn = data?.primary_button;
    const secondaryBtn = data?.secondary_button;

    const handlePrimaryClick = (e) => {
      if (primaryBtn?.is_modal) {
        e?.preventDefault();
        openCounsellingForm(primaryBtn.text, subtitle);
      }
    };

    const handleSecondaryClick = (e) => {
      if (secondaryBtn?.is_modal) {
        e?.preventDefault();
        openCounsellingForm(secondaryBtn.text, subtitle);
      }
    };

    return (
      <div
        key={data?._id || index}
        style={{ backgroundColor: bgColor }}
        className="relative w-full overflow-hidden aspect-4/1 min-h-40 sm:min-h-50 md:min-h-60 lg:min-h-68 max-h-85 flex items-center select-none"
      >
        {/* 1. 100% FULL-WIDTH BACKGROUND IMAGE (NO WHITE BORDER / ZERO CROPPING AT 4:1 RATIO) */}
        {desktopBannerUrl && (
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
            {/* Desktop Background Banner Image */}
            <div className={`relative w-full h-full ${mobileBannerUrl && mobileBannerUrl !== desktopBannerUrl ? "hidden md:block" : "block"}`}>
              <Image
                src={desktopBannerUrl}
                alt={title || "Hero banner"}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="100vw"
                className="object-fit object-center"
              />
            </div>

            {/* Mobile Background Banner Image */}
            {mobileBannerUrl && mobileBannerUrl !== desktopBannerUrl && (
              <div className="block md:hidden relative w-full h-full">
                <Image
                  src={mobileBannerUrl}
                  alt={title || "Hero mobile banner"}
                  fill
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            )}
          </div>
        )}

        {/* 2. FOREGROUND TEXT CONTENT & CTA (Pixel-Perfect Match to Reference Design) */}
        <Container className="relative z-10 w-full pointer-events-auto">
          <div className="w-full max-w-[50%] sm:max-w-[48%] md:max-w-[46%] lg:max-w-[44%] flex flex-col items-start space-y-1.5 sm:space-y-2 lg:space-y-2.5">

            {/* Top Badge */}
            {renderSlideBadge(badgeText, isLight)}

            {/* Main Heading with Dual Colors (#072C50 Blue + #996633 Brown) */}
            {renderSlideHeading(title, isLight, titleColor)}

            {/* Subtitle */}
            {subtitle && (
              <p
                style={{ color: isLight ? "#475569" : subtitleColor }}
                className="text-xs sm:text-[13px] leading-relaxed font-normal line-clamp-2 max-w-sm sm:max-w-md lg:max-w-lg m-0"
              >
                {subtitle}
              </p>
            )}

            {/* Category Tags */}
            {categoryItems && categoryItems.length > 0 && (
              <div className="hidden sm:flex flex-wrap gap-1 pt-0.5">
                {categoryItems.map((item, tIdx) => (
                  <Link
                    key={item._id || tIdx}
                    href={item.url || "#"}
                    className={`px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium transition-all shadow-2xs ${isLight
                        ? "bg-white/90 text-[#072C50] border border-[#EEC471]/40 hover:border-[#EEC471] hover:bg-amber-50"
                        : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Action Buttons: Soft Golden Gradient (#F6DE95 to #EEC471) with #072C50 Text */}
            <div className="flex flex-wrap items-center gap-2.5 pt-0.5 sm:pt-1">
              {primaryBtn?.enabled !== false && primaryBtn?.text && (
                primaryBtn?.is_modal ? (
                  <button
                    type="button"
                    onClick={handlePrimaryClick}
                    style={{
                      background: "linear-gradient(180deg, #F6DE95 0%, #EEC471 100%)",
                      color: "#072C50",
                    }}
                    className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-md font-bold text-xs sm:text-sm shadow-sm shadow-amber-900/10 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap border border-[#EEC471]/60"
                  >
                    {primaryBtn.text}
                  </button>
                ) : (
                  <Link
                    href={primaryBtn?.url || "/counselling"}
                    style={{
                      background: "linear-gradient(180deg, #F6DE95 0%, #EEC471 100%)",
                      color: "#072C50",
                    }}
                    className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-md font-bold text-xs sm:text-sm shadow-sm shadow-amber-900/10 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap border border-[#EEC471]/60"
                  >
                    {primaryBtn.text}
                  </Link>
                )
              )}

              {secondaryBtn?.enabled && secondaryBtn?.text && (
                secondaryBtn?.is_modal ? (
                  <button
                    type="button"
                    onClick={handleSecondaryClick}
                    className={`hidden sm:inline-block px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-md font-semibold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${isLight
                        ? "bg-[#072C50]/10 hover:bg-[#072C50]/15 border border-[#072C50]/20 text-[#072C50]"
                        : "bg-white/15 hover:bg-white/20 border border-white/25 text-white backdrop-blur-md"
                      }`}
                  >
                    {secondaryBtn.text}
                  </button>
                ) : (
                  <Link
                    href={secondaryBtn?.url || "/courses"}
                    className={`hidden sm:inline-block px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-md font-semibold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${isLight
                        ? "bg-[#072C50]/10 hover:bg-[#072C50]/15 border border-[#072C50]/20 text-[#072C50]"
                        : "bg-white/15 hover:bg-white/20 border border-white/25 text-white backdrop-blur-md"
                      }`}
                  >
                    {secondaryBtn.text}
                  </Link>
                )
              )}
            </div>

          </div>
        </Container>
      </div>
    );
  };

  return (
    <section id="hero-section" className="relative w-full overflow-hidden">
      {isCarousel ? (
        <Carousel
          autoplay={isAutoplay}
          autoplaySpeed={autoplayInterval}
          dots={showDots}
          arrows={showArrows}
          effect="fade"
          className="w-full hero-carousel"
        >
          {heroData.slides.map((slide, idx) => renderHeroContent(slide, true, idx))}
        </Carousel>
      ) : (
        renderHeroContent(heroData, false, 0)
      )}
    </section>
  );
}

export default Hero;
