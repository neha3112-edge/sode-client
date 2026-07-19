"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import FormWrapper from "@/components/forms/FormWrapper";
import { getAssetPath } from "@/lib/utils";
import { universities as defaultUniversities } from "@/constants/universitiesData";

/* =========================================================
   UNIVERSITIES COMPONENT
========================================================= */

export function Universities({
  initialUniversities = defaultUniversities,
}) {
  const universitiesList = initialUniversities || defaultUniversities;

  const [api, setApi] = useState(null);
  const [activeUni, setActiveUni] = useState(0);

  const [activeModal, setActiveModal] = useState(null);
  const [selectedModalUni, setSelectedModalUni] = useState(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    setActiveUni(api.selectedScrollSnap());

    const handleSelect = () => {
      setActiveUni(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const selectUniversity = (index) => {
    api?.scrollTo(index);
    setActiveUni(index);
  };

  const handleGetBrochure = (university) => {
    sessionStorage.setItem("brochureUrl", getAssetPath(university.brochureUrl));

    setSelectedModalUni(university);
    setActiveModal("brochure");
  };

  const handleApplyNow = (university) => {
    setSelectedModalUni(university);
    setActiveModal("apply");
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedModalUni(null);
  };

  return (
    <section
      id="universities"
      className="scroll-mt-10 py-16 md:py-20 bg-white overflow-hidden"
    >
      <Container className="max-w-7xl">
        {/* Section Heading */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-[32px] font-extrabold text-[#1d3557] tracking-tight leading-snug">
            Learn from Global &amp; India&apos;s Most Prestigious Institutions
          </h2>
        </div>

        {/* Logos Selector Flex */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 max-w-6xl mx-auto mb-10">
          {universitiesList.map((university, index) => {
            const isActive = activeUni === index;

            return (
              <div
                key={index}
                onClick={() => selectUniversity(index)}
                className={`p-1 h-16 md:h-20 w-[calc(50%-8px)] sm:w-[calc(33.33%-12px)] md:w-[calc(20%-16px)] flex items-center justify-center bg-white rounded-xl border cursor-pointer hover:shadow-xs transition-all duration-300 select-none ${
                  isActive
                    ? "border-[#1d3557] border shadow-xs ring-1 ring-[#1d3557]/10"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={getAssetPath(university.logoSrc)}
                    alt={university.name}
                    fill
                    sizes="(max-width: 768px) 100px, 150px"
                    className="object-contain rounded-xl"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Slider */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full max-w-6xl mx-auto relative animate-fade-in"
        >
          <CarouselContent>
            {universitiesList.map((university, index) => (
              <CarouselItem key={index} className="basis-full">
                <div className="bg-[#F8FAFC] rounded-4xl overflow-hidden border border-slate-100/50 shadow-xs flex flex-col lg:flex-row max-w-7xl mx-auto min-h-[450px]">
                  {/* Left Column: Building Image & Overlay Logo */}
                  <div className="relative w-full md:w-[42%] h-87.5 md:h-auto shrink-0">
                    <Image
                      src={getAssetPath(university.imageSrc)}
                      alt={`${university.name} Campus`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Right Column: Information & Actions */}
                  <div className="w-full p-6 md:p-8 flex flex-col justify-between text-left">
                    <div>
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
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 13l-7 7-7-7m14-6l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Apply Now Button */}
                      <button
                        type="button"
                        onClick={() => handleApplyNow(university)}
                        className="flex items-center gap-2 px-4 py-3 md:px-8 md:py-3.5 rounded-xl bg-[#1d3557] hover:bg-[#152a47] text-white font-bold text-sm transition duration-300 cursor-pointer shadow-md"
                      >
                        Apply Now
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Slide indicators / pagination dots */}
        <div className="flex justify-center gap-2 mt-5">
          {universitiesList.map((university, index) => (
            <button
              key={university.name}
              type="button"
              onClick={() => selectUniversity(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeUni ? "bg-[#1d3557] scale-110" : "bg-slate-300"
              }`}
              aria-label={`Go to university ${index + 1}`}
            />
          ))}
        </div>
      </Container>

      {/* =====================================================
          FORM MODAL
      ====================================================== */}

      {selectedModalUni && (
        <FormWrapper
          isModal
          isOpen={!!activeModal}
          title={
            activeModal === "brochure" ? "Download Brochure" : "Apply Now"
          }
          subtitle={
            activeModal === "brochure"
              ? "Enter your details to download the brochure"
              : "Enter your details to apply for admission"
          }
          onClose={closeModal}
          isBrochureForm={activeModal === "brochure"}
          brochureUrl={
            activeModal === "brochure"
              ? getAssetPath(selectedModalUni.brochureUrl)
              : ""
          }
        />
      )}
    </section>
  );
}

export default Universities;
