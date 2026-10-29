/**
 * Central Sticky CTA Configuration & Resolver
 *
 * Normalizes brand properties, legacy mappings, and sensible defaults into
 * a single structured configuration object for LandingStickyCtas.
 */

// =========================================================
// GLOBAL DEFAULTS
// =========================================================
export const DEFAULT_PHONE = "7065777755";
export const DEFAULT_CALL_HREF = "tel:07065777755";

export const DEFAULT_STICKY_ASSETS = {
  callGif: "/assets/images/call_icon.gif",
  giftGif: "/assets/images/gift.gif",
  whatsappGif: "/assets/all_universities_images/all_universities_images/lpu/whatsapp.gif",
  iimCallGif: "/assets/iim/call_icon.gif",
  iimGiftGif: "/assets/iim/gift.gif",
};

export const DEFAULT_STICKY_LABELS = {
  brochure: "Get Brochure",
  apply: "Apply Now",
  callAria: "Call Expert",
  giftAria: "Get Scholarship Coupon Code",
  whatsappAria: "Chat on WhatsApp",
};

export const DEFAULT_CONFETTI_COLORS = [
  "#ff5722",
  "#ffb300",
  "#4caf50",
  "#ffd700",
  "#e91e63",
];

// =========================================================
// HELPER FUNCTIONS
// =========================================================

/**
 * Normalizes any raw phone string into a clean 10-digit phone number.
 */
export function normalizePhoneNumber(phone) {
  if (!phone) return DEFAULT_PHONE;
  const digits = String(phone).replace(/\D/g, "");
  return digits.slice(-10) || DEFAULT_PHONE;
}

/**
 * Builds the official WhatsApp click-to-chat URL for brochure download.
 */
export function buildWhatsAppBrochureUrl(phone, brandName = "University", customText) {
  const rawPhone = normalizePhoneNumber(phone);
  const text = encodeURIComponent(customText || `I want to Download ${brandName || "University"} Online Brochure`);
  return `https://api.whatsapp.com/send/?phone=+91${rawPhone}&text=${text}`;
}

/**
 * Resolves the telephone link href with safe fallback.
 */
export function buildCallHref(brandCallHref, rawPhone) {
  if (brandCallHref) return brandCallHref;
  return rawPhone ? `tel:+91${rawPhone}` : DEFAULT_CALL_HREF;
}

// =========================================================
// LEGACY COMPATIBILITY MAPPING
// =========================================================
/**
 * Legacy compatibility map: used ONLY as fallback when explicit
 * configuration properties are omitted from brand data.
 * JSX components NEVER check brand.slug directly.
 */
export const LEGACY_STICKY_CTA_CONFIG = {
  iim: {
    layout: "iim",
    callGif: DEFAULT_STICKY_ASSETS.iimCallGif,
    giftGif: DEFAULT_STICKY_ASSETS.iimGiftGif,
    callHref: "tel:07065777755",
  },
  uu: {
    layout: "default",
    stickyBarBg: "#d32f2f",
    brochureAction: "whatsapp",
    brochureIcon: "whatsapp",
    applyStyle: "white-red",
    showFloatingCallOnMobile: true,
  },
  mu: {
    layout: "default",
    stickyBarBg: "#f97316",
    brochureAction: "modal",
    brochureIcon: "whatsapp",
    applyStyle: "white-accent",
    showFloatingCallOnMobile: true,
  },
  amity: {
    layout: "default",
    brochureIcon: "whatsapp",
    showFloatingCallOnMobile: true,
  },
  manipal: {
    layout: "default",
    showFloatingCallOnMobile: true,
  },
  ssbm: {
    layout: "default",
    showFloatingCallOnMobile: true,
  },
  cu: {
    layout: "default",
    stickyBarBg: "#d11c1f",
    applyStyle: "white-red",
    applyBg: "#ffffff",
    applyTextColor: "#d11c1f",
    callGif: "/assets/cu/call_icon.gif",
    giftGif: "/assets/cu/gift.gif",
    brochureAction: "whatsapp",
    brochureIcon: "whatsapp",
    showFloatingCallOnMobile: true,
  },
  galgotias: {
    layout: "default",
    callGif: "/assets/galgotias/call_icon.gif",
    giftGif: "/assets/galgotias/gift.gif",
    brochureAction: "whatsapp",
    brochureIcon: "whatsapp",
    showFloatingCallOnMobile: true,
  },
  vgu: {
    layout: "default",
    stickyBarBg: "#d11c1f",
    brochureAction: "whatsapp",
    brochureIcon: "whatsapp",
    stickyBrochureBg: "#25d366",
    stickyBrochureTextColor: "#ffffff",
    applyStyle: "white-red",
    stickyApplyBg: "#ffffff",
    stickyApplyTextColor: "#ee3024",
    showFloatingCallOnMobile: true,
    callGif: "/assets/all_universities_images/vgu/call_icon.gif",
    giftGif: "/assets/all_universities_images/vgu/gift.gif",
  },
  smu: {
    layout: "default",
    applyStyle: "white-accent",
    stickyApplyBg: "#ffffff",
    stickyApplyTextColor: "#074a76",
    showFloatingCallOnMobile: true,
  },
};

// =========================================================
// CENTRAL CONFIG RESOLVER
// =========================================================
/**
 * Resolves and normalizes brand configuration into a single typed config object.
 */
export function resolveStickyCtaConfig(brand = {}) {
  const slug = (brand.slug || "").toLowerCase();
  const legacy = LEGACY_STICKY_CTA_CONFIG[slug] || {};

  // 1. Phone & Links
  const rawPhone = normalizePhoneNumber(brand.phone);
  const callHref = brand.callHref || legacy.callHref || buildCallHref(null, rawPhone);
  const customWhatsappText = brand.whatsappText || brand.whatsappMsg;
  const whatsappUrl =
    brand.whatsappUrl ||
    (brand.whatsappNumber
      ? `https://api.whatsapp.com/send/?phone=+${normalizePhoneNumber(brand.whatsappNumber)}&text=${encodeURIComponent(
          customWhatsappText || `I want to Download ${brand.name || "University"} Online Brochure`
        )}`
      : buildWhatsAppBrochureUrl(rawPhone, brand.name, customWhatsappText));

  // 2. Layout Variant
  const layout =
    brand.stickyCtaLayout ||
    brand.stickyLayout ||
    legacy.layout ||
    "default";

  // 3. Floating Call Button
  const isCallHidden = Boolean(brand.hideMobileCallIcon || brand.hideFloatingCall);
  const showCallOnMobile = Boolean(
    brand.showFloatingCallOnMobile ??
    legacy.showFloatingCallOnMobile ??
    brand.floatingCall?.mobile ??
    false
  );
  const callImage =
    brand.callGif ||
    brand.callIcon ||
    legacy.callGif ||
    (layout === "iim" ? DEFAULT_STICKY_ASSETS.iimCallGif : DEFAULT_STICKY_ASSETS.callGif);

  // 3.5. Floating WhatsApp Button
  const isWhatsAppHidden = Boolean(brand.hideFloatingWhatsApp || brand.hideFloatingWa);
  const showWhatsApp = Boolean(
    (brand.showFloatingWhatsApp ?? brand.floatingWhatsApp?.enabled ?? true) &&
    whatsappUrl &&
    !isWhatsAppHidden
  );
  const showWhatsAppOnMobile = Boolean(
    brand.showFloatingWhatsAppOnMobile ??
    brand.floatingWhatsApp?.mobile ??
    true
  );
  const whatsappImage =
    brand.whatsappGif ||
    brand.whatsappIcon ||
    brand.floatingWhatsApp?.image ||
    DEFAULT_STICKY_ASSETS.whatsappGif;

  // 4. Floating Gift Button
  const isGiftEnabled =
    brand.showFloatingGift !== false &&
    brand.floatingGift?.enabled !== false;
  const giftImage =
    brand.giftGif ||
    legacy.giftGif ||
    (layout === "iim" ? DEFAULT_STICKY_ASSETS.iimGiftGif : DEFAULT_STICKY_ASSETS.giftGif);

  // 5. Sticky Bottom Bar
  const isBarEnabled =
    brand.showStickyBar !== false &&
    brand.stickyBar?.enabled !== false;
  const barBackground =
    brand.stickyBarBg ||
    brand.stickyBarBackground ||
    brand.stickyBar?.background ||
    brand.stickyBar?.bg ||
    legacy.stickyBarBg ||
    brand.primaryColor ||
    "#08417b";

  const brochureAction =
    brand.stickyBrochureAction ||
    brand.stickyBar?.brochureAction ||
    legacy.brochureAction ||
    "modal";

  const brochureIcon =
    brand.stickyBrochureIcon ||
    brand.stickyBar?.brochureIcon ||
    legacy.brochureIcon ||
    "whatsapp";

  const brochureBg =
    brand.stickyBrochureBg ||
    brand.stickyBar?.brochureBg ||
    brand.stickyBrochureBackground ||
    null;

  const brochureTextColor =
    brand.stickyBrochureTextColor ||
    brand.stickyBar?.brochureTextColor ||
    brand.stickyBrochureColor ||
    null;

  const applyStyle =
    brand.stickyApplyStyle ||
    brand.stickyBar?.applyStyle ||
    legacy.applyStyle ||
    "yellow";

  const applyBg =
    brand.stickyApplyBg ||
    brand.stickyBar?.applyBg ||
    brand.stickyApplyBackground ||
    null;

  const applyTextColor =
    brand.stickyApplyTextColor ||
    brand.stickyBar?.applyTextColor ||
    brand.stickyApplyColor ||
    null;

  const isSplit = Boolean(
    brand.stickySplit ||
    brand.stickyBarSplit ||
    brand.stickyBarPill === false ||
    brand.stickyPill === false
  );

  const hideApplyArrow = Boolean(
    brand.stickyHideApplyArrow ??
    brand.stickyBar?.hideApplyArrow ??
    brand.hideStickyArrow ??
    false
  );

  // 6. Labels
  const labels = {
    brochure:
      brand.stickyBrochureLabel ||
      brand.labels?.brochure ||
      DEFAULT_STICKY_LABELS.brochure,
    apply:
      brand.stickyApplyLabel ||
      brand.labels?.apply ||
      DEFAULT_STICKY_LABELS.apply,
    callAria:
      brand.labels?.callAria ||
      `Call +91 ${rawPhone}`,
    giftAria:
      brand.labels?.giftAria ||
      DEFAULT_STICKY_LABELS.giftAria,
  };

  return {
    layout,
    phone: rawPhone,
    callHref,
    whatsappUrl,
    floatingCall: {
      enabled: !isCallHidden,
      mobile: showCallOnMobile,
      desktop: true,
      image: callImage,
      alt: "Call Expert",
    },
    floatingWhatsApp: {
      enabled: showWhatsApp,
      mobile: showWhatsAppOnMobile,
      desktop: true,
      image: whatsappImage,
      alt: "Chat on WhatsApp",
      url: whatsappUrl,
    },
    floatingGift: {
      enabled: isGiftEnabled,
      image: giftImage,
      alt: "Scholarship Coupon",
    },
    stickyBar: {
      enabled: isBarEnabled,
      background: barBackground,
      brochureAction,
      brochureIcon,
      brochureBg,
      brochureTextColor,
      applyStyle,
      applyBg,
      applyTextColor,
      brandColor: brand.primaryColor,
      isSplit,
      hideApplyArrow,
    },
    labels,
  };
}
