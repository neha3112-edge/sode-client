import React from "react";
import Image from "next/image";
import { DEFAULT_MEDIA_LOGOS } from "./footerDefaults";

/**
 * Reusable Media Publications Strip for Footer
 */
export default function FooterMediaLogos({ mediaLogos = DEFAULT_MEDIA_LOGOS }) {
  if (!mediaLogos || mediaLogos.length === 0) return null;

  return (
    <section className="media-footer-strip bg-[#fafafa] border-t border-[#eeeeee] py-5 px-4 sm:px-6">
      <div className="media-footer-container max-w-[1200px] mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-6 sm:gap-8">
        {mediaLogos.map((logo, idx) => (
          <div
            key={idx}
            className="media-logo flex items-center justify-center flex-1 min-w-[100px] sm:min-w-[120px] max-w-[190px]"
          >
            <Image
              src={logo.src}
              alt={logo.alt || "Media Publication"}
              width={logo.width || 150}
              height={logo.height || 36}
              className="h-7 sm:h-8 md:h-9 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
