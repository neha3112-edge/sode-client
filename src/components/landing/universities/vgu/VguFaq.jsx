"use client";

import React, { useState } from "react";
import { PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { VGU_FAQS } from "./constants";

export default function VguFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="w-full bg-white py-12 sm:py-16 scroll-mt-16 sm:scroll-mt-20 select-none"
    >
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-[#811811] font-extrabold text-2xl sm:text-3xl md:text-[34px] leading-tight m-0">
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQs List: Gray pill rows with circular plus/minus icons */}
          <div className="space-y-3">
            {VGU_FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#f4f6fa] rounded-lg overflow-hidden border border-gray-100 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-4 cursor-pointer bg-transparent border-none focus:outline-none select-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-gray-900 font-semibold text-xs sm:text-[14.5px] leading-snug">
                      » {faq.question}
                    </span>
                    <span className="text-[#13325b] text-base sm:text-lg shrink-0">
                      {isOpen ? <MinusCircleFilled /> : <PlusCircleFilled />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-4.5 pt-1 text-gray-700 text-xs sm:text-[13.5px] leading-snug text-left border-t border-gray-200/60 bg-white">
                      <p className="m-0 font-normal pt-2">{faq.answer}</p>
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

