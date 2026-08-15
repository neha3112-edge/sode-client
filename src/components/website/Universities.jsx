"use client";

import { useState } from "react";
import Image from "next/image";

import { Container } from "@/components/common/Container";
import { Carousel } from "antd";
import { useFormModal } from "@/context";
import { getAssetPath } from "@/lib/utils";
import { universities as defaultUniversities } from "@/constants/universitiesData";

/* =========================================================
   UNIVERSITIES COMPONENT
========================================================= */

export function Universities({
  initialUniversities = defaultUniversities,
}) {
  const universitiesList = initialUniversities || defaultUniversities;
  const [activeUni, setActiveUni] = useState(0);
  const { openFormModal } = useFormModal();

  const selectUniversity = (index) => {
    setActiveUni(index);
  };

  const handleGetBrochure = (university) => {
    openFormModal({
      title: `Download Brochure - ${university.name}`,
      subtitle:
        "Fill in your details below to instantly receive the official program brochure.",
      submitButtonText: "Download Brochure",
      isBrochureForm: true,
      brochureUrl: university.brochureUrl || "",
    });
  };

  const handleApplyNow = (university) => {
    openFormModal({
      title: `Apply Now - ${university.name}`,
      subtitle:
        "Submit your contact details to start your application with expert guidance.",
      submitButtonText: "Submit Application",
    });
  };

  return (
    <section
      id="universities"
      className="py-16 scroll-mt-10 md:py-24 bg-[#EAEFF2] overflow-hidden"
    >
      <Container className="max-w-7xl">
        {/* Header section with responsive layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1d3557] leading-tight">
              Top Universities
            </h2>
          </div>
          <p className="text-gray-500 font-bold text-xs md:text-sm md:text-right max-w-sm">
            Discover accredited institutions offering world-class online
            degrees
          </p>
        </div>

        {/* Carousel Track */}
        <Carousel
          autoplay
          dots
          afterChange={(current) => setActiveUni(current)}
          className="w-full relative shadow-sm rounded-3xl"
        >
          {universitiesList.map((university, index) => (
            <div key={university.name} className="p-0">
              <div className="bg-white rounded-3xl p-6 md:p-12 border border-slate-100 flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
                {/* Left Column: Image */}
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                  <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
                    <Image
                      src={getAssetPath(university.imageSrc)}
                      alt={university.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index === 0}
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Right Column: Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between self-stretch">
                  <div>
                    {/* Logo and Tag badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shadow-xs border border-slate-100 p-1 shrink-0">
                        <Image
                          src={getAssetPath(university.logoSrc)}
                          alt={`${university.name} Logo`}
                          fill
                          sizes="48px"
                          className="object-contain"
                        />
                      </div>
                      <span className="bg-[#A66E38] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider select-none">
                        {university.tag || "Partner University"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-extrabold text-[#1d3557] text-2xl md:text-3xl leading-snug">
                      {university.name}
                    </h3>

                    {/* Paragraphs */}
                    <div className="text-slate-600 font-medium text-[11px] md:text-[12px] leading-relaxed mt-5 space-y-3.5">
                      {university.paragraphs.map(
                        (paragraph, paragraphIndex) => (
                          <p key={paragraphIndex}>{paragraph}</p>
                        ),
                      )}
                    </div>

                    {/* Dynamic Courses Badge List */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {university.courses.map((course, courseIndex) => (
                        <span
                          key={courseIndex}
                          className="bg-[#cccccc] text-gray-700 text-[11px] font-semibold px-3.5 py-1.5 rounded-full select-none"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-8 border-slate-200/50">
                    {/* Get Brochure Button */}
                    <button
                      type="button"
                      onClick={() => handleGetBrochure(university)}
                      className="flex items-center gap-2 px-4 py-3 md:px-6 md:py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-bold text-sm transition duration-300 cursor-pointer"
                    >
                      Get Brochure
                    </button>

                    {/* Apply Now Button */}
                    <button
                      type="button"
                      onClick={() => handleApplyNow(university)}
                      className="flex items-center gap-2 px-4 py-3 md:px-8 md:py-3.5 rounded-xl bg-[#1d3557] hover:bg-[#152a47] text-white font-bold text-sm transition duration-300 cursor-pointer shadow-md"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}

export default Universities;
