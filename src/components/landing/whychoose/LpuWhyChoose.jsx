"use client";

import React from "react";

const DEFAULT_PEDAGOGY_CARDS = [
  {
    title: "Live Lectures",
    desc: "The university provides interactive live sessions that create a real-time virtual classroom. It benefits the students pursuing LPU MBA online and LPU MCA online to interact with faculty, clear their doubts instantly, and collaborate with peers.",
    path: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Recorded Videos",
    desc: "Learners get access to recorded lectures for flexible learning. This facility is ideal for working professionals pursuing LPU MBA Online or LPU BCA Online, as it enables them to revise anytime and anywhere.",
    path: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  },
  {
    title: "Assignments & Projects",
    desc: "The LMS of LPU online includes digital assignment submission and project work. Students from LPU online MCA and LPU MBA online tracks monitor progress and gain practical exposure throughout the course.",
    path: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
];

export default function LpuWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const cards = whyChoose?.length ? whyChoose : DEFAULT_PEDAGOGY_CARDS;
  const primaryColor = brand?.primaryColor || "#f58220";
  const title = brand?.whyChooseTitle || `Learning Pedagogy at ${brand?.name || "LPU Online"}`;
  const description =
    brand?.whyChooseDescription ||
    "The learning model at Lovely Professional University Online (LPU Online) is tailored to offer flexibility and an engaging experience to all the students who are enrolled in programs such as LPU MBA Online, LPU MCA Online, and LPU Online BCA.";
  const placementTitle = brand?.placementTitle || `Placement Support Services at ${brand?.name || "LPU Online"}`;
  const placementDescription =
    brand?.placementDescription ||
    "Lovely Professional University online admission also offers structured placement support to prepare students and professionals for real-world careers and job sectors.";

  return (
    <>
      {/* Learning Pedagogy Section */}
      <section id="pedagogy" className="py-12 sm:py-16 bg-white border-b border-slate-100 select-none">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-slate-900 tracking-tight leading-tight m-0">
              {title}
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-600 mt-2.5 leading-relaxed font-normal m-0 max-w-3xl mx-auto">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, idx) => {
              const iconPath = card.path || DEFAULT_PEDAGOGY_CARDS[idx]?.path || DEFAULT_PEDAGOGY_CARDS[0].path;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[8px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-200/80 border-b-4 flex flex-col items-start text-left space-y-3"
                  style={{ borderBottomColor: primaryColor }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 shrink-0 relative flex items-center justify-center">
                      <svg className="w-10 h-10" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d={iconPath} />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-black m-0" style={{ color: primaryColor }}>
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-[11.5px] sm:text-[12px] text-slate-600 leading-relaxed m-0 font-normal">
                    {card.desc || card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Placement Support Services Section */}
      <section id="placement-services" className="py-12 sm:py-16 bg-[#f9f9f9] border-b border-slate-200 select-none">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-slate-900 tracking-tight leading-tight m-0">
              {placementTitle}
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-600 mt-2.5 leading-relaxed font-normal m-0 max-w-3xl mx-auto">
              {placementDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-3">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 m-0">
                Professional Enhancement Programme
              </h3>
              <p className="text-[11.5px] sm:text-[12px] text-slate-600 leading-relaxed m-0 font-normal max-w-md">
                The Placement Enhancement Programme (PEP) trains students in aptitude, soft skills, and interview preparation. It is beneficial for LPU MBA online and LPU MCA online learners.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 m-0">
                Mock Interviews & Workshops
              </h3>
              <p className="text-[11.5px] sm:text-[12px] text-slate-600 leading-relaxed m-0 font-normal max-w-md">
                Mock interviews and industry-oriented online workshops are used to provide students of Lovely Professional University Online courses with communication skills, confidence, and real-life insights.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
