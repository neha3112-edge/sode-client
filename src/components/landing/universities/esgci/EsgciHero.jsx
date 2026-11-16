"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import LandingLeadForm from "../../LandingLeadForm";
import { esgciImg, ESGCI_COURSES } from "./constants";

export default function EsgciHero({
  onOpenBrochure,
  onOpenDisclaimer,
}) {
  const brand = {
    slug: "esgci",
    name: "ESGCI Online",
    shortName: "ESGCI",
    source: "ESGCI",
    primaryColor: "#04903c",
    themeBg: "bg-[#04903c]",
    themeBorder: "border-[#04903c]",
    courses: ESGCI_COURSES,
  };

  return (
    <section
      id="hero-section"
      className="top-banner relative isolate overflow-hidden select-none"
    >
      {/* Mobile Background Image (mobile_new_bg_main.png) */}
      <div className="block lg:hidden absolute inset-0 -z-10 pointer-events-none">
        <Image
          src={esgciImg("mobile_new_bg_main.png")}
          alt="ESGCI Mobile Background"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1px"
          className="object-cover object-top"
        />
      </div>

      {/* Desktop Background Image (esgci_new_desktop_bg.png) */}
      <div className="hidden lg:block absolute inset-0 -z-10 pointer-events-none">
        <Image
          src={esgciImg("esgci_new_desktop_bg.png")}
          alt="ESGCI Paris Campus"
          fill
          priority
          loading="eager"
          sizes="(min-width: 1024px) 100vw, 1px"
          className="object-cover object-center"
        />
      </div>

      {/* ===================== MOBILE VIEW (lg:hidden) ===================== */}
      <div className="block lg:hidden px-4 pt-6 pb-8 text-center">
        {/* ESGCI + upGrad Logo */}
        <div className="flex justify-center mb-2">
          <Image
            src={esgciImg("esgci_new_logo.png")}
            alt="ESGCI upGrad"
            width={160}
            height={48}
            className="h-8 w-auto object-contain"
            priority
          />
        </div>

        {/* Sub-headline */}
        <p className="text-[14px] font-semibold text-neutral-900 m-0 mb-1 leading-snug">
          Doctoral Program for Global Leaders
        </p>

        {/* Headline */}
        <h1 className="text-[44px] font-black text-[#04903c] tracking-tight leading-tight m-0 mb-1 uppercase">
          Online DBA
        </h1>

        {/* Tagline */}
        <p className="text-[14px] text-neutral-800 m-0 mb-2">
          By <u className="font-semibold">ESGCI Online</u> via <u className="font-semibold">upGrad</u>
        </p>

        {/* Program Title */}
        <h2 className="text-[17px] font-bold text-neutral-900 m-0 mb-1">
          Doctor of Business Administration
        </h2>

        {/* Description */}
        <p className="text-[13px] text-neutral-700 max-w-[340px] mx-auto m-0 mb-4 leading-relaxed">
          Earn a prestigious Online DBA from Paris-based ESGCI while advancing your career from anywhere in the world.
        </p>

        {/* Download Brochure Button */}
        <div className="flex justify-center mb-5">
          <button
            type="button"
            onClick={() => onOpenBrochure?.("Hero Mobile Brochure")}
            className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-[#04903c] text-white rounded-[5px] text-[14px] font-semibold shadow-xs hover:bg-[#037a33] active:scale-98 transition-all border-none cursor-pointer"
          >
            <span>Download Brochure</span>
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Campus Building Image - Direct Free Natural Size without wrapper border or background */}
        <div className="w-full max-w-[390px] mx-auto mb-6 flex justify-center">
          <Image
            src={esgciImg("esgci_new_mobile.png")}
            alt="ESGCI Campus"
            width={400}
            height={300}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Mobile Admission Open Form */}
        <div className="w-full max-w-[420px] mx-auto text-left">
          <LandingLeadForm
            brand={brand}
            courses={ESGCI_COURSES}
            universityName="ESGCI Online"
            title="Admission Open"
            subtitle="Academic Experts will assist you!"
            phoneText="+91 7065 7777 55"
            phoneHref="tel:07065777755"
            showPhoneBadge={true}
            buttonText="Submit"
            primaryColor="#04903c"
            variant="white"
            formName="esgci_hero_form_mobile"
            onOpenDisclaimer={onOpenDisclaimer}
          />
        </div>
      </div>

      {/* ===================== DESKTOP VIEW (hidden lg:block) ===================== */}
      <div className="hidden lg:block max-w-[1240px] mx-auto px-6 xl:px-8 py-10 xl:py-14">
        <div className="grid grid-cols-12 gap-8 items-center min-h-[500px]">
          {/* Left Column: Hero Content */}
          <div className="col-span-7 flex flex-col items-start pr-4">
            {/* ESGCI + upGrad Logo */}
            <div className="mb-3">
              <Image
                src={esgciImg("esgci_new_logo.png")}
                alt="ESGCI upGrad"
                width={180}
                height={52}
                className="h-[36px] w-auto object-contain"
                priority
              />
            </div>

            {/* Sub-headline */}
            <p className="text-[15px] font-semibold text-black tracking-wide m-0 mb-1">
              Doctoral Program for Global Leaders
            </p>

            {/* Headline */}
            <h1 className="text-[58px] xl:text-[66px] font-black text-[#04903c] tracking-tight leading-none m-0 mb-1 uppercase">
              Online DBA
            </h1>

            {/* Tagline */}
            <p className="text-[16px] text-black m-0 mb-3">
              By <u className="font-semibold">ESGCI Online</u> via <u className="font-semibold">upGrad</u>
            </p>

            {/* Highlight Box */}
            <h2 className="text-[20px] xl:text-[22px] font-bold text-black m-0 mb-2">
              Doctor of Business Administration
            </h2>

            {/* Course Strip Description */}
            <p className="text-[14px] text-neutral-800 leading-relaxed max-w-[420px] m-0 mb-5">
              Earn a prestigious Online DBA from Paris-based ESGCI while advancing your career from anywhere in the world.
            </p>

            {/* Download Brochure CTA Button */}
            <button
              type="button"
              onClick={() => onOpenBrochure?.("Hero Desktop Brochure")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#04903c] hover:bg-[#037a33] text-white rounded-[5px] text-[15px] font-semibold shadow-sm transition-all duration-150 active:scale-98 border-none cursor-pointer"
            >
              <span>Download Brochure</span>
              <Download className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Admission Open Lead Form */}
          <div className="col-span-5 flex justify-end">
            <div className="w-full max-w-[400px]">
              <LandingLeadForm
                brand={brand}
                courses={ESGCI_COURSES}
                universityName="ESGCI Online"
                title="Admission Open"
                subtitle="Academic Experts will assist you!"
                phoneText="+91 7065 7777 55"
                phoneHref="tel:07065777755"
                showPhoneBadge={true}
                buttonText="Submit"
                primaryColor="#04903c"
                variant="white"
                formName="esgci_hero_form_desktop"
                onOpenDisclaimer={onOpenDisclaimer}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

