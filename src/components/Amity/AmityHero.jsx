"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import AmityLeadForm from "./AmityLeadForm";

export default function AmityHero({ onOpenBrochure, onOpenApply, onOpenDisclaimer }) {
  return (
    <>
      <section
        id="hero"
        className="relative py-4 sm:py-6 lg:py-8 overflow-hidden flex items-center"
      >
        {/* Campus Background Image directly with no white overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/assets/images/amity_campus.png"
            alt="Amity University Campus"
            fill
            priority
            className="object-cover object-right md:object-[right_center]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
              {/* Amity Online Official Logo */}
              <div className="flex items-center">
                <Image
                  src="/assets/images/amity_online_logo.png"
                  alt="Amity University Online"
                  width={200}
                  height={60}
                  className="h-9 sm:h-12 w-auto object-contain"
                  priority
                />
              </div>

              {/* Hashtag */}
              <p className="text-xs sm:text-sm font-semibold text-slate-800 tracking-normal !mt-1">
                #YourFutureBeginsHere
              </p>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#08417b] leading-tight !mt-0.5">
                Amity University Online
              </h1>

              {/* Subheading */}
              <div className="text-xs sm:text-sm font-normal text-slate-800 leading-snug !mt-0.5">
                <p>Learn from Anywhere,</p>
                <p>Grow Everywhere</p>
              </div>

              {/* Highlight Degree Courses Box */}
              <div className="pt-1 max-w-md">
                {/* Yellow Tag */}
                <span className="inline-block px-2.5 py-0.5 bg-[#ffc107] text-[#08417b] font-black text-[11px] sm:text-xs rounded-md shadow-2xs mb-[-6px] ml-2 relative z-10">
                  Online Degree Courses :
                </span>

                {/* White Container with Blue Border */}
                <div className="bg-white/95 backdrop-blur-xs border-2 border-[#08417b] rounded-md p-2.5 pt-3 shadow-xs">
                  <div className="font-black text-xs sm:text-base text-[#08417b] leading-snug">
                    <div>MBA | MCA | MCOM | MA | MSC</div>
                    <div>| BBA | BCA | BCOM | BA</div>
                  </div>
                </div>
              </div>

              {/* Download Brochure Button */}
              <div className="pt-1">
                <button
                  onClick={() => onOpenBrochure?.()}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-md bg-[#08417b] hover:bg-[#063366] text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <span>Download Brochure</span>
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Enquire Form Column */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                <AmityLeadForm
                  title="Enquire Now"
                  subtitle="Academic Experts will assist you!"
                  formName="Hero Enquiry Form"
                  buttonText="Submit"
                  onOpenDisclaimer={onOpenDisclaimer}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yellow Banner Strip at bottom of Hero */}
      <div className="bg-[#ffd200] py-1 sm:py-1 px-4 text-center shadow-xs">
        <h2 className="text-base text-gray-800 sm:text-xl lg:text-[28px] font-bold text-[#08417b] leading-snug">
          <div>Amity University Online</div>
          <div>Recognition and Approvals</div>
        </h2>
      </div>
    </>
  );
}
