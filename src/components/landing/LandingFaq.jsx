"use client";

import React from "react";
import { Collapse } from "antd";

export default function LandingFaq({ faqs = [], universityName = "University Online" }) {
  if (!faqs || faqs.length === 0) return null;

  const items = faqs.map((faq, idx) => ({
    key: String(idx),
    label: (
      <span className="text-xs sm:text-sm md:text-[14.5px] font-semibold text-slate-800">
        {faq.q}
      </span>
    ),
    children: (
      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed m-0 font-normal">
        {faq.a}
      </p>
    ),
  }));

  return (
    <section id="faqs" className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#08417b] tracking-tight mb-2 text-left m-0">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 m-0">
          Common queries about {universityName} degree approvals, admissions, and syllabus
        </p>

        <Collapse
          items={items}
          defaultActiveKey={["0"]}
          bordered={false}
          className="bg-transparent [&_.ant-collapse-item]:!border-b [&_.ant-collapse-item]:!border-slate-200 [&_.ant-collapse-header]:!px-0 [&_.ant-collapse-header]:!py-3.5 [&_.ant-collapse-content-box]:!px-0 [&_.ant-collapse-content-box]:!pb-3.5"
        />
      </div>
    </section>
  );
}
