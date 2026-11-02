"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * YouTube / Upgrad Style Top Loading Progress Bar
 * - Triggers immediately on internal link clicks for instant UI feedback
 * - Completes and smoothly fades out on route change (usePathname / useSearchParams)
 * - Zero external dependencies, 100% React 19 & Next.js App Router compatible
 */
export default function TopLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const resetTimerRef = useRef(null);

  const startProgress = useCallback(() => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    if (timerRef.current) clearInterval(timerRef.current);

    setVisible(true);
    setProgress(20);

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 60) return prev + Math.floor(Math.random() * 10) + 5;
        if (prev < 85) return prev + Math.floor(Math.random() * 4) + 1;
        if (prev < 95) return prev + 0.5;
        return prev;
      });
    }, 150);
  }, []);

  const completeProgress = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(100);

    resetTimerRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);
  }, []);

  // Listen for route changes to complete the progress
  useEffect(() => {
    completeProgress();
  }, [pathname, searchParams, completeProgress]);

  // Global click interceptor for instant feedback on Link / anchor clicks
  useEffect(() => {
    const handleClick = (e) => {
      try {
        const target = e.target.closest("a");
        if (!target) return;

        const href = target.getAttribute("href");
        if (!href) return;

        // Ignore hash-only links on the same page (#approvals, #overview, etc.)
        if (href.startsWith("#")) return;

        // Ignore target="_blank", mailto, tel, javascript, etc.
        if (target.target === "_blank" || target.getAttribute("target") === "_blank") return;
        if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;

        // Ignore modifier keys (Cmd/Ctrl click to open in new tab)
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        // Check if internal link
        const isInternal =
          href.startsWith("/") ||
          href.startsWith(window.location.origin);

        if (!isInternal) return;

        const url = new URL(href, window.location.origin);

        // If clicking link to the current exact path and search, skip
        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search &&
          url.hash
        ) {
          return;
        }

        // Start progress bar immediately
        startProgress();
      } catch (err) {
        // Safe fallback
      }
    };

    const handleCustomStart = () => startProgress();
    const handleCustomDone = () => completeProgress();

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("toploader-start", handleCustomStart);
    window.addEventListener("toploader-done", handleCustomDone);

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("toploader-start", handleCustomStart);
      window.removeEventListener("toploader-done", handleCustomDone);
      if (timerRef.current) clearInterval(timerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [startProgress, completeProgress]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9999999,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 200ms ease",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "linear-gradient(90deg, #072C50 0%, #005A9C 45%, #EAA221 80%, #FACC15 100%)",
          boxShadow: "0 0 10px rgba(234, 162, 33, 0.7), 0 0 5px rgba(7, 44, 80, 0.5)",
          borderRadius: "0 2px 2px 0",
          transition: progress === 100 ? "width 200ms ease-out" : "width 250ms ease-out",
          position: "relative",
        }}
      >
        {/* Glowing Yellow Head */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "100px",
            height: "100%",
            boxShadow: "0 0 12px #FACC15, 0 0 6px #EAA221",
            opacity: 1,
            transform: "rotate(3deg) translate(0px, -4px)",
          }}
        />
      </div>
    </div>
  );
}

