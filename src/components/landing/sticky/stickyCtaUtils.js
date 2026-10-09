import confetti from "canvas-confetti";
import { DEFAULT_CONFETTI_COLORS } from "./stickyCtaConfig";

/**
 * Safely triggers confetti animation from a button click event in the browser.
 */
export function triggerGiftConfetti(e, customColors) {
  try {
    if (typeof window !== "undefined") {
      const rect = e?.currentTarget?.getBoundingClientRect();
      const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.9;
      const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.85;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x, y },
        zIndex: 99999,
        colors: customColors || DEFAULT_CONFETTI_COLORS,
      });
    }
  } catch {}
}
