"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function VguApprovals({ approvals = [], brand = {} }) {
  const cfg = brand.approvalsConfig || {};
  const containerClass =
    cfg.containerClassName ||
    brand.approvalsContainerClassName ||
    "max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20";
  const sectionDescription =
    brand.approvalsDescription ||
    "Vivekananda Global University Online Courses are UGC-recognised and have top accreditations and approvals from the country's recognised statutory bodies.";

  const buttonBg = cfg.buttonBg || cfg.buttonBackground || "#ffc107";
  const buttonTextColor = cfg.buttonTextColor || cfg.buttonColor || "#000000";
  const buttonText = cfg.buttonText || "Enquire Now";

  return (
    <section id="approval" className="w-full py-10 sm:py-14 bg-white border-b border-slate-200 scroll-mt-20 select-none">
      <div className={containerClass}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Description, Enquire Button */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4 text-left">
            <h2 className="text-[24px] sm:text-[28px] lg:text-[31px] font-normal text-[#811811] leading-[1.2] tracking-tight m-0">
              Vivekananda Global University
              <br />
              Online Accreditation & Approval
            </h2>

            <p className="text-[13px] sm:text-[14px] text-[#4b5563] leading-[1.6] font-normal m-0 max-w-[440px]">
              {sectionDescription}
            </p>

            <div className="pt-1.5">
              <button
                type="button"
                onClick={() => {
                  const heroEl = document.getElementById("hero") || document.getElementById("banner");
                  heroEl?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  backgroundColor: buttonBg,
                  color: buttonTextColor,
                }}
                className="font-bold text-[14px] sm:text-[14.5px] px-8 py-2.5 rounded-[6px] shadow-xs hover:opacity-95 active:scale-95 transition-all cursor-pointer border-none"
              >
                {buttonText}
              </button>
            </div>
          </div>

          {/* Right Column: Pill-shaped Accreditations Cards (2x2 Grid) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-4.5">
              {approvals.map((appr, idx) => {
                const data = normalizeApprovalItem(appr, idx);
                const fullText = appr.text || appr.title || data.title || data.description;
                return (
                  <div
                    key={data.id || idx}
                    className="bg-white rounded-full border border-slate-600 px-4 sm:px-5 py-3 sm:py-3.5 flex items-center gap-3 sm:gap-3.5 transition-all hover:border-slate-800"
                  >
                    <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center">
                      <Image
                        src={data.image}
                        alt={data.tag || "Approval"}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <p className="text-[11.5px] sm:text-[12px] lg:text-[12.5px] font-semibold text-[#1f2937] leading-[1.32] m-0">
                        {fullText}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
