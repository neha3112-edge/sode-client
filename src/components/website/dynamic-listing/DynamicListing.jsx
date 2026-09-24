"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "antd";
import { Container } from "@/components/common/Container";
import SafeHtmlRenderer from "@/components/website/SafeHtmlRenderer";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { getAssetPath } from "@/lib/utils";
import { useFormModal } from "@/hooks/useFormModal";
import { useCompare } from "@/hooks/useCompare";
import { Hero } from "@/components/website/Hero";
import {
  Trophy,
  Star,
  ShieldCheck,
  GraduationCap,
  MapPin,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Download,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Search,
  SlidersHorizontal,
  ArrowRight,
  BookOpen,
  Award,
  Check,
  CreditCard,
} from "lucide-react";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("embed/")) return url;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
  );
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

function resolveMediaUrl(media) {
  if (!media) return null;
  return getAssetPath(media, null);
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

// ── Hero Section for Dynamic Ranking Page (Matches CustomPage HeroSection 1-to-1) ──
function DynamicHero({ hero, pageTitle, subtitle, targetCourseName }) {
  const { openFormModal } = useFormModal();

  if (!hero || hero.enabled === false || hero.heroType === "none") return null;

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
  const bgCol =
    hero.backgroundColor &&
      hero.backgroundColor !== "#fff" &&
      hero.backgroundColor !== "#ffffff"
      ? hero.backgroundColor
      : "#072C50";
  const cardBg = hero.cardBackgroundColor || "transparent";
  const isTransparentCard = !cardBg || cardBg === "transparent" || cardBg === "none";

  // Background image overlay (optional)
  const bgImgUrl = getMediaUrl(hero.backgroundImage);

  // Right column: video > bannerImage > placeholder
  const videoUrl = hero.videoUrl || "";
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  const bannerUrl = getMediaUrl(hero.bannerImage);

  // pageContext badge theming
  const ctx = hero.pageContext || "course";
  const badge = PAGE_CONTEXT_BADGE[ctx] || PAGE_CONTEXT_BADGE.course;
  const badgeIconUrl = getMediaUrl(hero.badgeIcon);

  const title = hero.title || pageTitle || "Top 10 Universities";
  const highlight = hero.titleHighlight || "";
  const desc = hero.description || subtitle || "";

  const buttons =
    hero.buttons && hero.buttons.length > 0
      ? hero.buttons
      : [
        {
          text: "Get 100% Free Counseling",
          variant: "green",
          icon: "counseling",
          enabled: true,
          isModal: true,
        },
        {
          text: "Compare All Rankings",
          variant: "outline",
          icon: "arrow",
          enabled: true,
          url: "#universities-list",
        },
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
      className="w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-10 border-b border-slate-800 relative overflow-hidden text-white"
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

      {/* Subtle top glow */}
      <div className="absolute inset-0 bg-radial-at-top-right from-blue-500/15 via-transparent to-black/30 pointer-events-none" />

      <div
        style={{ backgroundColor: isTransparentCard ? "transparent" : cardBg }}
        className={`relative z-10 w-full md:max-w-4xl lg:max-w-265 2xl:max-w-275 mx-auto ${isTransparentCard
            ? "p-0"
            : "rounded-2xl shadow-xl border border-slate-200/60 p-3 sm:p-4 md:p-5 text-slate-900"
          }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left / Center Column */}
          <div className={`${leftCols} space-y-3 sm:space-y-4 ${textAlign} ${isCentered ? "mx-auto" : "max-w-xl"}`}>
            {(hero.badgeText || targetCourseName) && (
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 ${badge.bg} ${badge.text} text-xs font-bold rounded-full border ${badge.border} tracking-wide`}
              >
                {badgeIconUrl && (
                  <span className="relative w-4 h-4 shrink-0 inline-block">
                    <Image src={getAssetPath(badgeIconUrl)} alt="" fill sizes="16px" className="object-contain" />
                  </span>
                )}
                {hero.badgeText || "Verified 2026 Rankings"}
                {targetCourseName && (
                  <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded text-[10px] font-black uppercase ml-1">
                    {targetCourseName}
                  </span>
                )}
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.6rem] font-black tracking-tight leading-tight m-0">
              <span className="text-rose-500">{title}</span>{" "}
              <span className={isTransparentCard ? "text-white" : "text-slate-900"}>{highlight}</span>
            </h1>

            {hero.subtitle && (
              <p
                className={`text-sm sm:text-base font-semibold ${isTransparentCard ? "text-slate-200" : "text-slate-700"
                  } m-0 leading-snug`}
              >
                {hero.subtitle}
              </p>
            )}

            {desc && (
              <p
                className={`text-sm sm:text-[15px] ${isTransparentCard ? "text-slate-300" : "text-slate-600"
                  } leading-relaxed line-clamp-3 m-0 font-normal`}
              >
                {desc}
              </p>
            )}

            {/* CTA Buttons */}
            <div className={`flex flex-wrap items-center gap-3 pt-2 ${btnAlign}`}>
              {buttons
                .filter((b) => b.enabled !== false)
                .map((btn, idx) => {
                  const isPodcast = btn.icon === "podcast" || btn.variant === "amber";
                  const isModalBtn =
                    btn.isModal || btn.url === "#counseling" || (!btn.url && !isPodcast);
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

                  const variantClass =
                    {
                      gold: "bg-amber-400 hover:bg-amber-500 text-slate-900",
                      blue: "bg-blue-600 hover:bg-blue-700 text-white",
                      gradient: "bg-linear-to-r from-rose-500 to-violet-600 text-white",
                      dark: "bg-slate-800 hover:bg-slate-900 text-white",
                      outline: "bg-transparent border-2 border-white text-white hover:bg-white/10",
                      glass: "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20",
                      solid: "bg-white text-slate-900 hover:bg-slate-100",
                      amber: "bg-amber-50/80 hover:bg-amber-100 border border-amber-200/80 text-slate-800",
                      green: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg",
                    }[btn.variant] ||
                    "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg";
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

          {/* Right Column: Video > BannerImage > Fallback */}
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
                  <div className="w-full h-full flex flex-col items-center justify-center text-white bg-linear-to-br from-slate-900 to-blue-950 p-4 text-center">
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
              const logoRaw =
                u.image?.url || u.image?.path || (typeof u.image === "string" ? u.image : null);
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

          const carouselItems =
            partnerItems.length < 6
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
                          <div className="w-full flex items-center justify-center">{content}</div>
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

// ── Ranked University Card Component (Horizontal Layout matching distanceeducationschool.com) ──
function RankedUniversityCard({ item, index, features, targetCourseName }) {
  const { openFormModal } = useFormModal();

  const uni = item?.university;
  if (!uni) return null;

  const rank = item?.rank || index + 1;
  const name = uni?.name || "University";
  const slug = uni?.slug || "";
  const logoUrl = resolveMediaUrl(uni?.image || uni?.logo);
  const bannerUrl = resolveMediaUrl(uni?.bannerImg);
  const defaultCampusImg =
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop";

  const city = uni?.city?.name || uni?.city || "";
  const state = uni?.state?.name || uni?.state || "";
  const location = [city, state].filter(Boolean).join(", ") || "India";

  // Clean Approvals list
  const approvalsList = (uni?.approvals || [])
    .map((a) => {
      if (typeof a === "object" && a !== null) {
        return a.code || a.name || null;
      }
      if (typeof a === "string" && !/^[0-9a-fA-F]{24}$/.test(a)) {
        return a;
      }
      return null;
    })
    .filter(Boolean);

  const approvalsJoined =
    approvalsList.length > 0 ? approvalsList.join(" | ") : "UGC | NAAC";

  // Dynamic fee calculation from Ledger
  const semFee =
    item?.fees?.formattedSemesterFees ||
    item?.fees?.formattedPerSemesterPayable ||
    (item?.fees?.semesterFees > 0
      ? `${item.fees.semesterFees.toLocaleString("en-IN")}/- Semester`
      : null) ||
    item?.customFeeText ||
    (item?.fees?.amount > 0
      ? `${item.fees.amount.toLocaleString("en-IN")}/- Semester`
      : null) ||
    "27,000/- Semester";

  const eligibilityText = item?.eligibility || "Bachelor degree in any Stream";
  const advantageText =
    item?.advantage ||
    item?.highlightReason ||
    "Campus Immersion & Placement Assistance";
  const cardLink = item?.courseSlug
    ? (item.courseSlug.includes("/") ? `/universities/${item.courseSlug}` : `/courses/${item.courseSlug}`)
    : `/universities/${slug}`;

  // Description
  const descriptionText =
    item?.description ||
    uni?.description ||
    `${name} is a recognized and accredited university. It boasts approvals from various organizations such as ${approvalsJoined}. Located in ${location}, it operates all over India. Pursuing an online ${targetCourseName || "degree"} from ${name} is very flexible, with learning hours ranging from 15 to 20 hours a week.`;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 p-5 sm:p-7 mb-6 flex flex-col md:flex-row items-stretch gap-6">
      {/* ── Left Content (approx 65-70%) ── */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          {/* Header Title with Orange Rank and Dotted Divider */}
          <div className="border-b border-dashed border-slate-300 pb-3 mb-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#072c50] flex flex-wrap items-center gap-1.5 leading-snug">
              <span className="text-[#f15a24] font-black mr-1">#{rank}.</span>
              <Link
                href={cardLink}
                className="hover:text-blue-700 transition-colors"
              >
                {name}
              </Link>
            </h2>
          </div>

          {/* Description Paragraph */}
          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-5 font-normal">
            {descriptionText}
          </p>

          {/* Key Specs Grid (3 Columns x 2 Rows) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs text-slate-700 mb-6">
            {/* 1. Course Fee */}
            {features?.showFees !== false && (
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1 mb-0.5">
                  <span className="font-black text-slate-800 text-sm">₹</span>
                  <span>Course Fee :</span>
                </div>
                <div className="text-slate-600 text-xs font-medium">
                  {semFee}
                </div>
              </div>
            )}

            {/* 2. Approvals */}
            {features?.showApprovals !== false && (
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1 mb-0.5">
                  <Award className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                  <span>Approvals :</span>
                </div>
                <div
                  className="text-slate-600 text-xs font-medium truncate"
                  title={approvalsJoined}
                >
                  {approvalsJoined}
                </div>
              </div>
            )}

            {/* 3. Eligibility */}
            {features?.showEligibility !== false && (
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1 mb-0.5">
                  <span>Eligibility :</span>
                </div>
                <div
                  className="text-slate-600 text-xs font-medium line-clamp-1"
                  title={eligibilityText}
                >
                  {eligibilityText}
                </div>
              </div>
            )}

            {/* 4. Advantage */}
            {features?.showAdvantage !== false && (
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1 mb-0.5">
                  <Check className="w-3.5 h-3.5 text-slate-800 stroke-[3] shrink-0" />
                  <span>Advantage:</span>
                </div>
                <div
                  className="text-slate-600 text-xs font-medium line-clamp-1"
                  title={advantageText}
                >
                  {advantageText}
                </div>
              </div>
            )}

            {/* 5. Location */}
            {features?.showLocation !== false && (
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1 mb-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                  <span>Location :</span>
                </div>
                <div className="text-slate-600 text-xs font-medium">
                  {location}
                </div>
              </div>
            )}

            {/* 6. EMI Available */}
            {features?.showEmi !== false && (
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1 mb-0.5">
                  <CreditCard className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                  <span>EMI Available :</span>
                </div>
                <div className="text-slate-600 text-xs font-medium">Yes</div>
              </div>
            )}
          </div>
        </div>

        {/* ── Action Buttons Row ── */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Know More (Green Solid) */}
          <Link
            href={cardLink}
            className="px-6 py-2.5 rounded bg-[#008738] hover:bg-[#00702e] text-white font-bold text-xs shadow-xs text-center transition-all inline-flex items-center justify-center min-w-[110px]"
          >
            {features?.knowMoreText || "Know More"}
          </Link>

          {/* Get Help (Blue Solid) */}
          {features?.showHelpModal !== false && (
            <button
              type="button"
              onClick={() =>
                openFormModal({
                  title: `Get Free Counseling for ${name}`,
                  source: "dynamic_listing_card_help",
                })
              }
              className="px-6 py-2.5 rounded bg-[#0073c6] hover:bg-[#0060a8] text-white font-bold text-xs shadow-xs text-center transition-all inline-flex items-center justify-center min-w-[110px] cursor-pointer"
            >
              {features?.helpBtnText || "Get Help"}
            </button>
          )}

          {/* Download Brochure (Orange Outline with Download Icon) */}
          {features?.showBrochure !== false && (
            <button
              type="button"
              onClick={() =>
                openFormModal({
                  title: `Download ${name} Brochure`,
                  source: "dynamic_listing_brochure",
                })
              }
              className="px-5 py-2.5 rounded border border-[#f15a24] text-[#f15a24] hover:bg-orange-50 font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>{features?.brochureBtnText || "Download Brochure"}</span>
              <Download className="w-3.5 h-3.5 text-[#f15a24]" />
            </button>
          )}
        </div>
      </div>

      {/* ── Right Section (Campus Photo + Logo Card, approx 30-35%) ── */}
      <div className="w-full md:w-72 lg:w-80 shrink-0 flex flex-col justify-center">
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-xs flex flex-col h-full min-h-[210px]">
          {/* Top Campus Building Photo */}
          <div className="h-36 sm:h-44 w-full relative bg-slate-100 overflow-hidden">
            <Image
              src={bannerUrl || defaultCampusImg}
              alt={`${name} Campus`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Bottom University Logo Box */}
          <div className="p-4 flex items-center justify-center bg-white border-t border-slate-100 flex-1 min-h-[85px]">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={name}
                width={170}
                height={60}
                className="max-h-14 w-auto object-contain"
                unoptimized
              />
            ) : (
              <span className="font-bold text-slate-800 text-sm">{name}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FAQ Accordion Section ──
function FAQSection({ faqs, pageTitle }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  // Build Google FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section className="py-12 bg-slate-50/80 border-t border-slate-200">
      {/* Google FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Common Questions About {pageTitle}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Find answers to admissions, degree validity, exams, and fees.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-900 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Approval Category Hub (Left Sidebar Menu + Right Category Grid) ──
function ApprovalCategoryHub() {
  const categories = [
    {
      title: "UGC-DEB Approved Online Universities",
      badge: "Online Education Bureau",
      desc: "UGC & DEB verified institutions offering 100% online UG & PG degree programs with LMS.",
      link: "#directory-table",
      active: true,
    },
    {
      title: "UGC-DEB Approved Distance Universities",
      badge: "Distance Education Bureau",
      desc: "Recognized Open & Distance Learning (ODL) universities across India.",
      link: "#directory-table",
    },
    {
      title: "WES Accredited Universities",
      badge: "Global Equivalency",
      desc: "Indian universities accredited and recognized by WES for global migration and education.",
      link: "#directory-table",
    },
    {
      title: "NIRF Ranked Universities",
      badge: "MoE Ranking",
      desc: "Top ranked universities evaluated under the Ministry of Education's NIRF framework.",
      link: "#directory-table",
    },
    {
      title: "NAAC Accredited Universities",
      badge: "Grade A++ / A+ / A",
      desc: "High-quality higher educational institutes accredited with top grades by NAAC.",
      link: "#directory-table",
    },
    {
      title: "List of Fake Universities",
      badge: "UGC Alert List",
      desc: "Official UGC alert directory of unapproved, non-recognized institutions to avoid.",
      link: "#directory-table",
      isAlert: true,
    },
  ];

  const sidebarLinks = [
    { label: "Online Universities", href: "/universities", active: false },
    { label: "Global Universities", href: "/universities", active: false },
    { label: "Universities Approvals", href: "/ugc-deb-approved-online-universities", active: true },
    { label: "Top 10 Universities", href: "/top-10-online-universities-in-india", active: false },
    { label: "Suggest University", href: "#directory-table", active: false },
  ];

  return (
    <div className="mb-10 sm:mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar Menu */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
              Directory Categories
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {sidebarLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3.5 text-xs sm:text-sm font-bold transition-all ${
                  item.active
                    ? "bg-[#005fa8] text-white"
                    : "text-slate-700 hover:bg-blue-50/60 hover:text-[#005fa8]"
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight
                  className={`w-4 h-4 ${
                    item.active ? "text-white" : "text-slate-400"
                  }`}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Right 6 Category Cards Grid */}
        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between p-4 sm:p-5 rounded-2xl border bg-white shadow-xs transition-all hover:shadow-md ${
                cat.active
                  ? "border-[#005fa8] ring-1 ring-[#005fa8]/20"
                  : cat.isAlert
                  ? "border-red-200 hover:border-red-300"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-2.5 ${
                    cat.isAlert
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-blue-50 text-[#005fa8] border border-blue-100"
                  }`}
                >
                  {cat.badge}
                </span>
                <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug mb-1.5">
                  {cat.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {cat.desc}
                </p>
              </div>

              <a
                href={cat.link}
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-full text-xs font-bold text-white bg-[#16a34a] hover:bg-[#15803d] shadow-xs hover:shadow-sm transition-all text-center"
              >
                <span>View Updated List 2026</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Approval Directory Table (Searchable Table + Session Tabs) ──
function ApprovalDirectoryTable({
  universities,
  pageTitle,
  selectedSession,
  setSelectedSession,
  tableSearch,
  setTableSearch,
}) {
  const sessions = ["January 2026", "January 2025", "July 2025"];

  return (
    <div id="directory-table" className="scroll-mt-24">
      {/* Session Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
          Select Session:
        </span>
        {sessions.map((sess) => {
          const isActive = selectedSession === sess;
          return (
            <button
              key={sess}
              type="button"
              onClick={() => setSelectedSession(sess)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#005fa8] text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              {sess}
            </button>
          );
        })}
      </div>

      {/* Directory Table Card Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Header with Title & Live Search */}
        <div className="p-4 sm:p-6 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              UGC-DEB Approved Online Universities List – {selectedSession} Session
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {universities.length} recognized Higher Educational Institutions (HEIs)
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search university, HEI, or state..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-[#005fa8] focus:ring-1 focus:ring-[#005fa8]/20 transition-all font-medium"
            />
            {tableSearch && (
              <button
                type="button"
                onClick={() => setTableSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#005fa8] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 w-16 text-center">S. No.</th>
                <th className="py-3.5 px-5">University Name</th>
                <th className="py-3.5 px-5 w-48 sm:w-60">TYPE OF HEI</th>
                <th className="py-3.5 px-5 w-40 sm:w-52">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-700 font-medium">
              {universities.length > 0 ? (
                universities.map((item, idx) => {
                  const uni = item.university || {};
                  const uniName = uni.name || item.name || "University";
                  const uniSlug = uni.slug || item.slug || "";
                  const heiType = item.heiType || uni.ownership_type || "PRIVATE UNIVERSITY";
                  const stateName = item.stateName || uni.state?.name || uni.city?.name || "INDIA";
                  const logo = resolveMediaUrl(uni.image || uni.logo);

                  return (
                    <tr
                      key={uni._id || idx}
                      className="hover:bg-blue-50/50 transition-colors odd:bg-white even:bg-slate-50/50"
                    >
                      {/* S. No. */}
                      <td className="py-3.5 px-4 text-center font-bold text-slate-500">
                        {idx + 1}
                      </td>

                      {/* University Name */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          {logo ? (
                            <div className="w-8 h-8 rounded-md bg-white border border-slate-200 p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                              <img
                                src={logo}
                                alt={uniName}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-200 shrink-0 flex items-center justify-center text-[#005fa8] font-black text-xs">
                              {uniName.charAt(0)}
                            </div>
                          )}

                          {uniSlug ? (
                            <Link
                              href={`/${uniSlug}`}
                              className="font-bold text-slate-900 hover:text-[#005fa8] transition-colors leading-snug"
                            >
                              {uniName}
                            </Link>
                          ) : (
                            <span className="font-bold text-slate-900 leading-snug">
                              {uniName}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* TYPE OF HEI */}
                      <td className="py-3.5 px-5">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase bg-slate-100 text-slate-800 border border-slate-200">
                          {heiType}
                        </span>
                      </td>

                      {/* State */}
                      <td className="py-3.5 px-5 font-bold text-slate-800 uppercase tracking-wide">
                        {stateName}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500 bg-white">
                    <GraduationCap className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-sm text-slate-800">
                      No universities found
                    </p>
                    <p className="text-xs mt-0.5">
                      No results matching &ldquo;{tableSearch}&rdquo; in {selectedSession} session.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Main Export Client Component ──
export function DynamicListingClientView({ page, slug }) {
  useBreadcrumb([
    { label: "Home", href: "/" },
    { label: page?.categoryMenu || "Top 10 Universities", href: "/universities" },
    { label: page?.title || "Ranking Page", active: true },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [filterNaacOnly, setFilterNaacOnly] = useState(false);
  const [selectedSession, setSelectedSession] = useState("January 2026");
  const [tableSearch, setTableSearch] = useState("");

  const rankedList = page?.rankedUniversities || [];

  // Filter & Sort Pipeline
  const displayedUniversities = useMemo(() => {
    let list = [...rankedList];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((item) =>
        item.university?.name?.toLowerCase().includes(q)
      );
    }

    if (filterNaacOnly) {
      list = list.filter((item) => {
        const grade = item.university?.naac_rating?.grade || "";
        return grade.includes("A");
      });
    }

    if (sortOption === "alpha") {
      list.sort((a, b) =>
        (a.university?.name || "").localeCompare(b.university?.name || "")
      );
    } else if (sortOption === "naac") {
      list.sort((a, b) => {
        const gA = a.university?.naac_rating?.grade || "";
        const gB = b.university?.naac_rating?.grade || "";
        return gB.localeCompare(gA);
      });
    }

    return list;
  }, [rankedList, searchTerm, sortOption, filterNaacOnly]);

  // Filter for Table Directory Layout
  const tableUniversities = useMemo(() => {
    let list = [...rankedList];

    // Filter by session if matching items exist
    if (selectedSession) {
      const matchSession = list.filter((item) => {
        if (!item.session) return false;
        return (
          item.session.toLowerCase().includes(selectedSession.toLowerCase()) ||
          selectedSession.toLowerCase().includes(item.session.toLowerCase())
        );
      });
      if (matchSession.length > 0) {
        list = matchSession;
      }
    }

    // Filter by search query
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      list = list.filter((item) => {
        const name = (item.university?.name || item.name || "").toLowerCase();
        const hei = (item.heiType || "").toLowerCase();
        const state = (item.stateName || "").toLowerCase();
        return name.includes(q) || hei.includes(q) || state.includes(q);
      });
    }

    return list;
  }, [rankedList, selectedSession, tableSearch]);

  const targetCourseName = page?.targetCourse?.name || "";

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* ── 1. Hero Section ── */}
      {page?.hero?.enabled !== false && (
        <DynamicHero
          hero={page?.hero}
          pageTitle={page?.title}
          subtitle={page?.subtitle}
          targetCourseName={targetCourseName}
        />
      )}

      {/* ── Dynamic Sections Renderer (Controlled by Section Order Flow) ── */}
      {(() => {
        // Determine section order (from DB or default)
        const sectionOrder =
          Array.isArray(page?.sectionOrder) && page.sectionOrder.length > 0
            ? page.sectionOrder
            : ["content", "universities", "faqs"];

        // Unified content
        const mainContent = page?.content || "";

        // Check if content contains {{universities_list}}
        const hasShortcode = mainContent.includes("{{universities_list}}");

        // Sub-renderer for Universities Directory
        const renderUniversitiesDirectory = () => {
          if (page?.features?.cardLayout === "table") {
            return (
              <section key="universities-table-dir" id="universities-list" className="py-10 sm:py-14">
                <Container>
                  <ApprovalCategoryHub />
                  <ApprovalDirectoryTable
                    universities={tableUniversities}
                    pageTitle={page?.title}
                    selectedSession={selectedSession}
                    setSelectedSession={setSelectedSession}
                    tableSearch={tableSearch}
                    setTableSearch={setTableSearch}
                  />
                </Container>
              </section>
            );
          }

          return (
            <section key="universities-dir" id="universities-list" className="py-10 sm:py-14">
            <Container>
              {/* Directory Toolbar Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span>
                      Ranked Universities ({displayedUniversities.length})
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official UGC-DEB approved institutions ranked by accreditation
                    and student satisfaction.
                  </p>
                </div>

                {/* Controls: Search & Filter */}
                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-56">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search university..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:border-blue-600 transition-all"
                    />
                  </div>

                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 font-medium text-slate-700 cursor-pointer focus:outline-hidden"
                  >
                    <option value="default">Default Order (#1 - #10)</option>
                    <option value="naac">NAAC Grade (Highest first)</option>
                    <option value="alpha">Alphabetical (A - Z)</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => setFilterNaacOnly(!filterNaacOnly)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      filterNaacOnly
                        ? "bg-amber-400 text-slate-950 border-amber-500 shadow-xs"
                        : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                    }`}
                  >
                    ⭐ NAAC Accredited Only
                  </button>
                </div>
              </div>

              {/* Universities Listing */}
              {displayedUniversities.length > 0 ? (
                <div
                  className={
                    page?.features?.cardLayout === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
                      : "flex flex-col gap-6 w-full"
                  }
                >
                  {displayedUniversities.map((item, index) => (
                    <RankedUniversityCard
                      key={item.university?._id || index}
                      item={item}
                      index={index}
                      features={page?.features}
                      targetCourseName={targetCourseName}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
                  <GraduationCap className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                  <h3 className="font-bold text-slate-800 text-base">
                    No universities matched your search criteria
                  </h3>
                  <p className="text-xs mt-1">
                    Try resetting your filters or search terms.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setFilterNaacOnly(false);
                      setSortOption("default");
                    }}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-all cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </Container>
          </section>
        );
      };

        // Sub-renderer for Content Block
        const renderContentSection = (htmlContent, key = "editorial-content") => {
          if (!htmlContent) return null;
          return (
            <section key={key} className="py-8 sm:py-10 bg-white border-b border-slate-200/80">
              <Container>
                <div className="max-w-4xl mx-auto p-5 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <SafeHtmlRenderer html={htmlContent} />
                </div>
              </Container>
            </section>
          );
        };

        // Sub-renderer for FAQ Section
        const renderFaqSection = () => (
          <FAQSection key="faq-sec" faqs={page?.faqs} pageTitle={page?.title} />
        );

        // If content has embedded {{universities_list}}, render inline split
        if (hasShortcode) {
          const parts = mainContent.split("{{universities_list}}");
          return (
            <React.Fragment key="shortcode-flow">
              {renderContentSection(parts[0], "content-part-1")}
              {renderUniversitiesDirectory()}
              {parts[1] && renderContentSection(parts[1], "content-part-2")}
              {renderFaqSection()}
            </React.Fragment>
          );
        }

        // Render strictly in the order requested by sectionOrder
        return (
          <React.Fragment key="ordered-sections-flow">
            {sectionOrder.map((secKey) => {
              if (secKey === "universities") {
                return renderUniversitiesDirectory();
              }
              if (secKey === "content") {
                return renderContentSection(mainContent);
              }
              if (secKey === "faqs") {
                return renderFaqSection();
              }
              return null;
            })}
          </React.Fragment>
        );
      })()}
    </main>
  );
}

export default DynamicListingClientView;
