"use client";

import React from "react";
import Image from "next/image";

export default function UpesAbout({ about = {}, brand = {}, onOpenApply }) {
  const title = about.title || "About UPES University";
  const subheading =
    about.subheading ||
    about.tagline ||
    "UPES University Online helps students and working professionals to achieve and enhance their intelligence.";
  const description =
    about.description ||
    about.text ||
    about.text1 ||
    "UPES was founded in 2003 with the goal of offering high-quality education. Offering a variety of undergraduate, postgraduate, and certificate programs in business, engineering, technology, law, and other fields, UPES University Online is one of India's leading universities of online education. UPES University is positioned 36th in the NIRF Ranking and 5th in the World University Ranking 2026. UPES University Online is an ideal option for professionals and students who want to continue their education while maintaining both their private and professional lives.";

  return (
    <section id="about" className="scroll-mt-16">
      <div className="relative z-10 max-w-[1080px] mx-auto px-4 sm:px-6 text-center">
        <h2>{title}</h2>
        <div className="about-sub-h">
          {subheading}
        </div>
        <p className="about-text">
          {description}
        </p>
        <button
          type="button"
          className="green-btn-university about-btn"
          onClick={() => onOpenApply?.()}
        >
          {about.buttonText || "Apply Now →"}
        </button>
      </div>

      {/* Full-width Campus Image for Mobile only (Desktop uses background-image on #about) */}
      <div className="about-image-wrapper relative w-full overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-16 sm:h-20 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.75) 40%, transparent 100%)",
          }}
        />
        <div className="relative w-full about-image-inner-mobile aspect-[16/10] sm:aspect-[16/9]">
          <Image
            src="/assets/all_universities_images/upes/upes-university-mobile-img.webp"
            alt={title}
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}

