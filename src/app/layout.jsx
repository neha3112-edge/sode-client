import { Montserrat } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import Script from "next/script";
import "./globals.css";
import StoreProvider from "./storeProvider";
import { CompareProvider } from "@/context/CompareContext";
import CompareDrawerWidget from "@/components/website/CompareDrawerWidget";
import JsonLd from "@/components/common/JsonLd";
import GlobalCTA from "@/components/cta/GlobalCTA";
import CookieConsent from "@/components/common/CookieConsent";
import { getPageMetaData } from "@/constants/pageMetaData";
import { getSiteSettingData } from "@/constants/siteSettingData";

import { FormModalProvider } from "@/context/FormModalContext";
import AntdMessageBridge from "@/components/layout/AntdMessageBridge";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

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
        { url: siteSetting.faviconIco, type: "image/x-icon" },
        { url: siteSetting.faviconSvg, type: "image/svg+xml" },
        { url: siteSetting.favicon96, type: "image/png", sizes: "96x96" },
      ],
      shortcut: siteSetting.faviconIco,
      apple: [{ url: siteSetting.appleTouchIcon, sizes: "180x180", type: "image/png" }],
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

export default async function RootLayout({ children }) {
  const siteSetting = await getSiteSettingData();
  const gtmId = siteSetting.gtmId || "GTM-567GP8S9";
  const googleAdsIds =
    Array.isArray(siteSetting.googleAdsIds) && siteSetting.googleAdsIds.length > 0
      ? siteSetting.googleAdsIds
      : ["AW-17917271919", "AW-17946162864"];

  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${montserrat.variable} font-sans h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://sode.api.mysode.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://sode.api.mysode.com" />
      </head>
      <body className={`${montserrat.className} min-h-full flex flex-col`} suppressHydrationWarning>
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

        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "var(--font-montserrat), sans-serif",
                colorPrimary: "#1d4ed8",
              },
            }}
          >
          <App>
            <AntdMessageBridge />
            <StoreProvider>
              <FormModalProvider>
                <CompareProvider>
                  <JsonLd />
                  {children}
                  {siteSetting.showGlobalCta !== false && <GlobalCTA />}
                  <CookieConsent />
                  <CompareDrawerWidget />
                </CompareProvider>
              </FormModalProvider>
            </StoreProvider>
          </App>
          </ConfigProvider>
        </AntdRegistry>

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
      </body>
    </html>
  );
}
