"use client";

import React, { useState } from "react";
import { Container } from "@/components/common/Container";
import { MANIPAL_FAQS } from "./constants";

export default function ManipalFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faqs"
      className="w-full bg-white py-10 sm:py-14 select-none scroll-mt-16 sm:scroll-mt-20 relative"
    >
      <span id="faq" className="sr-only" aria-hidden="true" />
      <Container>
        {/* Section Heading */}
        <h2 className="font-bold text-[22px] sm:text-[28px] md:text-[32px] leading-tight text-left mb-4 sm:mb-6">
          <span className="text-[#08417b]">FAQs</span>
          <span className="text-[#08417b] font-normal mx-2">|</span>
          <span className="text-[#ee3024]">Frequently Asked Questions</span>
        </h2>

        {/* Accordion Wrapper */}
        <div className="w-full">
          {MANIPAL_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="w-full border-b border-[#cccccc] transition-colors"
              >
                {/* Question Button */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className={`w-full ${
                    index === 0 ? "pt-2 sm:pt-2.5 pb-3.5 sm:pb-4" : "py-3.5 sm:py-4"
                  } px-1 sm:px-2 flex items-center justify-between text-left cursor-pointer transition-colors duration-150 select-none bg-transparent border-none`}
                  aria-expanded={isOpen}
                >
                  <span className="text-black font-medium text-[15px] sm:text-[16px] leading-snug pr-4">
                    {faq.q}
                  </span>
                  <span className="text-[#ee3024] text-[22px] font-bold leading-none shrink-0 select-none">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-1 sm:px-2 pt-0 pb-4 sm:pb-5 text-left text-[#333333] text-[13px] sm:text-[14px] leading-relaxed">
                    <p className="m-0 text-[#333333]">
                      {faq.a}
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

