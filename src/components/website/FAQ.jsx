"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
export function FAQ({ initialFaqs = [] }) {
  const faqsList = Array.isArray(initialFaqs) ? initialFaqs : [];
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faqs"
      className="py-16 scroll-mt-10 md:py-24 bg-white overflow-hidden"
    >
      <Container className="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading and description */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="text-5xl md:text-[64px] font-extrabold text-[#1d3557] tracking-tight leading-none">
              FAQs
            </h2>
            <h3 className="text-xl md:text-[22px] font-bold text-[#1d3557] mt-4 leading-tight">
              Frequently Asked Question
            </h3>
            <p className="text-gray-500 font-medium mt-3 text-sm md:text-[14px] leading-relaxed max-w-sm">
              Still deciding? Book a no-pressure call and we&apos;ll map the
              right path with you.
            </p>
          </div>

          {/* Right Column: Accordion list */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {faqsList.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-white hover:bg-slate-50 transition-colors cursor-pointer gap-4"
                  >
                    <span className="font-bold text-[#1d3557] text-sm md:text-base leading-snug">
                      {item.q}
                    </span>
                    <div className="shrink-0 text-slate-400">
                      {isOpen ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 12H4"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 md:px-6 md:pb-6 text-gray-600 text-xs md:text-sm leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                      {item.a}
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

export default FAQ;
