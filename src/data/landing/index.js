import { amityData } from "./amity";
import { lpuData } from "./lpu";
import { muData } from "./mu";
import { manipalData } from "./manipal";
import { cuData } from "./cu";
import { galgotiasData } from "./galgotias";
import { smuData } from "./smu";
import { vguData } from "./vgu";
import { shooliniData } from "./shoolini";
import { upesData } from "./upes";
import { gguData } from "./ggu";
import { esgciData } from "./esgci";
import { rushfordData } from "./rushford";
import { liverpoolData } from "./liverpool";
import { edgewoodData } from "./edgewood";
import { uuData } from "./uu";
import { iiitbData } from "./iiitb";
import { ssbmData } from "./ssbm";

export const LANDING_REGISTRY = {
  amity: amityData,
  lpu: lpuData,
  mu: muData,
  mangalayatan: muData,
  "mangalayatan-university": muData,
  manipal: manipalData,
  cu: cuData,
  galgotias: galgotiasData,
  smu: smuData,
  vgu: vguData,
  "sikkim-manipal-university": smuData,
  "sikkim-manipal": smuData,
  shoolini: shooliniData,
  upes: upesData,
  "upes-online": upesData,
  ggu: gguData,
  "golden-gate": gguData,
  "golden-gate-university": gguData,
  esgci: esgciData,
  "esgci-paris": esgciData,
  "esgci-online": esgciData,
  rushford: rushfordData,
  "rushford-business-school": rushfordData,
  "rushford-university": rushfordData,
  "rushford-online": rushfordData,
  liverpool: liverpoolData,
  "liverpool-business-school": liverpoolData,
  "ljmu": liverpoolData,
  "ljmu-online": liverpoolData,
  "liverpool-online": liverpoolData,
  edgewood: edgewoodData,
  "edgewood-university": edgewoodData,
  "edgewood-online": edgewoodData,
  "edgewood-college": edgewoodData,
  uu: uuData,
  "uu-online": uuData,
  uttaranchal: uuData,
  "uttaranchal-university": uuData,
  "uttaranchal-university-online": uuData,
  iiitb: iiitbData,
  "iiit-bangalore": iiitbData,
  "iiit-b": iiitbData,
  "iiitb-online": iiitbData,
  ssbm: ssbmData,
  "ssbm-geneva": ssbmData,
  "ssbm-online": ssbmData,
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
  vguData,
  shooliniData,
  upesData,
  gguData,
  esgciData,
  rushfordData,
  liverpoolData,
  edgewoodData,
  uuData,
  iiitbData,
  ssbmData,
};
