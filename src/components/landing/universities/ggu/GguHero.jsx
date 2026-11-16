"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import LandingLeadForm from "../../LandingLeadForm";
import { gguImg, GGU_COURSES_DROPDOWN } from "./constants";

export default function GguHero({ onOpenBrochure, onOpenDisclaimer }) {
  return (
    <section className="relative w-full bg-[#f4f7fb] overflow-hidden select-none">
      {/* =========================================================================
          DESKTOP VIEW (hidden on mobile, visible on lg+)
          ========================================================================= */}
      <div className="hidden lg:block relative min-h-[580px] xl:min-h-[620px] w-full">
        {/* Background Image Container */}
        <div
          className="absolute inset-0 bg-no-repeat bg-right-bottom bg-top z-0 pointer-events-none"
          style={{
            backgroundImage: `url('${gguImg("ggu_desktop_new_bg.png")}')`,
            backgroundPosition: "right center",
            backgroundSize: "top",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 xl:py-12 flex items-center justify-between">
          {/* Left Column: Hero Information */}
          <div className="w-full lg:max-w-[580px] xl:max-w-[620px] text-left">
            {/* University & upGrad Partner Logo */}
            <div className="mb-4">
              <Image
                src={gguImg("new_ggu_logo_main.png")}
                alt="Golden Gate University via upGrad"
                width={260}
                height={55}
                priority
                className="h-[46px] w-auto object-contain"
              />
            </div>

            {/* Sub-tagline */}
            <p className="text-[14px] sm:text-[15px] font-semibold text-neutral-800 m-0 mb-2">
              Leadership Advancement or a Doctoral Degree
            </p>

            {/* Main Headline */}
            <h1 className="text-[36px] sm:text-[42px] xl:text-[46px] font-black text-[#003468] tracking-tight leading-[1.08] m-0 mb-3">
              Golden Gate University
              <br />
              Online Courses
            </h1>

            {/* University Attribution */}
            <p className="text-[15px] font-bold text-neutral-900 m-0 mb-4">
              By <span className="underline decoration-1">Golden Gate University</span> via{" "}
              <span className="underline decoration-1 font-extrabold text-[#DC520A]">upGrad</span>
            </p>

            {/* DBA / MBA Highlight Pill */}
            <div className="inline-block border-[2px] border-[#DC520A] rounded-full px-6 py-1.5 mb-4 bg-white/70 backdrop-blur-xs">
              <span className="text-[#003468] font-extrabold italic text-[20px] tracking-wide">
                DBA / MBA
              </span>
            </div>

            {/* Features Strip */}
            <p className="text-[13px] sm:text-[13.5px] font-semibold text-neutral-700 leading-relaxed max-w-[520px] m-0 mb-6">
              100% Online &nbsp;|&nbsp; U.S.-Accredited University &nbsp;|&nbsp; Working-Professional Focus &nbsp;|&nbsp; No Cost EMI &nbsp;|&nbsp; 2500+ Global CXOs
            </p>

            {/* CTA Button */}
            <div>
              <button
                type="button"
                onClick={() => onOpenBrochure?.("General", "Download Brochure")}
                className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#DC520A] hover:bg-[#b84307] text-white rounded-[6px] text-[15px] font-bold shadow-md hover:shadow-lg transition-all cursor-pointer border-none active:scale-98"
              >
                <span>Download Brochure</span>
                <Download className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="w-full lg:max-w-[390px] xl:max-w-[420px] shrink-0">
            <LandingLeadForm
              brandName="Golden Gate University"
              primaryColor="#003468"
              accentColor="#DC520A"
              courses={GGU_COURSES_DROPDOWN}
              variant="white"
              title="Admission Open"
              subtitle="Academic Experts will assist you!"
              phoneDisplay="+91 7065 7777 55"
              phone="+917065777755"
              onOpenDisclaimer={onOpenDisclaimer}
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE VIEW (visible on mobile/tablet, hidden on lg+)
          ========================================================================= */}
      <div className="block lg:hidden w-full bg-[#edf4fb]">
        {/* Top Content: Sky blue area with clean typography */}
        <div className="px-4 pt-6 pb-4 text-center">
          {/* Sub-tagline */}
          <p className="text-[13px] font-semibold text-neutral-800 m-0 mb-1.5">
            Leadership Advancement or a Doctoral Degree
          </p>

          {/* Main Headline */}
          <h1 className="text-[27px] sm:text-[32px] font-black text-[#003468] tracking-tight leading-tight m-0 mb-2">
            Golden Gate University
            <br />
            Online Courses
          </h1>

          {/* University Attribution */}
          <p className="text-[13px] font-bold text-neutral-900 m-0 mb-3">
            By <span className="underline decoration-1">Golden Gate University</span> via{" "}
            <span className="underline decoration-1 font-extrabold text-[#DC520A]">upGrad</span>
          </p>

          {/* DBA / MBA Highlight Pill */}
          <div className="inline-block border-[2px] border-[#DC520A] rounded-full px-5 py-1 mb-3 bg-white/90 shadow-2xs">
            <span className="text-[#003468] font-extrabold italic text-[17px]">
              DBA / MBA
            </span>
          </div>

          {/* Features Strip */}
          <p className="text-[11.5px] sm:text-[12px] font-semibold text-neutral-700 leading-snug max-w-[340px] mx-auto m-0 mb-3">
            100% Online &nbsp;|&nbsp; U.S.-Accredited University &nbsp;|&nbsp; Working-Professional Focus &nbsp;|&nbsp; No Cost EMI &nbsp;|&nbsp; 2500+ Global CXOs
          </p>
        </div>

        {/* Building & Logo Graphic on Mobile (Image already contains the Golden Gate + upGrad Logo) */}
        <div className="relative w-full overflow-hidden -mt-1">
          <Image
            src={gguImg("ggu_mobile_img.png")}
            alt="Golden Gate University via upGrad"
            width={800}
            height={600}
            priority
            className="w-full h-auto object-cover object-top block"
          />
        </div>

        {/* Lead Form Card on Mobile (placed right below building graphic) */}
        <div className="px-4 -mt-10 sm:-mt-14 pb-8 relative z-20">
          <LandingLeadForm
            brandName="Golden Gate University"
            primaryColor="#003468"
            accentColor="#DC520A"
            courses={GGU_COURSES_DROPDOWN}
            variant="white"
            title="Admission Open"
            subtitle="Academic Experts will assist you!"
            phoneDisplay="+91 7065 7777 55"
            phone="+917065777755"
            onOpenDisclaimer={onOpenDisclaimer}
          />
        </div>
      </div>
    </section>
  );
}

