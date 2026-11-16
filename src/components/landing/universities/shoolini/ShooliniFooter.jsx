"use client";

import React from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { shooliniImg } from "./constants";

export default function ShooliniFooter({
  onOpenScholarship,
  onOpenBrochure,
  onOpenLegal,
  onOpenCompare,
}) {
  return (
    <>
      {/* 1. Still Confused? Comparison Card Section */}
      <section className="w-full bg-[#fffaf8] px-5 sm:px-10 lg:px-[60px] pt-8 sm:pt-10 pb-0 select-none">
        <div className="w-full bg-[#fd202a] rounded-[20px] px-6 py-8 sm:py-10 flex flex-col items-center justify-center text-center text-white relative shadow-sm">
          <h2 className="text-white font-extrabold text-[24px] sm:text-[28px] md:text-[32px] leading-tight m-0">
            Still Confused?
          </h2>
          <h4 className="text-white/95 font-medium text-[14px] sm:text-[15px] leading-snug mt-2 mb-2 sm:mb-3">
            Compare Shoolini University Online with Top UGC-DEB Approved Universities
          </h4>

          {/* Circular Downward Arrow (Overlapping Bottom) */}
          <button
            type="button"
            onClick={onOpenCompare}
            aria-label="Compare Universities"
            className="absolute -bottom-8 sm:-bottom-9 left-1/2 -translate-x-1/2 cursor-pointer transition-transform duration-200 hover:scale-105 select-none bg-transparent border-none p-0 focus:outline-hidden z-10"
          >
            <div className="relative w-[66px] h-[66px] sm:w-[70px] sm:h-[70px] rounded-full overflow-hidden">
              <Image
                src={shooliniImg("arrow.gif")}
                alt="Compare University"
                fill
                sizes="70px"
                className="object-contain"
                unoptimized
              />
            </div>
          </button>
        </div>
      </section>

      {/* 2. SODE Logo, Legal Disclaimer & Copyright */}
      <section className="w-full bg-white pt-12 sm:pt-14 pb-0 text-center select-none">
        {/* SODE Logo (Extra large prominent size) */}
        <div className="w-full flex justify-center mb-3 sm:mb-4 px-4">
          <button
            type="button"
            onClick={() => onOpenBrochure?.("Footer Logo Click")}
            className="cursor-pointer bg-transparent border-none p-0 inline-block focus:outline-hidden w-full max-w-[360px] sm:max-w-[520px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[850px]"
          >
            <Image
              src={shooliniImg("new-des-logo.webp")}
              alt="Distance Education School - SODE"
              width={2002}
              height={522}
              priority
              className="w-full h-auto object-contain mx-auto"
              style={{ width: "100%", height: "auto" }}
              sizes="(max-width: 640px) 360px, (max-width: 768px) 520px, (max-width: 1024px) 700px, 850px"
            />
          </button>
        </div>

        {/* Disclaimer Paragraph & Legal Links */}
        <div className="w-full px-4 sm:px-8 lg:px-10 pt-1 pb-6 sm:pb-7 text-center">
          <p className="text-[#555555] text-[11px] sm:text-[12px] md:text-[12.5px] leading-[1.32] sm:leading-[1.38] m-0 mb-2 max-w-full">
            SODE Counselling Services LLP act as a marketing agency. All university names, logos,
            and trademarks mentioned are used for informational purposes only. We are not a
            university or an admission authority. Users are encouraged to verify information on
            the official website of the University before making decisions.
          </p>

          <div className="flex items-center justify-center gap-2 text-[12px] sm:text-[12.5px] text-[#222222] font-semibold">
            <button
              type="button"
              onClick={() => onOpenLegal?.("Disclaimer")}
              className="hover:underline text-[#222222] cursor-pointer bg-transparent border-none p-0 font-semibold"
            >
              Disclaimer
            </button>
            <span className="text-gray-400">|</span>
            <button
              type="button"
              onClick={() => onOpenLegal?.("Terms & Conditions")}
              className="hover:underline text-[#222222] cursor-pointer bg-transparent border-none p-0 font-semibold"
            >
              Terms &amp; Conditions
            </button>
            <span className="text-gray-400">|</span>
            <button
              type="button"
              onClick={() => onOpenLegal?.("Privacy Policy")}
              className="hover:underline text-[#222222] cursor-pointer bg-transparent border-none p-0 font-semibold"
            >
              Privacy Policy
            </button>
          </div>
        </div>

        {/* Dark Red/Crimson Copyright Bottom Strip */}
        <div className="w-full bg-[#111827] text-white py-3 px-4 text-xs sm:text-[13px] tracking-wide font-normal">
          © 2026 SODE Counseling Services LLP
        </div>
      </section>

      {/* 3. Floating Fixed Call & Scholarship Buttons - Hidden on mobile because of sticky bottom bar */}
      <div className="hidden md:flex fixed bottom-5 right-4 sm:right-6 z-40 flex-col items-center gap-2.5 sm:gap-3 pointer-events-auto">
        {/* Call Floating Button */}
        <a
          href="tel:07065777755"
          aria-label="Call Now"
          className="relative w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] rounded-full overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:scale-110 flex items-center justify-center bg-[#25d366]"
        >
          <Image
            src={shooliniImg("call_icon.gif")}
            alt="Call Us"
            fill
            sizes="56px"
            className="object-cover rounded-full"
            unoptimized
          />
        </a>

        {/* Scholarship Floating Gift Button */}
        <button
          type="button"
          onClick={onOpenScholarship}
          aria-label="Open Scholarship Coupon"
          className="relative w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] rounded-full overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:scale-110 flex items-center justify-center bg-[#28a745] border-none cursor-pointer p-0"
        >
          <Image
            src={shooliniImg("gift.gif")}
            alt="Scholarship Gift"
            fill
            sizes="56px"
            className="object-cover rounded-full"
            unoptimized
          />
        </button>
      </div>

      {/* 4. Mobile Sticky Bottom Action Bar with Official WhatsApp Icon */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-[99999] bg-[#fd202a] p-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.18)]">
        <div className="grid grid-cols-2 gap-2">
          {/* WhatsApp Get Brochure */}
          <a
            href="https://api.whatsapp.com/send/?phone=+917065777755&text=I%20want%20to%20download%20the%20Shoolini%20University%20Online%20Degree%20brochure"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25d366] text-white flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-[15px] font-bold no-underline shadow-sm active:scale-95 transition-all"
          >
            <FaWhatsapp className="text-[18px] shrink-0" />
            <span>Get Brochure</span>
          </a>

          {/* Apply Now Popup Button */}
          <button
            type="button"
            onClick={() => onOpenBrochure?.("Mobile Bottom Bar Apply")}
            className="bg-white text-[#fd202a] flex items-center justify-center gap-1 py-2 px-3 rounded-full text-[15px] font-bold border-none cursor-pointer shadow-sm active:scale-95 transition-all"
          >
            <span>Apply Now »</span>
          </button>
        </div>
      </div>
    </>
  );
}

