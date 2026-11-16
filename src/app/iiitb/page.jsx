import React from "react";
import IiitbLandingView from "@/components/landing/universities/iiitb/IiitbLandingView";

export const metadata = {
  title: "IIIT Bangalore Online Courses | IIIT Bangalore Online AI Course & PG Programs",
  description:
    "IIIT Bangalore online courses and IIIT Bangalore online PG courses in Data Science, AI, and Machine Learning. Explore IIIT Bangalore online masters, certificate courses, IIIT Bangalore online admission, and IIIT Bangalore online AI course details.",
  keywords: [
    "IIIT Bangalore Online Courses",
    "IIIT Bangalore Data Science",
    "IIIT Bangalore AI Course",
    "IIIT Bangalore PG Programs",
    "IIIT Bangalore Machine Learning",
    "IIITB upGrad Online",
    "IIIT Bangalore Certification",
  ],
  alternates: {
    canonical: "https://distanceeducationschool.com/iiitb/",
  },
  openGraph: {
    title: "IIIT Bangalore Online Courses | IIIT Bangalore Online AI Course & PG Programs",
    description:
      "IIIT Bangalore online courses and IIIT Bangalore online PG courses in Data Science, AI, and Machine Learning. Explore IIIT Bangalore online masters, certificate courses, IIIT Bangalore online admission, and IIIT Bangalore online AI course details.",
    url: "https://distanceeducationschool.com/iiitb/",
    siteName: "Distance Education School",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IIIT Bangalore Online Courses | IIIT Bangalore Online AI Course & PG Programs",
    description:
      "IIIT Bangalore online courses and IIIT Bangalore online PG courses in Data Science, AI, and Machine Learning.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IiitbPage() {
  return <IiitbLandingView />;
}

