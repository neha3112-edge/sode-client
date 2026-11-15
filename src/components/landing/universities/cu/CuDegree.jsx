"use client";

import React from "react";
import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { cuImg } from "./constants";

export default function CuDegree({ onOpenApply }) {
  return (
    <section
      id="degree"
      className="w-full bg-white py-12 sm:py-16 scroll-mt-16 sm:scroll-mt-20 select-none overflow-hidden"
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Left Sample Degree Image: Pure image without extra wrapper borders or background */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[540px]">
              <Image
                src={cuImg("CU-sample-degree.png")}
                alt="Chandigarh University Online Degree Certificate Sample"
                width={678}
                height={509}
                priority
                className="w-full h-auto object-contain"
                style={{ width: "100%", height: "auto" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 520px, 540px"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 text-left">
            <p className="text-gray-800 font-bold text-xs sm:text-sm uppercase tracking-wide m-0 mb-2">
              Launch Your Career with an Online Degree From
            </p>

            <h2 className="text-[#d11c1f] font-extrabold text-2xl sm:text-3xl lg:text-[32px] leading-tight sm:leading-[1.15] m-0 mb-2 sm:mb-3">
              Chandigarh University Online Learning Platform
            </h2>

            <p className="text-gray-600 text-xs sm:text-[14px] leading-snug sm:leading-[1.38] m-0 mb-4 font-normal">
              Choose from a wide range of UGC-approved online degrees designed to provide you with
              in-demand skills for today&apos;s dynamic work environment.
            </p>

            {/* Bullet points */}
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-[14px] font-medium text-gray-800 mb-5 leading-snug sm:leading-[1.35]">
              <li>Industry-expert faculty</li>
              <li>Flexible scheduling</li>
              <li>Future-ready curriculum</li>
              <li>Globally recognized degree</li>
            </ul>

            <div>
              <button
                type="button"
                onClick={() => onOpenApply?.("Degree Section Know More")}
                className="inline-flex items-center gap-2 bg-[#d11c1f] hover:bg-[#b01619] text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-7 rounded-md shadow-sm hover:shadow-md transition-all cursor-pointer border-none text-xs sm:text-sm"
              >
                <span>Know More</span>
                <ArrowRightOutlined className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

