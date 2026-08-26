"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { getAssetPath } from "@/lib/utils";
import { useToolWizard } from "@/components/tool/ToolWizardContext";

export function Header({ initialHeaderData = null, siteLogo = null }) {
  const { openTool } = useToolWizard();
  const headerData = initialHeaderData?.result || initialHeaderData || {};

  const resolveImageUrl = (mediaObj, fallback = "/assets/images/new_sode_tm_logo.png") => {
    if (!mediaObj) return fallback;
    if (typeof mediaObj === "string") return mediaObj.startsWith("http") ? mediaObj : getAssetPath(mediaObj, fallback);
    if (mediaObj.url) return mediaObj.url;
    return fallback;
  };

  const logoUrl = resolveImageUrl(headerData?.logo || siteLogo, "/assets/images/new_sode_tm_logo.png");
  const logoAlt = headerData?.logo_alt || "School of Online & Distance Education (SODE)";
  const logoHeight = Number(headerData?.logo_height) || 60;

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

  // Helper for Button Variant Classes (Solid Yellow BG & Solid Blue BG)
  const getButtonVariantClasses = (variant = "outline", text = "", index = 0) => {
    const l = (text || "").toLowerCase();

    // 🟡 Solid Yellow / Gold Filled Background
    if (variant === "gold" || variant === "yellow" || variant === "solid_yellow" || variant === "outline_yellow" || l.includes("suggest") || index === 0) {
      return "bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 border border-amber-400";
    }

    // 🔵 Solid Deep SODE Navy Blue Filled Background (Matching the image)
    if (variant === "blue" || variant === "navy" || variant === "solid_blue" || variant === "gradient" || variant === "outline_blue" || l.includes("compar") || index === 1) {
      return "bg-[#1e2f4d] hover:bg-[#16243c] text-white font-bold shadow-md shadow-slate-900/15 border border-[#1e2f4d]";
    }

    if (variant === "solid") {
      return "bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/15 border border-slate-900";
    }
    if (variant === "ghost") {
      return "bg-slate-100/70 hover:bg-slate-200/80 text-slate-800 border border-transparent";
    }

    return "bg-slate-50/90 hover:bg-white text-slate-800 hover:text-blue-600 border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md";
  };

  // 🔀 Unified Navigation Array Sorted By Order Number
  const allNavElements = [];

  rawFeaturedButtons.forEach((btn, idx) => {
    allNavElements.push({
      type: "featured_button",
      id: btn._id || `feat-btn-${idx}`,
      order: btn.order !== undefined ? Number(btn.order) : idx,
      data: btn,
      index: idx,
    });
  });

  rawMenuItems.forEach((item, idx) => {
    allNavElements.push({
      type: "menu_item",
      id: item._id || `item-${idx}`,
      order: item.order !== undefined ? Number(item.order) : idx + 10,
      data: item,
      index: idx,
    });
  });

  allNavElements.sort((a, b) => a.order - b.order);

  const announcement = headerData?.announcement_bar;
  const isSticky = false; // Non-sticky, scrolls with page
  const bgColor = headerData?.bg_color || "#ffffff";
  const textColor = headerData?.text_color || "#1e293b";

  return (
    <>
      {/* Optional Top Announcement Bar */}
      {announcement?.enabled && announcement?.text && (
        <div
          style={{ backgroundColor: announcement.bg_color || "#1e2f4d", color: announcement.text_color || "#ffffff" }}
          className="w-full text-center py-2 px-4 text-xs sm:text-sm font-medium"
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
        className="w-full border-b border-slate-100/80 z-40 relative"
      >
        <Container className="flex items-center justify-between h-16">
          {/* 1. BRAND LOGO ON THE LEFT */}
          <Link href={headerData?.logo_url || "/"} className="flex items-center group">
            <div
              style={{ height: `${Math.min(logoHeight || 50, 50)}px` }}
              className="relative w-24 sm:w-28 md:w-32 flex items-center justify-start transition-transform group-hover:scale-105"
            >
              <Image
                src={logoUrl}
                alt={logoAlt}
                fill
                sizes="(max-width: 768px) 140px, 180px"
                priority
                fetchPriority="high"
                className="object-contain object-left cursor-pointer"
              />
            </div>
          </Link>

          {/* 2. MOBILE BUTTONS (SUGGEST UNIVERSITY / COURSE) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {allNavElements
              .filter((el) => el.type === "featured_button")
              .map((el) => {
                const btn = el.data;
                const iconUrl =
                  btn.icon?.url ||
                  (typeof btn.icon === "string" && btn.icon.startsWith("http")
                    ? btn.icon
                    : null);
                const variantClasses = getButtonVariantClasses(
                  btn.variant || "outline",
                  btn.text,
                  el.index
                );
                const isDarkBg =
                  variantClasses.includes("bg-[#1e2f4d]") ||
                  variantClasses.includes("bg-slate-900");

                const isToolButton =
                  (btn.text &&
                    (btn.text.toLowerCase().includes("suggest") ||
                      btn.text.toLowerCase().includes("advisor"))) ||
                  (btn.url && btn.url.includes("suggest")) ||
                  btn.category?.slug?.includes("suggest");

                const handleButtonClick = (e) => {
                  if (isToolButton) {
                    e.preventDefault();
                    const mode = btn.text?.toLowerCase().includes("course")
                      ? "Suggest Course"
                      : "Suggest University";
                    openTool("suggest-me-a-university", { tool_mode: mode });
                  }
                };

                return (
                  <Link
                    key={`mobile_${el.id}`}
                    href={btn?.url || "#"}
                    onClick={handleButtonClick}
                    className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-xs whitespace-nowrap ${variantClasses}`}
                  >
                    {iconUrl && (
                      <span className="relative w-3.5 h-3.5 flex items-center justify-center shrink-0">
                        <Image
                          src={iconUrl}
                          alt={btn.text || "Icon"}
                          width={14}
                          height={14}
                          className={`object-contain ${
                            isDarkBg ? "brightness-0 invert" : "brightness-0"
                          }`}
                          unoptimized
                        />
                      </span>
                    )}
                    <span>{btn?.text}</span>
                  </Link>
                );
              })}
          </div>

          {/* 3. DESKTOP NAVIGATION BUTTON PILLS & LINKS */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-4">
            {allNavElements.map((el) => {
              if (el.type === "featured_button") {
                const btn = el.data;
                const iconUrl = btn.icon?.url || (typeof btn.icon === "string" && btn.icon.startsWith("http") ? btn.icon : null);
                const variantClasses = getButtonVariantClasses(btn.variant || "outline", btn.text, el.index);
                const isDarkBg = variantClasses.includes("bg-[#1e2f4d]") || variantClasses.includes("bg-slate-900");

                const isToolButton =
                  (btn.text && (btn.text.toLowerCase().includes("suggest") || btn.text.toLowerCase().includes("advisor"))) ||
                  (btn.url && btn.url.includes("suggest")) ||
                  btn.category?.slug?.includes("suggest");

                const handleButtonClick = (e) => {
                  if (isToolButton) {
                    e.preventDefault();
                    const mode = btn.text?.toLowerCase().includes("course")
                      ? "Suggest Course"
                      : "Suggest University";
                    openTool("suggest-me-a-university", { tool_mode: mode });
                  }
                };

                return (
                  <Link
                    key={el.id}
                    href={btn?.url || "#"}
                    onClick={handleButtonClick}
                    className={`inline-flex items-center gap-2 px-4.5 py-2 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer ${variantClasses}`}
                  >
                    {iconUrl && (
                      <span className="relative w-4 h-4 flex items-center justify-center shrink-0">
                        <Image
                          src={iconUrl}
                          alt={btn.text || "Icon"}
                          width={16}
                          height={16}
                          className={`object-contain ${isDarkBg ? "brightness-0 invert" : "brightness-0"}`}
                          unoptimized
                        />
                      </span>
                    )}
                    <span>{btn?.text}</span>
                  </Link>
                );
              }

              const item = el.data;
              const iconUrl = item.icon?.url;

              return (
                <Link
                  key={el.id}
                  href={item.url || "#"}
                  target={item.target || "_self"}
                  style={{ color: textColor }}
                  className="text-sm font-semibold hover:text-blue-600 transition-colors relative py-1 px-2 flex items-center gap-2"
                >
                  {iconUrl && (
                    <span className="relative w-4 h-4 flex items-center justify-center shrink-0">
                      <Image
                        src={iconUrl}
                        alt={item.label || "Icon"}
                        width={16}
                        height={16}
                        className="object-contain"
                        unoptimized
                      />
                    </span>
                  )}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white leading-none">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;