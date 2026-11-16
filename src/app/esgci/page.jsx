import React from "react";
import EsgciLandingView from "@/components/landing/universities/esgci/EsgciLandingView";

export const metadata = {
  title: "ESGCI Online DBA | ESCGI DBA Program | Doctor of Business Administration Online",
  description:
    "ESGCI Online DBA program. Doctor of Business Administration online from ESGCI Paris with 36-month duration. ESGCI DBA program eligibility, fees, admission process, and globally recognized online DBA degree.",
  keywords: [
    "ESGCI Online DBA",
    "ESGCI DBA Program",
    "Doctor of Business Administration Online",
    "ESGCI Paris Online",
    "Online DBA Degree",
    "upGrad ESGCI DBA",
  ],
  alternates: {
    canonical: "https://distanceeducationschool.com/esgci/",
  },
  openGraph: {
    title: "ESGCI Online DBA | Doctor of Business Administration Online",
    description:
      "ESGCI Online DBA program. 36-month internationally recognized doctorate in business administration from ESGCI Paris via upGrad.",
    url: "https://distanceeducationschool.com/esgci/",
    siteName: "Distance Education School",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ESGCI Online DBA | ESCGI DBA Program",
    description:
      "ESGCI Online DBA program. Doctor of Business Administration online from ESGCI Paris with 36-month duration.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EsgciPage() {
  return <EsgciLandingView />;
}

