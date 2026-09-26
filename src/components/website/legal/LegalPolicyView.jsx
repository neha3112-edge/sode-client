import React from "react";

export default function LegalPolicyView({ policy }) {
  if (!policy) return null;

  const title =
    policy.banner_title ||
    policy.title ||
    (policy.slug === "privacy-policy" || policy.slug === "privacy"
      ? "Privacy & Policies"
      : policy.slug === "refund-policy" || policy.slug === "refund"
      ? "Refund and Cancellation"
      : policy.slug === "terms-and-conditions" || policy.slug === "terms"
      ? "Terms & Conditions"
      : policy.slug === "disclaimer"
      ? "Disclaimer"
      : "Policy");

  const introParagraphs = Array.isArray(policy.intro)
    ? policy.intro
    : typeof policy.summary === "string"
    ? policy.summary.split(/<br\s*\/?>\s*<br\s*\/?>/i).filter(Boolean)
    : [];

  const sections = Array.isArray(policy.sections) ? policy.sections : [];
  const points = Array.isArray(policy.points) ? policy.points : [];

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      {/* ─── WEBSITE DARK BLUE TOP BANNER (#072C50 - Website Base Color) ─── */}
      <div className="w-full bg-[#072C50] h-36 sm:h-44 md:h-52" />

      {/* ─── FLOATING WHITE CONTAINER CARD (Matching Screenshot 1) ─── */}
      <div className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 md:px-8 -mt-20 sm:-mt-28 md:-mt-32 pb-16 md:pb-24">
        <article className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10 md:p-14 text-[#2D3748] text-sm sm:text-[15px] md:text-[15.5px] leading-[1.8]">
          {/* Centered Page Title inside the card in dark blue */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#072C50] text-center tracking-tight m-0 mb-4 sm:mb-5">
            {title}
          </h1>

          {/* Full-width Divider Line */}
          <div className="w-full h-px bg-slate-200/90 mb-6 sm:mb-8" />

          {/* Intro paragraphs */}
          {introParagraphs.length > 0 && (
            <div className="space-y-4 mb-7 text-[#2D3748]">
              {introParagraphs.map((para, pIdx) => (
                <div
                  key={pIdx}
                  className="m-0 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}
            </div>
          )}

          {/* Raw HTML Content */}
          {policy.content && (
            <div
              className="prose prose-slate max-w-none text-[#2D3748] leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: policy.content }}
            />
          )}

          {/* Numbered Sections */}
          {sections.length > 0 && (
            <div className="space-y-6">
              {sections.map((sec, idx) => (
                <section key={idx} className="space-y-2">
                  {sec.heading && (
                    <h2 className="text-base sm:text-lg md:text-[19px] font-bold text-[#072C50] mt-7 mb-2 tracking-tight m-0">
                      {sec.heading}
                    </h2>
                  )}

                  {sec.content && (
                    <div
                      className="text-[#2D3748] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: sec.content }}
                    />
                  )}

                  {Array.isArray(sec.points) && sec.points.length > 0 && (
                    <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 text-[#2D3748] my-3">
                      {sec.points.map((pt, pIdx) => (
                        <li
                          key={pIdx}
                          className="leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: pt }}
                        />
                      ))}
                    </ul>
                  )}

                  {Array.isArray(sec.orderedPoints) && sec.orderedPoints.length > 0 && (
                    <ol className="list-decimal pl-5 sm:pl-6 space-y-1.5 text-[#2D3748] my-3">
                      {sec.orderedPoints.map((pt, oIdx) => (
                        <li
                          key={oIdx}
                          className="leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: pt }}
                        />
                      ))}
                    </ol>
                  )}
                </section>
              ))}
            </div>
          )}

          {/* Simple points list (if any) */}
          {points.length > 0 && (
            <div className="mt-4 space-y-2">
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-[#2D3748]">
                {points.map((pt, pIdx) => (
                  <li
                    key={pIdx}
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: pt }}
                  />
                ))}
              </ul>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
