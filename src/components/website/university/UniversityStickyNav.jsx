"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Tabs, ConfigProvider } from "antd";

const cleanLabelFromText = (text = "") => {
  if (!text) return "";
  return text.trim();
};

const formatIdToLabel = (id = "") => {
  if (!id) return "Section";
  return id
    .split("-")
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ""))
    .join(" ");
};

export default function UniversityStickyNav({
  containerId = "university-content-sections",
  sections = null,
}) {
  const containerRef = useRef(null);
  const isManualScrollRef = useRef(false);
  const scrollTimerRef = useRef(null);

  const [detectedSections, setDetectedSections] = useState(() => {
    return Array.isArray(sections) ? sections : [];
  });
  const [activeKey, setActiveKey] = useState(() => {
    return Array.isArray(sections) && sections.length > 0 ? sections[0].id : "";
  });
  const [isVisible, setIsVisible] = useState(false);

  // Dynamic Scanner: Inspects the content container in the DOM to auto-detect any section
  const scanDomSections = useCallback(() => {
    if (typeof document === "undefined") return;

    const targetContainer =
      (containerId ? document.getElementById(containerId) : null) ||
      document.getElementById("university-content-sections") ||
      document.querySelector("main");

    if (!targetContainer) return;

    const candidateNodes = Array.from(
      targetContainer.querySelectorAll(":scope > [id], [data-nav-label], section[id]")
    );

    const extracted = [];
    const seenIds = new Set();

    candidateNodes.forEach((node) => {
      const id = node.id;
      if (!id || seenIds.has(id)) return;

      if (node.tagName === "SCRIPT" || node.tagName === "TEMPLATE") return;

      let label =
        node.getAttribute("data-nav-label") ||
        node.getAttribute("data-title") ||
        node.getAttribute("data-label");

      if (!label) {
        const heading = node.querySelector("h2, h3, h1");
        if (heading && heading.textContent) {
          label = cleanLabelFromText(heading.textContent);
        }
      }

      if (!label) {
        label = formatIdToLabel(id);
      }

      seenIds.add(id);
      extracted.push({ id, label });
    });

    if (extracted.length > 0) {
      setDetectedSections(extracted);
      setActiveKey((prev) => (extracted.some((s) => s.id === prev) ? prev : extracted[0].id));
    }
  }, [containerId]);

  // Scan immediately on mount and observe DOM changes
  useEffect(() => {
    scanDomSections();

    const targetContainer =
      (containerId ? document.getElementById(containerId) : null) ||
      document.getElementById("university-content-sections") ||
      document.querySelector("main");

    if (targetContainer && typeof MutationObserver !== "undefined") {
      const observer = new MutationObserver(() => {
        scanDomSections();
      });
      observer.observe(targetContainer, { childList: true, subtree: false });
      return () => observer.disconnect();
    }
  }, [scanDomSections, containerId]);

  // Click handler to scroll smoothly to section ID
  const handleTabChange = (key) => {
    setActiveKey(key);
    isManualScrollRef.current = true;

    // 🔗 Sync active section ID with browser URL hash
    if (typeof window !== "undefined" && key) {
      if (window.location.hash !== `#${key}`) {
        window.history.replaceState(null, "", `#${key}`);
      }
    }

    const targetEl = document.getElementById(key);
    if (targetEl) {
      const navEl = containerRef.current;
      const navHeight = navEl ? navEl.offsetHeight : 54;
      const rect = targetEl.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = rect.top + scrollTop - navHeight - 16;

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "smooth",
      });
    }

    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 800);
  };

  // Scroll spy to toggle visibility and highlight the section currently in view
  useEffect(() => {
    if (!detectedSections || detectedSections.length === 0) return;

    const handleScroll = () => {
      const firstSecEl = document.getElementById(detectedSections[0]?.id);
      const triggerTop = firstSecEl ? firstSecEl.offsetTop - 120 : 400;
      const shouldShow = window.scrollY >= triggerTop;
      setIsVisible(shouldShow);

      if (isManualScrollRef.current) return;

      const navEl = containerRef.current;
      const navHeight = navEl ? navEl.offsetHeight : 54;
      const scrollPos = window.scrollY + navHeight + 60;

      let currentId = detectedSections[0]?.id;

      for (let i = 0; i < detectedSections.length; i++) {
        const item = detectedSections[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            currentId = item.id;
          }
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120
      ) {
        currentId = detectedSections[detectedSections.length - 1]?.id;
      }

      if (currentId) {
        setActiveKey(currentId);

        // 🔗 Sync URL hash as user scrolls through sections
        if (typeof window !== "undefined" && shouldShow) {
          if (window.location.hash !== `#${currentId}`) {
            window.history.replaceState(null, "", `#${currentId}`);
          }
        }
      }

      // If scrolled back up above the sticky nav, remove the hash
      if (!shouldShow && typeof window !== "undefined") {
        if (window.location.hash) {
          window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
          );
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [detectedSections]);

  // On mount / deep-link: Scroll to section if hash exists in URL
  useEffect(() => {
    if (typeof window === "undefined") return;
    const rawHash = window.location.hash.replace("#", "").trim();
    if (!rawHash) return;

    const targetKey =
      rawHash === "faq" && !document.getElementById("faq") && document.getElementById("faqs")
        ? "faqs"
        : rawHash;

    const timer = setTimeout(() => {
      const targetEl = document.getElementById(targetKey) || document.getElementById(rawHash);
      if (targetEl) {
        handleTabChange(targetKey);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [detectedSections]);

  const tabItems = useMemo(() => {
    return detectedSections.map((sec) => ({
      key: sec.id,
      label: (
        <span className="text-xs sm:text-[13.5px] font-semibold tracking-tight transition-colors">
          {sec.label}
        </span>
      ),
    }));
  }, [detectedSections]);

  if (!detectedSections || detectedSections.length < 2) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/90 shadow-sm transition-all duration-300 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-0 flex items-center">
        {/* Ant Design Tabs Navigation */}
        <div className="grow overflow-x-auto min-w-0">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#0C2B4E",
                colorText: "#475569",
                colorTextHeading: "#0C2B4E",
                fontFamily: "inherit",
              },
              components: {
                Tabs: {
                  horizontalItemGutter: 24,
                  horizontalItemPadding: "13px 4px",
                  itemColor: "#475569",
                  itemHoverColor: "#0C2B4E",
                  itemSelectedColor: "#0C2B4E",
                  inkBarColor: "#0C2B4E",
                  titleFontSize: 13.5,
                },
              },
            }}
          >
            <Tabs
              activeKey={activeKey}
              onChange={handleTabChange}
              items={tabItems}
              tabBarStyle={{
                marginBottom: 0,
                borderBottom: "none",
              }}
              className="university-sticky-nav-tabs [&_.ant-tabs-nav]:mb-0 [&_.ant-tabs-tab]:py-3 [&_.ant-tabs-tab-btn]:font-medium [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:font-bold [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:text-[#0C2B4E] [&_.ant-tabs-ink-bar]:bg-[#0C2B4E]"
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}
