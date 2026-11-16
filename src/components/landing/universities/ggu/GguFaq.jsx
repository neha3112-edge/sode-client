"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { GGU_FAQS } from "./constants";

export default function GguFaq() {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faqs" className="w-full bg-[#fbfcfd] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-[1080px] mx-auto">
        {/* Section Heading */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-black text-black leading-tight m-0">
            FAQ-Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {GGU_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 border-l-[6px] border-l-[#003468] rounded-[6px] shadow-xs overflow-hidden transition-all duration-200"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between gap-4 text-left cursor-pointer border-none bg-transparent"
                  aria-expanded={isOpen}
                >
                  <span className="text-[14px] sm:text-[15.5px] font-bold text-neutral-900 leading-snug">
                    {faq.q}
                  </span>
                  <div className="shrink-0 w-6 h-6 flex items-center justify-center text-neutral-800">
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-4 pt-1 border-t border-gray-100 bg-neutral-50/50">
                    <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-neutral-600 m-0 font-normal">
                      {faq.a}
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

