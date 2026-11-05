"use client";

import React, { useState } from "react";
import LandingContainer from "./LandingContainer";

export default function LandingFaq({ faqs = [], universityName = "University Online", brand = {} }) {
  const isSsbm =
    brand.slug === "ssbm" ||
    brand.faqLayout === "ssbm" ||
    brand.faqLayout === "ssbm-cards";

  const isUuBrand = brand.slug === "uu" || brand.faqLayout === "uu";
  const defaultOpen =
    brand.faqDefaultOpenIndex !== undefined
      ? brand.faqDefaultOpenIndex
      : isUuBrand
        ? null
        : 0;
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

  const isUpes =
    brand.slug === "upes" ||
    brand.faqLayout === "upes";

  const isEdgewood =
    brand.slug === "edgewood" ||
    brand.faqLayout === "edgewood";

  const desktopWidthStyle = (
    <style>{`
      @media (min-width: 1024px) {
        #faqs .container,
        #faqs .ant-layout-content,
        #faqs > div {
          max-width: 1130px !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
      }
    `}</style>
  );

  // ==========================================
  // Layout: Edgewood FAQ
  // ==========================================
  if (isEdgewood) {
    return (
      <section id="faqs" className="faq-section py-12 sm:py-16 bg-white scroll-mt-24 select-none">
        <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6">
          <div className="faq-header text-center mb-8 sm:mb-10">
            <h2 className="text-[#0056b3] text-[26px] sm:text-[32px] font-extrabold tracking-tight m-0">
              {brand.faqTitle || "FAQ-Frequently Asked Question"}
            </h2>
          </div>
          <div className="faq-container flex flex-col gap-3.5 sm:gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item rounded-[15px] overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? "active bg-[#f1f1f1] border-none shadow-xs"
                      : "bg-white border border-[#dddddd]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="faq-question w-full text-left py-4 px-5 sm:py-5 sm:px-6 flex items-center gap-3.5 sm:gap-4 cursor-pointer select-none bg-transparent border-none"
                  >
                    <span className="status-icon w-5 h-5 min-w-[20px] h-[20px] rounded-[4px] bg-[#0056b3] text-white flex items-center justify-center font-bold text-[14px] leading-none shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                    <span className="text-[#0056b3] font-bold text-[15px] sm:text-[16px] leading-snug">
                      {faq.q || faq.question}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer px-5 pb-5 pt-0 sm:px-6 sm:pb-6 pl-[48px] sm:pl-[60px] pr-5 sm:pr-8 text-[#555555] text-[14px] sm:text-[15px] leading-relaxed">
                      <p className="m-0">{faq.a || faq.answer}</p>
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
  // Layout: UPES Online FAQ
  // ==========================================
  if (isUpes) {
    return (
      <section id="faqs" className="scroll-mt-24">
        {desktopWidthStyle}
        <div className="w-full max-w-[1130px] mx-auto px-4 sm:px-6">
          <p id="faq-subh">{brand.faqSubtitle || "FAQ'S"}</p>
          <h3>{brand.faqTitle || "Frequently Asked Questions"}</h3>

          <div className="space-y-1">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? "active" : ""}`}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(idx)}
                  >
                    <span>{faq.q || faq.question}</span>
                    <span className="faq-icon">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer">
                      <p className="m-0">{faq.a || faq.answer}</p>
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
  // Layout: Uttaranchal University (UU) FAQ
  // Exact 1:1 Match with Reference Images & distanceeducationschool.com/uu (Poppins font)
  // ==========================================
  if (isUu) {
    const faqTitle = brand.faqTitle || "FAQ | Frequently Asked Question";
    return (
      <section
        id="faqs"
        aria-label="Frequently Asked Questions"
        className="py-8 sm:py-10 bg-white w-full select-none scroll-mt-24 font-poppins"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div
          className="uu-container w-full mx-auto"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <h2
            className="text-[25px] font-semibold text-[#011C39] text-left m-0 mb-5 tracking-tight font-poppins"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "25px",
              fontWeight: 600,
              color: "#011C39",
              marginTop: "0px",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            {faqTitle}
          </h2>

          <div className="w-full" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const rawQuestion = (faq.q || faq.question || "").replace(/^Q\d+[\.\:\s]*/i, "");

              return (
                <div
                  key={idx}
                  className="faq-item bg-white my-2.5 rounded-[5px] border-b border-[#cccccc] overflow-hidden transition-all"
                  style={{
                    backgroundColor: "#ffffff",
                    marginTop: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    borderBottom: "1px solid #cccccc",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className={`faq-question w-full text-left flex items-center justify-between gap-4 cursor-pointer p-[15px] border-none m-0 transition-colors select-none font-poppins ${isOpen
                        ? "active bg-[#62B239] text-white rounded-t-[5px]"
                        : "bg-white text-black hover:text-[#011C39] rounded-[5px]"
                      }`}
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "15px",
                      fontWeight: 400,
                      lineHeight: "1.4",
                      padding: "15px",
                      backgroundColor: isOpen ? "#62B239" : "#ffffff",
                      color: isOpen ? "#ffffff" : "#000000",
                      borderRadius: isOpen ? "5px 5px 0 0" : "5px",
                      border: "none",
                      outline: "none",
                    }}
                    aria-expanded={isOpen}
                  >
                    <span
                      className="text-[15px] font-normal leading-normal text-inherit font-poppins"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: "1.4",
                        color: "inherit",
                      }}
                    >
                      {rawQuestion}
                    </span>
                    <span
                      className="icon w-[25px] h-[22px] rounded-[2px] bg-[#f7f7f7] text-[#62B239] flex items-center justify-center font-bold text-[16px] leading-none shrink-0 select-none mr-0"
                      style={{
                        backgroundColor: "#f7f7f7",
                        color: "#62B239",
                        fontWeight: 700,
                        fontSize: "16px",
                        width: "25px",
                        height: "22px",
                        borderRadius: "2px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      className="faq-answer p-[15px] bg-[#f9f9f9] text-[14px] text-[#444444] leading-relaxed font-normal font-poppins"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "1.6",
                        backgroundColor: "#f9f9f9",
                        color: "#444444",
                        padding: "15px",
                      }}
                    >
                      <p
                        className="m-0 leading-relaxed font-normal"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "1.6",
                          color: "#444444",
                          margin: 0,
                        }}
                      >
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
        {desktopWidthStyle}
        <div className="container w-full max-w-[1130px] mx-auto px-4 sm:px-6">
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
        {desktopWidthStyle}
        <div className="w-full max-w-[1130px] mx-auto px-4 sm:px-6">
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
        {desktopWidthStyle}
        <div className={brand.faqContainerClassName || "w-full max-w-[1130px] mx-auto px-4 sm:px-6"}>
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
        {desktopWidthStyle}
        <div className="w-full max-w-[1130px] mx-auto px-4 sm:px-6">
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
  // Layout: SSBM Cards Layout (Red left border, separate boxes, clean title)
  // ==========================================
  if (isSsbm) {
    const faqTitle = brand.faqTitle || "FAQ-Frequently Asked Questions";
    const primaryRed = brand.primaryColor || "#c11f28";

    return (
      <section
        id="faqs"
        className="pt-6 sm:pt-8 lg:pt-9 pb-10 sm:pb-14 bg-white w-full select-none scroll-mt-20"
      >
        <style>{`
          #faqs,
          .landing-page--ssbm #faqs {
            background-color: #ffffff !important;
            width: 100% !important;
          }
          #faqs .ssbm-faq-container,
          .landing-page--ssbm #faqs .ssbm-faq-container {
            width: 100% !important;
            max-width: 1140px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            box-sizing: border-box !important;
          }
          @media (max-width: 639px) {
            #faqs .ssbm-faq-container,
            .landing-page--ssbm #faqs .ssbm-faq-container {
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
          }
          @media (min-width: 640px) and (max-width: 1023px) {
            #faqs .ssbm-faq-container,
            .landing-page--ssbm #faqs .ssbm-faq-container {
              padding-left: 24px !important;
              padding-right: 24px !important;
            }
          }
          @media (min-width: 1024px) {
            #faqs .ssbm-faq-container,
            .landing-page--ssbm #faqs .ssbm-faq-container {
              max-width: 1140px !important;
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
          }
        `}</style>
        <div className="ssbm-faq-container w-full max-w-[1140px] mx-auto px-4 sm:px-6 box-border">
          {/* Header */}
          <div className="mb-4 sm:mb-5 lg:mb-6 text-left">
            <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-[#111111] tracking-normal m-0 leading-tight">
              {faqTitle}
            </h2>
          </div>

          {/* Cards List */}
          <div className="space-y-2.5 sm:space-y-3 w-full">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const rawQuestion = (faq.q || faq.question || "")
                .replace(/^Q\d+[\.\:\-\s]*/i, "")
                .trim();
              const answerText = faq.a || faq.answer || "";

              return (
                <div
                  key={idx}
                  className="w-full bg-white border border-[#dcdcdc] rounded-[3px] overflow-hidden transition-all shadow-none"
                  style={{
                    borderLeft: `4px solid ${primaryRed}`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className={`w-full px-4 sm:px-5 ${isOpen ? "pt-3.5 pb-2 sm:pt-4 sm:pb-2.5" : "py-3 sm:py-3.5"
                      } text-left flex items-center justify-between gap-4 cursor-pointer bg-white hover:bg-[#fafafa] transition-colors border-none m-0`}
                    aria-expanded={isOpen}
                  >
                    <span className="text-[13.5px] sm:text-[14.5px] font-bold text-[#111111] leading-snug">
                      {rawQuestion}
                    </span>
                    <span className="font-bold text-base sm:text-lg text-[#111111] leading-none shrink-0 ml-3 select-none">
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-3.5 sm:pb-4 pt-0 text-[12.5px] sm:text-[13px] text-[#333333] leading-relaxed bg-white">
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

  // ==========================================
  // Layout: Manipal Online FAQ (Exact 1:1 with First Image)
  // ==========================================
  const isManipal =
    brand.slug === "manipal" ||
    brand.name?.toLowerCase().includes("manipal") ||
    brand.faqLayout === "manipal";

  if (isManipal) {
    return (
      <section id="faqs" className="pt-6 sm:pt-8 lg:pt-9 pb-10 sm:pb-14 bg-white font-['Poppins',sans-serif] scroll-mt-20">
        {desktopWidthStyle}
        <LandingContainer className="!max-w-[1130px] px-4 sm:px-6">
          {brand.faqTitleHtml ? (
            <div className="mb-4 sm:mb-5 lg:mb-6" dangerouslySetInnerHTML={{ __html: brand.faqTitleHtml }} />
          ) : (
            <h2 className="text-[25px] sm:text-[28px] lg:text-[32px] font-bold tracking-tight mb-4 sm:mb-5 lg:mb-6 text-left m-0">
              <span className="text-[#08417b]">FAQs</span>
              <span className="text-[#08417b] font-normal mx-2">|</span>
              <span className="text-[#ee3024]">Frequently Asked Questions</span>
            </h2>
          )}

          <div className="w-full">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const rawQuestion = (faq.q || faq.question || "").replace(/^Q\d+[\.\:\s]*/i, "").trim();
              const formattedQuestion = idx === 0 ? `Q1 ${rawQuestion}` : `Q${idx + 1}. ${rawQuestion}`;

              return (
                <div key={idx} className="w-full border-b border-[#dfdfdf]">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-3.5 sm:py-[17px] text-left flex items-center justify-between gap-4 cursor-pointer bg-transparent border-none p-0 group"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="text-[14.5px] sm:text-[15.5px] lg:text-[16px] font-medium leading-normal tracking-normal text-[#111111]"
                    >
                      {formattedQuestion}
                    </span>

                    <span className="shrink-0 flex items-center justify-center w-5 select-none" style={{ color: "#08417b" }}>
                      {isOpen ? (
                        <svg className="w-3.5 h-3.5 text-[#08417b]" viewBox="0 0 16 16" fill="currentColor">
                          <rect y="7" width="16" height="2" rx="1" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-[#08417b]" viewBox="0 0 16 16" fill="currentColor">
                          <path fillRule="evenodd" d="M8 1a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2H9v5a1 1 0 1 1-2 0V9H2a1 1 0 0 1 0-2h5V2a1 1 0 0 1 1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-0.5 pb-4 sm:pb-5 text-[12.5px] sm:text-[13px] lg:text-[13.5px] text-[#333333] leading-[1.5] font-normal tracking-normal">
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

  // ==========================================
  // Classic Divided List Layout (Amity, etc.)
  // ==========================================
  return (
    <section id="faqs" className="pt-5 sm:pt-6 lg:pt-6 pb-10 sm:pb-14 bg-white">
      {desktopWidthStyle}
      <LandingContainer className="!max-w-[1130px] px-4 sm:px-6">
        {brand.faqTitleHtml ? (
          <div className="mb-4 sm:mb-5 lg:mb-5" dangerouslySetInnerHTML={{ __html: brand.faqTitleHtml }} />
        ) : (
          <h2
            className="text-2xl sm:text-[32px] font-semibold tracking-normal mb-3 sm:mb-4 lg:mb-4 text-left m-0"
            style={{ color: headingColor }}
          >
            {brand.faqTitle || "Frequently Asked Questions"}
          </h2>
        )}

        {/* Clean Accordion List: Divider on BOTTOM of each question, none on top */}
        <div className="w-full">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const rawQuestion = (faq.q || faq.question || "").replace(/^Q\d+[\.\:\s]*/i, "");
            const formattedQuestion = `Q${idx + 1}. ${rawQuestion}`;

            return (
              <div key={idx} className="w-full border-b border-[#e5e7eb] faq-item-row">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-3.5 sm:py-3.5 text-left flex items-center justify-between gap-4 cursor-pointer bg-transparent border-none p-0 group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`faq-question-text text-[15px] sm:text-[15.5px] leading-normal transition-colors ${isOpen
                      ? "text-black font-semibold"
                      : "text-[#808080] font-normal hover:text-black"
                      }`}
                  >
                    {formattedQuestion}
                  </span>
                  <span
                    className="faq-icon-symbol font-semibold text-xl sm:text-2xl leading-none shrink-0 w-6 text-right select-none"
                    style={{ color: brand.faqIconColor || iconColor || "#808080" }}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-4 pt-0 text-[13px] sm:text-[13.5px] text-black leading-relaxed font-normal faq-answer-content">
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
