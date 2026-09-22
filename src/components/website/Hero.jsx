"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "antd";
import { Container } from "@/components/common/Container";
import { useFormModal } from "@/hooks/useFormModal";
import SafeHtmlRenderer from "@/components/website/SafeHtmlRenderer";
import { getAssetPath } from "@/lib/utils";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("embed/")) return url;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0`;
  }
  return url;
}

const PAGE_CONTEXT_BADGE = {
  home: { bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-200" },
  university: { bg: "bg-blue-50", text: "text-blue-900", border: "border-blue-200" },
  course: { bg: "bg-rose-50", text: "text-rose-900", border: "border-rose-200" },
  landing: { bg: "bg-violet-50", text: "text-violet-900", border: "border-violet-200" },
  blog: { bg: "bg-emerald-50", text: "text-emerald-900", border: "border-emerald-200" },
  custom_page: { bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-200" },
  other: { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-200" },
};

export function Hero({ initialHeroData = null }) {
  const { openFormModal } = useFormModal();

  const heroData = initialHeroData?.result || initialHeroData || {};
  if (!heroData || Object.keys(heroData).length === 0 || (!heroData.title && !heroData.custom_html && !heroData.customHtml && (!heroData.slides || heroData.slides.length === 0))) {
    return null;
  }

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

  const heroType = heroData.hero_type || heroData.heroType || "carousel";

  // ==========================================
  // 💻 1. CUSTOM HTML HERO (like CustomPage)
  // ==========================================
  if (heroType === "custom" && (heroData.custom_html || heroData.customHtml)) {
    return (
      <div className="w-full">
        <SafeHtmlRenderer html={heroData.custom_html || heroData.customHtml} />
      </div>
    );
  }

  // ==========================================
  // 🎨 2. FIXED UI TEMPLATE HERO (like CustomPage)
  // ==========================================
  if (heroType === "fixed") {
    const bgCol =
      heroData.background_color ||
      heroData.backgroundColor ||
      "#072C50";
    const cardBg =
      heroData.card_background_color ||
      heroData.cardBackgroundColor ||
      "transparent";
    const isTransparentCard = !cardBg || cardBg === "transparent" || cardBg === "none";

    const bgImgUrl =
      getMediaUrl(heroData.background_image) ||
      getMediaUrl(heroData.backgroundImage);

    const videoUrl = heroData.video_url || heroData.videoUrl || "";
    const embedUrl = getYouTubeEmbedUrl(videoUrl);
    const bannerUrl =
      getMediaUrl(heroData.banner_image) ||
      getMediaUrl(heroData.bannerImage);

    const ctx = heroData.page_context || heroData.pageContext || "custom_page";
    const badge = PAGE_CONTEXT_BADGE[ctx] || PAGE_CONTEXT_BADGE.custom_page;
    const badgeIconUrl =
      getMediaUrl(heroData.badge_icon) ||
      getMediaUrl(heroData.badgeIcon);

    const title = heroData.title || "";
    const highlight = heroData.highlight_text || heroData.titleHighlight || "";
    const desc = heroData.description || "";

    const rawButtons =
      Array.isArray(heroData.buttons) && heroData.buttons.length > 0
        ? heroData.buttons
        : heroData.primary_button
          ? [
            heroData.primary_button,
            ...(heroData.secondary_button?.enabled ? [heroData.secondary_button] : []),
          ]
          : [
            { text: "Get 100% Free Counseling", variant: "green", icon: "counseling", enabled: true, is_modal: true },
            { text: "Listen Podcast", variant: "amber", icon: "podcast", enabled: true, url: "#podcast" },
          ];

    const universities = heroData.universities || [];
    const showPartners = Boolean(heroData.show_partners || heroData.showPartners);

    const layoutVariant = heroData.layout_variant || heroData.layoutVariant || "split";
    const isSplit = layoutVariant === "split";
    const isCentered = layoutVariant === "centered" || layoutVariant === "fullwidth";
    const isMinimal = layoutVariant === "minimal";
    const leftCols = isCentered ? "lg:col-span-12" : isMinimal ? "lg:col-span-9" : "lg:col-span-7";
    const rightCols = "lg:col-span-5";
    const showRight = isSplit || isMinimal;
    const textAlign = isCentered ? "text-center" : "text-left";
    const btnAlign = isCentered ? "justify-center" : "";

    return (
      <section
        style={{
          backgroundColor: bgCol,
          ...(bgImgUrl
            ? { backgroundImage: `url(${getAssetPath(bgImgUrl)})`, backgroundSize: "cover", backgroundPosition: "center" }
            : {}),
        }}
        className="w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-10 border-b border-slate-800 relative overflow-hidden"
      >
        {bgImgUrl && <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />}

        <div
          style={{ backgroundColor: isTransparentCard ? "transparent" : cardBg }}
          className={`relative z-10 w-full md:max-w-4xl lg:max-w-265 2xl:max-w-275 mx-auto ${isTransparentCard
            ? "p-0"
            : "rounded-2xl shadow-xl border border-slate-200/60 p-6 sm:p-8 md:p-10"
            }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left / Center Column */}
            <div className={`${leftCols} space-y-3 sm:space-y-4 ${textAlign} ${isCentered ? "mx-auto" : "max-w-xl"}`}>
              {heroData.badge_text && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${badge.bg} ${badge.text} text-xs font-bold rounded-full border ${badge.border} tracking-wide`}>
                  {badgeIconUrl && (
                    <span className="relative w-4 h-4 shrink-0 inline-block">
                      <Image src={getAssetPath(badgeIconUrl)} alt="" fill sizes="16px" className="object-contain" />
                    </span>
                  )}
                  {heroData.badge_text}
                </span>
              )}

              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.6rem] font-black tracking-tight leading-tight m-0">
                <span className="text-rose-500">{title}</span>{" "}
                <span className={isTransparentCard ? "text-white" : "text-slate-900"}>{highlight}</span>
              </h1>

              {heroData.subtitle && (
                <p className={`text-sm sm:text-base font-semibold ${isTransparentCard ? "text-slate-200" : "text-slate-700"} m-0 leading-snug`}>
                  {heroData.subtitle}
                </p>
              )}

              {desc && (
                <p className={`text-sm sm:text-[15px] ${isTransparentCard ? "text-slate-300" : "text-slate-600"} leading-relaxed line-clamp-3 m-0 font-normal`}>
                  {desc}
                </p>
              )}

              {/* CTA Buttons */}
              <div className={`flex flex-wrap items-center gap-3 pt-2 ${btnAlign}`}>
                {rawButtons.filter((b) => b.enabled !== false).map((btn, idx) => {
                  const isPodcast = btn.icon === "podcast" || btn.variant === "amber";
                  const isModalBtn = btn.is_modal || btn.isModal || btn.url === "#counseling" || (!btn.url && !isPodcast);
                  const buttonContent = isPodcast ? (
                    <>
                      <span className="w-5 h-5 rounded-full bg-linear-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-sm shrink-0">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                        </svg>
                      </span>
                      <span>{btn.text}</span>
                    </>
                  ) : (
                    <span>{btn.text}</span>
                  );

                  const variantClass = {
                    gold: "bg-amber-400 hover:bg-amber-500 text-slate-900",
                    blue: "bg-blue-600 hover:bg-blue-700 text-white",
                    gradient: "bg-gradient-to-r from-rose-500 to-violet-600 text-white",
                    dark: "bg-slate-800 hover:bg-slate-900 text-white",
                    outline: isTransparentCard ? "bg-transparent border-2 border-white text-white hover:bg-white/10" : "bg-transparent border-2 border-slate-700 text-slate-700 hover:bg-slate-100",
                    glass: "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20",
                    solid: "bg-white text-slate-900 hover:bg-slate-100",
                    amber: "bg-amber-50/80 hover:bg-amber-100 border border-amber-200/80 text-slate-800",
                    green: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg",
                  }[btn.variant] || "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg";
                  const baseClass = `inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer ${variantClass}`;

                  if (isModalBtn) {
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          openFormModal({
                            title: btn.text || "Book 1:1 Personalised Counselling",
                            subtitle: "Select your course and our academic experts will assist you",
                            submitButtonText: btn.text || "Book Counselling",
                          })
                        }
                        className={baseClass}
                      >
                        {buttonContent}
                      </button>
                    );
                  }

                  if (btn.url && btn.url.startsWith("/")) {
                    return (
                      <Link key={idx} href={btn.url} className={baseClass}>
                        {buttonContent}
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={idx}
                      href={btn.url || "#"}
                      target={btn.url?.startsWith("http") ? "_blank" : undefined}
                      rel={btn.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={baseClass}
                    >
                      {buttonContent}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Video > BannerImage > Placeholder */}
            {showRight && (
              <div className={`${rightCols} w-full flex justify-center items-center`}>
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title="Program Overview Video"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : bannerUrl ? (
                    <Image
                      src={getAssetPath(bannerUrl)}
                      alt={title || "Hero Banner"}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-slate-900 to-blue-950 p-4 text-center">
                      <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white shadow mb-2">
                        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-slate-200">Program Overview Video</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Strip: Partner Universities Carousel */}
          {showPartners && (() => {
            const partnerItems = [
              ...universities.map((u, i) => {
                const logoRaw = u.image?.url || u.image?.path || (typeof u.image === "string" ? u.image : null);
                const url = u.coursePageSlug
                  ? (u.coursePageSlug.includes("/") ? `/universities/${u.coursePageSlug}` : `/courses/${u.coursePageSlug}`)
                  : u.slug
                    ? `/universities/${u.slug}`
                    : null;
                return {
                  id: u._id || `uni-${i}`,
                  title: u.name || "University",
                  logoUrl: logoRaw ? getAssetPath(logoRaw) : null,
                  url,
                };
              }),
              ...(heroData.partner_logos || heroData.partnerLogos || []).map((pl, i) => {
                const logoRaw = pl.logo?.url || pl.logo?.path || pl.image?.url || pl.image?.path;
                return {
                  id: pl._id || `partner-${i}`,
                  title: pl.title || "Partner",
                  logoUrl: logoRaw ? getAssetPath(logoRaw) : null,
                  url: pl.url || null,
                };
              }),
            ];

            if (partnerItems.length === 0) return null;

            const carouselItems = partnerItems.length < 6
              ? [...partnerItems, ...partnerItems, ...partnerItems]
              : partnerItems;

            const numSlides = Math.min(carouselItems.length, 5);

            return (
              <div className="mt-4 pt-3">
                <Carousel
                  autoplay={true}
                  autoplaySpeed={2800}
                  pauseOnHover={true}
                  dots={false}
                  infinite={true}
                  draggable={true}
                  swipeToSlide={true}
                  slidesToShow={numSlides}
                  slidesToScroll={1}
                  responsive={[
                    { breakpoint: 1280, settings: { slidesToShow: Math.min(carouselItems.length, 5), slidesToScroll: 1 } },
                    { breakpoint: 1024, settings: { slidesToShow: Math.min(carouselItems.length, 4), slidesToScroll: 1 } },
                    { breakpoint: 768, settings: { slidesToShow: Math.min(carouselItems.length, 3), slidesToScroll: 1 } },
                    { breakpoint: 480, settings: { slidesToShow: Math.min(carouselItems.length, 2), slidesToScroll: 1 } },
                  ]}
                  className="w-full"
                >
                  {carouselItems.map((item, idx) => {
                    const itemKey = `${item.id}-${idx}`;
                    const content = item.logoUrl ? (
                      <div className="relative w-28 sm:w-36 h-11 sm:h-16 shrink-0 mx-auto flex items-center justify-center">
                        <Image
                          src={item.logoUrl}
                          alt={item.title || "University"}
                          fill
                          sizes="(max-width: 768px) 112px, 144px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-9 sm:h-11 w-full flex items-center justify-center px-3 rounded-md bg-white/10 text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                        {item.title}
                      </div>
                    );

                    return (
                      <div key={itemKey} className="px-3 sm:px-4">
                        <div className="transition-all opacity-95 hover:opacity-100 flex items-center justify-center">
                          {item.url ? (
                            item.url.startsWith("/") ? (
                              <Link href={item.url} className="w-full flex items-center justify-center">
                                {content}
                              </Link>
                            ) : (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center"
                              >
                                {content}
                              </a>
                            )
                          ) : (
                            content
                          )}
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            );
          })()}
        </div>
      </section>
    );
  }

  // ==========================================
  // 🎠 3. CAROUSEL SLIDER HERO (Existing Default)
  // ==========================================
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

    // Per-slide background_color, fallback to main hero color, then default
    const bgColor = data?.background_color || heroData?.background_color || "#1e2f4d";

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
          backgroundColor: bgColor,
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
          <div className="w-full max-w-[70%] sm:max-w-[50%] md:max-w-[46%] lg:max-w-[44%] flex flex-col items-start space-y-1.5 sm:space-y-2 md:space-y-2.5">
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
