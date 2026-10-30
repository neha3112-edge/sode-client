/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import confetti from "canvas-confetti";
import LandingLeadForm from "../LandingLeadForm";

export default function GalgotiasHero({
  brand = {},
  courses = [],
  onOpenBrochure,
  onOpenApply,
  onOpenScholarship,
  onOpenDisclaimer,
}) {
  const handleCouponClick = (e) => {
    try {
      if (typeof window !== "undefined") {
        const rect = e?.currentTarget?.getBoundingClientRect();
        const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
        const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;
        confetti({
          particleCount: 55,
          spread: 60,
          origin: { x, y },
          zIndex: 99999,
          colors: ["#2ecc71", "#27ae60", "#f1c40f", "#e67e22", "#e74c3c"],
        });
      }
    } catch {}
    if (onOpenScholarship) {
      onOpenScholarship();
    } else if (onOpenApply) {
      onOpenApply();
    }
  };

  const campusImgSrc =
    brand.campusImage ||
    "/assets/all_universities_images/all_universities_images/galgotias/university.webp";

  const giftIconSrc =
    brand.giftGif ||
    "/assets/all_universities_images/all_universities_images/galgotias/gift.gif";

  return (
    <section
      id="hero-section"
      className="top-banner relative isolate overflow-hidden select-none bg-[#b2171e] lg:bg-cover lg:bg-center lg:bg-[url('/assets/galgotias/galgotias-desktop.webp')]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 text-left text-white" id="main-content">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[26px] font-semibold text-white m-0 leading-tight">
              Ignite Your Career Ambition with
            </h2>
            <h1 className="text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#FFD508] m-0 my-2 leading-[1.15]">
              Galgotias University <br className="sm:hidden" />Online
            </h1>

            {/* Admission Closing Badge */}
            <div className="my-2.5 sm:my-3 text-left">
              <div className="border border-[#FFD508] inline-block px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-[10px] text-left">
                <p className="text-[13.5px] sm:text-[14.5px] text-white font-medium m-0 leading-tight tracking-normal text-left">
                  <span>Admissions Closing for July 2026 – Limited</span>
                  <br className="sm:hidden" />
                  <span className="hidden sm:inline"> </span>
                  <span>Slots</span>
                </p>
              </div>
            </div>

            {/* Courses Strip */}
            <h2 className="text-[18px] sm:text-[21px] lg:text-[22px] font-bold text-white m-0 my-3 tracking-wide">
              MBA | MCA | MCOM | MA | BCA | BBA
            </h2>

            {/* Download Brochure Button */}
            <div className="pt-1.5 sm:pt-2">
              <button
                type="button"
                onClick={() => onOpenBrochure?.(null, "Download Brochure")}
                className="topbtn inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#800505] font-semibold text-[15px] sm:text-[16px] px-6 py-2.5 rounded-full cursor-pointer border border-white shadow-md transition-all active:scale-95"
              >
                <span>Download Brochure</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-current inline-block"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 11.586V3a1 1 0 011-1z" />
                  <path d="M3 14a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Campus Building Image (matches reference screenshot) */}
          <div className="block lg:hidden w-full max-w-[420px] mx-auto my-1.5 rounded-[18px] overflow-hidden shadow-lg border border-white/10">
            <img
              src={campusImgSrc}
              alt="Galgotias University Online Campus"
              className="w-full h-auto object-cover block"
            />
          </div>

          {/* Mobile Scholarship Coupon Code Button (matches reference screenshot) */}
          <div className="block lg:hidden w-full text-center coupon_btn_container my-1">
            <button
              type="button"
              onClick={handleCouponClick}
              className="coupon-btn-main coupon-button-mobile inline-flex items-center justify-center gap-2 w-full max-w-[270px] mx-auto py-1.5 px-3.5 rounded-[8px] text-white font-bold text-[13.5px] border-none cursor-pointer shadow-[0_6px_16px_rgba(46,204,113,0.35)] transition-transform active:scale-95"
              style={{ background: "linear-gradient(135deg, #2ecc71, #27ae60)" }}
            >
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
                <img
                  src={giftIconSrc}
                  alt="Gift"
                  className="w-4 h-4 object-contain"
                />
              </div>
              <span>Scholarship Coupon Code</span>
            </button>
          </div>

          {/* Right Lead Form */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[370px]">
              <LandingLeadForm
                brand={brand}
                courses={courses && courses.length > 0 ? courses : brand.courses}
                variant="white-card"
                title="Enquire Now"
                subtitle="Academic Experts will assist you!"
                buttonText="Submit"
                phoneText="+91 7065 7777 55"
                phoneHref="7065777755"
                showPhoneBadge={true}
                phoneBeforeEmail={false}
                onOpenDisclaimer={onOpenDisclaimer}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
