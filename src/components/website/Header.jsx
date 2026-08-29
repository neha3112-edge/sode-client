"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { getAssetPath } from "@/lib/utils";
import { useToolWizard } from "@/components/tool/ToolWizardContext";

export function Header({ initialHeaderData = null, siteLogo = null }) {
  const { openTool } = useToolWizard();
  const headerData = initialHeaderData?.result || initialHeaderData || {};
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const resolveImageUrl = (mediaObj, fallback = "/assets/images/new_sode_tm_logo.png") => {
    if (!mediaObj) return fallback;
    if (typeof mediaObj === "string") return mediaObj.startsWith("http") ? mediaObj : getAssetPath(mediaObj, fallback);
    if (mediaObj.url) return mediaObj.url;
    return fallback;
  };

  const logoUrl = resolveImageUrl(headerData?.logo || siteLogo, "/assets/images/new_sode_tm_logo.png");
  const logoAlt = headerData?.logo_alt || "School of Online & Distance Education (SODE)";
  const logoHeight = Number(headerData?.logo_height) || 48;

  // 1. Featured Action Buttons (From DB / API)
  const rawFeaturedButtons = Array.isArray(headerData?.featured_buttons)
    ? headerData.featured_buttons.filter((b) => b.enabled !== false)
    : headerData?.featured_button?.enabled !== false && headerData?.featured_button?.text
    ? [headerData.featured_button]
    : [];

  // 2. Navigation Menu Links (From DB / API)
  const rawMenuItems = Array.isArray(headerData?.menu_items)
    ? headerData.menu_items.filter((item) => item.enabled !== false)
    : [];

  const handleToolClick = (e) => {
    e.preventDefault();
    openTool("suggest-me-a-university", { tool_mode: "Suggest University" });
  };

  const announcement = headerData?.announcement_bar;
  const bgColor = headerData?.bg_color || "#ffffff";
  const textColor = headerData?.text_color || "#072C50";

  return (
    <>
      {/* Optional Top Announcement Bar */}
      {announcement?.enabled && announcement?.text && (
        <div
          style={{ backgroundColor: announcement.bg_color || "#1e2f4d", color: announcement.text_color || "#ffffff" }}
          className="w-full text-center py-1.5 px-4 text-xs font-medium"
        >
          {announcement.url ? (
            <Link href={announcement.url} className="hover:underline">
              {announcement.text}
            </Link>
          ) : (
            <span>{announcement.text}</span>
          )}
        </div>
      )}

      {/* Main Navbar */}
      <header
        style={{ backgroundColor: bgColor }}
        className="w-full bg-white border-b border-slate-100 z-50 relative shadow-2xs"
      >
        <Container className="flex items-center justify-between h-11 sm:h-12 md:h-13">
          
          {/* 1. BRAND LOGO ON THE LEFT */}
          <Link href={headerData?.logo_url || "/"} className="flex items-center group shrink-0">
            <div
              style={{ height: "46px" }}
              className="relative w-32 sm:w-36 md:w-40 flex items-center justify-start transition-transform group-hover:scale-105"
            >
              <Image
                src={logoUrl}
                alt={logoAlt}
                fill
                sizes="(max-width: 768px) 150px, 200px"
                priority
                fetchPriority="high"
                className="object-contain object-left cursor-pointer"
              />
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION MENU ITEMS */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
            {rawMenuItems.map((item, idx) => {
              const isAiTools =
                item.is_highlighted ||
                (item.label && item.label.toLowerCase().includes("ai tool")) ||
                item.badge?.toLowerCase().includes("new");

              // Special Pill for AI Tools with "NEW" Badge
              if (isAiTools) {
                return (
                  <button
                    key={item._id || idx}
                    type="button"
                    onClick={handleToolClick}
                    className="relative inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-100/80 hover:bg-sky-200/80 text-[#0284c7] hover:text-[#0369a1] border border-sky-200/90 font-bold text-xs transition-all duration-200 cursor-pointer shadow-2xs group"
                  >
                    <span className="text-sky-500 font-extrabold text-xs leading-none group-hover:rotate-12 transition-transform">✦</span>
                    <span className="text-slate-800 font-semibold">{item.label || "AI Tools"}</span>
                    {/* Floating NEW Badge */}
                    <span className="absolute -top-1.5 -right-1 px-1 py-0.2 text-[8px] font-black uppercase tracking-wider rounded-full bg-linear-to-r from-amber-400 to-amber-500 text-slate-950 border border-white shadow-2xs leading-none">
                      {item.badge || "NEW"}
                    </span>
                  </button>
                );
              }

              // Standard Menu Items (with Dropdown Support)
              const hasDropdown = item.has_dropdown && Array.isArray(item.dropdown_items) && item.dropdown_items.length > 0;

              return (
                <div
                  key={item._id || idx}
                  className="relative group py-1"
                  onMouseEnter={() => setActiveDropdown(item._id || idx)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.url || "#"}
                    target={item.target || "_self"}
                    style={{ color: textColor }}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#072C50] hover:text-[#996633] transition-colors py-0.5 cursor-pointer tracking-tight"
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <svg
                        className="w-3 h-3 text-slate-500 group-hover:text-[#996633] group-hover:rotate-180 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasDropdown && (
                    <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
                      <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                        {item.dropdown_items.map((sub, sIdx) => (
                          <Link
                            key={sub._id || sIdx}
                            href={sub.url || "#"}
                            className="flex items-center justify-between px-3.5 py-2 hover:bg-amber-50/60 text-slate-800 hover:text-[#072C50] text-xs font-medium transition-colors"
                          >
                            <span>{sub.label}</span>
                            {sub.badge && (
                              <span className="px-1.5 py-0.5 text-[8px] font-bold rounded bg-amber-100 text-amber-900 border border-amber-200">
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* 3. FEATURED CTA BUTTON (Compare Universities) */}
            {rawFeaturedButtons.map((btn, idx) => {
              const isCompare = btn.text && btn.text.toLowerCase().includes("compare");

              return (
                <Link
                  key={btn._id || idx}
                  href={btn.url || "/compare"}
                  style={{
                    background: "linear-gradient(180deg, #F6DE95 0%, #EEC471 100%)",
                    color: "#072C50",
                  }}
                  className="inline-flex items-center justify-center px-4 py-1.5 rounded-md font-bold text-xs sm:text-[13px] shadow-xs hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap border border-[#EEC471]/60"
                >
                  {btn.text || "Compare Universities"}
                </Link>
              );
            })}
          </nav>

          {/* 4. MOBILE HAMBURGER & QUICK ACTIONS */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile AI Tools Pill */}
            <button
              type="button"
              onClick={handleToolClick}
              className="relative inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-100/80 text-sky-800 border border-sky-200 text-xs font-bold shadow-2xs"
            >
              <span className="text-sky-500">✦</span>
              <span>AI Tools</span>
              <span className="absolute -top-1.5 -right-1 px-1 py-0.2 text-[8px] font-black uppercase rounded-full bg-amber-400 text-slate-950 border border-white">
                NEW
              </span>
            </button>

            {/* Mobile Compare Button */}
            {rawFeaturedButtons[0] && (
              <Link
                href={rawFeaturedButtons[0]?.url || "/compare"}
                style={{
                  background: "linear-gradient(180deg, #F6DE95 0%, #EEC471 100%)",
                  color: "#072C50",
                }}
                className="px-3 py-1.5 rounded-md font-bold text-xs shadow-xs border border-[#EEC471]/60"
              >
                {rawFeaturedButtons[0]?.text?.replace(/universities/i, "").trim() || "Compare"}
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </Container>

        {/* MOBILE SLIDE-DOWN DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full bg-white border-t border-slate-100 px-4 py-4 space-y-3 shadow-lg">
            {rawMenuItems.map((item, idx) => (
              <div key={item._id || idx} className="space-y-1">
                <Link
                  href={item.url || "#"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-bold text-sm text-[#072C50] py-1.5"
                >
                  {item.label}
                </Link>
                {item.has_dropdown && item.dropdown_items?.length > 0 && (
                  <div className="pl-3 space-y-1 border-l-2 border-slate-200">
                    {item.dropdown_items.map((sub, sIdx) => (
                      <Link
                        key={sub._id || sIdx}
                        href={sub.url || "#"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs text-slate-600 hover:text-[#072C50] py-1"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

export default Header;