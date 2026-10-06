"use client";

import React, { useState } from "react";
import LandingContainer from "./LandingContainer";

export default function LandingFaq({ faqs = [], universityName = "University Online", brand = {} }) {
  const defaultOpen = brand.faqDefaultOpenIndex !== undefined ? brand.faqDefaultOpenIndex : 0;
  const [openIndex, setOpenIndex] = useState(defaultOpen); // default active index or null
  const headingColor = brand.faqHeaderColor || brand.primaryColor || "#08417b";
  const iconColor = brand.faqIconColor || brand.primaryColor || "#fd202a";

  if (!faqs || faqs.length === 0) return null;

  const isGgu =
    brand.slug === "ggu" ||
    brand.faqLayout === "ggu";

  const isMu =
    brand.slug === "mu" ||
    brand.faqLayout === "mu" ||
    brand.faqLayout === "mu-cards";

  const isSmu =
    brand.slug === "smu" ||
    brand.name?.toLowerCase().includes("sikkim") ||
    brand.faqLayout === "smu-cards";

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isUu =
    brand.slug === "uu" ||
    brand.faqLayout === "uu";

  const isIim =
    brand.slug === "iim" ||
    brand.faqLayout === "iim";

  // ==========================================
  // Layout: Uttaranchal University (UU) FAQ
  // ==========================================
  if (isUu) {
    const faqTitle = brand.faqTitle || "FAQ | Frequently Asked Question";
    return (
      <section id="faqs" aria-label="Frequently Asked Questions" className="py-10 sm:py-14 bg-white w-full select-none scroll-mt-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-[#003399] text-left m-0 mb-6 sm:mb-8 tracking-tight">
            {faqTitle}
          </h2>

          <div className="w-full divide-y divide-slate-200">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const rawQuestion = (faq.q || faq.question || "").replace(/^Q\d+[\.\:\s]*/i, "");

              return (
                <div key={idx} className="py-3 sm:py-3.5 transition-all">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left flex items-center justify-between gap-4 cursor-pointer bg-transparent border-none p-0 m-0"
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-[13.5px] sm:text-[15px] font-normal sm:font-medium text-[#222222] leading-snug m-0">
                      {rawQuestion}
                    </h3>
                    <span
                      className="w-6 h-6 rounded-[2px] bg-[#eef7ec] text-[#62B239] flex items-center justify-center font-bold text-[15px] leading-none shrink-0 ml-3 select-none"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-2.5 pb-1 text-[13px] sm:text-[13.5px] text-[#555555] leading-relaxed font-normal">
                      <p className="m-0 leading-relaxed font-normal">
                        {faq.a || faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (isIim) {
    const faqTitle = brand.faqTitle || "FAQ | Frequently Asked Questions";
    return (
      <section id="faqs">
        <div className="container">
          <div className="faq-title">
            <h2>{faqTitle}</h2>
          </div>
          <div className="faqs-section">
            <div className="accordion">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                const rawQ = faq.q || faq.question || "";
                const displayQ = rawQ.startsWith("Q") ? rawQ : `Q${idx + 1}. ${rawQ}`;
                return (
                  <div key={idx} className="accordion-item">
                    <div
                      className="accordion-header"
                      onClick={() => toggleFaq(idx)}
                      role="button"
                      tabIndex={0}
                    >
                      {displayQ}
                      <span className="span">{isOpen ? "−" : "+"}</span>
                    </div>
                    {isOpen && (
                      <div className="accordion-content" style={{ display: "block" }}>
                        {faq.a || faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout: Golden Gate University (GGU) FAQ
  // ==========================================
  if (isGgu) {
    const faqTitle = brand.faqTitle || "FAQ-Frequently Asked Questions";
    const accentColor = brand.faqAccentColor || "#003468";

    return (
      <section id="faqs" aria-label="Frequently Asked Questions" className="py-10 sm:py-14 bg-white w-full select-none scroll-mt-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-[#111111] text-left m-0 mb-6 sm:mb-8 tracking-tight">
            {faqTitle}
          </h2>

          <div className="space-y-3.5 w-full">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const rawQuestion = (faq.q || faq.question || "").replace(/^Q\d+[\.\:\s]*/i, "");

              return (
                <div
                  key={idx}
                  className="rounded-[3px] overflow-hidden bg-white transition-all shadow-2xs"
                  style={{
                    border: "1px solid #d1d5db",
                    borderLeft: `5px solid ${accentColor}`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-3.5 sm:py-4 text-left flex items-center justify-between gap-4 cursor-pointer bg-white hover:bg-slate-50/60 transition-colors border-none m-0"
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-[#111111] leading-snug m-0">
                      {rawQuestion}
                    </h3>
                    <span className="text-[18px] sm:text-[20px] font-normal text-slate-800 leading-none shrink-0 ml-3 select-none">
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 py-3.5 sm:py-4 bg-white border-t border-[#e5e7eb] text-[13px] sm:text-[13.5px] text-[#333333] leading-relaxed font-normal">
                      <p className="m-0 leading-relaxed font-normal">
                        {faq.a || faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // MU Layout: Exact Match with Reference Image
  // 1. Blue Header (#193579) when open with 5px orange left border
  // 2. Grey Header (#e0e6ec) when closed with 5px orange left border
  // 3. Orange circular toggle badge (+ / −)
  // 4. Shadowed answer box (#f7f7f7) with increased text size (15.5px)
  // ==========================================
  if (isMu) {
    const faqTitle = brand.faqTitle || "Frequently Asked Questions";
    return (
      <section
        id="faqs"
        className={brand.faqSectionClassName || "py-10 sm:py-14 lg:py-16 bg-white w-full select-none"}
      >
        <div className={brand.faqContainerClassName || "max-w-[1140px] mx-auto px-4 sm:px-6"}>
          {/* Header */}
          <h2
            className={
              brand.faqTitleClassName ||
              "text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[#193579] tracking-normal text-center m-0 mb-6 sm:mb-8"
            }
          >
            <span className="text-[#f97316]">FAQ - </span>
            {faqTitle.replace(/^FAQ\s*[-–:]*\s*/i, "")}
          </h2>

          {/* Cards List */}
          <div className={brand.faqListClassName || "space-y-3 sm:space-y-3.5 w-full"}>
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const rawQuestion = faq.q.replace(/^Q\d+[\.\:\-\s]*/i, "").trim();
              const prefix = brand.faqPrefix
                ? brand.faqPrefix.replace("{idx}", idx + 1)
                : `» Q${idx + 1}- `;
              const formattedQuestion = `${prefix}${rawQuestion}`;

              const headerClass = isOpen
                ? brand.faqHeaderOpenClassName ||
                "w-full pl-5 pr-4 sm:pl-6 sm:pr-5 pt-4.5 pb-3.5 sm:pt-5 sm:pb-4 text-left flex items-center justify-between gap-4 cursor-pointer bg-[#193579] text-white border-none rounded-t-lg rounded-b-none m-0 transition-colors shadow-xs relative overflow-hidden"
                : brand.faqHeaderClosedClassName ||
                "w-full pl-5 pr-4 sm:pl-6 sm:pr-5 pt-4.5 pb-3.5 sm:pt-5 sm:pb-4 text-left flex items-center justify-between gap-4 cursor-pointer bg-[#e0e6ec] text-[#111827] border-none rounded-lg m-0 hover:bg-[#d5dde5] transition-colors shadow-xs relative overflow-hidden";

              const questionClass = isOpen
                ? brand.faqQuestionOpenClassName ||
                "text-[15px] sm:text-[16.5px] font-medium text-white leading-snug"
                : brand.faqQuestionClosedClassName ||
                "text-[15px] sm:text-[16.5px] font-medium text-[#111827] leading-snug";

              const answerClass =
                brand.faqAnswerClassName ||
                "px-6 sm:px-8 py-5 sm:py-6 bg-[#f7f7f7] border-none rounded-b-lg rounded-t-none text-[14.5px] sm:text-[15.5px] text-[#222222] leading-[1.65] font-normal m-0";

              return (
                <div
                  key={idx}
                  className={brand.faqItemClassName || "w-full transition-all"}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className={`${headerClass} relative overflow-hidden`}
                    style={{
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      borderBottomLeftRadius: isOpen ? "0px" : "8px",
                      borderBottomRightRadius: isOpen ? "0px" : "8px",
                    }}
                    aria-expanded={isOpen}
                  >
                    {/* Orange Left Strip (Curved with button border radius) */}
                    <span
                      className={
                        brand.faqLeftStripClassName ||
                        "absolute left-0 top-0 bottom-0 w-[4px] sm:w-[5px] bg-[#f97316] pointer-events-none"
                      }
                      style={{
                        backgroundColor: brand.faqLeftStripColor || "#f97316",
                        borderTopLeftRadius: "8px",
                        borderBottomLeftRadius: isOpen ? "0px" : "8px",
                      }}
                    />
                    <span className={questionClass}>
                      {formattedQuestion}
                    </span>
                    <span
                      className={
                        brand.faqIconBadgeClassName ||
                        "w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-[#f97316] text-white flex items-center justify-center font-bold text-[14px] sm:text-[15px] leading-none shrink-0 shadow-xs select-none"
                      }
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      className={answerClass}
                      style={{
                        borderTopLeftRadius: "0px",
                        borderTopRightRadius: "0px",
                        borderBottomLeftRadius: "8px",
                        borderBottomRightRadius: "8px",
                        boxShadow:
                          brand.faqAnswerBoxShadow ||
                          "0 3px 6px 2px #ccc",
                        ...brand.faqAnswerStyle,
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
  if (isSmu) {
    return (
      <section id="faqs" className="py-10 sm:py-14 lg:py-16 bg-white w-full select-none">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1240px] xl:max-w-[1300px] mx-auto">
          {/* Header: FAQ'S | Frequently Asked Questions */}
          <div className="mb-6 sm:mb-8 text-left">
            <h2 className="text-2xl sm:text-[28px] lg:text-[32px] tracking-tight m-0 inline-flex items-center flex-wrap gap-1.5 sm:gap-2">
              <span className="font-bold text-[#111827]">FAQ&apos;S</span>
              <span className="text-[#9ca3af] font-normal mx-1">|</span>
              <span className="font-normal text-[#111827]">Frequently Asked Questions</span>
            </h2>
          </div>

          {/* Cards List */}
          <div className="space-y-3 sm:space-y-3.5 w-full">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const rawQuestion = faq.q.replace(/^Q\d+[\.\:\s]*/i, "");
              const formattedQuestion = `Q${idx + 1}. ${rawQuestion}`;

              return (
                <div
                  key={idx}
                  className="w-full border border-[#dee2e6] rounded-[6px] overflow-hidden bg-white shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left flex items-center justify-between gap-4 cursor-pointer bg-[#f8f9fa] hover:bg-[#f1f3f5] transition-colors border-none m-0"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[13.5px] sm:text-[14.5px] font-bold text-[#212529] leading-snug">
                      {formattedQuestion}
                    </span>
                    <span className="font-bold text-lg sm:text-xl text-[#212529] leading-none shrink-0 ml-3 select-none">
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 py-4 border-t border-[#dee2e6] bg-white text-[13px] sm:text-[13.5px] text-[#495057] leading-[1.65] font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Classic Divided List Layout (Amity, etc.)
  // ==========================================
  return (
    <section id="faqs" className="py-10 sm:py-16 bg-white">
      <LandingContainer>
        <h2
          className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6 sm:mb-8 text-left m-0"
          style={{ color: headingColor }}
        >
          Frequently Asked Questions
        </h2>

        {/* Clean Accordion List */}
        <div className="w-full divide-y divide-slate-200 border-t border-slate-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const rawQuestion = (faq.q || faq.question || "").replace(/^Q\d+[\.\:\s]*/i, "");
            const formattedQuestion = `Q${idx + 1}. ${rawQuestion}`;

            return (
              <div key={idx} className="w-full">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 text-left flex items-center justify-between gap-4 cursor-pointer bg-transparent border-none p-0 group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-[14px] sm:text-[16px] leading-snug transition-colors ${isOpen
                      ? "text-[#000000] font-semibold"
                      : "text-[#000000] font-medium hover:text-[#08417b]"
                      }`}
                  >
                    {formattedQuestion}
                  </span>
                  <span
                    className="font-bold text-xl sm:text-2xl leading-none shrink-0 w-6 text-right select-none"
                    style={{ color: iconColor }}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-4 pt-1 text-[13.5px] sm:text-[15px] text-[#4d4d4d] leading-relaxed font-normal">
                    {faq.a || faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </LandingContainer>
    </section>
  );
}
