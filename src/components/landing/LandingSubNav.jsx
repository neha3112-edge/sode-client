"use client";

import React, { useState, useEffect } from "react";

const NAV_TABS = [
  { id: "about", label: "About", targetIds: ["about"] },
  { id: "program", label: "Courses", targetIds: ["program", "courses", "programmes"] },
  { id: "emi", label: "EMI", targetIds: ["emi", "scholarship"] },
  { id: "whyChoose", label: "Benefits", targetIds: ["whyChoose", "advantage", "pedagogy", "benefits"] },
  { id: "exam", label: "Exam", targetIds: ["exam", "evaluation"] },
  { id: "approvals", label: "Approvals", targetIds: ["approvals", "recognition"] },
  { id: "recruiters", label: "Placement", targetIds: ["recruiters", "placement", "partners"] },
  { id: "Degreeinfo", label: "Degree", targetIds: ["Degreeinfo", "degree"] },
  { id: "admission", label: "Admission", targetIds: ["admission", "admissionProcess", "enrollment"] },
  { id: "compare", label: "Alternative", targetIds: ["compare", "compareBanner"] },
  { id: "faqs", label: "FAQ's", targetIds: ["faqs", "faq"] },
];

function findElement(targetIds) {
  for (const tid of targetIds) {
    const el = document.getElementById(tid);
    if (el) return el;
  }
  return null;
}

export default function LandingSubNav() {
  const [activeTab, setActiveTab] = useState("about");

  const scrollToSection = (tab) => {
    setActiveTab(tab.id);
    const element = findElement(tab.targetIds);
    if (element) {
      const navOffset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = NAV_TABS.length - 1; i >= 0; i--) {
        const tab = NAV_TABS[i];
        const el = findElement(tab.targetIds);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(tab.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-16 sm:top-20 z-40 bg-[#005bb8] text-white shadow-md select-none border-t border-blue-400/20 font-poppins">
      <div className="max-w-[1360px] mx-auto px-2 sm:px-6">
        {/* Centered Horizontal Tabs */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto no-scrollbar space-x-3 sm:space-x-6 md:space-x-8 lg:space-x-10 text-[13px] sm:text-[14px] md:text-[14.5px] py-1.5 sm:py-2 font-poppins">
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSection(tab)}
                className={`py-2 px-1 whitespace-nowrap transition-colors font-medium border-b-2 cursor-pointer bg-transparent border-t-0 border-x-0 ${
                  isActive
                    ? "text-[#ffd200] border-[#ffd200] font-bold"
                    : "text-white/95 border-transparent hover:text-[#ffd200]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
