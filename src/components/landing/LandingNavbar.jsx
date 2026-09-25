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
    name = "Sikkim Manipal University Online",
    logo = "/assets/images/smu_logo.png",
    primaryColor = "#0b4d8c",
    showSodeLogo = false,
    showCouponButton = true,
    couponButtonText = "Scholarship Coupon Code",
    couponButtonColor = "#2ecc71",
    badgeText,
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

  const handleCouponClick = () => {
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
          {showSodeLogo && (
            <>
              <Link
                href="#hero"
                onClick={handleScrollTop}
                className="des_logo flex items-center shrink-0 cursor-pointer"
                aria-label="Back to Top"
              >
                <div className="relative w-8 sm:w-10 lg:w-11 h-8 sm:h-10 lg:h-11">
                  <Image
                    src="/assets/images/sode_icon.png"
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

          {/* University Brand Logo */}
          <Link
            href="#hero"
            onClick={handleScrollTop}
            className="mang_logo flex items-center min-w-0 cursor-pointer"
            aria-label={name}
          >
            <div className="relative h-8 sm:h-10 lg:h-12 w-40 sm:w-60 lg:w-72 max-w-[290px] sm:max-w-[340px]">
              <Image
                src={logo}
                alt={name}
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 160px, 300px"
              />
            </div>
          </Link>
        </div>

        {/* Right: Scholarship Coupon Code Button or Badge */}
        <div className="flex items-center shrink-0 pl-2">
          {showCouponButton ? (
            <div className="p-1 sm:p-1.5 rounded-[18px] sm:rounded-[22px] bg-[#e7f9ee] flex items-center justify-center">
              <button
                type="button"
                onClick={handleCouponClick}
                className="coupon-btn-main group inline-flex items-center gap-2 sm:gap-2.5 text-white font-bold text-[12.5px] sm:text-[14px] lg:text-[15px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-[12px] sm:rounded-[14px] shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer select-none shrink-0 border-none"
                style={{
                  backgroundColor: couponButtonColor || "#22c55e",
                }}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
                  <Image
                    src="/assets/images/gift.gif"
                    alt="Gift"
                    width={20}
                    height={20}
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                    unoptimized
                  />
                </div>
                <span className="whitespace-nowrap font-bold tracking-tight text-white">
                  {couponButtonText}
                </span>
              </button>
            </div>
          ) : (
            <span
              className="inline-block text-[12px] sm:text-base md:text-xl lg:text-2xl font-bold tracking-tight text-right select-none"
              style={{ color: primaryColor || "#08417b" }}
            >
              {badgeText || "Admission Open 2026"}
            </span>
          )}
        </div>
      </LandingContainer>
    </header>
  );
}
