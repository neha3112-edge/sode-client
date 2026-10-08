import React from "react";
import { DEFAULT_NAV_LINKS } from "./footerDefaults";

/**
 * Reusable Footer Navigation Links with Semantic Accessibility
 */
export default function FooterNavigation({
  footerLinks,
  onOpenPrivacy,
  onOpenTerms,
}) {
  const links = footerLinks || DEFAULT_NAV_LINKS;

  return (
    <nav
      aria-label="Footer navigation"
      className="footer-links flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-1 mb-1.5 text-[14px] sm:text-[14.5px]"
    >
      {links.map((link, idx) => {
        let handleClick = link.onClick;

        if (!handleClick) {
          if (link.isPrivacy && onOpenPrivacy) {
            handleClick = (e) => {
              e.preventDefault();
              onOpenPrivacy();
            };
          } else if (link.isTerms && onOpenTerms) {
            handleClick = (e) => {
              e.preventDefault();
              onOpenTerms();
            };
          }
        }

        const isAction = Boolean(handleClick);

        return (
          <a
            key={idx}
            href={link.href || "#"}
            onClick={handleClick}
            target={isAction ? undefined : "_blank"}
            rel={isAction ? undefined : "noopener noreferrer"}
            className="text-[#1e90ff] hover:text-[#60a5fa] hover:underline font-normal transition-colors"
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
