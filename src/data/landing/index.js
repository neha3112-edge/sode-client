import { amityData } from "./amity";
import { lpuData } from "./lpu";
import { muData } from "./mu";
import { manipalData } from "./manipal";
import { cuData } from "./cu";
import { galgotiasData } from "./galgotias";

export const LANDING_REGISTRY = {
  amity: amityData,
  lpu: lpuData,
  mu: muData,
  manipal: manipalData,
  cu: cuData,
  galgotias: galgotiasData,
};

export function getLandingData(slug) {
  if (!slug) return null;
  const key = String(slug).toLowerCase().trim();
  return LANDING_REGISTRY[key] || null;
}

export { amityData, lpuData, muData, manipalData, cuData, galgotiasData };
