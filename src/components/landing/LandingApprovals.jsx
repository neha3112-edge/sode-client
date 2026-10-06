"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable Landing Approvals Section
 * Supports:
 * 1. Galgotias Dual Tables (Accreditations & Key Highlights)
 * 2. LPU Dark Badges
 * 3. Liverpool Business School Approvals
 * 4. Rushford Accreditation & Collaboration
 * 5. ESGCI Approvals and Accreditation
 * 6. GGU Accreditations & Associations
 * 7. Shoolini Split Layout
 * 8. VGU 2-Column Pill Badges
 * 9. SMU Interactive Carousel
 * 10. Manipal Slider
 * 11. Classic Approvals Grid
 */
export default function LandingApprovals({
  approvals = [],
  keyHighlights = [],
  universityName,
  brand = {},
  title = "Recognition and Approvals",
  bannerBg,
  showTags = false,
}) {
  if (!approvals || approvals.length === 0) return null;

  const layout = brand?.approvalsLayout || brand?.slug;
  const activeUni = universityName || brand?.name || "University Online";
  const activeTitle = brand?.approvalsTitle || title;
  const subtitle = brand?.approvalsSubtitle || brand?.approvalsDescription || null;

  // 1. Galgotias Dual Tables
  if (layout === "table" || brand?.slug === "galgotias") {
    return <GalgotiasApprovalsTable keyHighlights={keyHighlights} brand={brand} />;
  }

  // 2. LPU Dark Badges
  if (layout === "lpu-dark" || brand?.slug === "lpu" || brand?.shortName === "LPU") {
    return <LpuApprovals approvals={approvals} />;
  }

  // UU Layout: Online UU Approvals & Recognition (Centered with 6-Column Logos)
  if (layout === "uu" || brand?.slug === "uu") {
    const heading = brand?.approvalsTitle || "Online UU";
    const highlight = brand?.approvalsHighlight || "Approvals & Recognition";

    return (
      <section id="approvals" className="w-full py-8 sm:py-14 lg:py-16 bg-white select-none scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[22px] sm:text-[30px] lg:text-[34px] font-bold leading-tight m-0 mb-4 sm:mb-3">
            <span className="text-[#111111]">{heading} </span>
            <span className="text-[#62B239]">{highlight}</span>
          </h2>
          {subtitle && (
            <p className="hidden sm:block text-[12.5px] sm:text-[13.5px] text-[#444444] font-normal leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12">
              {subtitle}
            </p>
          )}

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6 lg:gap-10 items-center justify-items-center max-w-[1200px] mx-auto">
            {approvals.map((item, idx) => (
              <div
                key={idx}
                className="relative w-full max-w-[110px] sm:max-w-[150px] h-[70px] sm:h-[95px] lg:h-[105px] flex items-center justify-center transition-transform hover:scale-105 duration-200"
              >
                <Image
                  src={item.image || item}
                  alt={item.name || item.title || `Approval ${idx + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 110px, 160px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // SSBM Layout: SSBM Geneva Accreditations & Rankings (#accreditations)
  if (layout === "ssbm" || brand?.slug === "ssbm") {
    const accreditations = brand?.ssbmAccreditations || [
      { image: "/assets/all_universities_images/ssbm/acbsp-p.png", alt: "ACBSP" },
      { image: "/assets/all_universities_images/ssbm/chea-logo.png", alt: "CHEA" },
      { image: "/assets/all_universities_images/ssbm/bac.png", alt: "BAC" },
    ];
    const rankings = brand?.ssbmRankings || [
      { image: "/assets/all_universities_images/ssbm/ceoworld.png", alt: "CEOWorld Magazine" },
      { image: "/assets/all_universities_images/ssbm/postg.png", alt: "Postgrad" },
      { image: "/assets/all_universities_images/ssbm/swiss.png", alt: "Study in Switzerland" },
    ];

    return (
      <section
        id="accreditations"
        className="certification w-full py-12 sm:py-16 bg-[#f9f9f9] text-center select-none scroll-mt-20"
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1: Accreditations */}
            <fieldset className="border border-slate-300 rounded-[8px] p-6 pt-4 text-center bg-white shadow-xs">
              <legend className="px-4 text-[17px] sm:text-[19px] font-bold text-[#111111] uppercase tracking-wide">
                Accreditations
              </legend>
              <div className="grid grid-cols-3 gap-4 items-center justify-center py-2">
                {accreditations.map((item, idx) => (
                  <div key={idx} className="relative w-full h-[65px] flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.alt || `Accreditation ${idx + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 30vw, 160px"
                    />
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Box 2: Rankings */}
            <fieldset className="border border-slate-300 rounded-[8px] p-6 pt-4 text-center bg-white shadow-xs">
              <legend className="px-4 text-[17px] sm:text-[19px] font-bold text-[#111111] uppercase tracking-wide">
                Rankings
              </legend>
              <div className="grid grid-cols-3 gap-4 items-center justify-center py-2">
                {rankings.map((item, idx) => (
                  <div key={idx} className="relative w-full h-[65px] flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.alt || `Ranking ${idx + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 30vw, 160px"
                    />
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </section>
    );
  }

  // 3. Liverpool Layout
  if (layout === "liverpool" || brand?.slug === "liverpool") {
    const heading = brand?.approvalsTitle || "APPROVALS & RECOGNITION";
    const subHeading = brand?.approvalsSubtitle || "OF ONLINE LIVERPOOL BUSINESS SCHOOL";

    return (
      <section id="certification" className="w-full py-12 sm:py-16 bg-white select-none scroll-mt-20">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <h2 className="text-[24px] sm:text-[30px] font-bold text-left text-[#111111] mb-8 leading-tight m-0">
            {heading} <br />
            <span className="text-[#00408d]">{subHeading}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {approvals.map((appr, idx) => (
              <div
                key={idx}
                className="b1 flex items-center justify-center p-4 bg-white rounded-[8px] border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-full max-w-[280px] h-[90px]">
                  <Image
                    src={appr.image || appr}
                    alt={appr.title || `Approval ${idx + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 4. Rushford Layout
  if (layout === "rushford" || brand?.slug === "rushford") {
    const sectionTitle = brand?.approvalsTitle || "Accreditation & Collaboration";
    const sectionSubtitle = brand?.approvalsSubtitle || "Rushford Business School, Switzerland";
    return (
      <section
        id="accreditations"
        className="certification w-full py-12 sm:py-16 bg-white text-center select-none scroll-mt-20"
        style={{ backgroundColor: brand?.approvalsBg || "#ffffff" }}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <h2 className="text-[#111111] text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-center m-0 tracking-tight mb-2">
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p className="text-[15px] sm:text-[17px] text-[#555555] mb-8 font-medium">
              {sectionSubtitle}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {approvals.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-[10px] border-2 border-slate-200 shadow-sm flex items-start gap-4 transition-all hover:shadow-md"
              >
                <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title || "Approval"}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <div>
                  <h3 className="text-[#111111] text-[16px] font-bold mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[#555555] text-[13px] leading-relaxed m-0">
                    {item.description || item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 5. ESGCI Layout
  if (layout === "esgci" || brand?.slug === "esgci") {
    const sectionTitle = brand?.approvalsTitle || "APPROVALS AND ACCREDITATION";
    return (
      <section
        id="certification"
        className="certification w-full py-12 sm:py-16 bg-white text-center select-none scroll-mt-20"
        style={{ backgroundColor: brand?.approvalsBg || "#ffffff" }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2
            className="text-[#111111] text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-center m-0 uppercase tracking-tight mb-8"
            style={{ color: brand?.approvalsHeaderColor || "#111111" }}
          >
            {sectionTitle}
          </h2>
          <div className="b2-info grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approvals.map((item, idx) => (
              <div
                key={idx}
                className="b1 bg-white p-6 rounded-[8px] border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col items-center text-center transition-all hover:-translate-y-1"
              >
                <div className="relative w-full h-20 mb-4 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title || "Approval"}
                    fill
                    className="object-contain"
                    sizes="180px"
                  />
                </div>
                <h3 className="text-[#111111] text-[16px] font-bold mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[#555555] text-[13px] leading-relaxed m-0 font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 6. GGU Layout
  if (layout === "ggu" || brand?.slug === "ggu") {
    const sectionTitle = brand?.approvalsTitle || "Accreditations & Associations";
    const sectionSubtitle =
      brand?.approvalsSubtitle || "of Golden Gate University, San Francisco";

    return (
      <section
        id="accreditations"
        className="certification w-full pt-12 sm:pt-16 pb-8 sm:pb-10 bg-[#F6F6F6] text-center select-none"
        style={{ backgroundColor: brand?.approvalsBg || "#F6F6F6" }}
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <h2
            className="text-[#111111] text-2xl sm:text-3xl lg:text-[30px] font-bold text-center m-0 leading-tight tracking-tight"
            style={{ color: brand?.approvalsHeaderColor || "#111111" }}
          >
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p className="text-[#555555] text-[15px] sm:text-[16px] mt-1.5 mb-8 sm:mb-10 text-center m-0">
              {sectionSubtitle}
            </p>
          )}

          <div className="b2-info grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center max-w-[1040px] mx-auto text-left">
            {approvals.map((item, idx) => (
              <div
                key={idx}
                className="b1 bg-white p-6 rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-slate-200/80 flex items-start gap-4 transition-all hover:shadow-md"
              >
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 shrink-0 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title || "Accreditation"}
                    fill
                    className="object-contain"
                    sizes="72px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-[#111111] leading-snug m-0 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[12px] sm:text-[12.5px] text-[#444444] leading-relaxed m-0 font-normal">
                    {item.description || item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 7. Shoolini Split Approvals
  if (layout === "split" || brand?.slug === "shoolini") {
    return (
      <ShooliniSplitApprovals
        approvals={approvals}
        activeUniversity={activeUni}
        subtitle={subtitle}
        brand={brand}
      />
    );
  }

  // 8. VGU Pill Approvals
  if (layout === "vgu" || layout === "vgu-badges" || brand?.slug === "vgu") {
    return <VguPillApprovals approvals={approvals} brand={brand} />;
  }

  // 9. SMU Interactive Carousel
  if (layout === "smu-carousel" || brand?.slug === "smu") {
    return (
      <SmuApprovalsCarousel
        approvals={approvals}
        title={brand?.approvalsTitle || `${activeUni} Rankings & Accreditations`}
        subtitle={subtitle}
        brand={brand}
      />
    );
  }

  // 10. Manipal Slider
  if (layout === "slider" || brand?.slug === "manipal") {
    return (
      <ApprovalsSlider
        approvals={approvals}
        activeUniversity={activeUni}
        activeTitle={activeTitle}
        subtitle={subtitle}
        brand={brand}
        showTags={showTags}
      />
    );
  }

  // 11. Classic Grid
  return (
    <ClassicApprovalsGrid
      approvals={approvals}
      activeUniversity={activeUni}
      activeTitle={activeTitle}
      bannerBg={bannerBg}
      brand={brand}
      showTags={showTags}
    />
  );
}

// -------------------------------------------------------------
// Subcomponent: Galgotias Dual Tables
// -------------------------------------------------------------
function GalgotiasApprovalsTable({ keyHighlights, brand }) {
  const tableData = [
    {
      logo: "/assets/images/approvals/ugc_approval.png",
      title: "UGC Approval for Online Degrees and Learning Platform (UGC)",
      about:
        "Galgotias University is approved by the University Grants Commission (UGC), ensuring its programs meet national education standards.",
    },
    {
      logo: "/assets/images/approvals/naac_a_plus.png",
      title: "National Assessment and Accreditation Council (NAAC A+)",
      about:
        "The university has received an A+ grade from the National Assessment and Accreditation Council (NAAC), highlighting its dedication to high-quality education.",
    },
    {
      logo: "/assets/galgotias/aiu_logo.webp",
      title: "Association of Indian Universities",
      about:
        "Galgotias University is a member of the Association of Indian Universities (AIU), which supports academic collaboration and helps maintain equivalence of degrees across India.",
    },
  ];

  const highlights =
    keyHighlights?.length > 0
      ? keyHighlights
      : brand?.keyHighlights || [
          { feature: "University", details: "Galgotias Online University" },
          { feature: "Accreditation", details: "NAAC A+" },
          { feature: "Approval", details: "UGC-Entitled" },
          { feature: "Location", details: "Greater Noida, Uttar Pradesh, India" },
          { feature: "Establishment Year", details: "2011" },
          { feature: "Program Types", details: "Postgraduate Online Degree Programs" },
          {
            feature: "Focus Areas",
            details: "Industry-Oriented Education and Professional Development",
          },
          { feature: "Educational Expertise", details: "Over 10 Years" },
          {
            feature: "Learning Methodologies",
            details: "Innovative, Digital Learning Solutions for Flexibility",
          },
          {
            feature: "Growth Emphasis",
            details: "Growth-Oriented Learning for Career Progression",
          },
          {
            feature: "Learning Platform",
            details: "Convenient, Flexible Learning from Anywhere, Anytime",
          },
          {
            feature: "Support Services",
            details: "Expert Academic Guidance, Career Support, and Tech Help",
          },
          { feature: "Admission Process", details: "Online" },
          { feature: "Student Rating", details: "4.4/5 Stars" },
        ];

  return (
    <section id="approvals" className="pt-0 pb-10 sm:pb-14 bg-white">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28 space-y-10 sm:space-y-12">
        <div className="overflow-x-auto border border-slate-200 rounded-[6px] sm:rounded-[8px] shadow-xs">
          <table className="w-full border-collapse text-left min-w-[650px]">
            <thead>
              <tr className="bg-[#dff0fa] border-b border-slate-200">
                <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900 w-[14%] sm:w-[12%] border-r border-slate-200" />
                <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900 w-[36%] sm:w-[38%] border-r border-slate-200">
                  Accreditations &amp; Approvals
                </th>
                <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900 w-[50%]">
                  About
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {tableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4 sm:px-6 align-middle border-r border-slate-200">
                    <div className="relative w-16 h-14 sm:w-20 sm:h-16 rounded-[4px] border border-slate-200 bg-white p-1.5 flex items-center justify-center shadow-xs mx-auto">
                      <Image
                        src={row.logo}
                        alt={row.title}
                        width={65}
                        height={52}
                        className="object-contain max-h-full max-w-full"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 align-middle font-bold text-slate-900 text-[13.5px] sm:text-[14.5px] leading-snug border-r border-slate-200">
                    {row.title}
                  </td>
                  <td className="py-4 px-4 sm:px-6 align-middle text-slate-700 text-[13px] sm:text-[14px] leading-relaxed font-normal">
                    {row.about}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-4 sm:pt-8">
          <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-black text-[#002b49] tracking-tight leading-tight m-0 mb-4 sm:mb-6">
            Key Highlights of Galgotias University Online
          </h2>
          <div className="overflow-x-auto border border-slate-200 rounded-[6px] sm:rounded-[8px] shadow-xs mt-3 sm:mt-4">
            <table className="w-full border-collapse text-left min-w-[600px]">
              <thead>
                <tr className="bg-[#dff0fa] border-b border-slate-200">
                  <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900 w-[30%] sm:w-[28%] border-r border-slate-200">
                    Feature
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {highlights.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 align-middle font-bold text-slate-900 text-[13.5px] sm:text-[14.5px] border-r border-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 align-middle text-slate-700 text-[13px] sm:text-[14px] font-normal leading-relaxed">
                      {row.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Subcomponent: LPU Dark Badges
// -------------------------------------------------------------
function LpuApprovals({ approvals }) {
  return (
    <section id="approval" className="w-full bg-[#4d4d4d] text-white py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-[1360px] mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold tracking-tight m-0 mb-8 sm:mb-12">
          <span className="text-[#f58220]">LPU University </span>
          <span className="text-white">Accreditations & Approvals</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-12">
          {approvals.map((appr, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[130px] sm:min-w-[150px]">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center p-3 shadow-md">
                <Image
                  src={appr.image}
                  alt={appr.title || appr.text || "Approval"}
                  fill
                  className="object-contain p-2.5"
                  sizes="128px"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm sm:text-base font-extrabold text-white leading-tight m-0">
                  {appr.title || appr.text}
                </p>
                {appr.status && (
                  <p className="text-xs font-semibold text-slate-300 mt-0.5 m-0 uppercase tracking-wider">
                    {appr.status}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Subcomponent: Shoolini Split Box & Gradient Grid
// -------------------------------------------------------------
function ShooliniSplitApprovals({ approvals, activeUniversity, subtitle, brand }) {
  return (
    <section id="approval" className="w-full select-none p-0 overflow-hidden bg-[#010d2a]">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-5 bg-[#010d2a] text-white flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:pl-20 py-8 sm:py-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight m-0 mb-3 text-white">
            <span
              className="font-extrabold inline"
              style={{
                background: brand?.themeGradient || "linear-gradient(to right, #fd202a, #ff4be5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {activeUniversity}{" "}
            </span>
            <span className="text-white font-bold">Recognitions & Accreditations</span>
          </h2>
          {subtitle && (
            <p className="text-[13px] sm:text-[14px] text-[#ecf0f1] font-normal leading-relaxed m-0">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className="lg:col-span-7 p-6 sm:p-8 lg:p-10 xl:pr-16 flex items-center"
          style={{
            background: "linear-gradient(to right, #fce8e8 0%, #fdf3f3 40%, #ffffff 100%)",
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 w-full">
            {approvals.map((item, idx) => (
              <div key={idx} className="flex flex-col items-start text-left">
                <div className="relative w-24 sm:w-28 h-12 sm:h-14 mb-2">
                  <Image
                    src={item.image}
                    alt={item.tag || item.title || "approval"}
                    fill
                    className="object-contain object-left"
                    sizes="120px"
                  />
                </div>
                <div className="text-[13px] sm:text-[13.5px] leading-tight">
                  <span className="font-extrabold text-[#fd202a] block">
                    {item.tag || item.title}
                  </span>
                  <span className="font-bold text-[#000000] block mt-0.5">
                    {item.subtext || item.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Subcomponent: VGU 2-Column Pill Badges
// -------------------------------------------------------------
function VguPillApprovals({ approvals, brand = {} }) {
  const cfg = brand.approvalsConfig || {};
  const containerClass =
    cfg.containerClassName ||
    brand.approvalsContainerClassName ||
    "max-w-[1340px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32";
  const sectionTitle =
    brand.approvalsTitle ||
    `${brand.name || "Vivekananda Global University"} Online Accreditation & Approval`;
  const sectionDescription =
    brand.approvalsDescription ||
    "Vivekananda Global University Online Courses are UGC-recognised and have top accreditations and approvals from the country's recognised statutory bodies.";

  const titleClass =
    cfg.titleClassName ||
    "text-[22px] sm:text-[26px] lg:text-[28px] font-normal leading-tight tracking-tight m-0";
  const buttonBg = cfg.buttonBg || cfg.buttonBackground || brand.primaryColor || "#811811";
  const buttonTextColor = cfg.buttonTextColor || cfg.buttonColor || "#ffffff";
  const buttonText = cfg.buttonText || "Enquire Now";

  return (
    <section id="approval" className="w-full py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className={containerClass}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-4 text-left">
            <h2 className={titleClass} style={{ color: cfg.titleColor || "#811811" }}>
              {sectionTitle.includes(" Online") ? (
                <>
                  <strong className="font-bold text-[#811811]">
                    {sectionTitle.replace(/\s+Online.*$/i, " Online")}
                  </strong>
                  <br />
                  <span className="font-medium text-slate-800">Accreditation & Approval</span>
                </>
              ) : (
                <strong className="font-bold text-[#811811]">{sectionTitle}</strong>
              )}
            </h2>

            <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed font-normal m-0 max-w-md">
              {sectionDescription}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const heroEl = document.getElementById("hero") || document.getElementById("banner");
                  heroEl?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  backgroundColor: buttonBg,
                  color: buttonTextColor,
                }}
                className="font-bold text-[14px] px-8 py-2.5 rounded-[4px] shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer border-none"
              >
                {buttonText}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
              {approvals.map((appr, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-full p-2.5 sm:p-3 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center gap-3 sm:gap-4 hover:shadow-md transition-all"
                >
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full overflow-hidden bg-slate-50 flex items-center justify-center p-1">
                    <Image
                      src={appr.image}
                      alt={appr.title || appr.tag || "Approval"}
                      fill
                      className="object-contain p-1"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0 pr-2 text-left">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-900 leading-tight m-0 truncate">
                      {appr.title || appr.tag}
                    </h3>
                    <p className="text-[11px] sm:text-[11.5px] text-slate-500 font-medium mt-0.5 m-0 line-clamp-1">
                      {appr.text || appr.status || "Approved"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Subcomponent: SMU Interactive Carousel
// -------------------------------------------------------------
function SmuApprovalsCarousel({ approvals, title, subtitle, brand = {} }) {
  const [index, setIndex] = useState(0);
  const total = approvals.length;

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, total]);

  const visibleApprovals = [
    approvals[index],
    approvals[(index + 1) % total],
    approvals[(index + 2) % total],
  ].filter(Boolean);

  return (
    <section id="approval" className="w-full py-10 sm:py-14 bg-white border-b border-slate-100 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight m-0">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-[13px] text-slate-600 mt-2 leading-relaxed font-normal m-0">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous approval"
            className="absolute -left-2 sm:-left-4 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
            {visibleApprovals.map((appr, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[12px] p-6 border border-slate-200/80 shadow-xs flex flex-col items-center text-center transition-all hover:shadow-md"
              >
                <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
                  <Image
                    src={appr.image}
                    alt={appr.title || appr.text || "Approval"}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 m-0">
                  {appr.title || appr.text}
                </h3>
                {appr.tag && (
                  <span className="mt-1.5 inline-block text-[11px] font-semibold text-[#074a76] bg-[#eef6fc] px-2.5 py-0.5 rounded-full">
                    {appr.tag}
                  </span>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next approval"
            className="absolute -right-2 sm:-right-4 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Subcomponent: Manipal Slider
// -------------------------------------------------------------
function ApprovalsSlider({
  approvals,
  activeUniversity,
  activeTitle,
  subtitle,
  brand,
  showTags,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = approvals.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [nextSlide, total]);

  const visible = [
    approvals[currentIndex],
    approvals[(currentIndex + 1) % total],
    approvals[(currentIndex + 2) % total],
  ].filter(Boolean);

  return (
    <section id="approval" className="py-10 sm:py-14 bg-white border-b border-slate-200/80 select-none">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 m-0">
            {activeTitle || `${activeUniversity} Recognitions`}
          </h2>
          {subtitle && (
            <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto m-0">{subtitle}</p>
          )}
        </div>

        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous"
            className="absolute -left-2 sm:-left-4 z-10 p-2 bg-white rounded-full shadow-md border border-slate-200 text-slate-700 hover:text-slate-900"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
            {visible.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[12px] p-6 border border-slate-200 shadow-xs flex flex-col items-center text-center"
              >
                <div className="relative w-24 h-20 mb-3">
                  <Image
                    src={item.image}
                    alt={item.title || item.tag || "Approval"}
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 m-0">
                  {item.title || item.text}
                </h3>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next"
            className="absolute -right-2 sm:-right-4 z-10 p-2 bg-white rounded-full shadow-md border border-slate-200 text-slate-700 hover:text-slate-900"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Subcomponent: Classic Approvals Grid
// -------------------------------------------------------------
function ClassicApprovalsGrid({
  approvals,
  activeUniversity,
  activeTitle,
  bannerBg,
  brand,
  showTags,
}) {
  const bg =
    bannerBg ||
    brand?.approvalsBg ||
    brand?.primaryColor ||
    "#002147";

  return (
    <section
      id="approval"
      className="py-12 sm:py-16 text-white select-none"
      style={{ backgroundColor: bg }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight mb-8 sm:mb-12 m-0">
          {activeTitle || `Recognitions & Accreditations`}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8 justify-center">
          {approvals.map((appr, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-[12px] p-5 sm:p-6 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow text-slate-900 text-center"
            >
              <div className="relative w-20 h-16 sm:w-24 sm:h-18 mb-3">
                <Image
                  src={appr.image}
                  alt={appr.title || appr.tag || "Approval"}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 m-0 line-clamp-2">
                {appr.title || appr.text}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
