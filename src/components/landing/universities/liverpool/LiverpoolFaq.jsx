"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { LIVERPOOL_FAQS } from "./constants";

export default function LiverpoolFaq() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section id="faq" className="w-full bg-[#f8fbff] py-12 sm:py-16 select-none">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-[26px] sm:text-[34px] md:text-[38px] font-black text-[#111111] leading-tight m-0 mb-8 sm:mb-12">
          Frequently Asked Questions
        </h2>

        {/* FAQs Accordion List */}
        <div className="flex flex-col gap-3.5 sm:gap-4 text-left">
          {LIVERPOOL_FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-2xs transition-shadow"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 sm:py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer bg-transparent border-none focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="text-[14.5px] sm:text-[15.5px] font-bold text-[#111111] leading-snug">
                    {faq.q}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-[#e6f7f9] flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#00bcd4]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#00bcd4]" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-[13.5px] text-[#555555] leading-relaxed border-t border-gray-100 font-normal">
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

