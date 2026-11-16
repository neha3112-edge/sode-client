"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { esgciImg, ESGCI_ADVANTAGES } from "./constants";

export default function EsgciAdvantages({ onOpenBrochure }) {
  return (
    <section id="benefits" className="benefits-section w-full relative select-none overflow-hidden">
      <style jsx>{`
        .benefits-section {
          background-color: #04903c;
          background-image: url('${esgciImg("benefits-mobile.webp")}');
          background-size: 100% auto;
          background-position: center bottom;
          background-repeat: no-repeat;
          padding-top: 28px;
          padding-bottom: 280px;
        }
        @media (min-width: 640px) {
          .benefits-section {
            padding-bottom: 320px;
          }
        }
        @media (min-width: 1024px) {
          .benefits-section {
            background-image: url('${esgciImg("benifits.webp")}');
            background-size: cover;
            background-position: left top;
            background-repeat: no-repeat;
            padding-top: 36px;
            padding-bottom: 32px;
          }
        }
      `}</style>

      {/* ===================== DESKTOP VIEW (hidden lg:block) ===================== */}
      <div className="hidden lg:block max-w-[1360px] mx-auto px-6 xl:px-8 text-white relative z-10">
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Left Spacer for man at laptop in benifits.webp */}
          <div className="col-span-4 xl:col-span-3.5" aria-hidden="true" />

          {/* Right Content */}
          <div className="col-span-8 xl:col-span-8.5 flex flex-col items-start pl-2">
            {/* Header */}
            <div className="text-left mb-3.5 sm:mb-4">
              <h2 className="text-[22px] xl:text-[25px] font-black uppercase tracking-tight m-0 leading-tight text-white">
                PROFESSIONAL ADVANTAGES OF
              </h2>
              <p className="text-[15px] xl:text-[16px] font-medium text-white/95 m-0 mt-0.5">
                Completing the ESGCI Online DBA
              </p>
            </div>

            {/* 3 Columns of Horizontal Cards */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full">
              {ESGCI_ADVANTAGES.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-[8px] px-3.5 py-2.5 flex items-center gap-2.5 shadow-xs text-neutral-900 transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                    <Image
                      src={esgciImg(item.image)}
                      alt={item.title}
                      width={32}
                      height={32}
                      className="max-h-[30px] max-w-[30px] w-auto h-auto object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <h4 className="text-[12px] xl:text-[12.5px] font-bold text-neutral-900 m-0 leading-snug">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>

            {/* Black CTA Button on left under cards */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => onOpenBrochure?.("Advantages Enroll CTA", "Enroll Now")}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-[5px] text-[13px] font-bold shadow-sm cursor-pointer border-none active:scale-98 transition-all"
              >
                <span>Enroll &amp; Get Your DBA Degree</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#ffd200]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== MOBILE VIEW (block lg:hidden) ===================== */}
      <div className="block lg:hidden w-full px-4 sm:px-6 text-white text-center relative z-10">
        {/* Header */}
        <div className="text-left mb-5">
          <h2 className="text-[21px] sm:text-[24px] font-black uppercase tracking-tight m-0 leading-tight text-white">
            PROFESSIONAL ADVANTAGES OF
          </h2>
          <p className="text-[14.5px] sm:text-[16px] font-medium text-white/95 m-0 mt-1">
            Completing the ESGCI Online DBA
          </p>
        </div>

        {/* 2-Column Vertical Cards matching mobile screenshot */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
          {ESGCI_ADVANTAGES.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-[14px] p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs text-neutral-900 min-h-[110px]"
            >
              {/* Centered Circular Icon on Top */}
              <div className="w-12 h-12 shrink-0 mb-2 flex items-center justify-center">
                <Image
                  src={esgciImg(item.image)}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="max-h-[44px] max-w-[44px] w-auto h-auto object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>

              {/* Title Centered Below Icon */}
              <h4 className="text-[12px] sm:text-[13px] font-bold text-neutral-900 m-0 leading-tight">
                {item.title}
              </h4>
            </div>
          ))}
        </div>

        {/* Black CTA Button directly under the cards */}
        <div className="mt-4 sm:mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => onOpenBrochure?.("Advantages Enroll CTA", "Enroll Now")}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-black text-white rounded-[5px] text-[13px] font-bold shadow-sm cursor-pointer border-none active:scale-98 transition-all"
          >
            <span>Enroll &amp; Get Your DBA Degree</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#ffd200]" />
          </button>
        </div>
      </div>
    </section>
  );
}
