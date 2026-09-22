"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const AMITY_COURSES_CARDS = [
  {
    id: "ba",
    code: "BA",
    title: "Bachelor of Arts",
    level: "Graduation",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    description:
      "Amity University Online BA is a 3-year program that offers the necessary skills required in different work cultures-critical and innovative thinking, communication, humanities, and understanding of different languages.",
  },
  {
    id: "mba",
    code: "MBA",
    title: "Master of Business Administration",
    level: "Post Graduation",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    description:
      "Amiy University Online provides an online 2-year MBA program. Amity University MBA online program is crafted to help learners develop leadership, and business skills for successful careers or entrepreneurship.",
  },
  {
    id: "mca",
    code: "MCA",
    title: "Master of Computer Application",
    level: "Post Graduation",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    description:
      "The Amity University online MCA program provides learning in advanced technologies and tools. The MCA Online Course Amity provides specializations in Blockchain and many other in collaboration with eCornell and TCS iON.",
  },
  {
    id: "mcom",
    code: "MCOM",
    title: "Master of Commerce",
    level: "Post Graduation",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    description:
      "Amity University Online M.com offers a rock foundation in 3 aspects - Commerce, Finance, and Technology. Amity University Online M.com offers a specialization in Financial Management, with many more providing strong career opportunities.",
  },
  {
    id: "bba",
    code: "BBA",
    title: "Bachelor of Business Administration",
    level: "Graduation",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    description:
      "Amity University Online BBA is a 3-year online undergraduate program providing deep foundation in managerial economics, corporate finance, marketing strategies, and organizational leadership.",
  },
  {
    id: "bca",
    code: "BCA",
    title: "Bachelor of Computer Application",
    level: "Graduation",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    description:
      "Amity University Online BCA offers comprehensive learning in software engineering, modern cloud technologies, database architectures, and full-stack web and app programming.",
  },
  {
    id: "bcom",
    code: "BCOM",
    title: "Bachelor of Commerce",
    level: "Graduation",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    description:
      "Amity University Online B.Com equips students with expert knowledge in financial accounting, auditing standards, banking practices, taxation policies, and corporate commercial law.",
  },
  {
    id: "ma",
    code: "MA",
    title: "Master of Arts (JMC)",
    level: "Post Graduation",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=800&auto=format&fit=crop",
    description:
      "Amity University Online MA focuses on advanced media communications, digital public relations, investigative reporting, strategic broadcast creation, and modern journalism practices.",
  },
  {
    id: "msc",
    code: "MSC",
    title: "Master of Science (Data Science)",
    level: "Post Graduation",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    description:
      "Amity University Online M.Sc in Data Science delivers hands-on mastery in machine learning, Python modeling, big data analytics pipelines, and business predictive intelligence.",
  },
];

export default function AmityProgrammes({ onSelectCourseForBrochure }) {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -330 : 330;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="programmes" className="py-10 sm:py-14 bg-[#08417b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight leading-snug">
            <div>Amity University</div>
            <div>Online Degree Courses</div>
          </h2>
        </div>

        {/* Carousel Wrapper with Left & Right Arrow Controls */}
        <div className="relative group/carousel">
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll("left")}
            aria-label="Previous Courses"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 text-[#08417b] shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll("right")}
            aria-label="Next Courses"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 text-[#08417b] shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Single Horizontal Row Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto scroll-smooth py-3 px-1 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {AMITY_COURSES_CARDS.map((course) => (
              <div
                key={course.id}
                className="w-[280px] sm:w-[295px] lg:w-[305px] shrink-0 snap-start bg-white shadow-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl group cursor-pointer"
                onClick={() => onSelectCourseForBrochure?.(course.code)}
              >
                {/* Image Banner with Top-Left Green Tag */}
                <div className="relative h-44 sm:h-48 w-full bg-slate-800 overflow-hidden shrink-0">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 80vw, 305px"
                  />
                  {/* Green Badge Tag */}
                  <div className="absolute top-0 left-0 bg-[#008751] text-white font-bold text-[11px] sm:text-xs px-3 py-1 z-10 select-none shadow-xs">
                    {course.level}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-[#08417b] tracking-tight leading-none">
                      {course.code}
                    </h3>
                    <p className="text-xs font-bold text-[#08417b] mt-1 mb-2.5">
                      {course.title}
                    </p>
                    <p className="text-[11.5px] sm:text-xs text-slate-700 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
