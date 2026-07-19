import React from "react";

const SITE_URL = "https://sode.co.in";
const SITE_NAME = "SODE";
const SITE_DESCRIPTION =
  "Certifications & Online Degree Courses from top IITs, IIMs & global universities via SODE. Enroll in our MBA, DBA & executive leadership programs.";
const OG_IMAGE = `${SITE_URL}/assets/images/sode-homepage-og-card-image.png`;
const ORGANIZATION_LOGO = `${SITE_URL}/assets/img/sode_header_logo.png`;

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
    streetAddress: "Unit No. 1, 3rd Floor Vardhman Trade Centre, Nehru Place",
    addressLocality: "New Delhi",
    postalCode: "110019",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  sameAs: [
    "https://www.facebook.com/distanceeducationschool/",
    "https://x.com/distance_school",
    "https://www.instagram.com/distanceeducationschool/",
    "https://in.linkedin.com/company/distanceeducationschool",
    "https://www.youtube.com/@distanceeducationschool",
    "https://in.pinterest.com/distanceeducationschoolportal/",
  ],
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
