"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const FOOTER_UNIVERSITIES = [
  "Online Manipal", "Amity University", "Lovely Professional University", "Chandigarh University",
  "DY Patil University", "Vivekananda Global University", "Sharda University", "Shoolini University",
  "Jain University", "UPES University", "Jamia Hamdard University", "Aligarh Muslim University",
  "Centurion University", "KL University", "KIIT University", "Andhra University", "Galgotias University",
];

const FOOTER_DISTANCE_COURSES = [
  "BA Distance Education", "BBA Distance Education", "BCA Distance Education", "BCOM Distance Education",
  "BLIS Distance Education", "BJMC Distance Education", "BSC Distance Education", "MA Distance Education",
  "MBA Distance Education", "MCA Distance Education", "MCOM Distance Education", "MLIS Distance Education",
  "MSC Distance Education", "MJMC Distance Education",
];

const FOOTER_ONLINE_COURSES = [
  "Online LLM Course", "Online MBA Course", "Online MCA Course", "Online MCOM Course", "Online MA Course",
  "Online MSC Course", "Online MJMC Course", "Online BBA Course", "Online BCA Course", "Online BCOM Course",
  "Online BA Course", "Online BSC Course", "Online BJMC Course",
];

const FOOTER_DIPLOMA_COURSES = ["PGP Courses", "Certificate Course"];

const FOOTER_MBA_COURSES = [
  "MBA (General)", "MBA (Finance Management)", "MBA (Human Resource)", "MBA (Marketing)",
  "MBA (Project Management)", "MBA (Operation)", "MBA (IT)", "MBA (Supply Chain)",
  "MBA (International Business)", "MBA (Retail Management)", "MBA (Hospitality Management)",
  "MBA (Hospital Management)", "MBA (Business Analytics)", "MBA (Data Analytics)",
  "MBA (International Finance)", "MBA (Fintech Management)", "MBA (Data Science & Analytics)",
  "MBA (Banking and Finance Management)", "MBA (Human Resource Management)",
];

const SOCIAL_LINKS = [
  { href: "https://facebook.com", label: "Facebook", bg: "hover:bg-[#1877f2]", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { href: "https://instagram.com", label: "Instagram", bg: "hover:bg-[#e4405f]", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { href: "https://linkedin.com", label: "LinkedIn", bg: "hover:bg-[#0077b5]", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
  { href: "https://x.com", label: "X (Twitter)", bg: "hover:bg-black", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { href: "https://youtube.com", label: "YouTube", bg: "hover:bg-[#ff0000]", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { href: "https://pinterest.com", label: "Pinterest", bg: "hover:bg-[#bd081c]", icon: "M12 0a12 12 0 0 0-4.37 23.18c-.06-.98-.12-2.5.02-3.58l.76-3.23s-.19-.38-.19-.94c0-.88.51-1.54 1.15-1.54.54 0 .8.41.8.9 0 .55-.35 1.36-.53 2.12-.15.64.32 1.16.95 1.16 1.14 0 2.02-1.2 2.02-2.94 0-1.54-1.1-2.61-2.69-2.61-1.83 0-2.91 1.38-2.91 2.8 0 .55.21 1.15.48 1.48.05.06.06.12.04.18l-.18.73c-.03.11-.1.14-.2.09-.7-.32-1.13-1.34-1.13-2.16 0-1.76 1.28-3.37 3.69-3.37 1.94 0 3.44 1.38 3.44 3.23 0 1.93-1.21 3.48-2.9 3.48-.57 0-1.1-.29-1.28-.64l-.35 1.34c-.13.49-.47 1.1-.7 1.48A12 12 0 1 0 12 0z" },
];

export default function LandingFooter({
  brand = {},
  disclaimerText,
  onOpenDisclaimer,
  onOpenTerms,
  onOpenPrivacy,
}) {
  const isFullDarkFooter =
    brand.footerVariant === "full" ||
    brand.footerVariant === "des-dark" ||
    brand.footerStyle === "full" ||
    brand.slug === "galgotias";

  const handleScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ==========================================
  // Layout 1: Full Rich Dark DES Footer (e.g. Galgotias)
  // ==========================================
  if (isFullDarkFooter) {
    return (
      <footer className="w-full bg-[#111111] text-[#9ca3af] pt-12 sm:pt-16 pb-0 select-none">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 sm:pb-16 text-left">
            {/* Column 1 */}
            <div>
              <h3 className="text-white text-[15px] sm:text-[16px] font-bold tracking-tight mb-4 m-0">Online & Distance Universities</h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {FOOTER_UNIVERSITIES.map((item, idx) => (
                  <li key={idx} className="flex items-center text-[12.5px] sm:text-[13px]">
                    <span className="text-slate-500 font-bold mr-2 select-none">&gt;</span>
                    <span className="text-[#a0aec0] hover:text-white transition-colors cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-white text-[15px] sm:text-[16px] font-bold tracking-tight mb-4 m-0">Distance Courses</h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {FOOTER_DISTANCE_COURSES.map((item, idx) => (
                  <li key={idx} className="flex items-center text-[12.5px] sm:text-[13px]">
                    <span className="text-slate-500 font-bold mr-2 select-none">&gt;</span>
                    <span className="text-[#a0aec0] hover:text-white transition-colors cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-white text-[15px] sm:text-[16px] font-bold tracking-tight mb-4 m-0">Online Courses</h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {FOOTER_ONLINE_COURSES.map((item, idx) => (
                  <li key={idx} className="flex items-center text-[12.5px] sm:text-[13px]">
                    <span className="text-slate-500 font-bold mr-2 select-none">&gt;</span>
                    <span className="text-[#a0aec0] hover:text-white transition-colors cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-white text-[15px] sm:text-[16px] font-bold tracking-tight mt-7 mb-4 m-0">Online & Distance Diploma Courses</h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {FOOTER_DIPLOMA_COURSES.map((item, idx) => (
                  <li key={idx} className="flex items-center text-[12.5px] sm:text-[13px]">
                    <span className="text-slate-500 font-bold mr-2 select-none">&gt;</span>
                    <span className="text-[#a0aec0] hover:text-white transition-colors cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="text-white text-[15px] sm:text-[16px] font-bold tracking-tight mb-4 m-0">Online & Distance MBA Courses</h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {FOOTER_MBA_COURSES.map((item, idx) => (
                  <li key={idx} className="flex items-center text-[12.5px] sm:text-[13px]">
                    <span className="text-slate-500 font-bold mr-2 select-none">&gt;</span>
                    <span className="text-[#a0aec0] hover:text-white transition-colors cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <div className="bg-white rounded-[6px] p-2.5 px-3.5 shadow-md inline-flex items-center gap-2.5 border border-slate-200">
                  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.43 7.34 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.27 2.57 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <p className="text-[11.5px] font-bold text-slate-900 m-0 leading-none mb-0.5">Google Rating</p>
                    <div className="flex items-center gap-1 my-0.5">
                      <span className="text-[12px] font-bold text-slate-900 leading-none">4.7</span>
                      <div className="flex items-center text-[#f5a623] text-xs leading-none">★★★★★</div>
                    </div>
                    <p className="text-[9.5px] text-slate-500 font-medium m-0 leading-none">Based on 1027 reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center justify-center gap-4 sm:gap-5 pb-6">
            {SOCIAL_LINKS.map((soc, idx) => (
              <a key={idx} href={soc.href} target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-full bg-[#1e2329] ${soc.bg} hover:text-white text-slate-300 flex items-center justify-center transition-colors`} aria-label={soc.label}>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d={soc.icon} /></svg>
              </a>
            ))}
          </div>

          {/* Blue Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[12px] sm:text-[13px] text-[#0088ff] pb-6 font-medium text-center">
            <Link href="/" className="hover:underline text-[#0088ff]">Home</Link>
            <Link href="/about-us" className="hover:underline text-[#0088ff]">About Us</Link>
            <Link href="/blogs" className="hover:underline text-[#0088ff]">Blogs</Link>
            <Link href="/contact-us" className="hover:underline text-[#0088ff]">Contact Us</Link>
            <Link href="/pay-online" className="hover:underline text-[#0088ff]">Pay Online</Link>
            <Link href="/reviews" className="hover:underline text-[#0088ff]">Reviews</Link>
            <button type="button" onClick={() => onOpenDisclaimer?.()} className="hover:underline text-[#0088ff] bg-transparent border-none p-0 cursor-pointer text-[12px] sm:text-[13px] font-medium">Disclaimer</button>
            <Link href="/refund-policy" className="hover:underline text-[#0088ff]">Refund Policy</Link>
            <button type="button" onClick={() => onOpenPrivacy?.()} className="hover:underline text-[#0088ff] bg-transparent border-none p-0 cursor-pointer text-[12px] sm:text-[13px] font-medium">Privacy Policy</button>
            <button type="button" onClick={() => onOpenTerms?.()} className="hover:underline text-[#0088ff] bg-transparent border-none p-0 cursor-pointer text-[12px] sm:text-[13px] font-medium">Terms & Condition</button>
            <Link href="/working-professional-courses" className="hover:underline text-[#0088ff]">Working Professional Courses</Link>
            <Link href="/latest-network-updates" className="hover:underline text-[#0088ff]">Latest Network Updates</Link>
          </div>

          {/* Registered Office Address */}
          <div className="text-center text-[11.5px] sm:text-[12.5px] text-[#6b7280] pb-4 font-normal">
            {brand.footerOfficeAddress || "Registered Office: Unit No. 1, 3rd Floor Vardhman Trade Centre, Nehru Place, New Delhi - 110019"}
          </div>
        </div>

        {/* Dark Navy Copyright Bottom Strip */}
        <div className="w-full bg-[#002b49] text-white py-3 px-6 sm:px-12 md:px-14 border-t border-[#00375e]/60">
          <div className="max-w-[1400px] mx-auto flex justify-center items-center text-center">
            <span className="text-[12px] sm:text-[13px] font-normal tracking-normal text-white">
              &copy; {new Date().getFullYear()} SODE Counseling Services LLP
            </span>
          </div>
        </div>
      </footer>
    );
  }

  // ==========================================
  // Layout 2: Classic Mini Footer (e.g. Amity, LPU, SMU, Manipal, VGU, Shoolini, CU, MU)
  // ==========================================
  const footerText =
    disclaimerText ||
    brand.footerDisclaimer ||
    "SODE Counselling Services LLP act as a marketing agency. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of the University before making decisions.";

  return (
    <footer className="mini-footer bg-[#f6f8fa] text-[#777777] pt-4 sm:pt-6 relative select-none">
      <div className="w-full max-w-full mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
        {/* SODE / Distance Education School Official Full Logo */}
        <div className="footer_sode_logo_container flex justify-center items-center">
          <Link
            href="#hero"
            onClick={handleScrollTop}
            className="inline-block cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
            aria-label="Back to Top"
          >
            <div className="relative w-[360px] sm:w-[600px] md:w-[700px] lg:w-[1200px] h-[110px] sm:h-[180px] md:h-[210px] lg:h-[230px]">
              <Image
                src={brand.footerLogo || brand.desLogo || "/assets/lpu/new-des-logo.webp"}
                alt="Distance Education School - SODE School of Online & Distance Education"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 360px, (max-width: 768px) 600px, 760px"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Agency Disclaimer Text */}
        <div id="footer-bottom-bar" className="mt-2 sm:mt-2.5 px-2 sm:px-6 w-full max-w-[1240px] mx-auto text-center">
          <p className="m-0 text-[11.5px] sm:text-[12.5px] text-[#777777] leading-relaxed font-normal">
            {footerText}
          </p>

          {/* Legal Links */}
          <div className="mt-2.5 sm:mt-3 text-[12px] sm:text-[13px] font-bold text-[#111111] flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => onOpenDisclaimer?.()}
              className="hover:underline hover:text-black cursor-pointer font-bold text-[#111111] border-none bg-transparent p-0 transition-colors"
            >
              Disclaimer
            </button>
            <span className="text-[#888888] font-normal">|</span>
            <button
              type="button"
              onClick={() => onOpenTerms?.()}
              className="hover:underline hover:text-black cursor-pointer font-bold text-[#111111] border-none bg-transparent p-0 transition-colors"
            >
              Terms & Conditions
            </button>
            <span className="text-[#888888] font-normal">|</span>
            <button
              type="button"
              onClick={() => onOpenPrivacy?.()}
              className="hover:underline hover:text-black cursor-pointer font-bold text-[#111111] border-none bg-transparent p-0 transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Dark Navy Copyright Bar */}
      <div
        className="mini-footer-bottom mt-5 sm:mt-6 text-white text-center py-2.5 px-4 text-[13px] sm:text-[14px] pb-20 md:pb-2.5 tracking-wide font-normal"
        style={{ backgroundColor: brand.footerBg || "#010d2a" }}
      >
        © {new Date().getFullYear()} SODE Counseling Services LLP
      </div>
    </footer>
  );
}
