import React from "react";
import { DEFAULT_SOCIAL_LINKS } from "./footerDefaults";

/**
 * Reusable Social Media Links for Footer
 */
export default function FooterSocialLinks({ socialLinks = DEFAULT_SOCIAL_LINKS }) {
  if (!socialLinks || socialLinks.length === 0) return null;

  return (
    <div className="social-icons flex items-center justify-center gap-3.5 sm:gap-4 mb-2">
      {socialLinks.map((item, idx) => (
        <a
          key={idx}
          href={item.href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          className="text-white hover:text-[#f97316] transition-colors p-1 inline-flex items-center justify-center hover:scale-110 duration-200"
        >
          <span className="flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
            {item.icon}
          </span>
        </a>
      ))}
    </div>
  );
}
