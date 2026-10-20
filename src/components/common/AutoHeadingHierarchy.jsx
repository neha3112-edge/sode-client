"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * AutoHeadingHierarchy
 * 
 * Automatically enforces 100% SEO-compliant heading hierarchy across the entire website:
 * 1. Single H1 Rule: Ensures exactly ONE H1 tag per page (first main title).
 *    Subsequent H1 tags are safely converted to H2.
 * 2. No Skipped Heading Levels: Fixes gaps (e.g., H1 followed directly by H4 is normalized to H1 -> H2).
 * 3. Header/Nav Isolation: Converts non-content headings in <header>/<nav> into styled <div> elements
 *    so they don't break the document outline or trigger "Heading before H1" warnings.
 * 4. Preserves 100% Visual Design: Copies all Tailwind classes, styles, IDs, and attributes.
 * 5. Zero Speed Impact: Scheduled via requestIdleCallback when main thread is idle.
 */
export default function AutoHeadingHierarchy() {
  const pathname = usePathname();

  useEffect(() => {
    function replaceTag(el, newTagName) {
      if (!el || !el.parentNode) return el;
      if (el.tagName.toLowerCase() === newTagName.toLowerCase()) return el;

      const newEl = document.createElement(newTagName);

      // Copy all attributes (classes, styles, IDs, etc.)
      for (let i = 0; i < el.attributes.length; i++) {
        const attr = el.attributes[i];
        newEl.setAttribute(attr.name, attr.value);
      }
      newEl.setAttribute("data-seo-normalized", "true");

      // Move all child nodes
      while (el.firstChild) {
        newEl.appendChild(el.firstChild);
      }

      el.parentNode.replaceChild(newEl, el);
      return newEl;
    }

    function normalizeHeadings() {
      // 1. Normalize headings inside <header> or <nav> so they don't appear out-of-order before main H1
      const navHeadings = document.querySelectorAll(
        "header h1, header h2, header h3, header h4, header h5, header h6, " +
        "nav h1, nav h2, nav h3, nav h4, nav h5, nav h6"
      );
      navHeadings.forEach((h) => {
        if (!h.getAttribute("data-seo-normalized")) {
          const div = replaceTag(h, "div");
          div.setAttribute("role", "heading");
          div.setAttribute("aria-level", "6");
        }
      });

      // 2. Query all remaining page headings in document order
      const allHeadings = Array.from(
        document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      ).filter((h) => {
        // Exclude hidden elements or modals not currently open
        if (h.closest("header, nav, [role='dialog']:not(.ant-modal)")) return false;
        const text = (h.textContent || "").trim();
        return text.length > 0 || h.querySelector("img, svg");
      });

      if (allHeadings.length === 0) return;

      let hasH1 = false;
      let previousLevel = 0;

      allHeadings.forEach((heading, idx) => {
        let currentLevel = parseInt(heading.tagName.charAt(1), 10);
        let targetLevel = currentLevel;

        if (!hasH1) {
          // The very first heading on the page should be H1
          targetLevel = 1;
          hasH1 = true;
          previousLevel = 1;
        } else {
          // Multiple H1s are demoted to H2
          if (targetLevel === 1) {
            targetLevel = 2;
          }

          // Enforce hierarchy invariant: cannot skip levels downwards
          // Valid: targetLevel <= previousLevel + 1
          if (targetLevel > previousLevel + 1) {
            targetLevel = previousLevel + 1;
          }

          // Bound within H2 - H6
          targetLevel = Math.max(2, Math.min(6, targetLevel));
          previousLevel = targetLevel;
        }

        if (currentLevel !== targetLevel) {
          replaceTag(heading, `h${targetLevel}`);
        }
      });
    }

    // Schedule normalization during browser idle time (0ms Total Blocking Time)
    const runIdle = typeof window !== "undefined" && "requestIdleCallback" in window
      ? window.requestIdleCallback
      : (cb) => setTimeout(cb, 50);

    const idleId = runIdle(() => {
      normalizeHeadings();
    });

    // Throttled observer for dynamically rendered page content (e.g., SWR, accordion tabs)
    let timer = null;
    const observer = new MutationObserver(() => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        normalizeHeadings();
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (timer) clearTimeout(timer);
      if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
