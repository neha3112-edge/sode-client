"use client";

import React from "react";
import Image from "next/image";
import { Clock, Download } from "lucide-react";
import LandingLeadForm from "@/components/landing/LandingLeadForm";
import { iimImg } from "./constants";

export default function IimHero({ onOpenBrochure, onLeadSuccess }) {
  const coursesList = [{ value: "HR & Analytics", label: "HR & Analytics" }];

  return (
    <section className="w-full relative bg-white select-none">
      {/* ======================================================== */}
      {/* 1. MOBILE HERO VIEW (< md)                               */}
      {/* ======================================================== */}
      <div className="md:hidden w-full flex flex-col bg-white">
        {/* Top Sky-Blue Info Area - Centered matching mobile live site */}
        <div className="w-full bg-gradient-to-b from-[#e3effc] via-[#eaf3fd] to-white px-4 pt-6 pb-2 flex flex-col items-center text-center">
          <h1
            className="font-[family-name:var(--font-anton)] text-[34px] sm:text-[38px] font-normal tracking-wide text-[#17479E] leading-[1.05] m-0 mb-2 text-center"
            style={{ fontFamily: "var(--font-anton), 'Anton', sans-serif" }}
          >
            HRM Analytics
            <br />
            Online Certification
          </h1>

          <p className="text-[15px] font-bold text-neutral-900 m-0 mb-2.5 text-center tracking-tight">
            By <u className="underline decoration-1.5 underline-offset-2">IIM Kozhikode</u> via{" "}
            <u className="underline decoration-1.5 underline-offset-2">Upgrade</u>
          </p>

          <p className="text-[12.5px] text-neutral-700 leading-[1.42] m-0 mb-3 text-center max-w-[340px] px-2 font-normal">
            Earn a 6-month professional certificate from
            <br />
            IIM Kozhikode. This HR Analytics course
            <br />
            covers recruitment, job posting, and
            <br />
            workforce management via case studies &amp;
            <br />
            real-world projects.
          </p>

          {/* Duration Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white border border-neutral-300 rounded-full px-3.5 py-1 text-[12px] font-bold text-neutral-800 mb-2 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#17479E]" />
            <span>6 Months</span>
          </div>
        </div>

        {/* Building Graphic Image (Includes IIM Kozhikode + upGrad logo at top) */}
        <div className="w-full relative bg-white">
          <Image
            src={iimImg("iim_mobile_new_img.png")}
            alt="IIM Kozhikode Campus"
            width={800}
            height={526}
            priority
            className="w-full h-auto object-contain block"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Lead Form Card (Smoothly follows below graphic) */}
        <div className="w-full px-4 pt-3 pb-8 bg-white relative z-20 flex justify-center">
          <div className="w-full max-w-[400px]">
            <LandingLeadForm
              variant="white"
              primaryColor="#17479E"
              universityName="IIM Kozhikode"
              courses={coursesList}
              defaultCourse="HR & Analytics"
              title="Admission Open"
              subtitle="Academic Experts will assist you!"
              phoneText="+91 7065 7777 55"
              phoneHref="tel:07065777755"
              showPhoneBadge={true}
              config={{
                hideTermsCheckbox: true,
                phoneBeforeEmail: false,
                colors: {
                  phoneBackground: "#17479E",
                  phoneText: "#ffffff",
                  buttonBackground: "#17479E",
                },
              }}
              brand={{
                hero: {
                  hideTermsCheckbox: true,
                  phoneBadgeBg: "#17479E",
                  phoneBadgeColor: "#ffffff",
                  phoneBadgeIconColor: "#ffffff",
                },
              }}
              source="landing_iim"
              campaign="iim_lead_campaign"
              onSuccess={onLeadSuccess}
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
          src={iimImg("iim_desktop_new_img.png")}
          alt="IIM Kozhikode Campus Background"
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
                  src={iimImg("upgrade_iim_logo.png")}
                  alt="IIM Kozhikode via upGrad"
                  width={280}
                  height={58}
                  priority
                  className="h-12 lg:h-14 w-auto object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>

              {/* Main Headline */}
              <h1
                className="font-[family-name:var(--font-anton)] text-[34px] sm:text-[42px] font-normal tracking-wide text-[#17479E] leading-[0.98] m-0 mb-3"
                style={{ fontFamily: "var(--font-anton), 'Anton', sans-serif" }}
              >
                HRM Analytics
                <br />
                Online Certification
              </h1>

              {/* Subheading */}
              <p className="text-[17px] sm:text-[19px] lg:text-[20px] font-bold text-neutral-900 m-0 mb-3 tracking-tight">
                By <u className="underline decoration-1.5 underline-offset-2">IIM Kozhikode</u> via{" "}
                <u className="underline decoration-1.5 underline-offset-2">Upgrade</u>
              </p>

              {/* Description (Exact 5 lines matching screenshot) */}
              <p className="text-neutral-900 text-[14px] sm:text-[15.5px] lg:text-[16px] leading-[1.38] m-0 mb-4 font-normal max-w-125">
                Earn a 6-month professional certificate from
                <br />
                IIM Kozhikode. This HR Analytics course
                <br />
                covers recruitment, job posting, and
                <br />
                workforce management via case studies &amp;
                <br />
                real-world projects.
              </p>

              {/* Duration Badge */}
              <div className="inline-flex items-center gap-2 bg-white/90 border border-neutral-300 rounded-full px-4 py-1.5 text-[13px] font-bold text-neutral-800 mb-6 shadow-2xs">
                <Clock className="w-4 h-4 text-[#17479E]" />
                <span>6 Months</span>
              </div>

              {/* Brochure Button */}
              <button
                type="button"
                onClick={() => onOpenBrochure?.("Hero Brochure", "Download Brochure")}
                className="py-3 px-7 rounded-[8px] bg-[#17479E] hover:bg-[#123980] text-white font-bold text-[14px] flex items-center justify-center gap-2 border-none shadow-md cursor-pointer active:scale-98 transition-all"
              >
                <span>Get Brochure</span>
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column: Lead Form Card */}
            <div className="md:col-span-5 flex justify-end">
              <div className="w-full max-w-[400px]">
                <LandingLeadForm
                  variant="white"
                  primaryColor="#17479E"
                  universityName="IIM Kozhikode"
                  courses={coursesList}
                  defaultCourse="HR & Analytics"
                  title="Admission Open"
                  subtitle="Academic Experts will assist you!"
                  phoneText="+91 7065 7777 55"
                  phoneHref="tel:07065777755"
                  showPhoneBadge={true}
                  config={{
                    hideTermsCheckbox: true,
                    phoneBeforeEmail: false,
                    colors: {
                      phoneBackground: "#17479E",
                      phoneText: "#ffffff",
                      buttonBackground: "#17479E",
                    },
                  }}
                  brand={{
                    hero: {
                      hideTermsCheckbox: true,
                      phoneBadgeBg: "#17479E",
                      phoneBadgeColor: "#ffffff",
                      phoneBadgeIconColor: "#ffffff",
                    },
                  }}
                  source="landing_iim"
                  campaign="iim_lead_campaign"
                  onSuccess={onLeadSuccess}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
