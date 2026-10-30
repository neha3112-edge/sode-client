"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import { ChevronDown } from "lucide-react";
import { Button } from "antd";
import LandingContainer from "./LandingContainer";

/* =========================================================
   DEFAULT NAVBAR CONFIGURATION
   ---------------------------------------------------------
   Structure/positioning stays reusable for every university.
   University-specific content/assets come from brand JSON.
========================================================= */

const DEFAULT_NAVBAR = {
  name: "University Online",

  sodeIcon: "/assets/images/sode_icon.png",
  sodeLogo: "/assets/images/new-des-logo.webp",
  giftGif: "/assets/images/gift.gif",

  primaryColor: "#08417b",

  showCouponBtn: true,
  showCouponButton: true,

  couponButtonText: "Scholarship Coupon Code",
  couponButtonColor: undefined,
  couponBtnBg: undefined,

  badgeText: "Admission Open 2026",
};

/* =========================================================
   MAIN NAVBAR
========================================================= */

export default function LandingNavbar({
  brand = {},
  onOpenApply,
  onOpenBrochure,
  onOpenScholarship,
  onScrollTop,
}) {
  const navbar = {
    ...DEFAULT_NAVBAR,
    ...brand,
  };

  const {
    slug,
    name,
    logo,
    sodeIcon,
    primaryColor,
    showSodeLogo,
    showCouponBtn,
    showCouponButton,
    couponButtonText,
    couponButtonColor,
    couponBtnBg,
    giftGif,
    badgeText,
  } = navbar;

  /* =======================================================
     LOGO VISIBILITY
  ======================================================= */

  const shouldShowUniversityLogo =
    navbar.hideMangLogo !== true &&
    navbar.hideUniversityLogo !== true &&
    Boolean(logo);

  const activeSodeIcon =
    sodeIcon ||
    navbar.sodeIcon ||
    brand.sodeIcon ||
    "/assets/images/sode_icon.png";

  const shouldShowSodeLogo =
    showSodeLogo !== false &&
    navbar.hideSodeLogo !== true &&
    Boolean(activeSodeIcon);

  const shouldShowSodeLogoOnLeftOnMobile =
    !shouldShowUniversityLogo ||
    navbar.sodeOnLeftMobile === true;

  const isCouponVisible =
    showCouponBtn !== false &&
    showCouponButton !== false;

  const isDesNavbar =
    navbar.navbarVariant === "des" ||
    slug === "galgotias";

  /* =======================================================
     SCROLL TO HERO
  ======================================================= */

  const handleScrollTop = (e) => {
    e?.preventDefault();

    onScrollTop?.();

    const heroEl =
      document.getElementById("hero") ||
      document.getElementById("banner");

    if (heroEl) {
      heroEl.scrollIntoView({
        behavior: "smooth",
      });
    } else if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  /* =======================================================
     COUPON CLICK
  ======================================================= */

  const handleCouponClick = (e) => {
    try {
      if (typeof window !== "undefined") {
        const rect =
          e?.currentTarget?.getBoundingClientRect();

        const x = rect
          ? (rect.left + rect.width / 2) / window.innerWidth
          : 0.85;

        const y = rect
          ? (rect.top + rect.height / 2) / window.innerHeight
          : 0.1;

        confetti({
          particleCount: 45,
          spread: 55,
          origin: { x, y },
          zIndex: 99999,
          colors: [
            "#2ecc71",
            "#27ae60",
            "#ffd700",
            "#ff5722",
            "#ffffff",
          ],
        });
      }
    } catch {
      // Prevent confetti errors from affecting CTA behavior.
    }

    if (onOpenScholarship) {
      onOpenScholarship();
    } else {
      onOpenApply?.();
    }
  };

  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const [isMobileNavOpen, setIsMobileNavOpen] =
    useState(false);

  /* =======================================================
     NAVIGATION SCROLL HANDLER
  ======================================================= */

  const handleNavLinkClick = (e, link) => {
    if (!link.href?.startsWith("#")) {
      return;
    }

    e.preventDefault();

    const targetId = link.href.slice(1);
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    const navHeight = 70;

    const targetY =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      navHeight;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  /* =======================================================
     DES NAVBAR
  ======================================================= */

  if (isDesNavbar) {
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <LandingContainer className="h-16 sm:h-20 flex items-center justify-between px-3 sm:px-6 max-w-[1360px] min-[1600px]:max-w-[1520px] min-[1920px]:max-w-[1680px]">

          {/* DES Logo */}
          <div className="flex items-center min-w-0 py-1">
            <Link
              href="#hero"
              onClick={handleScrollTop}
              className="flex items-center cursor-pointer"
              aria-label="Distance Education School"
            >
              <div className="relative w-56 sm:w-72 lg:w-80 h-11 sm:h-14 lg:h-15">
                <Image
                  src={
                    navbar.sodeLogo ||
                    "/assets/images/new-des-logo.webp"
                  }
                  alt="Distance Education School"
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="(max-width: 540px) 240px, 340px"
                />
              </div>
            </Link>
          </div>

          {/* DES Navigation */}
          <div className="flex items-center gap-6 sm:gap-9 font-poppins">

            <button
              type="button"
              onClick={() => {
                const el =
                  document.getElementById("program") ||
                  document.getElementById("courses");

                if (el) {
                  el.scrollIntoView({
                    behavior: "smooth",
                  });
                } else {
                  onOpenBrochure?.();
                }
              }}
              className="hidden md:inline-flex items-center gap-1.5 text-black hover:text-[#0055b8] font-semibold text-[15.5px] cursor-pointer bg-transparent border-none transition-colors select-none font-poppins"
            >
              <span>Courses</span>
              <ChevronDown className="w-4 h-4 text-black stroke-[3]" />
            </button>

            <button
              type="button"
              onClick={() => {
                const el =
                  document.getElementById("compare");

                if (el) {
                  el.scrollIntoView({
                    behavior: "smooth",
                  });
                } else {
                  onOpenApply?.();
                }
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

  /* =======================================================
     STANDARD UNIVERSITY NAVBAR
     
     IMPORTANT:
     Logo structure/position is fixed here.
     JSON only supplies which logo/content to show.
  ======================================================= */

  return (
    <>
      {(navbar.topbarText || brand.topbarText) && (
        <div className="topbar">
          <p className="m-0">{navbar.topbarText || brand.topbarText}</p>
        </div>
      )}
      <header className={`sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-[0px_2px_10px_rgba(0,0,0,0.06)] ${navbar.headerClassName || brand.headerClassName || ""}`.trim()}>

        <LandingContainer
          className={`
          h-[80px]
          sm:h-20
          lg:h-22
          flex
          items-center
          justify-between
          px-0
          sm:px-11
          ${navbar.headerContainerClassName || brand.headerContainerClassName || ""}
        `}
        >

          {/* =================================================
            LEFT: SODE + UNIVERSITY LOGO
            Positioning remains reusable/fixed.
        ================================================= */}

          <div className="flex items-center min-w-0 shrink-0 ml-0 lg:-ml-6">

            {/* SODE ICON */}
            {shouldShowSodeLogo && (
              <Link
                href="#hero"
                onClick={handleScrollTop}
                className={`
                items-center shrink-0 cursor-pointer
                ${shouldShowSodeLogoOnLeftOnMobile
                    ? "flex"
                    : "hidden md:flex"
                  }
              `}
                aria-label="Distance Education School"
              >
                <div
                  className={`
                  relative
                  shrink-0
                  ${shouldShowSodeLogoOnLeftOnMobile
                      ? "w-11 sm:w-13 lg:w-[73px] h-11 sm:h-12 lg:h-[55px]"
                      : "w-10 sm:w-12 md:w-14 lg:w-[73px] h-10 sm:h-12 md:h-13 lg:h-[55px]"
                    }
                `}
                >
                  <Image
                    src={
                      activeSodeIcon
                    }
                    alt="SODE"
                    fill
                    priority
                    className="object-contain object-left"
                    sizes="(max-width: 640px) 48px, 100px"
                  />
                </div>
              </Link>
            )}

            {/* DIVIDER on DESKTOP */}
            {shouldShowSodeLogo &&
              shouldShowUniversityLogo &&
              !navbar.hideNavDivider &&
              navbar.showNavDivider !== false && (
                <div
                  className="
                  hidden md:block
                  h-7
                  sm:h-9
                  md:h-10
                  lg:h-[50px]
                  w-px
                  bg-[#d1d5db]
                  mx-2
                  sm:mx-3
                  lg:mx-3.5
                  shrink-0
                "
                />
              )}

            {/* UNIVERSITY LOGO */}
            {shouldShowUniversityLogo && (
              <Link
                href="#hero"
                onClick={handleScrollTop}
                className="flex items-center min-w-0 shrink-0 cursor-pointer"
                aria-label={name}
              >
                <div
                  className={`
                  relative
                  shrink-0
                  ${navbar.logoWrapperClassName ||
                    brand.logoWrapperClassName ||
                    "w-48 sm:w-56 md:w-64 lg:w-[270px] h-12 sm:h-13 md:h-14 lg:h-[58px]"
                    }
                `}
                  style={navbar.logoWrapperStyle}
                >
                  <Image
                    src={logo}
                    alt={name}
                    fill
                    priority
                    className={`
                    object-contain
                    object-left
                    ${navbar.logoClassName || ""}
                  `}
                    sizes="(max-width: 640px) 210px, 320px"
                    style={navbar.logoStyle}
                  />
                </div>
              </Link>
            )}

          </div>

          {/* =================================================
            RIGHT: NAVIGATION + CTA
        ================================================= */}

          <div className="shrink-0 pl-2 mr-1.5 sm:mr-3 flex items-center gap-4 sm:gap-6 lg:gap-8">

            {/* NAV LINKS */}
            {navbar.navLinks?.length > 0 && !navbar.hideDesktopNavLinks && !brand.hideDesktopNavLinks && (
              <ul className="hidden md:flex items-center gap-6 lg:gap-[52px] header_menu_list list-none m-0 p-0">

                {navbar.navLinks.map((link, idx) => (
                  <li key={`${link.label}-${idx}`}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavLinkClick(e, link)}
                      className="
    text-[#0b2340]
    hover:text-[#0055b8]
    font-medium
    text-[16px]
    lg:text-[17px]
    leading-normal
    transition-colors
    whitespace-nowrap
  "
                    >
                      {link.label}
                    </a>
                  </li>
                ))}

              </ul>
            )}

            {/* MOBILE SODE LOGO (Global across all landing pages) */}
            {shouldShowSodeLogo && !shouldShowSodeLogoOnLeftOnMobile && (
              <Link
                href="#hero"
                onClick={handleScrollTop}
                className="des_logo flex md:hidden items-center shrink-0 cursor-pointer"
                aria-label="Distance Education School"
              >
                <div className="relative w-16 sm:w-16 h-12 sm:h-12">
                  <Image
                    src={activeSodeIcon}
                    alt="SODE"
                    fill
                    priority
                    className="object-contain object-right"
                    sizes="100px"
                  />
                </div>
              </Link>
            )}

            {/* SCHOLARSHIP COUPON / BADGE (Desktop only) */}
            {isCouponVisible ? (
              <div
                className={`
                hidden md:inline-flex
                ${navbar.couponWrapperBg ||
                    navbar.showCouponPillWrapper
                    ? "p-1.5 sm:p-2 rounded-[12px] sm:rounded-[14px] items-center justify-center transition-all"
                    : "items-center"
                  }
              `}
                style={
                  navbar.couponWrapperBg
                    ? {
                      backgroundColor:
                        navbar.couponWrapperBg,
                    }
                    : navbar.showCouponPillWrapper
                      ? {
                        backgroundColor:
                          "#dcfce7",
                      }
                      : {}
                }
              >
                <Button
                  type="text"
                  onClick={handleCouponClick}
                  aria-label="Get Scholarship Coupon Code"
                  style={{
                    ...(couponBtnBg ||
                      navbar.couponBtnBg ||
                      navbar.themeGradient
                      ? {
                        "--coupon-btn-bg":
                          couponBtnBg ||
                          navbar.couponBtnBg ||
                          navbar.themeGradient,
                      }
                      : couponButtonColor
                        ? {
                          backgroundColor:
                            couponButtonColor,
                        }
                        : {
                          backgroundColor:
                            "#22c55e",
                        }),

                    "--coupon-shadow-start":
                      navbar.couponShadowColor ||
                      "rgba(46, 204, 113, 0.65)",

                    "--coupon-shadow-mid1":
                      navbar.couponShadowColorMid1 ||
                      "rgba(46, 204, 113, 0.42)",

                    "--coupon-shadow-mid2":
                      navbar.couponShadowColorMid2 ||
                      "rgba(46, 204, 113, 0.22)",

                    "--coupon-shadow-mid3":
                      navbar.couponShadowColorMid3 ||
                      "rgba(46, 204, 113, 0.08)",

                    "--coupon-shadow-end":
                      "rgba(46, 204, 113, 0)",
                  }}
                  className="
                  coupon-btn-main
                  relative
                  inline-flex
                  items-center
                  gap-2
                  sm:gap-2.5
                  pl-5
                  sm:pl-7
                  md:pl-8
                  pr-4.5
                  sm:pr-6
                  md:pr-7
                  py-1
                  sm:py-1.5
                  rounded-[8px]
                  !text-white
                  font-bold
                  text-[10px]
                  sm:text-[11px]
                  md:text-[11.5px]
                  cursor-pointer
                  !border-none
                  overflow-hidden
                  select-none
                  hover:!brightness-105
                  active:scale-95
                  !h-auto
                "
                >

                  {/* Moving Light Green Box */}
                  <span className="moving-light-green-box" />

                  {/* Gift Icon */}
                  <span
                    className="
                    relative
                    -ml-1.5
                    sm:-ml-2.5
                    w-6
                    h-6
                    sm:w-7
                    sm:h-7
                    rounded-full
                    bg-white
                    flex
                    items-center
                    justify-center
                    shrink-0
                    shadow-xs
                    z-10
                    p-0
                    overflow-hidden
                  "
                  >
                    <Image
                      src={
                        giftGif ||
                        "/assets/images/gift.gif"
                      }
                      alt="Scholarship Gift"
                      width={26}
                      height={26}
                      unoptimized
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                  </span>

                  {/* Coupon Text */}
                  <span
                    className="
                    relative
                    z-10
                    tracking-wide
                    whitespace-nowrap
                    text-white
                    font-bold
                    drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]
                    text-[14px]
                    sm:text-[15px]
                    md:text-[15.5px]
                  "
                  >
                    {couponButtonText}
                  </span>

                </Button>
              </div>
            ) : (
              !navbar.hideNavbarBadge &&
              badgeText && (
                <span
                  className="
                  hidden md:inline-block
                  text-[12px]
                  sm:text-base
                  md:text-xl
                  lg:text-2xl
                  font-bold
                  tracking-tight
                  text-right
                  select-none
                "
                  style={{
                    color:
                      primaryColor ||
                      "#08417b",
                  }}
                >
                  {badgeText}
                </span>
              )
            )}

            {/* MOBILE MENU */}
            {navbar.navLinks?.length > 0 && (
              <button
                type="button"
                className={`
                md:hidden
                p-2
                rounded-lg
                transition-colors
                ${navbar.mobileMenuBtnBg || navbar.slug === "iiitb"
                    ? "text-white"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }
              `}
                style={
                  navbar.mobileMenuBtnBg || navbar.slug === "iiitb"
                    ? {
                      backgroundColor:
                        navbar.mobileMenuBtnBg || primaryColor || "#002147",
                    }
                    : {}
                }
                onClick={() =>
                  setIsMobileNavOpen(
                    !isMobileNavOpen
                  )
                }
                aria-label="Toggle menu"
                aria-expanded={isMobileNavOpen}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileNavOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            )}

          </div>

        </LandingContainer>

        {/* =================================================
          MOBILE MENU DROPDOWN
      ================================================= */}

        {navbar.navLinks?.length > 0 &&
          isMobileNavOpen && (
            <div className={`md:hidden bg-white border-t border-slate-200 shadow-md ${navbar.mobileMenuCenter || brand.mobileMenuCenter || slug === "amity" ? "px-0 py-0" : "px-4 py-3"}`}>
              <ul className={`flex flex-col list-none m-0 p-0 ${navbar.mobileMenuCenter || brand.mobileMenuCenter || slug === "amity" ? "text-center gap-0" : "gap-2.5"}`}>

                {navbar.navLinks.map(
                  (link, idx) => (
                    <li
                      key={`${link.label}-mobile-${idx}`}
                      className={navbar.mobileMenuCenter || brand.mobileMenuCenter || slug === "amity" ? "border-b border-slate-100 last:border-b-0 text-center" : ""}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          setIsMobileNavOpen(false);
                          handleNavLinkClick(
                            e,
                            link
                          );
                        }}
                        className={`
                        block
                        transition-colors
                        ${navbar.mobileMenuCenter || brand.mobileMenuCenter || slug === "amity"
                          ? "py-3.5 px-4 text-[16.5px] font-bold text-[#0e2246] hover:text-[#0055b8] text-center"
                          : "py-1.5 text-[15px] font-semibold text-slate-800 hover:text-[#0055b8]"
                        }
                      `}
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                )}

              </ul>

              {/* Mobile Menu Scholarship Coupon Button */}
              {(navbar.showMobileMenuCoupon || navbar.showMobileCoupon || slug === "amity" || brand.slug === "amity") && (
                <div className="pt-4 pb-2 px-3 flex justify-center mobile-menu-coupon-wrap">
                  <Button
                    type="text"
                    onClick={(e) => {
                      setIsMobileNavOpen(false);
                      handleCouponClick(e);
                    }}
                    className="coupon-btn-main relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] !text-white font-bold text-[14.5px] cursor-pointer !border-none overflow-hidden select-none active:scale-95 shadow-md w-full max-w-[340px] !h-auto"
                    style={{
                      background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
                    }}
                  >
                    <span className="moving-light-green-box" />
                    <span className="relative w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs z-10 overflow-hidden">
                      <Image
                        src={giftGif || "/assets/images/gift.gif"}
                        alt="Gift"
                        width={20}
                        height={20}
                        unoptimized
                        className="w-4 h-4 object-contain"
                      />
                    </span>
                    <span className="relative z-10 tracking-wide text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] text-[14px]">
                      {couponButtonText || "Scholarship Coupon Code"}
                    </span>
                  </Button>
                </div>
              )}
            </div>
          )}

      </header>
    </>
  );
}

/* =========================================================
   SUB-NAVIGATION / SCROLLSPY
========================================================= */

const NAV_TABS = [
  {
    id: "about",
    label: "About",
    targets: ["about"],
  },
  {
    id: "program",
    label: "Courses",
    targets: [
      "program",
      "courses",
      "programmes",
    ],
  },
  {
    id: "emi",
    label: "EMI",
    targets: ["emi", "scholarship"],
  },
  {
    id: "whyChoose",
    label: "Benefits",
    targets: [
      "whyChoose",
      "advantage",
      "pedagogy",
      "benefits",
    ],
  },
  {
    id: "exam",
    label: "Exam",
    targets: [
      "exam",
      "evaluation",
    ],
  },
  {
    id: "approvals",
    label: "Approvals",
    targets: [
      "approvals",
      "recognition",
    ],
  },
  {
    id: "recruiters",
    label: "Placement",
    targets: [
      "recruiters",
      "placement",
      "partners",
    ],
  },
  {
    id: "Degreeinfo",
    label: "Degree",
    targets: [
      "Degreeinfo",
      "degree",
    ],
  },
  {
    id: "admission",
    label: "Admission",
    targets: [
      "admission",
      "admissionProcess",
      "enrollment",
    ],
  },
  {
    id: "compare",
    label: "Alternative",
    targets: [
      "compare",
      "compareBanner",
    ],
  },
  {
    id: "faqs",
    label: "FAQ's",
    targets: [
      "faqs",
      "faq",
    ],
  },
];

const findEl = (targets = []) =>
  targets
    .map((id) =>
      document.getElementById(id)
    )
    .find(Boolean);

export function LandingSubNav({
  brand = {},
}) {
  const [activeTab, setActiveTab] =
    useState("about");

  const subNav = brand.subNav || {};

  const scrollToSection = (tab) => {
    setActiveTab(tab.id);

    const el = findEl(tab.targets);

    if (!el) {
      return;
    }

    window.scrollTo({
      top:
        el.getBoundingClientRect().top +
        window.scrollY -
        90,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos =
        window.scrollY + 140;

      for (
        let i = NAV_TABS.length - 1;
        i >= 0;
        i--
      ) {
        const el = findEl(
          NAV_TABS[i].targets
        );

        if (
          el &&
          scrollPos >= el.offsetTop
        ) {
          setActiveTab(
            NAV_TABS[i].id
          );
          break;
        }
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const navBg =
    subNav.background ||
    brand.primaryColor ||
    "#005bb8";

  const activeColor =
    subNav.activeColor ||
    brand.accentColor ||
    "#ffd200";

  return (
    <nav
      className={`
        sticky
        top-16
        sm:top-20
        lg:top-22
        z-40
        text-white
        shadow-md
        select-none
        border-t
        border-blue-400/20
        font-poppins
        ${subNav.className || ""}
      `}
      style={{
        backgroundColor: navBg,
        ...subNav.style,
      }}
    >
      <div
        className={`
          max-w-[1600px]
          mx-auto
          px-2
          sm:px-6
          ${subNav.containerClassName || ""}
        `}
      >
        <div
          className={`
            flex
            items-center
            justify-start
            lg:justify-center
            overflow-x-auto
            no-scrollbar
            space-x-3
            sm:space-x-6
            md:space-x-8
            lg:space-x-10
            text-[14px]
            sm:text-[15px]
            md:text-[15.5px]
            h-14
            sm:h-20
            font-poppins
            ${subNav.innerClassName || ""}
          `}
        >
          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                scrollToSection(tab)
              }
              className={`
                h-full
                flex
                items-center
                px-1.5
                sm:px-2
                whitespace-nowrap
                transition-colors
                font-medium
                border-b-[3px]
                cursor-pointer
                bg-transparent
                border-t-0
                border-x-0
                ${activeTab === tab.id
                  ? "font-bold"
                  : "text-white/90 border-transparent hover:opacity-100 hover:text-white"
                }
                ${subNav.tabClassName || ""}
              `}
              style={
                activeTab === tab.id
                  ? {
                    color: activeColor,
                    borderColor:
                      activeColor,
                  }
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
