// Static H1 and Paragraph metadata for Accreditation Directory Pages
export const ACCREDITATION_STATIC_CONTENT = {
  // 1. UGC-DEB Distance Education Universities
  "ugc-deb-approved-distance-education-universities": {
    title: "UGC-DEB-Approved Distance Education Universities",
    description:
      "Find UGC-DEB-approved universities offering distance education courses across India. Compare universities by state, available programs, and course options to choose one that meets your academic needs. Before applying, check the latest UGC-DEB recognition status of the university and your selected program through official sources.",
  },
  "ugc-deb-approved-distance-universities": {
    title: "UGC-DEB-Approved Distance Education Universities",
    description:
      "Find UGC-DEB-approved universities offering distance education courses across India. Compare universities by state, available programs, and course options to choose one that meets your academic needs. Before applying, check the latest UGC-DEB recognition status of the university and your selected program through official sources.",
  },

  // 2. UGC-DEB Online Universities
  "ugc-deb-approved-online-universities": {
    title: "UGC-DEB-Approved Online Universities",
    description:
      "Find UGC-DEB-approved universities offering online degree programs across India. Compare universities, available courses, and specializations to choose a program that matches your academic interests and career goals. Before applying, check the latest UGC-DEB recognition status of the university and your selected online program through official sources.",
  },

  // 3. NAAC-Accredited Universities
  "naac-accredited-universities": {
    title: "NAAC-Accredited Universities",
    description:
      "Find NAAC-accredited universities in India and compare their accreditation grades. Check which universities offer online and distance education programs, and compare available courses based on your academic interests. Before applying, verify the latest NAAC accreditation status, course details, and applicable program approvals through official university websites.",
  },
  "naac-approved-universities": {
    title: "NAAC-Accredited Universities",
    description:
      "Find NAAC-accredited universities in India and compare their accreditation grades. Check which universities offer online and distance education programs, and compare available courses based on your academic interests. Before applying, verify the latest NAAC accreditation status, course details, and applicable program approvals through official university websites.",
  },
  "naac-approved-online-distance-universities-list": {
    title: "NAAC-Accredited Universities",
    description:
      "Find NAAC-accredited universities in India and compare their accreditation grades. Check which universities offer online and distance education programs, and compare available courses based on your academic interests. Before applying, verify the latest NAAC accreditation status, course details, and applicable program approvals through official university websites.",
  },

  // 4. NIRF-Ranked Universities
  "nirf-ranked-universities": {
    title: "NIRF-Ranked Universities",
    description:
      "Find universities ranked under the National Institutional Ranking Framework (NIRF) in India. Compare universities based on their rankings, academic performance, and different ranking categories to choose one that meets your educational goals. Before applying, check the latest NIRF rankings and university details on the official NIRF website.",
  },
  "nirf-ranked-university-list": {
    title: "NIRF-Ranked Universities",
    description:
      "Find universities ranked under the National Institutional Ranking Framework (NIRF) in India. Compare universities based on their rankings, academic performance, and different ranking categories to choose one that meets your educational goals. Before applying, check the latest NIRF rankings and university details on the official NIRF website.",
  },

  // 5. WES-Recognized Universities
  "wes-recognized-universities": {
    title: "WES-Recognized Universities",
    description:
      "Find information about Indian universities whose degrees and qualifications can be considered for evaluation by World Education Services (WES). Check credential evaluation requirements and whether your university and qualification meet the criteria for higher education or employment abroad. Before applying, verify the latest eligibility requirements directly through the official WES website.",
  },
  "wes-accredited-universities": {
    title: "WES-Recognized Universities",
    description:
      "Find information about Indian universities whose degrees and qualifications can be considered for evaluation by World Education Services (WES). Check credential evaluation requirements and whether your university and qualification meet the criteria for higher education or employment abroad. Before applying, verify the latest eligibility requirements directly through the official WES website.",
  },

  // 6. QS-Ranked Universities
  "qs-ranked-universities": {
    title: "QS-Ranked Universities",
    description:
      "Find Indian universities ranked by QS (Quacquarelli Symonds) and compare their positions in national and global rankings. Check universities based on ranking categories, academic performance, and other available details to find options that match your higher education goals. Before applying, verify the latest QS rankings and university information through official sources.",
  },

  // 7. UGC-Listed Fake Universities
  "ugc-listed-fake-universities": {
    title: "UGC-Listed Fake Universities",
    description:
      "Find universities listed as fake or unauthorized by the University Grants Commission (UGC) in India. Check official UGC notices to identify institutions that are not legally permitted to award degrees. Before applying for admission, verify your chosen university's recognition status and program approval through the official UGC website.",
  },
  "ugc-deb-fake-universities": {
    title: "UGC-Listed Fake Universities",
    description:
      "Find universities listed as fake or unauthorized by the University Grants Commission (UGC) in India. Check official UGC notices to identify institutions that are not legally permitted to award degrees. Before applying for admission, verify your chosen university's recognition status and program approval through the official UGC website.",
  },
  "fake-universities-list": {
    title: "UGC-Listed Fake Universities",
    description:
      "Find universities listed as fake or unauthorized by the University Grants Commission (UGC) in India. Check official UGC notices to identify institutions that are not legally permitted to award degrees. Before applying for admission, verify your chosen university's recognition status and program approval through the official UGC website.",
  },
};

/**
 * Resolves static content by slug or approval identifiers with intelligent fallbacks.
 */
export function getAccreditationHeroContent(slug = "", approval = null) {
  const normSlug = (slug || "").toLowerCase().trim();

  // 1. Direct slug match
  if (normSlug && ACCREDITATION_STATIC_CONTENT[normSlug]) {
    return ACCREDITATION_STATIC_CONTENT[normSlug];
  }

  // 2. Identifier string composed of all possible approval hints
  const candidateKeys = [
    normSlug,
    approval?.slug,
    ...(Array.isArray(approval?.slug) ? approval.slug : []),
    approval?.code,
    approval?.shortName,
    approval?.name,
    approval?.title,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // 3. Keyword-based matching
  if (candidateKeys.includes("fake")) {
    return ACCREDITATION_STATIC_CONTENT["ugc-listed-fake-universities"];
  }

  if (candidateKeys.includes("wes")) {
    return ACCREDITATION_STATIC_CONTENT["wes-recognized-universities"];
  }

  if (candidateKeys.includes("qs")) {
    return ACCREDITATION_STATIC_CONTENT["qs-ranked-universities"];
  }

  if (candidateKeys.includes("nirf")) {
    return ACCREDITATION_STATIC_CONTENT["nirf-ranked-universities"];
  }

  if (candidateKeys.includes("naac")) {
    return ACCREDITATION_STATIC_CONTENT["naac-accredited-universities"];
  }

  // UGC-DEB variants: distance vs online
  if (candidateKeys.includes("distance")) {
    return ACCREDITATION_STATIC_CONTENT["ugc-deb-approved-distance-education-universities"];
  }

  if (candidateKeys.includes("online") && candidateKeys.includes("ugc")) {
    return ACCREDITATION_STATIC_CONTENT["ugc-deb-approved-online-universities"];
  }

  return null;
}
