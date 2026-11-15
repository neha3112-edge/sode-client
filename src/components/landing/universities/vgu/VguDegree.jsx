"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { vguImg } from "./constants";

export default function VguDegree({ onOpenApply }) {
  const points = [
    {
      title: "UGC Entitled",
      desc: "Online VGU degrees approved by UGC are valued across India.",
    },
    {
      title: "NAAC Accreditation",
      desc: "This shows that VGU University courses follow the latest higher-education quality standards.",
    },
    {
      title: "AICTE Approved",
      desc: "All India Council for Technical Education guidelines are adhered to by Vivekananda Global University course admissions.",
    },
    {
      title: "Globally Acknowledged",
      desc: "Online VGU degrees are recognised and accepted worldwide.",
    },
  ];

  return (
    <section
      id="degree"
      className="w-full bg-[#f8f9fa] py-12 sm:py-16 scroll-mt-16 sm:scroll-mt-20 select-none overflow-hidden"
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Left Checklist & Call to action */}
          <div className="w-full lg:w-1/2 text-left">
            <h2 className="text-[#811811] font-bold text-2xl sm:text-3xl lg:text-[34px] leading-tight m-0 mb-5">
              Globally Accepted <br />
              <span className="text-gray-900">
                Online Vivekananda Global University Degree
              </span>
            </h2>

            <div className="space-y-3.5 mb-6">
              {points.map((pt, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="relative w-5 h-5 shrink-0 mt-0.5">
                    <Image
                      src={vguImg("green-tick-icon.webp")}
                      alt="Check"
                      fill
                      sizes="20px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-sm m-0 leading-snug">
                      {pt.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-[12.5px] leading-snug m-0 font-normal">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => onOpenApply?.("Degree Section Get Your Degree")}
                className="bg-[#ffc107] hover:bg-[#e0a800] text-black font-bold text-xs sm:text-sm py-2.5 px-7 rounded-md shadow-sm transition-all cursor-pointer border-none active:scale-95"
              >
                Get Your Degree
              </button>
            </div>
          </div>

          {/* Right Sample Degree Image - Clean without wrapper borders */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-[440px] sm:max-w-[480px]">
              <Image
                src={vguImg("sample-degree-vgu.webp")}
                alt="Vivekananda Global University Sample Degree"
                width={600}
                height={800}
                priority
                className="w-full h-auto object-contain mx-auto"
                sizes="(max-width: 640px) 100vw, 480px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

