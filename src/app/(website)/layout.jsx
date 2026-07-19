import Script from "next/script";
import JsonLd from "@/components/common/JsonLd";
import GlobalCTA from "@/components/cta/GlobalCTA";

const SITE_NAME = "SODE";
const SITE_URL = "https://sode.co.in";
const SITE_TITLE =
  "SODE | Certifications & Online Degree Courses from IITs, IIMs | DBA & MBA";
const SITE_DESCRIPTION =
  "Certifications & Online Degree Courses from top IITs, IIMs & global universities via SODE. Enroll in our MBA, DBA & executive leadership programs.";
const OG_IMAGE = `${SITE_URL}/assets/images/sode-homepage-og-card-image.png`;
const FAVICON_ICO = "/assets/images/favicon.ico";
const FAVICON_SVG = "/assets/images/favicon.svg";
const FAVICON_96 = "/assets/images/favicon-96x96.png";
const APPLE_TOUCH_ICON = "/assets/images/apple-touch-icon.png";
const WEBMANIFEST = "/assets/images/site.webmanifest";

const GTM_ID = "GTM-567GP8S9";
const GOOGLE_ADS_IDS = ["AW-17917271919", "AW-17946162864"];

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [
    {
      name: "SODE",
      url: SITE_URL,
    },
  ],
  creator: "SODE",
  publisher: "SODE",
  generator: "Next.js",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      /* Browser favicon - classic .ico (IE / older browsers) */
      { url: FAVICON_ICO, type: "image/x-icon" },
      /* Modern browsers prefer SVG for crisp scaling */
      { url: FAVICON_SVG, type: "image/svg+xml" },
      /* Fallback 96px PNG for browsers that don't support SVG favicons */
      { url: FAVICON_96, type: "image/png", sizes: "96x96" },
    ],
    shortcut: FAVICON_ICO,
    /* Apple devices: Safari on iPhone / iPad / macOS */
    apple: [
      { url: APPLE_TOUCH_ICON, sizes: "180x180", type: "image/png" },
    ],
    /* Android Chrome PWA manifest */
    other: [
      { rel: "manifest", url: WEBMANIFEST },
    ],
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title:
      "Certifications & Online Degree Courses from IITs, IIMs | DBA MBA – SODE",
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    locale: "en_IN",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "SODE Certifications and Online Degree Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SODE: Certifications & Online Degree Courses from IITs, IIMs",
    description:
      "Learn from Global & India's Most Prestigious Institutions. This institution offers flexible and accessible executive leadership education for working professionals.",
    images: [OG_IMAGE],
  },
  category: "education",
  other: {
    "content-language": "en-IN",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function WebsiteLayout({ children }) {
  return (
    <>
      {/* Schemas specific to public website */}
      <JsonLd />

      {/* GTM NOSCRIPT */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>

      {children}

      {/* GLOBAL FLOATING SCHOLARSHIP BUTTON & MOBILE BOTTOM CTA */}
      <GlobalCTA />

      {/* GOOGLE TAG MANAGER SCRIPT */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
              });
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />

      {/* GOOGLE ADS SCRIPT LOADER */}
      <Script
        id="google-gtag-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_IDS[1]}`}
        strategy="afterInteractive"
      />

      {/* GOOGLE ADS CONFIGURATION */}
      <Script
        id="google-ads-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            ${GOOGLE_ADS_IDS.map(
              (googleAdsId) => `gtag('config', '${googleAdsId}');`,
            ).join("\n")}
          `,
        }}
      />
    </>
  );
}
