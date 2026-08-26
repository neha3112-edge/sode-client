"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "antd";
import { Container } from "@/components/common/Container";
import { useFormModal } from "@/hooks/useFormModal";

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

  // Single Slide / Hero Renderer
  const renderHeroContent = (data, isSlide = false, index = 0) => {
    if (!data) return null;

    const badgeText = data?.badge_text;
    const title = data?.title;
    const subtitle = data?.subtitle;

    // Pure Dynamic Categories from CRM Reference (ref: Category)
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

    // Purely dynamic Background Banner Image from DB / API
    const bgBannerUrl =
      getMediaUrl(data?.banner_image) ||
      getMediaUrl(data?.background_image) ||
      getMediaUrl(data?.bgImage);

    const primaryBtn = data?.primary_button;
    const secondaryBtn = data?.secondary_button;
    const bgColor = data?.background_color || "#172744";

    const handlePrimaryClick = (e) => {
      if (primaryBtn?.is_modal) {
        e.preventDefault();
        openCounsellingForm(primaryBtn.text, subtitle);
      }
    };

    const handleSecondaryClick = (e) => {
      if (secondaryBtn?.is_modal) {
        e.preventDefault();
        openCounsellingForm(secondaryBtn.text, subtitle);
      }
    };

    return (
      <div
        key={data?._id || index}
        style={{ backgroundColor: bgColor }}
        className="relative w-full overflow-hidden h-64 min-[420px]:h-72 sm:h-80 md:h-[340px] lg:h-[360px] flex items-center"
      >
        {/* 1. DYNAMIC BACKGROUND BANNER IMAGE (PURELY FROM API) */}
        {bgBannerUrl && (
          <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
            <Image
              src={bgBannerUrl}
              alt={title || "Hero banner"}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              sizes="100vw"
              className="object-cover object-right md:object-center"
            />
            {/* Subtle mobile readability gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#14233c]/95 via-[#14233c]/75 to-transparent md:from-transparent md:via-transparent" />
          </div>
        )}

        {/* 2. FOREGROUND TEXT CONTENT (Aligned with unified Container) */}
        <Container className="relative z-10">
          <div className="max-w-md sm:max-w-lg lg:max-w-xl flex flex-col items-start space-y-2.5 sm:space-y-3 lg:space-y-3.5">
            
            {/* Top Badge */}
            {badgeText && (
              <div className="inline-flex items-center gap-1.5 text-white font-serif text-xs sm:text-sm tracking-wide drop-shadow-sm">
                <span className="italic font-bold text-amber-300">#1</span>
                <span className="italic font-medium text-slate-100">{badgeText.replace(/^#1\s*/i, "")}</span>
              </div>
            )}

            {/* Main Heading */}
            {title && (
              <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-[28px] font-extrabold leading-[1.2] text-white tracking-tight drop-shadow-md">
                {title}
              </h1>
            )}

            {/* Subtitle */}
            {subtitle && (
              <p className="text-[11px] sm:text-xs md:text-sm text-slate-200 leading-snug font-normal line-clamp-2 max-w-lg drop-shadow">
                {subtitle}
              </p>
            )}

            {/* Category Tags / Pills (Linked to CRM Categories) */}
            {categoryItems && categoryItems.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {categoryItems.map((item, tIdx) => (
                  <Link
                    key={item._id || tIdx}
                    href={item.url || "#"}
                    className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/35 text-[11px] sm:text-xs text-white font-medium transition-all backdrop-blur-md shadow-sm active:scale-95"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1 w-full sm:w-auto">
              {primaryBtn?.enabled !== false && primaryBtn?.text && (
                primaryBtn?.is_modal ? (
                  <button
                    type="button"
                    onClick={handlePrimaryClick}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center cursor-pointer"
                  >
                    {primaryBtn.text}
                  </button>
                ) : (
                  <Link
                    href={primaryBtn?.url || "/counselling"}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center cursor-pointer"
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
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white/15 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all duration-200 text-center cursor-pointer"
                  >
                    {secondaryBtn.text}
                  </button>
                ) : (
                  <Link
                    href={secondaryBtn?.url || "/courses"}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white/15 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all duration-200 text-center cursor-pointer"
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
          className="w-full"
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
