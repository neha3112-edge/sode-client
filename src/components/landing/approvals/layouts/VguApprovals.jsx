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

  const buttonBg = cfg.buttonBg || cfg.buttonBackground || "#ffd508";
  const buttonTextColor = cfg.buttonTextColor || cfg.buttonColor || "#000000";
  const buttonText = cfg.buttonText || "Enquire Now";

  return (
    <section id="approval" className="w-full py-8 sm:py-14 bg-white border-b border-slate-200 scroll-mt-20 select-none">
      <div className={containerClass}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-center">
          {/* Left Column: Heading, Description, Enquire Button */}
          <div className="lg:col-span-5 text-left">
            <h3 className="text-[22px] sm:text-[28px] lg:text-[34px] font-bold text-[#811811] leading-[1.22] tracking-tight m-0 mb-4 sm:mb-5">
              Vivekananda Global
              <br />
              University Online
              <br />
              Accreditation &amp; Approval
            </h3>

            <p className="text-[13px] sm:text-[14px] text-[#374151] leading-[1.55] font-normal m-0 max-w-[440px]">
              Vivekananda Global University Online
              <br />
              Courses are UGC-recognised and have
              <br />
              top accreditations and approvals from
              <br />
              the country&apos;s recognised statutory
              <br />
              bodies.
            </p>

            <div className="pt-4 sm:pt-5">
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
                className="font-bold text-[14.5px] sm:text-[15px] px-8 py-3 rounded-[6px] hover:brightness-95 active:scale-95 transition-all cursor-pointer border-none leading-normal shadow-none inline-flex items-center justify-center"
              >
                {buttonText}
              </button>
            </div>
          </div>

          {/* Right Column: Pill-shaped Accreditations Cards (2x2 Grid) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4.5 lg:gap-5">
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
                          Recognised by the
                          <br />
                          University Grants Commission
                          <br />
                          of India (UGC)
                        </>
                      );
                    }
                    if (fullText.includes("National Assessment")) {
                      return (
                        <>
                          Accredited by the
                          <br />
                          National Assessment and
                          <br />
                          Accreditation Council (NAAC)
                        </>
                      );
                    }
                    if (fullText.includes("Technical Education")) {
                      return (
                        <>
                          Approved by the
                          <br />
                          All India Council for
                          <br />
                          Technical Education (AICTE)
                        </>
                      );
                    }
                    if (fullText.includes("QS World")) {
                      return (
                        <>
                          Globally ranked
                          <br />
                          by QS World
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
                    className="bg-white rounded-[30px] sm:rounded-full border border-slate-500/80 px-5 sm:px-6 py-4 sm:py-4.5 flex items-center gap-4 sm:gap-4.5 transition-all hover:border-slate-800 shadow-2xs"
                  >
                    <div className="relative w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] shrink-0 flex items-center justify-center">
                      <Image
                        src={data.image}
                        alt={data.tag || "Approval"}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <p className="text-[13px] sm:text-[13.5px] lg:text-[14px] font-semibold text-[#1f2937] leading-[1.38] m-0">
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
