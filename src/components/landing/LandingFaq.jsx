"use client";

import React, { useState } from "react";
import LandingContainer from "./LandingContainer";

export default function LandingFaq({ faqs = [], universityName = "University Online", brand = {} }) {
  const isVgu =
    brand.slug === "vgu" ||
    brand.faqLayout === "vgu";

  const isLpu =
    brand.slug === "lpu" ||
    brand.faqLayout === "lpu" ||
    brand.faqLayout === "sidebar";

  const isSmu =
    brand.slug === "smu" ||
    brand.name?.toLowerCase().includes("sikkim") ||
    brand.faqLayout === "smu-cards";

  const defaultOpen =
    brand.faqDefaultOpenIndex !== undefined
      ? brand.faqDefaultOpenIndex
      : isVgu || isLpu || isSmu
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


  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isUu =
    brand.slug === "uu" ||
    brand.faqLayout === "uu";

  const isIim =
    brand.slug === "iim" ||
    brand.faqLayout === "iim";

  const isGalgotias =
    brand.slug === "galgotias" ||
    brand.faqLayout === "galgotias";

  if (isGalgotias) {
    return (
      <section id="accordition" className="py-12 sm:py-16 bg-white select-none scroll-mt-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <h2 className="text-[26px] sm:text-[32px] md:text-[34px] font-bold text-center text-[#bc1820] m-0 mb-8 sm:mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const question = faq.q || faq.question || "";
              const answer = faq.a || faq.answer || "";

              return (
                <div key={idx} className="w-full">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className={`w-full flex items-center justify-between text-left px-5 py-3.5 text-[14.5px] sm:text-[15.5px] font-medium transition-colors cursor-pointer border ${
                      isOpen
                        ? "bg-[#A13341] text-white rounded-t-[10px] border-[#A13341]"
                        : "bg-white text-black hover:bg-slate-50 rounded-[10px] border-slate-300"
                    }`}
                  >
                    <span className="pr-4">{question}</span>
                    <span className="text-[18px] font-bold shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="bg-[#f6f6f6] border border-t-0 border-slate-300 rounded-b-[10px] px-5 py-4 text-[13.5px] sm:text-[14px] text-[#333333] leading-relaxed">
                      {answer}
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

  const isUpes =
    brand.slug === "upes" ||
    brand.faqLayout === "upes";

  if (isUpes) {
    return (
      <section id="faqs" className="scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
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
  // ==========================================
  const isCu =
    brand.slug === "cu" ||
    brand.faqLayout === "cu";

  if (isCu) {
    return (
      <section id="faqs" className="py-12 sm:py-16 bg-white select-none scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-[26px] sm:text-[32px] font-semibold text-[#d11c1f] tracking-tight mb-6 sm:mb-8 m-0"
            style={{ color: brand.faqHeadingColor || brand.faqTitleColor || "#d11c1f" }}
          >
            {brand.faqTitle || "Frequently Asked Questions"}
          </h2>

          <div className="w-full divide-y divide-slate-200 border-t border-slate-200">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const questionText = faq.q || faq.question || "";
              const answerText = faq.a || faq.answer || "";

              return (
                <div key={idx} className="w-full">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4 sm:py-5 px-1 sm:px-2 flex items-center justify-between text-left text-[15px] sm:text-[16px] font-medium text-slate-900 bg-transparent border-none cursor-pointer transition-colors hover:text-[#d11c1f]"
                  >
                    <span className="pr-4 leading-snug">{questionText}</span>
                    <span className="text-[#d11c1f] text-sm sm:text-base shrink-0 font-bold">
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-5 pt-1 px-1 sm:px-2 text-xs sm:text-[14px] text-slate-600 leading-relaxed font-normal">
                      <p className="m-0">{answerText}</p>
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

  if (isLpu) {
    const primaryColor = brand.primaryColor || "#f58220";
    return (
      <section
        id="faqs"
        className="py-12 sm:py-16 md:py-20 bg-white select-none border-b border-slate-200 scroll-mt-20"
      >
        <LandingContainer className={brand.faqContainerClassName || "!px-5 sm:!px-6 md:!px-8"}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-stretch">
            {/* Left Column: FAQ Highlight Box */}
            <div className="md:col-span-4 flex">
              <div className="w-full bg-[#fff9f4] rounded-[10px] sm:rounded-[12px] p-6 sm:p-8 md:p-10 flex flex-col justify-center text-left">
                <h2
                  className="text-5xl sm:text-6xl lg:text-[62px] font-black tracking-tight m-0 leading-none"
                  style={{ color: primaryColor }}
                >
                  FAQ
                </h2>
                <div className="mt-3.5 sm:mt-4 text-[25px] sm:text-[28px] md:text-[32px] font-bold text-slate-900 leading-[1.18]">
                  <div>Frequently Asked</div>
                  <div>Question</div>
                </div>
              </div>
            </div>

            {/* Right Column: Question bars with left orange border */}
            <div className="md:col-span-8 flex flex-col justify-center space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                const questionText = faq.question || faq.q || "";
                const answerText = faq.answer || faq.a || "";

                return (
                  <div
                    key={idx}
                    className="w-full transition-all overflow-hidden rounded-r-[6px]"
                    style={{ borderLeft: `4px solid ${primaryColor}` }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full bg-[#eeeeee] hover:bg-[#e4e4e4] py-3.5 sm:py-4 px-4 sm:px-5 text-left font-medium text-[15px] sm:text-[16px] text-[#222222] border-none cursor-pointer transition-colors block leading-snug"
                    >
                      {questionText}
                    </button>
                    {isOpen && (
                      <div className="bg-[#fcfcfc] px-4 sm:px-5 py-3.5 sm:py-4 text-slate-700 text-[14px] sm:text-[15px] leading-relaxed border-t border-slate-200/80">
                        <p className="m-0 font-normal leading-[1.65]">{answerText}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </LandingContainer>
      </section>
    );
  }

  // ==========================================
  // Layout: VGU (Vivekananda Global University) FAQ
  // ==========================================
  if (isVgu) {
    const cfg = brand.faqConfig || {};
    const titleColor = cfg.titleColor || brand.primaryColor || "#811811";
    const iconBg = cfg.iconBg || "#08417B";
    const iconColor = cfg.iconColor || "#ffffff";
    const prefix = cfg.questionPrefix || "» ";
    const faqTitle = brand.faqTitle || "Frequently Asked Questions";

    const renderFaqTitle = () => {
      if (typeof faqTitle === "string" && faqTitle.includes("\n")) {
        const parts = faqTitle.split("\n");
        return parts.map((part, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <br className="sm:hidden" />}
            {idx > 0 && <span className="hidden sm:inline"> </span>}
            <span>{part}</span>
          </React.Fragment>
        ));
      }
      return faqTitle;
    };

    return (
      <section
        id="faq"
        aria-label="Frequently Asked Questions"
        className="py-8 sm:py-12 lg:py-16 bg-[#F3F3F8] w-full select-none scroll-mt-20 sm:scroll-mt-24"
      >
        <div id="faqs" className="sr-only"></div>
        <div className={cfg.containerClassName || "max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-8"}>
          <h2
            className={cfg.titleClassName || "text-[24px] sm:text-[28px] md:text-[32px] font-bold text-center m-0 mb-6 sm:mb-8 md:mb-10 tracking-tight leading-[1.25] whitespace-normal sm:whitespace-nowrap"}
            style={{ color: titleColor }}
          >
            {renderFaqTitle()}
          </h2>

          <div className="space-y-3 sm:space-y-3.5 w-full">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const rawQuestion = (faq.q || faq.question || "").replace(/^Q\d+[\.\:\s]*/i, "").trim();
              const questionNumber = `Q${idx + 1}.`;

              return (
                <div
                  key={idx}
                  className={cfg.cardClassName || "rounded-[8px] sm:rounded-[10px] overflow-hidden bg-white shadow-xs border border-slate-200/70 transition-all"}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-4 sm:px-5 md:px-6 py-3.5 sm:py-4 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer transition-colors border-none m-0"
                    style={{
                      backgroundColor: isOpen ? "#811811" : "#ffffff",
                      color: isOpen ? "#ffffff" : "#1e293b",
                    }}
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-[14.5px] sm:text-[15.5px] md:text-[16px] font-medium leading-snug transition-colors flex-1 ${
                        isOpen ? "text-white" : "text-[#1e293b]"
                      }`}
                    >
                      <span className={`mr-1.5 sm:mr-2 select-none ${isOpen ? "text-white/80" : "text-slate-500"}`}>
                        {prefix}
                      </span>
                      <span>{questionNumber} </span>
                      <span>{rawQuestion}</span>
                    </span>
                    <span
                      className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] rounded-full flex items-center justify-center font-bold text-[14px] sm:text-[15px] leading-none shrink-0 ml-2.5 sm:ml-3 select-none transition-transform"
                      style={{
                        backgroundColor: isOpen ? "#ffffff" : iconBg,
                        color: isOpen ? "#811811" : iconColor,
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 md:px-6 py-3.5 sm:py-4 bg-white text-[13.5px] sm:text-[14px] text-[#4b5563] leading-[1.65] font-normal border-t border-slate-100">
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
      <section id="faqs" className={`py-10 sm:py-14 lg:py-16 bg-white w-full select-none ${brand.faqSectionClassName || ""}`}>
        <LandingContainer className={brand.faqContainerClassName || "px-3 sm:px-6"}>
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
        </LandingContainer>
      </section>
    );
  }

  // ==========================================
  // Classic Divided List Layout (Amity, etc.)
  // ==========================================
  return (
    <section id="faqs" className="py-10 sm:py-16 bg-white">
      <LandingContainer>
        {brand.faqTitleHtml ? (
          <div className="mb-6 sm:mb-8" dangerouslySetInnerHTML={{ __html: brand.faqTitleHtml }} />
        ) : (
          <h2
            className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6 sm:mb-8 text-left m-0"
            style={{ color: headingColor }}
          >
            {brand.faqTitle || "Frequently Asked Questions"}
          </h2>
        )}

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
