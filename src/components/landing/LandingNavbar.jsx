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
    name = "Manipal University Online",
    logo = "/assets/amitylp/Amity-online-logo.png",
    sodeIcon = "/assets/images/sode_icon.png",
    primaryColor = "#08417b",
    badgeText = "Admission Open 2026",
    giftGif = "/assets/manipal_v1_images/gift.gif",
    showCouponBtn = true,
  } = brand;

  const handleScrollTop = (e) => {
    e.preventDefault();
    const heroEl = document.getElementById("hero");
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
    onOpenScholarship?.();
  };

  return (
    <header className="navbar sticky top-0 z-50 bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
      <LandingContainer className="top-navbar h-14 sm:h-16 lg:h-18 flex items-center justify-between px-3 sm:px-6">
        {/* Left: SODE Icon + Divider + University Logo */}
        <div className="logo flex items-center min-w-0">
          <Link
            href="#hero"
            onClick={handleScrollTop}
            className="des_logo flex items-center shrink-0 cursor-pointer"
            aria-label="Back to Top"
          >
            <div className="relative w-8 sm:w-10 lg:w-11 h-8 sm:h-10 lg:h-11">
              <Image
                src={sodeIcon}
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

          {/* University Online Logo */}
          <Link href="#hero" className="mang_logo flex items-center min-w-0" aria-label={name}>
            <div className="relative w-28 sm:w-36 lg:w-48 h-7 sm:h-9 lg:h-11">
              <Image
                src={logo}
                alt={name}
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 112px, 192px"
              />
            </div>
          </Link>
        </div>

        {/* Right: Scholarship Coupon Code Button (Moved slightly left with margin-right) */}
        <div className="header_heading shrink-0 pl-2 mr-6 sm:mr-10 lg:mr-14 flex items-center">
          {onOpenScholarship || showCouponBtn ? (
            <button
              type="button"
              onClick={handleCouponClick}
              aria-label="Get Scholarship Coupon Code"
              className="coupon-btn-main relative inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-7 py-1 sm:py-1.5 rounded-[8px] text-white font-bold text-[11px] sm:text-[13px] cursor-pointer border-none overflow-hidden select-none"
            >
              {/* Moving Light Green Box from left to right using transform */}
              <span className="moving-light-green-box" />

              {/* White Circular Disc for Gift Icon */}
              <span className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs z-10 p-0.5">
                <Image
                  src={giftGif || "/assets/manipal_v1_images/gift.gif"}
                  alt="Scholarship Gift"
                  width={18}
                  height={18}
                  unoptimized
                  className="object-contain"
                />
              </span>

              {/* Scholarship Coupon Code Text */}
              <span className="relative z-10 tracking-tight whitespace-nowrap text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
                Scholarship Coupon Code
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

