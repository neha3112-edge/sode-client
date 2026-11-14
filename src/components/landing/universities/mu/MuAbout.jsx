"use client";

import React from "react";
import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { muImg } from "./constants";

export default function MuAbout({ onOpenApply }) {
  return (
    <>
      <style jsx>{`
        .mu-about-section {
          background-color: #ffffff;
        }
        @media (min-width: 1024px) {
          .mu-about-section {
            background-image: url(${muImg("about-bg.webp")});
            background-size: 100% auto;
            background-position: bottom center;
            background-repeat: no-repeat;
            min-height: 820px;
          }
        }
      `}</style>

      <section
        id="about"
        className="mu-about-section w-full pt-10 sm:pt-14 pb-0 lg:pb-16 scroll-mt-16 sm:scroll-mt-20 select-none overflow-hidden"
      >
        <Container>
          <div className="max-w-[960px] mx-auto text-center px-2 sm:px-4">
            {/* Section Heading - Orange & Uppercase matching user screenshots */}
            <h2 className="text-[#F97316] font-bold text-xl sm:text-2xl md:text-[27px] uppercase tracking-wide leading-tight m-0 mb-4 sm:mb-6">
              About Mangalayatan University Online
            </h2>

            {/* Description Content - Exact verbatim text from screenshots */}
            <div className="space-y-3.5 sm:space-y-4 text-[#333333] text-[13px] sm:text-[14.5px] leading-[1.65] font-normal text-center">
              <p className="m-0">
                Mangalayatan University Online is a University with NAAC A+ accreditation. It was established in 2006 in Aligarh, Uttar Pradesh. The university is a UGC approved University, and shows its commitment to high academic standards and quality education. This university has managed to graduate 7, 000+ students over the years, and it has been able to support 3,500+ students presently, including both Indian and foreign learners. Mangalayatan University online courses are based on online and distance learning. They have a purpose of providing affordable and flexible education to the needs of modern learners. Online Mangalayatan University will allow individuals to complete a recognised degree without having to sacrifice their jobs and commitments.
              </p>
              <p className="m-0">
                The admission process is convenient and student-friendly at Mangalayatan University. Therefore, the experience of enrolling in this university becomes simple. Mangalayatan University open the doorways to career-oriented education supported by academic excellence and online ease. Individuals can get on their way to achieving career aspirations with Mangalayatan University, where quality meets flexibility.
              </p>
            </div>

            {/* Apply Button */}
            <div className="mt-5 sm:mt-6 mb-2 flex justify-center">
              <button
                type="button"
                onClick={() => onOpenApply?.("About Section Apply")}
                className="inline-flex items-center gap-1.5 bg-[#F97316] hover:bg-[#ea580c] text-white font-bold py-2 sm:py-2.5 px-6 sm:px-7 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer border-none text-[13px] sm:text-[14px]"
              >
                <span>Apply Now</span>
                <ArrowRightOutlined className="text-xs" />
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Campus Entrance Image at bottom of section matching media_1794685007788_121b16c8.jpg */}
        <div className="block lg:hidden w-full mt-4">
          <Image
            src={muImg("about-bg-mobile.webp")}
            alt="Mangalayatan University Campus"
            width={843}
            height={632}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="w-full h-auto object-cover block"
          />
        </div>
      </section>
    </>
  );
}

