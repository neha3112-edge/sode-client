"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { IIM_FAQS } from "./constants";

export default function IimFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="w-full bg-white py-10 sm:py-14 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-black text-neutral-900 leading-tight m-0 mb-6 sm:mb-8 text-left">
          FAQ | Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-3">
          {IIM_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-[10px] border border-gray-200 border-l-[4px] border-l-[#17479E] bg-white shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-4 px-4 sm:px-5 flex items-center justify-between gap-4 text-left cursor-pointer bg-transparent border-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-[14px] sm:text-[15.5px] font-bold text-neutral-900 leading-snug">
                    {faq.q}
                  </span>
                  <span className="w-6 h-6 shrink-0 flex items-center justify-center text-neutral-700">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#17479E]" />
                    ) : (
                      <Plus className="w-4 h-4 text-neutral-600" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 text-[13px] sm:text-[14px] leading-relaxed text-neutral-600 border-t border-gray-100">
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

