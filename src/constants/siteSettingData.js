import { API_BASE_URL } from "@/config";

const SITE_NAME = "SODE";
const SITE_URL = "https://sode.co.in";

const DEFAULT_SITE_SETTING = {
  settingKey: "default_site_setting",
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  gtmId: "GTM-567GP8S9",
  googleAdsIds: ["AW-17917271919", "AW-17946162864"],
  faviconIco: "/assets/images/favicon.ico",
  faviconSvg: "/assets/images/favicon.svg",
  favicon96: "/assets/images/favicon-96x96.png",
  appleTouchIcon: "/assets/images/apple-touch-icon.png",
  webmanifest: "/assets/images/site.webmanifest",
  ogImage: `${SITE_URL}/assets/images/sode-homepage-og-card-image.png`,
  showGlobalCta: true,
  headerScript: null,
  footerScript: null,
};

export async function getSiteSettingData() {
  try {
    const res = await fetch(`${API_BASE_URL}sitesetting/website-read`, {
      next: {
        revalidate: 300, // Revalidate cache every 5 minutes (300 seconds)
      },
    });

    if (!res.ok) return DEFAULT_SITE_SETTING;

    const data = await res.json();
    if (data && data.success && data.result) {
      const item = data.result;
      return {
        settingKey: item.settingKey || DEFAULT_SITE_SETTING.settingKey,
        siteName: item.siteName || DEFAULT_SITE_SETTING.siteName,
        siteUrl: item.siteUrl || DEFAULT_SITE_SETTING.siteUrl,
        gtmId: item.gtmId || DEFAULT_SITE_SETTING.gtmId,
        googleAdsIds:
          Array.isArray(item.googleAdsIds) && item.googleAdsIds.length > 0
            ? item.googleAdsIds
            : DEFAULT_SITE_SETTING.googleAdsIds,
        faviconIco: item.faviconIco || DEFAULT_SITE_SETTING.faviconIco,
        faviconSvg: item.faviconSvg || DEFAULT_SITE_SETTING.faviconSvg,
        favicon96: item.favicon96 || DEFAULT_SITE_SETTING.favicon96,
        appleTouchIcon:
          item.appleTouchIcon || DEFAULT_SITE_SETTING.appleTouchIcon,
        webmanifest: item.webmanifest || DEFAULT_SITE_SETTING.webmanifest,
        ogImage: item.ogImage || DEFAULT_SITE_SETTING.ogImage,
        showGlobalCta:
          typeof item.showGlobalCta === "boolean"
            ? item.showGlobalCta
            : DEFAULT_SITE_SETTING.showGlobalCta,
        headerScript: item.headerScript || null,
        footerScript: item.footerScript || null,
      };
    }

    return DEFAULT_SITE_SETTING;
  } catch (error) {
    console.warn("Error fetching SiteSetting from API:", error?.message);
    return DEFAULT_SITE_SETTING;
  }
}
