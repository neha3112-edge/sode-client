"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import FormWrapper from "@/components/forms/FormWrapper";
import { getAssetPath } from "@/lib/utils";

export function About() {
  const [counsellingOpen, setCounsellingOpen] = useState(false);

  const onClick = () => {
    setCounsellingOpen(true);
  };

  const closeCounsellingForm = () => {
    setCounsellingOpen(false);
  };

  /* =========================================================
     LOCK BODY SCROLL WHEN MODAL IS OPEN
  ========================================================= */

  useEffect(() => {
    if (!counsellingOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [counsellingOpen]);

  /* =========================================================
     CLOSE MODAL ON ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    if (!counsellingOpen) {
      return;
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeCounsellingForm();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [counsellingOpen]);

  const leftCards = [
    {
      title: "Personalised One-to-One Mentorship",
      desc: "Enriched learning and guidance through industry experts.",
      icon: getAssetPath("/assets/images/icon-1.png"),
      css: "w-full",
    },
    {
      title: "Empowering Careers Through Global Exposure",
      desc: "Join the global community of business executives.",
      icon: getAssetPath("/assets/images/icon-2.png"),
      css: "md:w-[90%]",
    },
    {
      title: "AI-Driven Course Comparison Features",
      desc: "Find your Perfect Programme Match with AI recommendation.",
      icon: getAssetPath("/assets/images/icon-3.png"),
      css: "w-full",
    },
  ];

  const rightCards = [
    {
      title: "Offers Affordable Pathways to Global Education",
      desc: "Access to flexible financing options like No Cost EMI.",
      icon: getAssetPath("/assets/images/icon-4.png"),
      css: "w-full",
    },
    {
      title: "Seamless Support Throughout Your Learning",
      desc: "Provide post-enrollment support to every learner.",
      icon: getAssetPath("/assets/images/icon-5.png"),
      css: "md:w-[90%]",
    },
    {
      title: "Elevating Futures towards Professional Excellence",
      desc: "Join a prestigious alumni network that empowers lifelong growth.",
      icon: getAssetPath("/assets/images/icon-6.png"),
      css: "w-full",
    },
  ];

  return (
    <>
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

            <div className="space-y-4 text-sm text-gray-300 font-medium leading-relaxed">
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

            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_280px_1fr] gap-6 md:gap-2 items-center w-full px-4">
              {/* Left Column */}

              <div className="flex flex-col space-y-4 md:space-y-6 order-1 w-full">
                {leftCards.map((card, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center lg:flex-row-reverse justify-between bg-white rounded-[10px] p-3.5 shadow-xl text-[#102441] hover:scale-[1.02] transition-all duration-200 w-full ${card.css}`}
                  >
                    <div className="rounded-lg flex items-center justify-between lg:justify-end w-full relative">
                      <div className="flex flex-col leading-tight text-left lg:text-right mr-3 lg:mr-1.5 min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm leading-snug">
                          {card.title}
                        </h4>

                        <p className="text-gray-500 text-[10px] sm:text-[11px] font-medium mt-0.5 leading-snug">
                          {card.desc}
                        </p>
                      </div>

                      <Image
                        src={card.icon}
                        alt={card.title}
                        width={40}
                        height={40}
                        className="object-contain shrink-0"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Middle Column */}

              <div className="flex justify-center items-end relative h-96 sm:h-110 w-70 mx-auto order-3 lg:order-2 md:-mt-10 my-4 lg:my-0">
                <div className="absolute bottom-0 w-full bg-[#E6A02E] rounded-3xl z-0 shadow-lg" />

                <div className="relative z-10 w-70 h-96 sm:h-110">
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

              <div className="flex flex-col lg:items-end space-y-4 md:space-y-6 order-2 lg:order-3 w-full">
                {rightCards.map((card, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center bg-white rounded-[10px] p-3.5 shadow-xl text-[#102441] hover:scale-[1.02] transition-all duration-200 w-full ${card.css}`}
                  >
                    <div className="rounded-lg flex items-center justify-center shrink-0 relative mr-3">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        width={40}
                        height={40}
                        className="object-contain shrink-0"
                      />
                    </div>

                    <div className="flex flex-col text-left leading-tight min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm leading-snug">{card.title}</h4>

                      <p className="text-gray-500 text-[10px] sm:text-[11px] font-medium mt-0.5 leading-snug">
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
                className="bg-linear-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] text-[#102441] rounded-md px-8 py-5 text-base font-bold shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer duration-200"
              >
                Book 1:1 Personalised Counselling
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <FormWrapper
        isModal
        isOpen={counsellingOpen}
        onClose={closeCounsellingForm}
      />
    </>
  );
}

export default About;
