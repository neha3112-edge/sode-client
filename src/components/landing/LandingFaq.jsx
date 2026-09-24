"use client";

import React, { useState } from "react";
import LandingContainer from "./LandingContainer";

export default function LandingFaq({ faqs = [], universityName = "University Online", brand = {} }) {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default matching screenshot
  const brandColor = brand.primaryColor || "#08417b";

  if (!faqs || faqs.length === 0) return null;

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-10 sm:py-16 bg-white">
      <LandingContainer>
        {/* Title matching screenshot */}
        <h2
          className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 sm:mb-8 text-left m-0"
          style={{ color: brandColor }}
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
                    className={`text-[13.5px] sm:text-[15px] leading-snug transition-colors ${isOpen
                      ? "text-slate-900 font-semibold"
                      : "text-slate-700 font-normal sm:font-medium hover:text-slate-900"
                      }`}
                  >
                    {formattedQuestion}
                  </span>
                  <span
                    className="font-bold text-xl sm:text-2xl leading-none shrink-0 w-6 text-right select-none"
                    style={{ color: brandColor }}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-4 pt-1 text-[13px] sm:text-[14px] text-slate-700 leading-relaxed font-normal">
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
