"use client";

import React from "react";
import Image from "next/image";
import { User } from "lucide-react";

/**
 * Reusable Landing About Section
 * Supports:
 * 1. VGU Full-Width Deep Blue Banner (#30669b) with campus image and yellow CTA
 * 2. SMU Full-Width Teal Banner (#006372) with peeking student model + Visionary Leader
 * 3. Campus Stats Layout (Manipal - 4 stats metrics + panoramic building)
 * 4. Classic & Shoolini 2-Column Layout (with howItWorks box and outline Apply button)
 */
export default function LandingAbout({
  about = {},
  brand = {},
  leader = null,
  stats = [],
  onOpenApply,
}) {
  if (!about || Object.keys(about).length === 0 || brand.hideAbout) return null;

  const universityName = brand.name || "University Online";
  const title = about.title || `About ${universityName}`;
  const isCampusStats = brand.aboutLayout === "campusStats";
  const primaryColor = brand.primaryColor || "#ee3024";

  const paragraphs = about.paragraphs || [
    about.text1,
    about.text2,
    about.text3,
  ].filter(Boolean);

  const buttonText = about.buttonText || "Apply Now";
  const imageSrc =
    about.image ||
    brand.campusImage ||
    brand.buildingAboutImage ||
    "/assets/manipal_v1_images/manipal-about.webp";

  const activeStats = stats.length > 0 ? stats : brand.stats || [];
  const leaderData = leader || about.leader;

  // ==========================================
  // Layout 0-IIITB: About IIIT Bangalore Online Courses (#about-section)
  // ==========================================
  const isIiitbLayout = brand.aboutLayout === "iiitb" || brand.slug === "iiitb";
  if (isIiitbLayout) {
    const campusImage =
      about.image ||
      brand.campusImage ||
      "/assets/all_universities_images/iiitb/iiit-b-about-image.webp";
    const mainTitle = about.title || "About IIIT Bangalore \nOnline Courses";

    return (
      <section
        id="about-section"
        className="about-section bg-[#005a8d] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 select-none scroll-mt-20"
      >
        <div className="about-container max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 lg:gap-12 items-center">
          {/* Left Image */}
          <div className="about-image flex justify-center w-full">
            <div className="relative w-full max-w-[500px] h-[230px] sm:h-[340px] lg:h-[460px] rounded-[6px] sm:rounded-[10px] overflow-hidden shadow-lg">
              <Image
                src={campusImage}
                alt="IIIT Bangalore Campus"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="about-content text-left w-full">
            <h2 className="text-[24px] sm:text-[34px] lg:text-[38px] font-extrabold text-white leading-tight m-0 mb-2 whitespace-pre-line">
              {mainTitle}
            </h2>
            <span className="underline block w-full h-[2px] bg-white my-3" />

            <div className="space-y-4 text-[13.5px] sm:text-[15px] text-[#ffffff] leading-relaxed mb-4 sm:mb-6 font-normal">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="m-0 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="about-actions hidden sm:flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="btn red px-5 py-3 bg-[#ba0000] hover:bg-[#a00000] text-white font-semibold text-[14px] rounded-[6px] border-none cursor-pointer flex items-center gap-2 transition-all active:scale-95 shadow-md"
              >
                <i className="fa fa-phone" />
                <span>Request Call Back</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="btn outline px-5 py-3 bg-transparent hover:bg-white/10 text-white font-semibold text-[14px] rounded-[6px] border border-white cursor-pointer flex items-center gap-2 transition-all active:scale-95"
              >
                <span>Get 1:1 FREE Counseling</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0-UU: About Uttaranchal University Online + 4 Why Choose Cards (#about)
  // ==========================================
  const isUuLayout = brand.aboutLayout === "uu" || brand.slug === "uu";
  if (isUuLayout) {
    const subtitleText = about.badge || about.subtitle || "About";
    const mainTitle = about.title || "Uttaranchal University Online";
    const whyChooseHeading = about.whyChooseTitle || "Why Choose";
    const whyChooseHighlight = about.whyChooseHighlight || "Uttaranchal University Online?";
    const whyChooseCards = about.features || about.whyChooseCards || brand.aboutCards || [
      {
        title: "Engagement",
        desc: "Uttaranchal University online offers top tier support to its students and mentorship for personalised learning",
        icon: "/assets/all_universities_images/uu/icon-uttaranchal-1.webp",
      },
      {
        title: "Student-Friendly Study",
        desc: "Uttaranchal University's online, user friendly, learner centric LMS, live and interactive sessions, and well-designed self learning materials.",
        icon: "/assets/all_universities_images/uu/icon-uttaranchal-2.webp",
      },
      {
        title: "Curriculum by Experts",
        desc: "Uttaranchal University's online research-intensive curriculum is drafted by its expert members of faculty and industry leaders.",
        icon: "/assets/all_universities_images/uu/icon-uttaranchal-3.webp",
      },
      {
        title: "Globally Accepted",
        desc: "Uttaranchal University's online programs under its curriculum are globally accepted. Uttaranchal University's fee is also affordable for all its programs.",
        icon: "/assets/all_universities_images/uu/icon-uttaranchal-4.webp",
      },
    ];

    return (
      <section id="about" className="w-full relative select-none py-12 sm:py-16 bg-white scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top: About Text + Campus Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
            <div className="lg:col-span-7">
              <span className="text-[#62B239] font-semibold text-[20px] sm:text-[24px] block mb-1">
                {subtitleText}
              </span>
              <h2 className="text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-[#111111] leading-tight m-0 mb-4">
                {mainTitle}
              </h2>
              <div className="space-y-3.5 text-[12.5px] sm:text-[13.5px] leading-relaxed text-[#333333] font-normal mb-6">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="m-0 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              <div className="hidden sm:block">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className="px-6 py-2 border border-[#0A3C7D] text-[#0A3C7D] hover:bg-[#0A3C7D] hover:text-white font-semibold text-[13.5px] rounded-[4px] bg-transparent transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  {buttonText || "Apply Now"}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full aspect-[4/3] rounded-[8px] overflow-hidden shadow-md">
                <Image
                  src={imageSrc || "/assets/all_universities_images/uu/about-Uttaranchal.webp"}
                  alt={mainTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>
          </div>

          {/* Bottom: Why Choose Uttaranchal University Online? (4 Cards) */}
          <div>
            <h3 className="text-center text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-[#111111] m-0 mb-8 sm:mb-10">
              {whyChooseHeading} <span className="text-[#62B239]">{whyChooseHighlight}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
              {whyChooseCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-[#f8f9fa] rounded-[8px] p-5 sm:p-6 flex items-start gap-4 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                    <Image
                      src={card.icon}
                      alt={card.title}
                      fill
                      className="object-contain"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <h4 className="text-[15px] sm:text-[16px] font-bold text-[#111111] m-0 mb-1 leading-snug">
                      {card.title}
                    </h4>
                    <p className="text-[12px] sm:text-[12.5px] text-[#555555] leading-relaxed m-0 font-normal">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0-Liverpool: About Liverpool Business School (#about)
  // ==========================================
  const isLiverpoolLayout = brand.aboutLayout === "liverpool" || brand.slug === "liverpool";
  if (isLiverpoolLayout) {
    const bgImg = brand.aboutBgImage || "/assets/all_universities_images/liverpool/ljmu-rev.png";
    return (
      <section
        id="about"
        className="w-full relative select-none py-14 sm:py-20 bg-cover bg-center scroll-mt-20 text-white"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="max-w-2xl bg-black/45 backdrop-blur-xs p-6 sm:p-10 rounded-[12px] border border-white/10 shadow-xl">
            <h2 className="text-[26px] sm:text-[32px] font-bold mb-4 text-white m-0">
              {title || "About Liverpool Business School"}
            </h2>
            <div className="space-y-4 text-[14px] sm:text-[15px] leading-relaxed text-white/95 mt-4">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="m-0 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <div className="pt-6">
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="px-6 py-2.5 bg-[#00408d] text-white font-bold text-[14px] rounded-[5px] hover:brightness-110 active:scale-95 transition-all border-none cursor-pointer inline-flex items-center gap-2 shadow-md"
              >
                <i className="fa fa-phone text-white" />
                <span>Request Call Back</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0-Rushford: About Us with Campus Building Image (#about)
  // ==========================================
  const isRushfordLayout = brand.aboutLayout === "rushford" || brand.slug === "rushford";
  if (isRushfordLayout) {
    return (
      <section id="about" className="w-full relative select-none py-12 sm:py-16 bg-white scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-[26px] sm:text-[32px] font-bold text-[#111111] mb-4 uppercase tracking-wide">
                {title}
              </h2>
              <div className="space-y-4 text-[14px] sm:text-[15px] leading-relaxed text-[#333333]">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="m-0">
                    {p}
                  </p>
                ))}
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className="px-6 py-2.5 bg-[#0cb1ef] text-white font-bold text-[14px] rounded-[5px] hover:brightness-95 transition-all cursor-pointer border-none shadow-sm active:scale-95"
                >
                  {buttonText || "Request Call Back"}
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full aspect-[4/3] rounded-[8px] overflow-hidden shadow-sm">
                <Image
                  src={imageSrc || "/assets/all_universities_images/rushford/rushford-campus-buiding.webp"}
                  alt="Rushford Campus"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0-ESGCI: Centered Green About Section (#about)
  // ==========================================
  const isEsgciLayout = !isRushfordLayout && (brand.aboutLayout === "esgci" || brand.slug === "esgci");
  if (isEsgciLayout) {
    return (
      <section
        id="about"
        className="w-full relative select-none py-14 sm:py-18 bg-[#04903c] text-white text-center scroll-mt-20"
        style={{ backgroundColor: brand.aboutBg || "#04903c" }}
      >
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-white mb-4 uppercase tracking-wide m-0">
            {title}
          </h2>
          <div className="space-y-4 text-[14px] sm:text-[15.5px] leading-relaxed text-white/95 font-normal mt-4">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="m-0">
                {p}
              </p>
            ))}
          </div>
          <div className="pt-6">
            <button
              type="button"
              onClick={() => onOpenApply?.()}
              className="px-8 py-3 bg-[#fff000] text-black font-bold text-[15px] rounded-[5px] hover:brightness-95 transition-all cursor-pointer border-none shadow-sm active:scale-95"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0-SSBM: About Online SSBM (#about)
  // ==========================================
  const isSsbmLayout =
    !isRushfordLayout &&
    !isEsgciLayout &&
    (brand.aboutLayout === "ssbm" || brand.slug === "ssbm");
  if (isSsbmLayout) {
    const bgImage =
      about.backgroundImage ||
      brand.aboutBackgroundImage ||
      "/assets/all_universities_images/ssbm/About-pic.webp";

    return (
      <section
        id="about"
        className="w-full relative select-none py-14 sm:py-20 text-white scroll-mt-20 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 p-4 sm:p-8 text-left">
              <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-white mb-6 uppercase tracking-wide m-0">
                {title}
              </h2>
              <div className="space-y-4 text-[13.5px] sm:text-[14.5px] leading-relaxed text-white/95 font-normal mb-8">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="m-0">
                    {p}
                  </p>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="px-7 py-3 bg-[#c11f28] hover:bg-[#a81a22] text-white font-bold text-[15px] rounded-[5px] border-none cursor-pointer shadow-md transition-all active:scale-95"
              >
                {buttonText || "Request Call Back"}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0-GGU: Golden Gate University 50/50 Full-Bleed Split
  // ==========================================
  const isGguLayout =
    !isEsgciLayout &&
    !isSsbmLayout &&
    (brand.aboutLayout === "ggu" || brand.slug === "ggu");
  if (isGguLayout) {
    return (
      <section
        id="about"
        className="w-full relative select-none overflow-hidden bg-[#003468] scroll-mt-20"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[460px] lg:min-h-[500px]">
          {/* Left Text Column */}
          <div className="flex flex-col justify-center px-6 sm:px-12 md:px-14 lg:px-14 xl:px-20 py-12 sm:py-16 text-white text-left">
            <h2 className="text-[24px] sm:text-[28px] lg:text-[30px] font-bold uppercase tracking-tight text-white m-0 leading-tight">
              {title}
            </h2>
            {about.subtitle && (
              <h3 className="text-[15px] sm:text-[16.5px] font-semibold text-white/95 mt-1.5 mb-5 m-0 leading-snug">
                {about.subtitle}
              </h3>
            )}
            <div className="space-y-4 text-[12px] sm:text-[12.5px] lg:text-[13px] leading-[1.65] text-white/95 font-normal max-w-xl">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="m-0">
                  {p}
                </p>
              ))}
            </div>
            <div className="pt-6">
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="bg-[#DC520A] hover:bg-[#c24608] active:scale-95 text-white font-bold text-[14px] px-6 py-2.5 rounded-[4px] shadow-sm transition-all cursor-pointer border-none inline-flex items-center justify-center w-fit"
              >
                <span>{buttonText}</span>
              </button>
            </div>
          </div>

          {/* Right Image Column: Full-bleed Edge-to-Edge */}
          <div className="relative w-full h-[320px] sm:h-[400px] lg:h-full min-h-[350px] lg:min-h-[480px] bg-slate-900">
            <Image
              src={imageSrc}
              alt={title}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0: Mangalayatan University (MU) Centered with Bottom Campus Illustration
  // ==========================================
  const isMuLayout = brand.aboutLayout === "mu" || brand.slug === "mu";
  if (isMuLayout) {
    return (
      <section
        id="about"
        className={`landing-about-section landing-about-mu w-full relative select-none ${brand.aboutSectionClassName || "pt-8 sm:pt-12 pb-[190px] sm:pb-[260px] md:pb-[380px] lg:pb-[480px]"
          }`}
        style={{
          backgroundColor: brand.aboutBg || "#ffffff",
          backgroundImage: `url(${about.backgroundImage || brand.aboutBackgroundImage || "/assets/mu/about-bg.webp"})`,
          backgroundPosition: "bottom center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          ...brand.aboutSectionStyle,
        }}
      >
        <div className={brand.aboutContainerClassName || "max-w-4xl mx-auto px-4 sm:px-6 text-center"}>
          <h2
            className={
              brand.aboutTitleClassName ||
              "text-[24px] sm:text-[28px] lg:text-[32px] font-extrabold text-[#F97316] uppercase tracking-wide mb-4"
            }
            style={brand.aboutTitleStyle}
          >
            {title}
          </h2>
          <div
            className={
              brand.aboutTextClassName ||
              "space-y-4 text-[13.5px] sm:text-[14.5px] text-slate-700 leading-relaxed font-medium mb-8"
            }
          >
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={brand.aboutParagraphClassName || "m-0 text-justify font-medium sm:text-center"}
              >
                {p}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onOpenApply?.()}
            className={
              brand.aboutButtonClassName ||
              "inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-[14px] px-8 py-3 rounded-full shadow-sm active:scale-95 transition-all cursor-pointer border-none"
            }
            style={brand.aboutButtonStyle}
          >
            <span>{buttonText}</span>
            <span className="text-base">→</span>
          </button>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 1: VGU Blue Full-Width Banner
  // ==========================================
  const isVguLayout =
    !isMuLayout &&
    (brand.aboutLayout === "vgu-banner" ||
      brand.aboutLayout === "vgu" ||
      brand.slug === "vgu");

  if (isVguLayout) {
    return (
      <section id="about" className="w-full py-12 sm:py-16 bg-[#30669b] text-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Campus Image Left */}
            <div className="lg:col-span-5">
              <div className="relative w-full h-[240px] sm:h-[300px] lg:h-[330px] rounded-[24px] overflow-hidden shadow-lg">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>

            {/* Content Right */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-white tracking-tight leading-tight m-0">
                {title}
              </h2>

              <div className="space-y-3 text-[13.5px] sm:text-[14.5px] text-white/95 leading-[1.65] font-normal">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="m-0">
                    {p}
                  </p>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className="inline-flex items-center justify-center bg-[#ffc107] hover:bg-[#e0a800] text-slate-950 font-bold text-[14px] px-7 py-2.5 rounded-[6px] shadow-xs active:scale-95 transition-all cursor-pointer border-none"
                >
                  <span>{buttonText}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 2: SMU Deep Teal Full-Width Banner
  // ==========================================
  const isSmuLayout =
    brand.aboutLayout === "smu-banner" || brand.slug === "smu";

  if (isSmuLayout) {
    return (
      <div id="about" className="w-full">
        {/* Deep Teal Banner */}
        <section className="w-full pt-10 sm:pt-14 pb-0 bg-transparent overflow-visible relative select-none">
          <div className="w-full bg-[#006372] relative overflow-visible">
            <div className="max-w-[1240px] xl:max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 md:gap-8">
                {/* Student Model Image with head peeking over the top border */}
                <div className="w-[200px] sm:w-[230px] md:w-[260px] lg:w-[280px] shrink-0 -mt-10 sm:-mt-12 md:-mt-16 lg:-mt-20 relative z-10 self-center md:self-end">
                  <div className="relative w-full h-[280px] sm:h-[320px] md:h-[350px] lg:h-[380px]">
                    <Image
                      src={imageSrc}
                      alt={title}
                      fill
                      priority
                      className="object-contain object-bottom"
                      sizes="(max-width: 768px) 230px, 280px"
                    />
                  </div>
                </div>

                {/* Text Column - Centered Copy */}
                <div className="flex-1 py-8 sm:py-10 md:py-12 text-center text-white space-y-3.5 max-w-4xl mx-auto px-2">
                  <h2 className="text-[22px] sm:text-[26px] lg:text-[30px] font-bold text-white tracking-tight leading-tight m-0 text-center">
                    {title}
                  </h2>

                  <div className="space-y-3 text-[12px] sm:text-[12.5px] lg:text-[13px] text-white/95 leading-[1.65] font-normal text-center">
                    {paragraphs.map((p, idx) => (
                      <p key={idx} className="m-0 max-w-3xl mx-auto">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visionary Leader Section */}
        {leaderData && (
          <section className="w-full bg-white py-10 sm:py-14 lg:py-16">
            <div className="max-w-[1240px] xl:max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-8 space-y-4 sm:space-y-5 text-left">
                  <h2 className="text-[22px] sm:text-[25px] lg:text-[28px] xl:text-[29px] font-bold text-[#111827] tracking-tight leading-[1.25]">
                    The Visionary Leader Behind Sikkim Manipal University<br className="hidden lg:inline" /> Online
                  </h2>

                  <p className="text-[13px] sm:text-[13.5px] lg:text-[14px] text-[#475467] leading-[1.7] font-normal max-w-2xl">
                    {leaderData.desc}
                  </p>

                  <div className="pt-3 sm:pt-4 space-y-0.5">
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-[#074a76]">
                      {leaderData.name}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-[#074a76] font-medium m-0">
                      {leaderData.designation}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[350px] aspect-[350/392] rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#eef1f5] shadow-xs">
                    <Image
                      src={leaderData.image}
                      alt={leaderData.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 320px, 350px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }

  // ==========================================
  // Layout 3: Campus Stats (Manipal)
  // ==========================================
  if (isCampusStats) {
    return (
      <section id="about" className="pt-10 sm:pt-14 pb-0 bg-white relative overflow-hidden select-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight m-0 mb-3">
            About{" "}
            <span style={{ color: primaryColor }}>
              {brand.aboutHighlight || brand.name || "Manipal University Online"}
            </span>
          </h2>

          <div className="max-w-4xl mx-auto space-y-2.5 mb-8 sm:mb-12">
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={`text-[12.5px] sm:text-[13.5px] text-slate-700 leading-relaxed font-normal m-0 ${idx === 1 ? "font-semibold italic text-slate-800" : ""
                  }`}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-2 sm:px-4 relative z-10">
            {activeStats.map((st, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div
                  className="text-[26px] sm:text-[30px] lg:text-[34px] font-black leading-tight tracking-tight"
                  style={{ color: primaryColor }}
                >
                  {st.number}
                </div>
                <div className="text-[11px] sm:text-[12px] text-slate-600 font-medium mt-0.5 leading-snug max-w-[190px]">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-[1440px] 2xl:max-w-[1500px] mx-auto -mt-6 sm:-mt-10 md:-mt-14 z-0">
          <Image
            src={imageSrc}
            alt={about.title || universityName}
            width={1500}
            height={525}
            priority
            className="w-full h-auto object-contain block mx-auto"
            sizes="(max-width: 1536px) 100vw, 1500px"
          />
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 4: Classic & Shoolini 2-Column
  // ==========================================
  const isImageRight =
    brand.aboutLayout === "imageRight" ||
    about.imagePosition === "right";
  const showApplyButton = about.showButton !== false;

  const isDark =
    brand.aboutIsDark ||
    brand.aboutBg === "#003468" ||
    brand.slug === "ggu";

  const sectionBg =
    brand.aboutBg ||
    (brand.themeGradient && brand.primaryColor === "#fd202a"
      ? "linear-gradient(to right, #fcf1f1, #ffffff)"
      : "#ffffff");

  return (
    <section id="about" className="py-12 sm:py-16 select-none" style={{ background: sectionBg }}>
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Text Column */}
          <div
            className={`lg:col-span-6 xl:col-span-6 space-y-3.5 ${isImageRight ? "order-1 lg:order-1" : "order-2 lg:order-2"
              } text-left max-w-[500px]`}
          >
            <h2
              className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight m-0 leading-[1.18]"
              style={
                brand.aboutTitleGradient || (brand.themeGradient && brand.primaryColor === "#fd202a")
                  ? {
                    background: brand.themeGradient || "linear-gradient(to right, #fd202a, #ff4be5)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                  : { color: isDark ? "#ffffff" : "#111827" }
              }
            >
              {title.includes(" Online") ? (
                <>
                  {title.replace(/\s+Online$/i, "")} <br className="hidden sm:inline" />Online
                </>
              ) : (
                title
              )}
            </h2>

            {about.subtitle && (
              <p
                className={`text-[16px] sm:text-[18px] font-semibold m-0 ${
                  isDark ? "text-white/90" : "text-slate-700"
                }`}
              >
                {about.subtitle}
              </p>
            )}

            <div
              className={`space-y-3 text-[13px] sm:text-[15px] leading-[1.6] max-w-[580px] ${
                isDark ? "text-white/90" : "text-[#333333]"
              }`}
            >
              {paragraphs.map((p, idx) => (
                <p key={idx} className="m-0">
                  {p}
                </p>
              ))}
            </div>

            {about.howItWorks && (
              <div className="border-2 border-black p-4 sm:p-4 my-4 rounded-none text-left bg-transparent max-w-[490px]">
                <h3 className="text-sm sm:text-[20px] font-bold text-[#000000] m-0 mb-0.5">
                  {about.howItWorks.title || "Here’s how it works:"}
                </h3>
                <h4 className="text-xs sm:text-[15px] font-semibold text-[#000000] m-0 mb-2">
                  {about.howItWorks.subtitle || "Pay 70% upfront and the remaining 30% after placement."}
                </h4>
                <p className="text-[11.5px] sm:text-[14.5px] text-[#4d4d4d] m-0 flex items-center gap-1.5 font-normal">
                  <User className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>{about.howItWorks.note || "Pay-After-Placement: Why Students Trust Shoolini University Online"}</span>
                </p>
              </div>
            )}

            {showApplyButton && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[5px] font-semibold text-[13px] sm:text-[14px] transition-all cursor-pointer active:scale-95 w-full sm:w-fit ${
                    isDark
                      ? "bg-[#DC520A] text-white hover:bg-[#c24608] border-none shadow-xs"
                      : "border-2 bg-transparent hover:text-white"
                  }`}
                  style={
                    isDark
                      ? { backgroundColor: brand.aboutButtonBg || "#DC520A", color: "#ffffff" }
                      : {
                          color: primaryColor,
                          borderColor: primaryColor,
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!isDark) {
                      e.currentTarget.style.backgroundColor = primaryColor;
                      e.currentTarget.style.color = "#ffffff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isDark) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = primaryColor;
                    }
                  }}
                >
                  <span>{buttonText}</span>
                  <span className="text-base font-bold leading-none">→</span>
                </button>
              </div>
            )}
          </div>

          {/* Image Column */}
          <div
            className={`lg:col-span-6 xl:col-span-6 ${isImageRight ? "order-2 lg:order-2" : "order-1 lg:order-1"
              } flex items-center justify-center`}
          >
            <div className="relative w-full max-w-[480px] mx-auto flex items-center justify-center">
              {about.desktopImage && about.mobileImage ? (
                <>
                  <Image
                    src={about.desktopImage}
                    alt={title}
                    width={480}
                    height={460}
                    priority
                    className="w-full h-auto object-contain max-h-[480px] hidden sm:block"
                    sizes="(max-width: 1024px) 100vw, 480px"
                  />
                  <Image
                    src={about.mobileImage}
                    alt={title}
                    width={480}
                    height={380}
                    priority
                    className="w-full h-auto object-contain max-h-[400px] block sm:hidden"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />
                </>
              ) : (
                <Image
                  src={imageSrc}
                  alt={title}
                  width={460}
                  height={450}
                  priority
                  className="w-full h-auto object-contain max-h-[460px]"
                  sizes="(max-width: 1024px) 100vw, 460px"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
