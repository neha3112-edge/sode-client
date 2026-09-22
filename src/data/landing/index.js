import { amityData } from "./amity";
import { lpuData } from "./lpu";

export const LANDING_REGISTRY = {
  amity: amityData,
  lpu: lpuData,
};

export function getLandingData(slug) {
  if (!slug) return null;
  const key = String(slug).toLowerCase().trim();
  return LANDING_REGISTRY[key] || null;
}

export { amityData, lpuData };
