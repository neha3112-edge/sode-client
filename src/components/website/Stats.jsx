"use client";

import { Container } from "@/components/ui/container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import React, { useState } from "react";

export function Stats() {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tabId) => {
    setActiveTab((prev) => (prev === tabId ? null : tabId));
  };

  // Tab configurations (Matching the UI Image exactly)
  const tabs = [
    {
      id: "institutes",
      title: "Top Institutes",
      subtitle: "IITs, IIMs & more",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
        </svg>
      ),
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "live",
      title: "Live Classes",
      subtitle: "Interactive Learning",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5-6 3.75v-7.5l6 3.75Z" />
        </svg>
      ),
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: "emi",
      title: "EMI Options",
      subtitle: "Easy Installments",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
        </svg>
      ),
      iconColor: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      id: "guidance",
      title: "Expert Guidance",
      subtitle: "Free Counselling",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84a50.58 50.58 0 0 0-2.657.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M12 13.489v3.692m-5.462-6.52c.074-.5.194-.997.358-1.487m10.208 1.487a12.096 12.096 0 0 1-.358-1.487M6.546 8.162l-3.328 1.48c-.628.279-.628 1.17 0 1.448l3.328 1.48M17.454 8.162l3.328 1.48c.628.279.628 1.17 0 1.448l-3.328 1.48" />
        </svg>
      ),
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "trusted",
      title: "Trusted by",
      subtitle: "50,000+ Learners",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      ),
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  // Shadcn Accordion component wrapper
  const ShadcnAccordionWrapper = ({ items }) => {
    return (
      <Accordion type="single" collapsible defaultValue="1" className="w-full space-y-3 border-none">
        {items.map((item) => (
          <AccordionItem
            key={item.key}
            value={item.key}
            className="border rounded-xl overflow-hidden bg-white/3 border-white/5 hover:border-white/10 transition-all duration-300 data-[state=open]:bg-white/5 data-[state=open]:border-[#EEC471]/35 data-[state=open]:shadow-lg"
          >
            <AccordionTrigger className="w-full text-left px-5 py-4 flex items-center justify-between hover:no-underline [&>svg]:text-[#EEC471] [&>svg]:h-5 [&>svg]:w-5 [&>svg]:mr-2 transition-transform duration-300">
              {item.label}
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5 pt-0 text-white/90 leading-relaxed text-sm">
              <div className="border-t border-white/5 pt-4">
                {item.children}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  const instituteItems = [
    {
      key: "1",
      label: (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full pr-4">
          <div className="text-left">
            <span className="text-[#EEC471] font-bold text-xs uppercase tracking-wider block mb-1">IIM Ahmedabad</span>
            <span className="text-white font-extrabold text-sm sm:text-base md:text-lg block">Executive General Management Program (EGMP)</span>
          </div>
          <span className="bg-white/10 text-white/90 text-xs px-2.5 py-1 rounded-md border border-white/10 shrink-0 font-medium whitespace-nowrap">⏱️ 12 Months</span>
        </div>
      ),
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-sm text-white/80">Designed for mid to senior-level managers aiming to transition to general management roles. The curriculum covers strategic thinking, corporate finance, operational excellence, and organizational design.</p>
            <div className="text-xs font-bold text-[#EEC471] uppercase tracking-wider mt-4">🎯 Key Highlights:</div>
            <ul className="list-disc pl-5 text-xs text-white/70 space-y-1">
              <li>Campus Immersion at IIM Ahmedabad</li>
              <li>Official IIMA Alumni Status</li>
              <li>Case-study pedagogy and strategic projects</li>
            </ul>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
            <div className="text-xs"><span className="font-bold text-white/60 block mb-0.5">🎓 Eligibility:</span> Graduate with minimum 5 years work experience</div>
            <div className="text-xs"><span className="font-bold text-white/60 block mb-0.5">🛠️ Skills Acquired:</span> General Management, Corporate Strategy, Financial Analytics</div>
            <button onClick={() => { setActiveTab(null); document.querySelector('button[class*="bg-linear-to-r"]')?.click(); }} className="w-full cursor-pointer bg-linear-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] text-[#102441] py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transition-all">Download Syllabus & Apply</button>
          </div>
        </div>
      )
    },
    {
      key: "2",
      label: (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full pr-4">
          <div className="text-left">
            <span className="text-[#EEC471] font-bold text-xs uppercase tracking-wider block mb-1">IIM Bangalore</span>
            <span className="text-white font-extrabold text-sm sm:text-base md:text-lg block">Advanced Program in Digital Transformation & AI Strategy</span>
          </div>
          <span className="bg-white/10 text-white/90 text-xs px-2.5 py-1 rounded-md border border-white/10 shrink-0 font-medium whitespace-nowrap">⏱️ 6 Months</span>
        </div>
      ),
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-sm text-white/80">Equips leaders to lead digital change, drive artificial intelligence integration, and build competitive advantage in the modern digital era.</p>
            <div className="text-xs font-bold text-[#EEC471] uppercase tracking-wider mt-4">🎯 Key Highlights:</div>
            <ul className="list-disc pl-5 text-xs text-white/70 space-y-1">
              <li>Generative AI & Tech strategy roadmap</li>
              <li>Live sessions by IIMB core faculty</li>
              <li>Alumni privileges of IIM Bangalore</li>
            </ul>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
            <div className="text-xs"><span className="font-bold text-white/60 block mb-0.5">🎓 Eligibility:</span> Graduate with 3+ years experience in tech/management</div>
            <div className="text-xs"><span className="font-bold text-white/60 block mb-0.5">🛠️ Skills Acquired:</span> AI Implementation, Digital Innovation, Transformation Leadership</div>
            <button onClick={() => { setActiveTab(null); document.querySelector('button[class*="bg-linear-to-r"]')?.click(); }} className="w-full bg-linear-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] text-[#102441] py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transition-all">Download Syllabus & Apply</button>
          </div>
        </div>
      )
    },
    {
      key: "3",
      label: (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full pr-4">
          <div className="text-left">
            <span className="text-[#EEC471] font-bold text-xs uppercase tracking-wider block mb-1">IIT Delhi</span>
            <span className="text-white font-extrabold text-sm sm:text-base md:text-lg block">Executive Certification in Data Science & Machine Learning</span>
          </div>
          <span className="bg-white/10 text-white/90 text-xs px-2.5 py-1 rounded-md border border-white/10 shrink-0 font-medium whitespace-nowrap">⏱️ 9 Months</span>
        </div>
      ),
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-sm text-white/80">Focuses on advanced analytics, predictive modeling, machine learning, and statistical decision-making designed by DMS, IIT Delhi.</p>
            <div className="text-xs font-bold text-[#EEC471] uppercase tracking-wider mt-4">🎯 Key Highlights:</div>
            <ul className="list-disc pl-5 text-xs text-white/70 space-y-1">
              <li>Python & R practical programming labs</li>
              <li>IIT Delhi Alumni Association benefits</li>
              <li>Dedicated 1:1 mentor support</li>
            </ul>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
            <div className="text-xs"><span className="font-bold text-white/60 block mb-0.5">🎓 Eligibility:</span> Working professionals with basic coding background</div>
            <div className="text-xs"><span className="font-bold text-white/60 block mb-0.5">🛠️ Skills Acquired:</span> Machine Learning, Python programming, Predictive Modeling</div>
            <button onClick={() => { setActiveTab(null); document.querySelector('button[class*="bg-linear-to-r"]')?.click(); }} className="w-full bg-linear-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] text-[#102441] py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transition-all">Download Syllabus & Apply</button>
          </div>
        </div>
      )
    }
  ];

  const liveItems = [
    {
      key: "1",
      label: <span className="text-white font-bold text-sm sm:text-base md:text-lg">Interactive Live Lectures</span>,
      children: (
        <div className="text-white/85 text-left text-sm space-y-2">
          <p>SODE programs feature high-quality 2-way interactive live video sessions, giving you the real campus experience in a virtual classroom.</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-white/75 mt-2">
            <li>Q&A rounds with premier faculty.</li>
            <li>Recording access for lifetime revision.</li>
            <li>Live code-along labs.</li>
          </ul>
        </div>
      )
    },
    {
      key: "2",
      label: <span className="text-white font-bold text-sm sm:text-base md:text-lg">Weekend Batch Flexibility</span>,
      children: (
        <div className="text-white/85 text-left text-sm space-y-2">
          <p>Classes are held on Saturdays and Sundays to accommodate work schedules of busy working professionals.</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-white/75 mt-2">
            <li>No career interruption.</li>
            <li>Self-paced learning models available.</li>
            <li>24/7 technical support.</li>
          </ul>
        </div>
      )
    }
  ];

  const emiItems = [
    {
      key: "1",
      label: <span className="text-white font-bold text-sm sm:text-base md:text-lg">Zero Cost EMI Partners</span>,
      children: (
        <div className="text-white/85 text-left text-sm space-y-2">
          <p>Choose from our zero cost EMI plans starting as low as ₹4,999/month with our leading banking partners.</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-white/75 mt-2">
            <li>No interest fee.</li>
            <li>Paperless verification within 2 hours.</li>
            <li>Flexible tenures from 6 to 24 months.</li>
          </ul>
        </div>
      )
    }
  ];

  const guidanceItems = [
    {
      key: "1",
      label: <span className="text-white font-bold text-sm sm:text-base md:text-lg">1:1 Personalised Mentorship</span>,
      children: (
        <div className="text-white/85 text-left text-sm space-y-2">
          <p>Get personal feedback from senior industry leaders on product design, strategy, coding, and resume writing.</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-white/75 mt-2">
            <li>Regular doubt clearing rounds.</li>
            <li>Individual project reviews.</li>
            <li>Interview prep workshops.</li>
          </ul>
        </div>
      )
    }
  ];

  const trustedItems = [
    {
      key: "1",
      label: <span className="text-white font-bold text-sm sm:text-base md:text-lg">50,000+ Alumni Network & Hiring Partners</span>,
      children: (
        <div className="text-white/85 text-left text-sm space-y-2">
          <p>Our learners work at top global enterprises including Google, Microsoft, Amazon, KPMG, and McKinsey.</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-white/75 mt-2">
            <li>Average 52% salary hike.</li>
            <li>500+ global hiring partners.</li>
            <li>Dedicated career support portal.</li>
          </ul>
        </div>
      )
    }
  ];

  const currentTabInfo = tabs.find((t) => t.id === activeTab);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes customSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-custom-slide-down {
          animation: customSlideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes radix-accordion-slide-down {
          from { height: 0; opacity: 0; }
          to { height: var(--radix-accordion-content-height); opacity: 1; }
        }
        @keyframes radix-accordion-slide-up {
          from { height: var(--radix-accordion-content-height); opacity: 1; }
          to { height: 0; opacity: 0; }
        }
        .overflow-hidden[data-state="open"] {
          animation: radix-accordion-slide-down 0.28s cubic-bezier(0.87, 0, 0.13, 1) forwards;
        }
        .overflow-hidden[data-state="closed"] {
          animation: radix-accordion-slide-up 0.22s cubic-bezier(0.87, 0, 0.13, 1) forwards;
        }
      ` }} />

      {/* ── HIGH-LEVEL STATIC CATEGORIES ROW (FLEX LAYOUT) ── */}
      <section className="w-full bg-white border-b border-slate-100 py-6 select-none relative z-10">
        <Container>
          {/* Scrollable Container on Mobile */}
          <div className="flex items-center justify-start md:justify-center gap-4 md:gap-8 overflow-x-auto pb-2 md:pb-0 scrollbar-none px-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex flex-col items-center text-center group min-w-28 sm:min-w-32 cursor-pointer focus:outline-none transition-all duration-200 ${
                    isActive ? "scale-[1.02]" : "hover:scale-[1.01]"
                  }`}
                >
                  {/* Icon Wrapper Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2 transition-all duration-300 shadow-2xs ${
                      isActive
                        ? "bg-[#102441] border-[#EEC471] scale-105"
                        : "bg-slate-50 border-slate-200 group-hover:border-slate-300"
                    }`}
                  >
                    <div className={isActive ? "text-[#EEC471]" : tab.iconColor}>
                      {tab.icon}
                    </div>
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                      isActive ? "text-[#102441] text-[13px]" : "text-slate-800"
                    }`}
                  >
                    {tab.title}
                  </span>

                  {/* Subtitle */}
                  <span className="text-[10px] text-slate-400 mt-0.5 whitespace-nowrap">
                    {tab.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── IN-PAGE COLLAPSIBLE ACCORDION DETAILS SECTION (Rendered with Shadcn UI Accordion) ── */}
      {activeTab !== null && (
        <section className="w-full bg-[#102441] py-10 md:py-14 shadow-inner relative z-10 border-t border-white/5 animate-custom-slide-down">
          <Container>
            <div className="w-full px-4 relative">
              {/* Close Button at top-right corner of accordion card */}
              <button
                onClick={() => setActiveTab(null)}
                className="absolute -top-2 right-4 text-white/50 hover:text-white cursor-pointer focus:outline-none transition-colors p-1"
                aria-label="Close details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-left text-white">
                <div className="mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-wide mb-1">
                    {currentTabInfo?.title} Details
                  </h3>
                  <div className="h-0.5 w-16 bg-[#EEC471] rounded mt-2" />
                </div>

                {/* RENDER TOP INSTITUTES */}
                {activeTab === "institutes" && (
                  <div className="space-y-4">
                    <p className="text-xs md:text-sm text-white/70 mb-4">
                      Accelerate your leadership path with executive credentials from India's top business and technology institutions. Click on any program below to view details.
                    </p>
                    <ShadcnAccordionWrapper items={instituteItems} />
                  </div>
                )}

                {/* RENDER LIVE CLASSES */}
                {activeTab === "live" && (
                  <div className="space-y-4">
                    <p className="text-xs md:text-sm text-white/70 mb-4">
                      Explore our lecture format, flexibility models, and student interaction services.
                    </p>
                    <ShadcnAccordionWrapper items={liveItems} />
                  </div>
                )}

                {/* RENDER EMI OPTIONS */}
                {activeTab === "emi" && (
                  <div className="space-y-4">
                    <p className="text-xs md:text-sm text-white/70 mb-4">
                      Learn about zero cost EMI finance partners and direct installment breakdowns.
                    </p>
                    <ShadcnAccordionWrapper items={emiItems} />
                  </div>
                )}

                {/* RENDER EXPERT GUIDANCE */}
                {activeTab === "guidance" && (
                  <div className="space-y-4">
                    <p className="text-xs md:text-sm text-white/70 mb-4">
                      Review mentorship structures, 1:1 guidance frameworks, and corporate prep sessions.
                    </p>
                    <ShadcnAccordionWrapper items={guidanceItems} />
                  </div>
                )}

                {/* RENDER TRUSTED BY */}
                {activeTab === "trusted" && (
                  <div className="space-y-4">
                    <p className="text-xs md:text-sm text-white/70 mb-4">
                      See our global corporate placements, salary packages, and placement platform metrics.
                    </p>
                    <ShadcnAccordionWrapper items={trustedItems} />
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

export default Stats;
