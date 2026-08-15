"use client";

import React, { useState, useRef } from "react";
import { Container } from "@/components/common/Container";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

function FAQAccordionItem({ question, answer, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
        ? "border-[#0C3058] shadow-md"
        : "border-slate-200 bg-white hover:border-slate-300"
        }`}
      style={{
        background: isOpen
          ? "linear-gradient(135deg,#EFF6FF 0%,#F0F9FF 100%)"
          : "#ffffff",
      }}
    >
      {/* Header Button */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer bg-transparent border-none outline-none"
      >
        <span
          className={`text-sm sm:text-base font-bold leading-snug transition-colors duration-200 ${isOpen ? "text-[#0C3058]" : "text-slate-800"
            }`}
        >
          {question}
        </span>
        <span
          className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 transition-all duration-300 ${isOpen ? "bg-[#0C3058] text-white" : "bg-slate-100 text-slate-500"
            }`}
        >
          {isOpen ? (
            <MinusOutlined className="text-xs transition-transform duration-300" />
          ) : (
            <PlusOutlined className="text-xs transition-transform duration-300" />
          )}
        </span>
      </button>

      {/* Animated Content Panel */}
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? "1000px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="px-5 pb-5 pt-1">
          <div className="h-px bg-[#0C3058]/10 mb-3" />
          <p className="text-sm text-slate-600 font-normal leading-relaxed m-0">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ({ initialFaqs = [] }) {
  const faqsList = Array.isArray(initialFaqs) ? initialFaqs : [];
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faqs"
      className="py-14 sm:py-18 scroll-mt-10 bg-white overflow-hidden"
    >
      <Container className="max-w-7xl">
        <div className="flex flex-col items-center text-center pb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0C3058] leading-tight tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 font-medium mt-2.5 text-sm sm:text-base leading-relaxed">
            Still deciding? Book a no-pressure call and we&apos;ll map the right path with you.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5 max-w-7xl mx-auto">
          {faqsList.map((item, idx) => {
            const rawQ = item.q || item.question || "";
            const hasNumber = /^\d+[\.\)]\s*/.test(rawQ);
            const questionText = hasNumber ? rawQ : `${idx + 1}. ${rawQ}`;

            return (
              <FAQAccordionItem
                key={idx}
                question={questionText}
                answer={item.a || item.answer}
                isOpen={openIdx === idx}
                onToggle={() => toggle(idx)}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default FAQ;
