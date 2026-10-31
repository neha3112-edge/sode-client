"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import confetti from "canvas-confetti";
import { Headphones, Home, Mail, CheckCircle2, Phone, BookOpen, Award, Compass } from "lucide-react";

/* =========================================================
   ICON MAPPING UTILITY
========================================================= */

function renderCardIcon(iconType) {
  switch (iconType) {
    case "headphones":
      return <Headphones className="text-[#8B7500]" size={22} aria-hidden="true" />;
    case "check":
      return <CheckCircle2 className="text-[#8B7500]" size={22} aria-hidden="true" />;
    case "phone":
      return <Phone className="text-[#8B7500]" size={22} aria-hidden="true" />;
    case "book":
      return <BookOpen className="text-[#8B7500]" size={22} aria-hidden="true" />;
    case "award":
      return <Award className="text-[#8B7500]" size={22} aria-hidden="true" />;
    case "mail":
    default:
      return <Mail className="text-[#8B7500]" size={22} aria-hidden="true" />;
  }
}

/* =========================================================
   THANK YOU CLIENT COMPONENT (STRICTLY DATA-DRIVEN)
========================================================= */

export default function ThankYouClient({
  conversionSource = "lp",
  initialData = null,
}) {
  const [brochureOpened, setBrochureOpened] = useState(false);
  const isBrochure = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        const queryBrochure =
          typeof window !== "undefined" &&
          new URLSearchParams(window.location.search).get("brochure") === "1";
        return queryBrochure || sessionStorage.getItem("isBrochureFlow") === "true";
      } catch (e) {
        return false;
      }
    },
    () => false
  );

  const brochureUrl = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        const queryUrl =
          typeof window !== "undefined" &&
          new URLSearchParams(window.location.search).get("url");
        if (queryUrl) return decodeURIComponent(queryUrl);
        return sessionStorage.getItem("brochureUrl") || "";
      } catch (e) {
        return "";
      }
    },
    () => ""
  );

  const timerFired = useRef(false);
  const conversionSent = useRef(false);
  const isClientReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Purely dynamic values from Backend API (No hardcoded static text)
  const googleAdsId = initialData?.googleAdsId || "";
  const conversionLabel = initialData?.googleAdsConversionLabel || "";

  const badgeText = isBrochure ? "" : (initialData?.badgeText || "SUBMISSION RECEIVED");
  const title = isBrochure ? "Your Submission has been received" : (initialData?.title || "Thank You for Contacting Us!");
  const subtitle = isBrochure ? "You'll be redirected to your brochure shortly..." : (initialData?.subtitle || "Our expert academic counselors will get in touch with you shortly to guide you.");

  const brochurePreparingText = initialData?.brochurePreparingText || "Opening your brochure in a new tab in 3 seconds...";
  const brochureOpenedText = initialData?.brochureOpenedText || "Your brochure has opened in a new tab!";

  const homeButtonText = initialData?.homeButtonText || "";
  const homeButtonLink = initialData?.homeButtonLink || "/";
  const exploreButtonText = initialData?.exploreButtonText || "";
  const exploreButtonLink = initialData?.exploreButtonLink || "";

  const infoCards = Array.isArray(initialData?.infoCards) ? initialData.infoCards : [];

  /* Trigger celebratory confetti on client mount */
  useEffect(() => {
    if (!isClientReady) return;
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#1C3569", "#FFC107", "#22C55E", "#3B82F6"],
      });
    } catch {
      // Safe fallback if canvas is not supported
    }
  }, [isClientReady]);

  /* =========================================================
     GOOGLE ADS CONVERSION TRACKING (TRIGGERED ONLY IF CONFIGURED IN API)
  ========================================================= */

  useEffect(() => {
    if (!conversionLabel || conversionSent.current) return;

    const sendTo = conversionLabel;
    const conversionSessionKey = `googleAdsConversionSent:${conversionSource}:${sendTo}`;

    try {
      const alreadySent = sessionStorage.getItem(conversionSessionKey) === "true";
      if (alreadySent) {
        conversionSent.current = true;
        return;
      }
    } catch (error) {
      console.error("Unable to check Google Ads conversion state:", error);
    }

    conversionSent.current = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };

    window.gtag("event", "conversion", { send_to: sendTo });

    try {
      sessionStorage.setItem(conversionSessionKey, "true");
    } catch (error) {
      console.error("Unable to store Google Ads conversion state:", error);
    }
  }, [conversionLabel, conversionSource]);

  /* =========================================================
     GET BROCHURE URL
  ========================================================= */

  const getBrochureUrl = useCallback(() => {
    if (brochureUrl) return brochureUrl;
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem("brochureUrl") || "/assets/pdf/brochure.pdf";
      } catch (e) {}
    }
    return "/assets/pdf/brochure.pdf";
  }, [brochureUrl]);

  /* =========================================================
     CLEAR BROCHURE SESSION
  ========================================================= */

  const clearBrochureSession = useCallback(() => {
    try {
      sessionStorage.removeItem("isBrochureFlow");
      sessionStorage.removeItem("brochureUrl");
    } catch (error) {
      console.error("Unable to clear brochure session:", error);
    }
  }, []);

  /* =========================================================
     AUTOMATIC BROCHURE DOWNLOAD & OPEN IN NEW TAB
  ========================================================= */

  const triggerDownloadAndOpen = useCallback((url) => {
    if (!url) return;
    const rawFileName = url.split("/").pop() || "Brochure.pdf";
    const cleanFileName = decodeURIComponent(rawFileName);

    // 1. Direct file download
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = url;
    downloadAnchor.setAttribute("download", cleanFileName);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    setTimeout(() => {
      try {
        document.body.removeChild(downloadAnchor);
      } catch (e) {}
    }, 500);

    // 2. Open in new blank tab
    try {
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win || win.closed || typeof win.closed === "undefined") {
        const openAnchor = document.createElement("a");
        openAnchor.href = url;
        openAnchor.target = "_blank";
        openAnchor.rel = "noopener noreferrer";
        document.body.appendChild(openAnchor);
        openAnchor.click();
        setTimeout(() => {
          try {
            document.body.removeChild(openAnchor);
          } catch (e) {}
        }, 500);
      }
    } catch (e) {
      const openAnchor = document.createElement("a");
      openAnchor.href = url;
      openAnchor.target = "_blank";
      openAnchor.rel = "noopener noreferrer";
      document.body.appendChild(openAnchor);
      openAnchor.click();
      setTimeout(() => {
        try {
          document.body.removeChild(openAnchor);
        } catch (e) {}
      }, 500);
    }

    setBrochureOpened(true);
  }, []);

  /* =========================================================
     AUTO DOWNLOAD TRIGGER AFTER 3 SECONDS
  ========================================================= */

  useEffect(() => {
    if (!isClientReady || !isBrochure) return;
    if (timerFired.current) return;

    const brochureTimer = window.setTimeout(() => {
      timerFired.current = true;
      const url = getBrochureUrl();
      triggerDownloadAndOpen(url);
    }, 3000);

    return () => {
      window.clearTimeout(brochureTimer);
    };
  }, [getBrochureUrl, isBrochure, isClientReady, triggerDownloadAndOpen]);

  /* =========================================================
     MANUAL BROCHURE DOWNLOAD HANDLER
  ========================================================= */

  const handleOpenBrochure = () => {
    const url = getBrochureUrl();
    triggerDownloadAndOpen(url);
  };

  return (
    <>
      {/* 🏷️ Dynamic JSON-LD Schema Markup (Only if present in API) */}
      {initialData?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: initialData.schemaMarkup }}
        />
      )}

      {/* 📊 Google Ads Global Tag Library (Only if configured in API) */}
      {googleAdsId && (
        <>
          <Script
            id="google-ads-library"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function () {
                window.dataLayer.push(arguments);
              };
              window.gtag("js", new Date());
              window.gtag("config", "${googleAdsId}");
            `}
          </Script>
        </>
      )}

      {/* 📊 Google Tag Manager (Only if configured in API) */}
      {initialData?.gtmId && (
        <Script id="gtm-thankyou" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${initialData.gtmId}');
          `}
        </Script>
      )}

      {/* 📊 Meta / Facebook Pixel (Only if configured in API) */}
      {initialData?.facebookPixelId && (
        <Script id="meta-pixel-thankyou" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${initialData.facebookPixelId}');
            fbq('track', 'PageView');
            fbq('track', 'Lead');
          `}
        </Script>
      )}

      {/* ⚙️ Custom Head Tracking Script from Backend Model */}
      {initialData?.customHeadScript && (
        <Script id="custom-thankyou-tracking" strategy="afterInteractive">
          {initialData.customHeadScript}
        </Script>
      )}

      <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-gray-50 px-4 py-20">
        <div className="w-full max-w-sm overflow-hidden rounded-[30px] bg-white shadow-2xl transition-all duration-300 md:max-w-4xl">
          <div className="p-6 text-center md:p-12">

            {/* =================================================
                SUCCESS ANIMATION AND HEADING (ONLY IF FROM API)
            ================================================== */}

            <div className="mb-8 flex flex-col items-center">
              <div className="mb-4 h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center shadow-lg shadow-emerald-500/10 animate-bounce">
                <CheckCircle2 className="h-14 w-14 sm:h-16 sm:w-16 text-emerald-500" strokeWidth={2.5} />
              </div>

              {badgeText && (
                <p className="mb-2 text-xs font-bold tracking-widest text-[#8B7500]">
                  {badgeText}
                </p>
              )}

              {title && (
                <h1 className="mb-3 text-2xl font-bold text-[#1C3569] md:text-4xl">
                  {title}
                </h1>
              )}

              {subtitle && (
                <p className="mx-auto max-w-lg text-base sm:text-lg leading-relaxed text-gray-700">
                  {subtitle}
                </p>
              )}

              {/* =============================================
                  BROCHURE ACTIONS (MATCHING IMAGE 2 DESIGN)
              ============================================== */}

              {isClientReady && isBrochure && (
                <div className="mt-6 flex flex-col items-center justify-center">
                  <Link
                    href={homeButtonLink || "/"}
                    className="inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-3.5 rounded-md bg-[#002B49] hover:bg-[#001f35] text-white font-semibold text-[15px] sm:text-[16px] transition-all shadow-md active:scale-98"
                  >
                    For More Information kindly Visit Us
                  </Link>

                  <button
                    type="button"
                    onClick={handleOpenBrochure}
                    className="mt-3 text-xs text-slate-400 hover:text-slate-700 underline underline-offset-2 cursor-pointer transition-colors"
                  >
                    Click here if the brochure does not download automatically
                  </button>
                </div>
              )}
            </div>

            {/* =================================================
                INFORMATION BOXES (ONLY IF IN DATABASE)
            ================================================== */}

            {infoCards.length > 0 && (
              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {infoCards.map((card, idx) => (
                  <div
                    key={card._id || idx}
                    className="rounded-2xl border border-transparent bg-[#F1F5F9] p-5 text-left transition-all hover:border-[#FFC107]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-lg bg-white p-2 shadow-sm">
                        {renderCardIcon(card.iconType)}
                      </div>
                      <div>
                        {card.title && (
                          <h2 className="text-sm font-bold text-[#1C3569] md:text-base">
                            {card.title}
                          </h2>
                        )}
                        {card.description && (
                          <p className="mt-1 text-xs leading-relaxed text-gray-600 md:text-sm">
                            {card.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* =================================================
                ACTION BUTTONS (ONLY IF CONFIGURED IN API)
            ================================================== */}

            {!isBrochure && (homeButtonText || exploreButtonText) && (
              <div className="mx-auto max-w-md">
                <div className="flex flex-col gap-3 sm:flex-row">
                  {homeButtonText && (
                    <Link
                      href={homeButtonLink || "/"}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FFC107] py-3.5 font-bold text-black transition-colors hover:bg-[#e6af06]"
                    >
                      <Home size={18} aria-hidden="true" />
                      <span>{homeButtonText}</span>
                    </Link>
                  )}

                  {exploreButtonText && (
                    <Link
                      href={exploreButtonLink || "/universities"}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#1C3569] bg-white py-3.5 font-bold text-[#1C3569] transition-colors hover:bg-slate-50"
                    >
                      <Compass size={18} aria-hidden="true" />
                      <span>{exploreButtonText}</span>
                    </Link>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </>
  );
}
