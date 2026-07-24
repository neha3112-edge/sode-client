"use client";

import Image from "next/image";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import FormWrapper from "@/components/forms/FormWrapper";
import { getAssetPath } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Hero({ initialHeroData = null }) {
  const [downloadOpen, setDownloadOpen] = useState(false);

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

  const openCounsellingForm = () => setDownloadOpen(true);
  const closeCounsellingForm = () => setDownloadOpen(false);

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
      <div className="px-4 pb-2 pt-0 lg:p-0">
        <div className="relative w-full overflow-hidden bg-[#102441] rounded-3xl lg:rounded-none border border-white/5 lg:border-0 h-[280px] lg:h-[480px] flex items-center">
          {/* Desktop Background Image */}
          <div className="absolute inset-0 z-0 hidden lg:block">
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

          {/* Mobile Background Image */}
          <div className="absolute right-0 bottom-0 top-0 w-[46%] overflow-hidden rounded-r-3xl z-0 lg:hidden block">
            <img
              src={bgImageUrl}
              alt="Campus Dome"
              className="w-full h-full object-cover object-left-center scale-[1.25] translate-x-2"
            />
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#102441] to-transparent z-10" />
          </div>

          <Container className="relative z-10 w-full px-4 py-6 lg:px-0 lg:py-16">
            <div className="flex w-full flex-col lg:grid lg:grid-cols-2 lg:gap-12">
              <div className="flex w-[60%] lg:w-full flex-col text-left text-white z-10 relative space-y-2 lg:space-y-6">
                <p className="text-[10px] lg:text-base font-serif font-semibold italic text-[#dbeafe] lg:mb-3">
                  <span className="text-xs lg:text-3xl font-medium text-[#f7ebc7] font-sans">#1</span>{" "}
                  {badgeText.replace(/^#1\s*/i, "")}
                </p>

                <h1 className="text-sm sm:text-base md:text-lg lg:text-3xl font-extrabold leading-tight text-white max-w-[240px] sm:max-w-none">
                  {titleText}
                </h1>

                <p className="text-[10px] lg:text-sm font-medium text-white/85 max-w-[200px] sm:max-w-md line-clamp-2 lg:line-clamp-none">
                  {subtitleText}
                </p>

                <div className="flex gap-2 pt-2 lg:pt-4">
                  <button
                    onClick={openCounsellingForm}
                    className="cursor-pointer rounded-lg lg:rounded-md bg-linear-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] px-2.5 sm:px-4 lg:px-8 py-1.5 lg:py-2 text-[10px] lg:text-base font-bold text-[#102441] shadow-lg hover:scale-[1.02] transition-transform duration-200"
                  >
                    {primaryCtaText === "Book 1:1 Personalised Counselling" ? "Explore Programs" : primaryCtaText}
                  </button>
                  <button
                    onClick={openCounsellingForm}
                    className="cursor-pointer rounded-lg lg:rounded-md border border-white/40 bg-white/10 px-2.5 sm:px-4 lg:px-6 py-1.5 lg:py-2 text-[10px] lg:text-base font-bold text-white shadow-md backdrop-blur-xs hover:bg-white/20 transition-all duration-200"
                  >
                    {slideSecondaryCta}
                  </button>
                </div>
              </div>

              {/* Desktop Right Column: Application Form */}
              {showOnDesktop && (
                <div className="hidden lg:flex w-full justify-end px-4">
                  <div className="w-full max-w-md">
                    <Card className="overflow-hidden rounded-2xl border-0 bg-white p-6 text-black shadow-2xl">
                      <FormWrapper
                        title="Apply Now"
                        subtitle="Select your course and start your application journey"
                        submitButtonText="Apply Now"
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

  // Carousel Slide Helper using Shadcn UI CarouselItem
  const renderSlideItem = (slide, idx) => {
    const slideBg = resolveImage(slide?.bgImage, "/assets/images/desktop_banner.jpg");
    const slideBadge = slide?.badge || badgeText;
    const slideTitle = slide?.title || titleText;
    const slideDesc = slide?.description || subtitleText;
    const slideCta = slide?.primaryCtaText || primaryCtaText;
    const slideSecondaryCta = slide?.secondaryCtaText || "Talk to an Expert";

    return (
      <CarouselItem key={slide._id || idx} className="p-0">
        <div className="px-4 pb-2 pt-0 lg:p-0">
          <div className="relative w-full overflow-hidden bg-[#102441] rounded-3xl lg:rounded-none border border-white/5 lg:border-0 h-[280px] lg:h-[480px] flex items-center">
            {/* Desktop Background Image */}
            <div className="absolute inset-0 z-0 hidden lg:block">
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

            {/* Mobile Background Image */}
            <div className="absolute right-0 bottom-0 top-0 w-[46%] overflow-hidden rounded-r-3xl z-0 lg:hidden block">
              <img
                src={slideBg}
                alt="Campus Dome"
                className="w-full h-full object-cover object-left-center scale-[1.25] translate-x-2"
              />
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#102441] to-transparent z-10" />
            </div>

            <Container className="relative z-10 w-full px-4 py-6 lg:px-0 lg:py-16">
              <div className="flex w-full flex-col lg:grid lg:grid-cols-2 lg:gap-12">
                <div className="flex w-[60%] lg:w-full flex-col text-left text-white z-10 relative space-y-2 lg:space-y-6">
                  <p className="text-[10px] lg:text-base font-serif font-semibold italic text-[#dbeafe] lg:mb-3">
                    <span className="text-xs lg:text-3xl font-medium text-[#f7ebc7] font-sans">#1</span>{" "}
                    {slideBadge.replace(/^#1\s*/i, "")}
                  </p>

                  <h1 className="text-sm sm:text-base md:text-lg lg:text-3xl font-extrabold leading-tight text-white max-w-[240px] sm:max-w-none">
                    {slideTitle}
                  </h1>

                  <p className="text-[10px] lg:text-sm font-medium text-white/85 max-w-[200px] sm:max-w-md line-clamp-2 lg:line-clamp-none">
                    {slideDesc}
                  </p>

                  <div className="flex gap-2 pt-2 lg:pt-4">
                    <button
                      onClick={openCounsellingForm}
                      className="cursor-pointer rounded-lg lg:rounded-md bg-linear-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] px-2.5 sm:px-4 lg:px-8 py-1.5 lg:py-2 text-[10px] lg:text-base font-bold text-[#102441] shadow-lg hover:scale-[1.02] transition-transform duration-200"
                    >
                      {slideCta === "Book 1:1 Personalised Counselling" ? "Explore Programs" : slideCta}
                    </button>
                    <button
                      onClick={openCounsellingForm}
                      className="cursor-pointer rounded-lg lg:rounded-md border border-white/40 bg-white/10 px-2.5 sm:px-4 lg:px-6 py-1.5 lg:py-2 text-[10px] lg:text-base font-bold text-white shadow-md backdrop-blur-xs hover:bg-white/20 transition-all duration-200"
                    >
                      {slideSecondaryCta}
                    </button>
                  </div>
                </div>

                {/* Desktop Right Column: Application Form */}
                {showOnDesktop && (
                  <div className="hidden lg:flex w-full justify-end px-4">
                    <div className="w-full max-w-md">
                      <Card className="overflow-hidden rounded-2xl border-0 bg-white p-6 text-black shadow-2xl">
                        <FormWrapper
                          title="Apply Now"
                          subtitle="Select your course and start your application journey"
                          submitButtonText="Apply Now"
                        />
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </Container>
          </div>
        </div>
      </CarouselItem>
    );
  };

  return (
    <>
      <section id="hero-section" className="relative w-full overflow-hidden">
        {isCarousel ? (
          <div className="relative w-full">
            {/* 🎯 NATIVE SHADCN UI CAROUSEL WITH EMBLA AUTOPLAY PLUGIN (ZERO useEffect) */}
            <Carousel
              opts={{ loop: true }}
              plugins={
                isAutoplay
                  ? [
                      Autoplay({
                        delay: autoplaySpeed,
                        stopOnInteraction: false,
                      }),
                    ]
                  : []
              }
              className="w-full"
            >
              <CarouselContent className="-ml-0">
                {heroData.slides.map((slide, idx) =>
                  renderSlideItem(slide, idx)
                )}
              </CarouselContent>
              {showArrows && (
                <>
                  <CarouselPrevious className="left-4 border-white/30 bg-black/40 text-white hover:bg-black/60 hidden lg:flex" />
                  <CarouselNext className="right-4 border-white/30 bg-black/40 text-white hover:bg-black/60 hidden lg:flex" />
                </>
              )}
            </Carousel>
          </div>
        ) : (
          renderSingleBanner()
        )}
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
