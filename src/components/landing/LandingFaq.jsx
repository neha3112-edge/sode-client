"use client";

import React, { useState } from "react";
import LandingContainer from "./LandingContainer";

export default function LandingFaq({ faqs = [], universityName = "University Online", brand = {} }) {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default
  const headingColor = brand.faqHeaderColor || brand.primaryColor || "#08417b";
  const iconColor = brand.faqIconColor || brand.primaryColor || "#fd202a";

  if (!faqs || faqs.length === 0) return null;

  const isLpu = brand.slug === "lpu" || brand.faqLayout === "lpu";
  const isSmu =
    brand.slug === "smu" ||
    brand.name?.toLowerCase().includes("sikkim") ||
    brand.faqLayout === "smu-cards";

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ==========================================
  // Layout 0: LPU 2-Column FAQ Layout with Left Orange Card & Orange Left-Border Items
  // ==========================================
  if (isLpu) {
    return (
      <section id="faqs" className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: FAQ Box Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="bg-[#fff8f2] p-8 sm:p-10 lg:p-12 rounded-[12px] border border-orange-100/80 shadow-xs w-full max-w-[420px] text-left space-y-2">
                <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#f58220] tracking-tight leading-none m-0">
                  FAQ
                </h2>
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-slate-900 leading-snug m-0 pt-1">
                  Frequently Asked Question
                </h3>
              </div>
            </div>

            {/* Right Column: Orange Left Border Accordion List */}
            <div className="lg:col-span-7 space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                const questionText = faq.question || faq.q || `Q${idx + 1}- ${faq.title}`;
                const answerText = faq.answer || faq.a || "";

                return (
                  <div
                    key={idx}
                    className="w-full bg-[#f1f1f1] rounded-[4px] border-l-4 border-[#f58220] overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none m-0"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 leading-snug">
                        {questionText}
                      </span>
                      <span className="font-extrabold text-xs text-slate-500 shrink-0 ml-2 select-none">
                        {isOpen ? "▲" : "▼"}
                      </span>
                    </button>

                    {isOpen && answerText && (
                      <div className="px-4 sm:px-5 pb-4 pt-1 text-[12.5px] sm:text-[13px] text-slate-700 leading-relaxed font-normal border-t border-slate-200/60">
                        {answerText}
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
  // SMU Layout: Individual Bordered Cards with Light Grey Header & +/- Icons
  // ==========================================
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
            const rawQuestion = faq.q.replace(/^Q\d+[\.\:\s]*/i, "");
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
                    {faq.a}
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
