"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { GALGOTIAS_FAQS } from "./constants";

export default function GalgotiasFaq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faqs" className="py-12 sm:py-16 bg-white select-none scroll-mt-20">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[32px] md:text-[34px] font-bold text-center text-[#111111] m-0 mb-8 sm:mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {GALGOTIAS_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-[8px] overflow-hidden transition-all bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-4.5 text-left bg-transparent border-none cursor-pointer hover:bg-gray-50/70 transition-colors"
                >
                  <span className="text-[14px] sm:text-[15px] font-semibold text-[#222222] leading-snug">
                    {faq.q}
                  </span>
                  <div className="shrink-0 text-gray-500">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-gray-700" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-700" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-0 text-[13px] sm:text-[13.5px] text-[#555555] leading-relaxed border-t border-gray-100">
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

