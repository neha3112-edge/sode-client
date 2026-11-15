"use client";

import { useEffect, useRef } from "react";

/**
 * Custom hook to automatically open a form/modal once the user scrolls past a certain percentage.
 * Defaults to 45% scroll depth as requested. Triggers only once per page view.
 *
 * @param {Function} onTrigger - Callback function to open the form modal
 * @param {number} targetPercent - Percentage of scroll depth to trigger (default: 45)
 */
export function useAutoScrollForm(onTrigger, targetPercent = 45) {
  const hasTriggeredRef = useRef(false);
  const onTriggerRef = useRef(onTrigger);

  useEffect(() => {
    onTriggerRef.current = onTrigger;
  }, [onTrigger]);

  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggeredRef.current) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (docHeight <= 0) return;

      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= targetPercent) {
        hasTriggeredRef.current = true;
        if (typeof onTriggerRef.current === "function") {
          onTriggerRef.current();
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [targetPercent]);
}

export default useAutoScrollForm;

