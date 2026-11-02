"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function VguApprovals({ approvals = [], brand = {} }) {
  const cfg = brand.approvalsConfig || {};
  const containerClass =
    cfg.containerClassName ||
    brand.approvalsContainerClassName ||
    "max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8";
  const sectionDescription =
    brand.approvalsDescription ||
    "Vivekananda Global University Online Courses are UGC-recognised and have top accreditations and approvals from the country's recognised statutory bodies.";

  const buttonBg = cfg.buttonBg || cfg.buttonBackground || "#FFD508";
  const buttonTextColor = cfg.buttonTextColor || cfg.buttonColor || "#000000";
  const buttonText = cfg.buttonText || "Enquire Now";

  return (
    <section id="approval" className="w-full py-7 sm:py-8 lg:py-10 bg-white border-b border-slate-200 scroll-mt-20 select-none">
      <div id="approvals" className="sr-only"></div>
      <div className={containerClass}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Heading, Description, Enquire Button */}
          <div className="lg:col-span-5 text-left">
            <h2 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold text-[#811811] leading-[1.25] tracking-tight m-0 mb-2 sm:mb-2.5">
              Vivekananda Global University <br className="hidden sm:inline" />
              Online Accreditation &amp; Approval
            </h2>

            <p className="text-[13px] sm:text-[13.5px] text-[#4b5563] leading-[1.5] font-normal m-0 max-w-[440px]">
              {sectionDescription.replace(/\n/g, " ")}
            </p>

            <div className="pt-3.5 sm:pt-4">
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
                className="font-bold text-[14px] px-6 py-2.5 rounded-[5px] hover:brightness-95 active:scale-95 transition-all cursor-pointer border-none leading-normal shadow-none inline-flex items-center justify-center"
              >
                {buttonText}
              </button>
            </div>
          </div>

          {/* Right Column: Pill-shaped Accreditations Cards (2x2 Grid) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {approvals.map((appr, idx) => {
                const data = normalizeApprovalItem(appr, idx);
                const fullText = appr.text || appr.title || data.title || data.description;

                const renderCardText = () => {
                  if (Array.isArray(appr.lines) && appr.lines.length > 0) {
                    return appr.lines.map((line, lIdx) => (
                      <React.Fragment key={lIdx}>
                        {line}
                        {lIdx < appr.lines.length - 1 && <br />}
                      </React.Fragment>
                    ));
                  }
                  if (typeof fullText === "string" && fullText.includes("\n")) {
                    return fullText.split("\n").map((line, lIdx, arr) => (
                      <React.Fragment key={lIdx}>
                        {line}
                        {lIdx < arr.length - 1 && <br />}
                      </React.Fragment>
                    ));
                  }
                  if (typeof fullText === "string") {
                    if (fullText.includes("University Grants Commission")) {
                      return (
                        <>
                          Recognised by the University
                          <br />
                          Grants Commission of India
                          <br />
                          (UGC)
                        </>
                      );
                    }
                    if (fullText.includes("National Assessment")) {
                      return (
                        <>
                          Accredited by the National
                          <br />
                          Assessment and Accreditation
                          <br />
                          Council (NAAC)
                        </>
                      );
                    }
                    if (fullText.includes("Technical Education")) {
                      return (
                        <>
                          Approved by the All India Council
                          <br />
                          for Technical Education (AICTE)
                        </>
                      );
                    }
                    if (fullText.includes("QS World")) {
                      return (
                        <>
                          Globally ranked by QS World
                          <br />
                          University Rankings
                        </>
                      );
                    }
                  }
                  return fullText;
                };

                return (
                  <div
                    key={data.id || idx}
                    className="vgu-approval-card bg-white rounded-full border border-[#4D4D4D] px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-3 sm:gap-3.5 transition-all hover:border-black shadow-2xs"
                  >
                    <div className="relative w-[48px] h-[48px] sm:w-[50px] sm:h-[50px] shrink-0 flex items-center justify-center">
                      <Image
                        src={data.image}
                        alt={data.tag || "Approval"}
                        fill
                        className="object-contain"
                        sizes="60px"
                      />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <p
                        style={{ letterSpacing: "0.25px" }}
                        className="text-[13px] sm:text-[13.5px] lg:text-[14px] font-medium text-[#000000] leading-[1.28] tracking-[0.25px] m-0"
                      >
                        {renderCardText()}
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
