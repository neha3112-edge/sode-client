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

/* =========================================================
   UNIVERSITIES
========================================================= */

const universities = [
  {
    name: "Rushford Business School",
    logoSrc: "/assets/images/rushford-logo.jpg",
    imageSrc: "/assets/images/rushford-image.png",
    courses: ["Rushford DBA"],
    brochureUrl: "/assets/pdf/rushford_main_brochure.pdf",
    paragraphs: [
      "Rushford Business School is a globally recognised institute having 5 star QS rating, AACSB-accredited and an active member of ACBSP (Accreditation Council for Business Schools and Programs ). This institution offers flexible and accessible executive leadership education for working professionals, providing them with the expertise for C-suite roles.",
      "Rushford DBA program is designed for senior managers, entrepreneurs, and consultants looking to strengthen their proficiency in business research, innovation, and strategic leadership. It is an eduQua-certified business school located in Switzerland.",
      "The program emphasises global business challenges. It is equipped with evidence-based decision-making and leadership transformation skillset. Overall, it helps learners prepare for executive and board-level responsibilities in an increasingly digital and AI-powered business environment.",
    ],
  },
  {
    name: "Golden Gate University",
    logoSrc: "/assets/images/ggu-logo.jpg",
    imageSrc: "/assets/images/ggu-image.png",
    courses: ["Online DBA", "Online MBA"],
    brochureUrl: "/assets/pdf/ggu_main_brochure.pdf",
    paragraphs: [
      "Golden Gate University is a respected institution which is located in San Francisco, California. The university is WES recognised and AACSB accredited, therefore is known worldwide for its strong industry orientation and practitioner-led business education. Over the span, the university has been a pioneering institute for several professional enterprise executive education programs.",
      "This university offers an Online DBA designed for experienced professionals seeking research expertise and leadership capabilities. The university curates an advanced Online MBA focused on strategic management and global business practices.",
      "The programs Golden Gate MBA and Golden Gate University Online DBA are particularly suitable for learners who are searching for executive management programs. The flexible learning formats, U.S. faculty with Fortune 500 experiences and a curriculum aligned with executive leadership requirements, Golden Gate Admissions supports executives aiming for senior management and C-suite roles.",
    ],
  },
  {
    name: "SSBM Geneva",
    logoSrc: "/assets/images/ssbm-logo.jpg",
    imageSrc: "/assets/images/ssbm-image.png",
    courses: ["Online DBA"],
    brochureUrl: "/assets/pdf/ssbm_main_brochure.pdf",
    paragraphs: [
      "The Swiss School of Business and Management (SSBM), based in Geneva, Switzerland, is known for its modern and internationally focused executive education. The university holds a membership of  AAACSB and is accredited by top British, Swiss and U.S agencies, making it globally recognised.",
      "SSBM Online DBA program is designed specifically for working professionals and business leaders seeking doctoral-level expertise without interrupting their careers.",
      "SSBM's doctorate program curates a strong global business perspective and flexible online delivery. SSBM prepares learners to address real-world business challenges and lead organisational transformation. The elite educational program is particularly attractive to professionals targeting senior leadership and advisory positions.",
    ],
  },
  {
    name: "ESGCI",
    logoSrc: "/assets/images/esgci-logo.jpg",
    imageSrc: "/assets/images/esgci-image.png",
    courses: ["Online DBA"],
    brochureUrl: "/assets/pdf/esgci_main_brochure.pdf",
    paragraphs: [
      "The university is based in Paris, France. ESGCI is a recognised business school known for delivering a high-end career-oriented management education, which has been recognised under the French Ministry of Higher Education, offering it with an excellence in a global outlook.",
      "ESGCI Online DBA is a fast-track program tailored for experienced professionals seeking advanced business knowledge while continuing their careers.",
      "The flexible learning pathways and a global perspective, ESGCI's doctorate supports executives aspiring to contribute to business thought leadership, solve complex organisational challenges and be independent veterans.",
    ],
  },
  {
    name: "Edgewood University",
    logoSrc: "/assets/images/edgewood-logo.jpg",
    imageSrc: "/assets/images/edgewood-image.png",
    courses: ["Online DBA", "MBA + DBA"],
    brochureUrl: "/assets/pdf/edgewood_main_brochure.pdf",
    paragraphs: [
      "Edgewood is a globally recognised university located in Madison, Wisconsin. The university is one of the top institutions that holds accreditations from ACBSP and HL and is WES recognised, offering an edge to its programs through its learner-centric approach and emphasis on leadership development.",
      "The institution offers both an Online DBA and an integrated MBA + DBA pathway for ambitious professionals who seek accelerated career progression. These programs combine managerial knowledge with doctoral research capabilities, enabling learners to develop expertise in strategy, innovation, and organisational leadership.",
      "The flexible structure and global excellence make this institution particularly appealing to executives pursuing long-term leadership ambitions.",
    ],
  },
  {
    name: "Liverpool Business School",
    logoSrc: "/assets/images/liverpool-logo.png",
    imageSrc: "/assets/images/liverpool-image.png",
    courses: ["MBA Online"],
    brochureUrl: "/assets/pdf/liverpool_main_brochure.pdf",
    paragraphs: [
      "Liverpool Business School is part of a prestigious UK university ecosystem and delivers globally recognised management education with a strong focus on leadership and employability. This institute is under Liverpool John Moores University and is known for its 30+ years of excellence in business education.",
      "Liverpool Online Courses are the most sought-after options for professionals who seek an opportunity to have a global outlook and elite enterprise educational programs.",
      "The Liverpool MBA Online program is recognised by the World Education Services (WES) and is AACSB-accredited, equipping students with deep knowledge in Finance and Management. The flexible online learning format and international faculty make the program ideal for aspiring managers and business leaders, executives who are all aiming to strengthen their decision-making capabilities.",
    ],
  },
  {
    name: "IIIT Bangalore",
    logoSrc: "/assets/images/iiitb-logo.jpg",
    imageSrc: "/assets/images/iiitb-image.png",
    courses: [
      "Data Science",
      "CTO Leader Program",
      "Generative AI",
      "Artificial Intelligence",
      "Agentic AI",
      "Machine Learning",
    ],
    brochureUrl: "/assets/pdf/iiitb_main_brochure.pdf",
    paragraphs: [
      "IIIT Bangalore is a premier institute in India that is known for its executive management certification course. It is a technology-focused institution holding NAAC accreditation and is widely respected for its industry-aligned executive education.",
      "The institute offers a range of programs and IIIT Certification, including the Executive Programme in Generative AI for Leaders, Executive Post Graduate Certificate Programme in Data Science & AI, and AI leadership programs. The IIIT Bangalore Online programs combine technical expertise with leadership development. It guides professionals in building capabilities in AI, machine learning, agentic AI, and digital transformation for future leadership roles.",
    ],
  },
  {
    name: "IIM Kozhikode",
    logoSrc: "/assets/images/iim-logo.jpg",
    imageSrc: "/assets/images/iim-image.png",
    courses: [
      "Professional Certificate Programme in HR Management and Analytics",
    ],
    brochureUrl: "/assets/pdf/iim_main_brochure.pdf",
    paragraphs: [
      "IIM Kozhikode is located in Kerala. It is one of India's leading management institutes and is widely recognised for its academic excellence and executive education initiatives. The institute offers the Professional Certificate Programme in HR Management and Analytics, combining people management with data-driven decision-making capabilities.",
      "This IIM Executive Program is highly relevant for HR professionals searching for, IIM Executive Education opportunities to enhance their abilities for workforce management. Profess through IIM Kozhikode Online, gain expertise in workforce analytics, talent strategy, and organisational effectiveness, preparing them for modern HR leadership roles in digitally transforming organisations.",
    ],
  },
  {
    name: "Liverpool John Moores University",
    logoSrc: "/assets/images/ljmu-logo.png",
    imageSrc: "/assets/images/liverpool-image.png",
    courses: ["LJMU MSc", "LJMU MBA"],
    brochureUrl: "/assets/pdf/liverpool_main_brochure.pdf",
    paragraphs: [
      "Liverpool John Moores University (LJMU) is a reputed university in the UK which known for its excellence in executive leadership programs. The university holds prestigious recognitions accreditations, including WES (World Education Services), AACSB (Association to Advance Collegiate Schools of Business), and Privy Council Accreditation, reinforcing the global acceptance and credibility of its qualifications.",
      "It offers a lot of future-focused programmes, such as a Masters in Data Science and a Masters in Machine Learning and AI. These are tailored to equip professionals with advanced analytical, AI, and technological capabilities. LJMU combines academic rigour with practical learning to prepare leaders for the digital economy.",
    ],
  },
  {
    name: "MICA",
    logoSrc: "/assets/images/mica-logo.jpg",
    imageSrc: "/assets/images/mica-image.png",
    courses: [
      "Digital Marketing",
      "SEO & SEM",
      "Brand Communication",
      "Social Media",
    ],
    brochureUrl: "/assets/pdf/mica_main_brochure.pdf",
    paragraphs: [
      "MICA is one of India's premier institutions, established in 1991 at Ahmedabad, Gujarat . The institute specialises in strategic marketing, branding, and communications educational programs and certifications.",
      "The institute offers the Advanced Certificate in Digital Marketing & Communication and the Advanced Certificate in Digital Brand Communication Strategy. Through MICA Admissions, Professionals learn MICA Digital Marketing Programs. The executive management programs are tailored to consumer behaviour, performance marketing, brand strategy, and digital communication. This enables learners to build expertise in modern marketing leadership and customer engagement strategies in a digital-first economy.",
    ],
  },
];

/* =========================================================
   UNIVERSITIES COMPONENT
========================================================= */

export function Universities() {
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
          {universities.map((university, index) => {
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
            {universities.map((university, index) => (
              <CarouselItem key={index} className="basis-full">
                <div className="bg-[#F8FAFC] rounded-4xl overflow-hidden border border-slate-100/50 shadow-xs flex flex-col lg:flex-row max-w-7xl mx-auto min-h-[450px]">
                  {/* Left Column: Building Image & Overlay Logo */}
                  <div className="relative w-full md:w-[42%] h-87.5 md:h-auto shrink-0">
                    <Image
                      src={getAssetPath(university.imageSrc)}
                      alt={`${university.name} Campus`}
                      fill
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
          {universities.map((university, index) => (
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
