"use client";

import { useState } from "react";
import Link from "next/link";
import DynamicLegalModal from "@/components/common/legal/DynamicLegalModal";
import { useFormModal } from "@/hooks/useFormModal";

export function Footer({
  initialHeaderData = null,
  initialFooterData = null,
  initialLegalPolicies = [],
}) {
  const { openFormModal } = useFormModal();

  // 1. Resolve Data from Props
  const footer = initialFooterData?.result || initialFooterData || {};

  const brand = footer?.brand;
  const topCta = footer?.top_cta;
  const mediaBar = footer?.media_bar;
  const dynamicColumns =
    Array.isArray(footer?.columns) && footer.columns.length > 0
      ? footer.columns.filter((c) => c?.enabled !== false)
      : null;
  const legal = footer?.legal;
  const availablePolicies =
    Array.isArray(legal?.policies) && legal.policies.length > 0
      ? legal.policies
      : Array.isArray(initialLegalPolicies) && initialLegalPolicies.length > 0
        ? initialLegalPolicies
        : [];

  // Theme & color tokens from backend
  const bgColor = footer?.bg_color || "#072C50";
  const accentColor = footer?.accent_color || "#EEC471";
  const topCtaBg = topCta?.bg_color || "#F6DE95";
  const topCtaText = topCta?.text_color || "#072C50";
  const topCtaBtnBg = topCta?.button_bg_color || "#ffffff";
  const topCtaBtnText = topCta?.button_text_color || "#072C50";

  const [activeDialog, setActiveDialog] = useState(null);

  const openExpertForm = (customTitle, customSubtitle) => {
    openFormModal({
      title: customTitle || "Talk to Experts",
      subtitle: customSubtitle || "Interact with experts, Get free consultation.",
      submitButtonText: "Talk to Experts",
    });
  };

  const closeLegalDialog = () => {
    setActiveDialog(null);
  };

  // Helper to render platform SVGs
  const renderSocialIcon = (platform) => {
    const p = (platform || "").toLowerCase();
    if (p.includes("face")) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.25c0-1.01.28-1.7 1.75-1.7H17V2.42C16.7 2.38 15.67 2.3 14.45 2.3c-2.55 0-4.3 1.56-4.3 4.42V9.5H7.25V13h2.9v9h3.35Z" />
        </svg>
      );
    }
    if (p.includes("twitter") || p === "x") {
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M18.9 2H22l-6.77 7.74L23 22h-6.09l-4.77-6.24L6.68 22H3.56l7.13-8.15L3.24 2h6.24l4.31 5.7L18.9 2Zm-1.09 17.84h1.72L8.54 4.05H6.69l11.12 15.79Z" />
        </svg>
      );
    }
    if (p.includes("insta")) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    }
    if (p.includes("link")) {
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M5.34 3.5A2.34 2.34 0 1 1 5.34 8.18 2.34 2.34 0 0 1 5.34 3.5ZM3.32 9.86h4.04V22H3.32V9.86ZM9.78 9.86h3.87v1.66h.06c.54-1.02 1.86-2.1 3.82-2.1 4.09 0 4.84 2.69 4.84 6.19V22h-4.03v-5.66c0-1.35-.03-3.09-1.88-3.09-1.88 0-2.17 1.47-2.17 2.99V22H9.78V9.86Z" />
        </svg>
      );
    }
    if (p.includes("you")) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M23.5 6.2a3.03 3.03 0 0 0-2.13-2.14C19.49 3.55 12 3.55 12 3.55s-7.49 0-9.37.51A3.03 3.03 0 0 0 .5 6.2 31.48 31.48 0 0 0 0 12a31.48 31.48 0 0 0 .5 5.8 3.03 3.03 0 0 0 2.13 2.14c1.88.51 9.37.51 9.37.51s7.49 0 9.37-.51a3.03 3.03 0 0 0 2.13-2.14A31.48 31.48 0 0 0 24 12a31.48 31.48 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.23 3.6L9.6 15.6Z" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    );
  };

  // Fallback social links if not populated
  const defaultSocialLinks = [
    { platform: "facebook", label: "Facebook", url: "https://www.facebook.com/distanceeducationschool/" },
    { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/distanceeducationschool/" },
    { platform: "youtube", label: "YouTube", url: "https://www.youtube.com/channel/UCw9KLsERm_EzL2js_s7GbLQ/" },
    { platform: "linkedin", label: "LinkedIn", url: "https://in.linkedin.com/company/distanceeducationschool" },
    { platform: "twitter_x", label: "X", url: "https://x.com/distance_school" },
  ];

  const socialLinksToRender =
    Array.isArray(brand?.social_links) && brand.social_links.length > 0
      ? brand.social_links.filter((s) => s?.enabled !== false)
      : defaultSocialLinks;

  // Fallback columns if none from database
  const fallbackColumns = [
    {
      title: "UNIVERSITIES",
      links: [
        { label: "UGC-DEB Universities", url: "/approvals-directory/ugc-deb-approved-distance-universities" },
        { label: "Global Universities", url: "/universities" },
        { label: "IITs & IIMs", url: "/universities" },
      ],
    },
    {
      title: "AI POWERED TOOLS",
      links: [
        { label: "Suggest Universities", url: "/suggest-university" },
        { label: "Compare universities", url: "/compare" },
        { label: "Eligibility Checker", url: "/eligibility-checker" },
        { label: "Suggest Course", url: "/suggest-course" },
      ],
    },
    {
      title: "GET STARTED",
      links: [
        { label: "About Us", url: "/about-us" },
        { label: "Contact Us", url: "/contact-us" },
        { label: "FAQ", url: "#faqs" },
        { label: "Blogs", url: "/blogs" },
      ],
    },
  ];

  const columnsToRender = dynamicColumns || fallbackColumns;

  return (
    <>
      <footer
        className="w-full text-gray-200 transition-colors"
        style={{ backgroundColor: bgColor }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 md:pt-10 pb-6">
          {/* =====================================================
              1. TOP CTA BANNER CARD ("Have Any Doubt?")
          ====================================================== */}
          {topCta?.enabled !== false && (
            <div
              className="mb-6 sm:mb-7 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md"
              style={{ backgroundColor: topCtaBg }}
            >
              <div className="text-center sm:text-left">
                <h3
                  className="text-2xl sm:text-3xl md:text-[32px] font-extrabold tracking-tight"
                  style={{ color: topCtaText }}
                >
                  {topCta?.heading || topCta?.title || "Have Any Doubt?"}
                </h3>
                <p
                  className="mt-1 text-sm sm:text-base md:text-lg font-medium"
                  style={{ color: topCtaText, opacity: 0.85 }}
                >
                  {topCta?.subheading || topCta?.subtitle || "Interact with experts, Get free consultation."}
                </p>
              </div>

              {topCta?.button_url && topCta.button_url !== "#" && !topCta?.is_modal ? (
                <Link
                  href={topCta.button_url}
                  className="shrink-0 flex items-center gap-2.5 rounded-full px-7 py-3 text-sm md:text-base font-bold shadow-sm transition hover:shadow-md hover:scale-[1.02]"
                  style={{ backgroundColor: topCtaBtnBg, color: topCtaBtnText }}
                >
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded"
                    style={{ backgroundColor: topCtaBtnText, color: topCtaBtnBg }}
                  >
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.28-.28.36-.67.25-1.02A11.36 11.36 0 018.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-.99-1z" />
                    </svg>
                  </div>
                  <span>{topCta?.button_text || "Talk to Experts"}</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => openExpertForm(topCta?.heading || topCta?.title, topCta?.subheading || topCta?.subtitle)}
                  className="cursor-pointer shrink-0 flex items-center gap-2.5 rounded-full px-7 py-3 text-sm md:text-base font-bold shadow-sm transition hover:shadow-md hover:scale-[1.02]"
                  style={{ backgroundColor: topCtaBtnBg, color: topCtaBtnText }}
                >
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded"
                    style={{ backgroundColor: topCtaBtnText, color: topCtaBtnBg }}
                  >
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.28-.28.36-.67.25-1.02A11.36 11.36 0 018.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-.99-1z" />
                    </svg>
                  </div>
                  <span>{topCta?.button_text || "Talk to Experts"}</span>
                </button>
              )}
            </div>
          )}

          {/* =====================================================
              2. FOUR COLUMNS GRID
          ====================================================== */}
          <div className="grid grid-cols-1 gap-6 sm:gap-6 md:gap-8 lg:grid-cols-12 lg:gap-8 pb-4 sm:pb-3">
            {/* COLUMN 1: BRAND, CONTACT INFO, SOCIALS, GOOGLE RATING */}
            <div className="flex flex-col items-start lg:col-span-4">
              <h4
                className="text-[13.5px] font-extrabold uppercase tracking-normal mb-2.5"
                style={{ color: accentColor }}
              >
                {brand?.name || "SODE COUNSELING SERVICES LLP"}
              </h4>

              {/* Contact Information */}
              <div className="space-y-1.5 w-full">
                {/* Address */}
                <div className="flex items-start gap-2.5">
                  <div
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                    style={{ backgroundColor: accentColor, color: bgColor }}
                  >
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <p className="text-[12.5px] sm:text-[13px] leading-snug text-gray-200 pt-0.5">
                    {brand?.address || brand?.corporate_address || "B-63, B Block, Sector 2 Noida, Uttar Pradesh 201301"}
                  </p>
                </div>

                {/* Email */}
                {(brand?.email || brand?.support_email) && (
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                      style={{ backgroundColor: accentColor, color: bgColor }}
                    >
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <a
                      href={`mailto:${brand?.email || brand?.support_email}`}
                      className="text-[12.5px] sm:text-[13px] text-gray-200 hover:text-white transition-colors"
                    >
                      {brand?.email || brand?.support_email}
                    </a>
                  </div>
                )}

                {/* Phone */}
                {(brand?.phone || brand?.support_phone) && (
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                      style={{ backgroundColor: accentColor, color: bgColor }}
                    >
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.28-.28.36-.67.25-1.02A11.36 11.36 0 018.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-.99-1z" />
                      </svg>
                    </div>
                    <a
                      href={`tel:${(brand?.phone || brand?.support_phone).replace(/\s+/g, "")}`}
                      className="text-[12.5px] sm:text-[13px] text-gray-200 hover:text-white transition-colors"
                    >
                      {brand?.phone || brand?.support_phone}
                    </a>
                  </div>
                )}
              </div>

              {/* Social Media Links (Desktop: in Column 1, Mobile: shown in 4th cell next to GET STARTED) */}
              <div className="mt-5 hidden sm:flex items-center gap-2">
                {socialLinksToRender.map((s, idx) => (
                  <a
                    key={s?._id || idx}
                    href={s.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label || s.platform || "Social"}
                    title={s.label || s.platform || "Social"}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white transition-transform hover:scale-110 shadow-sm"
                    style={{ color: bgColor }}
                  >
                    {renderSocialIcon(s.platform)}
                  </a>
                ))}
              </div>
              {/* Google Rating Card (Desktop: in Column 1, Mobile: shown under social in 4th cell next to GET STARTED) */}
              {mediaBar?.show_rating !== false && (
                <div className="mt-5 hidden sm:flex items-center gap-3 rounded-lg bg-white px-3.5 py-2.5 shadow-md">
                  <div className="shrink-0">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.28-2.1 3.66-5.2 3.66-9.12z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.13z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-semibold text-gray-800 leading-tight">
                      {mediaBar?.heading || "Google Rating"}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] font-bold text-gray-900">
                        {mediaBar?.rating_score || 4.7}
                      </span>
                      <div className="flex items-center text-[#F9A825]">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500 leading-tight">
                      {mediaBar?.rating_text || `Based on ${mediaBar?.rating_reviews_count || 1027} reviews`}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* COLUMNS 2, 3, 4: NAVIGATION SECTIONS */}
            <div
              className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 sm:gap-8 pt-2 sm:pt-0"
              style={{ rowGap: "30px" }}
            >
              {columnsToRender.map((col, idx) => (
                <div key={col?._id || idx} className="flex flex-col">
                  <h4
                    className="mb-3 text-[13px] font-extrabold uppercase tracking-normal"
                    style={{ color: accentColor }}
                  >
                    {col.title}
                  </h4>
                  <ul className="space-y-1.5 text-[13px] text-gray-300 leading-tight">
                    {Array.isArray(col.links) &&
                      col.links.map((link, lIdx) => {
                        if (link?.enabled === false) return null;
                        const isModal = link.is_modal;

                        return (
                          <li key={link?._id || lIdx} className="flex items-center gap-1.5">
                            {isModal ? (
                              <button
                                type="button"
                                onClick={() => openExpertForm(link.label, "Get expert guidance and counseling")}
                                className="cursor-pointer text-left text-gray-300 hover:text-white transition-colors"
                              >
                                {link.label}
                              </button>
                            ) : (
                              <Link
                                href={link.url || "#"}
                                target={link.target || "_self"}
                                className="text-gray-300 hover:text-white transition-colors truncate"
                                title={link.label}
                              >
                                {link.label}
                              </Link>
                            )}
                            {link.badge && (
                              <span
                                className="rounded px-1.5 py-0.2 text-[9px] font-bold"
                                style={{ backgroundColor: accentColor, color: bgColor }}
                              >
                                {link.badge}
                              </span>
                            )}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ))}

              {/* Mobile-only: Social links (1 row) + Review / Google Rating card placed in the 4th cell next to GET STARTED */}
              <div className="flex flex-col sm:hidden justify-start pt-1.5">
                {/* 1 Row for all 5 social icons without wrapping */}
                <div className="flex items-center gap-1.5 flex-nowrap">
                  {socialLinksToRender.map((s, idx) => (
                    <a
                      key={s?._id || idx}
                      href={s.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label || s.platform || "Social"}
                      title={s.label || s.platform || "Social"}
                      className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-md bg-white transition-transform hover:scale-110 shadow-xs"
                      style={{ color: bgColor }}
                    >
                      {renderSocialIcon(s.platform)}
                    </a>
                  ))}
                </div>

                {/* Review card under social links */}
                {mediaBar?.show_rating !== false && (
                  <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-white p-2 shadow-xs">
                    <div className="shrink-0">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.28-2.1 3.66-5.2 3.66-9.12z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.26 21.36 7.33 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.13z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-semibold text-gray-800 leading-tight truncate">
                        {mediaBar?.heading || "Google Rating"}
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[9.5px] font-bold text-gray-900">
                          {mediaBar?.rating_score || 4.7}
                        </span>
                        <div className="flex items-center text-[#F9A825]">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="h-2 w-2 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="text-[8px] text-gray-500 leading-tight truncate">
                        {mediaBar?.rating_text || `Based on ${mediaBar?.rating_reviews_count || 1027} reviews`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =====================================================
              3. LEGAL NOTICE SECTION (Centered)
          ====================================================== */}
          {legal?.show_legal_notice !== false && legal?.disclaimer_text && (
            <div className="mt-6 sm:mt-3 mb-4 pt-2 sm:pt-0 text-center max-w-4xl mx-auto px-2">
              <h5
                className="text-[12px] sm:text-[13px] font-bold uppercase tracking-normal mb-1"
                style={{ color: accentColor }}
              >
                {legal?.legal_notice_heading || "LEGAL NOTICE"}
              </h5>
              <p className="text-[11px] sm:text-[12px] leading-relaxed text-gray-300 font-normal">
                {legal.disclaimer_text}
              </p>
            </div>
          )}

          {/* =====================================================
              4. BOTTOM BAR: COPYRIGHT & POLICIES
          ====================================================== */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-3 text-[12px] text-gray-300">
            <p className="order-2 sm:order-1 text-center sm:text-left">
              {legal?.copyright_text || "© 2026 SODE Counseling Services LLP | All Rights Reserved"}
            </p>

            <div className="order-1 sm:order-2 flex flex-wrap items-center justify-center gap-2">
              {Array.isArray(legal?.legal_links) && legal.legal_links.length > 0 ? (
                legal.legal_links.map((link, idx) => (
                  <span key={link?._id || idx} className="flex items-center gap-2">
                    {link.is_modal ? (
                      <button
                        type="button"
                        onClick={() => setActiveDialog(link.modal_type || link.slug || "disclaimer")}
                        className="cursor-pointer text-gray-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.url || "#"}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                    {idx < legal.legal_links.length - 1 && <span aria-hidden="true">|</span>}
                  </span>
                ))
              ) : availablePolicies.length > 0 ? (
                availablePolicies.map((policy, idx) => {
                  if (policy?.enabled === false || policy?.show_in_footer === false) return null;
                  const slug = policy?.slug || policy?.type || "disclaimer";
                  const title = policy?.title || policy?.name || "Policy";

                  return (
                    <span key={policy?._id || idx} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveDialog(slug)}
                        className="cursor-pointer text-gray-300 hover:text-white transition-colors"
                      >
                        {title}
                      </button>
                      {idx < availablePolicies.length - 1 && <span aria-hidden="true">|</span>}
                    </span>
                  );
                })
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveDialog("disclaimer")}
                    className="cursor-pointer text-gray-300 hover:text-white transition-colors"
                  >
                    Disclaimer
                  </button>
                  <span aria-hidden="true">|</span>
                  <button
                    type="button"
                    onClick={() => setActiveDialog("privacy")}
                    className="cursor-pointer text-gray-300 hover:text-white transition-colors"
                  >
                    Privacy
                  </button>
                  <span aria-hidden="true">|</span>
                  <button
                    type="button"
                    onClick={() => setActiveDialog("terms")}
                    className="cursor-pointer text-gray-300 hover:text-white transition-colors"
                  >
                    Terms & Condition
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Legal Policy Modal */}
        {activeDialog && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
            <div className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl text-gray-800">
              <button
                type="button"
                onClick={closeLegalDialog}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 font-bold text-lg"
              >
                ✕
              </button>
              <div className="space-y-4">
                <DynamicLegalModal
                  policy={availablePolicies.find(
                    (p) => p?.slug === activeDialog || p?.type === activeDialog
                  )}
                  onClose={closeLegalDialog}
                />
              </div>
            </div>
          </div>
        )}
      </footer>
    </>
  );
}

export default Footer;
