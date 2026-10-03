"use client";

import React, { useState } from "react";
import LandingContainer from "./LandingContainer";

const MEDIA_PRESS_LOGOS = [
  { name: "Hindustan Times", badge: "HT" },
  { name: "ThePrint" },
  { name: "ANI", subtitle: "South Asia Leading Multimedia News Agency" },
  { name: "mid·day" },
  { name: "LATESTLY" },
];

export default function LandingFaq({
  faqs = [],
  universityName = "University Online",
  brand = {},
}) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  const layout =
    brand.faqLayout ||
    (brand.slug === "lpu"
      ? "sidebar"
      : brand.slug === "smu"
      ? "cards"
      : brand.slug === "galgotias"
      ? "pill"
      : brand.slug === "vgu"
      ? "vgu"
      : brand.slug === "mu"
      ? "mu"
      : "divided");
  const headingColor = brand.faqHeaderColor || brand.primaryColor || "#08417b";
  const iconColor = brand.faqIconColor || brand.primaryColor || "#fd202a";
  const showPress = brand.faqShowPress || brand.slug === "galgotias";

  const toggleFaq = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  const getQuestion = (faq, idx) => {
    const raw = (faq.q || faq.question || faq.title || "").replace(/^Q\d+[\.\:\s\-]*/i, "");
    return `Q${idx + 1}. ${raw}`;
  };

  const getAnswer = (faq) => faq.a || faq.answer || "";

  // ================= LAYOUT: MU CARDS WITH ORANGE ACCENTS =================
  if (layout === "mu" || brand.slug === "mu") {
    const faqTitle = brand.faqTitle || "Frequently Asked Questions";
    return (
      <section
        id="faqs"
        className={brand.faqSectionClassName || "py-10 sm:py-14 lg:py-16 bg-white w-full select-none"}
      >
        <div className={brand.faqContainerClassName || "max-w-[1140px] mx-auto px-4 sm:px-6"}>
          <h2
            className={
              brand.faqTitleClassName ||
              "text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[#193579] tracking-normal text-center m-0 mb-6 sm:mb-8"
            }
          >
            <span className="text-[#f97316]">FAQ - </span>
            {faqTitle.replace(/^FAQ\s*[-–:]*\s*/i, "")}
          </h2>

          <div className={brand.faqListClassName || "space-y-3 sm:space-y-3.5 w-full"}>
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const rawQuestion = (faq.q || faq.question || "").replace(/^Q\d+[\.\:\-\s]*/i, "").trim();
              const prefix = brand.faqPrefix
                ? brand.faqPrefix.replace("{idx}", idx + 1)
                : `» Q${idx + 1}- `;
              const formattedQuestion = `${prefix}${rawQuestion}`;
              const answerText = faq.a || faq.answer || "";

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
                <div key={idx} className={brand.faqItemClassName || "w-full transition-all"}>
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
                    <span className={questionClass}>{formattedQuestion}</span>
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
                        boxShadow: brand.faqAnswerBoxShadow || "0 3px 6px 2px #ccc",
                        ...brand.faqAnswerStyle,
                      }}
                    >
                      {answerText}
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

  // ================= LAYOUT: VGU BAR PILLS (Matching Image 2) =================
  if (layout === "vgu") {
    const cfg = brand.faqConfig || {};
    const titleColor = cfg.titleColor || brand.primaryColor || "#811811";
    const barBg = cfg.itemBg || "#f8f9fa";
    const iconBg = cfg.iconBg || "#103863";
    const iconColor = cfg.iconColor || "#ffffff";
    const activeColor = cfg.activeQuestionColor || brand.primaryColor || "#811811";
    const prefix = cfg.questionPrefix !== undefined ? cfg.questionPrefix : "» ";
    const containerClass = cfg.containerClassName || "max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8";

    return (
      <section id="faqs" className="py-10 sm:py-14 bg-white select-none border-b border-slate-200">
        <div className={containerClass}>
          <h2
            className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-center mb-6 sm:mb-8 m-0"
            style={{ color: titleColor }}
          >
            {brand.faqTitle || "Frequently Asked Questions"}
          </h2>

          <div className="space-y-2.5 sm:space-y-3 w-full">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const qText = getQuestion(faq, idx);
              const aText = getAnswer(faq);

              return (
                <div
                  key={idx}
                  className="w-full rounded-[4px] sm:rounded-[6px] overflow-hidden transition-all duration-200"
                  style={{ backgroundColor: barBg }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-left flex items-center justify-between gap-4 cursor-pointer bg-transparent border-none m-0 group"
                  >
                    <span
                      className={`text-[13px] sm:text-[14.5px] leading-snug transition-colors ${
                        isOpen ? "font-bold" : "font-normal hover:opacity-90"
                      }`}
                      style={{ color: isOpen ? activeColor : "#1e293b" }}
                    >
                      <span className="font-semibold select-none mr-1.5 opacity-90">{prefix}</span>
                      {qText}
                    </span>

                    <span
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 shadow-xs font-bold text-xs sm:text-sm select-none transition-transform"
                      style={{ backgroundColor: iconBg, color: iconColor }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && aText && (
                    <div className="px-5 sm:px-6 pb-3.5 pt-1 text-[12.5px] sm:text-[13.5px] text-slate-700 leading-relaxed font-normal">
                      {aText}
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

  return (
    <section id="faqs" className={`pt-10 sm:pt-14 pb-10 sm:pb-14 bg-white ${layout === "sidebar" ? "border-b border-slate-100" : ""}`}>
      <LandingContainer className={layout === "pill" ? "max-w-[1360px] px-4 sm:px-6 md:px-12 lg:px-16" : ""}>
        {/* ================= LAYOUT 1: SIDEBAR (e.g. LPU) ================= */}
        {layout === "sidebar" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="bg-[#fff8f2] p-8 sm:p-10 lg:p-12 rounded-[12px] border border-orange-100/80 shadow-xs w-full max-w-[420px] text-left space-y-2">
                <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#f58220] tracking-tight leading-none m-0">FAQ</h2>
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-slate-900 leading-snug m-0 pt-1">
                  {brand.faqSubtitle || "Frequently Asked Question"}
                </h3>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="w-full bg-[#f1f1f1] rounded-[4px] border-l-4 border-[#f58220] overflow-hidden transition-all">
                    <button type="button" onClick={() => toggleFaq(idx)} className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none m-0">
                      <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 leading-snug">{faq.question || faq.q || getQuestion(faq, idx)}</span>
                      <span className="font-extrabold text-xs text-slate-500 shrink-0 ml-2">{isOpen ? "▲" : "▼"}</span>
                    </button>
                    {isOpen && getAnswer(faq) && (
                      <div className="px-4 sm:px-5 pb-4 pt-1 text-[12.5px] sm:text-[13px] text-slate-700 leading-relaxed font-normal border-t border-slate-200/60">
                        {getAnswer(faq)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ================= LAYOUT 2, 3, 4: CARDS, PILLS & DIVIDED ================= */
          <>
            {/* Heading */}
            {brand.faqTitleHtml ? (
              <div className="mb-6 sm:mb-8 text-left" dangerouslySetInnerHTML={{ __html: brand.faqTitleHtml }} />
            ) : (
              <h2
                className={`text-2xl sm:text-3xl font-bold tracking-tight mb-6 sm:mb-8 m-0 ${
                  layout === "pill" ? "text-center text-[#002b49] font-extrabold" : "text-left"
                }`}
                style={layout !== "pill" ? { color: headingColor } : {}}
              >
                {brand.faqTitle || (layout === "cards" || layout === "pill" ? "FAQ'S | Frequently Asked Questions" : "Frequently Asked Questions")}
              </h2>
            )}

            {/* List */}
            <div className={layout === "divided" ? "w-full divide-y divide-slate-200 border-t border-slate-200" : layout === "pill" ? "space-y-3.5 sm:space-y-4 max-w-[1060px] mx-auto" : layout === "clean" ? "space-y-3 sm:space-y-4 w-full" : "space-y-3 sm:space-y-3.5 w-full"}>
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                const qText = getQuestion(faq, idx);
                const aText = getAnswer(faq);

                if (layout === "cards") {
                  return (
                    <div key={idx} className="w-full border border-[#dee2e6] rounded-[6px] overflow-hidden bg-white shadow-2xs">
                      <button type="button" onClick={() => toggleFaq(idx)} className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left flex items-center justify-between gap-4 cursor-pointer bg-[#f8f9fa] hover:bg-[#f1f3f5] transition-colors border-none m-0">
                        <span className="text-[13.5px] sm:text-[14.5px] font-bold text-[#212529] leading-snug">{qText}</span>
                        <span className="font-bold text-lg sm:text-xl text-[#212529] leading-none shrink-0 ml-3">{isOpen ? "-" : "+"}</span>
                      </button>
                      {isOpen && aText && <div className="px-4 sm:px-5 py-4 border-t border-[#dee2e6] bg-white text-[13px] sm:text-[13.5px] text-[#495057] leading-[1.65] font-normal">{aText}</div>}
                    </div>
                  );
                }

                if (layout === "pill") {
                  return (
                    <div key={idx} className="w-full">
                      <button type="button" onClick={() => toggleFaq(idx)} className="w-full bg-[#e9edf0] hover:bg-[#e2e7ec] rounded-[6px] sm:rounded-[8px] py-3.5 sm:py-4 px-5 sm:px-6 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer border-none">
                        <span className="font-bold text-[#002b49] text-[13.5px] sm:text-[15px] leading-snug">{qText}</span>
                        <span className="font-bold text-lg sm:text-xl text-[#002b49] select-none shrink-0 ml-2">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && aText && <div className="px-5 sm:px-6 pt-3.5 pb-2 text-[13px] sm:text-[14px] text-slate-800 leading-relaxed font-normal text-left">{aText}</div>}
                    </div>
                  );
                }

                if (layout === "clean") {
                  return (
                    <div key={idx} className="w-full">
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full py-2 sm:py-2.5 text-left flex items-center justify-between gap-4 cursor-pointer bg-transparent border-none p-0 group select-none"
                      >
                        <span
                          className={`text-[14px] sm:text-[15.5px] leading-snug transition-colors ${
                            isOpen
                              ? "text-slate-900 font-bold"
                              : "text-slate-700 font-semibold hover:text-slate-900"
                          }`}
                        >
                          {qText}
                        </span>
                        <svg
                          className={`w-4 h-4 text-slate-600 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isOpen && aText && (
                        <div className="pt-2 pb-2 text-[13.5px] sm:text-[14px] text-slate-600 leading-relaxed font-normal">
                          {aText}
                        </div>
                      )}
                    </div>
                  );
                }

                // Default "divided"
                return (
                  <div key={idx} className="w-full">
                    <button type="button" onClick={() => toggleFaq(idx)} className="w-full py-4 text-left flex items-center justify-between gap-4 cursor-pointer bg-transparent border-none p-0 group">
                      <span className={`text-[14px] sm:text-[16px] leading-snug transition-colors ${isOpen ? "text-[#000000] font-semibold" : "text-[#000000] font-medium hover:text-[#08417b]"}`}>
                        {qText}
                      </span>
                      <span className="font-bold text-xl sm:text-2xl leading-none shrink-0 w-6 text-right" style={{ color: iconColor }}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && aText && <div className="pb-4 pt-1 text-[13.5px] sm:text-[15px] text-[#4d4d4d] leading-relaxed font-normal">{aText}</div>}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </LandingContainer>

      {/* Media Press Logos Strip if enabled */}
      {showPress && (
        <div className="bg-[#f4f6f8] py-7 sm:py-9 mt-12 sm:mt-16 border-t border-slate-200/60">
          <div className="max-w-[1360px] mx-auto px-6 sm:px-12 flex flex-wrap items-center justify-center sm:justify-between gap-8 sm:gap-10 text-[#4b5563]">
            <div className="flex items-center gap-2 font-serif font-black text-xl sm:text-2xl text-[#374151] tracking-tight">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#374151] text-white text-xs font-sans font-bold flex items-center justify-center">HT</span>
              <span>Hindustan Times</span>
            </div>
            <div className="font-serif font-black text-2xl sm:text-[28px] text-[#374151] tracking-tight">ThePrint</div>
            <div className="flex items-center gap-2 text-left">
              <span className="font-sans font-black text-2xl sm:text-3xl text-[#374151] tracking-tighter">ANI</span>
              <span className="text-[9px] sm:text-[10px] leading-tight font-semibold text-[#6b7280] max-w-[110px] border-l border-slate-400 pl-2">South Asia Leading Multimedia News Agency</span>
            </div>
            <div className="font-sans font-black text-2xl sm:text-3xl text-[#374151] tracking-tight">mid<span className="text-[#374151] font-bold">·</span>day</div>
            <div className="font-sans font-black text-xl sm:text-2xl text-[#374151] tracking-wider uppercase flex items-center">
              <span>LATEST</span>
              <span className="bg-[#374151] text-white px-1.5 py-0.5 rounded-[3px] text-base sm:text-lg ml-1 font-bold">LY</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
