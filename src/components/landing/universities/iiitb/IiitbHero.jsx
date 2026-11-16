"use client";

import React from "react";
import Image from "next/image";
import { CheckSquare, Download } from "lucide-react";
import LandingLeadForm from "../../LandingLeadForm";
import { IIITB_HERO, IIITB_COURSES, iiitbImg } from "./constants";

export default function IiitbHero({ onOpenBrochure, onOpenDisclaimer }) {
  const brand = {
    name: "IIIT Bangalore Online",
    primaryColor: "#01519a",
    courses: IIITB_COURSES,
  };

  return (
    <section id="hero" className="w-full relative select-none">
      {/* ======================================================== */}
      {/* 1. MOBILE HERO VIEW (Hidden on Desktop >= md)           */}
      {/* ======================================================== */}
      <div className="md:hidden w-full flex flex-col bg-white">
        {/* Top Sky-Blue Info Area */}
        <div className="w-full bg-[#edf4fb] px-4 pt-6 pb-4">
          {/* Partner Logo */}
          <div className="mb-3.5">
            <Image
              src={iiitbImg("iiitb_new_logo_main.png")}
              alt="IIIT Bangalore via upGrad"
              width={260}
              height={55}
              priority
              className="h-9 w-auto object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          </div>

          <h2 className="text-[17px] font-bold text-black leading-snug m-0">
            Build Leadership quality
            <br />
            with AI Generative courses from
          </h2>

          <h1 className="font-[family-name:var(--font-anton)] text-[42px] font-normal text-[#01519a] leading-[1.08] m-0 my-2 tracking-[0.5px]">
            IIIT Bangalore
            <br />
            Online Courses
          </h1>

          <p className="text-[14.5px] font-semibold text-black m-0 mb-3.5">
            By <span className="underline underline-offset-2">IIIT Bangalore</span> via{" "}
            <span className="underline underline-offset-2">upGrad</span>
          </p>

          {/* Highlights List */}
          <div className="space-y-1.5 pb-2">
            {IIITB_HERO.badges.map((b, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#00cc00] stroke-[2.5] shrink-0" />
                <span className="text-[13px] font-semibold italic text-black">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Building Graphic Image */}
        <div className="w-full relative">
          <Image
            src={iiitbImg("iiitb_mobile_new_img.png")}
            alt="IIIT Bangalore Campus"
            width={600}
            height={360}
            priority
            className="w-full h-auto object-cover block"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Lead Form Card (Overlapping image by -mt-10 like live site) */}
        <div className="w-full px-4 pb-6 bg-white -mt-10 relative z-20">
          <div className="w-full max-w-[420px] mx-auto shadow-xl rounded-2xl overflow-hidden">
            <LandingLeadForm
              variant="white"
              title="Enquire Now"
              subtitle="Academic Experts will assist you!"
              showPhoneBadge={false}
              phoneBeforeEmail={true}
              brand={brand}
              onOpenDisclaimer={onOpenDisclaimer}
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP HERO VIEW (Hidden on Mobile < md)            */}
      {/* ======================================================== */}
      <div className="hidden md:block w-full relative min-h-[580px] lg:min-h-[640px] overflow-hidden">
        {/* Background Campus Image */}
        <Image
          src={iiitbImg("iiitb_desktop_new_bg.png")}
          alt="IIIT Bangalore Campus Background"
          fill
          priority
          sizes="(max-width: 768px) 0vw, 100vw"
          className="object-cover object-center pointer-events-none"
        />

        {/* Foreground Content */}
        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Info & Highlights */}
            <div className="md:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
              {/* Partner Badge */}
              <div className="mb-4">
                <Image
                  src={iiitbImg("iiitb_new_logo_main.png")}
                  alt="IIIT Bangalore via upGrad"
                  width={280}
                  height={58}
                  priority
                  className="h-11 w-auto object-contain"
                />
              </div>

              <h2 className="text-[19px] lg:text-[21px] font-bold text-black leading-[1.2] m-0">
                Build Leadership quality
                <br />
                with AI Generative courses from
              </h2>

              <h1 className="font-[family-name:var(--font-anton)] text-[48px] lg:text-[56px] font-normal text-[#01519a] leading-[1.12] m-0 my-2.5 tracking-[0.5px]">
                IIIT Bangalore
                <br />
                Online Courses
              </h1>

              <p className="text-[15px] lg:text-[16px] font-semibold text-black m-0 mb-4">
                By <span className="underline underline-offset-2">IIIT Bangalore</span> via{" "}
                <span className="underline underline-offset-2">upGrad</span>
              </p>

              {/* Highlights List */}
              <div className="space-y-2 mb-6">
                {IIITB_HERO.badges.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckSquare className="w-4 h-4 text-[#00cc00] stroke-[2.5] shrink-0" />
                    <span className="text-[14px] lg:text-[14.5px] font-semibold italic text-black">
                      {b}
                    </span>
                  </div>
                ))}
              </div>

              {/* Download Brochure CTA Button */}
              <div>
                <button
                  type="button"
                  onClick={() => onOpenBrochure?.("Hero Desktop Brochure")}
                  className="py-3 px-8 rounded-lg bg-[#01519a] hover:bg-[#003f7a] text-white font-bold text-[14.5px] flex items-center justify-center gap-2 border-none shadow-md cursor-pointer active:scale-98 transition-all"
                >
                  <span>{IIITB_HERO.buttonText}</span>
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Lead Form Card */}
            <div className="md:col-span-5 flex justify-end">
              <div className="w-full max-w-[420px] shadow-xl rounded-2xl overflow-hidden">
                <LandingLeadForm
                  variant="white"
                  title="Enquire Now"
                  subtitle="Academic Experts will assist you!"
                  showPhoneBadge={false}
                  phoneBeforeEmail={true}
                  brand={brand}
                  onOpenDisclaimer={onOpenDisclaimer}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

