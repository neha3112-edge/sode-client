import React from "react";
import EdgewoodLandingView from "@/components/landing/universities/edgewood/EdgewoodLandingView";

export const metadata = {
  title: "Edgewood College DBA upGrad | Edgewood University Online DBA & MBA Programs",
  description:
    "Edgewood College DBA upGrad program. Edgewood University online DBA and Edgewood College online MBA with specializations in Finance and Leadership. Explore Edgewood University upGrad, eligibility, duration, and admission details.",
  keywords: [
    "Edgewood University Online DBA",
    "Edgewood College DBA upGrad",
    "Online DBA Programs",
    "Edgewood University MBA",
    "DBA in Finance",
    "DBA in Leadership",
    "Edgewood upGrad",
  ],
  alternates: {
    canonical: "https://distanceeducationschool.com/edgewood/",
  },
  openGraph: {
    title: "Edgewood University Online DBA | Edgewood College DBA upGrad",
    description:
      "Edgewood University Online DBA and MBA+DBA programs. HLC-accredited, ACBSP-approved, PwC certified. 24-month program.",
    url: "https://distanceeducationschool.com/edgewood/",
    siteName: "Distance Education School",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edgewood College DBA upGrad | Edgewood University Online DBA & MBA Programs",
    description:
      "Edgewood College DBA upGrad program. Edgewood University online DBA and Edgewood College online MBA with specializations in Finance and Leadership.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EdgewoodPage() {
  return <EdgewoodLandingView />;
}

