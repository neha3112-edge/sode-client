"use client";

import React from "react";
import LandingContainer from "./LandingContainer";
import { Laptop, CheckSquare, ShieldCheck } from "lucide-react";

const DEFAULT_EXAM_CARDS = [
  {
    icon: Laptop,
    iconBg: "bg-blue-100 text-[#0055b8]",
    title: "Interactive Digital LMS",
    desc: "Access 24/7 recorded lectures, live weekend masterclasses with faculties, downloadable study e-books, and an AI-driven learning assistant for instant doubt clearing.",
  },
  {
    icon: CheckSquare,
    iconBg: "bg-orange-100 text-[#ff5a00]",
    title: "Continuous Assessment (30%)",
    desc: "Includes periodic online quizzes, project submissions, case study analyses, and interactive discussion forums that make up 30% of the overall course grade.",
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-green-100 text-green-700",
    title: "Term-End Proctored Exams (70%)",
    desc: "Semester exams are conducted completely online from home through secure AI-monitored web portals with flexible examination slot booking.",
  },
];

export default function LandingExamSection({
  brand = {},
  examEvaluation = {},
  onOpenApply,
}) {
  const isGalgotias =
    brand.slug === "galgotias" ||
    brand.examLayout === "galgotias" ||
    brand.heroStyle === "galgotias";

  if (isGalgotias) {
    const title =
      examEvaluation.title ||
      "Assignment and Exam Evaluation of Galgotias Online";
    const description =
      examEvaluation.description ||
      "Galgotias University Online employs a comprehensive evaluation system that combines continuous internal assessments with proctored external examinations to ensure academic integrity and student success.";

    const structureTitle =
      examEvaluation.structureTitle ||
      "Assignment and Exam Evaluation Structure";

    const points = examEvaluation.structurePoints || [];

    const validityTitle =
      examEvaluation.validityTitle || "Is a Galgotias Online Degree Valid?";
    const validityText =
      examEvaluation.validityText ||
      "Yes, the Galgotias Online degree is valid. Galgotias University is recognized by UGC for online degree programs and has UGC approval to offer online courses.";

    return (
      <section id="exam" className="py-10 sm:py-14 bg-white select-none">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28">
          {/* Section 1: Assignment and Exam Evaluation */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#002b49] tracking-tight leading-tight m-0">
              {title}
            </h2>

            <p className="text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal mt-3 mb-6 sm:mb-8 max-w-6xl">
              {description}
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-[#002b49] tracking-tight m-0 mb-4">
              {structureTitle}
            </h3>

            {points.length > 0 && (
              <ul className="space-y-2.5 sm:space-y-3 text-[13.5px] sm:text-[14px] text-slate-700 font-normal list-none p-0 m-0 max-w-6xl">
                {points.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-slate-900 font-black text-base leading-none mt-0.5 select-none">
                      •
                    </span>
                    <span>
                      <strong className="text-slate-900 font-bold">
                        {item.bold}
                      </strong>{" "}
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Section 2: Is a Galgotias Online Degree Valid? */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#002b49] tracking-tight leading-tight m-0 mb-3 sm:mb-4">
              {validityTitle}
            </h2>

            <p className="text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal m-0 max-w-6xl">
              {validityText}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="exam" className="py-12 sm:py-16 bg-white border-b border-slate-200/60">
      <LandingContainer>
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-slate-900 tracking-tight m-0">
            Study Method &amp; <span className="text-[#0055b8]">Exam Evaluation</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-2 m-0">
            Convenient, fully flexible 100% online learning and transparent AI-proctored examination process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEFAULT_EXAM_CARDS.map(({ icon: Icon, iconBg, title, desc }, idx) => (
            <div key={idx} className="bg-[#f8fbff] rounded-xl p-6 border border-blue-100 space-y-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 m-0">{title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => onOpenApply?.()}
            className="bg-[#0055b8] hover:bg-[#004494] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-sm cursor-pointer transition-colors border-none"
          >
            Know More About Exam Pattern
          </button>
        </div>
      </LandingContainer>
    </section>
  );
}


