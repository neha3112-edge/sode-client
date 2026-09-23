"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import LandingLeadForm from "./LandingLeadForm";

export default function LandingHero({
  brand = {},
  courses = [],
  onOpenBrochure,
  onOpenApply,
  onOpenDisclaimer,
}) {
  const {
    name = "Amity University Online",
    hashtag = "#YourFutureBeginsHere",
    headline = "Amity University Online",
    tagline1 = "Learn from Anywhere,",
    tagline2 = "Grow Everywhere",
    phone = "+91 7065 7777 55",
    campusImage = "/assets/images/amity_hero_student_hd.jpg",
    coursesStrip = [
      "MBA | MCA | MCOM | MA | MSC",
      "| BBA | BCA | BCOM | BA",
    ],
  } = brand;

  return (
    <>
      <section
        id="hero"
        className="relative py-3.5 sm:py-4 lg:py-5 overflow-hidden flex items-center bg-slate-50"
      >
        {/* Background Image: Office glass building with student in center */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={campusImage}
            alt={name}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center md:object-[center_top]"
          />
          {/* Subtle soft white gradient overlay on left for text legibility */}
          <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/40 to-transparent lg:w-3/5" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-1.5 sm:space-y-2">
              {/* Hashtag */}
              <p className="text-xs sm:text-sm font-semibold text-slate-800 tracking-normal m-0">
                {hashtag}
              </p>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-[38px] xl:text-[42px] font-black tracking-tight text-[#08417b] leading-[1.1] m-0">
                {headline}
              </h1>

              {/* Taglines */}
              <div className="text-xs sm:text-sm font-medium text-slate-800 leading-snug pt-0.5">
                <p className="m-0">{tagline1} {tagline2}</p>
              </div>

              {/* Online Degree Courses Box */}
              <div className="pt-1 max-w-100">
                {/* Yellow Badge Pill */}
                <div className="inline-block px-3 py-0.5 bg-[#ffd200] text-slate-950 font-bold text-[11px] sm:text-xs rounded-full shadow-2xs mb-[-8px] ml-3 relative z-10">
                  Online Degree Courses :
                </div>

                {/* Blue Outlined Course Strip Box */}
                <div className="bg-white/95 backdrop-blur-xs border-2 border-[#08417b] rounded-md p-2.5 pt-3 shadow-sm">
                  <div className="font-extrabold text-xs sm:text-[15px] text-[#08417b] leading-snug tracking-wide">
                    {coursesStrip.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Download Brochure Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => onOpenBrochure?.()}
                  className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-700 font-bold text-xs sm:text-sm h-9 px-4 rounded-md shadow-2xs inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <span>Download Brochure</span>
                  <Download className="w-3.5 h-3.5 text-slate-900 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
              <LandingLeadForm
                universityName={name}
                courseList={courses}
                phone={phone}
                formName="Hero Enquiry Form"
                buttonText="Submit"
                onOpenDisclaimer={onOpenDisclaimer}
              />
            </div>
          </div>
        </div>
      </section>


      {/* Recognition Strip Banner */}
      <div className="bg-[#ffd200] py-2 sm:py-2.5 px-4 text-center shadow-xs">
        <h2 className="text-base sm:text-xl lg:text-[22px] font-bold text-[#08417b] leading-snug m-0">
          {name} Recognition and Approvals
        </h2>
      </div>
    </>
  );
}
