"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { ESGCI_FAQS } from "./constants";

export default function EsgciFaq() {
  const [openIndex, setOpenIndex] = useState(null); // collapsed by default matching screenshot

  const toggleFaq = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="pt-3 sm:pt-5 pb-4 sm:pb-5 bg-white select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-Aligned Heading matching screenshot */}
        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-black text-left text-black m-0 mb-5 sm:mb-6 tracking-tight">
          FAQ-Frequently Asked Questions
        </h2>

        {/* Accordion Rows with Green Left Accent Bar */}
        <div className="space-y-3 sm:space-y-3.5 w-full">
          {ESGCI_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-[5px] border border-gray-200 border-l-[6px] border-l-[#04903c] shadow-2xs overflow-hidden transition-all duration-150"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-3.5 sm:py-4 text-left bg-transparent border-none cursor-pointer"
                >
                  {/* Question Text */}
                  <span className="text-[14px] sm:text-[15px] font-bold text-neutral-900 leading-snug">
                    {faq.q}
                  </span>

                  {/* Plus / Minus Toggle on the far Right */}
                  <div className="shrink-0 text-neutral-800 ml-2">
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {/* Answer Accordion Body */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 text-[13px] sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal border-t border-gray-100">
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
