"use client";

import React, { useState, useEffect } from "react";
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
  onScrollTop,
}) {
  const {
    name = "University Online",
    logo = brand.logo || (brand.slug === "amity" ? "/assets/amitylp/Amity-online-logo.png" : null),
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

  const shouldHideUniversityLogo =
    brand.hideMangLogo === true ||
    brand.hideUniversityLogo === true ||
    !logo;

  const shouldShowUniversityLogo = !shouldHideUniversityLogo;

  const shouldShowSodeLogo =
    showSodeLogo === true ||
    (showSodeLogo !== false && (brand.sodeIcon || brand.slug === "manipal" || brand.slug === "shoolini"));

  const isCouponVisible = showCouponBtn !== false && showCouponButton !== false;

  const handleScrollTop = (e) => {
    e?.preventDefault();
    if (onScrollTop) onScrollTop();
    const heroEl = document.getElementById("hero") || document.getElementById("banner");
    if (heroEl) heroEl.scrollIntoView({ behavior: "smooth" });
    else if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
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
    if (onOpenScholarship) onOpenScholarship();
    else if (onOpenApply) onOpenApply();
  };

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);


  const isDesNavbar = brand.navbarVariant === "des" || brand.slug === "galgotias";

  if (isDesNavbar) {
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <LandingContainer className="h-16 sm:h-20 flex items-center justify-between px-3 sm:px-6 max-w-[1360px]">
          {/* Left: DistanceEducationSchool.com official Logo */}
          <div className="flex items-center min-w-0 py-1">
            <Link href="#hero" onClick={handleScrollTop} className="flex items-center cursor-pointer" aria-label="Distance Education School">
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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-[0px_2px_10px_rgba(0,0,0,0.06)]">
      <LandingContainer className="h-16 sm:h-20 lg:h-22 flex items-center justify-between px-3 sm:px-6">
        {/* Left: University Logo / Brand */}
        <div className="flex items-center min-w-0">
          {shouldShowSodeLogo && (
            <Link href="#hero" onClick={handleScrollTop} className="flex items-center shrink-0 cursor-pointer" aria-label="Back to Top">
              <div
                className={`relative ${
                  shouldShowUniversityLogo
                    ? "w-9 sm:w-11 lg:w-20 h-9 sm:h-11 lg:h-12"
                    : "w-36 sm:w-44 lg:w-52 h-9 sm:h-12 lg:h-14"
                }`}
                style={!shouldShowUniversityLogo && brand.sodeLogoContainerStyle ? brand.sodeLogoContainerStyle : undefined}
              >
                <Image
                  src={sodeIcon || "/assets/images/sode_icon.png"}
                  alt="SODE"
                  fill
                  priority
                  className="object-contain object-left"
                  sizes={shouldShowUniversityLogo ? "(max-width: 640px) 36px, 48px" : "(max-width: 640px) 160px, 220px"}
                />
              </div>
            </Link>
          )}

          {shouldShowSodeLogo && shouldShowUniversityLogo && !brand.hideNavDivider && brand.showNavDivider !== false && (
            <div className="h-7 sm:h-9 lg:h-11 w-[1px] bg-[#d1d5db] mx-2 sm:mx-3 lg:mx-4 shrink-0" />
          )}

          {shouldShowUniversityLogo && logo && (
            <Link href="#hero" onClick={handleScrollTop} className="flex items-center min-w-0 cursor-pointer" aria-label={name}>
              <div
                className={`relative ${brand.logoWrapperClassName || "w-36 sm:w-48 lg:w-60 h-9 sm:h-11 lg:h-12"}`}
                style={brand.logoWrapperStyle}
              >
                <Image
                  src={logo}
                  alt={name}
                  fill
                  priority
                  className={`object-contain object-left ${brand.logoClassName || ""}`}
                  sizes="(max-width: 640px) 180px, 320px"
                  style={brand.logoStyle}
                />
              </div>
            </Link>
          )}
        </div>

        {/* Right: Navigation Links + Scholarship Coupon Code Button or Admission Badge */}
        <div className="shrink-0 pl-2 mr-1.5 sm:mr-3 flex items-center gap-4 sm:gap-6 lg:gap-8">
          {brand.navLinks && brand.navLinks.length > 0 && (
            <ul className="hidden md:flex items-center gap-5 lg:gap-8 header_menu_list list-none m-0 p-0">
              {brand.navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href?.startsWith("#")) {
                        e.preventDefault();
                        const target = document.getElementById(link.href.slice(1));
                        if (target) {
                          const navHeight = 70;
                          const targetY = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                          window.scrollTo({ top: targetY, behavior: "smooth" });
                        }
                      }
                    }}
                    className="text-[#111111] hover:text-[#0055b8] font-semibold text-[14px] lg:text-[15.5px] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

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
          ) : !brand.hideNavbarBadge && badgeText ? (
            <span
              className="inline-block text-[12px] sm:text-base md:text-xl lg:text-2xl font-bold tracking-tight text-right select-none"
              style={{ color: primaryColor || "#08417b" }}
            >
              {badgeText}
            </span>
          ) : null}

          {/* Mobile Menu Toggle button when navLinks exist */}
          {brand.navLinks && brand.navLinks.length > 0 && (
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileNavOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>
      </LandingContainer>

      {/* Mobile Menu Dropdown */}
      {brand.navLinks && brand.navLinks.length > 0 && isMobileNavOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 shadow-md">
          <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
            {brand.navLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    setIsMobileNavOpen(false);
                    if (link.href?.startsWith("#")) {
                      e.preventDefault();
                      const target = document.getElementById(link.href.slice(1));
                      if (target) {
                        const navHeight = 70;
                        const targetY = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                        window.scrollTo({ top: targetY, behavior: "smooth" });
                      }
                    }
                  }}
                  className="block py-1.5 text-[15px] font-semibold text-slate-800 hover:text-[#0055b8]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

/* =========================================================
   SUB-NAVIGATION STICKY SECTION TABS (SCROLLSPY)
========================================================= */
const NAV_TABS = [
  { id: "about", label: "About", targets: ["about"] },
  { id: "program", label: "Courses", targets: ["program", "courses", "programmes"] },
  { id: "emi", label: "EMI", targets: ["emi", "scholarship"] },
  { id: "whyChoose", label: "Benefits", targets: ["whyChoose", "advantage", "pedagogy", "benefits"] },
  { id: "exam", label: "Exam", targets: ["exam", "evaluation"] },
  { id: "approvals", label: "Approvals", targets: ["approvals", "recognition"] },
  { id: "recruiters", label: "Placement", targets: ["recruiters", "placement", "partners"] },
  { id: "Degreeinfo", label: "Degree", targets: ["Degreeinfo", "degree"] },
  { id: "admission", label: "Admission", targets: ["admission", "admissionProcess", "enrollment"] },
  { id: "compare", label: "Alternative", targets: ["compare", "compareBanner"] },
  { id: "faqs", label: "FAQ's", targets: ["faqs", "faq"] },
];

const findEl = (targets) => targets.map((id) => document.getElementById(id)).find(Boolean);

export function LandingSubNav({ brand = {} }) {
  const [activeTab, setActiveTab] = useState("about");
  const subNav = brand.subNav || {};

  const scrollToSection = (tab) => {
    setActiveTab(tab.id);
    const el = findEl(tab.targets);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 90,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = NAV_TABS.length - 1; i >= 0; i--) {
        const el = findEl(NAV_TABS[i].targets);
        if (el && scrollPos >= el.offsetTop) {
          setActiveTab(NAV_TABS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = subNav.background || brand.primaryColor || "#005bb8";
  const activeColor = subNav.activeColor || brand.accentColor || "#ffd200";

  return (
    <nav
      className={`sticky top-16 sm:top-20 lg:top-22 z-40 text-white shadow-md select-none border-t border-blue-400/20 font-poppins ${subNav.className || ""
        }`}
      style={{ backgroundColor: navBg, ...subNav.style }}
    >
      <div className={`max-w-[1600px] mx-auto px-2 sm:px-6 ${subNav.containerClassName || ""}`}>
        <div
          className={`flex items-center justify-start lg:justify-center overflow-x-auto no-scrollbar space-x-3 sm:space-x-6 md:space-x-8 lg:space-x-10 text-[14px] sm:text-[15px] md:text-[15.5px] h-14 sm:h-20 font-poppins ${subNav.innerClassName || ""
            }`}
        >
          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollToSection(tab)}
              className={`h-full flex items-center px-1.5 sm:px-2 whitespace-nowrap transition-colors font-medium border-b-[3px] cursor-pointer bg-transparent border-t-0 border-x-0 ${activeTab === tab.id
                ? "font-bold"
                : "text-white/90 border-transparent hover:opacity-100 hover:text-white"
                } ${subNav.tabClassName || ""}`}
              style={
                activeTab === tab.id
                  ? { color: activeColor, borderColor: activeColor }
                  : {}
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

