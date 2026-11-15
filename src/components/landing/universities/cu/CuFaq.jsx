"use client";

import React, { useState } from "react";
import { Container } from "@/components/common/Container";
import { CU_FAQS } from "./constants";

export default function CuFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="w-full bg-white py-10 sm:py-14 lg:py-16 scroll-mt-16 sm:scroll-mt-20 select-none"
    >
      <Container>
        <div className="w-full max-w-5xl mx-auto text-left">
          {/* Section Heading - Left-aligned red title matching user reference */}
          <h2 className="text-[#d11c1f] font-extrabold text-[24px] sm:text-[28px] md:text-[32px] leading-tight m-0 mb-6 sm:mb-8 text-left">
            Frequently Asked Questions
          </h2>

          {/* FAQs List: Clean horizontal divider rows with red triangle toggles */}
          <div className="w-full">
            {CU_FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-gray-200 py-3.5 sm:py-4">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left flex items-center justify-between gap-4 cursor-pointer bg-transparent border-none p-0 focus:outline-none select-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-black font-bold text-[13.5px] sm:text-[14.5px] leading-normal text-left">
                      {faq.question}
                    </span>
                    <span className="text-[#d11c1f] text-[11px] sm:text-xs shrink-0 select-none ml-4">
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-2.5 pb-1 text-[#444444] text-[12.5px] sm:text-[13px] leading-relaxed text-left">
                      <p className="m-0 font-normal">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
