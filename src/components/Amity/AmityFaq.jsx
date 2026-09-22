"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function AmityFaq() {
  const [openIndex, setOpenIndex] = useState(1); // default Q2 open matching screenshot

  const faqs = [
    {
      q: "Q1. Are the Amity University online programs recognized by UGC?",
      a: "Yes, Amity University Online programs are fully recognized and entitled by the University Grants Commission (UGC) of India. They also hold NAAC A+ accreditation, AICTE approvals, and global recognitions such as WASC (USA) and WES.",
    },
    {
      q: "Q2. What kind of online courses does Amity University online offer?",
      a: "Amity University Online offers various degrees and certifications. The main programs are the UG, PG in a wide range of fields, including MBA, MCA, M.COM, MA, BA, BBA, and many more, and certificates/diplomas under Amity online programs.",
    },
    {
      q: "Q3. Is the entrance exam required to take admission in Amity University online?",
      a: "No entrance examination is required for admission to most online degree programs at Amity University. Admissions are granted on the basis of eligibility criteria and academic merit in qualifying exams.",
    },
    {
      q: "Q4. What is the approximate duration of Amity University's online degree programs?",
      a: "Undergraduate programs (UG) such as BA, BBA, BCA, and B.Com generally have a duration of 3 years (6 semesters), while Postgraduate programs (PG) such as MBA, MCA, M.Com, MA, and M.Sc are of 2 years (4 semesters).",
    },
    {
      q: "Q5. What placement support do students receive after completing an online degree at Amity University online?",
      a: "Amity University Online provides dedicated virtual placement assistance, AI-powered career discovery tools, resume building, mock interviews, and access to 500+ top hiring partners across multinational corporations.",
    },
  ];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#08417b] tracking-tight mb-6 sm:mb-8 text-left">
          Frequently Asked Questions
        </h2>

        {/* Minimalist Accordion List */}
        <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-4 sm:py-5">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                >
                  <span
                    className={`text-xs sm:text-sm md:text-[14.5px] transition-colors ${
                      isOpen
                        ? "font-bold text-slate-900"
                        : "font-semibold text-slate-700 group-hover:text-[#08417b]"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span className="text-[#08417b] font-bold shrink-0 select-none">
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-3 pb-1 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal animate-in fade-in duration-200">
                    <p>{faq.a}</p>
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
