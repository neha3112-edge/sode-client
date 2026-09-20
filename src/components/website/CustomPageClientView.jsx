"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "antd";
import { Container } from "@/components/common/Container";
import SafeHtmlRenderer from "@/components/website/SafeHtmlRenderer";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { getAssetPath } from "@/lib/utils";
import { useFormModal } from "@/hooks/useFormModal";
import { Hero } from "@/components/website/Hero";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("embed/")) return url;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0`;
  }
  return url;
}

function getMediaUrl(media) {
  if (!media) return null;
  if (typeof media === "string") return media;
  return media.url || media.path || null;
}

// Badge color theming per pageContext
const PAGE_CONTEXT_BADGE = {
  home: { bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-200" },
  university: { bg: "bg-blue-50", text: "text-blue-900", border: "border-blue-200" },
  course: { bg: "bg-rose-50", text: "text-rose-900", border: "border-rose-200" },
  landing: { bg: "bg-violet-50", text: "text-violet-900", border: "border-violet-200" },
  blog: { bg: "bg-emerald-50", text: "text-emerald-900", border: "border-emerald-200" },
  custom_page: { bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-200" },
  other: { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-200" },
};

function HeroSection({ hero }) {
  const { openFormModal } = useFormModal();

  if (!hero || !hero.enabled || hero.heroType === "none") return null;

  if (hero.heroType === "hero_ref" && hero.heroRef) {
    return <Hero initialHeroData={hero.heroRef} />;
  }

  if (hero.heroType === "custom" && hero.customHtml) {
    return (
      <div className="w-full">
        <SafeHtmlRenderer html={hero.customHtml} />
      </div>
    );
  }

  // Fixed UI Template
  const bgCol = (hero.backgroundColor && hero.backgroundColor !== "#fff" && hero.backgroundColor !== "#ffffff") ? hero.backgroundColor : "#072C50";
  const cardBg = hero.cardBackgroundColor || "transparent";
  const isTransparentCard = !cardBg || cardBg === "transparent" || cardBg === "none";

  // Background image overlay (optional)
  const bgImgUrl = getMediaUrl(hero.backgroundImage);

  // Right column: video > bannerImage > placeholder
  const videoUrl = hero.videoUrl || "";
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  const bannerUrl = getMediaUrl(hero.bannerImage);

  // pageContext badge theming
  const ctx = hero.pageContext || "custom_page";
  const badge = PAGE_CONTEXT_BADGE[ctx] || PAGE_CONTEXT_BADGE.custom_page;
  const badgeIconUrl = getMediaUrl(hero.badgeIcon);

  const title = hero.title || "";
  const highlight = hero.titleHighlight || "";
  const desc = hero.description || "";

  const buttons = hero.buttons && hero.buttons.length > 0 ? hero.buttons : [
    { text: "Get 100% Free Counseling", variant: "green", icon: "counseling", enabled: true, isModal: true },
    { text: "Listen Podcast", variant: "amber", icon: "podcast", enabled: true, url: "#podcast" },
  ];

  const universities = hero.universities || [];
  const showPartners = hero.showPartners === true;

  // layoutVariant controls grid columns
  const layoutVariant = hero.layoutVariant || "split";
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
      style={{ backgroundColor: bgCol }}
      className="w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-10 border-b border-slate-800 relative overflow-hidden"
    >
      {bgImgUrl && (
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
          <Image
            src={getAssetPath(bgImgUrl)}
            alt=""
            fill
            priority
            loading="eager"
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        </div>
      )}

      <div
        style={{ backgroundColor: isTransparentCard ? "transparent" : cardBg }}
        className={`relative z-10 w-full md:max-w-4xl lg:max-w-265 2xl:max-w-275 mx-auto ${isTransparentCard
          ? "p-0"
          : "rounded-2xl shadow-xl border border-slate-200/60 p-3 sm:p-4 md:p-5"
          }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left / Center Column */}
          <div className={`${leftCols} space-y-3 sm:space-y-4 ${textAlign} ${isCentered ? "mx-auto" : "max-w-xl"}`}>
            {hero.badgeText && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${badge.bg} ${badge.text} text-xs font-bold rounded-full border ${badge.border} tracking-wide`}>
                {badgeIconUrl && (
                  <span className="relative w-4 h-4 shrink-0 inline-block">
                    <Image src={getAssetPath(badgeIconUrl)} alt="" fill sizes="16px" className="object-contain" />
                  </span>
                )}
                {hero.badgeText}
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.6rem] font-black tracking-tight leading-tight m-0">
              <span className="text-rose-500">{title}</span>{" "}
              <span className={isTransparentCard ? "text-white" : "text-slate-900"}>{highlight}</span>
            </h1>

            {hero.subtitle && (
              <p className={`text-sm sm:text-base font-semibold ${isTransparentCard ? "text-slate-200" : "text-slate-700"} m-0 leading-snug`}>
                {hero.subtitle}
              </p>
            )}

            {desc && (
              <p className={`text-sm sm:text-[15px] ${isTransparentCard ? "text-slate-300" : "text-slate-600"} leading-relaxed line-clamp-3 m-0 font-normal`}>
                {desc}
              </p>
            )}

            {/* CTA Buttons */}
            <div className={`flex flex-wrap items-center gap-3 pt-2 ${btnAlign}`}>
              {buttons.filter((b) => b.enabled !== false).map((btn, idx) => {
                const isPodcast = btn.icon === "podcast" || btn.variant === "amber";
                const isModalBtn = btn.isModal || btn.url === "#counseling" || (!btn.url && !isPodcast);
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
                  outline: "bg-transparent border-2 border-white text-white hover:bg-white/10",
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
                    alt={hero.title || "Hero Banner"}
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

        {/* Bottom Strip: Partner Universities Ant Design Carousel */}
        {showPartners && (() => {
          const partnerItems = [
            ...universities.map((u, i) => {
              const logoRaw = u.image?.url || u.image?.path || (typeof u.image === "string" ? u.image : null);
              const url = u.coursePageSlug
                ? (u.coursePageSlug.includes("/") ? `/university/${u.coursePageSlug}` : `/courses/${u.coursePageSlug}`)
                : u.slug
                  ? `/university/${u.slug}`
                  : null;
              return {
                id: u._id || `uni-${i}`,
                title: u.name || "University",
                logoUrl: logoRaw ? getAssetPath(logoRaw) : null,
                url,
              };
            }),
            ...(hero.partnerLogos || []).map((pl, i) => {
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

          // If fewer than 6 items, repeat so infinite carousel has enough items to scroll smoothly
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

export default function CustomPageClientView({ page, slug, heroData = null }) {
  const pageTitle = page?.title || "";
  const showBreadcrumbs = page?.showBreadcrumbs !== false;
  useBreadcrumb(
    showBreadcrumbs && pageTitle
      ? {
        items: [
          { label: "Home", href: "/" },
          { label: pageTitle },
        ],
        backButton: {
          label: "Home",
          href: "/",
        },
      }
      : { hidden: true },
    [pageTitle, showBreadcrumbs]
  );

  // Execute custom JavaScript if present from builder
  useEffect(() => {
    if (!page?.js) return;
    try {
      const scriptFn = new Function(page.js);
      scriptFn();
    } catch (err) {
      console.error("[CustomPage] Error executing custom JS:", err);
    }
  }, [page?.js]);

  if (!page || (!page.content && !page.hero?.enabled && !heroData)) return null;

  const isFullWidth = page?.layout === "full-width";

  return (
    <div className="w-full bg-white text-gray-800 antialiased min-h-screen">
      {/* ── Custom CSS from builder / editor ── */}
      {page?.css && (
        <style
          id={`custom-page-css-${page._id || "style"}`}
          dangerouslySetInnerHTML={{ __html: page.css }}
        />
      )}

      {/* ── Hero Section:
          1. If custom page has hero enabled (fixed or custom), show its own page.hero
          2. If heroType === 'hero_ref', use global Hero model
          3. If page has no hero configured, fallback to global Hero model if one matches slug
      ── */}
      {page?.hero?.enabled && page?.hero?.heroType !== "hero_ref" ? (
        <HeroSection hero={page.hero} />
      ) : heroData ? (
        <Hero initialHeroData={heroData} />
      ) : page?.hero?.enabled ? (
        <HeroSection hero={page.hero} />
      ) : null}

      {/* ── Pure Editor Content ── */}
      {page.content && (
        <div className="w-full py-6 md:py-10">
          {isFullWidth ? (
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <SafeHtmlRenderer html={page.content} />
            </div>
          ) : (
            <Container>
              <SafeHtmlRenderer html={page.content} />
            </Container>
          )}
        </div>
      )}
    </div>
  );
}
