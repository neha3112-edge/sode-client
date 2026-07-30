"use client";

import Image from "next/image";

import { Button } from "antd";
import { Container } from "@/components/common/Container";
import { useFormModal } from "@/context/FormModalContext";
import { getAssetPath } from "@/lib/utils";
import {
  leftCards as defaultLeftCards,
  rightCards as defaultRightCards,
} from "@/constants/aboutData";

export function About({
  initialLeftCards = defaultLeftCards,
  initialRightCards = defaultRightCards,
}) {
  const { openFormModal } = useFormModal();

  const leftCards = initialLeftCards || defaultLeftCards;
  const rightCards = initialRightCards || defaultRightCards;

  const onClick = () => {
    openFormModal({
      title: "Book 1:1 Personalised Counselling",
      subtitle: "Select your course and our academic experts will assist you",
      submitButtonText: "Book Counselling",
    });
  };

  return (
    <section
      id="about"
      className="scroll-mt-10 py-16 bg-[#1d3557] text-white overflow-hidden w-full relative z-10 border-t border-white/5"
    >
      <Container>
        {/* ========================================================================= */}
        {/* About SODE Sub-section */}
        {/* ========================================================================= */}

        <div className="flex flex-col items-center text-center mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 uppercase tracking-wide">
            About <span className="text-[#f7ebc7]">SODE</span>
          </h2>

          <div className="space-y-4 text-[11px] text-gray-300 font-medium leading-relaxed">
            <p>
              SODE (School of Online &amp; Distance Education) is India&apos;s
              top educational platform, transforming the way learners engage
              with higher education. We make higher education easier without
              compromising on the quality. We help students and working
              professionals find the right online and distance degree
              programs. We simplify every step with expert guidance and
              personalised support.
            </p>

            <p>
              Over the years, we&apos;ve become an Edtech platform trusted by
              thousands of learners. We focus on supporting working
              professionals who want to continue their education without
              stepping away from their personal or professional
              responsibilities. We offer powerful tools to make their journey
              smoother, which include University Comparison, Eligibility
              Checks, Smart University Recommendations, and Free Video
              Counselling Sessions.
            </p>

            <p>
              Our Vision is to make education accessible, flexible, and
              empowering for every learner, no matter where they live, what
              they do, or when they choose to learn. We don&apos;t just list
              courses. We guide, counsel, simplify, and above all, we listen.
              Education is personal, and we believe the path to it should feel
              personal, too.
            </p>

            <p>
              We&apos;re not just shaping enrollments. We&apos;re shaping
              futures.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Why Trust SODE Sub-section */}
        {/* ========================================================================= */}

        <div className="flex flex-col items-center mt-16 md:mt-20">
          <h2
            id="why-choose"
            className="text-3xl md:text-4xl font-extrabold text-white text-center mb-12 px-4 leading-tight"
          >
            Why do Thousands of Learners Trust{" "}
            <span className="text-[#f7ebc7]">SODE?</span>
          </h2>

          {/* Desktop Layout (lg and up) */}

          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_280px_1fr] gap-6 md:gap-2 items-center max-w-7xl px-4">
            {/* Left Column */}

            <div className="flex flex-col items-start space-y-6 order-1 lg:order-1">
              {leftCards.map((card, idx) => (
                <div
                  key={idx}
                  className={`flex md:flex-row-reverse md:gap-2 items-center bg-white rounded-[10px] p-3.5 shadow-xl text-[#102441] hover:scale-[1.02] transition-all duration-200 ${card.css}`}
                >
                  <div className="rounded-lg flex items-center justify-center shrink-0 relative">
                    <Image
                      src={getAssetPath(card.icon)}
                      alt={card.title}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-col text-left md:text-right leading-tight ml-2 flex-wrap">
                    <h4 className="font-bold text-sm">{card.title}</h4>

                    <p className="text-gray-500 text-[11px] font-medium">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Column */}

            <div className="flex justify-center items-end relative h-110 w-70 mx-auto order-3 lg:order-2 md:-mt-10">
              <div className="relative z-10 w-70 h-110">
                <Image
                  src={getAssetPath("/assets/images/janvi-sode.png")}
                  alt="Student Counselor"
                  fill
                  sizes="300px"
                  priority
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            {/* Right Column */}

            <div className="flex flex-col items-end space-y-6 order-2 lg:order-3">
              {rightCards.map((card, idx) => (
                <div
                  key={idx}
                  className={`flex items-center bg-white rounded-[10px] p-3.5 shadow-xl text-[#102441] hover:scale-[1.02] transition-all duration-200 ${card.css}`}
                >
                  <div className="rounded-lg flex items-center justify-center shrink-0 relative">
                    <Image
                      src={getAssetPath(card.icon)}
                      alt={card.title}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-col text-left leading-tight ml-2">
                    <h4 className="font-bold text-sm">{card.title}</h4>

                    <p className="text-gray-500 text-[11px] font-medium">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}

          <div className="mt-2 md:mt-5 text-center">
            <Button
              onClick={onClick}
              className="bg-linear-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] text-[#102441] text-sm rounded-md px-4 py-5 border-none text-base font-bold shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer duration-200"
            >
              Book 1:1 Personalised Counselling
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default About;
