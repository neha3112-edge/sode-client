"use client";

import React from "react";
import Image from "next/image";
import LandingLeadForm from "../../LandingLeadForm";
import { edgewoodImg, EDGEWOOD_COURSES } from "./constants";

export default function EdgewoodHero({
  onOpenBrochure,
  onOpenDisclaimer,
}) {
  const brand = {
    slug: "edgewood",
    name: "Edgewood University Online",
    shortName: "Edgewood",
    source: "Edgewood",
    primaryColor: "#b2171e",
    themeBg: "bg-[#b2171e]",
    themeBorder: "border-[#b2171e]",
    courses: EDGEWOOD_COURSES,
  };

  return (
    <section
      id="hero-section"
      className="top-banner relative isolate overflow-hidden select-none"
    >
      {/* Mobile Background Image (mobile_new_bg_main.png) */}
      <div className="block lg:hidden absolute inset-0 -z-10 pointer-events-none">
        <Image
          src={edgewoodImg("mobile_new_bg_main.png")}
          alt="Edgewood Mobile Background"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1px"
          className="object-cover object-top"
        />
      </div>

      {/* Desktop Background Image (edgewood_desktop_new_bg.png) */}
      <div className="hidden lg:block absolute inset-0 -z-10 pointer-events-none">
        <Image
          src={edgewoodImg("edgewood_desktop_new_bg.png")}
          alt="Edgewood University Campus"
          fill
          priority
          loading="eager"
          sizes="(min-width: 1024px) 100vw, 1px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/40 lg:bg-white/20" />
      </div>

      {/* ===================== MOBILE VIEW (lg:hidden) ===================== */}
      <div className="block lg:hidden px-4 pt-6 pb-8 text-center">
        {/* 1. Sub-headline */}
        <p className="text-[15px] sm:text-[17px] font-bold text-neutral-900 m-0 mb-1 leading-snug">
          Learn Business <br />
          Leadership Skills With
        </p>

        {/* 2. Main Red Heading */}
        <h1 className="text-[38px] sm:text-[44px] font-black text-[#b2171e] leading-[1.04] tracking-tight uppercase m-0 my-1">
          EdgeWood <br />
          Online University
        </h1>

        {/* 3. By Edgewood via upGrad */}
        <p className="text-[13px] sm:text-[14px] font-bold text-neutral-900 m-0 my-2">
          By <span className="underline decoration-neutral-900">Edgewood University</span> via{" "}
          <span className="underline decoration-neutral-900">upGrad</span>
        </p>

        {/* 4. Outline Box with Overlapping Online Badge */}
        <div className="flex justify-center my-3">
          <div className="relative inline-block border border-neutral-700 rounded-[18px] px-6 py-2.5 pt-3.5 bg-transparent">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#f5a623] text-[#800505] font-black text-[12px] px-3.5 py-0.5 rounded-[6px] tracking-wide shadow-2xs">
              Online
            </div>
            <div className="text-[26px] sm:text-[30px] font-black text-[#b2171e] tracking-tight leading-none whitespace-nowrap">
              DBA <span className="mx-1 text-[#b2171e]">|</span> MBA + DBA
            </div>
          </div>
        </div>

        {/* 5. Checklist */}
        <div className="space-y-1 my-3 text-[12.5px] sm:text-[13.5px] font-medium text-neutral-800 text-left inline-block">
          <div className="flex items-center gap-2">
            <span className="font-bold text-black text-[14px]">✓</span>
            <span>Globally recognised U.S. accreditation (HLC)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-black text-[14px]">✓</span>
            <span>No GMAT/GRE + flexible pay-per-month model</span>
          </div>
        </div>

        {/* 6. Download Brochure Button */}
        <div className="my-4">
          <button
            type="button"
            onClick={() => onOpenBrochure?.("Edgewood Hero Download Brochure")}
            className="inline-flex items-center gap-2 bg-[#b2171e] hover:bg-[#991319] text-white font-bold text-[14px] px-7 py-2.5 rounded-full cursor-pointer border-none shadow-md transition-all active:scale-95"
          >
            <span>Download Broucher</span>
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

        {/* 7. Mobile Campus Building Image (Exact DevTools structure: style="padding: 0px;", NO shadow, NO border, NO white box) */}
        <div className="w-full max-w-[390px] mx-auto my-3 p-0">
          <Image
            src={edgewoodImg("edgewood_mobile_new_img.png")}
            alt="Edgewood University Campus"
            width={800}
            height={598}
            priority
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 390px"
            className="w-full h-auto block"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* 8. White Enquire Now Form Card */}
        <div className="w-full max-w-[370px] mx-auto mt-5">
          <LandingLeadForm
            brand={brand}
            courses={EDGEWOOD_COURSES}
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

      {/* ===================== DESKTOP VIEW (hidden lg:block) ===================== */}
      <div className="hidden lg:block max-w-[1240px] mx-auto px-6 py-12">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Left Text Content */}
          <div className="col-span-7 text-left text-neutral-900" id="main-content">
            {/* Edgewood + upGrad Logo Banner */}
            <div className="mb-3">
              <Image
                src={edgewoodImg("edgewood-university-black.png")}
                alt="Edgewood University upGrad"
                width={200}
                height={40}
                priority
                className="h-[36px] w-auto object-contain"
              />
            </div>

            {/* Sub-headline */}
            <p className="text-[16px] font-semibold text-neutral-800 m-0 leading-tight">
              Learn Business Leadership Skills With
            </p>

            {/* Main Red Heading */}
            <h1 className="text-[44px] lg:text-[48px] font-black text-[#b2171e] m-0 my-1 leading-[1.08] tracking-tight">
              EdgeWood <br />
              Online University
            </h1>

            {/* By Edgewood via upGrad */}
            <p className="text-[16px] font-bold text-neutral-900 m-0 mb-3">
              By <span className="underline decoration-neutral-900">Edgewood University</span> via{" "}
              <span className="underline decoration-neutral-900">upGrad</span>
            </p>

            {/* Outline Box with Overlapping Online Badge */}
            <div className="relative inline-block border border-neutral-700 rounded-[18px] px-6 py-2.5 pt-3.5 my-3 bg-transparent">
              <div className="absolute -top-3.5 left-5 bg-[#f5a623] text-[#800505] font-black text-[12.5px] px-3.5 py-0.5 rounded-[6px] tracking-wide shadow-2xs">
                Online
              </div>
              <div className="text-[30px] font-black text-[#b2171e] tracking-tight leading-none">
                DBA <span className="mx-1 text-[#b2171e]">|</span> MBA + DBA
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-1.5 mb-5 text-[14.5px] font-medium text-neutral-800">
              <div className="flex items-center gap-2">
                <span className="font-bold text-black text-[16px]">✓</span>
                <span>Globally recognised U.S. accreditation (HLC)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-black text-[16px]">✓</span>
                <span>No GMAT/GRE + flexible pay-per-month model</span>
              </div>
            </div>

            {/* Download Brochure Button */}
            <div>
              <button
                type="button"
                onClick={() => onOpenBrochure?.("Edgewood Hero Download Brochure")}
                className="inline-flex items-center gap-2 bg-[#b2171e] hover:bg-[#991319] text-white font-bold text-[15px] px-6 py-2.5 rounded-full cursor-pointer border-none shadow-md transition-all active:scale-95"
              >
                <span>Download Broucher</span>
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

          {/* Right Lead Form */}
          <div className="col-span-5 flex justify-end">
            <div className="w-full max-w-[370px]">
              <LandingLeadForm
                brand={brand}
                courses={EDGEWOOD_COURSES}
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
