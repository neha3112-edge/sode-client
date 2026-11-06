"use client";

import React, { useState } from "react";
import { Container } from "@/components/common/Container";

const AMITY_FAQS = [
  {
    question: "Q1. Are the Amity University online programs recognized by UGC?",
    answer:
      "Yes, Amity Online degrees are recognized by UGC and approved by AICTE (for applicable courses). They are fully recognized and have the same value as traditional degrees.",
  },
  {
    question: "Q2. What kind of online courses does Amity University online offer?",
    answer:
      "Amity University Online offers various degrees and certifications. The main programs are the UG, PG in a wide range of fields, including MBA, MCA, M.COM, MA, BA, BBA, and many more, and certificates/diplomas under Amity online programs.",
  },
  {
    question: "Q3. Is the entrance exam required to take admission in Amity University online?",
    answer:
      "No, any student doesn’t need to give any entrance exam. Admission is based on eligibility criteria.",
  },
  {
    question: "Q4. What is the approximate duration of Amity University's online degree programs?",
    answer:
      "Amity University online UG programs offer several types of online courses. 3-year UG course, 2-year PG courses, and 24-month duration certification under Amity Online programs.",
  },
  {
    question:
      "Q5. What placement support do students receive after completing an online degree at Amity University online?",
    answer:
      "The university hosts virtual job fairs and also provides placement assistance through its 500+ hiring partners and career support services.",
  },
];

export default function AmityFaq() {
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
        <h2 className="text-[#08417b] font-bold text-[24px] sm:text-[28px] md:text-[32px] leading-tight text-left mb-2 sm:mb-3">
          Frequently Asked Questions
        </h2>

        {/* Accordion Wrapper (no top border, only border-b on items matching live site) */}
        <div className="w-full">
          {AMITY_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="w-full border-b border-[#cccccc] transition-colors"
              >
                {/* Question Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className={`w-full ${
                    index === 0 ? "pt-2 sm:pt-2.5 pb-3.5 sm:pb-4" : "py-3.5 sm:py-4"
                  } px-1 sm:px-2 flex items-center justify-between text-left cursor-pointer transition-colors duration-150 select-none bg-transparent border-none`}
                  aria-expanded={isOpen}
                >
                  <span className="text-black font-medium text-[15px] sm:text-[16px] leading-snug pr-4">
                    {faq.question}
                  </span>
                  <span className="text-[#08417b] text-[22px] font-bold leading-none shrink-0 select-none">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-1 sm:px-2 pt-0 pb-4 sm:pb-5 text-left text-[#333333] text-[13px] sm:text-[14px] leading-relaxed animate-fadeIn">
                    <p className="m-0 text-[#333333]">
                      {faq.answer}
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

