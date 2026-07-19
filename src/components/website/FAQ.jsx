"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";

const faqs = [
  {
    q: "Are the degrees and certificates from these programs globally recognised?",
    a: "Yes. All programs of Top International Global Universities that are offered through SODE are from accredited institutions such as WES-recognised, AACSB-accredited, or approved by British/Swiss/US agencies, ensuring global validity.",
  },
  {
    q: "What documents are typically required during the application process?",
    a: "Professionals are required to have a structured document set of 10th and 12th marksheets, Bachelors degree certificate/marksheets, and Master's degree certificate/marksheets. Also, they need to have valid identity proofs, such as an Aadhaar Card and a PAN Card, for verification purposes. Candidates applying for programmes with work experience criteria must also provide an experience letter. A recent passport-size photograph is required to complete the application and enrollment process.",
  },
  {
    q: "Is there an entrance exam required to enrol in any executive educational programs?",
    a: "No, there is no entrance exam required for executive educational programs . Applicants can enrol easily having bachelors and masters degree, and some programs require prior work experience.",
  },
  {
    q: "Are there any scholarships available for programs listed on SODE?",
    a: "Yes, SODE offers flexible financing options where aspirants can enrol with NO cost EMI. As per the course duration, they can easily balance and divide it per month.",
  },
  {
    q: "Are these degrees valid in India and internationally?",
    a: "Yes. All university partners listed on SODE include international universities like Golden Gate University, which is WES & AACSB accredited, Rushford Business School is QS 5-star rated, and Edgewood, which holds ACBSP accreditation, making them globally excellent. Indian institutions like IIMs and IITs are government-recognised under UGC norms.",
  },
  {
    q: "What is the minimum work experience required to enrol in Executive Management Programs & Certification Courses?",
    a: "SODE offers a diverse portfolio of executive management programmes and certifications designed to equip professionals with technological skills powered by Data science, AI, and ML needed for upskilling. Most Executive Management Programs and Certification Courses require candidates to have a minimum of 3 years of professional work experience, although eligibility criteria may vary depending on the programme and partnering university.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faqs"
      className="py-16 scroll-mt-10 md:py-24 bg-white overflow-hidden"
    >
      <Container className="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading and description */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="text-5xl md:text-[64px] font-extrabold text-[#1d3557] tracking-tight leading-none">
              FAQs
            </h2>
            <h3 className="text-xl md:text-[22px] font-bold text-[#1d3557] mt-4 leading-tight">
              Frequently Asked Question
            </h3>
            <p className="text-gray-500 font-medium mt-3 text-sm md:text-[14px] leading-relaxed max-w-sm">
              Still deciding? Book a no-pressure call and we&apos;ll map the
              right path with you.
            </p>
          </div>

          {/* Right Column: Dynamic FAQ accordion list */}
          <div className="lg:col-span-7 space-y-4 w-full">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-xl transition-all duration-300 bg-white ${
                    isOpen ? "border-slate-300 shadow-sm" : "border-slate-200"
                  }`}
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                    onClick={() => toggle(idx)}
                  >
                    <span className="font-semibold text-slate-800 text-[12px] md:text-[14px] leading-snug pr-4">
                      <span className="font-extrabold text-slate-800 mr-1.5">
                        Q{idx + 1}.
                      </span>
                      {faq.q}
                    </span>
                    <span className="text-[#A66E38] text-[20px] font-light shrink-0 transition-transform duration-300 select-none">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-75 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-5 text-gray-600 text-xs md:text-[13px] leading-relaxed font-medium border-t border-slate-50 pt-4">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FAQ;
