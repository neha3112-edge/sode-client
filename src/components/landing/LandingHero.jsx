"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "antd";
import LandingLeadForm from "./LandingLeadForm";

export default function LandingHero({
  brand = {},
  courses = [],
  onOpenBrochure,
  onOpenApply,
  onOpenDisclaimer,
}) {
  const {
    name = "University Online",
    hashtag = "#YourFutureBeginsHere",
    headline = "University Online",
    tagline1 = "Learn from Anywhere,",
    tagline2 = "Grow Everywhere",
    logo,
    campusImage = "/assets/images/amity_campus.png",
    coursesStrip = ["MBA | MCA | MCOM | MA | MSC", "| BBA | BCA | BCOM | BA"],
  } = brand;

  return (
    <>
      <section id="hero" className="relative py-4 sm:py-6 lg:py-8 overflow-hidden flex items-center">
        {/* Background Campus Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image src={campusImage} alt={name} fill priority className="object-cover object-right md:object-[right_center]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
              {logo && (
                <div className="flex items-center">
                  <Image src={logo} alt={name} width={200} height={60} className="h-9 sm:h-12 w-auto object-contain" priority />
                </div>
              )}
              <p className="text-xs sm:text-sm font-semibold text-slate-800 tracking-normal !mt-1">{hashtag}</p>
              <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#08417b] leading-tight !mt-0.5">{headline}</h1>
              <div className="text-xs sm:text-sm font-normal text-slate-800 leading-snug !mt-0.5">
                <p>{tagline1}</p>
                <p>{tagline2}</p>
              </div>

              {/* Courses Badge Strip */}
              <div className="pt-1 max-w-md">
                <span className="inline-block px-2.5 py-0.5 bg-[#ffc107] text-[#08417b] font-black text-[11px] sm:text-xs rounded-md shadow-2xs mb-[-6px] ml-2 relative z-10">
                  Online Degree Courses :
                </span>
                <div className="bg-white/95 backdrop-blur-xs border-2 border-[#08417b] rounded-md p-2.5 pt-3 shadow-xs">
                  <div className="font-black text-xs sm:text-base text-[#08417b] leading-snug">
                    {coursesStrip.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Brochure CTA */}
              <div className="pt-1">
                <Button
                  type="primary"
                  size="large"
                  icon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => onOpenBrochure?.()}
                  className="!bg-[#08417b] hover:!bg-[#063366] !text-white !font-bold !text-xs sm:!text-sm !h-10 !rounded-md !border-none !shadow-sm"
                >
                  Download Brochure
                </Button>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                <LandingLeadForm
                  universityName={name}
                  courseList={courses}
                  formName="Hero Enquiry Form"
                  buttonText="Submit"
                  onOpenDisclaimer={onOpenDisclaimer}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Strip Banner */}
      <div className="bg-[#ffd200] py-2 px-4 text-center shadow-xs">
        <h2 className="text-base sm:text-xl lg:text-[26px] font-bold text-[#08417b] leading-snug m-0">
          {name} Recognition and Approvals
        </h2>
      </div>
    </>
  );
}
