import React from "react";
import { getAssetPath } from "@/lib/utils";

const SITE_URL = "https://sode.co.in";
const SITE_NAME = "SODE";
const SITE_DESCRIPTION =
  "Certifications & Online Degree Courses from top IITs, IIMs & global universities via SODE. Enroll in our MBA, DBA & executive leadership programs.";

const OG_IMAGE = getAssetPath("/assets/images/sode-homepage-og-card-image.png");
const ORGANIZATION_LOGO = getAssetPath("/assets/images/sode-logo.png");

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: [
    "SODE Counseling Services",
    "School of Online & Distance Education",
  ],
  url: `${SITE_URL}/`,
  description: SITE_DESCRIPTION,
  inLanguage: "en-IN",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: "SODE",
  alternateName: "School of Online & Distance Education",
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: ORGANIZATION_LOGO,
  },
  image: OG_IMAGE,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [],
};

export default function JsonLdScript({ data }) {
  if (!data) return null;
  const jsonString = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

