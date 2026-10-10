"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import LandingContainer from "./LandingContainer";

/**
 * Reusable Recruiters / Placement Partner Section (#partners / #placement)
 * Supports both VGU single image badge layout and Shoolini/Desktop-Mobile responsive layout
 */
export default function LandingRecruiters({
  recruiters = {},
  brand = {},
  onOpenApply,
}) {
  const activeRecruiters = recruiters || brand.recruiters || {};

  // If LPU layout
  if (brand.slug === "lpu" || brand.recruitersLayout === "lpu") {
    const titlePrefix = activeRecruiters.titlePrefix || "Placement";
    const titleHighlight = activeRecruiters.titleHighlight || "& Hiring Partners at LPU Online";
    const desc =
      activeRecruiters.desc ||
      activeRecruiters.description ||
      "At LPU Online, Students and Professionals get an opportunity to enhance their career truly nurture their ambitions. The Lovely Professional University Online Admission supports students and has a dedicated placement support and a strong network of hiring partners. They create real opportunities for professional growth, whether you're pursuing an LPU MBA Online or an LPU Online MCA program.";

    const desktopImage =
      activeRecruiters.desktopImage ||
      "/assets/all_universities_images/lpu/placement-desktop.webp";
    const mobileImage =
      activeRecruiters.mobileImage ||
      "/assets/all_universities_images/lpu/placement-mobile.webp";

    return (
      <section id="recruiters" className="py-12 sm:py-16 md:py-20 bg-white select-none border-b border-slate-200">
        <LandingContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Text & Apply Button */}
            <div className="lg:col-span-5 text-left space-y-4 pl-4 sm:pl-6 lg:pl-0">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#b0b7c3] tracking-wide m-0 leading-tight">
                {titlePrefix}
              </h2>
              <h3 className="text-2xl sm:text-3xl lg:text-[30px] font-extrabold text-[#f58220] tracking-wide m-0 leading-tight">
                & Hiring Partners at LPU <br className="sm:hidden" />
                Online
              </h3>
              <p className="text-[14px] sm:text-[15px] text-slate-700 leading-[1.65] font-normal tracking-wide m-0 pt-1">
                {typeof desc === "string" && desc.includes("At LPU Online, Students and Professionals") ? (
                  <>
                    At LPU Online, Students and Professionals get <br className="sm:hidden" />
                    an opportunity to enhance their career truly <br className="sm:hidden" />
                    nurture their ambitions. The Lovely <br className="sm:hidden" />
                    Professional University Online Admission <br className="sm:hidden" />
                    supports students and has a dedicated <br className="sm:hidden" />
                    placement support and a strong network of <br className="sm:hidden" />
                    hiring partners. They create real opportunities <br className="sm:hidden" />
                    for professional growth, whether you're <br className="sm:hidden" />
                    pursuing an LPU MBA Online or an LPU Online <br className="sm:hidden" />
                    MCA program.
                  </>
                ) : (
                  desc
                )}
              </p>
              <div className="w-full h-px bg-slate-200 my-4" />
              <div>
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className="bg-black hover:bg-neutral-800 text-white font-bold text-[14px] px-6 py-2.5 rounded-[6px] shadow-sm transition-all cursor-pointer border-none active:scale-95 inline-flex items-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <span className="text-[13px] font-black tracking-tighter">&gt;&gt;</span>
                </button>
              </div>
            </div>

            {/* Right: Partner Infographic Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              {/* Desktop */}
              <div className="hidden sm:block relative w-full aspect-[800/303]">
                <Image
                  src={desktopImage}
                  alt="LPU Hiring Partners"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                />
              </div>
              {/* Mobile: Full-width with subtle left-right padding, larger size */}
              <div className="block sm:hidden -mx-3.5 sm:mx-0 w-[calc(100%+1.75rem)] sm:w-full px-2.5 sm:px-0">
                <Image
                  src={mobileImage}
                  alt="LPU Hiring Partners"
                  width={600}
                  height={906}
                  className="w-full h-auto object-contain block mx-auto"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </LandingContainer>
      </section>
    );
  }

  // If list of partner logos is provided (e.g. MU Top-Tier Hiring Partners)
  if (activeRecruiters.logos && activeRecruiters.logos.length > 0) {
    return (
      <MuRecruitersCarousel
        activeRecruiters={activeRecruiters}
        brand={brand}
      />
    );
  }

  // If IIM Kozhikode Layout
  if (brand.slug === "iim" || brand.recruitersLayout === "iim") {
    const partners = activeRecruiters.partners && activeRecruiters.partners.length > 0
      ? activeRecruiters.partners
      : [
          { name: "Capco", image: "/assets/iim/capco.webp" },
          { name: "Cognizant", image: "/assets/iim/Cognizant.webp" },
          { name: "Delhivery", image: "/assets/iim/Delhivery.webp" },
          { name: "Capita", image: "/assets/iim/capita.webp" },
          { name: "Disney", image: "/assets/iim/disnep.webp" },
          { name: "Codeyoung", image: "/assets/iim/codeyoung.webp" },
          { name: "CBSPL", image: "/assets/iim/cbspl.webp" },
        ];

    return (
      <section id="placement">
        <div className="container">
          <div className="placement-section">
            <h2><strong>PLACEMENTS</strong> PARTNERS</h2>
            {partners.map((p, idx) => (
              <img
                key={idx}
                src={p.image}
                alt={p.name || `p${idx + 1}`}
                className="placement-img"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If partners list is provided (generic fallback)
  if (activeRecruiters.partners && activeRecruiters.partners.length > 0) {
    const partners = activeRecruiters.partners;
    const title = activeRecruiters.title || "IIM Kozhikode HR Analytics Course: Placement Partners";

    return (
      <section id="placement" className="py-12 sm:py-16 bg-white select-none scroll-mt-20">
        <LandingContainer>
          <div className="bg-[#F2F2F2] rounded-[15px] p-6 sm:p-10 text-center">
            <h2 className="text-[22px] sm:text-[28px] font-bold text-[#2B2146] mb-8 m-0">
              {title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 items-center justify-center">
              {partners.map((p, idx) => (
                <div key={idx} className="bg-white rounded-[8px] h-[70px] p-2 flex items-center justify-center shadow-xs border border-slate-200/60">
                  <div className="relative w-full h-full">
                    <Image
                      src={p.image}
                      alt={p.name || `Partner ${idx + 1}`}
                      fill
                      className="object-contain p-1"
                      sizes="150px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </LandingContainer>
      </section>
    );
  }

  // If VGU or single image is supplied
  if (activeRecruiters.image || brand.slug === "vgu" || brand.recruitersLayout === "vgu") {
    const title = activeRecruiters.title || "Top Recruiters at VGU Online";
    const desktopImage =
      activeRecruiters.desktopImage ||
      activeRecruiters.image ||
      "/assets/all_universities_images/vgu/placement-partner-vgu.webp";
    const mobileImage =
      activeRecruiters.mobileImage ||
      "/assets/all_universities_images/vgu/hairing-partner-vgu-mobile.webp";

    return (
      <section id="partners" className={`${activeRecruiters.sectionPadding || "py-10 sm:py-16"} bg-white select-none`}>
        <LandingContainer>
          {/* Centered Maroon Badge */}
          <div className="flex justify-center mb-6 sm:mb-12">
            <div className="bg-[#811811] text-white px-8 sm:px-14 py-2.5 sm:py-3.5 rounded-[8px] sm:rounded-[10px] text-center shadow-xs min-w-[270px] sm:min-w-[340px]">
              <h2 className="text-[17px] sm:text-[20px] font-bold text-white tracking-tight leading-[1.25] whitespace-pre-line m-0">
                {title}
              </h2>
            </div>
          </div>

          {/* Recruiters Logos Image */}
          <div className="max-w-[1100px] mx-auto px-1 sm:px-2">
            {/* Desktop / Tablet View */}
            <div className="hidden sm:flex relative w-full aspect-[1392/394] items-center justify-center">
              <Image
                src={desktopImage}
                alt={title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1100px"
              />
            </div>

            {/* Mobile View */}
            <div className="flex sm:hidden relative w-full max-w-[440px] mx-auto aspect-[719/777] items-center justify-center">
              <Image
                src={mobileImage}
                alt={title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 440px"
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

/**
 * Mangalayatan University (MU) / Generic Partner Logo Carousel
 * Displays partner logos with Ant Design Carousel, auto-rotates smoothly, responsive
 */
function MuRecruitersCarousel({ activeRecruiters, brand }) {
  const logos = activeRecruiters.logos || [];
  const title = activeRecruiters.title || `${brand.name || "University"} Top-Tier Hiring Partners`;
  const subtitle = activeRecruiters.subtitle || activeRecruiters.description || null;
  const carouselRef = useRef(null);

  return (
    <section
      id="placement"
      className={`select-none ${brand.recruitersSectionClassName || "py-10 sm:py-14 bg-[#f8f9fa] text-center"}`}
      style={{
        backgroundColor: brand.recruitersBg || "#f8f9fa",
        ...brand.recruitersSectionStyle,
      }}
    >
      <div className={brand.recruitersContainerClassName || "max-w-[1240px] mx-auto px-4 sm:px-6"}>
        {/* Title and Subtitle */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8 text-center">
          <h2
            className={
              brand.recruitersTitleClassName ||
              "text-[22px] sm:text-[26px] lg:text-[30px] font-bold text-[#193579] uppercase tracking-wide m-0 mb-3"
            }
            style={brand.recruitersTitleStyle}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={
                brand.recruitersSubtitleClassName ||
                "text-[12.5px] sm:text-[13.5px] text-[#333333] leading-[1.55] max-w-4xl mx-auto font-normal m-0"
              }
              style={brand.recruitersSubtitleStyle}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Ant Design Carousel Window */}
        <div className="overflow-hidden w-full max-w-[1180px] mx-auto px-1 py-1">
          <Carousel
            ref={carouselRef}
            slidesToShow={brand.recruitersVisibleCount || 5}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={brand.recruitersInterval || 2200}
            infinite={logos.length > (brand.recruitersVisibleCount || 5)}
            dots={{ className: "!mt-5" }}
            arrows={false}
            pauseOnHover
            draggable
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: logos.length > 3,
                },
              },
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  infinite: logos.length > 2,
                },
              },
            ]}
          >
            {logos.map((logo, idx) => (
              <div key={idx} className="px-2 sm:px-2.5 outline-none py-1">
                <div
                  className={
                    brand.recruitersCardClassName ||
                    "bg-white rounded-[8px] h-[72px] sm:h-[82px] w-full px-3 py-2 flex items-center justify-center shadow-xs border border-slate-100 hover:shadow-md transition-all group overflow-hidden"
                  }
                  style={brand.recruitersCardStyle}
                >
                  <img
                    src={logo}
                    alt={`Partner ${(idx % logos.length) + 1}`}
                    className="max-h-[48px] sm:max-h-[56px] max-w-[85%] w-auto h-auto object-contain mx-auto transition-transform duration-200 group-hover:scale-105"
                    loading="eager"
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
