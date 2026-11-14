"use client";

import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { SMU_FAQS } from "./constants";

export default function SmuFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Peach Box */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-sm bg-[#fff8f2] rounded-3xl p-8 sm:p-10 text-center flex flex-col justify-center items-center shadow-sm border border-[#ffe5cc] min-h-[220px]">
              <span className="text-4xl sm:text-5xl font-black text-[#f58220] tracking-tight">
                FAQ
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#1a202c] mt-2">
                Frequently Asked Question
              </h3>
              <p className="text-xs text-gray-500 mt-2">
                Have questions regarding Sikkim Manipal University Online? Find your answers here.
              </p>
            </div>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-8 space-y-3">
            {SMU_FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#f4f4f4] rounded-lg overflow-hidden border-l-4 border-[#f58220] shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-4 text-left flex justify-between items-center gap-3 font-semibold text-sm sm:text-base text-gray-800 hover:text-[#074a76] cursor-pointer"
                  >
                    <span>
                      Q{idx + 1}- {faq.q}
                    </span>
                    <DownOutlined
                      className={`text-xs text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#f58220]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

