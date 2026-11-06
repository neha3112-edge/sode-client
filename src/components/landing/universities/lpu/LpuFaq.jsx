"use client";

import React from "react";
import { Collapse } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { LPU_FAQS } from "./constants";

export default function LpuFaq() {
  const faqItems = LPU_FAQS.map((item, idx) => ({
    key: String(idx + 1),
    label: (
      <span className="font-semibold text-[13px] sm:text-[13.5px] md:text-[14px] text-[#222222] leading-snug">
        Q{idx + 1}- {item.q}
      </span>
    ),
    children: (
      <p className="text-[#555555] text-[12.5px] sm:text-[13px] leading-relaxed m-0 font-normal">
        {item.a}
      </p>
    ),
  }));

  return (
    <section
      id="faqs"
      className="w-full bg-white py-10 sm:py-14 lg:py-16 scroll-mt-16 sm:scroll-mt-20 select-none text-left"
    >
      <Container>
        {/* 2-Column FAQ Layout matching media_1793969566203_fde7a7bb.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Peach Box */}
          <div className="lg:col-span-4 bg-[#fff8f2] rounded-[6px] p-7 sm:p-9 lg:p-10 flex flex-col justify-center text-left shadow-2xs">
            <h2 className="text-[#f58220] font-black text-[42px] sm:text-[50px] lg:text-[56px] leading-none m-0 mb-2">
              FAQ
            </h2>
            <h3 className="text-[#111827] font-bold text-[19px] sm:text-[22px] lg:text-[24px] leading-tight m-0">
              Frequently Asked Question
            </h3>
          </div>

          {/* Right Column: 5 FAQ Accordion items with orange left bar */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <Collapse
              items={faqItems}
              defaultActiveKey={["1"]}
              expandIconPlacement="end"
              expandIcon={({ isActive }) =>
                isActive ? (
                  <MinusOutlined className="text-[#f58220] text-[12px]" />
                ) : (
                  <PlusOutlined className="text-[#f58220] text-[12px]" />
                )
              }
              className="bg-transparent border-none space-y-2 sm:space-y-2.5 [&_.ant-collapse-item]:bg-[#f2f2f2] [&_.ant-collapse-item]:border-none [&_.ant-collapse-item]:border-l-4 [&_.ant-collapse-item]:border-l-[#f58220] [&_.ant-collapse-item]:rounded-r-[4px] [&_.ant-collapse-header]:py-2.5 sm:[&_.ant-collapse-header]:py-3 [&_.ant-collapse-header]:px-3.5 sm:[&_.ant-collapse-header]:px-4 [&_.ant-collapse-header]:items-center [&_.ant-collapse-content]:bg-[#f2f2f2] [&_.ant-collapse-content]:border-t-0 [&_.ant-collapse-content-box]:px-4 [&_.ant-collapse-content-box]:pb-3.5 [&_.ant-collapse-content-box]:pt-0"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

