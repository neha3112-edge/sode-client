"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
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
        <div className="header_heading shrink-0 pl-2 flex items-center">
          {isCouponVisible ? (
            <button
              type="button"
              onClick={handleCouponClick}
              aria-label="Get Scholarship Coupon Code"
              style={
                couponBtnBg || brand.couponBtnBg || brand.themeGradient
                  ? {
                      "--coupon-btn-bg": couponBtnBg || brand.couponBtnBg || brand.themeGradient,
                      "--coupon-shadow-start": "rgba(253, 32, 42, 0.55)",
                      "--coupon-shadow-mid1": "rgba(253, 32, 42, 0.42)",
                      "--coupon-shadow-mid2": "rgba(253, 32, 42, 0.22)",
                      "--coupon-shadow-mid3": "rgba(255, 75, 229, 0.28)",
                      "--coupon-shadow-mid4": "rgba(255, 75, 229, 0.16)",
                    }
                  : couponButtonColor
                  ? { backgroundColor: couponButtonColor }
                  : { backgroundColor: "#22c55e" }
              }
              className="coupon-btn-main relative inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-[12px] sm:rounded-[14px] text-white font-bold text-[12px] sm:text-[14px] cursor-pointer border-none overflow-hidden select-none shadow-xs hover:brightness-105 active:scale-95 transition-all"
            >
              {/* Moving Light Green Box for gradient button */}
              {(couponBtnBg || brand.couponBtnBg) && <span className="moving-light-green-box" />}

              {/* White Circular Disc for Gift Icon */}
              <span className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs z-10 p-0.5">
                <Image
                  src={giftGif || "/assets/images/gift.gif"}
                  alt="Scholarship Gift"
                  width={18}
                  height={18}
                  unoptimized
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain"
                />
              </span>

              {/* Scholarship Coupon Code Text */}
              <span className="relative z-10 tracking-tight whitespace-nowrap text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
                {couponButtonText}
              </span>
            </button>
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
