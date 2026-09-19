"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DynamicLegalModal from "@/components/common/legal/DynamicLegalModal";
import { useFormModal } from "@/hooks/useFormModal";
import { getAssetPath } from "@/lib/utils";

import {
  UNIVERSITIES as defaultUniversities,
  PROGRAMS as defaultPrograms,
} from "@/constants/footerData";

export function Footer({
  initialUniversities = defaultUniversities,
  initialPrograms = defaultPrograms,
  initialHeaderData = null,
  initialFooterData = null,
  initialLegalPolicies = [],
}) {
  const UNIVERSITIES = initialUniversities || defaultUniversities;
  const PROGRAMS = initialPrograms || defaultPrograms;
  const { openFormModal } = useFormModal();

  // 1. Resolve Data from Props
  const headerData = initialHeaderData?.result || initialHeaderData || {};
  const footer = initialFooterData?.result || initialFooterData || {};

  const brand = footer?.brand;
  const topCta = footer?.top_cta;
  const mediaBar = footer?.media_bar;
  const aiTools = footer?.ai_tools;
  const dynamicColumns = Array.isArray(footer?.columns) && footer.columns.length > 0
    ? footer.columns.filter((c) => c?.enabled !== false)
    : null;
  const legal = footer?.legal;
  const availablePolicies =
    Array.isArray(legal?.policies) && legal.policies.length > 0
      ? legal.policies
      : Array.isArray(initialLegalPolicies) && initialLegalPolicies.length > 0
      ? initialLegalPolicies
      : [];

  // Logo resolution priority: Brand logo_dark -> Brand logo -> Header logo_dark -> Header logo -> fallback
  const footerLogoUrl =
    brand?.logo_dark?.url ||
    brand?.logo?.url ||
    (typeof brand?.logo === "string" ? brand.logo : null) ||
    headerData?.logo_dark?.url ||
    headerData?.logo?.url ||
    "https://new.crm.api.mysode.com/minio/images/2026/08/26/eead3d99495d3d4cb48cca6822ba874a.webp";

  const [activeDialog, setActiveDialog] = useState(null);

  const openExpertForm = (customTitle, customSubtitle) => {
    openFormModal({
      title: customTitle || "Talk to Experts",
      subtitle: customSubtitle || "Select your course and our academic experts will assist you",
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
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
          <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.25c0-1.01.28-1.7 1.75-1.7H17V2.42C16.7 2.38 15.67 2.3 14.45 2.3c-2.55 0-4.3 1.56-4.3 4.42V9.5H7.25V13h2.9v9h3.35Z" />
        </svg>
      );
    }
    if (p.includes("twitter") || p === "x") {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M18.9 2H22l-6.77 7.74L23 22h-6.09l-4.77-6.24L6.68 22H3.56l7.13-8.15L3.24 2h6.24l4.31 5.7L18.9 2Zm-1.09 17.84h1.72L8.54 4.05H6.69l11.12 15.79Z" />
        </svg>
      );
    }
    if (p.includes("insta")) {
      return (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    }
    if (p.includes("link")) {
      return (
        <svg viewBox="0 0 24 24" className="h-4.25 w-4.25" fill="currentColor">
          <path d="M5.34 3.5A2.34 2.34 0 1 1 5.34 8.18 2.34 2.34 0 0 1 5.34 3.5ZM3.32 9.86h4.04V22H3.32V9.86ZM9.78 9.86h3.87v1.66h.06c.54-1.02 1.86-2.1 3.82-2.1 4.09 0 4.84 2.69 4.84 6.19V22h-4.03v-5.66c0-1.35-.03-3.09-1.88-3.09-1.88 0-2.17 1.47-2.17 2.99V22H9.78V9.86Z" />
        </svg>
      );
    }
    if (p.includes("you")) {
      return (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
          <path d="M23.5 6.2a3.03 3.03 0 0 0-2.13-2.14C19.49 3.55 12 3.55 12 3.55s-7.49 0-9.37.51A3.03 3.03 0 0 0 .5 6.2 31.48 31.48 0 0 0 0 12a31.48 31.48 0 0 0 .5 5.8 3.03 3.03 0 0 0 2.13 2.14c1.88.51 9.37.51 9.37.51s7.49 0 9.37-.51a3.03 3.03 0 0 0 2.13-2.14A31.48 31.48 0 0 0 24 12a31.48 31.48 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.23 3.6L9.6 15.6Z" />
        </svg>
      );
    }
    if (p.includes("pint")) {
      return (
        <Image
          src={getAssetPath("/assets/images/pinterest.png")}
          alt="Pinterest"
          width={32}
          height={32}
          className="object-contain"
          style={{ width: "auto", height: "auto" }}
        />
      );
    }
    // Default link icon
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    );
  };

  return (
    <>
      <footer className="w-full">
        {/* =====================================================
            1. TOP CTA SECTION (Dynamic from Backend)
        ====================================================== */}
        {topCta?.enabled !== false && (
          <section className="bg-[#1d3557] py-8 md:py-10" id="expert-counseling">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-extrabold text-[#f1dfa0] md:text-4xl">
                    {topCta?.title || "Need clarification?"}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-white md:text-[18px]">
                    {topCta?.subtitle || "Interact with experts, Get free consultation."}
                  </p>
                </div>

                {topCta?.button_link && topCta.button_link.startsWith("/") ? (
                  <Link
                    href={topCta.button_link}
                    className="flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-[#EEC471] to-[#F1E2A3] px-8 py-3.5 text-base font-extrabold text-[#1d3557] shadow-md transition duration-300 hover:scale-[1.03] hover:shadow-xl"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{topCta?.button_text || "Book Free Consultation"}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => openExpertForm(topCta?.title, topCta?.subtitle)}
                    className="flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-[#EEC471] to-[#F1E2A3] px-8 py-3.5 text-base font-extrabold text-[#1d3557] shadow-md transition duration-300 hover:scale-[1.03] hover:shadow-xl"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{topCta?.button_text || "Book Free Consultation"}</span>
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            2. TRUST / MEDIA BAR (Optional Backend Feature)
        ====================================================== */}
        {mediaBar?.enabled && Array.isArray(mediaBar?.logos) && mediaBar.logos.length > 0 && (
          <section className="border-b border-[#A66E38]/20 bg-linear-to-r from-[#E6BC65]/20 to-[#E8D999]/20 py-4">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  {mediaBar.heading || "Featured In & Recognized By"}
                </span>
                <div className="flex flex-wrap items-center gap-6">
                  {mediaBar.logos.map((item, idx) => {
                    const logoUrl = item?.logo?.url || (typeof item?.logo === "string" ? item.logo : null);
                    if (!logoUrl) return null;
                    return (
                      <div key={item?._id || idx} className="relative h-6 w-24 opacity-80 transition hover:opacity-100">
                        <Image
                          src={logoUrl}
                          alt={item.name || "Media"}
                          fill
                          className="object-contain"
                          sizes="100px"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            3. AI TOOLS BAR (Optional Backend Feature)
        ====================================================== */}
        {aiTools?.enabled && Array.isArray(aiTools?.cards) && aiTools.cards.length > 0 && (
          <section className="border-b border-[#A66E38]/15 bg-[#142943] py-4 text-white">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="text-center md:text-left">
                  <span className="text-sm font-bold text-[#F1E2A3]">
                    {aiTools.heading || "Explore AI Powered Education Tools"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {aiTools.cards.map((tool, idx) => (
                    <Link
                      key={tool?._id || idx}
                      href={tool.link || "#"}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gray-200 backdrop-blur transition hover:bg-[#EEC471] hover:text-[#1d3557]"
                    >
                      <span>{tool.title}</span>
                      {tool.badge && (
                        <span className="rounded-full bg-[#EEC471] px-1.5 py-0.2 text-[9px] font-bold text-[#1d3557]">
                          {tool.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            4. MAIN FOOTER LINKS & BRAND SECTION
        ====================================================== */}
        <section className="border-t border-[#A66E38]/20 bg-linear-to-r from-[#EEC471] to-[#F1E2A3] pb-8 pt-12 text-gray-800 md:pt-16">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
              {/* =================================================
                  COLUMN 1: LOGO, ADDRESS, SOCIALS AND MAP
              ================================================== */}
              <div className="flex flex-col items-start md:col-span-2 lg:col-span-4">
                <div className="relative mb-5 h-16 w-48 md:w-56">
                  <Image
                    src={footerLogoUrl}
                    alt={brand?.name || "School of Online and Distance Education"}
                    fill
                    sizes="230px"
                    loading="eager"
                    className="object-contain object-left"
                  />
                </div>

                <address className="max-w-80 not-italic text-[13px] leading-6 text-gray-700 md:text-[13.5px] whitespace-pre-line">
                  {brand?.address || "B-63, B Block, Sector 2\nNoida, Uttar Pradesh 201301"}
                </address>

                {brand?.email && (
                  <p className="mt-2 text-[13px] text-gray-700">
                    <span className="font-semibold">Email: </span>
                    <a href={`mailto:${brand.email}`} className="hover:underline">
                      {brand.email}
                    </a>
                  </p>
                )}

                {brand?.phone && (
                  <p className="mt-1 text-[13px] text-gray-700">
                    <span className="font-semibold">Phone: </span>
                    <a href={`tel:${brand.phone}`} className="hover:underline">
                      {brand.phone}
                    </a>
                  </p>
                )}

                {/* Social Media Icons */}
                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  {Array.isArray(brand?.social_links) && brand.social_links.length > 0 ? (
                    brand.social_links.map((s, idx) => {
                      const iconUrl = s?.icon?.url || (typeof s?.icon === "string" ? s.icon : null);
                      return (
                        <a
                          key={s?._id || idx}
                          href={s.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.platform || "Social Link"}
                          title={s.platform || "Social Link"}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3557] text-[#f4cc78] transition duration-300 hover:-translate-y-1 hover:bg-[#142943] overflow-hidden p-1"
                        >
                          {iconUrl ? (
                            <img
                              src={iconUrl}
                              alt={s.platform || "Social"}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            renderSocialIcon(s.platform)
                          )}
                        </a>
                      );
                    })
                  ) : (
                    <>
                      <a
                        href="https://www.facebook.com/distanceeducationschool/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        title="Facebook"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3557] text-[#f4cc78] transition duration-300 hover:-translate-y-1 hover:bg-[#142943]"
                      >
                        {renderSocialIcon("facebook")}
                      </a>
                      <a
                        href="https://x.com/distance_school"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X"
                        title="X"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3557] text-[#f4cc78] transition duration-300 hover:-translate-y-1 hover:bg-[#142943]"
                      >
                        {renderSocialIcon("x")}
                      </a>
                      <a
                        href="https://www.instagram.com/distanceeducationschool/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        title="Instagram"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3557] text-[#f4cc78] transition duration-300 hover:-translate-y-1 hover:bg-[#142943]"
                      >
                        {renderSocialIcon("instagram")}
                      </a>
                      <a
                        href="https://in.linkedin.com/company/distanceeducationschool"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        title="LinkedIn"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3557] text-[#f4cc78] transition duration-300 hover:-translate-y-1 hover:bg-[#142943]"
                      >
                        {renderSocialIcon("linkedin")}
                      </a>
                      <a
                        href="https://www.youtube.com/channel/UCw9KLsERm_EzL2js_s7GbLQ/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        title="YouTube"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3557] text-[#f4cc78] transition duration-300 hover:-translate-y-1 hover:bg-[#142943]"
                      >
                        {renderSocialIcon("youtube")}
                      </a>
                      <a
                        href="https://in.pinterest.com/distanceeducationschoolportal/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Pinterest"
                        title="Pinterest"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3557] text-[#f4cc78] transition duration-300 hover:-translate-y-1 hover:bg-[#142943]"
                      >
                        {renderSocialIcon("pinterest")}
                      </a>
                    </>
                  )}
                </div>

                {/* Google Map */}
                <div className="mt-6 h-32.5 w-full max-w-75 overflow-hidden rounded-[10px] bg-white shadow-sm">
                  <iframe
                    title="Location"
                    src={
                      brand?.google_map_embed_url ||
                      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4768637898865!2d77.31186327549909!3d28.585467775690503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5c84f62bb1f%3A0x2af499e58ca3717!2sSODE%20Counseling%20Services%20LLP!5e0!3m2!1sen!2sin!4v1783424979173!5m2!1sen!2sin"
                    }
                    width="300"
                    height="130"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="block h-full w-full border-0"
                  />
                </div>
              </div>

              {/* =================================================
                  COLUMNS 2+: DYNAMIC FROM BACKEND OR FALLBACK
              ================================================== */}
              {dynamicColumns ? (
                <div className="lg:col-span-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {dynamicColumns.map((col, idx) => (
                    <div key={col?._id || idx} className="flex flex-col">
                      <h4 className="mb-4 text-[14px] font-extrabold uppercase tracking-wider text-gray-900">
                        {col.title}
                      </h4>
                      <ul className="space-y-2.5 text-[14px] font-medium text-gray-700">
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
                                    className="cursor-pointer text-left text-gray-700 hover:text-gray-950 transition-colors"
                                  >
                                    {link.label}
                                  </button>
                                ) : (
                                  <Link
                                    href={link.url || "#"}
                                    target={link.target || "_self"}
                                    className="text-gray-700 hover:text-gray-950 transition-colors truncate"
                                    title={link.label}
                                  >
                                    {link.label}
                                  </Link>
                                )}
                                {link.badge && (
                                  <span className="rounded bg-[#1d3557] px-1.5 py-0.2 text-[9px] font-bold text-[#F1E2A3]">
                                    {link.badge}
                                  </span>
                                )}
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {/* Top Universities */}
                  <div className="lg:col-span-3">
                    <h4 className="mb-6 text-[14px] font-extrabold uppercase tracking-wider text-gray-900">
                      Top Universities
                    </h4>
                    <ul className="space-y-3.5 text-[14px] font-medium text-gray-700">
                      {UNIVERSITIES.map((university) => (
                        <li key={university}>
                          <Link
                            href="#prestigious-institutions"
                            className="text-gray-700 hover:text-gray-950 transition-colors"
                          >
                            {university}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Online Programs */}
                  <div className="lg:col-span-3">
                    <h4 className="mb-6 text-[14px] font-extrabold uppercase tracking-wider text-gray-900">
                      Online Programs
                    </h4>
                    <ul className="space-y-3.5 text-[14px] font-medium text-gray-700">
                      {PROGRAMS.map((program) => (
                        <li key={program}>
                          <Link
                            href="#premium-programs"
                            className="text-gray-700 hover:text-gray-950 transition-colors"
                          >
                            {program}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Get Started */}
                  <div className="lg:col-span-2">
                    <h4 className="mb-6 text-[14px] font-extrabold uppercase tracking-wider text-gray-900">
                      Get Started
                    </h4>
                    <ul className="space-y-3.5 text-[14px] font-medium text-gray-700">
                      <li>
                        <Link href="#why-choose" className="text-gray-700 hover:text-gray-950 transition-colors">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => openExpertForm()}
                          className="cursor-pointer text-left text-gray-700 hover:text-gray-950 transition-colors"
                        >
                          Contact Us
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => openExpertForm()}
                          className="cursor-pointer text-left text-gray-700 hover:text-gray-950 transition-colors"
                        >
                          Book Free Counseling
                        </button>
                      </li>
                      <li>
                        <Link href="#alumni-voices" className="text-gray-700 hover:text-gray-950 transition-colors">
                          Alumni Voices
                        </Link>
                      </li>
                      <li>
                        <Link href="#faqs" className="text-gray-700 hover:text-gray-950 transition-colors">
                          FAQs
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>

            {/* =================================================
                5. LEGAL NOTICE & DISCLAIMER
            ================================================== */}
            {legal?.show_legal_notice && legal?.disclaimer_text && (
              <div className="mb-6 rounded-lg border border-[#A66E38]/20 bg-white/40 p-4 text-[12px] leading-relaxed text-gray-600">
                {legal?.legal_notice_heading && (
                  <p className="font-bold text-gray-800 mb-1">{legal.legal_notice_heading}:</p>
                )}
                <p>{legal.disclaimer_text}</p>
              </div>
            )}

            {/* =================================================
                6. COPYRIGHT & LEGAL LINKS
            ================================================== */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-[#A66E38]/25 pt-6 text-[13.5px] font-medium text-gray-700 md:flex-row">
              <p className="order-2 text-center md:order-1 md:text-left">
                {legal?.copyright_text || "Copyright 2026 SODE Counseling Services LLP | All Rights Reserved"}
              </p>

              <div className="order-1 flex flex-wrap items-center justify-center gap-2 md:order-2">
                {availablePolicies.length > 0 ? (
                  availablePolicies.map((policy, idx) => {
                    if (policy?.enabled === false || policy?.show_in_footer === false) return null;
                    const slug = policy?.slug || policy?.type || "disclaimer";
                    const title = policy?.title || policy?.name || "Policy";

                    return (
                      <span key={policy?._id || idx} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveDialog(slug)}
                          className="cursor-pointer text-gray-700 hover:text-gray-950 transition-colors"
                        >
                          {title}
                        </button>
                        {idx < availablePolicies.length - 1 && <span aria-hidden="true">|</span>}
                      </span>
                    );
                  })
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* Legal content triggers directly when activeDialog has content */}
        {activeDialog && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
            <div className="relative max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
              <button
                type="button"
                onClick={closeLegalDialog}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 font-bold"
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
