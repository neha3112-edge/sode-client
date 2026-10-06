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
  onScrollTop,
}) {
  // ─── Destructure brand props (all come from JSON) ───────────────────────────
  const {
    name = "University Online",
    logo = "/assets/amitylp/Amity-online-logo.png",
    sodeIcon = "/assets/images/sode_icon.png",
    primaryColor = "#08417b",
    showSodeLogo,
    showCouponBtn = true,
    showCouponButton = true,
    couponButtonText = "Scholarship Coupon Code",
    couponButtonColor = "#22c55e",
    couponBtnBg = "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
    giftGif = "/assets/images/gift.gif",
    badgeText = "Admission Open 2026",
  } = brand;

  // ─── Derived flags ───────────────────────────────────────────────────────────
  const shouldShowSodeLogo =
    showSodeLogo === true ||
    (showSodeLogo !== false &&
      (brand.sodeIcon ||
        brand.slug === "manipal" ||
        brand.slug === "shoolini"));

  const isCouponVisible = showCouponBtn !== false && showCouponButton !== false;

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleScrollTop = (e) => {
    e.preventDefault();
    onScrollTop?.();
    const heroEl =
      document.getElementById("hero") || document.getElementById("banner");
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

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <header className="navbar sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-[0px_4px_16px_rgba(0,0,0,0.10)]">
      <LandingContainer className="top-navbar h-18 sm:h-20 lg:h-22 flex items-center justify-between px-3 sm:px-6">

        {/* ── LEFT: Logos ───────────────────────────────────────────────────── */}
        <div className="logo flex items-center min-w-0 ml-2 sm:ml-1 lg:ml-3">
          {brand.slug === "uu" ? (
            <>
              {/* Mobile (< md): ONLY Uttaranchal University logo on the left */}
              <Link
                href="#hero"
                onClick={handleScrollTop}
                className="mang_logo flex md:hidden items-center min-w-0 cursor-pointer"
                aria-label={name}
              >
                <div className="relative w-44 sm:w-56 h-11 sm:h-13">
                  <Image
                    src={logo}
                    alt={name}
                    fill
                    priority
                    className="object-contain object-left"
                    sizes="(max-width: 640px) 190px, 280px"
                  />
                </div>
              </Link>

              {/* Desktop / Laptop (md+): SODE Logo at start (left), divider, then UU logo */}
              <div className="hidden md:flex items-center min-w-0">
                <Link
                  href="#hero"
                  onClick={handleScrollTop}
                  className="des_logo flex items-center shrink-0 cursor-pointer"
                  aria-label="Back to Top"
                >
                  <div
                    className="relative"
                    style={{
                      width: "90px",
                      height: "62px",
                      minWidth: "70px",
                      position: "relative",
                      ...brand.sodeLogoContainerStyle,
                    }}
                  >
                    <Image
                      src={sodeIcon || "/assets/images/sode_icon.png"}
                      alt="SODE"
                      fill
                      priority
                      className="object-contain object-left"
                      sizes="100px"
                    />
                  </div>
                </Link>

                {/* Divider between SODE logo and university logo */}
                <div className="h-12 sm:h-14 lg:h-16 w-[1.5px] bg-[#cccccc] mx-1.5 sm:mx-2 lg:mx-3 shrink-0" />

                <Link
                  href="#hero"
                  onClick={handleScrollTop}
                  className="mang_logo flex items-center min-w-0 cursor-pointer"
                  aria-label={name}
                >
                  <div className="relative w-44 sm:w-56 lg:w-68 h-11 sm:h-13 lg:h-15">
                    <Image
                      src={logo}
                      alt={name}
                      fill
                      priority
                      className="object-contain object-left"
                      sizes="(max-width: 640px) 190px, 280px"
                    />
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* SODE Logo — shown when brand.showSodeLogo === true or sodeIcon provided */}
              {shouldShowSodeLogo && (
                <>
                  <Link
                    href="#hero"
                    onClick={handleScrollTop}
                    className="des_logo flex items-center shrink-0 cursor-pointer"
                    aria-label="Back to Top"
                  >
                    <div
                      className="relative"
                      style={{
                        width: "90px",
                        height: "62px",
                        minWidth: "70px",
                        position: "relative",
                        ...brand.sodeLogoContainerStyle,
                      }}
                    >
                      <Image
                        src={sodeIcon || "/assets/images/sode_icon.png"}
                        alt="SODE"
                        fill
                        priority
                        className="object-contain object-left"
                        sizes="100px"
                      />
                    </div>
                  </Link>

                  {/* Divider between SODE logo and university logo */}
                  {!brand.hideNavDivider &&
                    brand.showNavDivider !== false &&
                    !brand.hideMangLogo && (
                      <div className="h-12 sm:h-14 lg:h-16 w-[1.5px] bg-[#cccccc] mx-1.5 sm:mx-2 lg:mx-3 shrink-0" />
                    )}
                </>
              )}

              {/* University Logo — hidden when brand.hideMangLogo === true */}
              {!brand.hideMangLogo && (
                <Link
                  href="#hero"
                  onClick={handleScrollTop}
                  className={`mang_logo flex items-center min-w-0 cursor-pointer ${
                    brand.hideNavDivider ? "ml-2.5 sm:ml-3.5" : ""
                  }`}
                  aria-label={name}
                >
                  <div className="relative w-41 sm:w-53 lg:w-65 h-11 sm:h-13 lg:h-15">
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
              )}
            </>
          )}
        </div>

        {/* ── CENTER/RIGHT: Nav Links — from brand.navLinks array in JSON ──── */}
        {brand.navLinks && brand.navLinks.length > 0 && (
          <nav className="header_menu hidden md:flex items-center ml-auto mr-4 lg:mr-8">
            <ul className="header_menu_list flex list-none gap-6 lg:gap-8 items-center m-0 p-0">
              {brand.navLinks.map((lnk, idx) => (
                <li key={idx} className="m-0 p-0">
                  <a
                    href={lnk.href}
                    className="text-[#002147] hover:text-[#DC520A] text-[15px] lg:text-[16px] font-semibold tracking-wide transition-colors duration-200 py-1"
                  >
                    {lnk.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* ── RIGHT: CTA Button or Badge ────────────────────────────────────── */}
        <div className="header_heading shrink-0 pl-2 mr-1.5 sm:mr-3 flex items-center gap-2">
          {brand.slug === "uu" && (
            <Link
              href="#hero"
              onClick={handleScrollTop}
              className="des_logo flex md:hidden items-center shrink-0 cursor-pointer"
              aria-label="Back to Top"
            >
              <div className="relative w-14 sm:w-18 h-10 sm:h-12">
                <Image
                  src={sodeIcon || "/assets/all_universities_images/uu/sode-icon.png"}
                  alt="SODE"
                  fill
                  priority
                  className="object-contain object-right"
                  sizes="80px"
                />
              </div>
            </Link>
          )}

          {isCouponVisible ? (
            <div
              className={`
                ${brand.slug === "uu" ? "hidden md:inline-flex" : "inline-flex"}
                ${brand.couponWrapperBg || brand.showCouponPillWrapper
                  ? "p-1.5 sm:p-2 rounded-[12px] sm:rounded-[14px] items-center justify-center transition-all"
                  : "items-center"}
              `}
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
                  "--coupon-btn-bg": couponBtnBg || brand.couponBtnBg || "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
                  backgroundColor: couponButtonColor || brand.couponButtonColor || "#22c55e",
                  "--coupon-shadow-start": brand.couponShadowColor || "rgba(46, 204, 113, 0.55)",
                  "--coupon-shadow-mid1": brand.couponShadowColorMid1 || "rgba(46, 204, 113, 0.42)",
                  "--coupon-shadow-mid2": brand.couponShadowColorMid2 || "rgba(46, 204, 113, 0.22)",
                  "--coupon-shadow-mid3": brand.couponShadowColorMid3 || "rgba(74, 222, 128, 0.28)",
                  "--coupon-shadow-mid4": brand.couponShadowColorMid4 || "rgba(74, 222, 128, 0.16)",
                  "--coupon-shadow-end": "rgba(167, 243, 208, 0)",
                }}
                className="coupon-btn-main relative inline-flex items-center gap-2 sm:gap-2.5 pl-5 sm:pl-7 md:pl-8 pr-4.5 sm:pr-6 md:pr-7 py-1 sm:py-1.5 rounded-[8px] text-white font-bold text-[10px] sm:text-[11px] md:text-[11.5px] cursor-pointer border-none overflow-hidden select-none hover:brightness-105 active:scale-95"
              >
                <span className="moving-light-green-box" />
                <span className="relative -ml-1.5 sm:-ml-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs z-10 p-0 overflow-hidden">
                  <Image
                    src={giftGif || brand.giftGif || "/assets/images/gift.gif"}
                    alt="Scholarship Gift"
                    width={26}
                    height={26}
                    unoptimized
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                </span>
                {/* Button text — from brand.couponButtonText in JSON */}
                <span className="relative z-10 tracking-wide md:tracking-wide whitespace-nowrap text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] text-[14px] sm:text-[15px] md:text-[15.5px]">
                  {couponButtonText}
                </span>
              </button>
            </div>

          ) : brand.hideNavbarBadge || !badgeText || brand.showNavbarBadge === false ? null : (
            /* Condition 2: Admission badge — shown when coupon is hidden */
            <span
              className="inline-block text-[12px] sm:text-base md:text-xl lg:text-2xl font-bold tracking-tight text-right select-none"
              style={{ color: primaryColor || "#08417b" }}
            >
              {badgeText}
            </span>
          )}

          {/* Mobile hamburger — only when navLinks are provided */}
          {brand.navLinks && brand.navLinks.length > 0 && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-[6px] bg-[#003366] text-white flex items-center justify-center transition-all focus:outline-none cursor-pointer border-none shadow-xs active:scale-95"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>
      </LandingContainer>

      {/* ── Mobile Dropdown Menu ──────────────────────────────────────────────── */}
      {brand.navLinks && brand.navLinks.length > 0 && mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 shadow-xl">
          <ul className="flex flex-col list-none gap-3.5 m-0 p-0">
            {brand.navLinks.map((lnk, idx) => (
              <li key={idx}>
                <a
                  href={lnk.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 text-[#111111] hover:text-[#c11f28] text-[17px] font-bold tracking-tight no-underline transition-colors"
                >
                  {lnk.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
