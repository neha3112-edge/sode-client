import { upesData } from "./upes";
import { rushfordData } from "./rushford";
import { liverpoolData } from "./liverpool";
import { ssbmData } from "./ssbm";

export const LANDING_REGISTRY = {
  upes: upesData,
  "upes-online": upesData,
  rushford: rushfordData,
  "rushford-business-school": rushfordData,
  "rushford-university": rushfordData,
  "rushford-online": rushfordData,
  liverpool: liverpoolData,
  "liverpool-business-school": liverpoolData,
  "ljmu": liverpoolData,
  "ljmu-online": liverpoolData,
  "liverpool-online": liverpoolData,
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
  upesData,
  rushfordData,
  liverpoolData,
  ssbmData,
};
