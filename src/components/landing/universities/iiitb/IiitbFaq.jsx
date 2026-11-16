"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { IIITB_FAQS } from "./constants";

export default function IiitbFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faqs" className="w-full bg-white py-12 sm:py-16 select-none">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-[26px] sm:text-[32px] font-black text-[#01519a] m-0 leading-tight">
            FAQ-Frequently Asked Question
          </h2>
        </div>

        {/* Accordion Container */}
        <div className="flex flex-col gap-3.5">
          {IIITB_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`border rounded-[15px] overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? "bg-[#f1f1f1] border-transparent shadow-xs"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Question Header */}
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-5 sm:px-6 flex items-center gap-3.5 sm:gap-4 text-left border-none bg-transparent cursor-pointer"
                  aria-expanded={isOpen}
                >
                  {/* Square Status Icon */}
                  <div className="w-5 h-5 rounded-[4px] bg-[#01519a] flex items-center justify-center shrink-0 text-white">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>

                  <span className="text-[14.5px] sm:text-[16px] font-bold text-[#01519a] leading-snug">
                    {faq.q}
                  </span>
                </button>

                {/* Answer Body */}
                {isOpen && (
                  <div className="pl-[50px] sm:pl-[60px] pr-6 pb-4 sm:pb-5 pt-0">
                    <p className="text-[13px] sm:text-[14px] leading-relaxed text-neutral-600 m-0 font-normal">
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

