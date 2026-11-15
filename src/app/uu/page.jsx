import React from "react";
import UuLandingView from "@/components/landing/universities/uu/UuLandingView";

export const metadata = {
  title: "Uttaranchal University Online Courses | Online MBA, MCA, UG, & PG Degree",
  description:
    "Uttaranchal University Online Courses. Online MBA, MCA, UG, PG Degree and Distance Courses. View Sample Degree & Online Admission Process. Online UU NAAC A+, AICTE-approved, & AIU. Live lectures, anytime learning, & placements support for students.",
  keywords: [
    "Uttaranchal University Online",
    "Uttaranchal Online University",
    "Online Uttaranchal University",
    "Uttaranchal University Online Courses",
    "Uttaranchal University Online Degree",
    "Uttaranchal University Online Admission",
    "Uttaranchal University Online MBA",
    "Uttaranchal Online MBA",
    "Uttaranchal University MBA Online",
    "Online MBA From Uttaranchal University",
  ],
  alternates: {
    canonical: "https://distanceeducationschool.com/uu/",
  },
  openGraph: {
    title: "Uttaranchal University Online Courses | Online MBA, MCA, UG, & PG Degree",
    description:
      "Uttaranchal University Online Courses. Online MBA, MCA, UG, PG Degree and Distance Courses. View Sample Degree & Online Admission Process. Online UU NAAC A+, AICTE-approved, & AIU. Live lectures, anytime learning, & placements support for students.",
    url: "https://distanceeducationschool.com/uu/",
    siteName: "Distance Education School",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uttaranchal University Online Courses | Online MBA, MCA, UG, & PG Degree",
    description:
      "Uttaranchal University Online Courses. Online MBA, MCA, UG, PG Degree and Distance Courses. View Sample Degree & Online Admission Process. Online UU NAAC A+, AICTE-approved, & AIU. Live lectures, anytime learning, & placements support for students.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function UuPage() {
  return <UuLandingView />;
}

