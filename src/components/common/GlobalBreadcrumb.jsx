"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "@/components/common/Container";
import { useBreadcrumbState } from "@/context/BreadcrumbContext";

function formatSlug(slug) {
  if (!slug) return "";
  const decoded = decodeURIComponent(slug).trim();
  return decoded
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      // Short terms (<= 3 letters e.g. ba, mba, bca, mca) uppercase, else Title Case
      if (word.length <= 3) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export default function GlobalBreadcrumb() {
  const pathname = usePathname();
  const router = useRouter();
  const custom = useBreadcrumbState();

  // Compute breadcrumbs and back button dynamically
  const { items, backButton } = useMemo(() => {
    // 1. If custom breadcrumbs are provided by active page, use them
    if (custom?.items && custom.items.length > 0) {
      return {
        items: custom.items,
        backButton: custom.backButton || null,
      };
    }

    if (!pathname || pathname === "/") {
      return { items: [], backButton: null };
    }

    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      return { items: [], backButton: null };
    }

    const defaultItems = [{ label: "Home", href: "/" }];
    let accumPath = "";

    segments.forEach((seg, idx) => {
      accumPath += `/${seg}`;
      const isLast = idx === segments.length - 1;
      defaultItems.push({
        label: formatSlug(seg),
        href: isLast ? undefined : accumPath,
      });
    });

    // Dynamic Back button based on route segments
    let defaultBackButton = null;
    if (segments.length === 1) {
      defaultBackButton = { label: "Back to Home", href: "/" };
    } else {
      const parentSeg = segments[0];
      defaultBackButton = {
        label: `Back to ${formatSlug(parentSeg)}`,
        href: `/${parentSeg}`,
      };
    }

    return {
      items: defaultItems,
      backButton: defaultBackButton,
    };
  }, [custom, pathname]);

  // Never render on home page or if explicitly hidden
  if (!pathname || pathname === "/" || custom?.hidden || !items || items.length <= 1) {
    return null;
  }

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <Container className="py-2 sm:py-1.5 flex items-center justify-between gap-2 text-xs text-gray-500">
        {/* Left Side: Breadcrumb Links with Separators */}
        <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden min-w-0 flex-1">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-400 shrink-0">/</span>}
                {isLast || !item.href ? (
                  <span className="text-gray-800 font-semibold truncate">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-blue-600 transition-colors shrink-0"
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right Side: Back Button */}
        {backButton && (
          backButton.href ? (
            <Link
              href={backButton.href}
              className="bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-blue-600 font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md shadow-2xs flex items-center gap-1 sm:gap-1.5 shrink-0 ml-2 sm:ml-4 transition-all text-[11px] sm:text-xs whitespace-nowrap"
            >
              ← {backButton.label}
            </Link>
          ) : (
            <button
              type="button"
              onClick={backButton.onClick || (() => router.back())}
              className="bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-blue-600 font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md shadow-2xs flex items-center gap-1 sm:gap-1.5 shrink-0 ml-2 sm:ml-4 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer"
            >
              ← {backButton.label}
            </button>
          )
        )}
      </Container>
    </div>
  );
}
