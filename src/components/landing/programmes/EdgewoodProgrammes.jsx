"use client";

import React from "react";
import Image from "next/image";
import { Download, ArrowDown } from "lucide-react";

export default function EdgewoodProgrammes({
  programmes = [],
  brand = {},
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const defaultCourses = [
    {
      id: "online-dba",
      title: "Edgewood University Online DBA:",
      image: "/assets/all_universities_images/edgewood/online-dba-edgewood.webp",
      description:
        "The Online DBA accredited by HCL introduces learners to board dynamics, strategic finance, decision-making, and digital transformation. This 24-month program prepares professionals for the Dr. title, with real-time project exposure and top faculty, following a 5-day campus immersion and the Online Networking Gala for Network and Career Growth.",
      duration: "24 Months",
      eligibility: "Bachelor's + Master's Degree with relevant experience",
    },
    {
      id: "online-mba-dba",
      title: "Edgewood University Online MBA + DBA:",
      image: "/assets/all_universities_images/edgewood/dbamba-edgewood.webp",
      description:
        "Edgewood University Online MBA + DBA combines doctoral research with applied business leadership. The program delivers strategic finance, organizational leadership, and executive decision-making frameworks across global markets.",
      duration: "36 Months",
      eligibility: "Bachelor's Degree with minimum marks & work experience",
    },
  ];

  const coursesList =
    Array.isArray(programmes) && programmes.length > 0 ? programmes : defaultCourses;

  const heading = brand.programmesTitle || "COURSES OFFERED";
  const subHeading = brand.programmesSubtitle || "By Edgewood University Online";
  const primaryColor = brand.primaryColor || "#ba0000";

  return (
    <section id="courses" className="py-12 sm:py-16 bg-[#e6e6e6] select-none scroll-mt-20">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2
            className="text-[26px] sm:text-[32px] font-extrabold uppercase m-0 leading-tight"
            style={{ color: primaryColor }}
          >
            {heading}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#333333] font-bold mt-1.5 m-0">
            {subHeading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1050px] mx-auto">
          {coursesList.map((c, idx) => (
            <div
              key={c.id || idx}
              className="bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Course Header Image */}
                {c.image ? (
                  <div className="relative w-full h-[220px] sm:h-[240px] bg-slate-100 overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  </div>
                ) : null}

                {/* Course Card Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#111111] mb-2.5 leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-[14px] text-[#444444] leading-relaxed mb-4">
                    {c.description}
                  </p>

                  <div className="space-y-1.5 pt-1 text-[13.5px] text-[#222222]">
                    {c.duration && (
                      <p className="m-0">
                        <strong className="font-bold text-[#111111]">Duration:</strong> {c.duration}
                      </p>
                    )}
                    {c.eligibility && (
                      <p className="m-0">
                        <strong className="font-bold text-[#111111]">Eligibility:</strong> {c.eligibility}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 pt-0 flex flex-wrap sm:flex-nowrap gap-3">
                <button
                  type="button"
                  onClick={() => onSelectCourseForBrochure?.(c.title)}
                  className="w-full py-2.5 px-4 rounded-[6px] border border-[#ba0000] text-[#ba0000] hover:bg-[#ba0000] hover:text-white font-bold text-[14px] transition-all cursor-pointer flex items-center justify-center gap-1.5 bg-transparent"
                >
                  <span>Get Brochure</span>
                  <span className="text-[13px]">↓</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenApply?.(c.title)}
                  className="w-full py-2.5 px-4 rounded-[6px] bg-[#ba0000] text-white hover:brightness-90 font-bold text-[14px] transition-all cursor-pointer border-none flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Apply now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

