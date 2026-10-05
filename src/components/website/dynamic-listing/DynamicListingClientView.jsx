"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel, Pagination } from "antd";
import { Container } from "@/components/common/Container";
import SafeHtmlRenderer from "@/components/website/SafeHtmlRenderer";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { getAssetPath } from "@/lib/utils";
import { useFormModal } from "@/hooks/useFormModal";
import { Hero } from "@/components/website/Hero";
import {
  GraduationCap,
  MapPin,
  ChevronDown,
  ChevronUp,
  Download,
  Award,
  Check,
  CreditCard,
  Plus,
  Minus,
  UserCheck,
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
  return null;
}

function getMediaUrl(media) {
  if (!media) return null;
  if (typeof media === "string") return media;
  return media.url || media.path || null;
}

function DynamicHero({ hero, pageTitle, subtitle, targetCourseName }) {
  const { openFormModal } = useFormModal();

  if (!hero || hero.enabled === false) return null;

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

  const bgImgUrl = getMediaUrl(hero.backgroundImage);
  const videoUrl = hero.videoUrl || "";
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  const bannerUrl = getMediaUrl(hero.bannerImage);

  const title = hero.title || pageTitle || "";
  const highlight = hero.titleHighlight || "";
  const desc = hero.subtitle || hero.description || subtitle || "";

  const hasHeroMedia = Boolean(embedUrl || bannerUrl);

  const buttons =
    hero.buttons && hero.buttons.length > 0
      ? hero.buttons.filter((b) => b.enabled !== false)
      : [
        { text: "Get Free Counseling", variant: "green", isModal: true },
        { text: "Compare Universities", variant: "outline", url: "#universities-list" },
      ];

  const universities = (hero.universities || []).filter(
    (uni) => uni && uni.showOnWebsite !== false
  );
  const showPartners = hero.showPartners === true && universities.length > 0;

  return (
    <>
      <section
        style={{ backgroundColor: hero.backgroundColor || "#102A45" }}
        className="relative overflow-hidden text-white pt-8 pb-10 md:pt-12 md:pb-12"
      >
        {bgImgUrl && (
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
            <Image
              src={getAssetPath(bgImgUrl)}
              alt=""
              fill
              priority
              unoptimized
              className="object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          </div>
        )}

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column */}
            <div
              className={`${hasHeroMedia ? "lg:col-span-7" : "lg:col-span-12"
                } flex flex-col items-center text-center lg:items-start lg:text-left z-10 order-2 lg:order-1`}
            >
              {hero.shortTitle ? (
                <p className="text-slate-300 text-sm sm:text-base font-normal tracking-wide mb-1.5 text-center lg:text-left">
                  {hero.shortTitle.startsWith("(") ? hero.shortTitle : `(${hero.shortTitle})`}
                </p>
              ) : hero.badgeText ? (
                <p className="text-slate-300 text-sm sm:text-base font-normal tracking-wide mb-1.5 text-center lg:text-left">
                  {hero.badgeText}
                </p>
              ) : null}

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-tight mb-4 text-center lg:text-left">
                {title}{" "}
                {highlight && <span className="text-[#F5D061]">{highlight}</span>}
              </h1>

              {desc && (
                <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal text-center lg:text-left">
                  {desc}
                </p>
              )}

              {buttons.length > 0 && (
                <div className="flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 flex-wrap">
                  {buttons.map((btn, idx) => {
                    const isModal = btn.isModal || btn.url === "#counseling" || !btn.url;
                    const variant = btn.variant || "green";
                    const variantClasses =
                      variant === "green"
                        ? "bg-[#22C55E] hover:bg-[#16a34a] text-white"
                        : variant === "amber" || variant === "gold"
                          ? "bg-[#F5D061] hover:bg-[#ebc44f] text-[#102A45]"
                          : variant === "blue"
                            ? "bg-[#0284C7] hover:bg-[#0369a1] text-white"
                            : variant === "dark"
                              ? "bg-[#0f172a] hover:bg-[#1e293b] text-white"
                              : variant === "outline"
                                ? "bg-transparent hover:bg-white/10 text-white border border-white/80"
                                : "bg-[#22C55E] hover:bg-[#16a34a] text-white";

                    if (isModal) {
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            openFormModal({
                              title: btn.text || "Get Free Counseling",
                              subtitle: `Course: ${pageTitle || targetCourseName}`,
                              submitButtonText: btn.text || "Get Consultation",
                            })
                          }
                          className={`px-4 sm:px-5 py-2 sm:py-2.5 font-bold text-xs sm:text-sm rounded-lg shadow-xs transition-all duration-200 cursor-pointer text-center inline-flex items-center justify-center whitespace-nowrap gap-1.5 ${variantClasses}`}
                        >
                          <span>{btn.text}</span>
                        </button>
                      );
                    }

                    if (btn.url?.startsWith("/")) {
                      return (
                        <Link
                          key={idx}
                          href={btn.url}
                          className={`px-3.5 sm:px-4 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-1.5 cursor-pointer text-center whitespace-nowrap ${variantClasses}`}
                        >
                          <span>{btn.text}</span>
                        </Link>
                      );
                    }

                    return (
                      <a
                        key={idx}
                        href={btn.url || "#"}
                        target={btn.url?.startsWith("http") ? "_blank" : undefined}
                        rel={btn.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={`px-3.5 sm:px-4 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-1.5 cursor-pointer text-center whitespace-nowrap ${variantClasses}`}
                      >
                        <span>{btn.text}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Media Column */}
            {hasHeroMedia && (
              <div className="lg:col-span-5 flex justify-center z-10 w-full order-1 lg:order-2">
                {embedUrl ? (
                  <div className="w-full max-w-lg lg:max-w-none">
                    <iframe
                      src={embedUrl}
                      title={title}
                      className="w-full aspect-video rounded-xl border border-white/10 shadow-2xl"
                      allowFullScreen
                    />
                  </div>
                ) : bannerUrl ? (
                  <div
                    className="w-full max-w-lg lg:max-w-none rounded-xl overflow-hidden shadow-2xl relative aspect-video bg-[#0c1e30] border border-white/10 group cursor-pointer"
                    onClick={() =>
                      openFormModal({
                        title: "Book Free Counseling",
                        subtitle: `Program: ${title}`,
                      })
                    }
                  >
                    <Image
                      src={getAssetPath(bannerUrl)}
                      alt={title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-12 sm:w-16 h-8 sm:h-11 bg-[#FF0000] rounded-lg sm:rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white ml-0.5" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Partner Universities Strip (Identical to Course Page) */}
      {showPartners && (
        <section className="w-full bg-[#F6E3A3] py-1.5 sm:py-2 px-1 sm:px-2 border-b border-amber-300/40 overflow-hidden">
          <Container>
            <Carousel
              autoplay={true}
              autoplaySpeed={2500}
              speed={600}
              pauseOnHover={false}
              dots={false}
              infinite={true}
              draggable={true}
              swipeToSlide={true}
              slidesToShow={Math.min(universities.length, 7)}
              slidesToScroll={1}
              responsive={[
                { breakpoint: 1920, settings: { slidesToShow: Math.min(universities.length, 8), slidesToScroll: 1 } },
                { breakpoint: 1380, settings: { slidesToShow: Math.min(universities.length, 7), slidesToScroll: 1 } },
                { breakpoint: 1150, settings: { slidesToShow: Math.min(universities.length, 6), slidesToScroll: 1 } },
                { breakpoint: 900, settings: { slidesToShow: Math.min(universities.length, 5), slidesToScroll: 1 } },
                { breakpoint: 768, settings: { slidesToShow: Math.min(universities.length, 3), slidesToScroll: 1 } },
                { breakpoint: 480, settings: { slidesToShow: Math.min(universities.length, 3), slidesToScroll: 1 } },
              ]}
              className="w-full partner-antd-carousel"
            >
              {universities.map((uni, idx) => {
                const imageSrc =
                  uni.logo?.url || uni.image?.url || uni.coursepageimage?.url || (typeof uni.logo === "string" ? uni.logo : null);
                if (!imageSrc) return null;

                const url = uni.courseSlug
                  ? (uni.courseSlug.includes("/") ? `/universities/${uni.courseSlug}` : `/courses/${uni.courseSlug}`)
                  : uni.slug
                    ? `/universities/${uni.slug}`
                    : null;

                const content = (
                  <div className="flex items-center justify-center h-12 sm:h-14 w-full">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={getAssetPath(imageSrc)}
                        alt={uni.name || "University Logo"}
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 640px) 140px, 200px"
                        unoptimized
                      />
                    </div>
                  </div>
                );

                return (
                  <div key={`partner-${uni._id || uni.slug || idx}-${idx}`} className="py-1">
                    {url ? (
                      <Link href={url} className="w-full flex items-center justify-center">
                        {content}
                      </Link>
                    ) : (
                      content
                    )}
                  </div>
                );
              })}
            </Carousel>
          </Container>
        </section>
      )}
    </>
  );
}

function RankedUniversityCard({ item, index, features }) {
  const { openFormModal } = useFormModal();
  const [isExpanded, setIsExpanded] = useState(false);

  const uni = item?.university;
  if (!uni) return null;

  const rank = item.rank || index + 1;
  const name = uni.name;
  const slug = uni.slug;
  const logoUrl = getMediaUrl(uni.logo) || getMediaUrl(uni.image);
  const desktopImageUrl = getMediaUrl(uni.coursepageimage) || getMediaUrl(uni.bannerImg) || getMediaUrl(uni.image);
  const mobileBannerUrl = getMediaUrl(uni.mobileBannerImg) || getMediaUrl(uni.bannerImg) || getMediaUrl(uni.image) || desktopImageUrl;
  const hasCardMedia = Boolean(desktopImageUrl || mobileBannerUrl);
  const location = [uni.city?.name, uni.state?.name].filter(Boolean).join(", ");
  const approvalsJoined = uni.approvals?.map((a) => a.code || a.name).filter(Boolean).join(" | ");
  const semFee = item.customFeeText || item.fees?.formattedSemesterFees || item.fees?.formattedPerSemesterPayable || "";
  const eligibilityText = item.eligibility;
  const advantageText = item.highlightReason || item.advantage;
  const cardLink = item.courseSlug
    ? (item.courseSlug.includes("/") ? `/universities/${item.courseSlug}` : `/courses/${item.courseSlug}`)
    : `/universities/${slug}`;
  const rawDescription = item.description || uni.description || "";
  const plainDescription = rawDescription
    ? rawDescription.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
    : "";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 mb-5 flex flex-col md:flex-row items-stretch overflow-hidden">
      <div className="flex-1 min-w-0 p-3 sm:p-5 lg:p-6 flex flex-col justify-between order-2 md:order-1">
        <div>
          <div className="border-b border-dashed border-slate-300 pb-2 mb-2.5 flex items-center justify-between gap-3">
            <h2 className="text-lg sm:text-xl font-black text-[#072c50] flex flex-wrap items-center gap-1.5 leading-snug">
              <span className="text-[#f15a24] font-black mr-1">#{rank}.</span>
              <Link href={cardLink} className="hover:text-blue-700 transition-colors">
                {name}
              </Link>
            </h2>
          </div>

          {plainDescription && (
            <p className="text-xs text-slate-600 leading-relaxed mb-3 font-normal">
              {!isExpanded && plainDescription.length > 170 ? (
                <>
                  {plainDescription.slice(0, 170).trim()}...{" "}
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer inline ml-1"
                  >
                    Read More
                  </button>
                </>
              ) : (
                <>
                  {plainDescription}
                  {plainDescription.length > 170 && (
                    <button
                      type="button"
                      onClick={() => setIsExpanded(false)}
                      className="font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer inline ml-1.5"
                    >
                      Read Less
                    </button>
                  )}
                </>
              )}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4 sm:gap-x-6 text-xs text-slate-700 mb-4">
            {semFee && (
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1 mb-0.5">
                  <span className="font-black text-slate-800 text-xs">₹</span>
                  <span>Course Fee :</span>
                </div>
                <div className="text-slate-600 text-xs font-medium">{semFee}</div>
              </div>
            )}

            {approvalsJoined && (
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1 mb-0.5">
                  <Award className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                  <span>Approvals :</span>
                </div>
                <div className="text-slate-600 text-xs font-medium truncate" title={approvalsJoined}>
                  {approvalsJoined}
                </div>
              </div>
            )}

            {eligibilityText && (
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1 mb-0.5">
                  <UserCheck className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                  <span>Eligibility :</span>
                </div>
                <div className="text-slate-600 text-xs font-medium line-clamp-1" title={eligibilityText}>
                  {eligibilityText}
                </div>
              </div>
            )}

            {advantageText && (
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1 mb-0.5">
                  <Check className="w-3.5 h-3.5 text-slate-800 stroke-[3] shrink-0" />
                  <span>Advantage:</span>
                </div>
                <div className="text-slate-600 text-xs font-medium line-clamp-1" title={advantageText}>
                  {advantageText}
                </div>
              </div>
            )}

            {location && (
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1 mb-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                  <span>Location :</span>
                </div>
                <div className="text-slate-600 text-xs font-medium">{location}</div>
              </div>
            )}

            <div>
              <div className="font-bold text-slate-900 flex items-center gap-1 mb-0.5">
                <CreditCard className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                <span>EMI Available :</span>
              </div>
              <div className="text-slate-600 text-xs font-medium">Yes</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-start gap-1.5 sm:gap-2.5 pt-1.5 sm:pt-2 w-full">
          <Link
            href={cardLink}
            className="flex-[0.85] sm:flex-none px-2 sm:px-4 py-2 rounded-lg bg-[#008738] hover:bg-[#00702e] text-white font-bold text-[11px] sm:text-xs shadow-xs text-center transition-all inline-flex items-center justify-center whitespace-nowrap min-w-0"
          >
            <span className="truncate">{features?.knowMoreText || "Know More"}</span>
          </Link>

          <button
            type="button"
            onClick={() =>
              openFormModal({
                title: `${features?.helpBtnText || "Get Free Counseling"} - ${name}`,
                source: "dynamic_listing_card_help",
              })
            }
            className="flex-[1.25] sm:flex-none px-2 sm:px-4 py-2 rounded-lg bg-[#0073c6] hover:bg-[#0060a8] text-white font-bold text-[11px] sm:text-xs shadow-xs text-center transition-all inline-flex items-center justify-center whitespace-nowrap min-w-0 cursor-pointer"
          >
            <span className="truncate">{features?.helpBtnText || "Get Free Counseling"}</span>
          </button>

          <button
            type="button"
            onClick={() =>
              openFormModal({
                title: `${features?.brochureBtnText || "Download Brochure"} - ${name}`,
                source: "dynamic_listing_brochure",
              })
            }
            className="flex-[1.1] sm:flex-none px-2 sm:px-4 py-2 rounded-lg border border-[#f15a24] text-[#f15a24] hover:bg-orange-50 font-semibold text-[11px] sm:text-xs inline-flex items-center justify-center gap-1 sm:gap-1.5 transition-all min-w-0 cursor-pointer whitespace-nowrap"
          >
            <span className="truncate">{features?.brochureBtnText || "Download Brochure"}</span>
            <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-[#f15a24]" />
          </button>
        </div>
      </div>

      {hasCardMedia && (
        <div className="w-full md:w-[340px] lg:w-[390px] xl:w-[420px] shrink-0 relative h-36 sm:h-44 md:h-auto md:min-h-full overflow-hidden border-b md:border-b-0 md:border-l border-slate-200/90 bg-slate-100 order-1 md:order-2">
          {/* Desktop Image (Course Image) */}
          {desktopImageUrl && (
            <Image
              src={getAssetPath(desktopImageUrl)}
              alt={name}
              fill
              sizes="(min-width: 768px) 420px, 1px"
              className="object-cover object-center hidden md:block"
              unoptimized
            />
          )}
          {/* Mobile Image (Banner Image - Specialization modal style) */}
          {mobileBannerUrl && (
            <Image
              src={getAssetPath(mobileBannerUrl)}
              alt={name}
              fill
              sizes="(max-width: 767px) 100vw, 1px"
              className="object-cover object-center block md:hidden"
              unoptimized
            />
          )}
          {logoUrl && (
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 md:top-3.5 md:right-3.5 z-10 bg-white rounded-xl sm:rounded-2xl shadow-md p-1.5 sm:p-2 flex items-center justify-center">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
                <Image
                  src={getAssetPath(logoUrl)}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 40px, 56px"
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FAQSection({ faqs, pageTitle }) {
  const [openFaq, setOpenFaq] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question || f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer || f.a,
      },
    })),
  };

  return (
    <div
      id="faqs"
      className="scroll-mt-20 bg-white rounded-xl shadow-xs border border-gray-200 p-6 sm:p-8 space-y-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-5 text-center">
        Frequently Asked Questions (FAQs)
      </h2>

      <div className="space-y-3 max-w-5xl mx-auto">
        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          const question = faq.question || faq.q || "";
          const answer = faq.answer || faq.a || "";

          return (
            <div
              key={faq._id || idx}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-blue-400 bg-blue-200/30 shadow-2xs"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                className="w-full flex items-center justify-between gap-4 p-2.5 sm:p-3 text-left cursor-pointer bg-transparent border-none outline-none"
              >
                <span
                  className={`text-xs sm:text-[14px] font-semibold leading-snug ${
                    isOpen ? "text-[#0C2B4E]" : "text-gray-900"
                  }`}
                >
                  Q{idx + 1}. {question}
                </span>
                <span
                  className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 transition-colors ${
                    isOpen
                      ? "bg-[#0C2B4E] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isOpen ? <Minus size={11} /> : <Plus size={11} />}
                </span>
              </button>

              {isOpen && (
                <div className="p-3.5 text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal border-t border-blue-100/60">
                  <SafeHtmlRenderer html={answer} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DynamicListingClientView({ page }) {
  useBreadcrumb([
    { label: "Home", href: "/" },
    { label: "Top Universities", href: "/universities" },
    { label: page?.title || "Listing", active: true },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [filterNaacOnly, setFilterNaacOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const rankedList = useMemo(() => {
    return (page?.rankedUniversities || []).filter(
      (item) => item?.university && item.university?.showOnWebsite !== false
    );
  }, [page?.rankedUniversities]);

  const displayedUniversities = useMemo(() => {
    let list = [...rankedList];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((item) => item.university?.name?.toLowerCase().includes(q));
    }

    if (filterNaacOnly) {
      list = list.filter((item) => (item.university?.naac_rating?.grade || "").includes("A"));
    }

    if (sortOption === "alpha") {
      list.sort((a, b) => (a.university?.name || "").localeCompare(b.university?.name || ""));
    } else if (sortOption === "naac") {
      list.sort((a, b) => (b.university?.naac_rating?.grade || "").localeCompare(a.university?.naac_rating?.grade || ""));
    }

    return list;
  }, [rankedList, searchTerm, sortOption, filterNaacOnly]);

  const totalUniversities = displayedUniversities.length;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUniversities = displayedUniversities.slice(startIndex, startIndex + pageSize);
  const targetCourseName = page?.targetCourse?.name || "";

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* ── 1. Hero Section ── */}
      {page?.hero?.enabled && (
        <DynamicHero
          hero={page.hero}
          pageTitle={page.title}
          subtitle={page.subtitle}
          targetCourseName={targetCourseName}
        />
      )}

      {/* ── 2. Universities Directory ── */}
      <section id="universities-list" className="py-10 sm:py-14">
        <Container>
          {displayedUniversities.length > 0 ? (
            <>
              <div className="flex flex-col gap-6 w-full">
                {paginatedUniversities.map((item, index) => (
                  <RankedUniversityCard
                    key={item.university?._id || index}
                    item={item}
                    index={startIndex + index}
                    features={page?.features}
                  />
                ))}
              </div>

              {totalUniversities > pageSize && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 pb-2 px-1 mt-2">
                  <span className="text-xs font-semibold text-slate-500 text-center sm:text-left">
                    Showing {startIndex + 1}–{Math.min(startIndex + pageSize, totalUniversities)} of {totalUniversities} universities
                  </span>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalUniversities}
                    onChange={(p) => {
                      setCurrentPage(p);
                      const elem = document.getElementById("universities-list");
                      if (elem) {
                        const yOffset = -70;
                        const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
                      }
                    }}
                    showSizeChanger={false}
                    responsive
                  />
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
              <GraduationCap className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <h3 className="font-bold text-slate-800 text-base">No universities matched your search criteria</h3>
              <p className="text-xs mt-1">Try resetting your filters or search terms.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setFilterNaacOnly(false);
                  setSortOption("default");
                  setCurrentPage(1);
                }}
                className="mt-3 px-4 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
          {/* ── Content Section (Card Background with Clean Typography) ── */}
          {page?.contentDescription && (
            <div className="mt-8 bg-white rounded-2xl shadow-xs border border-gray-200 p-6 sm:p-8 space-y-4 text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal [&_a]:text-blue-600 [&_a:hover]:underline [&_a]:font-medium">
              {/^\s*<[a-z0-9]+/i.test(page.contentDescription) ? (
                <div
                  dangerouslySetInnerHTML={{ __html: page.contentDescription }}
                  className="space-y-3 text-slate-700 leading-relaxed [&>h1]:text-xl [&>h1]:font-bold [&>h2]:text-lg sm:[&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-[#072c50] [&>h3]:text-base sm:[&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-[#072c50] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:p-2 [&_th]:bg-slate-100 [&_td]:border [&_td]:p-2"
                />
              ) : (
                page.contentDescription
                  .split(/\n\s*\n/)
                  .filter(Boolean)
                  .map((para, pIdx) => (
                    <p
                      key={pIdx}
                      dangerouslySetInnerHTML={{
                        __html: para.trim().replace(/\n/g, "<br/>"),
                      }}
                    />
                  ))
              )}
            </div>
          )}

          {/* ── FAQs Section (inside same Container, CourseFaq UI) ── */}
          {page?.faqs && page.faqs.length > 0 && (
            <div className="mt-8">
              <FAQSection faqs={page.faqs} pageTitle={page.title} />
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}

export default DynamicListingClientView;
