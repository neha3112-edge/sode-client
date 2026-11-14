"use client";

import React from "react";
import Image from "next/image";
import { smuImg } from "./constants";

export default function SmuLeader() {
  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
          {/* Mobile Image (Visible only on < lg, at the VERY TOP) */}
          <div className="w-full max-w-[320px] sm:max-w-[360px] lg:hidden flex justify-center">
            <div className="relative w-full aspect-[4/4.4] rounded-2xl overflow-hidden bg-[#f0f2f5] shadow-sm">
              <Image
                src={smuImg("img.png")}
                alt="Dr. GK Prabhu, Vice Chancellor, Sikkim Manipal University"
                width={400}
                height={450}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Text Content: Left-aligned on Desktop, Centered on Mobile */}
          <div className="w-full lg:w-7/12 xl:w-2/3 text-center lg:text-left flex flex-col items-center lg:items-start space-y-3 sm:space-y-4">
            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold text-[#111827] tracking-tight leading-tight m-0 text-center lg:text-left">
              The Visionary Leader Behind Sikkim Manipal University Online
            </h2>

            <p className="text-[#333333] text-[13px] sm:text-[14px] leading-[1.55] sm:leading-[1.65] m-0 text-center lg:text-left font-normal">
              Sikkim Manipal University is led by Dr. G. K. Prabhu, Vice Chancellor of SMU.He believes that there is the potential of changing lives through access to quality education. He points out that e-learning is no longer a matter of convenience in modern times. It is also a strategic, empowering power. Sikkim Manipal University ensures to provide academically rich education, student-centred degree programs which hold relevance in today&apos;s industries. These programs are aimed at providing students with the skills, knowledge and confidence to be able to fit in a fast-changing global world.
            </p>

            <div className="pt-2 text-center lg:text-left">
              <div className="text-[14px] sm:text-[15.5px] font-bold text-[#074a76]">
                Dr. GK Prabhu
              </div>
              <div className="text-[12.5px] sm:text-[13.5px] font-medium text-[#074a76] mt-0.5">
                Vice Chancellor, Sikkim Manipal University
              </div>
            </div>
          </div>

          {/* Desktop Image (Visible only on >= lg, on the RIGHT) */}
          <div className="hidden lg:flex lg:w-5/12 xl:w-1/3 justify-end">
            <div className="relative w-full max-w-[340px] xl:max-w-[370px] aspect-[4/4.4] rounded-2xl overflow-hidden bg-[#f0f2f5] shadow-sm">
              <Image
                src={smuImg("img.png")}
                alt="Dr. GK Prabhu, Vice Chancellor, Sikkim Manipal University"
                width={400}
                height={450}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
