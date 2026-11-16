"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { EDGEWOOD_FAQS } from "./constants";

export default function EdgewoodFaq() {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const toggleFaq = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faqs" className="py-12 sm:py-16 bg-white select-none scroll-mt-20">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Deep Royal Blue Heading */}
        <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-black text-center text-[#0056b3] m-0 mb-8 sm:mb-10 tracking-tight">
          FAQ-Frequently Asked Question
        </h2>

        <div className="space-y-3.5">
          {EDGEWOOD_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-[16px] overflow-hidden transition-all ${
                  isOpen
                    ? "bg-[#f2f4f7] border border-neutral-200/80 shadow-xs"
                    : "bg-white border border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center gap-3.5 p-4 sm:p-5 text-left bg-transparent border-none cursor-pointer transition-colors"
                >
                  {/* Square Blue Toggle Button on the LEFT */}
                  <div className="w-5.5 h-5.5 rounded-[4px] bg-[#0056b3] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>

                  {/* Question Text in Royal Blue */}
                  <span className="text-[14.5px] sm:text-[15.5px] font-bold text-[#0056b3] leading-snug">
                    {faq.q}
                  </span>
                </button>

                {/* Answer Indented below Question */}
                {isOpen && (
                  <div className="pl-13 pr-5 sm:pl-14 sm:pr-6 pb-5 pt-0 text-[13px] sm:text-[13.5px] text-[#555555] leading-relaxed">
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
