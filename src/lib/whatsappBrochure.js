"use client";

/**
 * Click-to-WhatsApp Dynamic Brochure Utility
 * Integrates directly with CRM WhatsApp Auto Engine.
 * 
 * Phone Resolution Hierarchy:
 * 1. Explicit override passed in function argument (e.g. university/counselor specific)
 * 2. Dynamic runtime number fetched from backend API or window.__CRM_WHATSAPP_NUMBER__
 * 3. Environment variable (NEXT_PUBLIC_WHATSAPP_NUMBER)
 * 4. Default fallback: "919582823636"
 */

export const DEFAULT_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919582823636";

let runtimeBackendWhatsAppNumber = null;

/**
 * Set active WhatsApp number dynamically from backend response / API
 */
export function setBackendWhatsAppNumber(phone) {
  if (phone) {
    const clean = String(phone).replace(/\D/g, "");
    if (clean) {
      runtimeBackendWhatsAppNumber = clean;
      if (typeof window !== "undefined") {
        window.__CRM_WHATSAPP_NUMBER__ = clean;
      }
    }
  }
}

/**
 * Resolve effective WhatsApp number following hierarchy
 */
export function getEffectiveWhatsAppNumber(customPhone = null) {
  if (customPhone) {
    const clean = String(customPhone).replace(/\D/g, "");
    if (clean) return clean;
  }

  if (typeof window !== "undefined" && window.__CRM_WHATSAPP_NUMBER__) {
    return String(window.__CRM_WHATSAPP_NUMBER__).replace(/\D/g, "");
  }

  if (runtimeBackendWhatsAppNumber) {
    return runtimeBackendWhatsAppNumber;
  }

  return String(DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, "");
}

/**
 * Clean & normalize slug
 */
export function sanitizeSlug(slug) {
  if (!slug) return "general";
  const str = String(slug).trim().toLowerCase();
  // Strip trailing/leading slashes
  return str.replace(/^\/+|\/+$/g, "");
}

/**
 * Extract UTM params from URL search & localStorage
 */
function extractTrackingContext() {
  if (typeof window === "undefined") return {};

  try {
    const params = new URLSearchParams(window.location.search);
    let storedData = {};
    try {
      const rawStored = localStorage.getItem("utm_data");
      if (rawStored) storedData = JSON.parse(rawStored);
    } catch {
      storedData = {};
    }

    return {
      page_url: window.location.href,
      pathname: window.location.pathname,
      utm_source: params.get("utm_source") || storedData.utm_source || "Website Organic",
      utm_medium: params.get("utm_medium") || storedData.utm_medium || "",
      utm_campaign: params.get("utm_campaign") || storedData.utm_campaign || "",
      utm_term: params.get("utm_term") || storedData.utm_term || "",
      utm_content: params.get("utm_content") || storedData.utm_content || "",
      gclid: params.get("gclid") || storedData.gclid || "",
      referrer: document.referrer || "",
    };
  } catch (err) {
    return { page_url: typeof window !== "undefined" ? window.location.href : "" };
  }
}

/**
 * Record WhatsApp click session in background without user lag
 */
function recordClickSession({ slug, title }) {
  if (typeof window === "undefined") return;

  try {
    const tracking = extractTrackingContext();
    const payload = JSON.stringify({
      slug: sanitizeSlug(slug),
      title: String(title || "Program").trim(),
      ...tracking,
    });

    // 1. Try navigator.sendBeacon (built for reliable, non-blocking click-out tracking)
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/tracking/whatsapp-click", blob);
    } else {
      // 2. Fallback to keepalive fetch
      fetch("/api/tracking/whatsapp-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => { });
    }
  } catch (err) {
    // Non-blocking
  }
}

/**
 * Generate formatted Click-to-WhatsApp URL with natural text payload
 */
export function getWhatsAppBrochureUrl({ title = "University", slug = "general", phone = null }) {
  const effectivePhone = getEffectiveWhatsAppNumber(phone);
  const cleanSlug = sanitizeSlug(slug);
  const cleanTitle = String(title || "Program").trim();

  // Clean, natural human text. Zero ugly tracking codes visible to user.
  const message = `Hi, I want to download the official brochure for ${cleanTitle}.\nRef: #${cleanSlug}`;
  return `https://wa.me/${effectivePhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Trigger Click-to-WhatsApp Brochure flow in new tab
 */
export function openWhatsAppBrochure({ title = "University", slug = "general", phone = null }) {
  if (typeof window === "undefined") return;

  // 1. Record tracking session in background (Page URL, UTM, GCLID)
  recordClickSession({ slug, title });

  // 2. Generate clean WhatsApp link
  const url = getWhatsAppBrochureUrl({ title, slug, phone });

  // 3. Optional Analytics Tracking (Google Analytics / Meta Pixel)
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "brochure_whatsapp_click", {
        event_category: "Brochure",
        event_label: title,
        slug,
      });
    }
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", "BrochureWhatsAppClick", {
        content_name: title,
        content_category: slug,
      });
    }
  } catch (err) {
    // Non-blocking analytics
  }

  // 4. Open WhatsApp
  window.open(url, "_blank", "noopener,noreferrer");
}
