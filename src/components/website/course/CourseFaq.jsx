"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function CourseFaq({
  faqList,
  courseData,
  universityName,
}) {
  const [openFaq, setOpenFaq] = useState(0);

  if (!faqList || faqList.length === 0) return null;

  return (
    <div
      id="faqs"
      className="scroll-mt-16 bg-white rounded-xl shadow-xs border border-gray-200 p-6 sm:p-8 space-y-6"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-5 text-center">
        FAQs on {courseData?.name || "Course"} {universityName ? `at ${universityName}` : ""}
      </h2>

      <div className="space-y-3 max-w-5xl mx-auto">
        {faqList.map((faq, idx) => {
          const isOpen = openFaq === idx;
          const question = faq.question || faq.q || "";
          const answer = faq.answer || faq.a || "";

          return (
            <div
              key={faq._id || idx}
              className={`rounded-xl border border-gray-300 transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-blue-400 bg-blue-200/30 shadow-2xs"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                className="w-full flex items-center justify-between gap-4 p-2 sm:p-2.5 text-left cursor-pointer bg-transparent border-none outline-none"
              >
                <span
                  className={`text-xs sm:text-[14px] font-semibold leading-snug ${
                    isOpen ? "text-[#0C2B4E]" : "text-gray-900"
                  }`}
                >
                  Q{idx + 1}. {question}
                </span>
                <span
                  className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 transition-colors ${
                    isOpen
                      ? "bg-[#0C2B4E] text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {isOpen ? <Minus size={10} /> : <Plus size={10} />}
                </span>
              </button>

              {isOpen && (
                <div className="p-3 text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal border-t border-blue-100/60 whitespace-pre-line">
                  {answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
