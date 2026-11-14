"use client";

import React, { useState } from "react";
import { SMU_FAQS } from "./constants";

export default function SmuFaq() {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#111827] tracking-tight leading-tight mb-5 sm:mb-6 text-left">
          FAQ&apos;S | Frequently Asked Questions
        </h2>

        {/* Full-width Accordion List */}
        <div className="space-y-2.5 sm:space-y-3">
          {SMU_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#f4f4f4] hover:bg-[#f0f0f0] rounded-md sm:rounded-lg border border-gray-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-3.5 px-4 sm:px-5 text-left flex justify-between items-center gap-3 cursor-pointer border-none bg-transparent"
                >
                  <span className="font-semibold text-[13.5px] sm:text-[14.5px] text-[#222222] leading-snug">
                    Q{idx + 1}. {faq.q}
                  </span>
                  <span className="text-[#333333] font-bold text-lg sm:text-xl leading-none select-none shrink-0 ml-2">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1.5 text-[13px] sm:text-[13.5px] text-[#555555] leading-relaxed border-t border-gray-200/70">
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
