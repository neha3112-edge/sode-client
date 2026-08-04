"use client";

import Image from "next/image";
import { useState } from "react";
import { Button, Card, Carousel } from "antd";

import { Container } from "@/components/common/Container";
import FormWrapper from "@/components/forms/FormWrapper";
import { useFormModal } from "@/context/FormModalContext";
import { getAssetPath } from "@/lib/utils";

export function Hero({ initialHeroData = null }) {
  const { openFormModal } = useFormModal();

  const heroData = initialHeroData;

  // Carousel settings & flags strictly mapped from SSR initialHeroData
  const carouselSettings = heroData?.carouselSettings || {};
  const isAutoplay = Boolean(carouselSettings.autoplay);
  const autoplaySpeed = Number(carouselSettings.autoplaySpeed) || 5000;
  const showArrows = Boolean(carouselSettings.showArrows);
  const showDots = Boolean(carouselSettings.showDots);

  // Form visibility flags from Mongoose Schema (showForm: "both" | "desktop" | "mobile" | "none")
  const showFormSetting = heroData?.showForm || "both";
  const showOnDesktop = showFormSetting === "both" || showFormSetting === "desktop";
  const showOnMobile = showFormSetting === "both" || showFormSetting === "mobile";

  const openCounsellingForm = () => {
    openFormModal({
      title: "Book 1:1 Personalised Counselling",
      subtitle: "Select your course and our academic experts will assist you",
      submitButtonText: "Book Counselling",
    });
  };

  // Carousel check
  const isCarousel =
    heroData?.isCarousel &&
    Array.isArray(heroData?.slides) &&
    heroData.slides.length > 0;

  const resolveImage = (mediaObj, fallbackPath) => {
    const rawUrl = typeof mediaObj === "object" ? mediaObj?.url : mediaObj;
    if (!rawUrl) return getAssetPath(fallbackPath);
    return getAssetPath(rawUrl, fallbackPath);
  };

  const badgeText = heroData?.badge || "#1 School of Online & Distance Education";
  const titleText =
    heroData?.title ||
    "Certifications & Online Degree Courses from IITs, IIMs & Leading Global B-Schools";
  const subtitleText =
    heroData?.subtitle ||
    "Your Gateway to Strategic Leadership Program Learning from Leading Institutions.";
  const primaryCtaText =
    heroData?.primaryCtaText || "Book 1:1 Personalised Counselling";
  const bgImageUrl = resolveImage(heroData?.bgImage, "/assets/images/desktop_banner.jpg");

  // Single Banner Helper
  const renderSingleBanner = () => {
    const slideSecondaryCta = "Talk to an Expert";

    return (
      <div className="w-full">
        {/* ── DESKTOP HERO VIEW (lg and up) ── */}
        <div className="flex relative w-full overflow-hidden bg-[#0C2340] md:h-80 items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src={bgImageUrl}
              alt="Hero background"
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          <Container className="relative z-10 w-full px-0 py-6 lg:py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center w-full">
              <div className="flex flex-col text-left text-white z-10 relative space-y-2 md:space-y-3">
                <p className="text-[10px] md:text-sm font-serif font-semibold italic text-[#dbeafe] mb-1 w-full">
                  <span className="text-xs md:text-lg font-medium text-[#f7ebc7] font-sans">#1</span>{" "}
                  {badgeText.replace(/^#1\s*/i, "")}
                </p>

                <h1 className="text-md lg:text-3xl leading-tight font-bold text-white w-[60%] md:w-full pt-2 md:pt-0">
                  {titleText}
                </h1>

                <p className=" hidden md:block text-xs font-medium text-white/85 max-w-md w-[50%] md:w-full">
                  {subtitleText}
                </p>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={openCounsellingForm}
                    className="cursor-pointer rounded-md bg-gradient-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] text-sm border-none font-semibold text-[#102441] shadow-lg hover:scale-[1.02] transition-transform duration-200"
                  >
                    {primaryCtaText === "Book 1:1 Personalised Counselling" ? "Get 1:1 Counselling" : primaryCtaText}
                  </Button>
                </div>
              </div>

              {/* Desktop Right Column: Application Form */}
              {showOnDesktop && (
                <div className="flex w-full justify-end px-4">
                  <div className="w-full max-w-md">
                    <Card className="overflow-hidden rounded-2xl border-0 bg-white p-6 text-black shadow-2xl">
                      <FormWrapper
                        title="Apply Now"
                        subtitle="Select your course and start your application journey"
                        submitButtonText="Apply Now"
                        formNameOverride="DesktopHero_ApplyNow"
                      />
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>
      </div>
    );
  };

  // Carousel Slide Helper using standard div wrapper for Antd Carousel
  const renderSlideItem = (slide, idx) => {
    const slideBg = resolveImage(slide?.bgImage, "/assets/images/desktop_banner.jpg");
    const slideBadge = slide?.badge || badgeText;
    const slideTitle = slide?.title || titleText;
    const slideDesc = slide?.description || subtitleText;
    const slideCta = slide?.primaryCtaText || primaryCtaText;
    const slideSecondaryCta = slide?.secondaryCtaText || "Talk to an Expert";

    return (
      <div key={slide._id || idx} className="w-full">
        {/* ── DESKTOP HERO SLIDE (lg and up) ── */}
        <div className="hidden lg:flex relative w-full overflow-hidden bg-[#0C2340] h-120 items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src={slideBg}
              alt={slideTitle || "Hero slide background"}
              fill
              priority={idx === 0}
              fetchPriority={idx === 0 ? "high" : "auto"}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          <Container className="relative z-10 w-full px-0 py-16">
            <div className="grid grid-cols-2 gap-12 items-center w-full">
              <div className="flex flex-col text-left text-white z-10 relative space-y-6">
                <p className="text-base font-serif font-semibold italic text-[#dbeafe] mb-1">
                  <span className="text-3xl font-medium text-[#f7ebc7] font-sans">#1</span>{" "}
                  {slideBadge.replace(/^#1\s*/i, "")}
                </p>

                <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight text-white">
                  {slideTitle}
                </h1>

                <p className="text-sm font-medium text-white/85 max-w-md">
                  {slideDesc}
                </p>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={openCounsellingForm}
                    className="cursor-pointer rounded-md bg-gradient-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] px-8 py-2.5 text-base font-bold text-[#102441] shadow-lg hover:scale-[1.02] transition-transform duration-200"
                  >
                    {slideCta === "Book 1:1 Personalised Counselling" ? "Explore Programs" : slideCta}
                  </button>
                  <button
                    onClick={openCounsellingForm}
                    className="cursor-pointer rounded-md border border-white/40 bg-white/10 px-6 py-2.5 text-base font-bold text-white shadow-md backdrop-blur-xs hover:bg-white/20 transition-all duration-200"
                  >
                    {slideSecondaryCta}
                  </button>
                </div>
              </div>

              {showOnDesktop && (
                <div className="flex w-full justify-end px-4">
                  <div className="w-full max-w-md">
                    <Card className="overflow-hidden rounded-2xl border-0 bg-white p-6 text-black shadow-2xl">
                      <FormWrapper
                        title="Apply Now"
                        subtitle="Select your course and start your application journey"
                        submitButtonText="Apply Now"
                        formNameOverride="DesktopHero_ApplyNow"
                      />
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>

        {/* ── MOBILE HERO SLIDE (< lg) ── */}
        <div className="lg:hidden w-full bg-[#0C2340]">
          <div className="pt-8 pb-0 text-center flex flex-col items-center relative overflow-hidden">
            <p className="text-xs sm:text-sm font-serif italic text-[#dbeafe] mb-2.5 font-medium">
              <span className="font-sans font-bold text-[#f7ebc7] not-italic text-sm">#1</span>{" "}
              {slideBadge.replace(/^#1\s*/i, "")}
            </p>

            <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-tight max-w-xs sm:max-w-md mx-auto mb-3">
              {slideTitle}
            </h1>

            <p className="text-xs sm:text-sm text-slate-200/90 font-medium max-w-xs sm:max-w-md mx-auto leading-relaxed">
              {slideDesc}
            </p>

            <div className="w-full relative flex justify-center items-end">
              <img
                src={resolveImage(slide?.mobileBgImage || slide?.mobileImage, "/media/images/2026/07/20/893bee8f8373a9101bcdb9a52bfbe001.png")}
                alt={slideTitle}
                className="w-full h-auto max-h-[320px] object-contain object-bottom"
              />
            </div>
          </div>

          {showOnMobile && idx === 0 && (
            <div className="px-4 py-6 bg-[#0C2340]">
              <div className="max-w-md mx-auto bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200/80">
                <FormWrapper
                  title="Apply Now"
                  subtitle="Select your course and start your application journey"
                  submitButtonText="Apply Now"
                  formNameOverride="MobileHero_ApplyNow"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="hero-section" className="relative w-full overflow-hidden">
      {isCarousel ? (
        <div className="relative w-full">
          <Carousel
            autoplay={isAutoplay}
            autoplaySpeed={autoplaySpeed}
            arrows={showArrows}
            dots={showDots}
            className="w-full"
          >
            {heroData.slides.map((slide, idx) =>
              renderSlideItem(slide, idx)
            )}
          </Carousel>
        </div>
      ) : (
        renderSingleBanner()
      )}
    </section>
  );
}

export default Hero;
