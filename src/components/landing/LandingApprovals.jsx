"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel } from "antd";

/**
 * Reusable Landing Approvals Section
 * Supports:
 * 1. Shoolini Split Layout (dark left box + soft gradient 2x3 grid)
 * 2. VGU 2-Column Badges Layout (left text & Enquire button + right 2x2 pill badges)
 * 3. Modern Interactive Carousel/Slider (SMU, Manipal, etc. with smooth infinite loop & arrows)
 * 4. Classic Banner Grid (Amity, etc.)
 */
export default function LandingApprovals({
  approvals = [],
  universityName,
  brand = {},
  title = "Recognition and Approvals",
  bannerBg,
  showTags = false,
}) {
  if (!approvals || approvals.length === 0) return null;

  const activeUniversity = universityName || brand?.name || "University Online";
  const activeTitle = brand?.approvalsTitle || title;
  const subtitle = brand?.approvalsSubtitle || brand?.approvalsDescription || null;
  const isLiverpoolLayout =
    brand?.approvalsLayout === "liverpool" || brand?.slug === "liverpool";
  const isRushfordLayout =
    !isLiverpoolLayout &&
    (brand?.approvalsLayout === "rushford" || brand?.slug === "rushford");
  const isEsgciLayout = !isLiverpoolLayout && !isRushfordLayout && (brand?.approvalsLayout === "esgci" || brand?.slug === "esgci");
  const isGguLayout = !isLiverpoolLayout && !isRushfordLayout && !isEsgciLayout && (brand?.approvalsLayout === "ggu" || brand?.slug === "ggu");
  const isSplit = !isLiverpoolLayout && !isRushfordLayout && !isEsgciLayout && !isGguLayout && brand?.approvalsLayout === "split";
  const isVguLayout = !isLiverpoolLayout && !isRushfordLayout && !isEsgciLayout && !isGguLayout && (brand?.approvalsLayout === "vgu-badges" || brand?.slug === "vgu");
  const isMuLayout = !isLiverpoolLayout && !isRushfordLayout && !isEsgciLayout && !isGguLayout && (brand?.approvalsLayout === "mu" || brand?.slug === "mu");
  const isCarouselLayout = !isLiverpoolLayout && !isRushfordLayout && !isEsgciLayout && !isGguLayout && (brand?.approvalsLayout === "smu-carousel" || brand?.slug === "smu");
  const isSlider =
    !isLiverpoolLayout &&
    !isRushfordLayout &&
    !isEsgciLayout &&
    !isGguLayout &&
    (brand?.approvalsLayout === "slider" ||
      isCarouselLayout ||
      (!isSplit && !isVguLayout && !isMuLayout && Boolean(subtitle)));

  const primaryColor = brand?.approvalsHeaderColor || brand?.primaryColor || "#ee3024";
  const gridBg = brand?.approvalsBg || "#ffffff";

  // ==========================================
  // Layout 0-Liverpool: Approvals & Recognition (#certification)
  // ==========================================
  if (isLiverpoolLayout) {
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
  if (isRushfordLayout) {
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

  // ==========================================
  // Layout 0-ESGCI: Approvals and Accreditation (#certification)
  // ==========================================
  if (isEsgciLayout) {
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

  // ==========================================
  // Layout 0-GGU: Golden Gate University Accreditations
  // ==========================================
  if (isGguLayout) {
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
            <p className="sub-pp text-center text-[#444444] text-sm sm:text-[15.5px] font-medium mt-1.5 mb-8">
              {sectionSubtitle}
            </p>
          )}

          <div className="b2-info grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
            {approvals.map((item, idx) => (
              <div
                key={idx}
                className="b1 bg-white p-5 sm:p-6 rounded-[8px] border border-slate-100 border-b-[3px] border-b-[#DC520A] shadow-[0_3px_12px_rgba(0,0,0,0.04)] flex flex-col items-center justify-between text-center transition-all hover:-translate-y-1 h-[165px] sm:h-[180px]"
                style={{
                  borderBottomColor: brand?.approvalsBorderColor || "#DC520A",
                }}
              >
                <div className="relative w-full h-18 sm:h-22 flex items-center justify-center my-auto">
                  <Image
                    src={item.image}
                    alt={item.title || item.tag || "Accreditation"}
                    fill
                    className="object-contain"
                    sizes="180px"
                  />
                </div>
                <h3 className="text-[#003468] text-[13.5px] sm:text-[14.5px] font-bold mt-2 mb-0 tracking-tight">
                  {item.title || item.tag}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 0: Mangalayatan University (MU) Approvals
  // ==========================================
  if (isMuLayout) {
    const sectionTitle = brand?.approvalsTitle || `${activeUniversity}`;
    const sectionSubtitle = brand?.approvalsSubtitle || "Approvals & Recognition";

    return (
      <section
        id="approvals"
        className={`w-full text-white select-none ${brand?.approvalsSectionClassName || "py-12 sm:py-16"}`}
        style={{
          backgroundColor: brand?.approvalsBg || brand?.primaryColor || "#193579",
          ...brand?.approvalsSectionStyle,
        }}
      >
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 text-center ${brand?.approvalsContainerClassName || "max-w-[1240px]"}`}>
          <h2
            className={`text-white uppercase m-0 ${
              brand?.approvalsTitleClassName || "font-bold tracking-wide text-[24px] sm:text-[28px] lg:text-[30px]"
            }`}
            style={{
              fontFamily: brand?.approvalsTitleFont || "inherit",
              ...brand?.approvalsTitleStyle,
            }}
          >
            {sectionTitle}
          </h2>
          <h3
            className={`text-white uppercase ${
              brand?.approvalsSubtitleClassName || "font-normal tracking-wider text-[20px] sm:text-[24px] lg:text-[26px] mt-1 mb-8 sm:mb-12"
            }`}
            style={{
              fontFamily: brand?.approvalsSubtitleFont || "inherit",
              ...brand?.approvalsSubtitleStyle,
            }}
          >
            {sectionSubtitle}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 justify-items-center">
            {approvals.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center text-center group w-full ${brand?.approvalsItemClassName || "max-w-[270px]"}`}
                style={brand?.approvalsItemStyle}
              >
                {/* Circular badge container */}
                <div
                  className="rounded-full bg-white flex items-center justify-center mb-3.5 shadow-md group-hover:scale-105 transition-transform duration-300 w-24 h-24 sm:w-[115px] sm:h-[115px] p-1.5"
                  style={brand?.approvalsBadgeStyle}
                >
                  <div
                    className="relative flex items-center justify-center"
                    style={{
                      width: brand?.approvalsImageInnerSize || "90%",
                      height: brand?.approvalsImageInnerSize || "90%",
                      ...brand?.approvalsImageInnerStyle,
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.tag || item.title || "Approval"}
                      fill
                      className="object-contain"
                      sizes="160px"
                    />
                  </div>
                </div>

                <h4
                  className={`text-white ${
                    brand?.approvalsItemTitleClassName || "font-semibold tracking-tight text-[16px] sm:text-[17px] mt-1 mb-1.5"
                  }`}
                  style={brand?.approvalsItemTitleStyle}
                >
                  {item.tag || item.title}
                </h4>
                <p
                  className={`text-white ${
                    brand?.approvalsItemTextClassName || "leading-normal font-normal m-0 text-[12px] sm:text-[12.5px] max-w-[250px]"
                  }`}
                  style={brand?.approvalsItemTextStyle}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 1: Shoolini Split Layout
  // ==========================================
  if (isSplit) {
    return (
      <section id="approval" className="w-full select-none p-0 overflow-hidden bg-[#010d2a]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Dark Box matching #approval-box1 */}
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

          {/* Right Gradient Grid matching #approval-box2 */}
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

  // ==========================================
  // Layout 2: VGU 2-Column Badges Layout
  // ==========================================
  if (isVguLayout) {
    const sectionTitle =
      brand.approvalsTitle ||
      `${brand.name || "Vivekananda Global University"} Online Accreditation & Approval`;
    const sectionDescription =
      brand.approvalsDescription ||
      "Vivekananda Global University Online Courses are UGC-recognised and have top accreditations and approvals from the country's recognised statutory bodies.";

    return (
      <section id="approvals" className="w-full py-10 sm:py-14 bg-white border-b border-slate-200">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Title, Description, Enquire Button */}
            <div className="lg:col-span-4 text-center sm:text-left">
              <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-extrabold text-[#811811] leading-tight tracking-tight m-0">
                {sectionTitle}
              </h2>
              <p className="mt-3.5 mb-6 text-[12.5px] sm:text-[13.5px] text-slate-700 leading-relaxed font-normal">
                {sectionDescription}
              </p>
              <button
                type="button"
                onClick={() => {
                  const heroEl = document.getElementById("hero") || document.getElementById("banner");
                  if (heroEl) heroEl.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#ffc107] hover:bg-[#e0a800] text-slate-950 font-bold text-[13.5px] sm:text-[14px] px-6 py-2.5 rounded-[6px] shadow-xs active:scale-95 transition-all cursor-pointer border-none"
              >
                <span>Enquire Now</span>
              </button>
            </div>

            {/* Right Column: 2x2 Grid of Pill Badge Cards */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {approvals.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 px-4 py-3 bg-white rounded-[32px] border border-slate-700/60 shadow-2xs hover:shadow-xs transition-shadow"
                  >
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.text || "Approval"}
                        fill
                        className="object-contain"
                        sizes="56px"
                      />
                    </div>
                    <p className="text-[12px] sm:text-[12.5px] font-semibold text-slate-800 leading-snug m-0">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 3: Modern Carousel Slider (SMU, Manipal, etc.)
  // ==========================================
  const carouselRef = useRef(null);
  const items = approvals;

  const formatApprovalText = (text) => {
    if (!text) return null;
    const colonIdx = text.indexOf(":");
    if (colonIdx !== -1) {
      const titlePart = text.substring(0, colonIdx);
      const descPart = text.substring(colonIdx + 1);
      return (
        <>
          <span className="font-bold text-slate-900">{titlePart}:</span>
          {descPart}
        </>
      );
    }
    return text;
  };

  if (isSlider) {
    return (
      <section
        id="approvals"
        className="w-full py-10 sm:py-14 border-b border-slate-200/60 overflow-hidden"
        style={{ backgroundColor: gridBg }}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Header Title & Subtitle */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-[#111827] tracking-tight m-0">
              {activeUniversity}{" "}
              <span style={{ color: primaryColor }}>{activeTitle}</span>
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-[14px] text-slate-600 max-w-3xl mx-auto mt-2.5 leading-relaxed font-normal">
                {subtitle}
              </p>
            )}
          </div>

          {/* Carousel Slider */}
          <div className="relative group/carousel px-4 sm:px-8">
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={() => carouselRef.current?.prev()}
              className="absolute left-0 sm:-left-3 top-[35%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#f35a06] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
              aria-label="Previous approval"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
            </button>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={() => carouselRef.current?.next()}
              className="absolute right-0 sm:-right-3 top-[35%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#f35a06] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
              aria-label="Next approval"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
            </button>

            {/* Ant Design Carousel Viewport */}
            <div className="overflow-hidden">
              <Carousel
                ref={carouselRef}
                slidesToShow={4}
                slidesToScroll={1}
                autoplay
                autoplaySpeed={2800}
                infinite={items.length > 4}
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
                      infinite: items.length > 2,
                    },
                  },
                  {
                    breakpoint: 640,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      infinite: items.length > 1,
                    },
                  },
                ]}
              >
                {items.map((item, idx) => (
                  <div key={idx} className="px-2 sm:px-4 py-2 outline-none">
                    <div className="flex flex-col items-center text-center h-full group">
                      <div className="relative w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] md:w-[165px] md:h-[165px] shrink-0 transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={item.image}
                          alt={item.text || "Recognition approval"}
                          fill
                          className="object-contain"
                          sizes="180px"
                        />
                      </div>

                      <div className="mt-3 sm:mt-4 max-w-[240px]">
                        {showTags && item.tag && (
                          <span
                            className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5"
                            style={{
                              backgroundColor: `${primaryColor}15`,
                              color: primaryColor,
                            }}
                          >
                            {item.tag}
                          </span>
                        )}
                        <p className="text-[12px] sm:text-[13px] leading-snug text-slate-800 font-normal m-0 text-center">
                          {formatApprovalText(item.text)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 4: Classic Banner Grid (Amity, etc.)
  // ==========================================
  const activeBannerBg = bannerBg || brand?.approvalsBannerBg || brand?.accentColor || "#ffd200";
  const headerTextColor = brand?.approvalsHeaderColor || brand?.primaryColor || "#08417b";

  return (
    <section id="approvals" className="w-full">
      <div
        className="w-full py-2.5 sm:py-3.5 px-4 text-center select-none shadow-xs"
        style={{ backgroundColor: activeBannerBg }}
      >
        <h3
          className="m-0 text-[14px] sm:text-[17px] md:text-[20px] font-bold tracking-tight leading-tight"
          style={{ color: headerTextColor }}
        >
          {activeUniversity}
        </h3>
        <h2
          className="m-0 mt-0.5 text-[18px] sm:text-[22px] md:text-[26px] font-extrabold tracking-tight leading-tight"
          style={{ color: headerTextColor }}
        >
          {activeTitle}
        </h2>
      </div>

      <div
        className="py-6 sm:py-10 border-b border-slate-200/50"
        style={{ backgroundColor: gridBg }}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 items-center">
            {approvals.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 sm:gap-3.5 bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-lg sm:rounded-none border border-amber-100 sm:border-none shadow-xs sm:shadow-none group"
              >
                <div className="relative w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] lg:w-[88px] lg:h-[88px] shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.text || "Recognition approval"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 64px, 88px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  {showTags && item.tag && (
                    <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded mb-1">
                      {item.tag}
                    </span>
                  )}
                  <p className="text-[12px] sm:text-[13px] leading-snug text-[#333333] font-medium m-0">
                    {item.text}
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
