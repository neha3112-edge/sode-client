"use client";

import React, { useState } from "react";
import { Container } from "@/components/common/Container";
import { SHOOLINI_FAQS } from "./constants";

export default function ShooliniFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="w-full py-12 sm:py-16 bg-[#fffaf8] select-none">
      <Container className="max-w-[950px]">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-[#fd202a] font-extrabold text-2xl sm:text-3xl md:text-[34px] leading-tight m-0">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-2">
            Clear all your doubts about Shoolini University Online admissions, fees, and Pay-After-Placement.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {SHOOLINI_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="border border-red-100/80 rounded-xl overflow-hidden bg-white shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left p-4 sm:p-5 bg-white hover:bg-[#fff9f6] transition-colors cursor-pointer border-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-[14.5px] font-bold text-gray-900 pr-4 leading-snug flex items-center gap-2.5">
                    <span className="text-[#fd202a] font-extrabold text-lg">
                      {isOpen ? "−" : "+"}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 bg-white border-t border-gray-100">
                    <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed m-0 pt-2.5">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

