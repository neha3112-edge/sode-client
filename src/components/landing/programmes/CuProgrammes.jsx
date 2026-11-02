"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Clock, Download } from "lucide-react";
import LandingContainer from "../LandingContainer";

const UG_PROGRAMMES = [
  {
    code: "BBA",
    title: "Bachelor of Business Administration",
    desc: "Kickstart your management career with Chandigarh University BBA in Marketing, HR, Finance, and more.",
    duration: "3 Years",
    image: "/assets/cu/bba-cu.png",
  },
  {
    code: "BCA",
    title: "Bachelor of Computer Application",
    desc: "Develop IT and programming skills via Chandigarh online University’s adaptable Online BCA program.",
    duration: "3 Years",
    image: "/assets/cu/bca-cu.png",
  },
  {
    code: "BA-JMC",
    title: "Journalism & Mass Communication",
    desc: "Learn digital media, reporting, and communication with CU’s Online BA-JMC course.",
    duration: "3 Years",
    image: "/assets/cu/bjmc-cu.png",
  },
];

const PG_PROGRAMMES = [
  {
    code: "MBA",
    title: "Master of Business Administration",
    desc: "Learner can earn an online MBA from Chandigarh online University MBA with specialisations in HR, Finance, or Marketing.",
    duration: "2 Years",
    image: "/assets/cu/mba-cu.png",
  },
  {
    code: "MCA",
    title: "Master of Computer Application",
    desc: "Students can enhance tech expertise with Chandigarh University's MCA, covering programming, AI, and data systems.",
    duration: "2 Years",
    image: "/assets/cu/mca-cu.png",
  },
  {
    code: "MA-JMC",
    title: "Journalism & Mass Communication",
    desc: "This course opens doors to go into journalism and digital storytelling through Chandigarh Online University's online MA-JMC.",
    duration: "2 Years",
    image: "/assets/cu/mjmc-cu.png",
  },
  {
    code: "MSC",
    title: "Master of Science",
    desc: "Learners can expand scientific expertise with CU’s flexible and industry-aligned Online MSc programs.",
    duration: "2 Years",
    image: "/assets/cu/msc-cu.png",
  },
  {
    code: "MA",
    title: "Master of Arts",
    desc: "Dive into the humanities with CU Online MA degrees in English, Psychology, and other disciplines.",
    duration: "2 Years",
    image: "/assets/cu/ma-cu.png",
  },
];

export default function CuProgrammes({
  programmes = [],
  brand = {},
  onSelectCourseForBrochure,
}) {
  const [activeTab, setActiveTab] = useState("PG");

  const pgList = programmes?.filter((p) => p.category === "post-graduate").length
    ? programmes.filter((p) => p.category === "post-graduate")
    : PG_PROGRAMMES;
  const ugList = programmes?.filter((p) => p.category === "under-graduate").length
    ? programmes.filter((p) => p.category === "under-graduate")
    : UG_PROGRAMMES;

  const displayList = activeTab === "PG" ? pgList : ugList;

  return (
    <section id="programs" className="py-12 sm:py-16 bg-white select-none scroll-mt-20">
      <LandingContainer className="px-3 sm:px-6">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-[22px] sm:text-[26px] lg:text-[30px] font-bold text-gray-700 tracking-tight leading-tight m-0">
            Chandigarh University <br />
            Online Degree Programs
          </h2>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => setActiveTab("PG")}
              className={`px-7 py-3 rounded-[10px] font-medium text-sm sm:text-base cursor-pointer border-none transition-all ${activeTab === "PG"
                ? "bg-[#d11c1f] text-white shadow-md font-semibold"
                : "bg-[#e6e6e6] text-slate-800 hover:bg-[#dedede]"
                }`}
            >
              Post Graduate
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("UG")}
              className={`px-7 py-3 rounded-[10px] font-medium text-sm sm:text-base cursor-pointer border-none transition-all ${activeTab === "UG"
                ? "bg-[#d11c1f] text-white shadow-md font-semibold"
                : "bg-[#e6e6e6] text-slate-800 hover:bg-[#dedede]"
                }`}
            >
              Under Graduate
            </button>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayList.map((prog) => (
            <div
              key={prog.code}
              className="bg-white rounded-[14px] overflow-hidden border border-slate-200/80 shadow-[0_4px_22px_rgba(0,0,0,0.11)] hover:shadow-[0_10px_32px_rgba(0,0,0,0.16)] transition-all flex flex-col justify-between w-full max-w-[335px] sm:max-w-[345px] md:max-w-none mx-auto"
            >
              <div>
                <div className="relative w-full h-44 sm:h-48 bg-slate-100">
                  <Image
                    src={prog.image}
                    alt={prog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-[28px] sm:text-[36px] lg:text-[38px] font-semibold text-slate-900 m-0 leading-none">
                    {prog.code}
                  </h3>
                  <p className="text-sm font-semibold text-slate-700 mt-2 mb-2 m-0 leading-tight">
                    {prog.title}
                  </p>
                  <hr className="my-2.5 border-slate-200" />
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed m-0 min-h-[48px]">
                    {prog.desc}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs sm:text-[13px] text-slate-700 mt-2.5 pt-2 border-t border-slate-100">
                    <Clock className="w-3.5 h-3.5 text-[#d11c1f]" />
                    <span>
                      <b>Duration :</b> {prog.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectCourseForBrochure?.(prog.code, `Download ${prog.code} Brochure`)}
                  className="w-full bg-[#d11c1f] hover:bg-[#b51619] text-white font-bold text-sm sm:text-base py-2.5 px-4 rounded-[6px] shadow-sm flex items-center justify-center gap-2 cursor-pointer border-none transition-all active:scale-95"
                >
                  <span>Download Brochure</span>
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}
