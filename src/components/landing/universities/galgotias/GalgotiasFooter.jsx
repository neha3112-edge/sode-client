"use client";

import React from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { galgotiasImg } from "./constants";

export default function GalgotiasFooter({
  onOpenScholarship,
  onOpenBrochure,
  onOpenLegal,
  onOpenCompare,
}) {
  return (
    <>
      {/* 1. Still Confused? Comparison Card Section */}
      <section className="w-full bg-[#fffaf8] px-5 sm:px-10 lg:px-[60px] pt-8 sm:pt-10 pb-0 select-none">
        <div className="w-full bg-[#b2171e] rounded-[20px] px-6 py-8 sm:py-10 flex flex-col items-center justify-center text-center text-white relative shadow-sm">
          <h2 className="text-white font-extrabold text-[24px] sm:text-[28px] md:text-[32px] leading-tight m-0">
            Still Confused?
          </h2>
          <h3 className="text-white/95 font-medium text-[14px] sm:text-[15px] leading-snug mt-2 mb-2 sm:mb-3">
            Compare Galgotias University with Top UGC-DEB Approved Universities
          </h3>

          {/* Circular Downward Arrow (Overlapping Bottom) */}
          <button
            type="button"
            onClick={onOpenCompare}
            aria-label="Compare Universities"
            className="absolute -bottom-8 sm:-bottom-9 left-1/2 -translate-x-1/2 cursor-pointer transition-transform duration-200 hover:scale-105 select-none bg-transparent border-none p-0 focus:outline-hidden z-10"
          >
            <div className="relative w-[66px] h-[66px] sm:w-[70px] sm:h-[70px] rounded-full overflow-hidden">
              <Image
                src={galgotiasImg("arrow.gif")}
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
        {/* SODE Logo */}
        <div className="w-full flex justify-center mb-3 sm:mb-4 px-4">
          <button
            type="button"
            onClick={() => onOpenBrochure?.("Footer Logo Click")}
            className="cursor-pointer bg-transparent border-none p-0 inline-block focus:outline-hidden w-full max-w-[360px] sm:max-w-[520px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[850px]"
          >
            <Image
              src={galgotiasImg("new-des-logo.webp")}
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

        {/* Bottom Dark Blue Copyright Bar */}
        <div className="w-full bg-[#0b3c66] py-3 text-center text-white text-[12px] sm:text-[13px] font-normal tracking-wide">
          &copy; 2026 SODE Counseling Services LLP
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 sm:bottom-24 right-4 z-40 flex flex-col gap-2.5 items-end pointer-events-auto">
        {/* Floating Call Button */}
        <a
          href="tel:+917065777755"
          aria-label="Call Expert"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-lg transition-transform hover:scale-110 active:scale-95 block"
        >
          <Image
            src={galgotiasImg("call_icon.gif")}
            alt="Call Us"
            width={56}
            height={56}
            className="w-full h-full object-cover"
            unoptimized
          />
        </a>

        {/* Floating Gift / Scholarship Button */}
        <button
          type="button"
          onClick={onOpenScholarship}
          aria-label="Open Scholarship"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-lg transition-transform hover:scale-110 active:scale-95 border-none p-0 cursor-pointer block"
        >
          <Image
            src={galgotiasImg("gift.gif")}
            alt="Scholarship Coupon"
            width={56}
            height={56}
            className="w-full h-full object-cover"
            unoptimized
          />
        </button>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#bc1820] py-2 px-3 shadow-[0_-2px_10px_rgba(0,0,0,0.15)] flex items-center justify-between gap-2.5">
        <a
          href="https://api.whatsapp.com/send?phone=917065777755&text=Hi%20I%20am%20interested%20in%20Galgotias%20University%20Online%20Courses"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25d366] text-white font-bold text-[13px] py-2.5 px-3 rounded-full flex items-center justify-center gap-1.5 shadow-sm text-center no-underline"
        >
          <FaWhatsapp className="w-4 h-4 fill-current shrink-0" />
          <span>Get Brochure</span>
        </a>

        <button
          type="button"
          onClick={() => onOpenBrochure?.("Galgotias Sticky Bar Apply Now")}
          className="flex-1 bg-white text-[#bc1820] font-bold text-[13px] py-2.5 px-3 rounded-full flex items-center justify-center gap-1 shadow-sm border-none cursor-pointer"
        >
          <span>Apply Now &raquo;</span>
        </button>
      </div>
    </>
  );
}

