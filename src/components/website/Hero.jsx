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

  const isCarousel = Boolean(
    heroData?.is_carousel && Array.isArray(heroData?.slides) && heroData.slides.length > 0
  );
  const carouselSettings = heroData?.carousel_settings || {};
  const isAutoplay = carouselSettings.autoplay !== false;
  const autoplayInterval = Number(carouselSettings.autoplay_interval) || 5000;
  const showDots = carouselSettings.show_dots !== false;
  const showArrows = Boolean(carouselSettings.show_arrows);

  const renderSlideHeading = (rawTitle, highlightText, isLight, titleColor) => {
    if (!rawTitle) return null;

    const defaultColor = titleColor || (isLight ? "#072C50" : "#ffffff");
    const highlightColor = isLight ? "#965D2C" : "#F6DE95";
    const lines = rawTitle.split("\n");

    return (
      <div className="flex flex-col space-y-0.5 sm:space-y-1">
        {lines.map((line, lIdx) => {
          const isGovernorHeader = line.toUpperCase() === "GOVERNOR OF KERALA";
          const isGovernorSub = line.toUpperCase().includes("ARIF MOHAMMED KHAN");

          if (isGovernorHeader) {
            return (
              <h1
                key={lIdx}
                style={{ color: "#965D2C" }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[36px] font-black tracking-wide leading-none m-0 font-sans uppercase"
              >
                {line}
              </h1>
            );
          }

          if (isGovernorSub) {
            return (
              <span
                key={lIdx}
                style={{ color: "#072C50" }}
                className="text-xs sm:text-sm md:text-[15px] lg:text-[16px] font-black tracking-wide leading-snug m-0 uppercase"
              >
                {line}
              </span>
            );
          }

          let lineContent = line;
          if (highlightText && line.toLowerCase().includes(highlightText.toLowerCase())) {
            const idx = line.toLowerCase().indexOf(highlightText.toLowerCase());
            const before = line.slice(0, idx);
            const match = line.slice(idx, idx + highlightText.length);
            const after = line.slice(idx + highlightText.length);

            lineContent = (
              <>
                {before}
                <span style={{ color: highlightColor }}>{match}</span>
                {after}
              </>
            );
          }

          return (
            <h1
              key={lIdx}
              style={{ color: defaultColor }}
              className="text-lg sm:text-2xl md:text-[28px] lg:text-[32px] font-black leading-[1.15] tracking-tight m-0 font-sans"
            >
              {lineContent}
            </h1>
          );
        })}
      </div>
    );
  };

  const renderSlideBadge = (badgeText, isLight) => {
    if (!badgeText) return null;

    if (badgeText.startsWith("#1")) {
      return (
        <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm tracking-wide">
          <span className="font-serif italic font-extrabold text-amber-300 text-sm sm:text-base">#1</span>
          <span className="font-medium text-slate-100 italic">{badgeText.replace(/^#1\s*/, "")}</span>
        </div>
      );
    }

    const cleanText = badgeText.replace(/^[#★⭐\s*]+/i, "").trim() || badgeText;

    return (
      <div
        style={{
          borderColor: isLight ? "#B88B4A" : "rgba(255, 255, 255, 0.35)",
          backgroundColor: isLight ? "rgba(253, 247, 236, 0.9)" : "rgba(255, 255, 255, 0.1)",
        }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] sm:text-xs font-bold tracking-normal border shadow-xs"
      >
        <span className="text-amber-400 font-bold text-xs leading-none">⭐</span>
        <span style={{ color: isLight ? "#072C50" : "#ffffff" }} className="leading-tight font-bold">
          {cleanText}
        </span>
      </div>
    );
  };

  const renderHeroContent = (data, isSlide = false, index = 0) => {
    if (!data) return null;

    const badgeText = data?.badge_text;
    const title = data?.title;
    const highlightText = data?.highlight_text;
    const subtitle = data?.subtitle;

    const isLight = data?.title_color === "#072C50" || data?.title_color === "#965D2C";
    const titleColor = data?.title_color || (isLight ? "#072C50" : "#ffffff");
    const subtitleColor = data?.subtitle_color || (isLight ? "#072C50" : "#cbd5e1");

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
        style={{
          backgroundImage: desktopBannerUrl ? `url("${desktopBannerUrl}")` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative w-full overflow-hidden aspect-[1.9/1] sm:aspect-[3.2/1] md:aspect-[3.8/1] lg:aspect-[4/1] min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[280px] max-h-[340px] flex items-center select-none py-3.5 sm:py-0"
      >
        {desktopBannerUrl && (
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
            <div className={`relative w-full h-full ${mobileBannerUrl && mobileBannerUrl !== desktopBannerUrl ? "hidden md:block" : "block"}`}>
              <Image
                src={desktopBannerUrl}
                alt={title || "Hero banner"}
                fill
                priority={true}
                loading="eager"
                fetchPriority="high"
                unoptimized
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            {mobileBannerUrl && mobileBannerUrl !== desktopBannerUrl && (
              <div className="block md:hidden relative w-full h-full">
                <Image
                  src={mobileBannerUrl}
                  alt={title || "Hero mobile banner"}
                  fill
                  priority={true}
                  loading="eager"
                  fetchPriority="high"
                  unoptimized
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            )}
          </div>
        )}

        <Container className="relative z-10 w-full pointer-events-auto">
          <div className="w-full max-w-[62%] sm:max-w-[50%] md:max-w-[46%] lg:max-w-[44%] flex flex-col items-start space-y-1.5 sm:space-y-2 md:space-y-2.5">
            {renderSlideBadge(badgeText, isLight)}
            {renderSlideHeading(title, highlightText, isLight, titleColor)}

            {subtitle && (
              <p
                style={{ color: subtitleColor }}
                className="text-[10px] sm:text-xs md:text-[13px] leading-tight sm:leading-relaxed font-normal line-clamp-2 max-w-sm sm:max-w-md lg:max-w-lg m-0"
              >
                {subtitle}
              </p>
            )}

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

            <div className="flex flex-wrap items-center gap-2 pt-0.5 sm:pt-1">
              {primaryBtn?.enabled !== false && primaryBtn?.text && (
                primaryBtn?.is_modal ? (
                  <button
                    type="button"
                    onClick={handlePrimaryClick}
                    style={{
                      background: "linear-gradient(180deg, #F3CE7F 0%, #E7B85D 100%)",
                      color: "#072C50",
                      border: "1px solid rgba(226, 176, 83, 0.6)",
                      boxShadow: isLight ? "0 4px 12px rgba(184, 139, 74, 0.35)" : "0 4px 12px rgba(0, 0, 0, 0.25)",
                    }}
                    className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
                  >
                    {primaryBtn.text}
                  </button>
                ) : (
                  <Link
                    href={primaryBtn?.url || "/counselling"}
                    style={{
                      background: "linear-gradient(180deg, #F3CE7F 0%, #E7B85D 100%)",
                      color: "#072C50",
                      border: "1px solid rgba(226, 176, 83, 0.6)",
                      boxShadow: isLight ? "0 4px 12px rgba(184, 139, 74, 0.35)" : "0 4px 12px rgba(0, 0, 0, 0.25)",
                    }}
                    className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
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
                    className="hidden sm:inline-block px-4 py-1.5 sm:px-4.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap border border-white/30 bg-transparent text-white hover:bg-white/10"
                  >
                    {secondaryBtn.text}
                  </button>
                ) : (
                  <Link
                    href={secondaryBtn?.url || "/courses"}
                    className="hidden sm:inline-block px-4 py-1.5 sm:px-4.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap border border-white/30 bg-transparent text-white hover:bg-white/10"
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
    <section
      id="hero-section"
      className="relative w-full overflow-hidden aspect-[1.9/1] sm:aspect-[3.2/1] md:aspect-[3.8/1] lg:aspect-[4/1] min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[280px] max-h-[340px]"
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        #hero-section {
          contain: layout paint;
        }
        .hero-carousel,
        .hero-carousel .slick-slider,
        .hero-carousel .slick-list,
        .hero-carousel .slick-track,
        .hero-carousel .slick-slide > div {
          height: 100% !important;
          min-height: inherit !important;
        }
        .hero-carousel .slick-dots {
          bottom: 6px !important;
          z-index: 20 !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 6px !important;
        }
        @media (min-width: 640px) {
          .hero-carousel .slick-dots {
            bottom: 10px !important;
          }
        }
        .hero-carousel .slick-dots li {
          margin: 0 !important;
          width: auto !important;
          height: auto !important;
        }
        .hero-carousel .slick-dots li button {
          width: 7px !important;
          height: 7px !important;
          border-radius: 9999px !important;
          background: rgba(255, 255, 255, 0.45) !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
          padding: 0 !important;
        }
        .hero-carousel .slick-dots li.slick-active button {
          width: 8px !important;
          height: 8px !important;
          background: #F3CE7F !important;
          transform: scale(1.1) !important;
        }
        .hero-carousel:not(.slick-initialized) {
          display: block !important;
          position: relative !important;
          height: 100% !important;
          overflow: hidden !important;
        }
        .hero-carousel:not(.slick-initialized) > div {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
        }
        .hero-carousel:not(.slick-initialized) > div:not(:first-child) {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
      `}} />
      {isCarousel ? (
        <Carousel
          autoplay={isAutoplay}
          autoplaySpeed={autoplayInterval}
          dots={showDots}
          arrows={showArrows}
          draggable={true}
          swipe={true}
          swipeToSlide={true}
          infinite={true}
          touchMove={true}
          touchThreshold={10}
          pauseOnHover={true}
          className="w-full h-full hero-carousel cursor-grab active:cursor-grabbing"
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
