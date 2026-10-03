"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { Download, ChevronLeft, ChevronRight, Clock, Hourglass, GraduationCap, ArrowRight } from "lucide-react";
import { FaDownload } from "react-icons/fa";

/**
 * Reusable Landing Programmes Section
 * Supports:
 * 1. VGU Static 4-Column Grid Layout (vgu-cards / vgu-grid)
 * 2. Shoolini Static 3-Column Grid Layout (grid)
 * 3. Clean Card Carousel (Manipal - 3 cards visible, course code, title, logo, brochure button)
 * 4. SMU Card Carousel (3 cards visible, image, title, description, dual action buttons)
 * 5. Classic Amity Carousel (4 cards visible, level badge, duration hourglass, brochure button)
 */
export default function LandingProgrammes({
  programmes = [],
  universityName = "University Online",
  brand = {},
  title = "Online Degree Courses",
  intervalTime = 3500,
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const isLiverpool =
    brand.programmesLayout === "liverpool" ||
    brand.slug === "liverpool";

  const isRushford =
    !isLiverpool &&
    (brand.programmesLayout === "rushford" ||
      brand.slug === "rushford");

  const isEsgci =
    !isLiverpool &&
    !isRushford &&
    (brand.programmesLayout === "esgci" ||
      brand.slug === "esgci");

  const isGgu =
    !isLiverpool &&
    !isRushford &&
    !isEsgci &&
    (brand.programmesLayout === "ggu" ||
      brand.slug === "ggu");

  const isMuTabs =
    !isLiverpool &&
    !isRushford &&
    !isEsgci &&
    !isGgu &&
    (brand.programmesLayout === "mu-tabs" ||
      brand.programmesLayout === "mu" ||
      brand.slug === "mu" ||
      brand.slug === "mangalayatan");

  const isVguGrid =
    !isLiverpool &&
    !isRushford &&
    !isEsgci &&
    !isGgu &&
    !isMuTabs &&
    (brand.programmesLayout === "vgu-cards" ||
      brand.programmesLayout === "vgu-grid" ||
      brand.programmesLayout === "vgu" ||
      brand.slug === "vgu");

  const isGrid =
    !isLiverpool &&
    !isRushford &&
    !isEsgci &&
    !isGgu &&
    !isMuTabs &&
    !isVguGrid &&
    (brand.programmesLayout === "grid" ||
      brand.programmesLayout === "shoolini" ||
      brand.slug === "shoolini");

  // ==========================================
  // Layout 0-Liverpool: Courses Offered in Liverpool Online MBA (#courses_offered)
  // ==========================================
  if (isLiverpool) {
    const heading = brand.programmesTitle || "Courses Offered in";
    const subHeading = brand.programmesSubtitle || "Liverpool Online MBA";

    return (
      <section id="courses_offered" className="py-12 sm:py-16 bg-[#ffffff] select-none scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-[26px] sm:text-[34px] font-bold text-[#111111] leading-tight m-0">
              {heading} <br />
              <span className="text-[#00408d]">{subHeading}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programmes.map((c, idx) => (
              <div
                key={c.id || idx}
                className="slide bg-white rounded-[10px] shadow-[0_0_8px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[18px] sm:text-[19px] font-bold text-[#111111] mb-2 leading-snug">
                      {c.title}
                    </h3>
                    <p className="text-[13px] text-[#444444] leading-relaxed line-clamp-3 mb-4">
                      {c.description}
                    </p>
                    <hr className="border-t border-slate-200 mb-4" />
                  </div>
                </div>
                <div className="px-5 pb-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(c.title)}
                    className="w-full py-2.5 px-3 bg-[#00408d] text-white font-bold text-[13px] rounded-[5px] hover:brightness-110 active:scale-95 transition-all border-none cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Apply Now</span>
                    <i className="fa fa-check text-white text-[11px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectCourseForBrochure?.(c.title)}
                    className="w-full py-2.5 px-3 bg-black text-white font-bold text-[13px] rounded-[5px] hover:bg-neutral-800 active:scale-95 transition-all border-none cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Get Brochure</span>
                    <Download className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0-Rushford: DBA Specialisations (#courses)
  // ==========================================
  if (isRushford) {
    const heading = brand.programmesTitle || "DBA Specialisations At";
    const subHeading = brand.programmesSubtitle || "Rushford Business School";

    return (
      <section id="courses" className="py-12 sm:py-16 bg-[#ffffff] select-none scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-medium text-[#111111] m-0">
              {heading}
            </h2>
            {subHeading && (
              <p className="text-[22px] sm:text-[28px] text-[#e0007a] font-bold mt-1 m-0">
                {subHeading}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {programmes.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[8px] overflow-hidden border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  {/* Multicolor Border strip */}
                  <div
                    className="h-[8px] w-full"
                    style={{
                      background:
                        "linear-gradient(to right, #d77a85 25%, #ff0099 25% 50%, #ff5c57 50% 75%, #c2002f 75%)",
                    }}
                  />
                  <div className="p-5 sm:p-6">
                    <h3 className="text-[18px] sm:text-[19px] font-bold text-[#111111] mb-2 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-[13px] sm:text-[13.5px] text-[#555555] leading-relaxed mb-4">
                      {p.description || p.desc}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                  <hr className="border-t border-slate-200 mb-4" />
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(p.title)}
                    className="w-full py-2.5 px-4 bg-[#0cb1ef] text-white font-bold text-[14px] rounded-[20px] hover:brightness-95 transition-all border-none cursor-pointer shadow-xs active:scale-95"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0-ESGCI: Who Can Apply for ESGCI Online DBA (#whocanapply)
  // ==========================================
  if (isEsgci) {
    const heading = brand.programmesTitle || "Who Can Apply for the ESGCI Online DBA";
    return (
      <section id="whocanapply" className="py-12 sm:py-16 bg-[#ffffff] select-none scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <h2 className="text-center text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-[#111111] mb-8 sm:mb-12">
            Who Can Apply for the <span className="text-[#04903c]">ESGCI Online DBA</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {programmes.map((p, idx) => (
              <div key={idx} className="bg-white rounded-[8px] overflow-hidden border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h2 className="text-[18px] sm:text-[20px] font-bold text-[#111111] mb-2 leading-snug">
                      {p.title}
                    </h2>
                    <p className="text-[13px] sm:text-[13.5px] text-[#555555] leading-relaxed mb-4">
                      {p.description}
                    </p>
                  </div>
                  <div>
                    <hr className="border-t border-slate-200 mb-4" />
                    <button
                      type="button"
                      onClick={() => onOpenApply?.(p.title)}
                      className="w-full py-2.5 px-4 bg-[#fff000] text-black font-bold text-[14px] rounded-[5px] hover:brightness-95 transition-all border-none cursor-pointer"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0-GGU: Golden Gate University Courses Offered
  // ==========================================
  if (isGgu) {
    return (
      <GguProgrammes
        programmes={programmes}
        brand={brand}
        universityName={universityName}
        onSelectCourseForBrochure={onSelectCourseForBrochure}
        onOpenApply={onOpenApply}
      />
    );
  }

  // ==========================================
  // Layout 0: Mangalayatan University (MU) Tabbed Grid
  // ==========================================
  if (isMuTabs) {
    return (
      <MuProgrammesTabbed
        programmes={programmes}
        brand={brand}
        onSelectCourseForBrochure={onSelectCourseForBrochure}
        onOpenApply={onOpenApply}
      />
    );
  }

  // ==========================================
  // Layout 1: VGU Static 4-Column Grid
  // ==========================================
  if (isVguGrid) {
    const heading =
      brand.programmesTitle ||
      "VGU Online | Vivekananda Global University Online Courses";

    return (
      <section id="program" className="w-full py-12 sm:py-16 bg-[#f7f9fa] border-b border-slate-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#203061] tracking-tight mb-8 sm:mb-12">
            {heading}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7">
            {programmes.map((c, idx) => {
              const isPostGrad =
                c.level?.toLowerCase().includes("post") ||
                c.title?.toLowerCase().includes("master") ||
                c.code?.toLowerCase().startsWith("m");
              const durationText =
                c.duration || (isPostGrad ? "24 Months" : "36 Months");

              return (
                <div
                  key={`${c.id || c.code}-${idx}`}
                  className="bg-white rounded-[14px] overflow-hidden shadow-[0_10px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.16)] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Image with Black Duration Badge */}
                    <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={c.image || "/assets/vgu/mba-vgu.webp"}
                        alt={c.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <span className="absolute top-2.5 right-2.5 bg-black/95 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-[4px] shadow-sm select-none">
                        {durationText}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 text-center flex flex-col items-center">
                      <h3 className="text-[26px] sm:text-[28px] font-extrabold text-[#811811] m-0 tracking-tight leading-tight">
                        {c.code || c.id?.toUpperCase() || c.title}
                      </h3>
                      <p className="text-[12px] sm:text-[12.5px] font-semibold text-slate-800 mt-1 mb-2.5 line-clamp-1">
                        {c.title}
                      </p>
                      <p className="text-[11px] sm:text-[11.5px] text-slate-600 leading-[1.55] line-clamp-4 min-h-[66px] m-0">
                        {c.description}
                      </p>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        onSelectCourseForBrochure?.(c.code || c.title)
                      }
                      className="bg-[#008000] hover:bg-[#006e00] active:scale-95 text-white font-bold text-[11.5px] sm:text-[12px] py-2 px-2 rounded-full inline-flex items-center justify-center gap-1 shadow-xs transition-all cursor-pointer border-none"
                    >
                      <span>Get Brochure</span>
                      <Download className="w-3 h-3 stroke-[2.5]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenApply?.(c.code || c.title)}
                      className="bg-[#811811] hover:bg-[#6b130e] active:scale-95 text-white font-bold text-[11.5px] sm:text-[12px] py-2 px-2 rounded-full inline-flex items-center justify-center shadow-xs transition-all cursor-pointer border-none"
                    >
                      <span>Apply Now</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 2: Shoolini Static 3-Column Grid
  // ==========================================
  if (isGrid) {
    return (
      <section id="program" className="py-6 sm:py-8 bg-white select-none">
        <div className="max-w-[980px] mx-auto px-4 sm:px-5">
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-center text-[#000000] mb-5 sm:mb-6 tracking-tight">
            {brand.programmesTitle || `${universityName} Courses`}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {programmes.map((c, idx) => (
              <div
                key={c.id || c.code || idx}
                className="bg-[#f7f7f7] rounded-[5px] overflow-hidden shadow-[0_0_5px_2px_#e8e8e8] flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-[2.4/1] overflow-hidden rounded-t-[5px] bg-[#f7f7f7]">
                    <Image
                      src={c.image || "/assets/shoolini/mba-shoolini.webp"}
                      alt={c.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                    />
                  </div>

                  <div className="p-3 sm:p-3.5">
                    <h3 className="text-[13.5px] sm:text-[14px] font-semibold text-[#4d4d4d] m-0 mb-1 leading-snug">
                      {c.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-[#4d4d4d] font-normal mb-1.5">
                      <Clock className="w-3 h-3 text-[#4d4d4d] shrink-0" />
                      <span>{c.duration || "24 Months"}</span>
                    </div>

                    <p className="text-[11px] sm:text-[11.5px] text-[#4d4d4d] leading-[1.35] m-0 font-normal">
                      {c.description}
                    </p>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 pt-0 grid grid-cols-2 gap-1.5 mt-auto">
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(c.code || c.title)}
                    className="py-1.5 px-1.5 rounded-[4px] text-white font-medium text-[11px] sm:text-[11.5px] flex items-center justify-center gap-1 cursor-pointer transition-all hover:opacity-95 shadow-xs border-none active:scale-95 whitespace-nowrap"
                    style={{
                      background: brand.themeGradient || "linear-gradient(to right, #fd202a, #ff4be5)",
                    }}
                  >
                    <span>Apply now</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                    className="py-1.5 px-1 rounded-[4px] text-[#fd202a] font-medium text-[10.5px] sm:text-[11px] flex items-center justify-center gap-0.5 cursor-pointer transition-all hover:bg-red-50 shadow-xs border border-[#fd202a] active:scale-95 whitespace-nowrap"
                    style={{
                      background: "transparent",
                      color: "#fd202a",
                      borderColor: "#fd202a",
                    }}
                  >
                    <span>Download Brochure</span>
                    <Download className="w-2.5 h-2.5 stroke-[2.2] shrink-0" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 3, 4, 5: Interactive Carousel Sliders
  // ==========================================
  const isSmuLayout =
    brand.programmesLayout === "smu-cards" || brand.slug === "smu";

  const isCleanCard =
    brand.programmesCardStyle === "clean" ||
    brand.programmesCardStyle === "card" ||
    Boolean(brand.programmesPrefix);

  const carouselRef = useRef(null);

  const rawUni = universityName || brand.name || "University Online";
  const displayUniversity = rawUni.replace(/\s+Online$/i, "").trim() || rawUni;
  const sectionBg =
    brand.programmesBg ||
    (isCleanCard
      ? "#f5ede7"
      : isSmuLayout
      ? undefined
      : brand.primaryColor || "#08417b");
  const sectionTitle =
    brand.programmesTitle ||
    `Programs offered by ${brand.name || "Sikkim Manipal University Online"}`;

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  if (!programmes || programmes.length === 0) return null;

  const defaultSlidesToShow = isCleanCard || isSmuLayout ? 3 : 4;


  return (
    <section
      id={isSmuLayout ? "programs" : "programmes"}
      className={
        isSmuLayout
          ? "w-full pt-10 pb-12 sm:pt-12 sm:pb-14 text-slate-900 overflow-hidden relative select-none"
          : "py-6 sm:py-8 lg:py-10 overflow-hidden relative select-none transition-colors w-full"
      }
      style={
        isSmuLayout
          ? {
              background:
                "linear-gradient(to bottom, #ffffff 0%, #ffffff 56%, #efefef 56%, #efefef 100%)",
            }
          : { backgroundColor: sectionBg }
      }
    >
      {/* Section Heading */}
      <div className="text-center mb-5 sm:mb-6 px-4 max-w-4xl mx-auto">
        {isCleanCard ? (
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold m-0 tracking-tight leading-tight">
            <span className="text-[#ee3024]">{brand.programmesPrefix || "Programs Offered by "}</span>
            <span className="text-[#192f59]">{brand.programmesHighlight || displayUniversity}</span>
          </h2>
        ) : isSmuLayout ? (
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#212529] m-0 tracking-tight leading-tight">
            {sectionTitle}
          </h2>
        ) : (
          <div>
            <h3
              className="text-xl sm:text-2xl lg:text-[28px] font-bold m-0 tracking-tight leading-tight"
              style={{ color: brand.primaryColor || "#f35a06" }}
            >
              {displayUniversity}
            </h3>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold mt-1 m-0 tracking-tight leading-tight text-white">
              {title}
            </h2>
          </div>
        )}
      </div>

      {/* Carousel Container */}
      <div
        className={`w-full mx-auto px-4 relative ${
          isCleanCard
            ? "max-w-[1140px] px-3 sm:px-6"
            : isSmuLayout
            ? "max-w-[1200px] xl:max-w-[1240px] px-6 sm:px-10 lg:px-12"
            : "max-w-[1240px] xl:max-w-[1360px] sm:px-8 lg:px-10"
        }`}
      >
        {/* Navigation Chevrons */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous programme"
          className="absolute -left-2 sm:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-20 text-[#222222] hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next programme"
          className="absolute -right-2 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-20 text-[#222222] hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
        </button>

        {/* Ant Design Carousel Viewport */}
        <div className="w-full overflow-hidden">
          <Carousel
            ref={carouselRef}
            autoplay
            autoplaySpeed={isSmuLayout ? 6000 : intervalTime || 3500}
            slidesToShow={defaultSlidesToShow}
            slidesToScroll={1}
            infinite={programmes.length > 2}
            dots={false}
            arrows={false}
            pauseOnHover={true}
            draggable={true}
            responsive={[
              {
                breakpoint: 1280,
                settings: {
                  slidesToShow: defaultSlidesToShow,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {programmes.map((c, idx) => {
              if (isCleanCard) {
                return (
                  <div
                    key={`${c.id || c.code}-${idx}`}
                    className="px-2 sm:px-2.5 lg:px-3 box-border outline-none py-2"
                  >
                    <div className={brand.programmeCardClass || "bg-white rounded-[5px] shadow-[0px_3px_15px_rgba(0,0,0,0.13)] py-4 sm:py-5 px-5 sm:px-[22px] flex flex-col justify-between h-full min-h-[350px] sm:min-h-[360px] text-left"}>
                      <div>
                        <h3 className="text-[26px] sm:text-[28px] font-bold text-[#000000] m-0 tracking-tight leading-none">
                          {c.code || c.id?.toUpperCase()}
                        </h3>

                        <h4 className="text-[17.5px] sm:text-[18.5px] font-semibold text-[#222222] mt-1.5 mb-1.5 leading-[1.2] min-h-[42px] flex items-start">
                          {c.title}
                        </h4>

                        <p className="text-[12.5px] sm:text-[13px] text-[#333333] leading-[1.5] font-normal m-0">
                          {c.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-0.5">
                        <div className="relative w-28 sm:w-[114px] h-7 sm:h-[28px] mb-2">
                          <Image
                            src={brand.manipalLogo || c.logo || "/assets/manipal_v1_images/manipal-logo.webp"}
                            alt="Online Manipal"
                            fill
                            className="object-contain object-left"
                            sizes="120px"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                          className="w-full py-2 sm:py-2.5 px-4 rounded-[5px] text-white font-medium text-[13px] sm:text-[13.5px] flex items-center justify-center gap-2 border-none cursor-pointer transition-opacity hover:opacity-95 shadow-xs"
                          style={{
                            background:
                              brand.programmeBtnBg ||
                              "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
                          }}
                        >
                          <span>Download Brochure</span>
                          <Download className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              const isPostGrad =
                c.level?.toLowerCase().includes("post") ||
                c.title?.toLowerCase().includes("master") ||
                c.code?.toLowerCase().startsWith("m");

              const levelText = c.level || (isPostGrad ? "Post Graduation" : "Graduation");
              const durationText = c.duration || (isPostGrad ? "24 Months" : "36 Months");

              if (isSmuLayout) {
                return (
                  <div
                    key={`${c.id || c.code}-${idx}`}
                    className="px-2.5 sm:px-3 box-border outline-none py-2"
                  >
                    <div className="bg-white rounded-[8px] sm:rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0px_8px_28px_rgba(0,0,0,0.12)] transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between h-full group text-left">
                      <div>
                        <div className="relative h-44 sm:h-48 md:h-[185px] w-full rounded-[6px] overflow-hidden mb-3.5 bg-slate-100">
                          <Image
                            src={c.image || "/assets/images/smu_mba.jpg"}
                            alt={c.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>

                        <h3
                          className="text-[17px] sm:text-[18px] font-bold m-0 tracking-tight leading-snug"
                          style={{ color: brand.primaryColor || "#074a76" }}
                        >
                          {c.title}
                        </h3>

                        <p className="text-[12px] sm:text-[12.5px] text-[#4b5563] leading-[1.55] mt-2 sm:mt-2.5 mb-2 line-clamp-4 min-h-[58px] sm:min-h-[60px] m-0">
                          {c.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-4 sm:mt-5">
                        <button
                          type="button"
                          onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                          className="active:scale-95 text-white font-semibold text-[13px] sm:text-[13.5px] py-2.5 px-2 rounded-[5px] flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer border-none"
                          style={{
                            backgroundColor:
                              brand.slug === "vgu"
                                ? "#008000"
                                : brand.hero?.buttonBackground || "#f78d2d",
                          }}
                        >
                          <span>Get Brochure</span>
                          <FaDownload className="w-3 h-3 text-white shrink-0" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenApply?.(c.code || c.title)}
                          className="active:scale-95 text-white font-semibold text-[13px] sm:text-[13.5px] py-2.5 px-2 rounded-[5px] flex items-center justify-center transition-all shadow-xs cursor-pointer border-none"
                          style={{
                            backgroundColor: brand.primaryColor || "#074a76",
                          }}
                        >
                          <span>Apply Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              // Classic Card Style (Amity, etc.)
              return (
                <div
                  key={`${c.id || c.code}-${idx}`}
                  className="px-1.5 sm:px-2 xl:px-2.5 box-border outline-none py-2"
                >
                  <div className="bg-white rounded-[8px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group text-left border border-slate-200/80">
                    <div>
                      <div className="relative h-44 sm:h-44 xl:h-48 w-full bg-slate-100 overflow-hidden">
                        <Image
                          src={c.image || "/assets/amitylp/MBA-amity.png"}
                          alt={c.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute top-0 left-0 bg-[#009900] text-white text-[11px] sm:text-[11.5px] font-semibold px-2.5 sm:px-3 py-1 rounded-br-[4px] tracking-wide select-none shadow-xs">
                          {levelText}
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 pb-2">
                        <h3
                          className="text-[20px] sm:text-[22px] xl:text-[24px] font-bold m-0 leading-tight tracking-tight"
                          style={{ color: brand.primaryColor || "#08417b" }}
                        >
                          {c.code || c.id?.toUpperCase() || c.title}
                        </h3>
                        <p
                          className="text-[12.5px] sm:text-[13px] font-semibold mt-1 mb-1.5 line-clamp-1"
                          style={{ color: brand.primaryColor || "#08417b" }}
                        >
                          {c.title}
                        </p>
                        <p className="text-[11.5px] sm:text-[12px] text-[#444444] leading-[1.5] line-clamp-3 sm:line-clamp-4 min-h-[54px] sm:min-h-[72px] m-0">
                          {c.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-3.5 sm:px-4 pt-2 pb-3.5 flex items-center justify-between border-t border-slate-100 mt-1">
                      <button
                        type="button"
                        onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                        className="active:scale-95 font-bold text-[11.5px] sm:text-[12px] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-[4px] inline-flex items-center gap-1.5 border-none cursor-pointer transition-all shadow-xs shrink-0"
                        style={{
                          background: brand.programmeBtnBg || "#ffd200",
                          color: brand.programmeBtnText || "#000000",
                        }}
                      >
                        <span>Download Brochure</span>
                        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>

                      <div className="flex items-center gap-1 text-[11.5px] sm:text-[12px] font-medium text-[#333333] select-none shrink-0">
                        <Hourglass className="w-3.5 h-3.5 text-[#555555]" />
                        <span>{durationText}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

// Subcomponent: Mangalayatan University Tabbed Programmes
function MuProgrammesTabbed({
  programmes = [],
  brand = {},
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const [activeCategory, setActiveCategory] = useState("Master");

  const titleLine1 = brand.programmesTitle || "PROGRAMS OFFERED";
  const titleLine2 = brand.programmesSubtitle !== undefined
    ? brand.programmesSubtitle
    : `BY ${brand.name || "MANGALAYATAN UNIVERSITY ONLINE"}`;

  const filtered = programmes.filter((c) => {
    const isMaster =
      c.category === "Master" ||
      c.level?.toLowerCase().includes("post") ||
      c.title?.toLowerCase().includes("master") ||
      c.code?.toLowerCase().startsWith("m");
    return activeCategory === "Master" ? isMaster : !isMaster;
  });

  return (
    <section
      id="program"
      className={`w-full select-none ${brand.programmesSectionClassName || "py-10 sm:py-16"}`}
      style={{
        backgroundColor: brand.programmesBg || "#FFF6F0",
        ...brand.programmesSectionStyle,
      }}
    >
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${brand.programmesContainerClassName || "max-w-[1240px]"}`}>
        {/* Section Heading matching Image 1 & 2 */}
        <h2
          className={`text-center font-bold text-[#193579] uppercase tracking-wide m-0 ${
            brand.programmesTitleClassName || "text-[24px] sm:text-[28px] lg:text-[30px]"
          }`}
          style={brand.programmesTitleStyle}
        >
          {titleLine1}
        </h2>
        {titleLine2 && (
          <h3
            className={`text-center font-medium text-[#193579] uppercase ${
              brand.programmesSubtitleClassName || "text-[18px] sm:text-[22px] lg:text-[25px] tracking-wider mt-1 mb-6 sm:mb-8"
            }`}
            style={brand.programmesSubtitleStyle}
          >
            {titleLine2}
          </h3>
        )}

        {/* Master / Bachelor Tabs matching Image 1 & 2 */}
        <div className={`flex justify-center gap-3 ${brand.programmesTabsClassName || "mb-4 sm:mb-5"}`}>
          {["Master", "Bachelor"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveCategory(tab)}
              className={`px-6 sm:px-7 py-1.5 sm:py-2 rounded-[5px] font-medium text-[13px] sm:text-[14px] transition-all cursor-pointer border-none ${
                activeCategory === tab
                  ? brand.programmesTabActiveClass || "bg-[#F97316] text-white shadow-xs"
                  : brand.programmesTabInactiveClass || "bg-[#dcdcdc] text-black hover:bg-[#d0d0d0]"
              }`}
              style={activeCategory === tab ? brand.programmesTabActiveStyle : brand.programmesTabInactiveStyle}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((c, idx) => {
            const isPostGrad =
              c.category === "Master" ||
              c.level?.toLowerCase().includes("post") ||
              c.title?.toLowerCase().includes("master") ||
              c.code?.toLowerCase().startsWith("m");

            const durationText = c.duration || (isPostGrad ? "2 Years" : "3 Years");
            const eligibilityText = c.eligibility || (isPostGrad ? "Bachelor Degree" : "12th Passed");
            const cardRadius = brand.programmesCardRadius || "rounded-[6px]";

            return (
              <div
                key={`${c.id || c.code}-${idx}`}
                className={`bg-white ${cardRadius} overflow-hidden shadow-[0_3px_15px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all flex flex-col justify-between border border-[#ededed] group ${
                  brand.programmesCardClassName || ""
                }`}
                style={brand.programmesCardStyle}
              >
                <div>
                  {/* Course Banner Image matching Image 1 */}
                  <div
                    className={`relative w-full overflow-hidden bg-slate-100 ${
                      brand.programmesCardImageClassName || "aspect-[16/7.8]"
                    }`}
                  >
                    <Image
                      src={c.image || "/assets/mu/mba-mu.webp"}
                      alt={c.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    />
                  </div>

                  {/* Card Content matching exact Image 1 */}
                  <div className={`pb-0.5 ${brand.programmesCardBodyClassName || "p-3.5 sm:p-4 pt-3"}`}>
                    <h3
                      className={`text-[#0a3e8c] m-0 mb-0.5 leading-tight tracking-tight ${
                        brand.programmesCardTitleClassName || "text-[25px] sm:text-[27px] font-bold"
                      }`}
                    >
                      Online {c.code || c.id?.toUpperCase() || c.title}
                    </h3>
                    <div
                      className={`text-[#111111] mb-2 line-clamp-1 ${
                        brand.programmesCardSubtitleClassName || "text-[13px] sm:text-[13.5px] font-bold"
                      }`}
                    >
                      {c.title}
                    </div>

                    {/* Duration & Eligibility with black icon & orange label */}
                    <div className="grid grid-cols-2 gap-2 my-1.5 text-[12px] sm:text-[12.5px]">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-black shrink-0" />
                          <span className="text-[#f97316] font-bold">Duration :</span>
                        </div>
                        <div className="font-bold text-[#111111] text-[12px] sm:text-[12.5px] pl-5 mt-0.5">
                          {durationText}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <GraduationCap className="w-4 h-4 text-black shrink-0" />
                          <span className="text-[#f97316] font-bold">Eligibility :</span>
                        </div>
                        <div className="font-bold text-[#111111] text-[12px] sm:text-[12.5px] pl-5.5 mt-0.5">
                          {eligibilityText}
                        </div>
                      </div>
                    </div>

                    <p
                      className={`text-[#333333] leading-[1.4] line-clamp-4 min-h-[46px] m-0 mb-2 ${
                        brand.programmesCardDescClassName || "text-[12px] sm:text-[12.5px]"
                      }`}
                    >
                      {c.description}
                    </p>
                  </div>
                </div>

                {/* Thin divider & Dual Pill Action Buttons (Single-line guaranteed) */}
                <div className={brand.programmesCardFooterClassName || "px-3.5 sm:px-4 pb-3"}>
                  <hr className="border-t border-slate-200 my-2" />
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                      className={`flex-1 py-1.5 sm:py-2 px-2.5 rounded-full font-bold whitespace-nowrap transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs ${
                        brand.programmesCardBtn1Class ||
                        "border-[1.5px] border-[#0a3e8c] text-[12px] sm:text-[12.5px] text-[#0a3e8c] bg-white hover:bg-slate-50"
                      }`}
                      style={brand.programmesCardBtn1Style}
                    >
                      <span>Download Brochure</span>
                      <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenApply?.(c.code || c.title)}
                      className={`py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-full font-bold whitespace-nowrap transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs shrink-0 ${
                        brand.programmesCardBtn2Class ||
                        "border-none text-[12px] sm:text-[12.5px] text-white bg-[#f97316] hover:bg-[#ea580c]"
                      }`}
                      style={brand.programmesCardBtn2Style}
                    >
                      <span>Know More</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// Layout: Golden Gate University (GGU) Courses Offered & Specializations
// ==========================================
function GguProgrammes({
  programmes = [],
  brand = {},
  universityName = "Golden Gate University",
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const [activeTab, setActiveTab] = useState("dba");
  const specCarouselRef = useRef(null);

  // 1. Primary Programs (MBA and DBA) matching exact user screenshot
  const mbaProgram =
    programmes.find(
      (p) =>
        p.id === "mba" ||
        p.code?.toUpperCase() === "MBA" ||
        p.title?.toLowerCase().includes("master of business")
    ) || programmes[0];

  const dbaProgram =
    programmes.find(
      (p) =>
        p.id === "dba" ||
        p.code?.toUpperCase() === "DBA" ||
        p.title?.toLowerCase().includes("doctor of business")
    ) || programmes[1];

  const mainCards = [
    {
      id: "mba",
      code: "MBA",
      badge: "MASTER",
      title: mbaProgram?.title || "Master of Business Administration (MBA)",
      image: mbaProgram?.image || "/assets/ggu/master-mba-ggu.webp",
      description:
        mbaProgram?.description ||
        "A US-approved or practice-driven program that offers both from Golden Gate University MBA online. The course builds strong leadership skills, strategic thinking, and data-informed decision-making skills. The University faculty is from a San Francisco-based scholar-practitioner with years of experience.",
      details: mbaProgram?.details || [
        { label: "Duration", value: "20 months (online + optional on-campus pathway)" },
        { label: "Eligibility", value: "Master's or Bachelor's Degree with 5+ years of experience." },
      ],
    },
    {
      id: "dba",
      code: "DBA",
      badge: "DOCTORATE",
      title: dbaProgram?.title || "Doctor of Business Administration (DBA)",
      image: dbaProgram?.image || "/assets/ggu/doctorate-dba-ggu.webp",
      description:
        dbaProgram?.description ||
        "A degree that is flexible and recognised, the online DBA at Golden Gate University is an advanced doctoral program that is for senior-level leaders, consultants, and academics. The course focuses on research, problem-solving, and an original dissertation that talks about real-life business challenges.",
      details: dbaProgram?.details || [
        { label: "Duration & Credits", value: "36 months | 56 credits" },
        { label: "Eligibility", value: "Recognised degree in Bachelor’s University" },
      ],
    },
  ];

  // 2. Specializations for Tabs Section
  const dbaSpecializations = programmes.filter(
    (p) =>
      p.id !== "mba" &&
      p.id !== "dba" &&
      (p.category === "Doctorate" ||
        p.level?.toLowerCase().includes("doc") ||
        p.id?.startsWith("dba-") ||
        p.code?.toUpperCase().includes("DBA") ||
        p.title?.toLowerCase().includes("dba"))
  );

  const mbaSpecializations = programmes.filter(
    (p) =>
      p.id !== "mba" &&
      p.id !== "dba" &&
      (p.category === "Master" ||
        p.level?.toLowerCase().includes("post") ||
        p.id?.startsWith("mba-") ||
        p.code?.toUpperCase().includes("MBA") ||
        p.title?.toLowerCase().includes("mba"))
  );

  const activeSpecs = activeTab === "dba" ? dbaSpecializations : mbaSpecializations;

  const handlePrevSpec = () => {
    specCarouselRef.current?.prev();
  };

  const handleNextSpec = () => {
    specCarouselRef.current?.next();
  };


  return (
    <div className="w-full">
      {/* ── 1. COURSES OFFERED Section (Exact Match to User Screenshot & Reference Site) ── */}
      <section
        id="main-courses"
        className="courses-section w-full py-12 sm:py-16 md:py-20 select-none scroll-mt-24"
        style={{ backgroundColor: brand.programmesBg || "#e6e6e6" }}
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-[#DC520A] text-[26px] sm:text-[30px] md:text-[32px] font-bold uppercase tracking-wide m-0 leading-tight">
              {brand.programmesTitle || "COURSES OFFERED"}
            </h2>
            <p className="text-[#222222] text-[15px] sm:text-[17px] font-bold mt-2 m-0">
              {brand.programmesSubtitle || "By Golden Gate University"}
            </p>
          </div>

          {/* 2 Main Course Cards */}
          <div className="course-container grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 justify-center items-stretch max-w-[1040px] mx-auto">
            {mainCards.map((card) => (
              <div
                key={card.id}
                className="course-card bg-white rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Image with Badge */}
                  <div className="card-image relative w-full h-[200px] sm:h-[225px] overflow-hidden bg-slate-100">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 520px"
                    />
                    {/* Orange Badge on Bottom Right */}
                    <div className="absolute bottom-0 right-0 bg-[#DC520A] text-white text-[12px] sm:text-[13px] font-bold px-4 sm:px-5 py-1.5 rounded-tl-[10px] tracking-wider uppercase shadow-xs z-10 select-none">
                      {card.badge}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="card-content p-6 sm:p-7 md:p-8 pb-4">
                    <h3 className="text-[19px] sm:text-[21px] font-bold text-[#111111] leading-snug m-0 mb-3 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="description text-[13px] sm:text-[14px] text-[#444444] font-semibold leading-[1.65] m-0 mb-5">
                      {card.description}
                    </p>

                    {/* Details list */}
                    <div className="details space-y-1.5 mb-2 text-[14px] sm:text-[15px]">
                      {card.details?.map((item, idx) => (
                        <p key={idx} className="m-0 leading-relaxed text-[#333333] font-semibold">
                          <strong className="font-bold text-[#111111]">{item.label}:</strong> {item.value}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="card-actions p-6 sm:p-7 md:p-8 pt-0 grid grid-cols-2 gap-3 sm:gap-4 mt-auto">
                  <button
                    type="button"
                    onClick={() => onSelectCourseForBrochure?.(card.code || card.title)}
                    className="btn outline border-2 border-[#DC520A] hover:bg-[#DC520A]/5 active:scale-95 text-[#111111] font-bold text-[13px] sm:text-[14px] py-2.5 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-transparent"
                  >
                    <span>Get Brochure</span>
                    <Download className="w-3.5 h-3.5 stroke-[2.5] text-[#111111]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(card.code || card.title)}
                    className="btn solid bg-[#DC520A] hover:bg-[#c24608] active:scale-95 text-white font-bold text-[13px] sm:text-[14px] py-2.5 px-3 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm border-none"
                  >
                    <span>Apply now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Specializations Tabs Section (Online DBA / MBA Specialization at GGU) ── */}
      {activeSpecs.length > 0 && (
        <section id="courses" className="w-full py-12 sm:py-16 bg-white border-b border-slate-200/80 scroll-mt-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-[#111111] text-[24px] sm:text-[28px] md:text-[30px] font-bold m-0 leading-tight">
                {activeTab === "dba"
                  ? "Online DBA Specialization at GGU"
                  : "Online MBA Specialization at GGU"}
              </h2>
              <p className="text-[#666666] text-[15px] sm:text-[16px] mt-1.5 m-0 font-normal">
                {activeTab === "dba"
                  ? "(Doctorate of business administration)"
                  : "(Master of business administration)"}
              </p>
            </div>

            {/* Tabs */}
            <div className="course-tabs flex items-center justify-center gap-2 mb-8">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("dba");
                  specCarouselRef.current?.goTo(0);
                }}
                className={`py-2 px-6 rounded-md font-semibold text-[14px] transition-all cursor-pointer border-none ${
                  activeTab === "dba"
                    ? "bg-[#DC520A] text-white shadow-sm"
                    : "bg-[#f2f2f2] text-[#333333] hover:bg-[#e8e8e8]"
                }`}
              >
                DBA Specialization
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("mba");
                  specCarouselRef.current?.goTo(0);
                }}
                className={`py-2 px-6 rounded-md font-semibold text-[14px] transition-all cursor-pointer border-none ${
                  activeTab === "mba"
                    ? "bg-[#DC520A] text-white shadow-sm"
                    : "bg-[#f2f2f2] text-[#333333] hover:bg-[#e8e8e8]"
                }`}
              >
                MBA Specialization
              </button>
            </div>

            {/* Slider / Carousel for Specializations */}
            <div className="relative group/spec px-1 sm:px-4">
              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={handlePrevSpec}
                className="absolute -left-3 sm:-left-4 top-[45%] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-800 hover:text-[#DC520A] hover:bg-slate-50 transition-all cursor-pointer active:scale-95 opacity-80 hover:opacity-100"
                aria-label="Previous specialization"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNextSpec}
                className="absolute -right-3 sm:-right-4 top-[45%] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-800 hover:text-[#DC520A] hover:bg-slate-50 transition-all cursor-pointer active:scale-95 opacity-80 hover:opacity-100"
                aria-label="Next specialization"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="overflow-hidden">
                <Carousel
                  ref={specCarouselRef}
                  slidesToShow={3}
                  slidesToScroll={1}
                  autoplay
                  autoplaySpeed={3500}
                  infinite={activeSpecs.length > 3}
                  dots={false}
                  arrows={false}
                  pauseOnHover
                  draggable
                  responsive={[
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: activeSpecs.length > 2,
                      },
                    },
                    {
                      breakpoint: 640,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: activeSpecs.length > 1,
                      },
                    },
                  ]}
                >
                  {activeSpecs.map((spec, sIdx) => (
                    <div
                      key={`${spec.id}-${sIdx}`}
                      className="px-2.5 outline-none"
                    >
                      <div className="bg-[#F2F2F2] rounded-[12px] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/80 h-full">
                        <div>
                          {/* Image */}
                          <div className="relative w-full h-[185px] sm:h-[195px] bg-slate-100 overflow-hidden">
                            <Image
                              src={spec.image || "/assets/all_universities_images/ggu/marketing-ggu.webp"}
                              alt={spec.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                            />
                          </div>
                          {/* Multicolor Gradient Border */}
                          <div
                            className="h-[3px] w-full"
                            style={{
                              background:
                                "linear-gradient(to right, #d8233a 0%, #ff5238 25%, #ff0077 60%, #e81d76 100%)",
                            }}
                          />
                          {/* Info Box */}
                          <div className="p-4 sm:p-5 bg-[#F2F2F2] flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="text-[16px] sm:text-[16.5px] font-bold text-[#111111] leading-snug m-0 mb-2">
                                {spec.title}
                              </h4>
                              <p className="text-[12px] sm:text-[12.5px] text-[#333333] leading-[1.55] line-clamp-4 m-0 min-h-[64px]">
                                {spec.description}
                              </p>
                            </div>
                            <div className="mt-3.5 pt-3 border-t border-slate-300 flex items-center justify-start">
                              <button
                                type="button"
                                onClick={() => onOpenApply?.(spec.code || spec.title)}
                                className="w-fit bg-[#003468] hover:bg-[#002447] active:scale-95 text-white font-bold text-[12.5px] sm:text-[13px] py-1.5 px-5 rounded-[4px] transition-all cursor-pointer border-none shadow-xs text-left"
                              >
                                Apply Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

