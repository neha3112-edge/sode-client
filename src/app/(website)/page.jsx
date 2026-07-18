"use client";

import { useGetDynamicListQuery } from "@/store/redux/dynamic/action";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import { 
  BookOpen, 
  Award, 
  Users, 
  ArrowRight, 
  Briefcase, 
  Search, 
  Building2, 
  Globe2, 
  ShieldCheck 
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button, Card, Tag, Input, Select, Space } from "antd";

export default function Home() {
  const { data, isLoading } = useGetDynamicListQuery({
    entity: "health",
    endPoint: "data",
  });

  const [activeTab, setActiveTab] = useState("all");

  const programs = [
    {
      title: "Doctor of Business Administration (DBA)",
      university: "Golden Gate University, USA",
      duration: "3 Years",
      type: "Doctorate",
      category: "dba",
      tag: "Top Choice",
    },
    {
      title: "Global MBA",
      university: "Rushford Business School, Switzerland",
      duration: "18 Months",
      type: "Master",
      category: "mba",
      tag: "Trending",
    },
    {
      title: "M.Sc. in Data Science & AI",
      university: "Liverpool John Moores University, UK",
      duration: "2 Years",
      type: "Master",
      category: "tech",
      tag: "High Demand",
    },
    {
      title: "Executive PG Program in Management",
      university: "IIM Kozhikode, India",
      duration: "1 Year",
      type: "Executive",
      category: "mba",
      tag: "Premium",
    },
  ];

  const filteredPrograms = activeTab === "all" 
    ? programs 
    : programs.filter(p => p.category === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1C3569] via-[#17305e] to-[#005382] text-white py-20 px-4 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,193,7,0.15),transparent_40%)]" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <Tag color="#FFC107" className="text-black font-bold uppercase tracking-wider px-3 py-1 border-none rounded-full text-xs">
              ★ Premium Global Education
            </Tag>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white m-0">
              Transform Your Career with <span className="text-[#FFC107] bg-gradient-to-r from-[#FFC107] to-amber-300 bg-clip-text text-transparent">Global Degrees</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed m-0">
              Earn highly accredited MBA, DBA, and Tech degrees from world-class international and Indian universities without leaving your job.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/#premium-programs">
                <Button 
                  type="primary" 
                  size="large"
                  className="bg-[#FFC107] hover:!bg-[#e6af06] text-slate-950 font-bold border-none h-14 px-8 rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/10 transition-all duration-300 cursor-pointer"
                >
                  Explore Programs <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button 
                  size="large"
                  className="border-2 border-white/20 hover:!border-white hover:!bg-white/10 text-white font-semibold bg-transparent h-14 px-8 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Admin Portal
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <Card className="bg-white/95 backdrop-blur border border-slate-200/50 shadow-2xl rounded-3xl p-6 text-slate-800">
              <h3 className="text-xl font-bold text-[#1C3569] m-0 mb-2">Speak to an Expert Advisor</h3>
              <p className="text-sm text-slate-500 m-0 mb-6">Get a personalized course recommendation based on your profile.</p>
              
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Full Name</label>
                  <Input placeholder="Enter your name" className="h-11 rounded-lg border-slate-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Email Address</label>
                  <Input placeholder="Enter your email" type="email" className="h-11 rounded-lg border-slate-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Preferred Program</label>
                  <Select placeholder="Select program type" className="w-full h-11 rounded-lg border-slate-200" options={[
                    { value: 'dba', label: 'Doctorate / DBA' },
                    { value: 'mba', label: 'MBA / Master' },
                    { value: 'tech', label: 'Data Science & AI' },
                  ]} />
                </div>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  className="w-full bg-[#1C3569] hover:!bg-[#122449] border-none text-white font-bold h-12 rounded-xl mt-4 cursor-pointer"
                >
                  Book Free Consultation
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-[#1C3569]">20+</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-1 tracking-wider">Partner Universities</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-[#1C3569]">15,000+</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-1 tracking-wider">Global Alumni</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-[#1C3569]">98%</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-1 tracking-wider">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-[#1C3569]">WASC / AACSB</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-1 tracking-wider">Top Accreditations</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM GRID SECTION */}
      <section id="premium-programs" className="py-20 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C3569] m-0">Our Signature Programs</h2>
          <p className="text-slate-500 mt-2 m-0">Choose from globally recognized curricula designed for ambitious professionals.</p>
          
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {['all', 'dba', 'mba', 'tech'].map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-5 h-9 font-semibold text-sm cursor-pointer transition-all ${
                  activeTab === tab 
                    ? 'bg-[#1C3569] text-white border-none shadow-md hover:!bg-[#1C3569] hover:!text-white' 
                    : 'border-slate-200 text-slate-600 hover:!border-slate-400 hover:!text-slate-800'
                }`}
              >
                {tab.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrograms.map((p, idx) => (
            <Card 
              key={idx}
              hoverable
              className="border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              styles={{ body: { padding: '24px' } }}
            >
              <div className="flex justify-between items-start mb-4">
                <Tag color="#1C3569" className="font-semibold">{p.type}</Tag>
                {p.tag && <Tag color="orange" className="font-semibold">{p.tag}</Tag>}
              </div>
              <h3 className="text-xl font-bold text-slate-800 m-0 mb-2 group-hover:text-blue-600">{p.title}</h3>
              <p className="text-slate-500 text-sm m-0 mb-4 flex items-center gap-1">
                <Building2 className="w-4 h-4 text-slate-400" /> {p.university}
              </p>
              <div className="h-px bg-slate-100 my-4" />
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Duration: {p.duration}</span>
                <Button type="link" className="text-[#1C3569] font-bold p-0 flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                  View Details <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-slate-100 py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C3569] m-0">Why Choose Our Global Programs?</h2>
            <p className="text-slate-500 mt-2 m-0">We match Ivy League quality with industry flexibilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none rounded-2xl shadow-sm p-6 text-center" styles={{ body: { padding: 0 } }}>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1C3569] mb-2">Global Networking</h3>
              <p className="text-sm text-slate-500 leading-relaxed m-0">Connect with peers across 50+ countries and expand your professional network globally.</p>
            </Card>

            <Card className="border-none rounded-2xl shadow-sm p-6 text-center" styles={{ body: { padding: 0 } }}>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1C3569] mb-2">Dual Accreditation</h3>
              <p className="text-sm text-slate-500 leading-relaxed m-0">Degrees certified by top global regulatory bodies ensuring high worldwide acceptance.</p>
            </Card>

            <Card className="border-none rounded-2xl shadow-sm p-6 text-center" styles={{ body: { padding: 0 } }}>
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1C3569] mb-2">Work-Study Balance</h3>
              <p className="text-sm text-slate-500 leading-relaxed m-0">Specifically designed 100% online curricula to let you balance work, family, and studies.</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
