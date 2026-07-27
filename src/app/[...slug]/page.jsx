import React from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import { MobileBottomNav } from "@/components/website/MockupAdditions";
import { getWebsitePageBySlug } from "@/services/api";
import { getFooterData } from "@/constants/footerData";
import SafeHtmlRenderer from "@/components/website/SafeHtmlRenderer";

export const revalidate = 60; // Next.js ISR: Revalidate cache every 60 seconds

// =========================================================
// GENERATE DYNAMIC PAGE METADATA
// =========================================================
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug;
  const page = await getWebsitePageBySlug(slugPath);

  if (!page) {
    return {
      title: "Page Not Found | SODE",
    };
  }

  return {
    title: page.metaTitle || `${page.title} | SODE`,
    description: page.metaDescription || `School of Online & Distance Education - ${page.title}`,
    keywords: Array.isArray(page.metaKeywords) ? page.metaKeywords : [],
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription,
    },
  };
}

// =========================================================
// RENDER DYNAMIC PAGE SECTIONS (TAILWIND UTILITY CLASSES)
// =========================================================
function RenderSection({ section }) {
  const { sectionType, sectionTitle, sectionSubtitle, bodyContent } = section;

  switch (sectionType) {
    case "hero":
      return (
        <section className="bg-gradient-to-b from-[#102441] to-[#0a1424] text-white py-20 px-6 md:px-12 text-center relative overflow-hidden border-b border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#EEC471]/5 rounded-full blur-3xl" />
          <div className="max-w-4xl mx-auto z-10 relative">
            <span className="bg-[#EEC471]/10 text-[#EEC471] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#EEC471]/20">
              Featured Program
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#EEC471] mt-6 mb-4 leading-tight tracking-tight">
              {sectionTitle || "Dynamic Program Title"}
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              {sectionSubtitle || "Learn key frameworks and accelerate your career with top certifications."}
            </p>
            <div className="flex justify-center gap-4">
              <a href="#apply" className="bg-[#EEC471] text-[#102441] font-bold text-sm px-6 py-3 rounded-full hover:bg-[#f7d594] transition-all shadow-md">
                Apply Now
              </a>
              <a href="#brochure" className="border border-slate-400 text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-white/10 transition-all">
                Download Brochure
              </a>
            </div>
          </div>
        </section>
      );

    case "stats":
      return (
        <section className="py-16 bg-slate-50 border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-4 text-center">
            {sectionTitle && <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">{sectionTitle}</h2>}
            {sectionSubtitle && <p className="text-slate-500 text-sm mb-10 max-w-xl mx-auto">{sectionSubtitle}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs">
                <div className="text-4xl font-black text-[#102441] mb-1">4.8 ★</div>
                <div className="text-slate-500 text-xs uppercase tracking-wider font-bold">User Reviews</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs">
                <div className="text-4xl font-black text-[#102441] mb-1">10K+</div>
                <div className="text-slate-500 text-xs uppercase tracking-wider font-bold">Alumni Placed</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs">
                <div className="text-4xl font-black text-[#102441] mb-1">Top 10</div>
                <div className="text-slate-500 text-xs uppercase tracking-wider font-bold">NIRF Rankings</div>
              </div>
            </div>
          </div>
        </section>
      );

    case "features":
      return (
        <section className="py-16 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            {sectionTitle && <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">{sectionTitle}</h2>}
            {sectionSubtitle && <p className="text-slate-500 text-sm max-w-xl mx-auto">{sectionSubtitle}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 items-start bg-white p-6 rounded-xl border border-slate-100 shadow-xs hover:shadow-sm transition-all">
              <span className="text-emerald-500 text-3xl font-bold">✓</span>
              <div>
                <h4 className="font-extrabold text-slate-800 text-base">Weekend Interactive Batches</h4>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">Classes are scheduled on weekends to ensure that working executives can pursue higher education without office schedule disruptions.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-white p-6 rounded-xl border border-slate-100 shadow-xs hover:shadow-sm transition-all">
              <span className="text-emerald-500 text-3xl font-bold">✓</span>
              <div>
                <h4 className="font-extrabold text-slate-800 text-base">1:1 Personal Mentorship</h4>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">Direct weekly mentorship sessions with top corporate leaders, project reviews, resume alignment, and profile building advice.</p>
              </div>
            </div>
          </div>
        </section>
      );

    case "faqs":
      return (
        <section className="py-16 bg-slate-50 border-y border-slate-100">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              {sectionTitle && <h2 className="text-2xl font-extrabold text-slate-800 mb-2">{sectionTitle}</h2>}
              {sectionSubtitle && <p className="text-slate-500 text-sm">{sectionSubtitle}</p>}
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <h5 className="font-bold text-slate-800 text-sm mb-2">What is the dynamic certification format?</h5>
                <p className="text-slate-500 text-xs leading-relaxed">Programs are conducted via live interactive classrooms. Faculty sessions are recorded and made available for lifetime access on the student portal.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <h5 className="font-bold text-slate-800 text-sm mb-2">What support is provided for fee payments?</h5>
                <p className="text-slate-500 text-xs leading-relaxed">We support interest-free installment schemes and zero cost EMIs through credit cards or education loan partners.</p>
              </div>
            </div>
          </div>
        </section>
      );

    case "reviews":
      return (
        <section className="py-16 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            {sectionTitle && <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">{sectionTitle}</h2>}
            {sectionSubtitle && <p className="text-slate-500 text-sm max-w-xl mx-auto">{sectionSubtitle}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-amber-50/20 border border-amber-100/50 p-6 rounded-xl shadow-xs">
              <div className="text-amber-400 text-lg mb-2">★★★★★</div>
              <h5 className="font-bold text-slate-800 text-sm">"Highly impacted my leadership strategies"</h5>
              <p className="text-slate-500 text-xs mt-2 italic leading-relaxed">"The program material is outstanding. The weekend live sessions allowed me to coordinate with my office responsibilities seamlessly."</p>
            </div>
            <div className="bg-amber-50/20 border border-amber-100/50 p-6 rounded-xl shadow-xs">
              <div className="text-amber-400 text-lg mb-2">★★★★★</div>
              <h5 className="font-bold text-slate-800 text-sm">"Industry-recognized faculty guidance"</h5>
              <p className="text-slate-500 text-xs mt-2 italic leading-relaxed">"Getting direct mentoring calls from IIT/IIM alumni shifted my career track and helped me pivot towards analytics role."</p>
            </div>
          </div>
        </section>
      );

    case "rich_text":
      return (
        <section className="py-16 max-w-4xl mx-auto px-4">
          {sectionTitle && <h2 className="text-2xl font-extrabold text-slate-800 mb-6">{sectionTitle}</h2>}
          <div className="whitespace-pre-wrap text-slate-600 text-sm leading-relaxed">
            {bodyContent}
          </div>
        </section>
      );

    case "custom_html":
      return (
        <section className="w-full overflow-hidden">
          <SafeHtmlRenderer html={bodyContent} />
        </section>
      );

    default:
      return null;
  }
}

// =========================================================
// DYNAMIC PAGE LAYOUT FALLBACK LOADER
// =========================================================
export default async function DynamicSlugPage({ params }) {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug;

  // 1. Fetch dynamic page build data from Backend
  const page = await getWebsitePageBySlug(slugPath);

  // 2. Trigger Next.js 404 handler if no record matched
  if (!page) {
    notFound();
  }

  // 3. Fetch footer static link datasets
  const { universities: footerUniversities, programs: footerPrograms } =
    await getFooterData();

  // 4. Sort Layout Sections by render order index
  const sortedSections = Array.isArray(page.sections)
    ? [...page.sections].sort((a, b) => (a.order || 0) - (b.order || 0))
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Header />

      <main className="flex w-full flex-1 flex-col md:mt-10 pb-16 lg:pb-0">
        {sortedSections.map((section, index) => (
          <RenderSection key={index} section={section} />
        ))}
      </main>

      <Footer
        initialUniversities={footerUniversities}
        initialPrograms={footerPrograms}
      />
      <MobileBottomNav />
    </div>
  );
}
