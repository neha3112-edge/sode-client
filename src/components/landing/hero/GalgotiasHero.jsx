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

  return (
    <section
      id="hero-section"
      className="top-banner relative isolate overflow-hidden select-none"
      style={{
        backgroundImage: "url('/assets/galgotias/galgotias-desktop.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 text-left text-white" id="main-content">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[26px] font-medium text-white m-0 leading-tight">
              Ignite Your Career Ambition with<br className="hidden sm:inline" />
            </h2>
            <h1 className="text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-[#FFD508] m-0 my-2 leading-[1.15]">
              Galgotias University Online
            </h1>
            <div className="my-2.5">
              <p className="text-[13px] sm:text-[14px] text-white border border-[#FFD508] inline-block px-3.5 py-1.5 rounded-[10px] font-medium m-0 leading-snug">
                Admissions Closing for July 2026 – Limited Slots
              </p>
            </div>
            <h2 className="text-[18px] sm:text-[21px] lg:text-[22px] font-semibold text-white m-0 my-3 tracking-wide">
              MBA | MCA | MCOM | MA | BCA | BBA
            </h2>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenBrochure?.(null, "Download Brochure")}
                className="topbtn inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#800505] font-semibold text-[15px] sm:text-[16px] px-7 py-2.5 rounded-full cursor-pointer border border-white shadow-md transition-all active:scale-95"
              >
                <span>Download Brochure</span>
                <i className="fa fa-download" />
              </button>
            </div>
          </div>

          {/* Mobile Scholarship Coupon Code Button */}
          <div className="block lg:hidden w-full text-center coupon_btn_container my-1">
            <button
              type="button"
              onClick={handleCouponClick}
              className="coupon-btn-main coupon-button-mobile inline-flex items-center justify-center gap-2 w-full max-w-[320px] mx-auto py-2.5 px-4 rounded-[8px] text-white font-bold text-[14px] border-none cursor-pointer shadow-[0_10px_25px_rgba(46,204,113,0.4)]"
              style={{ background: "linear-gradient(135deg, #2ecc71, #27ae60)" }}
            >
              <img
                src="/assets/galgotias/gift.gif"
                alt="Gift"
                className="w-5 h-5 rounded-full object-contain"
              />
              <span>Scholarship Coupon Code</span>
            </button>
          </div>

          {/* Right Lead Form */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[380px]">
              <LandingLeadForm
                brand={brand}
                courses={courses}
                variant="card"
                title="Enquire Now"
                subtitle="Academic Experts will assist you!"
                primaryColor="#002266"
                accentColor="#FFD508"
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
