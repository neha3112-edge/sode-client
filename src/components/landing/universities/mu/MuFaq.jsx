"use client";

import React, { useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { MU_FAQS } from "./constants";

export default function MuFaq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="w-full bg-white py-10 sm:py-14 md:py-16 scroll-mt-16 sm:scroll-mt-20 select-none"
    >
      <Container>
        {/* Section Heading - Matches media_1794685693320_9ee653c8.png */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
          <h2 className="font-bold text-2xl sm:text-[28px] md:text-[32px] text-[#1e293b] leading-tight m-0">
            <span className="text-[#193579]">FAQ - </span>
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-[1020px] mx-auto space-y-3 sm:space-y-3.5 px-1 sm:px-4">
          {MU_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#e7edf3] rounded-lg overflow-hidden border-l-[4px] sm:border-l-[5px] border-l-[#f97316] transition-colors shadow-2xs hover:shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left py-3 px-3.5 sm:py-3.5 sm:px-5 flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none focus:outline-none select-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-[#1e293b] font-semibold text-[13px] sm:text-[14.5px] md:text-[15px] leading-snug tracking-tight">
                    » Q{index + 1}- {faq.question}
                  </span>
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#f97316] hover:bg-[#ea580c] text-white flex items-center justify-center shrink-0 shadow-xs transition-colors">
                    {isOpen ? (
                      <MinusOutlined className="text-[10px] sm:text-[11px] font-bold" />
                    ) : (
                      <PlusOutlined className="text-[10px] sm:text-[11px] font-bold" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-4 text-[#475569] text-xs sm:text-[13.5px] leading-relaxed border-t border-gray-300/50 pt-2.5 bg-white/50">
                    <p className="m-0 font-normal">{faq.answer}</p>
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
