"use client";

import confetti from "canvas-confetti";

/**
 * Triggers a premium multi-burst confetti effect when a form/modal opens
 */
export const triggerFormConfetti = (options = {}) => {
  if (typeof window === "undefined") return;

  try {
    // 1. Initial vibrant center burst
    confetti({
      particleCount: options.particleCount || 90,
      spread: options.spread || 80,
      origin: options.origin || { y: 0.5 },
      zIndex: options.zIndex || 99999,
      ticks: 250,
      colors: options.colors || [
        "#ff7a00",
        "#22c55e",
        "#3b82f6",
        "#ec4899",
        "#eab308",
        "#8b5cf6",
      ],
      ...options,
    });

    // 2. Coordinated left & right side cannons
    setTimeout(() => {
      try {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 55,
          origin: { x: 0.1, y: 0.6 },
          zIndex: options.zIndex || 99999,
          ticks: 250,
          colors: ["#22c55e", "#ff7a00", "#3b82f6", "#ec4899", "#a855f7"],
        });
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 55,
          origin: { x: 0.9, y: 0.6 },
          zIndex: options.zIndex || 99999,
          ticks: 250,
          colors: ["#22c55e", "#ff7a00", "#3b82f6", "#ec4899", "#a855f7"],
        });
      } catch (e) {
        // ignore safely
      }
    }, 150);
  } catch (err) {
    console.warn("Canvas confetti error:", err);
  }
};

export default triggerFormConfetti;
