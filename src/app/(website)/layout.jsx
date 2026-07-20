import Script from "next/script";
import JsonLd from "@/components/common/JsonLd";
import GlobalCTA from "@/components/cta/GlobalCTA";
import { getPageMetaData } from "@/constants/pageMetaData";
import { getSiteSettingData } from "@/constants/siteSettingData";

export async function generateMetadata() {
  const siteSetting = await getSiteSettingData();
  const pageMeta = await getPageMetaData("/");

  const siteName = siteSetting.siteName || "SODE";
  const siteUrl = siteSetting.siteUrl || "https://sode.co.in";
  const ogImage = siteSetting.ogImage || pageMeta.ogImage;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: pageMeta.title,
      template: `%s | ${siteName}`,
    },
    description: pageMeta.description,
    keywords: pageMeta.keywords,
    applicationName: siteName,
    authors: [
      {
        name: siteName,
        url: siteUrl,
      },
    ],
    creator: siteName,
    publisher: siteName,
    generator: "Next.js",
    alternates: {
      canonical: pageMeta.canonicalUrl || "/",
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
        { url: siteSetting.faviconIco, type: "image/x-icon" },
        /* Modern browsers prefer SVG for crisp scaling */
        { url: siteSetting.faviconSvg, type: "image/svg+xml" },
        /* Fallback 96px PNG for browsers that don't support SVG favicons */
        { url: siteSetting.favicon96, type: "image/png", sizes: "96x96" },
      ],
      shortcut: siteSetting.faviconIco,
      /* Apple devices: Safari on iPhone / iPad / macOS */
      apple: [{ url: siteSetting.appleTouchIcon, sizes: "180x180", type: "image/png" }],
      /* Android Chrome PWA manifest */
      other: [{ rel: "manifest", url: siteSetting.webmanifest }],
    },
    openGraph: {
      type: "website",
      siteName: siteName,
      title: pageMeta.ogTitle || pageMeta.title,
      description: pageMeta.ogDescription || pageMeta.description,
      url: `${siteUrl}/`,
      locale: "en_IN",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteName} Certifications and Online Degree Courses`,
        },
      ],
    },
    twitter: {
      card: pageMeta.twitterCard || "summary_large_image",
      title: pageMeta.ogTitle || pageMeta.title,
      description: pageMeta.ogDescription || pageMeta.description,
      images: [ogImage],
    },
    category: "education",
    other: {
      "content-language": "en-IN",
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function WebsiteLayout({ children }) {
  const siteSetting = await getSiteSettingData();

  const gtmId = siteSetting.gtmId || "GTM-567GP8S9";
  const googleAdsIds = Array.isArray(siteSetting.googleAdsIds) && siteSetting.googleAdsIds.length > 0
    ? siteSetting.googleAdsIds
    : ["AW-17917271919", "AW-17946162864"];

  return (
    <>
      {/* Schemas specific to public website */}
      <JsonLd />

      {/* GTM NOSCRIPT */}
      {gtmId && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
      )}

      {children}

      {/* GLOBAL FLOATING SCHOLARSHIP BUTTON & MOBILE BOTTOM CTA */}
      {siteSetting.showGlobalCta !== false && <GlobalCTA />}

      {/* GOOGLE TAG MANAGER SCRIPT */}
      {gtmId && (
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
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}

      {/* GOOGLE ADS SCRIPT LOADER */}
      {googleAdsIds.length > 0 && (
        <Script
          id="google-gtag-loader"
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsIds[0]}`}
          strategy="afterInteractive"
        />
      )}

      {/* GOOGLE ADS CONFIGURATION */}
      {googleAdsIds.length > 0 && (
        <Script
          id="google-ads-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());
              ${googleAdsIds
                .map((googleAdsId) => `gtag('config', '${googleAdsId}');`)
                .join("\n")}
            `,
          }}
        />
      )}
    </>
  );
}
