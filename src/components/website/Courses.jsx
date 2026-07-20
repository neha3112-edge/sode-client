"use client";

import { useState } from "react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import FormWrapper from "@/components/forms/FormWrapper";
import { getAssetPath } from "@/lib/utils";
import { tabs as defaultTabs, programs as defaultPrograms } from "@/constants/coursesData";

/* =========================================================
   COURSES COMPONENT
========================================================= */

export function Courses({
  initialTabs = defaultTabs,
  initialPrograms = defaultPrograms,
}) {
  const [activeTab, setActiveTab] = useState("all");

  const [activeModal, setActiveModal] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const tabsList = initialTabs || defaultTabs;
  const programsList = initialPrograms || defaultPrograms;

  const filteredPrograms =
    !activeTab || activeTab === "all" || activeTab === "all-programs"
      ? programsList
      : programsList.filter((program) => {
          const cat = program?.category;
          if (!cat) return false;

          const target = String(activeTab).toLowerCase().trim();

          if (typeof cat === "object" && cat !== null) {
            const catSlug = String(cat.slug || "").toLowerCase().trim();
            const catName = String(cat.name || "").toLowerCase().trim();
            const catId = String(cat._id || "").trim();

            return (
              catSlug === target ||
              catName === target ||
              catId === target ||
              (target === "certification" && catSlug.includes("certif")) ||
              (target === "certifications" && catSlug.includes("certif")) ||
              (target === "executive" && catSlug.includes("execut")) ||
              (target === "executive programs" && catSlug.includes("execut")) ||
              (target === "master" && catSlug.includes("master")) ||
              (target === "doctorate" && catSlug.includes("doctor"))
            );
          }

          const catStr = String(cat).toLowerCase().trim();
          return catStr === target || catStr.includes(target);
        });

  /* =========================================================
     GET BROCHURE
  ========================================================= */

  const handleGetBrochure = (program) => {
    sessionStorage.setItem("brochureUrl", getAssetPath(program.brochureUrl));

    setSelectedProgram(program);
    setActiveModal("brochure");
  };

  /* =========================================================
     APPLY NOW
  ========================================================= */

  const handleApplyNow = (program) => {
    setSelectedProgram(program);
    setActiveModal("apply");
  };

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const closeModal = () => {
    setActiveModal(null);
    setSelectedProgram(null);
  };

  return (
    <section
      id="courses"
      className="py-16 md:py-24 bg-[#f5f4ec] scroll-mt-10 overflow-hidden"
    >
      <Container className="max-w-7xl">
        {/* Title & Subtitle */}

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-[40px] font-extrabold text-[#1d3557] leading-tight mb-3">
            Top Certification &amp; Online Degree Courses
          </h2>

          <p className="text-gray-600 text-sm md:text-base font-semibold">
            Find the credential that moves your career
          </p>
        </div>

        {/* Tabs Buttons Flex container */}

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-12 max-w-4xl mx-auto">
          {tabsList.map((tab) => {
            const tabKey = tab.slug || tab.id || tab._id;
            const isActive = activeTab === tabKey || activeTab === tab.id || activeTab === tab.slug;

            return (
              <button
                key={tabKey || tab.label}
                type="button"
                onClick={() => setActiveTab(tabKey)}
                className={`px-5 py-2.5 rounded-full font-bold text-xs md:text-sm transition-all duration-300 cursor-pointer border select-none ${isActive
                    ? "bg-[#A66E38] text-white border-transparent shadow-[0_4px_12px_rgba(166,110,56,0.3)]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}

        <div
          key={activeTab}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto animate-fade-in"
        >
          {filteredPrograms.map((item, index) => (
            <Card
              key={`${item.title}-${item.university}-${index}`}
              className="bg-white rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col transform transition duration-300 hover:-translate-y-1.5 hover:shadow-xl overflow-hidden animate-fade-in"
            >
              {/* Card Image */}

              <div className="relative w-full h-40 shrink-0">
                <Image
                  src={getAssetPath(item.image)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover rounded-3xl"
                />
              </div>

              <div className="pt-0 pb-6 px-6 flex flex-col grow text-left relative">
                {/* Institution Logo overlay */}

                <div className="mb-5 -mt-7.5 rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] w-[55%] p-2 bg-white relative z-10 flex items-center justify-center h-18 border border-slate-100">
                  <div className="relative w-full h-15">
                    <Image
                      src={getAssetPath(item.logo)}
                      alt={item.university}
                      fill
                      sizes="200px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Course Title */}

                <h3 className="text-[14px] font-bold text-[#1d3557] leading-snug mb-3">
                  {item.title}
                </h3>

                {/* University Name */}

                <div className="flex items-center gap-2 text-[#A66E38] text-[13px] font-bold mb-4 select-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 fill-current"
                  >
                    <path d="M335.9 84.2C326.1 78.6 314 78.6 304.1 84.2L80.1 212.2C67.5 219.4 61.3 234.2 65 248.2C68.7 262.2 81.5 272 96 272H128V480L76.8 518.4C68.7 524.4 64 533.9 64 544C64 561.7 78.3 576 96 576H544C561.7 576 576 561.7 576 544C576 533.9 571.3 524.4 563.2 518.4L512 480V272H544C558.5 272 571.2 262.2 574.9 248.2C578.6 234.2 572.4 219.4 559.8 212.2L335.9 84.2ZM464 272V480H400V272H464ZM352 272V480H288V272H352ZM240 272V480H176V272H240ZM320 160C337.7 160 352 174.3 352 192C352 209.7 337.7 224 320 224C302.3 224 288 209.7 288 192C288 174.3 302.3 160 320 160Z" />
                  </svg>

                  <span>{typeof item.university === "object" ? item.university?.name : item.university}</span>
                </div>

                {/* Description */}

                <p className="text-gray-500 text-[11px] leading-relaxed grow font-medium mb-4">
                  {item.description}
                </p>

                {/* Specs Section */}

                <div className="border-t border-gray-100 pt-4 mb-6 space-y-1.5 mt-auto">
                  <div className="flex items-start text-[10px] text-gray-600 font-semibold">
                    <span className="text-[#A66E38] font-bold mr-2 text-[14px] leading-none">
                      |
                    </span>

                    <span className="text-gray-500 font-medium shrink-0">
                      Duration :
                    </span>

                    <span className="text-[#1C293F] font-bold ml-1">
                      {typeof item.duration === "object" ? item.duration?.title : item.duration}
                    </span>
                  </div>

                  <div className="flex items-start text-[10px] text-gray-600 font-semibold leading-relaxed">
                    <span className="text-[#A66E38] font-bold mr-2 text-[14px] leading-none">
                      |
                    </span>

                    <span className="text-gray-500 font-medium shrink-0">
                      Eligibility :
                    </span>

                    <span className="text-[#1C293F] font-bold ml-1">
                      {typeof item.eligibility === "object" ? item.eligibility?.title : item.eligibility}
                    </span>
                  </div>
                </div>

                {/* Buttons Action Grid */}

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={() => handleGetBrochure(item)}
                    className="flex items-center justify-center gap-1.5 border border-[#1d3557] text-[#1d3557] font-bold py-2.5 px-3 rounded-lg text-[12px] transition duration-300 hover:bg-[#1d3557] hover:text-white active:scale-[0.98] cursor-pointer"
                  >
                    Get Brochure
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyNow(item)}
                    className="flex items-center justify-center gap-1.5 bg-[#1d3557] text-white border border-[#1d3557] font-bold py-2.5 px-3 rounded-lg text-[12px] transition duration-300 hover:bg-[#14243c] active:scale-[0.98] cursor-pointer"
                  >
                    Apply Now
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>

      {selectedProgram && (
        <FormWrapper
          isModal
          isOpen={!!activeModal}
          title={
            activeModal === "brochure"
              ? "Download Brochure"
              : "Get 1 to 1 Expert Guidance"
          }
          subtitle={
            activeModal === "brochure"
              ? "Enter your details to download the brochure"
              : "Start your application journey today"
          }
          onClose={closeModal}
          isBrochureForm={activeModal === "brochure"}
          brochureUrl={
            activeModal === "brochure"
              ? getAssetPath(selectedProgram.brochureUrl)
              : ""
          }
        />
      )}
    </section>
  );
}

export default Courses;
