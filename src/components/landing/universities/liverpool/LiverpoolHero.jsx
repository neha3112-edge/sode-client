"use client";

import React from "react";
import Image from "next/image";
import { Download, BookOpen, Globe, ShieldCheck, Clock } from "lucide-react";
import LandingLeadForm from "../../LandingLeadForm";
import { liverpoolImg } from "./constants";

export default function LiverpoolHero({ onOpenBrochure, onLeadSuccess }) {
  const highlights = [
    { icon: BookOpen, text: "Three Decades of Excellence" },
    { icon: Globe, text: "LBS–IIM U Credential Pathway" },
    { icon: ShieldCheck, text: "Globally Recognised" },
    { icon: Clock, text: "18 Months" },
  ];

  const courseOptions = [
    { value: "MBA in Business Analytics", label: "MBA in Business Analytics" },
    { value: "MBA in Finance", label: "MBA in Finance" },
    { value: "MBA in Marketing", label: "MBA in Marketing" },
    { value: "MBA in Leadership", label: "MBA in Leadership" },
    { value: "MBA in Human Resource Management", label: "MBA in Human Resource Management" },
    { value: "MBA in Operations and Supply Chain Management", label: "MBA in Operations and Supply Chain Management" },
  ];

  return (
    <section id="hero" className="w-full relative select-none">
      {/* ======================================================== */}
      {/* 1. MOBILE HERO VIEW (Hidden on Desktop >= md)           */}
      {/* ======================================================== */}
      <div className="md:hidden w-full bg-white flex flex-col">
        {/* Top Text Content */}
        <div className="w-full px-4 pt-4 pb-2 text-center">
          <p className="text-[#333333] text-[13px] font-semibold leading-snug m-0 mb-1">
            Where Global Business Education Meets Leadership Excellence
          </p>

          <h1
            className="font-[family-name:var(--font-anton)] text-[34px] sm:text-[38px] font-normal tracking-wide text-[#00408d] leading-none m-0 my-0.5 text-center"
            style={{ fontFamily: "var(--font-anton), 'Anton', sans-serif" }}
          >
            Online MBA
          </h1>

          <p className="text-[13px] font-semibold text-[#111111] m-0 mt-1 mb-2.5 leading-snug">
            By <span className="underline decoration-[#00408d] font-bold">Liverpool Business School</span> with{" "}
            <span className="underline decoration-[#00408d] font-bold">IIM Udaipur</span> via{" "}
            <span className="font-extrabold text-[#e01a22]">upGrad</span>.
          </p>

          {/* 4 Feature Badges */}
          <div className="flex flex-col gap-1.5 items-center justify-center my-2 max-w-[320px] mx-auto text-left">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5 w-full py-0">
                  <Icon className="w-3.5 h-3.5 text-[#00bcd4] shrink-0" />
                  <span className="text-[12.5px] font-semibold text-[#222222] leading-tight">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Building Graphic Image (Includes Liverpool + IIMU + upGrad logo at top) */}
        <div className="w-full relative bg-white">
          <Image
            src={liverpoolImg("liverpool_mobile_new_img.png")}
            alt="Liverpool John Moores University Campus"
            width={800}
            height={526}
            priority
            className="w-full h-auto object-contain block"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Lead Form Card (Smoothly follows below graphic) */}
        <div className="w-full px-4 pt-2 pb-8 bg-white relative z-20 flex justify-center">
          <div className="w-full max-w-[400px]">
            <LandingLeadForm
              variant="white"
              primaryColor="#00408d"
              hideTermsCheckbox={true}
              courseOptions={courseOptions}
              onSuccess={onLeadSuccess}
              config={{
                title: "Admission Open",
                subtitle: "Academic Experts will assist you!",
                phoneBadge: "+91 7065 7777 55",
                phoneLink: "tel:+917065777755",
                buttonText: "Submit",
              }}
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP HERO VIEW (Hidden on Mobile < md)            */}
      {/* ======================================================== */}
      <div className="hidden md:block w-full relative min-h-[560px] lg:min-h-[600px] overflow-hidden">
        {/* Background Campus Image */}
        <Image
          src={liverpoolImg("liverpool_desktop_new_bg.webp")}
          alt="Liverpool John Moores University Campus Background"
          fill
          priority
          sizes="(max-width: 768px) 0vw, 100vw"
          className="object-cover object-center pointer-events-none"
        />

        {/* Foreground Content */}
        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Info & Highlights */}
            <div className="md:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
              {/* Partner Logos */}
              <div className="mb-2.5">
                <Image
                  src={liverpoolImg("logo_for_liverpool_upgrade.png")}
                  alt="Liverpool Business School, IIM Udaipur, upGrad"
                  width={340}
                  height={50}
                  priority
                  className="h-9 lg:h-11 w-auto object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>

              {/* Subtitle */}
              <p className="text-[#1a1a1a] text-[14px] lg:text-[15.5px] font-semibold tracking-normal m-0 mb-1 leading-snug">
                Where Global Business Education Meets Leadership Excellence
              </p>

              {/* Main Headline */}
              <h1
                className="font-[family-name:var(--font-anton)] text-[44px] lg:text-[54px] xl:text-[60px] font-normal tracking-wide text-[#00408d] leading-none m-0 my-0.5 text-left"
                style={{ fontFamily: "var(--font-anton), 'Anton', sans-serif" }}
              >
                Online MBA
              </h1>

              {/* Tagline */}
              <p className="text-[13.5px] lg:text-[14.5px] font-medium text-[#222222] m-0 mt-1 mb-3.5 leading-snug max-w-[560px]">
                By <span className="underline decoration-[#00408d] font-bold">Liverpool Business School</span> with{" "}
                <span className="underline decoration-[#00408d] font-bold">IIM Udaipur</span> via{" "}
                <span className="font-extrabold text-[#e01a22]">upGrad</span>.
              </p>

              {/* 4 Highlights Bullets */}
              <div className="flex flex-col gap-1.5 mb-4">
                {highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#00bcd4] shrink-0" />
                      <span className="text-[13.5px] lg:text-[14px] font-bold text-[#222222] leading-tight">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Download Brochure CTA Button */}
              <button
                type="button"
                onClick={() => onOpenBrochure?.("Hero CTA", "Download Brochure")}
                className="py-2.5 px-6 rounded-lg bg-[#00408d] hover:bg-[#00306b] text-white font-bold text-[14px] flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 active:scale-98 border-none mt-1"
              >
                <Download className="w-4 h-4" />
                <span>Download Brochure</span>
              </button>
            </div>

            {/* Right Column: Admission Lead Form */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="w-full max-w-[390px]">
                <LandingLeadForm
                  variant="white"
                  primaryColor="#00408d"
                  hideTermsCheckbox={true}
                  courseOptions={courseOptions}
                  onSuccess={onLeadSuccess}
                  config={{
                    title: "Admission Open",
                    subtitle: "Academic Experts will assist you!",
                    phoneBadge: "+91 7065 7777 55",
                    phoneLink: "tel:+917065777755",
                    buttonText: "Submit",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

