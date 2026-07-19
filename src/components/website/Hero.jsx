"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import FormWrapper from "@/components/forms/FormWrapper";
import { getAssetPath } from "@/lib/utils";

export function Hero() {
  const [downloadOpen, setDownloadOpen] = useState(false);

  /* =========================================================
     OPEN MODAL
  ========================================================= */

  const openCounsellingForm = () => {
    setDownloadOpen(true);
  };

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const closeCounsellingForm = () => {
    setDownloadOpen(false);
  };

  /* =========================================================
     LOCK BODY SCROLL WHEN MODAL IS OPEN
  ========================================================= */

  useEffect(() => {
    if (!downloadOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [downloadOpen]);

  /* =========================================================
     CLOSE MODAL ON ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    if (!downloadOpen) {
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
  }, [downloadOpen]);

  return (
    <>
      <section
        id="hero-section"
        className="relative w-full overflow-hidden bg-[#102441]"
      >
        {/* =================================================
            DESKTOP BACKGROUND IMAGE
        ================================================== */}

        <div className="absolute inset-0 z-0 hidden lg:block">
          <Image
            src={getAssetPath("/assets/images/desktop_banner.jpg")}
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <Container className="relative z-10 w-full px-0 pb-12 pt-24 lg:flex lg:items-center lg:pb-16 lg:pt-28">
          <div className="flex w-full flex-col items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
            {/* =================================================
                TEXT CONTENT
            ================================================== */}

            <div className="flex max-w-2xl flex-col items-center space-y-6 px-4 text-center text-white lg:items-start lg:py-4 lg:text-left">
              {/* Badge */}

              <p className="mb-3 font-serif text-base font-semibold italic text-[#dbeafe] md:text-lg lg:text-lg">
                <span className="text-base font-medium text-[#f7ebc7] md:text-lg lg:text-3xl">
                  #1
                </span>{" "}
                School of Online &amp; Distance Education
              </p>

              {/* Main Heading */}

              <h1 className="text-[22px] font-extrabold leading-tight text-white md:text-4xl lg:text-3xl">
                Certifications &amp; Online Degree Courses from{" "}
                <span className="text-[#f7ebc7]">IITs, IIMs &amp;</span> Leading
                Global B-Schools
              </h1>

              {/* Subtitle */}

              <p className="max-w-md text-sm font-medium text-white/90 md:text-sm">
                Your Gateway to Strategic Leadership Program Learning from
                Leading Institutions.
              </p>

              {/* =================================================
                  DESKTOP TAGS
              ================================================== */}

              <div className="hidden flex-col space-y-3 pt-2 lg:flex">
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-md border border-white/30 bg-white/5 px-4 py-2 text-sm font-semibold">
                    Doctorate
                  </span>

                  <span className="rounded-md border border-white/30 bg-white/5 px-4 py-2 text-sm font-semibold">
                    Certification
                  </span>

                  <span className="rounded-md border border-white/30 bg-white/5 px-4 py-2 text-sm font-semibold">
                    Executive Programs
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="rounded-md border border-white/30 bg-white/5 px-4 py-2 text-sm font-semibold">
                    Banking
                  </span>

                  <span className="rounded-md border border-white/30 bg-white/5 px-4 py-2 text-sm font-semibold">
                    Finance
                  </span>

                  <span className="rounded-md border border-white/30 bg-white/5 px-4 py-2 text-sm font-semibold">
                    Leadership
                  </span>
                </div>
              </div>

              {/* Desktop Action Button */}

              <div className="hidden pt-4 lg:block">
                <Button
                  size="lg"
                  type="button"
                  onClick={openCounsellingForm}
                  className="cursor-pointer rounded-md bg-linear-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] px-8 py-2 text-base font-bold text-[#102441] shadow-lg transition-all duration-200 hover:scale-[1.02]"
                >
                  Book 1:1 Personalised Counselling
                </Button>
              </div>
            </div>

            {/* =================================================
                MOBILE CONTENT
            ================================================== */}

            <div className="flex w-full flex-col items-center lg:hidden">
              {/* Mobile Image */}

              <div className="-mt-37.5 relative flex w-full justify-center overflow-hidden">
                <Image
                  src={getAssetPath("/assets/images/mobile-banner-img.png")}
                  alt="Professional Counselor"
                  width={623}
                  height={773}
                  priority
                  className="h-auto max-w-full object-contain"
                />
              </div>

              {/* Mobile Form */}

              <div className="-mt-14 z-10 w-full max-w-md px-4 md:-mt-24">
                <Card className="overflow-hidden rounded-2xl border-0 bg-white p-6 text-black shadow-2xl">
                  <FormWrapper
                    title="Apply Now"
                    subtitle="Select your course and start your application journey"
                    submitButtonText="Apply Now"
                  />
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FormWrapper
        isModal
        isOpen={downloadOpen}
        onClose={closeCounsellingForm}
      />
    </>
  );
}

export default Hero;
