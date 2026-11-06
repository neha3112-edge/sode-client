"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { amityImg } from "./constants";

export default function AmityAbout({ onOpenApply }) {
  return (
    <section id="about" className="w-full bg-white py-8 md:py-12 scroll-mt-16 sm:scroll-mt-20">
      <Container>
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Campus Image (Height matches content height beside it) */}
          <div className="relative w-full h-[240px] sm:h-[300px] md:h-full min-h-[260px] md:min-h-[340px] lg:min-h-[350px] rounded-[6px] overflow-hidden">
            <Image
              src={amityImg("Amity-About.png")}
              alt="About Amity University Online Campus"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-[6px]"
            />
          </div>

          {/* Right Column: About Content */}
          <div className="flex flex-col justify-between py-0.5 text-left">
            <div>
              <h2 className="text-[#08417b] md:text-[#1e293b] font-semibold md:font-bold text-[20px] md:text-[26px] lg:text-[28px] leading-snug text-center md:text-left mb-2.5 md:mb-3">
                About Amity University Online
              </h2>

              <p className="text-[#333333] text-[13px] md:text-[13.5px] leading-[1.6] text-justify md:text-left mb-2.5">
                Amity University Online is India&apos;s first UGC-approved online university.
                This university offers a total of 24 bachelor&apos;s and master&apos;s degree programs
                with a wide range of specializations. Amity University Uttar Pradesh, &apos;A+&apos; NAAC
                grade, and is recognized by WES, AIU, making it eligible to conduct online courses in
                different fields. Amity University Online Degree Programs offers an in-demand,
                up-to-date curriculum. It follows the anytime, anywhere mantra for course content,
                providing all content, live &amp; recorded lectures.
              </p>

              <p className="text-[#333333] text-[13px] md:text-[13.5px] leading-[1.6] text-justify md:text-left mb-4">
                The university also gives career support, expert mentorship, and placement assistance.
                With flexible learning options, EMI-based fee payment, and a strong academic reputation,
                it offers to its students.
              </p>
            </div>

            <div className="w-full flex justify-center md:justify-start">
              <button
                type="button"
                onClick={onOpenApply}
                className="bg-white border border-[#08417b] text-[#08417b] hover:bg-[#08417b] hover:text-white font-medium text-[13px] px-4 py-1.5 rounded-[4px] transition-all duration-200 cursor-pointer select-none inline-flex items-center gap-1.5"
              >
                <span>Apply Now</span>
                <svg
                  className="w-3 h-3 fill-current shrink-0"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                >
                  <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Section Bottom Divider */}
        <hr className="mt-8 md:mt-12 border-t border-gray-300" />
      </Container>
    </section>
  );
}
