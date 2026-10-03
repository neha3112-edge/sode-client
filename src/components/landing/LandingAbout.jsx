"use client";

import React from "react";
import Image from "next/image";
import { User } from "lucide-react";

/**
 * Reusable Landing About Section
 * Supports:
 * 1. Galgotias Text Layout
 * 2. LPU About & 4 Stats Counters
 * 3. Liverpool Business School Hero-Cover Layout
 * 4. Rushford Campus Building 2-Column Layout
 * 5. ESGCI Centered Green Layout
 * 6. GGU 50/50 Full-Bleed Split
 * 7. Mangalayatan University (MU) Centered Illustration Layout
 * 8. VGU Full-Width Deep Blue Banner (#30669b)
 * 9. SMU Full-Width Teal Banner (#006372) + Visionary Leader
 * 10. Campus Stats Layout (Manipal)
 * 11. Classic & Shoolini 2-Column Layout
 */
export default function LandingAbout({
  about = {},
  brand = {},
  leader = null,
  stats = [],
  onOpenApply,
}) {
  if (!about || Object.keys(about).length === 0 || brand.hideAbout) return null;

  const layout = brand.aboutLayout || brand.slug;
  const universityName = brand.name || "University Online";
  const title = about.title || `About ${universityName}`;

  const rawParagraphs =
    about.paragraphs && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const fallbackParagraphs = [
    "Lovely Professional University (LPU Online) is a trusted institute which was established in 2005. LPU Online offers a wide range of UGC-approved degree programs. All the courses are delivered through a flexible digital learning platform, therefore allowing students to learn anytime, anywhere across India and abroad.",
    "Lovely Professional University Online Courses include programs such as LPU MBA Online, LPU Online MCA, and LPU Online BCA. These are designed with an industry-relevant curriculum. The university has extended opportunities like a smooth Lovely Professional University online admission process, affordable fee structures, and strong academic support. Overall, LPU Online courses help learners and working professionals build future-ready careers.",
  ];

  const paragraphs =
    rawParagraphs.length > 0
      ? rawParagraphs
      : brand.slug === "lpu" || layout === "lpu"
      ? fallbackParagraphs
      : [];

  const buttonText = about.buttonText || "Apply Now";
  const imageSrc =
    about.image ||
    brand.campusImage ||
    brand.buildingAboutImage ||
    "/assets/manipal_v1_images/manipal-about.webp";

  const activeStats = stats.length > 0 ? stats : brand.stats || [];
  const leaderData = leader || about.leader;
  const primaryColor = brand.primaryColor || "#ee3024";

  // 1. Galgotias Text Layout
  if (layout === "galgotias" || brand.slug === "galgotias") {
    return (
      <section id="about" className="pt-10 sm:pt-14 pb-2 sm:pb-3 bg-white">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28 space-y-6 sm:space-y-8 text-left">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#002b49] tracking-tight leading-tight m-0">
              About Galgotias University Online
            </h2>
            <div className="space-y-3.5 text-[14px] sm:text-[15.5px] text-slate-700 leading-relaxed font-normal">
              <p className="m-0">
                Galgotias Online is a pioneering initiative by Galgotias University, dedicated to providing individuals with a robust platform for elective online learning. This initiative empowers participants to enhance their competencies, cultivate expertise, and refine skills across diverse disciplines and career paths. The <strong className="text-[#0070ba] font-bold">Online degree program</strong> allows students to study at their own pace while still receiving a high-quality education that connects to real-world situations. Students learn from experts who work in their field, work together with other students, and practice what they learn through real examples and hands-on projects.
              </p>
              <p className="m-0">
                Galgotias University Online provides a state-of-the-art learning management system (LMS) that allows students to access course materials, submit assignments, and participate in discussions from anywhere in the world. The program doesn&apos;t just teach job skills. It also teaches students how to be good leaders, make the right choices, and communicate well with others. This helps create complete professionals who can handle the challenges of today&apos;s work world.
              </p>
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-black text-[#002b49] tracking-tight leading-tight m-0">
              Galgotias University Online Accreditations, Approvals and Ranking
            </h2>
            <p className="text-[14px] sm:text-[15.5px] text-slate-700 leading-relaxed font-normal m-0">
              Galgotias University Online is recognized for its strong commitment to quality education and academic excellence. It has established itself as one of the top private universities in India, focusing on research, innovation, and skill development.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // 2. LPU About & Stats Counters
  if (layout === "lpu" || brand.slug === "lpu") {
    const lpuStats =
      activeStats.length > 0
        ? activeStats
        : [
            { number: "30K+", label: "Student Enrolled" },
            { number: "50K+", label: "Alumini" },
            { number: "600+", label: "Campus Event" },
            { number: "500+", label: "High Profile visitor" },
          ];

    return (
      <section id="about" className="py-12 sm:py-16 md:py-20 bg-white select-none">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 space-y-6 sm:space-y-8">
          <div className="space-y-1.5 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#b0b7c3] tracking-tight m-0 leading-tight">
              {about.subtitle || "About"}
            </h2>
            <h3 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-black tracking-tight m-0 leading-tight">
              {about.titlePrefix || "LPU"}{" "}
              <span style={{ color: primaryColor }}>{about.titleHighlight || "Online University"}</span>
            </h3>
            <p className="text-[15px] sm:text-base font-bold mt-1.5 sm:mt-2 m-0" style={{ color: primaryColor }}>
              {about.subName || "(Lovely Professional University Online)"}
            </p>
          </div>

          <div className="space-y-3.5 text-[14px] sm:text-[15px] text-slate-700 leading-relaxed max-w-[1240px] text-left">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="m-0 font-normal leading-[1.65]">
                {p}
              </p>
            ))}
          </div>

          {lpuStats.length > 0 && (
            <div className="pt-6 sm:pt-8 md:pt-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-0 items-start">
                {lpuStats.map((st, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-start text-left ${
                      idx > 0 ? "md:pl-8 lg:pl-12" : ""
                    } ${
                      idx < lpuStats.length - 1
                        ? "md:border-r md:border-slate-300 md:pr-8 lg:pr-12"
                        : ""
                    }`}
                  >
                    <h4
                      className="text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight m-0 leading-none"
                      style={{ color: primaryColor }}
                    >
                      {st.number}
                    </h4>
                    <p className="text-[13.5px] sm:text-[14.5px] md:text-[15px] font-bold text-slate-900 mt-2 sm:mt-2.5 m-0 leading-snug">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // 3. Liverpool Business School Layout
  if (layout === "liverpool" || brand.slug === "liverpool") {
    const bgImg = brand.aboutBgImage || "/assets/all_universities_images/liverpool/ljmu-rev.png";
    return (
      <section
        id="about"
        className="w-full relative select-none py-14 sm:py-20 bg-cover bg-center scroll-mt-20 text-white"
        style={{ backgroundImage: `url(${bgImg})` }}
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
                <span>Request Call Back</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 4. Rushford Business School Layout
  if (layout === "rushford" || brand.slug === "rushford") {
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

  // 5. ESGCI Centered Green Layout
  if (layout === "esgci" || brand.slug === "esgci") {
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

  // 6. Golden Gate University (GGU) 50/50 Full-Bleed Split
  if (layout === "ggu" || brand.slug === "ggu") {
    return (
      <section id="about" className="w-full relative select-none overflow-hidden bg-[#003468] scroll-mt-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[460px] lg:min-h-[500px]">
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

  // 7. Mangalayatan University (MU) Centered Illustration Layout
  if (layout === "mu" || brand.slug === "mu" || brand.slug === "mangalayatan") {
    return (
      <section
        id="about"
        className={`landing-about-section landing-about-mu w-full relative select-none ${
          brand.aboutSectionClassName || "pt-8 sm:pt-12 pb-[190px] sm:pb-[260px] md:pb-[380px] lg:pb-[480px]"
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
              <p key={idx} className={brand.aboutParagraphClassName || "m-0 text-justify font-medium sm:text-center"}>
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

  // 8. VGU Deep Blue Banner
  if (layout === "vgu-banner" || layout === "vgu" || brand.slug === "vgu") {
    const cfg = brand.aboutConfig || {};
    const sectionBg = cfg.backgroundColor || "#2b6496";
    const bgImage = cfg.backgroundImage || brand.campusImage || "/assets/vgu/university.webp";
    const btnBg = cfg.buttonBg || "#ffc107";
    const btnTextColor = cfg.buttonTextColor || "#000000";
    const containerClass =
      cfg.containerClassName ||
      brand.aboutContainerClassName ||
      "max-w-[1340px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32";

    return (
      <section
        id="about"
        className="relative w-full py-12 sm:py-16 md:py-20 text-white overflow-hidden select-none"
        style={{ backgroundColor: sectionBg, ...cfg.sectionStyle }}
      >
        {bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-bottom opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url(${bgImage})`,
              ...cfg.bgImageStyle,
            }}
          />
        )}

        <div className={`relative z-10 ${containerClass}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative w-full h-[250px] sm:h-[310px] lg:h-[340px] rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-2xl">
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
            <div className="lg:col-span-7 space-y-4 text-left">
              <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-white tracking-tight leading-[1.2] m-0">
                {title.includes(" Online") ? (
                  <>
                    {title.replace(/\s+Online$/i, "")} <br className="hidden sm:inline" />
                    Online
                  </>
                ) : (
                  title
                )}
              </h2>
              <div className="space-y-3.5 text-[13.5px] sm:text-[14.5px] text-white/95 leading-[1.65] font-normal">
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
                  style={{
                    backgroundColor: btnBg,
                    color: btnTextColor,
                    ...cfg.buttonStyle,
                  }}
                  className="inline-flex items-center justify-center font-bold text-[14px] sm:text-[14.5px] px-8 py-2.5 rounded-[6px] shadow-sm hover:opacity-95 active:scale-95 transition-all cursor-pointer border-none"
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

  // 9. SMU Deep Teal Banner with Peeking Model & Visionary Leader
  if (layout === "smu-banner" || brand.slug === "smu") {
    return (
      <div id="about" className="w-full">
        <section className="w-full pt-10 sm:pt-14 pb-0 bg-transparent overflow-visible relative select-none">
          <div className="w-full bg-[#006372] relative overflow-visible">
            <div className="max-w-[1240px] xl:max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 md:gap-8">
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

  // 10. Manipal Campus Stats & Panoramic Building
  if (layout === "campusStats" || brand.slug === "manipal") {
    return (
      <section id="about" className="pt-10 sm:pt-14 pb-0 bg-white relative overflow-hidden select-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight m-0 mb-3">
            About{" "}
            <span style={{ color: primaryColor }}>
              {brand.aboutHighlight || brand.name || universityName}
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

  // 11. Classic & Shoolini 2-Column
  const isImageRight = brand.aboutLayout === "imageRight" || about.imagePosition === "right";
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
                  {title.replace(/\s+Online$/i, "")} <br className="hidden sm:inline" />
                  Online
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
                  <span>
                    {about.howItWorks.note || "Pay-After-Placement: Why Students Trust Shoolini University Online"}
                  </span>
                </p>
              </div>
            )}

            {showApplyButton && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[4px] font-semibold text-[13px] sm:text-[14px] transition-all cursor-pointer border-2 bg-transparent hover:text-white active:scale-95 w-full sm:w-fit"
                  style={{ color: primaryColor, borderColor: primaryColor }}
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
