"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import { ChevronDown } from "lucide-react";
import LandingContainer from "./LandingContainer";
export default function LandingNavbar({
  brand = {},
  onOpenApply,
  onOpenBrochure,
  onOpenScholarship,
}) {
  const {
    name = "University Online",
    logo = "/assets/amitylp/Amity-online-logo.png",
    sodeIcon = "/assets/images/sode_icon.png",
    primaryColor = "#08417b",
    showSodeLogo,
    showCouponBtn = true,
    showCouponButton = true,
    couponButtonText = "Scholarship Coupon Code",
    couponButtonColor,
    couponBtnBg,
    giftGif = "/assets/images/gift.gif",
    badgeText = "Admission Open 2026",
  } = brand;

  const shouldShowSodeLogo =
    showSodeLogo === true ||
    (showSodeLogo !== false && (brand.sodeIcon || brand.slug === "manipal" || brand.slug === "shoolini"));

  const isCouponVisible = showCouponBtn !== false && showCouponButton !== false;

  const handleScrollTop = (e) => {
    e.preventDefault();
    const heroEl = document.getElementById("hero") || document.getElementById("banner");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCouponClick = (e) => {
    try {
      if (typeof window !== "undefined") {
        const rect = e?.currentTarget?.getBoundingClientRect();
        const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.85;
        const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.1;
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { x, y },
          zIndex: 99999,
          colors: ["#2ecc71", "#27ae60", "#ffd700", "#ff5722", "#ffffff"],
        });
      }
    } catch { }
    if (onOpenScholarship) {
      onOpenScholarship();
    } else if (onOpenApply) {
      onOpenApply();
    }
  };

  const isDesNavbar = brand.navbarVariant === "des" || brand.slug === "galgotias";

  if (isDesNavbar) {
    return (
      <header className="navbar sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <LandingContainer className="top-navbar h-16 sm:h-20 flex items-center justify-between px-3 sm:px-6 max-w-[1360px]">
          {/* Left: DistanceEducationSchool.com official Logo (Enlarged) */}
          <div className="flex items-center min-w-0 py-1">
            <Link
              href="#hero"
              onClick={handleScrollTop}
              className="flex items-center cursor-pointer"
              aria-label="Distance Education School"
            >
              <div className="relative w-56 sm:w-72 lg:w-80 h-11 sm:h-14 lg:h-15">
                <Image
                  src={brand.sodeLogo || "/assets/images/new-des-logo.webp"}
                  alt="Distance Education School"
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="(max-width: 640px) 240px, 340px"
                />
              </div>
            </Link>
          </div>

          {/* Right: Courses, Universities, Compare Button */}
          <div className="flex items-center gap-6 sm:gap-9 font-poppins">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("program") || document.getElementById("courses");
                if (el) el.scrollIntoView({ behavior: "smooth" });
                else onOpenBrochure?.();
              }}
              className="hidden md:inline-flex items-center gap-1.5 text-black hover:text-[#0055b8] font-semibold text-[15.5px] cursor-pointer bg-transparent border-none transition-colors select-none font-poppins"
            >
              <span>Courses</span>
              <ChevronDown className="w-4 h-4 text-black stroke-[3]" />
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("compare");
                if (el) el.scrollIntoView({ behavior: "smooth" });
                else onOpenApply?.();
              }}
              className="hidden md:inline-flex items-center gap-1.5 text-black hover:text-[#0055b8] font-semibold text-[15.5px] cursor-pointer bg-transparent border-none transition-colors select-none font-poppins"
            >
              <span>Universities</span>
              <ChevronDown className="w-4 h-4 text-black stroke-[3]" />
            </button>

            <button
              type="button"
              onClick={() => onOpenApply?.()}
              className="bg-[#00882e] hover:bg-[#007026] text-white font-bold text-sm sm:text-[15px] px-5 sm:px-7 py-2 sm:py-2.5 rounded-[6px] shadow-sm cursor-pointer border-none transition-all active:scale-98"
            >
              Compare
            </button>
          </div>
        </LandingContainer>
      </header>
    );
  }

  return (
    <header className="navbar sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-[0px_2px_10px_rgba(0,0,0,0.06)]">
      <LandingContainer className="top-navbar h-14 sm:h-16 lg:h-18 flex items-center justify-between px-3 sm:px-6">
        {/* Left: University Logo / Brand */}
        <div className="logo flex items-center min-w-0">
          {shouldShowSodeLogo && (
            <>
              <Link
                href="#hero"
                onClick={handleScrollTop}
                className="des_logo flex items-center shrink-0 cursor-pointer"
                aria-label="Back to Top"
              >
                <div className="relative w-8 sm:w-10 lg:w-11 h-8 sm:h-10 lg:h-11">
                  <Image
                    src={sodeIcon || "/assets/images/sode_icon.png"}
                    alt="SODE"
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 640px) 32px, 44px"
                  />
                </div>
              </Link>
              {/* Thin Vertical Divider */}
              <div className="h-6 sm:h-8 lg:h-10 w-[1px] bg-[#d1d5db] mx-2 sm:mx-3 lg:mx-4 shrink-0" />
            </>
          )}

          {/* University Online Logo */}
          <Link
            href="#hero"
            onClick={handleScrollTop}
            className="mang_logo flex items-center min-w-0 cursor-pointer"
            aria-label={name}
          >
            <div className="relative w-32 sm:w-44 lg:w-56 h-8 sm:h-10 lg:h-11">
              <Image
                src={logo}
                alt={name}
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 140px, 240px"
              />
            </div>
          </Link>
        </div>

        {/* Right: Scholarship Coupon Code Button or Admission Badge */}
        <div className="header_heading shrink-0 pl-2 mr-1.5 sm:mr-3  flex items-center">
          {isCouponVisible ? (
            <div
              className={
                brand.couponWrapperBg || brand.showCouponPillWrapper
                  ? "p-1.5 sm:p-2 rounded-[12px] sm:rounded-[14px] inline-flex items-center justify-center transition-all"
                  : "inline-flex items-center"
              }
              style={
                brand.couponWrapperBg
                  ? { backgroundColor: brand.couponWrapperBg }
                  : brand.showCouponPillWrapper
                    ? { backgroundColor: "#dcfce7" }
                    : {}
              }
            >
              <button
                type="button"
                onClick={handleCouponClick}
                aria-label="Get Scholarship Coupon Code"
                style={{
                  ...(couponBtnBg || brand.couponBtnBg || brand.themeGradient
                    ? { "--coupon-btn-bg": couponBtnBg || brand.couponBtnBg || brand.themeGradient }
                    : couponButtonColor
                      ? { backgroundColor: couponButtonColor }
                      : { backgroundColor: "#22c55e" }),
                  "--coupon-shadow-start": brand.couponShadowColor || "rgba(46, 204, 113, 0.65)",
                  "--coupon-shadow-mid1": brand.couponShadowColorMid1 || "rgba(46, 204, 113, 0.42)",
                  "--coupon-shadow-mid2": brand.couponShadowColorMid2 || "rgba(46, 204, 113, 0.22)",
                  "--coupon-shadow-mid3": brand.couponShadowColorMid3 || "rgba(46, 204, 113, 0.08)",
                  "--coupon-shadow-end": "rgba(46, 204, 113, 0)",
                }}
                className="coupon-btn-main relative inline-flex items-center gap-2 sm:gap-2.5 pl-5 sm:pl-7 md:pl-8 pr-4.5 sm:pr-6 md:pr-7 py-1 sm:py-1.5 rounded-[8px] text-white font-bold text-[10px] sm:text-[11px] md:text-[11.5px] cursor-pointer border-none overflow-hidden select-none hover:brightness-105 active:scale-95"
              >
                {/* Moving Light Green Box for gradient button */}
                <span className="moving-light-green-box" />

                {/* White Circular Disc for Gift Icon */}
                <span className="relative -ml-1.5 sm:-ml-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs z-10 p-0 overflow-hidden">
                  <Image
                    src={giftGif || "/assets/images/gift.gif"}
                    alt="Scholarship Gift"
                    width={26}
                    height={26}
                    unoptimized
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                </span>

                {/* Scholarship Coupon Code Text */}
                <span className="relative z-10 tracking-wide md:tracking-wide whitespace-nowrap text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] text-[14px] sm:text-[15px] md:text-[15.5px]">
                  {couponButtonText}
                </span>
              </button>
            </div>
          ) : (
            <span
              className="inline-block text-[12px] sm:text-base md:text-xl lg:text-2xl font-bold tracking-tight text-right select-none"
              style={{ color: primaryColor || "#08417b" }}
            >
              {badgeText}
            </span>
          )}
        </div>
      </LandingContainer>
    </header>
  );
}
