import { amityData } from "./amity";
import { lpuData } from "./lpu";
import { muData } from "./mu";
import { manipalData } from "./manipal";
import { cuData } from "./cu";
import { galgotiasData } from "./galgotias";
import { smuData } from "./smu";

export const LANDING_REGISTRY = {
  amity: amityData,
  lpu: lpuData,
  mu: muData,
  manipal: manipalData,
  cu: cuData,
  galgotias: galgotiasData,
  smu: smuData,
  "sikkim-manipal-university": smuData,
  "sikkim-manipal": smuData,
};

export function getLandingData(slug) {
  if (!slug) return null;
  const key = String(slug).toLowerCase().trim();
  return LANDING_REGISTRY[key] || null;
}

export {
  amityData,
  lpuData,
  muData,
  manipalData,
  cuData,
  galgotiasData,
  smuData,
};

