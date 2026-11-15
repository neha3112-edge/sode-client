"use client";

import React from "react";
import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { cuImg } from "./constants";

export default function CuAbout({ onOpenApply }) {
  return (
    <section
      id="about"
      className="w-full bg-[#152238] py-12 sm:py-16 lg:py-20 text-white scroll-mt-16 sm:scroll-mt-20 select-none overflow-hidden"
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
          {/* Left Text Content - Left-aligned on both Mobile & Desktop */}
          <div className="w-full lg:w-[48%] xl:w-[46%] shrink-0 text-left">
            <h2 className="text-white font-extrabold text-[28px] sm:text-[34px] lg:text-[40px] leading-tight sm:leading-[1.15] m-0 mb-3 sm:mb-4">
              About Chandigarh University <span className="block">Online</span>
            </h2>

            <div className="text-white/90 text-[13px] sm:text-[14px] leading-snug sm:leading-[1.38] space-y-2.5 font-normal mb-5 sm:mb-6 text-left">
              <p className="m-0">
                Chandigarh university is one of the leading Indian Institute offering its
                professional and academic excellence in online also for the students and working
                professionals as well. Chandigarh Unviersity holds 19th rank in NIRF rank, UGC
                entitled, No.1 private university rank in QS Asia university ranking 2026 and A+
                accreditation by NAAC in the first cycle itself and many more.
              </p>
              <p className="m-0">
                This university offers courses in fields such as management, computers, arts, and
                science and many more. Chandigarh online University focus on the top-quality
                education while giving learn from anywhere, anytime concept.
              </p>
            </div>

            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => onOpenApply?.("About Section Know More")}
                className="inline-flex items-center gap-2 bg-[#d11c1f] hover:bg-[#b01619] text-white font-bold py-2.5 sm:py-3 px-6 sm:px-7 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border-none text-xs sm:text-sm"
              >
                <span>Know More</span>
                <ArrowRightOutlined className="text-xs" />
              </button>
            </div>
          </div>

          {/* Right Campus Artwork: Large responsive image scaling properly across Desktop & Mobile */}
          <div className="w-full lg:w-[50%] xl:w-[52%] flex items-center justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="w-full max-w-[480px] sm:max-w-[560px] lg:max-w-[650px] xl:max-w-[700px]">
              <Image
                src={cuImg("CU-about-image1.png")}
                alt="About Chandigarh University Online"
                width={759}
                height={763}
                priority
                className="w-full h-auto object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 560px, 700px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
