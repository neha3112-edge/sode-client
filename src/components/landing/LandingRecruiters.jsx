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
}) {
  const activeRecruiters = recruiters || brand.recruiters || {};

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
    const image = activeRecruiters.image || "/assets/all_universities_images/vgu/placement-partner-vgu.webp";

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
