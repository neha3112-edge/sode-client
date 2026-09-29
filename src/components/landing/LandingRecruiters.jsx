"use client";

import React from "react";
import Image from "next/image";
import LandingContainer from "./LandingContainer";

/**
 * Reusable Recruiters / Placement Partner Section (#partners / #placement)
 * Supports both VGU single image badge layout and Shoolini/Desktop-Mobile responsive layout
 */
export default function LandingRecruiters({
  recruiters = {},
  brand = {},
}) {
  const activeRecruiters = recruiters || brand.recruiters || {};
  const isGalgotias =
    brand.slug === "galgotias" ||
    activeRecruiters.layout === "galgotias" ||
    brand.recruitersLayout === "galgotias" ||
    brand.heroStyle === "galgotias";

  if (isGalgotias) {
    const title =
      activeRecruiters.title ||
      "Top Galgotias Online Recruiters from Different Industries";
    const subtitle =
      activeRecruiters.subtitle ||
      "Galgotias University’s online programs have helped graduates land roles in top companies, highlighting the quality of education. Here are some notable recruiting partners. Their students get an opportunity to work with:";

    const points = activeRecruiters.points || [
      "Multiple Hiring 500+ Partners",
      "1,00,000+ job and placement opportunities",
      "Increased chances of getting selected in the top Multinational companies with Industry projects",
      "Additional Career Support Services",
    ];

    const companiesList = activeRecruiters.companies || [
      { name: "Abbott", package: "₹16.4 LPA to ₹50 LPA" },
      { name: "CISCO", package: "₹20 LPA to ₹102.6 LPA" },
      { name: "Jio", package: "₹15.7 LPA to ₹51.6 LPA" },
      { name: "KPMG", package: "₹16 LPA to ₹50 LPA" },
      { name: "Apollo Hospitals", package: "₹16.1 LPA to ₹50 LPA" },
      { name: "Deloitte", package: "₹15.8 LPA to ₹54.7 LPA" },
      { name: "GSK (GlaxoSmithKline)", package: "₹17 LPA to ₹56.7 LPA" },
      { name: "Larsen & Toubro (L&T)", package: "₹15 LPA to ₹50 LPA" },
    ];

    return (
      <section id="recruiters" className="py-10 sm:py-14 bg-white select-none">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#002b49] tracking-tight leading-tight m-0">
            {title}
          </h2>

          <p className="text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal mt-3 mb-5 max-w-6xl">
            {subtitle}
          </p>

          <ul className="space-y-2 text-[13.5px] sm:text-[14px] text-slate-700 font-normal list-none p-0 m-0 max-w-6xl">
            {points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-slate-900 font-black text-base leading-none mt-0.5 select-none">
                  •
                </span>
                <span className="text-slate-800 font-normal">{point}</span>
              </li>
            ))}
          </ul>

          {/* 3-Column Recruiters Table */}
          <div className="w-full overflow-x-auto border border-[#cfe2f3] rounded-[2px] mt-8 sm:mt-10">
            <table className="w-full border-collapse text-left text-[13px] sm:text-[14px]">
              <thead>
                <tr className="bg-[#e1f0fa] border-b border-[#cfe2f3] text-[#002b49] font-bold">
                  <th className="py-3 sm:py-3.5 px-4 sm:px-6 border-r border-[#cfe2f3] w-36 sm:w-48">
                    {/* Logo Column */}
                  </th>
                  <th className="py-3 sm:py-3.5 px-4 sm:px-6 border-r border-[#cfe2f3] font-bold text-[#002b49]">
                    Company
                  </th>
                  <th className="py-3 sm:py-3.5 px-4 sm:px-6 font-bold text-[#002b49]">
                    Salary Range (in LPA)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#cfe2f3]">
                {companiesList.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#f8fbfe] transition-colors"
                  >
                    <td className="py-3 sm:py-3.5 px-4 sm:px-6 border-r border-[#cfe2f3]">
                      <RecruiterLogoBadge name={row.name} />
                    </td>
                    <td className="py-3 sm:py-3.5 px-4 sm:px-6 border-r border-[#cfe2f3] font-bold text-slate-900">
                      {row.name}
                    </td>
                    <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-slate-800 font-normal">
                      {row.package}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }

  const isLpu = brand.slug === "lpu" || activeRecruiters.layout === "lpu";

  // LPU 2-Column Placement & Hiring Partners Layout
  if (isLpu) {
    const titlePrefix = activeRecruiters.titlePrefix || "Placement";
    const titleHighlight = activeRecruiters.titleHighlight || "& Hiring Partners at LPU Online";
    const desc = activeRecruiters.desc || "At LPU Online, Students and Professionals get an opportunity to enhance their career truly nurture their ambitions. The Lovely Professional University Online Admission supports students and has a dedicated placement support and a strong network of hiring partners. They create real opportunities for professional growth, whether you're pursuing an LPU MBA Online or an LPU Online MCA program.";
    const desktopImg = activeRecruiters.desktopImage || "/assets/lpu/placement-desktop.webp";
    const mobileImg = activeRecruiters.mobileImage || "/assets/lpu/placement-mobile.webp";

    return (
      <section id="placement" className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Description, Border, Apply Button */}
            <div className="lg:col-span-5 text-left space-y-4">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-[40px] text-[#b3b3b3] font-black tracking-tight leading-none m-0">
                  {titlePrefix}
                </h2>
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#f58220] mt-1.5 m-0 tracking-tight leading-tight">
                  {titleHighlight}
                </h3>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed m-0 font-normal border-b border-slate-200 pb-4">
                {desc}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const heroEl = document.getElementById("hero") || document.getElementById("banner");
                    if (heroEl) heroEl.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-black hover:bg-slate-900 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-[6px] shadow-sm transition-colors cursor-pointer border-none inline-flex items-center gap-1.5"
                >
                  <span>Apply Now &raquo;</span>
                </button>
              </div>
            </div>

            {/* Right Column: Partners Logos Image */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="hidden sm:block relative w-full aspect-[2.4/1]">
                <Image
                  src={desktopImg}
                  alt="Placement & Hiring Partners at LPU Online"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 700px"
                  priority
                />
              </div>
              <div className="block sm:hidden relative w-full aspect-[1.8/1]">
                <Image
                  src={mobileImg}
                  alt="Placement & Hiring Partners at LPU Online"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If VGU or single image is supplied
  if (activeRecruiters.image || brand.slug === "vgu" || brand.recruitersLayout === "vgu") {
    const title = activeRecruiters.title || "Top Recruiters at VGU Online";
    const image = activeRecruiters.image || "/assets/vgu/placement-partner-vgu.webp";

    return (
      <section id="partners" className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <LandingContainer>
          {/* Centered Maroon Badge */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="bg-[#811811] text-white px-8 sm:px-10 py-2.5 sm:py-3 rounded-[8px] text-center shadow-xs">
              <h2 className="text-[17px] sm:text-[20px] font-bold text-white tracking-tight leading-tight m-0">
                {title}
              </h2>
            </div>
          </div>

          {/* Recruiters Logos Image */}
          <div className="max-w-[1020px] mx-auto px-2">
            <div className="relative w-full aspect-[2.6/1] sm:aspect-[2.8/1] flex items-center justify-center">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1020px"
              />
            </div>
          </div>
        </LandingContainer>
      </section>
    );
  }

  // Shoolini and generic desktop/mobile responsive recruiters
  const heading =
    activeRecruiters.title ||
    brand.recruitersTitle ||
    `Top Recruiters of ${brand.name || "Shoolini University Online"}`;

  const desktopImg =
    activeRecruiters.desktopImage ||
    brand.recruitersDesktopImage ||
    "/assets/shoolini/partiner-desktop.webp";

  const mobileImg =
    activeRecruiters.mobileImage ||
    brand.recruitersMobileImage ||
    "/assets/shoolini/partner-mobile.webp";

  return (
    <section id="placement" className="py-10 sm:py-14 bg-white text-center select-none">
      <LandingContainer>
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#fd2954] mb-6 sm:mb-8 tracking-tight">
          Top Recruiters of <span className="font-extrabold text-[#000000]">{brand.name || "Shoolini University Online"}</span>
        </h2>

        <div className="max-w-5xl mx-auto px-2">
          {/* Desktop Partner Image */}
          <div className="hidden sm:block relative w-full">
            <Image
              src={desktopImg}
              alt={heading}
              width={1100}
              height={380}
              className="w-full h-auto object-contain mx-auto"
              priority
            />
          </div>

          {/* Mobile Partner Image */}
          <div className="block sm:hidden relative w-full">
            <Image
              src={mobileImg}
              alt={heading}
              width={500}
              height={450}
              className="w-full h-auto object-contain mx-auto"
              priority
            />
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}

function RecruiterLogoBadge({ name = "" }) {
  const lower = name.toLowerCase();

  if (lower.includes("abbott")) {
    return (
      <div className="w-28 sm:w-32 h-10 border border-slate-200/90 rounded-[6px] bg-white flex items-center justify-center gap-1.5 px-2 py-1 shadow-2xs">
        <svg className="w-5 h-5 text-[#0096d6] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm11 0c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z" />
        </svg>
        <span className="font-extrabold text-[13px] text-[#002b49] tracking-tight">Abbott</span>
      </div>
    );
  }

  if (lower.includes("cisco") || lower.includes("samsung")) {
    return (
      <div className="w-28 sm:w-32 h-10 border border-slate-200/90 rounded-[6px] bg-white flex items-center justify-center px-2 py-1 shadow-2xs">
        <span className="font-black text-[13.5px] text-[#1428a0] tracking-[0.16em]">SAMSUNG</span>
      </div>
    );
  }

  if (lower.includes("jio")) {
    return (
      <div className="w-28 sm:w-32 h-10 border border-slate-200/90 rounded-[6px] bg-white flex items-center justify-center px-2 py-1 shadow-2xs">
        <div className="w-7 h-7 rounded-full bg-[#e11938] flex items-center justify-center shadow-2xs">
          <span className="text-white font-black italic text-[11.5px] tracking-tight ml-0.5">Jio</span>
        </div>
      </div>
    );
  }

  if (lower.includes("kpmg")) {
    return (
      <div className="w-28 sm:w-32 h-10 border border-slate-200/90 rounded-[6px] bg-white flex items-center justify-center px-2 py-1 shadow-2xs">
        <span className="font-black italic text-[14.5px] text-[#00338d] tracking-wider border-b-2 border-t-2 border-[#00338d] px-1 py-0.5 leading-none">
          KPMG
        </span>
      </div>
    );
  }

  if (lower.includes("apollo")) {
    return (
      <div className="w-28 sm:w-32 h-10 border border-slate-200/90 rounded-[6px] bg-white flex items-center justify-center gap-1.5 px-2 py-1 shadow-2xs">
        <svg className="w-4 h-4 text-[#ff7a00] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L9.5 8.5 3 9.5l5 4.5L6.5 21 12 17.5 17.5 21l-1.5-7 5-4.5-6.5-1z" />
        </svg>
        <div className="flex flex-col text-left leading-none">
          <span className="font-bold text-[11px] text-[#007a87]">Apollo</span>
          <span className="text-[7.5px] font-bold text-[#007a87] tracking-wider">HOSPITALS</span>
        </div>
      </div>
    );
  }

  if (lower.includes("deloitte")) {
    return (
      <div className="w-28 sm:w-32 h-10 border border-slate-200/90 rounded-[6px] bg-white flex items-center justify-center px-2 py-1 shadow-2xs">
        <span className="font-bold text-[13.5px] text-black tracking-tight flex items-baseline">
          Deloitte<span className="w-1.5 h-1.5 bg-[#86bc25] rounded-full inline-block ml-0.5" />
        </span>
      </div>
    );
  }

  if (lower.includes("gsk")) {
    return (
      <div className="w-28 sm:w-32 h-10 border border-slate-200/90 rounded-[6px] bg-white flex items-center justify-center px-2 py-1 shadow-2xs">
        <div className="px-3 py-0.5 bg-[#f36633] rounded-full flex items-center justify-center shadow-2xs">
          <span className="text-white font-extrabold text-[12px] lowercase tracking-tight">gsk</span>
        </div>
      </div>
    );
  }

  if (lower.includes("larsen") || lower.includes("toubro") || lower.includes("l&t")) {
    return (
      <div className="w-28 sm:w-32 h-10 border border-slate-200/90 rounded-[6px] bg-white flex items-center justify-center gap-1.5 px-2 py-1 shadow-2xs">
        <div className="w-5 h-5 rounded-full border border-[#00338d] flex items-center justify-center font-bold text-[8.5px] text-[#00338d]">
          L&amp;T
        </div>
        <span className="font-bold text-[9.5px] text-slate-900 tracking-tight leading-none">
          LARSEN &amp; TOUBRO
        </span>
      </div>
    );
  }

  return (
    <div className="w-28 sm:w-32 h-10 border border-slate-200/90 rounded-[6px] bg-white flex items-center justify-center px-2 py-1 shadow-2xs">
      <span className="font-bold text-[12px] text-slate-800">{name}</span>
    </div>
  );
}

