import { lpuData } from "./lpu";
import { muData } from "./mu";
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
import { iimData } from "./iim";
import { uuData } from "./uu";
import { iiitbData } from "./iiitb";
import { ssbmData } from "./ssbm";

export const LANDING_REGISTRY = {
  lpu: lpuData,
  mu: muData,
  mangalayatan: muData,
  "mangalayatan-university": muData,
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
  iim: iimData,
  "iim-kozhikode": iimData,
  "iim-hr": iimData,
  iimk: iimData,
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

export const LANDING_SOURCE_MAP = {
  amity: "Amity",
  lpu: "LPU",
  upes: "UPES",
  "upes-online": "UPES",
  galgotias: "Galgotias",
  manipal: "Manipal",
  smu: "SMU",
  "sikkim-manipal": "SMU",
  "sikkim-manipal-university": "SMU",
  vgu: "VGU",
  shoolini: "Shoolini",
  uu: "UU",
  "uu-online": "UU",
  uttaranchal: "UU",
  "uttaranchal-university": "UU",
  "uttaranchal-university-online": "UU",
  cu: "CU LP",
  mu: "Mang LP",
  mangalayatan: "Mang LP",
  "mangalayatan-university": "Mang LP",
  liverpool: "Liverpool LP",
  "liverpool-business-school": "Liverpool LP",
  ljmu: "Liverpool LP",
  "ljmu-online": "Liverpool LP",
  "liverpool-online": "Liverpool LP",
  iiitb: "IIITB LP",
  "iiit-bangalore": "IIITB LP",
  "iiit-b": "IIITB LP",
  "iiitb-online": "IIITB LP",
  ssbm: "SSBM LP",
  "ssbm-geneva": "SSBM LP",
  "ssbm-online": "SSBM LP",
  ggu: "GGU LP",
  "golden-gate": "GGU LP",
  "golden-gate-university": "GGU LP",
  esgci: "ESGCI LP",
  "esgci-paris": "ESGCI LP",
  "esgci-online": "ESGCI LP",
  rushford: "Rushford LP",
  "rushford-business-school": "Rushford LP",
  "rushford-university": "Rushford LP",
  "rushford-online": "Rushford LP",
  edgewood: "Edgewood LP",
  "edgewood-university": "Edgewood LP",
  "edgewood-online": "Edgewood LP",
  "edgewood-college": "Edgewood LP",
  iim: "IIM LP",
  "iim-kozhikode": "IIM LP",
  "iim-hr": "IIM LP",
  iimk: "IIM LP",
};

export function getLandingData(slug) {
  if (!slug) return null;
  const key = String(slug).toLowerCase().trim();
  const data = LANDING_REGISTRY[key] || null;
  if (!data) return null;
  const sourceName =
    LANDING_SOURCE_MAP[key] ||
    data.brand?.source ||
    data.brand?.shortName ||
    data.brand?.name ||
    "SODE";
  return {
    ...data,
    brand: {
      ...data.brand,
      source: data.brand?.source || sourceName,
    },
  };
}

export {
  lpuData,
  muData,
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
  iimData,
  uuData,
  iiitbData,
  ssbmData,
};
