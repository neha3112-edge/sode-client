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
  // Layout 1: VGU Blue Full-Width Banner
  // ==========================================
  const isVguLayout =
    brand.aboutLayout === "vgu-banner" ||
    brand.aboutLayout === "vgu" ||
    brand.slug === "vgu";

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
                className={`text-[12.5px] sm:text-[13.5px] text-slate-700 leading-relaxed font-normal m-0 ${
                  idx === 1 ? "font-semibold italic text-slate-800" : ""
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

  const sectionBg =
    brand.aboutBg ||
    (brand.themeGradient && brand.primaryColor === "#fd202a"
      ? "linear-gradient(to right, #fcf1f1, #ffffff)"
      : "#ffffff");

  return (
    <section id="about" className="py-10 sm:py-14 select-none" style={{ background: sectionBg }}>
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Text Column */}
          <div
            className={`lg:col-span-6 xl:col-span-6 space-y-3.5 ${
              isImageRight ? "order-1 lg:order-1" : "order-2 lg:order-2"
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
                  : { color: "#111827" }
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

            <div className="space-y-2 text-[13px] sm:text-[15px] text-[#333333] leading-[1.55] max-w-[580px]">
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
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[4px] font-semibold text-[13px] sm:text-[14px] transition-all cursor-pointer border-2 bg-transparent hover:text-white active:scale-95 w-full sm:w-fit"
                  style={{
                    color: primaryColor,
                    borderColor: primaryColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = primaryColor;
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = primaryColor;
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
            className={`lg:col-span-6 xl:col-span-6 ${
              isImageRight ? "order-2 lg:order-2" : "order-1 lg:order-1"
            } flex items-center justify-center`}
          >
            <div className="relative w-full max-w-[460px] mx-auto flex items-center justify-center">
              <Image
                src={imageSrc}
                alt={title}
                width={460}
                height={450}
                priority
                className="w-full h-auto object-contain max-h-[460px]"
                sizes="(max-width: 1024px) 100vw, 460px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
