"use client";

/**
 * Click-to-WhatsApp Dynamic Brochure Utility
 * Integrates directly with CRM WhatsApp Auto Engine.
 * 
 * Phone Resolution Hierarchy:
 * 1. Explicit override passed in function argument (e.g. university/counselor specific)
 * 2. Dynamic runtime number fetched from backend API or window.__CRM_WHATSAPP_NUMBER__
 * 3. Environment variable (NEXT_PUBLIC_WHATSAPP_NUMBER)
 * 4. Default fallback: "919355588876"
 */

export const DEFAULT_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919355588876";

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
 * Generate formatted Click-to-WhatsApp URL with Ref: #{slug} payload
 */
export function getWhatsAppBrochureUrl({ title = "University", slug = "general", phone = null }) {
  const effectivePhone = getEffectiveWhatsAppNumber(phone);
  const cleanSlug = sanitizeSlug(slug);
  const cleanTitle = String(title || "Program").trim();

  const message = `Hi, I want to download the official brochure for ${cleanTitle}.\nRef: #${cleanSlug}`;
  return `https://wa.me/${effectivePhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Trigger Click-to-WhatsApp Brochure flow in new tab
 */
export function openWhatsAppBrochure({ title = "University", slug = "general", phone = null }) {
  if (typeof window === "undefined") return;

  const url = getWhatsAppBrochureUrl({ title, slug, phone });

  // Optional Analytics Tracking (Google Analytics / Pixel / Custom)
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

  window.open(url, "_blank", "noopener,noreferrer");
}
