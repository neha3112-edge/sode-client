"use client";

import React, { useState } from "react";
import LandingContainer from "./LandingContainer";

export default function LandingFaq({ faqs = [], universityName = "University Online", brand = {} }) {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default matching screenshot
  const headingColor = brand.faqHeaderColor || "#08417b";
  const iconColor = brand.faqIconColor || brand.primaryColor || "#fd202a";

  if (!faqs || faqs.length === 0) return null;

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-10 sm:py-16 bg-white">
      <LandingContainer>
        {/* Title matching screenshot and style4.css */}
        <h2
          className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6 sm:mb-8 text-left m-0"
          style={{ color: headingColor }}
        >
          Frequently Asked Questions
        </h2>

        {/* Clean Accordion List matching screenshot */}
        <div className="w-full divide-y divide-slate-200 border-t border-slate-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            // Ensure Q1., Q2. prefix
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
