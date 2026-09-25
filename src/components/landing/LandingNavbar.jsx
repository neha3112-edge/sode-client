"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
    giftGif = "/assets/images/gift.gif",
    showCouponBtn = false,
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

        {/* Right: Scholarship Coupon Code Button */}
        <div className="header_heading shrink-0 pl-2 flex items-center">
          {onOpenScholarship || showCouponBtn ? (
            <button
              type="button"
              onClick={() => onOpenScholarship?.()}
              className="coupon-btn-main inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white font-bold text-[11px] sm:text-[13.5px] cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 transition-all border-none"
              style={{
                background: "linear-gradient(135deg, #2ecc71, #27ae60)",
                boxShadow: "0 4px 15px rgba(46, 204, 113, 0.35)",
              }}
            >
              <div className="relative w-4 sm:w-5 h-4 sm:h-5 shrink-0">
                <Image
                  src={giftGif}
                  alt="Scholarship Gift"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <span className="truncate">Scholarship Coupon Code</span>
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
