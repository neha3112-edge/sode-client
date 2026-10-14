"use client";

import React from "react";

const COURSES_LIST = [
  {
    code: "MBA",
    title: "Master of Business Administration",
    duration: "| Duration : 2 Years",
    eligibility: "| Eligibility : Graduation",
    desc: "The Galgotias online MBA program equip professionals and learners with leadership, advanced business and strategic management skills that are required for modern organisations.",
    image: "/assets/galgotias/mba-galgotia.webp",
  },
  {
    code: "MCA",
    title: "Master of Computer Application",
    duration: "| Duration : 2 Years",
    eligibility: "| Eligibility : Graduation",
    desc: "This technology-focused program from Galgotias online is designed for students to build expertise in data management, software development, and modern computing systems.",
    image: "/assets/galgotias/mca-galgotia.webp",
  },
  {
    code: "MCOM",
    title: "Master of Commerce",
    duration: "| Duration : 2 Years",
    eligibility: "| Eligibility : Graduation",
    desc: "This two-year postgraduate program of Gagotias University online is designed to strengthen financial management, accounting expertise, and decision-making strategy in business.",
    image: "/assets/galgotias/mcom-galgotia.webp",
  },
  {
    code: "MA",
    title: "Master of Arts",
    duration: "| Duration : 2 Years",
    eligibility: "| Eligibility : Graduation",
    desc: "This Master's in Arts program develops advanced analytical thinking and skills through research in particular subject knowledge, such as Economics, English etc.",
    image: "/assets/galgotias/ma-galgotia.webp",
  },
  {
    code: "BCA",
    title: "Bachelor of Computer Applications",
    duration: "| Duration : 3 Years",
    eligibility: "| Eligibility : 10+2 from a recognised board",
    desc: "This three-year foundation program focused on programming, software development, and emerging IT technologies, helping students to build their careers in digital technologies.",
    image: "/assets/galgotias/BCA.webp",
  },
  {
    code: "BBA",
    title: "Bachelor of Business Administration",
    duration: "| Duration : 3 Years",
    eligibility: "| Eligibility : 10+2 from a recognised board",
    desc: "A business-oriented undergraduate Galgotias online BBA course builds managerial skills and prepares students for leadership roles, offering them the opportunity to study across fields of programming languages.",
    image: "/assets/galgotias/BBA.webp",
  },
];

export default function GalgotiasGrid({
  brand = {},
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  return (
    <section id="program" className="py-12 sm:py-16 bg-white select-none scroll-mt-20">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-[26px] sm:text-[32px] md:text-[34px] font-bold text-[#002266] m-0 mb-2">
            Galgotias University online courses
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#444444] max-w-2xl mx-auto leading-relaxed m-0 font-normal">
            Galgotias University offers a variety of online degree programs for students from different backgrounds. Given below are the course details.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {COURSES_LIST.map((c, idx) => (
            <div
              key={c.code || idx}
              className="card-box bg-[#333333] rounded-[10px] shadow-[0_0_8px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 transition-transform duration-300 flex flex-col justify-between overflow-hidden text-left"
            >
              <div>
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-[175px] sm:h-[185px] object-cover rounded-t-[10px]"
                />
                <div className="p-4 sm:p-5 text-white">
                  <h2 className="text-[25px] sm:text-[27px] font-bold text-[#f9bc08] m-0 leading-tight">
                    {c.code}
                  </h2>
                  <p className="text-[12px] sm:text-[12.5px] font-medium text-white mt-1 m-0">
                    {c.title}
                  </p>
                  <p className="text-[11.5px] font-medium text-white/90 mt-2 m-0">
                    {c.duration}
                  </p>
                  <p className="text-[11.5px] font-medium text-white/90 mt-0.5 m-0">
                    {c.eligibility}
                  </p>
                  <p className="card_desc text-[11px] text-white/80 leading-[1.4] mt-3 m-0">
                    {c.desc}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <hr className="border-t border-neutral-600 mb-3.5 m-0" />
                <div className="card-footer flex items-center justify-between gap-2 p-0">
                  <button
                    type="button"
                    onClick={() => onSelectCourseForBrochure?.(c.code, "Download Brochure")}
                    className="b1 inline-flex items-center gap-1.5 bg-white text-[#bc1820] font-bold text-[12px] sm:text-[12.5px] px-3.5 py-1.5 rounded-full border border-white hover:bg-slate-100 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Get Brochure</span>
                    <i className="fa fa-download text-[11px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(c.code, "Apply Now")}
                    className="b2 inline-flex items-center bg-[#bc1820] text-white font-bold text-[12px] sm:text-[12.5px] px-4 py-1.5 rounded-full border-none hover:bg-[#a0131a] transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
