"use client";

import React from "react";
import Image from "next/image";
import { FaUserTie } from "react-icons/fa";
import { Container } from "@/components/common/Container";
import { shooliniImg } from "./constants";

export default function ShooliniAbout() {
  return (
    <section
      id="about"
      className="w-full py-12 sm:py-16 select-none bg-gradient-to-r from-[#fcf1f1] via-[#fdf7f7] to-white"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-left">
            <h2 className="text-[#fd202a] font-extrabold text-2xl sm:text-3xl md:text-[34px] tracking-tight leading-tight m-0 mb-4">
              About Shoolini University Online
            </h2>

            <p className="text-[#333333] text-xs sm:text-[13.5px] leading-[1.65] m-0 mb-5 font-normal">
              In Solan, Himachal Pradesh, Shoolini University opened its doors in 2009. Shoolini University
              Online is the extension of Shoolini University. The mission of Shoolini University is &ldquo;to
              strengthen the social and economic society through new innovations and knowledgeable methods.&rdquo;
              Shoolini University has been approved by UGC/NIRF and holds the NAAC A+ certification. Shoolini
              University aims to promote students&apos; creative potential via fair and great opportunities.
              Shoolini University Online is India&apos;s first online university to offer Pay-Ater-Placement,
              aiming to shape students&apos; future placements in an impactful way. Shoolini University offers 24/7
              digital access, its experienced faculty, and career coaching to the students for today&apos;s
              competitive world. The University ensures students&apos; learning journey is smooth, practical, and
              future-ready with its top services and facilities.
            </p>

            {/* Here's how it works box matching reference (.howwork) */}
            <div className="border-2 border-black p-4 sm:p-5 my-4 bg-transparent">
              <h3 className="text-black font-extrabold text-[15px] sm:text-base m-0 mb-1 leading-snug">
                Here&apos;s how it works:
              </h3>
              <h4 className="text-black font-bold text-xs sm:text-[13.5px] m-0 mb-2 leading-snug">
                Pay 70% upfront and the remaining 30% after placement.
              </h4>
              <p className="text-black text-xs sm:text-[12.5px] m-0 flex items-center gap-2 font-medium leading-tight">
                <FaUserTie className="text-black shrink-0 text-xs" />
                <span>Pay-After-Placement: Why Students Trust Shoolini University Online</span>
              </p>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px]">
              <Image
                src={shooliniImg("pay-after-placement.webp")}
                alt="Shoolini Pay After Placement"
                width={500}
                height={400}
                sizes="(max-width: 768px) 100vw, 480px"
                className="w-full h-auto object-contain block"
                style={{ width: "100%", height: "auto" }}
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
