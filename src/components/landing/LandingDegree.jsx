"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import LandingContainer from "./LandingContainer";

const GALGOTIAS_WHY_CHOOSE_SLIDES = [
  {
    icon: "/assets/galgotias/industry.webp",
    title: "Industry-Expert Designed Programs",
    desc: "Galgotias University online courses curriculum is enhanced in collaboration with industry-led academicians. It ensures that students gain not only relevant theoretical but also practical knowledge.",
  },
  {
    icon: "/assets/galgotias/icon.webp",
    title: "Advanced Learning Facilities",
    desc: "Students enrolled in Galgotias University online courses benefit from modern digital infrastructure. It supports a learning environment that promotes accessible learning and engaging.",
  },
  {
    icon: "/assets/galgotias/carrier.webp",
    title: "Career-Oriented Education",
    desc: "Modern organisations prefer and value individuals that develops advanced skills in respective sectors, such as the online MBA from Galgotias University. Similarly, all the courses are industry-focused and develop skills and knowledge.",
  },
  {
    icon: "/assets/galgotias/lms.webp",
    title: "Integrated Learning Management System (LMS)",
    desc: "The LMS used in Galgotias University online classes is highly advanced. It permits students to attend lectures both live and recorded. They get access to study material and can track their progress easily.",
  },
];

export default function LandingDegree({
  degreeInfo = {},
  brand = {},
  onOpenApply,
}) {
    const galgotiasCarouselRef = useRef(null);
  const [galgotiasSlide, setGalgotiasSlide] = useState(0);

  if (!degreeInfo || Object.keys(degreeInfo).length === 0) return null;

  const {
    title = "Globally Accepted\nOnline Vivekananda Global University\nDegree",
    description = "",
    features = [],
    buttonText = "Get Your Degree",
    image = "/assets/all_universities_images/vgu/sample-degree-vgu.webp",
    images = null,
  } = degreeInfo;


  const isGalgotias =
    brand.degreeLayout === "galgotias" || brand.slug === "galgotias";

  if (isGalgotias) {
    return (
      <section
        id="certificate"
        className="select-none scroll-mt-20 overflow-visible"
      >
        {/* Yellow Advantage Section */}
        <div id="advantage" className="scroll-mt-20">
          {/* Desktop Banner: Only Yellow strip with heading */}
          <div className="w-full bg-[#f9bc08] py-8 sm:py-10 lg:py-12 min-h-[90px] sm:min-h-[110px] lg:min-h-[125px] hidden sm:flex items-center justify-center px-4 text-center">
            <h2 className="text-[26px] sm:text-[28px] md:text-[32px] lg:text-[34px] font-bold text-[#b11116] m-0 tracking-tight">
              Why Choose Galgotias University Online
            </h2>
          </div>

          {/* Mobile View: Yellow background with Heading + Slider */}
          <div className="w-full bg-[#f9bc08] pt-8 pb-9 px-4 block sm:hidden text-center">
            <h2 className="text-[22px] font-bold text-[#b11116] m-0 mb-5 leading-tight">
              Why Choose Galgotias <br />
              University Online
            </h2>

            <div className="max-w-[340px] mx-auto">
              <Carousel
                ref={galgotiasCarouselRef}
                autoplay
                autoplaySpeed={3500}
                dots={false}
                afterChange={(current) => setGalgotiasSlide(current)}
              >
                {GALGOTIAS_WHY_CHOOSE_SLIDES.map((slide, idx) => (
                  <div key={idx} className="px-1 pb-1">
                    <div className="bg-white rounded-[16px] px-5 py-6 text-center shadow-md flex flex-col items-center justify-center min-h-[250px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slide.icon}
                        alt={slide.title}
                        className="w-[50px] h-[50px] object-contain mx-auto mb-3"
                      />
                      <h3 className="text-[15.5px] font-bold text-black m-0 mb-2 leading-snug">
                        {slide.title}
                      </h3>
                      <p className="text-[13px] text-[#444444] leading-relaxed m-0 font-normal">
                        {slide.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </Carousel>

              {/* Custom Carousel Dots (matches reference screenshot) */}
              <div className="flex items-center justify-center gap-2 pt-4">
                {GALGOTIAS_WHY_CHOOSE_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => galgotiasCarouselRef.current?.goTo(idx)}
                    className={`w-3 h-3 rounded-full border-none p-0 cursor-pointer transition-all ${
                      galgotiasSlide === idx ? "bg-black" : "bg-black/35"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Degree Content Section */}
        <div className="py-12 sm:py-16 bg-[#f6f6f6] overflow-visible">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="lg:col-span-6 text-left">
                <h2 className="text-[26px] sm:text-[30px] lg:text-[32px] font-bold text-[#002266] m-0 mb-4 leading-[1.2]">
                  About the Sample Degree of <br />
                  Galgotias Online
                </h2>
                <p className="text-[13.5px] sm:text-[14px] text-[#555555] leading-relaxed mb-4 font-normal">
                  After completing their Galgotias University online courses, students receive a UGC recognised degree issued by Galgotias University Online. The degree holds academic credibility and relevance worldwide. It also reflects the specialisation pursued during the program.
                </p>

                <ul className="space-y-2.5 my-5 text-[13.5px] sm:text-[14px] text-[#333333] list-none p-0 m-0">
                  <li className="flex items-center gap-2.5 font-medium">
                    <span className="w-4 h-4 rounded-full bg-[#28a745] text-white flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                    <span>NAAC A+ Accredited Degree</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-medium">
                    <span className="w-4 h-4 rounded-full bg-[#28a745] text-white flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                    <span>Globally Recognised</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-medium">
                    <span className="w-4 h-4 rounded-full bg-[#28a745] text-white flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                    <span>Flexible Online Learning Mode</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(null, "Get Degree")}
                    className="degree-btn hidden sm:inline-flex items-center justify-center bg-[#f9bc08] hover:bg-[#e0a807] text-white font-bold text-[14px] sm:text-[15px] px-8 py-2.5 rounded-full border-none cursor-pointer shadow-sm transition-all active:scale-95"
                  >
                    Get Degree
                  </button>
                </div>
              </div>

              {/* Right Yellow Image Container */}
              <div className="lg:col-span-6 pt-8 sm:pt-12 lg:pt-8">
                <div className="cer2 bg-[#ffef97] rounded-[16px] px-3 sm:px-5 pt-4 sm:pt-0 pb-3 sm:pb-0 flex flex-col sm:flex-row items-center sm:items-end justify-center gap-2 sm:gap-3 relative overflow-visible">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/galgotias/image-01-galgotia.webp"
                    alt="Galgotias Graduate"
                    className="w-[255px] sm:w-[245px] md:w-[270px] lg:w-[285px] max-w-[88%] sm:max-w-[50%] h-auto object-contain shrink-0 block"
                    style={{ marginTop: "-52px" }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/galgotias/sample-galgotia.webp"
                    alt="Galgotias Sample Degree"
                    className="w-[305px] sm:w-[260px] md:w-[285px] lg:w-[305px] max-w-[96%] sm:max-w-[50%] h-auto object-contain my-2 sm:my-4 shadow-sm rounded-[4px] block"
                  />
                </div>

                {/* Mobile Button: centered below yellow card */}
                <div className="block sm:hidden text-center mt-5">
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(null, "Get Degree")}
                    className="degree-btn inline-flex items-center justify-center bg-[#f9bc08] hover:bg-[#e0a807] text-white font-bold text-[15px] px-9 py-2.5 rounded-full border-none cursor-pointer shadow-md transition-all active:scale-95"
                  >
                    Get Degree
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isRushford =
    brand.degreeLayout === "rushford" || brand.slug === "rushford";

  if (isRushford) {
    const certImages = images && images.length > 0 ? images : [image || "/assets/all_universities_images/rushford/certificate.webp"];

    return (
      <section
        id="sample-degree"
        className="degree-section pt-0 pb-12 sm:pb-16 bg-white select-none scroll-mt-20"
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="degree grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Degree display */}
            <div className="flex justify-center">
              {certImages.length > 1 ? (
                <div className="w-full max-w-[380px] sm:max-w-[420px]">
                  <Carousel autoplay autoplaySpeed={3500} dots={false}>
                    {certImages.map((imgSrc, idx) => (
                      <div key={idx} className="relative w-full h-[240px] sm:h-[280px]">
                        <Image
                          src={imgSrc}
                          alt={title || `Certificate ${idx + 1}`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 380px, 420px"
                          priority={idx === 0}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              ) : (
                <div className="relative w-full max-w-[380px] sm:max-w-[420px] h-[240px] sm:h-[280px]">
                  <Image
                    src={certImages[0]}
                    alt={title || "Certificate"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 380px, 420px"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Degree info */}
            <div className="degree-info text-center md:text-left">
              <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-bold text-[#17479e] leading-tight m-0 mb-3 sm:mb-4">
                {title}
              </h2>
              <p className="text-[13.5px] sm:text-[14px] text-[#333333] leading-relaxed mb-6 font-normal">
                {description}
              </p>
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="enquireNowBtn inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#FF0066] hover:bg-[#e0005a] text-white font-semibold text-[14px] sm:text-[15px] rounded-[5px] transition-all border-none cursor-pointer active:scale-95 shadow-sm"
              >
                <span>{buttonText || "Get Degree"}</span>
                <span className="text-[15px] leading-none">➔</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isCu =
    brand.degreeLayout === "cu" || brand.slug === "cu";

  if (isCu) {
    const certImage =
      image || brand.degreeImage || "/assets/cu/CU-sample-degree.png";
    return (
      <section
        id="certificate"
        className="py-16 sm:py-24 bg-white select-none scroll-mt-20"
      >
        <LandingContainer className="px-3 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Degree Image */}
            <div className="lg:col-span-6 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[620px] lg:max-w-[640px] h-[280px] sm:h-[400px] lg:h-[480px]">
                <Image
                  src={certImage}
                  alt="Sample Degree"
                  fill
                  priority
                  className="object-contain object-center lg:object-left"
                  sizes="(max-width: 1024px) 100vw, 640px"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 text-left pl-4 sm:pl-6 lg:pl-10 pr-2 sm:pr-0">
              <p className="text-[13.5px] sm:text-[14.5px] font-bold text-slate-900 m-0 mb-2">
                Launch Your Career with an Online Degree From
              </p>
              <h2 className="text-[25px] sm:text-[32px] lg:text-[36px] font-bold text-[#d11c1f] m-0 leading-[1.2] mb-3.5">
                <span className="block">Chandigarh University</span>
                <span className="block">Online Learning Platform</span>
              </h2>
              <p className="text-[12.5px] sm:text-[13px] text-slate-600 leading-[1.65] m-0 font-normal max-w-[490px] mb-3.5">
                Choose from a wide range of UGC-approved online degrees designed to
                provide you with in-demand skills for today&apos;s dynamic work
                environment.
              </p>
              <ul className="space-y-1.5 text-[12.5px] sm:text-[13px] text-slate-700 font-normal list-disc pl-4 m-0 mb-5">
                <li>Industry-expert faculty</li>
                <li>Flexible scheduling</li>
                <li>Future-ready curriculum</li>
                <li>Globally recognized degree</li>
              </ul>
              <div className="pt-1 pb-4">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className="bg-[#d11c1f] hover:bg-[#b51619] text-white font-bold text-[13px] sm:text-[14px] px-6 py-2.5 rounded-[6px] shadow-sm inline-flex items-center gap-2 cursor-pointer border-none transition-all active:scale-95"
                >
                  <span>Know More</span>
                  <span className="text-[14px] leading-none">➔</span>
                </button>
              </div>
            </div>
          </div>
        </LandingContainer>
      </section>
    );
  }

  const isEsgci =
    brand.degreeLayout === "esgci" || brand.slug === "esgci";

  if (isEsgci) {
    return (
      <section
        id="sample-degree"
        className="degree-section py-10 sm:py-16 bg-white select-none scroll-mt-20"
      >
        <div className="max-w-[1140px] min-[1600px]:max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="degree grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Degree display */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[440px] shadow-[0_0_5px_2px_#ccc] rounded-[4px] overflow-hidden bg-white">
                <Image
                  src={image || "/assets/all_universities_images/esgci/degree-ESGCI.webp"}
                  alt={title || "ESGCI Online DBA Degree"}
                  width={600}
                  height={420}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Degree info */}
            <div className="degree-info text-left">
              <h2 className="text-[22px] sm:text-[30px] lg:text-[35px] font-bold text-[#04903c] leading-tight m-0 mb-3">
                {title || "ESGCI Online DBA Degree"}
              </h2>
              <p className="text-[13.5px] sm:text-[14px] text-[#333333] leading-relaxed mb-6 font-normal">
                {description}
              </p>
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="enquireNowBtn px-7 py-2.5 bg-[#fff000] hover:bg-[#ebd800] text-black font-bold text-[15px] sm:text-[16px] rounded-[5px] transition-all border-none cursor-pointer active:scale-95 shadow-sm"
              >
                {buttonText || "Get Degree"}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isIiitb =
    brand.degreeLayout === "iiitb" || brand.slug === "iiitb";

  if (isIiitb) {
    return (
      <section
        id="sample-certificate"
        className="certificate-slider-section py-14 sm:py-16 bg-[#f5f5f5] select-none scroll-mt-20"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Certificate display */}
          <div className="certificate-display flex justify-center">
            <div className="relative w-full max-w-[480px] h-[340px] sm:h-[400px]">
              <Image
                src={
                  image ||
                  "/assets/all_universities_images/iiitb/sample-certificate.webp"
                }
                alt="Sample Certificate"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Certificate content */}
          <div className="certificate-content text-left flex flex-col items-start justify-center">
            <h2 className="text-[30px] sm:text-[38px] font-medium leading-[1.15] text-[#005382] m-0 mb-3 whitespace-pre-line">
              {title || "Sample Post \n Graduate Certificate"}
            </h2>
            <p className="description text-[14px] text-[#444444] leading-relaxed mb-6 font-normal">
              {description}
            </p>
            <button
              type="button"
              onClick={() => onOpenApply?.()}
              className="get-degree-btn inline-flex items-center gap-2 bg-[#005382] hover:bg-[#004269] text-white font-bold text-[14px] px-8 py-3 rounded-full border-none cursor-pointer transition-all active:scale-95 shadow-md"
            >
              <span>{buttonText || "Get Degree"}</span>
              <span className="arrow text-[16px]">→</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  const isSsbm =
    brand.degreeLayout === "ssbm" || brand.slug === "ssbm";

  if (isSsbm) {
    const certImage =
      image ||
      brand.degreeImage ||
      "/assets/all_universities_images/ssbm/deree-ssbm.png";

    return (
      <section
        id="sample-degree"
        className="degree-section py-12 sm:py-16 bg-white select-none scroll-mt-20"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Certificate display */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-[10px] overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.15)] bg-white p-2">
                <Image
                  src={certImage}
                  alt="SSBM PWC Directorship & Board Advisory Certificate"
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Certificate content */}
            <div className="degree-info text-left">
              <h2 className="text-[21px] sm:text-[30px] lg:text-[34px] font-bold text-[#c11f28] leading-tight m-0 mb-4 uppercase">
                {degreeInfo.title1 || "PWC DIRECTORSHIP & BOARD"}{" "}
                <span className="text-[#c11f28] block">
                  {degreeInfo.title2 || "ADVISORY CERTIFICATE"}
                </span>
              </h2>
              <p className="text-[13.5px] sm:text-[14.5px] text-[#444444] leading-relaxed mb-6 font-normal">
                {description}
              </p>
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="px-8 py-3 bg-[#c11f28] hover:bg-[#a81a22] text-white font-bold text-[15px] rounded-[5px] transition-all border-none cursor-pointer shadow-md active:scale-95"
              >
                {buttonText || "Get Degree"}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isLpu =
    brand.degreeLayout === "lpu" ||
    brand.slug === "lpu";

  if (isLpu) {
    const certImage =
      image ||
      degreeInfo.image ||
      brand.degreeImage ||
      "/assets/all_universities_images/lpu/sample-certificate-lpu.webp";

    const titleH2 = degreeInfo.title || "";
    const subtitleH3 = degreeInfo.subtitle || "";
    const descriptionText = description || degreeInfo.desc || "";

    const defaultFeatures = [
      {
        title: "Top University Degree",
        desc: "Students earn a recognised qualification from Lovely Professional University. It offers valid degree for all career-focused programs like LPU MBA Online, LPU MCA Online, and LPU Online BCA.",
      },
      {
        title: "Universally Accepted Degree",
        desc: "Professionals can upgrade themselves through a globally recognised, UGC-approved degree. These online degrees are accepted worldwide by all employers and academic institutions.",
      },
      {
        title: "Equivalent to Campus Programs",
        desc: "LPU Online degrees are officially equivalent to regular classroom degrees. These degrees meet all academic standards requirements and offer crucial job-ready skills.",
      },
      {
        title: "Top-Tier Degree Achievement",
        desc: "Graduates from a UGC-approved LPU online university join the strong alumni network globally. The degrees hold relevance in India and beyond.",
      },
    ];

    const activeFeatures =
      features && features.length > 0 ? features : defaultFeatures;

    const hideCertOnMobile = Boolean(
      degreeInfo.hideCertificateOnMobile ??
      degreeInfo.hideCertOnMobile ??
      brand.hideDegreeCertOnMobile
    );

    const sectionClassName = degreeInfo.sectionClassName || brand.degreeSectionClassName || "";
    const containerClassName = degreeInfo.containerClassName || brand.degreeContainerClassName || "";
    const titleClassName = degreeInfo.titleClassName || "";
    const subtitleClassName = degreeInfo.subtitleClassName || "";
    const descClassName = degreeInfo.descClassName || "";
    const gridClassName = degreeInfo.featuresGridClassName || "";
    const defaultCardClassName = degreeInfo.cardClassName || "";
    const defaultCardTitleClassName = degreeInfo.cardTitleClassName || "";
    const defaultCardDescClassName = degreeInfo.cardDescClassName || "";
    const buttonClassName = degreeInfo.buttonClassName || "";
    const buttonContainerClassName = degreeInfo.buttonContainerClassName || "pt-2 flex justify-start";

    return (
      <section id="Degreeinfo" className={sectionClassName}>
        <LandingContainer className={containerClassName}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center">
            {/* Left: Certificate Image */}
            <div className={`${hideCertOnMobile ? "hidden lg:flex" : "flex"} lg:col-span-5 justify-center`}>
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-[666/825] rounded-[4px] overflow-hidden shadow-md bg-white border border-slate-200/90">
                <Image
                  src={certImage}
                  alt="LPU Online Degree"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 420px"
                  priority
                />
              </div>
            </div>

            {/* Right: Info & Feature Boxes */}
            <div className="lg:col-span-7 text-left space-y-4">
              <div>
                {titleH2 && <h2 className={titleClassName}>{titleH2}</h2>}
                {subtitleH3 && <h3 className={subtitleClassName}>{subtitleH3}</h3>}
                {descriptionText && <p className={descClassName}>{descriptionText}</p>}
              </div>

              <div className={gridClassName}>
                {activeFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className={feat.cardClassName || defaultCardClassName}
                  >
                    <h4 className={feat.titleClassName || defaultCardTitleClassName}>
                      {feat.title}
                    </h4>
                    <p className={feat.descClassName || defaultCardDescClassName}>
                      {feat.desc || feat.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className={buttonContainerClassName}>
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className={buttonClassName}
                >
                  <span>{degreeInfo.buttonText || "Get FREE Career Assistance"}</span>
                </button>
              </div>
            </div>
          </div>
        </LandingContainer>
      </section>
    );
  }

  const isUu =
    brand.degreeLayout === "uu" ||
    brand.slug === "uu";

  if (isUu) {
    const subtitleGreen = degreeInfo.highlight || degreeInfo.greenTitle || "UGC Approved";
    const line1 = degreeInfo.line1 || "Uttaranchal University";
    const line2 = degreeInfo.line2 || "Online Degree";

    return (
      <section
        id="degree"
        className="w-full relative select-none py-10 sm:py-16 lg:py-20 bg-white scroll-mt-20"
      >
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Text Info + Button */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h2 className="text-[24px] xs:text-[26px] sm:text-[34px] lg:text-[38px] font-bold leading-tight m-0 mb-4 text-slate-900">
                <span className="text-[#62B239] block mb-1">{subtitleGreen}</span>
                <span className="block whitespace-nowrap sm:whitespace-normal">{line1}</span>
                <span className="block">{line2}</span>
              </h2>

              {description && (
                <p className="text-[13px] sm:text-[14.5px] text-[#444444] font-normal leading-relaxed m-0 mb-6 max-w-lg">
                  {description}
                </p>
              )}

              <div className="hidden lg:block">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className="px-8 py-2.5 border-2 border-[#0A3C7D] text-[#0A3C7D] hover:bg-[#0A3C7D] hover:text-white font-semibold text-[14px] rounded-[4px] bg-white transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  {buttonText || "Get Degree"}
                </button>
              </div>
            </div>

            {/* Right: Certificate Image */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] h-[450px] sm:h-[520px] drop-shadow-md">
                <Image
                  src={image || "/assets/all_universities_images/uu/sample-degree-uttarancha1.webp"}
                  alt="Uttaranchal University Online Degree"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 320px, 380px"
                  priority
                />
              </div>

              {/* Mobile button below image */}
              <div className="block lg:hidden mt-5">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className="px-8 py-2.5 border-2 border-[#0A3C7D] text-[#0A3C7D] hover:bg-[#0A3C7D] hover:text-white font-semibold text-[14px] rounded-[4px] bg-white transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  {buttonText || "Get Degree"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isLiverpool =
    brand.degreeLayout === "liverpool" || brand.slug === "liverpool";

  if (isLiverpool) {
    const certImages = images && images.length > 0 ? images : [image];
    return (
      <section
        id="view-sample-degree"
        className="mba-journey-cert-wrapper select-none py-14 sm:py-18 bg-[#0b2154] text-white scroll-mt-20"
      >
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Side - Slider Container */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[460px]">
                <Carousel autoplay autoplaySpeed={3000} dots={true}>
                  {certImages.map((imgSrc, idx) => (
                    <div key={idx} className="relative w-full h-[280px] sm:h-[350px] rounded-[6px] overflow-hidden flex items-center justify-center p-2">
                      <Image
                        src={imgSrc}
                        alt={`Certificate ${idx + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="lg:col-span-6">
              <h2 className="text-[26px] sm:text-[32px] font-bold text-[#00e5d1] mb-2 leading-snug m-0">
                {degreeInfo.headingTeal || "LBS MBA Pathway + IIM Udaipur"}
              </h2>
              <h3 className="text-[20px] sm:text-[24px] font-semibold text-white mb-4 m-0">
                {degreeInfo.subHeading || "Double Certification Edge"}
              </h3>
              <div className="text-[14px] sm:text-[15px] text-white/90 leading-relaxed space-y-3 mb-6">
                <p className="m-0">{description}</p>
              </div>
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="px-7 py-3 bg-[#ff8c32] hover:bg-[#e07520] active:scale-95 text-white font-bold text-[15px] rounded-[6px] transition-all border-none cursor-pointer inline-flex items-center gap-2 shadow-lg"
              >
                <span>{buttonText || "Get Degree"}</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isIim =
    brand.degreeLayout === "iim" ||
    brand.slug === "iim";

  if (isIim) {
    return (
      <section id="sample-degree">
        <div className="container">
          <div className="degree">
            <center>
              <Image
                src={image || "/assets/iim/sample-certificate.webp"}
                alt="sample-degree"
                width={500}
                height={350}
                className="img-responsive object-contain"
              />
            </center>
            <div className="degree-info">
              <h2>IIM Kozhikode<br /> Sample Degree</h2>
              <br />
              <h3>{degreeInfo.subtitle || "HR Analyics Certification Course"}</h3>
              <br />
              <p>
                {description || "Complete all course modules and earn a professional HR Management and Analytics certification from IIM Kozhikode. This course will help you develop important skills for the HR field. It will also boost your career and make you more competitive in the job market."}
              </p>
              <br />
              <button
                type="button"
                className="enquireNowBtn"
                onClick={() => onOpenApply?.()}
              >
                {buttonText || "Get Degree"}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isGgu =
    brand.degreeLayout === "ggu" ||
    brand.slug === "ggu";

  const isImageLeft =
    brand.degreeLayout === "imageLeft" ||
    isGgu;

  const titleColor = degreeInfo.titleColor || brand.degreeTitleColor || (isGgu ? "#003468" : "#811811");
  const btnBg = degreeInfo.buttonBg || brand.degreeBtnBg || (isGgu ? "#DC520A" : "#ffc107");
  const btnTextColor = degreeInfo.buttonTextColor || brand.degreeBtnTextColor || (isGgu ? "#ffffff" : "#020617");

  const isTransparentCard =
    degreeInfo.cardBackground === "transparent" ||
    degreeInfo.transparentCard ||
    brand.slug === "vgu";

  return (
    <section
      id="degree"
      className={`select-none ${isGgu ? "bg-[#F6F6F6] pt-2 pb-14 sm:pb-16" : "py-12 sm:py-16 bg-[#f4f7fb]"
        }`}
      style={degreeInfo.sectionBg ? { backgroundColor: degreeInfo.sectionBg } : {}}
    >
      <LandingContainer>
        <div
          className={`max-w-[1140px] min-[1600px]:max-w-[1360px] min-[1920px]:max-w-[1480px] mx-auto ${isTransparentCard
              ? "bg-transparent px-5 sm:px-8 lg:px-10 py-2 shadow-none border-none"
              : "bg-white rounded-[8px] sm:rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100/80 p-6 sm:p-10 lg:p-12"
            }`}
          style={
            !isTransparentCard && degreeInfo.cardBackground
              ? { backgroundColor: degreeInfo.cardBackground }
              : {}
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image Column */}
            <div
              className={`lg:col-span-5 flex justify-center ${isImageLeft ? "order-1 lg:order-1" : "order-2 lg:order-2"
                }`}
            >
              {images && images.length > 1 ? (
                <div className="w-full max-w-[340px] sm:max-w-[420px]">
                  <Carousel autoplay autoplaySpeed={3000} dots={true}>
                    {images.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className={`relative w-full ${degreeInfo.imageWrapperClassName || (isTransparentCard
                            ? "max-w-[360px] sm:max-w-[420px] aspect-square mx-auto"
                            : isGgu
                            ? "max-w-[380px] sm:max-w-[440px] aspect-[583/499]"
                            : "h-[250px] sm:h-[300px] rounded-[10px] overflow-hidden shadow-lg border border-slate-200 bg-white"
                          )}`}
                      >
                        <Image
                          src={imgSrc}
                          alt={`Sample Degree ${idx + 1}`}
                          fill
                          className={degreeInfo.imageClassName || (isGgu ? "object-contain" : "object-contain p-2")}
                          sizes="(max-width: 1024px) 380px, 440px"
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              ) : (
                <div
                  className={`relative w-full ${degreeInfo.imageWrapperClassName || (isTransparentCard
                      ? "max-w-[360px] sm:max-w-[420px] aspect-square mx-auto"
                      : isGgu
                      ? "max-w-[360px] sm:max-w-[410px] aspect-[583/499]"
                      : "max-w-[340px] sm:max-w-[420px] h-[250px] sm:h-[300px] rounded-[10px] overflow-hidden shadow-lg border border-slate-200 bg-white"
                    )}`}
                >
                  <Image
                    src={image}
                    alt="Sample Degree"
                    fill
                    className={degreeInfo.imageClassName || (isGgu ? "object-contain" : "object-contain p-2")}
                    sizes="(max-width: 1024px) 360px, 410px"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Text / Features Column */}
            <div
              className={`lg:col-span-7 text-left ${isImageLeft ? "order-2 lg:order-2" : "order-1 lg:order-1"
                }`}
            >
              <h2
                className="text-[24px] sm:text-[28px] lg:text-[31px] font-bold leading-tight tracking-wide whitespace-pre-line m-0 mb-3"
                style={{ color: titleColor }}
              >
                {title}
              </h2>

              {description && (
                <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed font-medium mb-5">
                  {description}
                </p>
              )}

              <div className="space-y-3 sm:space-y-3.5">
                {features.map((feat, idx) => {
                  if (isGgu || !feat.title) {
                    return (
                      <div key={idx} className="flex items-start gap-2.5 sm:gap-3">
                        <span className="w-[18px] h-[18px] rounded-[3px] bg-[#DC520A] text-white flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-black select-none">
                          ✓
                        </span>
                        <p className="text-[12.5px] sm:text-[13.5px] text-[#222222] font-medium leading-relaxed m-0">
                          {feat.desc || feat.title}
                        </p>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="flex items-start gap-3 sm:gap-3.5">
                      <div className="relative w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5">
                        <Image
                          src={feat.icon || "/assets/all_universities_images/ggu/learning-outcone-icon.webp"}
                          alt="Icon"
                          fill
                          className="object-contain"
                          sizes="24px"
                        />
                      </div>
                      <div>
                        {feat.title && (
                          <h4 className="text-[14.5px] sm:text-[15.5px] font-bold text-slate-900 leading-tight m-0 mb-1">
                            {feat.title}
                          </h4>
                        )}
                        <p className="text-[12px] sm:text-[13px] text-slate-600 leading-relaxed font-normal m-0">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className="inline-flex items-center justify-center font-bold text-[14px] px-7 py-2.5 rounded-[6px] shadow-xs active:scale-95 transition-all cursor-pointer border-none"
                  style={{ backgroundColor: btnBg, color: btnTextColor }}
                >
                  <span>{buttonText}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
