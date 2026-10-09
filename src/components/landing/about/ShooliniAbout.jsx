"use client";

import React from "react";
import Image from "next/image";
import { UserCheck } from "lucide-react";

/**
 * Shoolini University Online - About Section
 * Exact reproduction of https://distanceeducationschool.com/shoolini/ (#about)
 */
export default function ShooliniAbout({ about = {}, brand = {} }) {
  const title = about.title || "About Shoolini University Online";
  const imageSrc =
    about.image ||
    "/assets/shoolini/pay-after-placement.webp";

  const paragraphText =
    about.text1 ||
    (Array.isArray(about.paragraphs) && about.paragraphs[0]) ||
    `In Solan, Himachal Pradesh, Shoolini University opened its doors in 2009. Shoolini University Online is the extension of Shoolini University. The mission of Shoolini University is "to strengthen the social and economic society through new innovations and knowledgeable methods." Shoolini University has been approved by UGC/NIRF and holds the NAAC A+ certification. Shoolini University aims to promote students' creative potential via fair and great opportunities. Shoolini University Online is India's first online university to offer Pay-Ater-Placement, aiming to shape students' future placements in an impactful way. Shoolini University offers 24/7 digital access, its experienced faculty, and career coaching to the students for today's competitive world. The University ensures students' learning journey is smooth, practical, and future-ready with its top services and facilities.`;

  return (
    <section
      id="about"
      className="py-12 sm:py-16 lg:py-20 select-none"
      style={{
        backgroundImage: "linear-gradient(to right, #fcf1f1, #ffffff)",
      }}
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Column (Left) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <h2
              className="text-[28px] sm:text-[34px] lg:text-[38px] font-black tracking-tight leading-[1.15] m-0 mb-4 sm:mb-5"
              style={{
                background: "linear-gradient(to right, #fd202a, #ff4be5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title}
            </h2>

            <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#4d4d4d] font-normal m-0 mb-6">
              {paragraphText}
            </p>

            {/* How It Works Box */}
            <div className="border-[2px] border-black p-4 sm:p-5 bg-transparent max-w-[500px]">
              <h3 className="text-[17px] sm:text-[19px] font-bold text-black m-0 mb-1 leading-snug">
                {about.howItWorks?.title || "Here’s how it works:"}
              </h3>
              <h4 className="text-[13.5px] sm:text-[14px] font-semibold text-black m-0 mb-2.5 leading-snug">
                {about.howItWorks?.subtitle ||
                  "Pay 70% upfront and the remaining 30% after placement."}
              </h4>
              <p className="text-[12.5px] sm:text-[13.5px] text-[#222222] font-medium m-0 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-black shrink-0" />
                <span>
                  {about.howItWorks?.note ||
                    "Pay-After-Placement: Why Students Trust Shoolini University Online"}
                </span>
              </p>
            </div>
          </div>

          {/* Image Column (Right) */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] lg:max-w-[500px]">
              <Image
                src={imageSrc}
                alt={title}
                width={500}
                height={550}
                priority
                className="w-full h-auto object-contain select-none pointer-events-none"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
