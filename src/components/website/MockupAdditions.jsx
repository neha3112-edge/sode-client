"use client";

import { Container } from "@/components/ui/container";
import React, { useState } from "react";
import Image from "next/image";

// 1. Search Bar Component (With smooth enter & exit top slide-down filter drawer)
export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterClosing, setIsFilterClosing] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    window.location.href = `/courses?search=${encodeURIComponent(searchTerm)}`;
  };

  const handleOpenFilters = () => {
    setIsFilterOpen(true);
    setIsFilterClosing(false);
  };

  const handleCloseFilters = () => {
    setIsFilterClosing(true);
    setTimeout(() => {
      setIsFilterOpen(false);
      setIsFilterClosing(false);
    }, 350); // Matches slideUpExit animation duration
  };

  const handleApplyFilters = () => {
    handleCloseFilters();
    setTimeout(() => {
      let queryParams = [];
      if (searchTerm.trim()) queryParams.push(`search=${encodeURIComponent(searchTerm)}`);
      if (selectedCategory !== "all") queryParams.push(`category=${selectedCategory}`);
      if (selectedType !== "all") queryParams.push(`type=${selectedType}`);
      if (selectedDuration !== "all") queryParams.push(`duration=${selectedDuration}`);
      
      const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
      window.location.href = `/courses${queryString}`;
    }, 380);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedType("all");
    setSelectedDuration("all");
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(4px); }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeOut {
          from { opacity: 1; backdrop-filter: blur(4px); }
          to { opacity: 0; backdrop-filter: blur(0px); }
        }
        .animate-fade-out {
          animation: fadeOut 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slideDown 0.38s cubic-bezier(0.32, 0.94, 0.6, 1) forwards;
        }

        @keyframes slideUpExit {
          from { transform: translateY(0); }
          to { transform: translateY(-100%); }
        }
        .animate-slide-up-exit {
          animation: slideUpExit 0.35s cubic-bezier(0.32, 0.94, 0.6, 1) forwards;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.42s cubic-bezier(0.32, 0.94, 0.6, 1) forwards;
        }

        @keyframes slideDownExit {
          from { transform: translateY(0); }
          to { transform: translateY(100%); }
        }
        .animate-slide-down-exit {
          animation: slideDownExit 0.38s cubic-bezier(0.32, 0.94, 0.6, 1) forwards;
        }

        @keyframes customScaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-custom-scale-up {
          animation: customScaleUp 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes customScaleDownExit {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.95) translateY(12px); }
        }
        .animate-custom-scale-down-exit {
          animation: customScaleDownExit 0.28s cubic-bezier(0.32, 0.94, 0.6, 1) forwards;
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

      <div className="w-full bg-white py-4 md:py-6 px-4 border-b border-slate-50 relative z-40">
        <Container>
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search programs, institutes or courses..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs"
              />
            </div>

            <button
              type="button"
              onClick={handleOpenFilters}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors shadow-xs cursor-pointer focus:outline-none"
              aria-label="Filter courses"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
            </button>
          </form>
        </Container>
      </div>

      {/* ── TOP SLIDE-DOWN DRAWER FOR FILTERS ── */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center">
          {/* Backdrop Blur Layer */}
          <div
            onClick={handleCloseFilters}
            className={`absolute inset-0 bg-slate-950/70 ${isFilterClosing ? "animate-fade-out" : "animate-fade-in"}`}
          />

          {/* Drawer Body (Slides down from top) */}
          <div className={`relative w-full bg-[#102441] border-b border-white/10 text-white rounded-b-3xl shadow-2xl p-6 md:p-8 z-10 max-h-[85vh] overflow-y-auto text-left ${isFilterClosing ? "animate-slide-up-exit" : "animate-slide-down"}`}>
            <Container className="max-w-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    Filter Programs
                  </h3>
                  <p className="text-[11px] text-white/50 mt-0.5">Narrow down programs matching your interests</p>
                </div>
                <button
                  onClick={handleCloseFilters}
                  className="text-white/60 hover:text-white cursor-pointer focus:outline-none transition-colors p-1.5 rounded-full hover:bg-white/5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filter Options */}
              <div className="space-y-6">
                {/* 1. Category */}
                <div className="space-y-2">
                  <span className="text-[#EEC471] text-xs font-bold uppercase tracking-wider block">Course Category:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "all", label: "All Categories" },
                      { id: "management", label: "Management & MBA" },
                      { id: "data-science", label: "Data Science & AI" },
                      { id: "technology", label: "Technology & Coding" },
                      { id: "finance", label: "Finance & Commerce" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`cursor-pointer text-xs font-semibold px-3.5 py-2 rounded-lg transition-all ${
                          selectedCategory === cat.id
                            ? "bg-[#EEC471] text-[#102441] font-bold"
                            : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Partner Type */}
                <div className="space-y-2">
                  <span className="text-[#EEC471] text-xs font-bold uppercase tracking-wider block">Institute Type:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "all", label: "All Partners" },
                      { id: "iims", label: "Indian Institutes of Management (IIMs)" },
                      { id: "iits", label: "Indian Institutes of Technology (IITs)" },
                      { id: "global", label: "Global B-Schools" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedType(t.id)}
                        className={`cursor-pointer text-xs font-semibold px-3.5 py-2 rounded-lg transition-all ${
                          selectedType === t.id
                            ? "bg-[#EEC471] text-[#102441] font-bold"
                            : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Duration */}
                <div className="space-y-2">
                  <span className="text-[#EEC471] text-xs font-bold uppercase tracking-wider block">Program Duration:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "all", label: "All Durations" },
                      { id: "short", label: "Short Term (< 6 Months)" },
                      { id: "medium", label: "Medium Term (6 - 12 Months)" },
                      { id: "long", label: "Long Term (12+ Months)" },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setSelectedDuration(d.id)}
                        className={`cursor-pointer text-xs font-semibold px-3.5 py-2 rounded-lg transition-all ${
                          selectedDuration === d.id
                            ? "bg-[#EEC471] text-[#102441] font-bold"
                            : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-6 mt-8">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="cursor-pointer text-xs font-bold text-white/60 hover:text-white border border-white/10 bg-transparent px-5 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  Reset Filters
                </button>
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="cursor-pointer text-xs font-bold bg-[#EEC471] text-[#102441] px-6 py-2.5 rounded-xl hover:scale-[1.01] transition-transform shadow-md"
                >
                  Apply Filters
                </button>
              </div>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}

// 2. Your Learning Journey Component
export function LearningJourney() {
  const steps = [
    {
      number: "1",
      title: "Explore",
      description: "Discover programs that fit your career goals",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
        </svg>
      ),
      color: "from-blue-500 to-indigo-600",
    },
    {
      number: "2",
      title: "Learn",
      description: "Join live classes & acquire modern skills",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84a50.58 50.58 0 0 0-2.657.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M12 13.489v3.692m-5.462-6.52c.074-.5.194-.997.358-1.487m10.208 1.487a12.096 12.096 0 0 1-.358-1.487" />
        </svg>
      ),
      color: "from-emerald-500 to-teal-600",
    },
    {
      number: "3",
      title: "Certify",
      description: "Earn globally recognized certifications",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 3.068 1.593 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      color: "from-amber-500 to-orange-600",
    },
    {
      number: "4",
      title: "Succeed",
      description: "Get placed & grow your career trajectory",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.61 3.89a14.98 14.98 0 00-6.16 12.12A14.98 14.98 0 009.61 19.89l3.52-3.52" />
        </svg>
      ),
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <section className="w-full bg-[#f8fafc] py-12 md:py-16 border-b border-slate-100">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10 px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#102441]">
            Your Learning Journey
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Step-by-step career acceleration designed for your dynamic upskilling needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 max-w-5xl mx-auto relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 group">
              <span className={`absolute -top-3 left-6 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs bg-linear-to-r ${step.color} shadow-xs`}>
                {step.number}
              </span>

              <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform mb-4 mt-1">
                {step.icon}
              </div>

              <h3 className="text-base font-bold text-[#102441] mb-1">
                {step.title}
              </h3>

              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                {step.description}
              </p>

              {idx < 3 && (
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-4 translate-x-1/2 z-10 text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// 3. Top IIMs & IITs Logos Section (IIM opens centered Modal, IIT opens full-width bottom Drawer)
export function IimIitLogos() {
  const [activePartner, setActivePartner] = useState(null);
  const [isPartnerClosing, setIsPartnerClosing] = useState(false);
  const [tempPartner, setTempPartner] = useState(null);

  const iims = [
    { name: "IIM Ahmedabad", code: "IIMA", badge: "Gold Class" },
    { name: "IIM Bangalore", code: "IIMB", badge: "Digital Tech" },
    { name: "IIM Calcutta", code: "IIMC", badge: "Finance Hub" },
    { name: "IIM Lucknow", code: "IIML", badge: "Leadership" },
    { name: "IIM Kozhikode", code: "IIMK", badge: "Innovation" },
  ];

  const iits = [
    { name: "IIT Delhi", code: "IITD", badge: "ML & AI" },
    { name: "IIT Bombay", code: "IITB", badge: "Advanced Tech" },
    { name: "IIT Madras", code: "IITM", badge: "Research Hub" },
    { name: "IIT Kanpur", code: "IITK", badge: "Cyber Sec" },
    { name: "IIT Roorkee", code: "IITR", badge: "Data Analytics" },
  ];

  const handleOpenPartner = (partner, type) => {
    const partnerWithType = { ...partner, type };
    setActivePartner(partnerWithType);
    setTempPartner(partnerWithType);
    setIsPartnerClosing(false);
  };

  const handleClosePartner = () => {
    setIsPartnerClosing(true);
    setTimeout(() => {
      setActivePartner(null);
      setTempPartner(null);
      setIsPartnerClosing(false);
    }, 380); // Matches the exit transition delay
  };

  const partnerDetails = {
    "IIMA": {
      title: "Executive General Management Program (EGMP)",
      duration: "12 Months",
      eligibility: "Graduate with minimum 5 years work experience",
      skills: "General Management, Corporate Strategy, Financial Analytics",
      description: "Designed for mid to senior-level managers aiming to transition to general management roles. The curriculum covers strategic thinking, corporate finance, operational excellence, and organizational design.",
      highlights: [
        "Campus Immersion at IIM Ahmedabad",
        "Official IIMA Alumni Association Status",
        "Case-study pedagogy and strategic projects"
      ]
    },
    "IIMB": {
      title: "Advanced Program in Digital Transformation & AI Strategy",
      duration: "6 Months",
      eligibility: "Graduate with 3+ years experience in tech/management",
      skills: "AI Implementation, Digital Innovation, Transformation Leadership",
      description: "Equips leaders to lead digital change, drive artificial intelligence integration, and build competitive advantage in the modern digital era.",
      highlights: [
        "Generative AI & Tech strategy roadmap",
        "Live sessions by IIMB core faculty",
        "Alumni privileges of IIM Bangalore"
      ]
    },
    "IIMC": {
      title: "Executive Program in Growth Strategies & Corporate Finance",
      duration: "12 Months",
      eligibility: "CA, CS, ICWA or Graduate with minimum 3 years finance experience",
      skills: "Growth Scaling, Merger & Acquisition, Corporate Treasury",
      description: "Delivers deep expertise in corporate valuation, treasury management, capital structure optimization, and scaling business growth strategies.",
      highlights: [
        "Dual campus immersions at IIM Joka (Calcutta)",
        "Distinguished financial management core faculty",
        "Lifetime access to IIMC Alumni portal & directory"
      ]
    },
    "IIML": {
      title: "Executive Program in Strategic Management & Leadership",
      duration: "9 Months",
      eligibility: "Graduate with minimum 4 years corporate work experience",
      skills: "Executive Leadership, Negotiation Strategy, Talent Development",
      description: "Provides senior managers with the toolkit to negotiate high-stakes deals, run organizational scale, and align cross-functional teams.",
      highlights: [
        "3-day campus immersion at IIM Lucknow Noida campus",
        "Practical leader workshops with peer mentoring groups",
        "Alumni benefits of IIM Lucknow"
      ]
    },
    "IIMK": {
      title: "Executive Program in Business Management & Digital Innovation",
      duration: "12 Months",
      eligibility: "Graduate with minimum 2 years work experience",
      skills: "Business Management, Digital Innovation, Marketing Management",
      description: "Empowers managers to run core business units while integrating digital business models and automated operational channels.",
      highlights: [
        "Online interactive sessions by IIM Kozhikode faculty",
        "Custom capstone project on digital business disruption",
        "Official IIM Kozhikode Alumni Status"
      ]
    },
    "IITD": {
      title: "Executive Certification in Data Science & Machine Learning",
      duration: "9 Months",
      eligibility: "Working professionals with basic coding/math background",
      skills: "Machine Learning, Python programming, Predictive Modeling",
      description: "Focuses on advanced analytics, predictive modeling, machine learning, and statistical decision-making designed by DMS, IIT Delhi.",
      highlights: [
        "Python & R practical programming labs",
        "IIT Delhi Alumni Association benefits",
        "Dedicated 1:1 mentor support"
      ]
    },
    "IITB": {
      title: "Executive Certification in AI, Machine Learning & Cloud Computing",
      duration: "10 Months",
      eligibility: "Engineers, Developers, or Tech Leads with coding proficiency",
      skills: "Generative AI, Deep Learning, Cloud Architecture (AWS/GCP)",
      description: "Comprehensive practical specialization in neural networks, large language models, cloud deployments, and predictive AI pipelines.",
      highlights: [
        "Hands-on labs powered by IIT Bombay tech faculty",
        "Certificate of completion from CEP, IIT Bombay",
        "Dedicated placement support & corporate career drives"
      ]
    },
    "IITM": {
      title: "Executive Program in Data Science & Engineering Analytics",
      duration: "12 Months",
      eligibility: "B.Tech/B.Sc/BCA or Math graduates with coding interest",
      skills: "Big Data Processing, SQL/NoSQL Databases, Cloud Analytics",
      description: "Learn scaling databases, engineering large dataset pipelines, and applying advanced mathematical analytics to industry solutions.",
      highlights: [
        "Live classes from India's #1 Ranked Engineering Institute",
        "Access to IIT Madras research startup incubator networks",
        "Comprehensive hands-on case studies"
      ]
    },
    "IITK": {
      title: "Executive Program in Cybersecurity & Blockchain Technologies",
      duration: "8 Months",
      eligibility: "IT professionals, security specialists, or tech grads",
      skills: "Ethical Hacking, Network Security, Smart Contract Audits",
      description: "Designed by cybersecurity research cells of IIT Kanpur to provide state-of-the-art defenses, penetration testing, and secure system design.",
      highlights: [
        "IIT Kanpur Cybersecurity lab hands-on access",
        "Certificate issued by C3i Hub, IIT Kanpur",
        "Preparation for top global security certifications"
      ]
    },
    "IITR": {
      title: "Executive Program in Data Analytics & Applied Finance",
      duration: "9 Months",
      eligibility: "Finance professionals, analysts, or commerce graduates",
      skills: "Financial Analytics, Quantitative Risk Modeling, Algorithmic Trading",
      description: "Bridging the gap between engineering analytics and finance. Designed for analysts deploying algorithmic models or calculating portfolio risks.",
      highlights: [
        "IIT Roorkee campus visit immersion opportunity",
        "Live sessions by Department of Management Studies, IITR",
        "Placement assistance & resume reviews"
      ]
    }
  };

  const partnerToRender = activePartner || tempPartner;

  return (
    <>
      <section className="w-full bg-white py-12 md:py-16 border-b border-slate-100">
        <Container className="space-y-12">
          
          {/* Top IIMs Block */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4 max-w-5xl mx-auto">
              <h3 className="text-lg md:text-xl font-extrabold text-[#102441] flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#EEC471] rounded-full" />
                Top IIM Certification Partners
              </h3>
              <button className="text-xs md:text-sm font-bold text-blue-600 hover:underline cursor-pointer">
                View All &gt;
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 px-4 max-w-5xl mx-auto">
              {iims.map((iim, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOpenPartner(iim, "iim")}
                  className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col items-center text-center shadow-2xs hover:shadow-xs hover:border-slate-200 transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <div className="w-12 h-12 rounded-full bg-[#102441]/10 border border-[#102441]/20 flex items-center justify-center text-xs font-bold text-[#102441] mb-2 font-serif">
                    {iim.code}
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight block">
                    {iim.name}
                  </span>
                  <span className="text-[9px] text-[#EEC471] bg-[#102441] px-2 py-0.5 rounded-sm font-semibold uppercase mt-1">
                    {iim.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top IITs Block */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4 max-w-5xl mx-auto">
              <h3 className="text-lg md:text-xl font-extrabold text-[#102441] flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
                Top IIT Certification Partners
              </h3>
              <button className="text-xs md:text-sm font-bold text-blue-600 hover:underline cursor-pointer">
                View All &gt;
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 px-4 max-w-5xl mx-auto">
              {iits.map((iit, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOpenPartner(iit, "iit")}
                  className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col items-center text-center shadow-2xs hover:shadow-xs hover:border-slate-200 transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 mb-2 font-sans">
                    {iit.code}
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight block">
                    {iit.name}
                  </span>
                  <span className="text-[9px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm font-semibold uppercase mt-1">
                    {iit.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </Container>
      </section>

      {/* ── CONDITIONAL POPUP LAYOUT (With smooth enter & exit animations) ── */}
      {partnerToRender !== null && (() => {
        const details = partnerDetails[partnerToRender.code];
        const isIim = partnerToRender.type === "iim";

        if (isIim) {
          // Centered Modal (IIM)
          return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <div
                onClick={handleClosePartner}
                className={`absolute inset-0 bg-slate-950/70 ${isPartnerClosing ? "animate-fade-out" : "animate-fade-in"}`}
              />
              <div className={`relative w-full max-w-7xl bg-[#102441] border border-white/10 text-white rounded-2xl shadow-2xl p-6 md:p-8 z-10 max-h-[85vh] overflow-y-auto text-left ${isPartnerClosing ? "animate-custom-scale-down-exit" : "animate-custom-scale-up"}`}>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-[#EEC471] font-serif border border-[#EEC471]/35">
                      {partnerToRender.code}
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                        {partnerToRender.name}
                      </h3>
                      <span className="text-[9px] text-[#EEC471] bg-white/5 px-2 py-0.5 rounded-sm font-semibold uppercase mt-0.5 inline-block">
                        {partnerToRender.badge}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleClosePartner}
                    className="text-white/60 hover:text-white cursor-pointer focus:outline-none transition-colors p-1.5 rounded-full hover:bg-white/5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {details && (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[#EEC471] text-[10px] font-bold uppercase tracking-wider block mb-1">Featured Program:</span>
                      <h4 className="text-base font-extrabold text-white leading-snug">
                        {details.title}
                      </h4>
                      <span className="mt-2 inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-[11px] text-white/90">
                        ⏱️ Duration: <span className="font-bold text-white">{details.duration}</span>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider block">Description:</span>
                      <p className="text-xs md:text-sm text-white/85 leading-relaxed">
                        {details.description}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[#EEC471] text-[10px] font-bold uppercase tracking-wider block">🎯 Key Highlights:</span>
                      <ul className="list-disc pl-5 text-xs text-white/75 space-y-1">
                        {details.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-[11px] space-y-0.5">
                        <span className="font-bold text-white/60 block">🎓 Eligibility:</span>
                        <span className="text-white/80">{details.eligibility}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-[11px] space-y-0.5">
                        <span className="font-bold text-white/60 block">🛠️ Skills Acquired:</span>
                        <span className="text-white/80">{details.skills}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          handleClosePartner();
                          setTimeout(() => {
                            document.querySelector('button[class*="bg-linear-to-r"]')?.click();
                          }, 350);
                        }}
                        className="w-full cursor-pointer bg-linear-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] text-[#102441] py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transition-transform duration-150"
                      >
                        Download Syllabus & Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        } else {
          // Full-Width Bottom Sheet/Drawer (IIT)
          return (
            <div className="fixed inset-0 z-[9999] flex items-end justify-center">
              <div
                onClick={handleClosePartner}
                className={`absolute inset-0 bg-slate-950/70 ${isPartnerClosing ? "animate-fade-out" : "animate-fade-in"}`}
              />
              <div className={`relative w-full bg-[#102441] border-t border-white/10 text-white rounded-t-3xl shadow-2xl p-6 pb-8 z-10 max-h-[85vh] overflow-y-auto text-left ${isPartnerClosing ? "animate-slide-down-exit" : "animate-slide-up"}`}>
                
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto -mt-2 mb-4" />

                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-blue-400 font-sans border border-blue-400/35">
                      {partnerToRender.code}
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                        {partnerToRender.name}
                      </h3>
                      <span className="text-[9px] text-blue-400 bg-white/5 px-2 py-0.5 rounded-sm font-semibold uppercase mt-0.5 inline-block">
                        {partnerToRender.badge}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleClosePartner}
                    className="text-white/60 hover:text-white cursor-pointer focus:outline-none transition-colors p-1.5 rounded-full hover:bg-white/5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {details && (
                  <div className="space-y-4">
                    <div>
                      <span className="text-blue-400 text-[10px] font-bold uppercase tracking-wider block mb-1">Featured Program:</span>
                      <h4 className="text-base font-extrabold text-white leading-snug">
                        {details.title}
                      </h4>
                      <span className="mt-2 inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-[11px] text-white/90">
                        ⏱️ Duration: <span className="font-bold text-white">{details.duration}</span>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider block">Description:</span>
                      <p className="text-xs md:text-sm text-white/85 leading-relaxed">
                        {details.description}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-blue-400 text-[10px] font-bold uppercase tracking-wider block">🎯 Key Highlights:</span>
                      <ul className="list-disc pl-5 text-xs text-white/75 space-y-1">
                        {details.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-[11px] space-y-0.5">
                        <span className="font-bold text-white/60 block">🎓 Eligibility:</span>
                        <span className="text-white/80">{details.eligibility}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-[11px] space-y-0.5">
                        <span className="font-bold text-white/60 block">🛠️ Skills Acquired:</span>
                        <span className="text-white/80">{details.skills}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          handleClosePartner();
                          setTimeout(() => {
                            document.querySelector('button[class*="bg-linear-to-r"]')?.click();
                          }, 350);
                        }}
                        className="w-full cursor-pointer bg-linear-to-r from-blue-500 via-blue-400 to-cyan-300 text-[#102441] py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transition-transform duration-150"
                      >
                        Download Syllabus & Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        }
      })()}
    </>
  );
}

// 4. Sticky Mobile Bottom Navigation Bar (Visible only on mobile screens)
export function MobileBottomNav() {
  const navItems = [
    {
      label: "Home",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      active: true,
    },
    {
      label: "Programs",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      active: false,
    },
    {
      label: "Institutes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
        </svg>
      ),
      active: false,
    },
    {
      label: "Counselling",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
        </svg>
      ),
      active: false,
    },
    {
      label: "Profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      active: false,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] bg-[#102441] border-t border-white/10 flex items-center justify-around py-2.5 px-2 text-white/70 shadow-2xl lg:hidden">
      {navItems.map((item, idx) => (
        <button
          key={idx}
          className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer focus:outline-none transition-colors duration-150 ${
            item.active ? "text-[#EEC471]" : "hover:text-white"
          }`}
          onClick={() => {
            if (item.label === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
            else if (item.label === "Counselling") document.querySelector('button[class*="bg-linear-to-r"]')?.click();
            else window.location.href = `/${item.label.toLowerCase()}`;
          }}
        >
          {item.icon}
          <span className="text-[9px] font-bold tracking-wide">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
