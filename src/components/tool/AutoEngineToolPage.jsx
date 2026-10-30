"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { dynamicRead, dynamicPost } from "@/services/request";
import { useFormModal } from "@/hooks/useFormModal";

const getMediaUrl = (obj) => (typeof obj === "string" ? obj : obj?.url || obj?.path || obj?.src || null);
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  School,
  GraduationCap,
  Award,
  BookOpen,
  IndianRupee,
  CreditCard,
  Briefcase,
  Laptop,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Building2,
  Layers,
  Clock,
  Code2,
  Tag,
  UserCheck,
  XCircle,
  Search,
  RotateCcw,
  Info,
  Globe,
  FileText,
} from "lucide-react";
import { ArrowRightOutlined } from "@ant-design/icons";

const iconMap = {
  School,
  GraduationCap,
  Award,
  BookOpen,
  IndianRupee,
  CreditCard,
  Briefcase,
  Laptop,
  Building2,
  Layers,
  Sparkles,
  Clock,
  Code2,
  Tag,
  UserCheck,
  CheckCircle2,
  XCircle,
  Globe,
  FileText,
};

// Smart fallback icon resolver so different options always get distinct, context-aware icons
const resolveOptionIcon = (title = "", optIcon = null, idx = 0) => {
  if (optIcon && iconMap[optIcon]) {
    return iconMap[optIcon];
  }

  const t = String(title || "").toLowerCase().trim();

  // 1. Roles / Person types
  if (t.includes("student")) return GraduationCap;
  if (t.includes("fresher")) return Sparkles;
  if (t.includes("working") || t.includes("professional") || t.includes("job") || t.includes("employ")) return Briefcase;
  if (t.includes("other")) return Layers;

  // 2. Qualifications & Degrees
  if (t.includes("10th") || t.includes("matric") || t.includes("secondary")) return BookOpen;
  if (t.includes("12th") || t.includes("inter") || t.includes("senior secondary")) return BookOpen;
  if (t.includes("diploma")) return FileText;
  if (t.includes("bachelor") || t.includes("undergrad") || t.includes("graduation") || t.includes("degree")) return GraduationCap;
  if (t.includes("master") || t.includes("post grad") || t.includes("pg") || t.includes("mba")) return Award;
  if (t.includes("phd") || t.includes("doctorate") || t.includes("research")) return Award;

  // 3. Streams / Courses
  if (t.includes("engineer") || t.includes("b.tech") || t.includes("tech") || t.includes("computer") || t.includes("bca") || t.includes("mca") || t.includes("it")) return Laptop;
  if (t.includes("manage") || t.includes("business") || t.includes("bba") || t.includes("commerce") || t.includes("b.com") || t.includes("m.com") || t.includes("finance")) return Briefcase;
  if (t.includes("art") || t.includes("humanit") || t.includes("ba") || t.includes("ma") || t.includes("journalism")) return BookOpen;
  if (t.includes("science") || t.includes("b.sc") || t.includes("m.sc")) return Building2;
  if (t.includes("law") || t.includes("llb") || t.includes("legal")) return ShieldCheck;
  if (t.includes("medical") || t.includes("health") || t.includes("nursing") || t.includes("pharma")) return UserCheck;
  if (t.includes("design") || t.includes("animat") || t.includes("vfx")) return Code2;

  // 4. Time Dedication / Schedule
  if (t.includes("hour") || t.includes("week") || t.includes("month") || t.includes("time") || t.includes("dedicate") || t.includes("schedule") || t.includes("duration")) return Clock;

  // 5. Budgets / Fees
  if (t.includes("lakh") || t.includes("inr") || t.includes("₹") || t.includes("fee") || t.includes("budget") || t.includes("cost") || /\b\d+k\b/.test(t) || /\b\d+\s*lakh/.test(t)) return IndianRupee;

  // 5. Mode / University type
  if (t.includes("online") || t.includes("remote")) return Laptop;
  if (t.includes("distance") || t.includes("open")) return Globe;
  if (t.includes("regular") || t.includes("campus") || t.includes("offline")) return School;
  if (t.includes("ugc") || t.includes("naac") || t.includes("govt") || t.includes("university")) return Building2;

  // 6. Distinct fallback pool by index so adjacent cards never share the same icon
  const fallbackIcons = [
    GraduationCap,
    Sparkles,
    Briefcase,
    Building2,
    BookOpen,
    Award,
    Laptop,
    Layers,
    UserCheck,
    Tag,
  ];

  return fallbackIcons[idx % fallbackIcons.length] || School;
};

// Colors to cycle through for card sparkles & underlines matching ToolsView
const CARD_PALETTES = [
  { sparkle: "text-[#00ACC1]", underline: "border-[#00ACC1]", bg: "bg-[#00ACC1]/10", text: "text-[#00ACC1]" },
  { sparkle: "text-[#AB47BC]", underline: "border-[#AB47BC]", bg: "bg-[#AB47BC]/10", text: "text-[#AB47BC]" },
  { sparkle: "text-[#1E88E5]", underline: "border-[#1E88E5]", bg: "bg-[#1E88E5]/10", text: "text-[#1E88E5]" },
  { sparkle: "text-[#EC407A]", underline: "border-[#EC407A]", bg: "bg-[#EC407A]/10", text: "text-[#EC407A]" },
];

export default function AutoEngineToolPage({
  toolSlug = "suggest-university",
  toolTitle = "Suggest University",
  toolDescription = "Find top accredited, UGC-DEB, and NAAC A++ approved universities based on location, budget, NIRF ranking, and placements.",
}) {
  const { openFormModal } = useFormModal();
  const [loading, setLoading] = useState(true);
  const [workflow, setWorkflow] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState(null);
  const [courses, setCourses] = useState([]);
  const [resultPayload, setResultPayload] = useState(null);
  const [userSummary, setUserSummary] = useState(null);
  const [resultHeader, setResultHeader] = useState({
    title: "Great! Ready to discover courses that match your preferences?",
    subtitle: "List of courses and accredited universities",
  });
  const [selectedOtherId, setSelectedOtherId] = useState(null);
  const [otherInputText, setOtherInputText] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedMultiOptions, setSelectedMultiOptions] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Directly fetch recommendations without showing lead form
  const fetchRecommendationsDirectly = async (finalAnswers) => {
    setSubmitting(true);
    try {
      const res = await dynamicPost({
        entity: "tool",
        endPoint: "public/submit",
        body: {
          slug: toolSlug,
          leadData: {},
          userAnswers: finalAnswers || answers,
        },
      });
      const payload = res?.result || res?.data || res;
      setResultPayload(payload);
      setRecommendations(payload?.recommendations || []);
      setCourses(payload?.courses || []);
      setUserSummary(payload?.userSummary || {});
      if (payload?.resultTitle) {
        setResultHeader({
          title: payload.resultTitle,
          subtitle: payload.resultSubtitle || "Academic Report",
        });
      }
    } catch (err) {
      console.error("Error fetching AI recommendations:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // 1. Fetch Workflow Definition on Mount
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setSubmitting(false);
    setHistory([]);
    setRecommendations(null);
    setCourses([]);
    setResultPayload(null);
    setSelectedOtherId(null);
    setOtherInputText("");
    setSearchFilter("");
    setSelectedMultiOptions([]);

    let defaultAnswers = {};
    if (toolSlug.includes("eligib")) {
      defaultAnswers.tool_category = "Check Eligibility";
    } else if (toolSlug.includes("uni")) {
      defaultAnswers.tool_category = "Suggest University";
    } else if (toolSlug.includes("course")) {
      defaultAnswers.tool_category = "Suggest Course";
    }
    setAnswers(defaultAnswers);

    dynamicRead({
      entity: "tool",
      endPoint: "public/by-slug",
      slug: toolSlug,
      revalidate: 0,
    })
      .then((data) => {
        if (!isMounted) return;
        const flowData = data?.result || data?.data || data;
        if (!flowData || !flowData.nodes) {
          throw new Error("Invalid flow data received");
        }
        setWorkflow(flowData);

        const nodes = flowData.nodes || [];
        const edges = flowData.edges || [];

        let startNode = null;
        if (toolSlug === "suggest-course") {
          startNode = nodes.find((n) => n.id === "node_profile") || nodes.find((n) => n.id === "node_sc_q1");
        } else if (toolSlug === "suggest-university") {
          startNode = nodes.find((n) => n.id === "node_profile") || nodes.find((n) => n.id === "node_su_q1");
        } else if (toolSlug === "check-eligibility") {
          startNode = nodes.find((n) => n.id === "node_profile") || nodes.find((n) => n.id === "node_ce_q1");
        }

        if (!startNode) {
          const startEdge = edges.find(
            (e) => e.source === "start" || e.source === flowData.startNodeId
          );
          startNode = startEdge ? nodes.find((n) => n.id === startEdge.target) : null;
        }

        if (!startNode) {
          startNode =
            nodes.find((n) => n.id === "node_q1_persona") ||
            nodes.find((n) => n.id === "node_step1_persona") ||
            nodes.find((n) => n.id === "node_step1_level") ||
            nodes.find((n) => n.type !== "start") ||
            nodes[0];
        }

        setCurrentNodeId(startNode?.id || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load AutoEngine tool workflow:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [toolSlug]);

  // Current Node Helper
  const currentNode = useMemo(() => {
    if (!workflow?.nodes || !currentNodeId) return null;
    return workflow.nodes.find((n) => n.id === currentNodeId) || null;
  }, [workflow, currentNodeId]);

  // Calculate Progress
  const progressPercent = useMemo(() => {
    if (recommendations) return 100;
    if (!history) return 20;
    return Math.min(25 + history.length * 25, 95);
  }, [history, recommendations]);

  // Options helpers
  const rawOptions = useMemo(() => {
    return currentNode?.data?.options || currentNode?.data?.branches || [];
  }, [currentNode]);

  const filteredOptions = useMemo(() => {
    if (!searchFilter.trim()) return rawOptions;
    const q = searchFilter.toLowerCase().trim();
    return rawOptions.filter((opt) => {
      const title =
        typeof opt === "object"
          ? opt.title || opt.name || opt.text || opt.label || ""
          : String(opt);
      return title.toLowerCase().includes(q);
    });
  }, [rawOptions, searchFilter]);

  // Handle Option Select
  const handleSelectOption = async (option, storeVariable, customText = "") => {
    const optValue = customText
      ? customText
      : typeof option === "object"
        ? option.title || option.text || option.id
        : option;
    const handleId = typeof option === "object" ? option.id || optValue : String(option);

    const updatedAnswers = {
      ...answers,
      [storeVariable || currentNodeId]: optValue,
      selectedOption: handleId,
    };
    if (storeVariable) {
      updatedAnswers[storeVariable] = optValue;
    }
    setAnswers(updatedAnswers);
    setSelectedOtherId(null);
    setOtherInputText("");
    setSearchFilter("");
    setSelectedMultiOptions([]);

    try {
      const edges = workflow?.edges || [];
      const nodes = workflow?.nodes || [];

      const outgoingEdges = edges.filter((e) => e.source === currentNodeId);
      let matchedEdge = outgoingEdges.find(
        (e) =>
          e.sourceHandle === handleId ||
          e.sourceHandle === optValue ||
          e.label === optValue ||
          (typeof option === "object" && option.id && e.sourceHandle === option.id)
      );

      if (!matchedEdge && outgoingEdges.length > 0 && updatedAnswers.tool_category) {
        matchedEdge = outgoingEdges.find(
          (e) =>
            e.sourceHandle === updatedAnswers.tool_category ||
            e.label === updatedAnswers.tool_category
        );
      }

      if (!matchedEdge && outgoingEdges.length > 0) {
        matchedEdge = outgoingEdges.find((e) => e.sourceHandle === "default") || outgoingEdges[0];
      }

      if (matchedEdge) {
        const nextNode = nodes.find((n) => n.id === matchedEdge.target);
        if (nextNode && nextNode.type !== "tool_lead_form") {
          setHistory((prev) => [...prev, currentNodeId]);
          setCurrentNodeId(nextNode.id);
          return;
        }
      }

      await fetchRecommendationsDirectly(updatedAnswers);
    } catch (err) {
      console.warn("Error finding next step, generating recommendations:", err);
      await fetchRecommendationsDirectly(updatedAnswers);
    }
  };

  // Multi-Select Handlers
  const handleToggleMultiOption = (optVal) => {
    setSelectedMultiOptions((prev) =>
      prev.includes(optVal) ? prev.filter((x) => x !== optVal) : [...prev, optVal]
    );
  };

  const handleMultiSelectSubmit = async () => {
    if (selectedMultiOptions.length === 0) return;
    const storeVar = currentNode?.data?.variable || currentNodeId;
    await handleSelectOption(
      selectedMultiOptions.join(", "),
      storeVar,
      selectedMultiOptions.join(", ")
    );
  };

  const handleBack = () => {
    if (recommendations) {
      setRecommendations(null);
      setCourses([]);
      setResultPayload(null);
      return;
    }
    if (history.length > 0) {
      const prevNodeId = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentNodeId(prevNodeId);
      setSelectedMultiOptions([]);
    }
  };

  const handleRestart = () => {
    setRecommendations(null);
    setCourses([]);
    setHistory([]);
    setResultPayload(null);
    setSelectedMultiOptions([]);
    const nodes = workflow?.nodes || [];
    let startNode = null;
    if (toolSlug === "suggest-course") {
      startNode = nodes.find((n) => n.id === "node_profile") || nodes.find((n) => n.id === "node_sc_q1");
    } else if (toolSlug === "suggest-university") {
      startNode = nodes.find((n) => n.id === "node_profile") || nodes.find((n) => n.id === "node_su_q1");
    } else if (toolSlug === "check-eligibility") {
      startNode = nodes.find((n) => n.id === "node_profile") || nodes.find((n) => n.id === "node_ce_q1");
    }
    if (!startNode) {
      startNode = nodes.find((n) => n.type !== "start") || nodes[0];
    }
    setCurrentNodeId(startNode?.id || null);
  };

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      {/* ─── 1. TOP DARK BLUE BANNER WITH PAGE TITLE & SUBTITLE ─── */}
      <div className="w-full bg-[#072C50] text-white pt-6 pb-20 sm:pt-8 sm:pb-24 md:pt-10 md:pb-28 px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Top Bar: Centered Pill Badge */}
          <div className="flex items-center justify-center mb-3 min-h-[36px]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-xs font-bold border border-amber-200">
              ✦ AI POWERED
            </span>
          </div>

          {/* Centered Page Title & Subtitle in White */}
          <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight m-0 leading-tight">
              {workflow?.name || toolTitle}
            </h1>

            <p className="text-blue-100/90 text-xs sm:text-sm md:text-base text-center max-w-2xl mx-auto m-0 leading-snug">
              {workflow?.description || toolDescription}
            </p>
          </div>
        </div>
      </div>

      {/* ─── 2. FLOATING WHITE CONTAINER CARD (STARTS DIRECTLY WITH QUESTION & OPTIONS) ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-2.5 sm:px-6 md:px-8 -mt-12 sm:-mt-16 md:-mt-20 pb-16 md:pb-24">
        <article className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 p-4 sm:p-8 md:p-10 text-[#2D3748]">

          {/* Body: Loading or Results or Questions */}
          {loading || submitting ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-[#072C50] border-t-transparent animate-spin" />
              <p className="text-sm font-bold text-slate-700">
                {submitting
                  ? "AI Engine is analyzing 150+ UGC-DEB verified universities for you..."
                  : "Loading interactive AI tool..."}
              </p>
              <p className="text-xs text-slate-400">
                Evaluating approvals, fees, placements, and eligibility...
              </p>
            </div>
          ) : recommendations ? (
            /* ===================================================== */
            /* 🏆 RECOMMENDATIONS & REPORT VIEW */
            /* ===================================================== */
            <div className="space-y-8">
              {/* Header Badge */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#072C50] text-white text-[11px] font-bold mb-2">
                    <Sparkles size={12} className="text-amber-300" />
                    <span>AI MATCH REPORT</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#072C50] m-0">
                    {resultHeader.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 m-0 mt-1">
                    {resultHeader.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Restart Search</span>
                </button>
              </div>

              {/* 🎓 1. RECOMMENDED COURSES */}
              {courses && courses.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#072C50] flex items-center gap-2">
                      <GraduationCap className="text-[#0B3B7E]" size={22} />
                      <span>Recommended Programs ({courses.length})</span>
                    </h3>
                    <span className="text-xs text-slate-500">
                      Based on your preferences
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {courses.map((course, idx) => (
                      <div
                        key={course._id || idx}
                        className="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 bg-white hover:shadow-lg transition-all flex flex-col justify-between gap-4 group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-[#072C50] group-hover:text-amber-400 text-[#072C50] flex items-center justify-center shrink-0 transition-all font-black text-sm">
                                {course.name?.slice(0, 3) || "DEG"}
                              </div>
                              <div>
                                <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0B3B7E] transition-colors leading-tight">
                                  {course.displayName || course.name}
                                </h4>
                                <span className="text-xs text-slate-500 font-medium">
                                  {course.duration || "2 Years (Online / Distance)"}
                                </span>
                              </div>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                              {course.matchScore || "95% Match"}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                            {course.description || "Top rated degree curriculum designed for career progression."}
                          </p>

                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {course.careerFit && (
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-700">
                                🎯 {course.careerFit}
                              </span>
                            )}
                            {course.eligibilityHint && (
                              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[10px] font-semibold text-blue-700">
                                📋 {course.eligibilityHint}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <span className="text-xs font-bold text-slate-900">
                            {course.averageFee
                              ? `₹${course.averageFee} Total Fees`
                              : "Affordable Fees"}
                          </span>
                          <Link
                            href={`/courses/${course.slug || "online-mba"}`}
                            className="px-3.5 py-1.5 rounded-lg bg-[#0B3B7E] hover:bg-[#072859] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                          >
                            <span>Explore Course</span>
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 🏛️ 2. RECOMMENDED UNIVERSITIES */}
              {recommendations && recommendations.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#072C50] flex items-center gap-2">
                      <School className="text-[#0B3B7E]" size={22} />
                      <span>Top Matching Universities ({recommendations.length})</span>
                    </h3>
                    <span className="text-xs text-slate-500">
                      UGC-DEB Entitled & Valid
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {recommendations.map((uni, idx) => (
                      <div
                        key={uni._id || idx}
                        className="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 bg-white hover:shadow-lg transition-all flex flex-col justify-between gap-4 group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              {uni.logo ? (
                                <div className="relative w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0">
                                  <Image
                                    src={getMediaUrl(uni.logo)}
                                    alt={uni.name}
                                    fill
                                    className="object-contain p-0.5"
                                  />
                                </div>
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#072C50] to-[#0D3B66] text-white flex items-center justify-center shrink-0 font-black text-sm">
                                  {uni.name?.slice(0, 2)?.toUpperCase()}
                                </div>
                              )}
                              <div>
                                <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0B3B7E] transition-colors leading-tight">
                                  {uni.name}
                                </h4>
                                <span className="text-xs text-slate-500 font-medium">
                                  {uni.location || uni.city || "Online & Distance"}
                                </span>
                              </div>
                            </div>

                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-50 text-[#0B3B7E] border border-blue-200 shrink-0">
                              {uni.matchScore || "98% Match"}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600">
                            {uni.naac && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold border border-amber-200">
                                NAAC {uni.naac}
                              </span>
                            )}
                            {uni.nirf && (
                              <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 font-bold border border-purple-200">
                                NIRF #{uni.nirf}
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                              UGC-DEB Approved
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <span className="text-xs font-bold text-slate-900">
                            {uni.fees || "Starting at ₹15,000/sem"}
                          </span>
                          <Link
                            href={`/universities/${uni.slug || ""}`}
                            className="px-3.5 py-1.5 rounded-lg bg-[#0B3B7E] hover:bg-[#072859] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                          >
                            <span>View Details</span>
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ===================================================== */
            /* ❓ INTERACTIVE QUESTION CARDS (NODE TRAVERSAL) */
            /* ===================================================== */
            <div className="space-y-8">
              {/* Question Heading with Back Icon (Between / Far-Left Back Icon + Centered Heading) */}
              <div className="relative flex items-center justify-center w-full mb-4 sm:mb-6 min-h-[32px] sm:min-h-[40px]">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 shrink-0 z-10">
                  {history.length > 0 && !recommendations ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="p-1 sm:p-1.5 text-[#072C50] hover:text-[#0B3B7E] active:scale-90 flex items-center justify-center transition-transform cursor-pointer"
                      title="Go Back to Previous Question"
                      aria-label="Back"
                    >
                      <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  ) : (
                    <Link
                      href="/tools"
                      className="p-1 sm:p-1.5 text-[#072C50] hover:text-[#0B3B7E] active:scale-90 flex items-center justify-center transition-transform cursor-pointer"
                      title="Back to All Tools"
                      aria-label="Back"
                    >
                      <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Link>
                  )}
                </div>

                <h2 className="text-xs min-[360px]:text-sm sm:text-2xl md:text-3xl font-bold text-[#072C50] text-center tracking-tight leading-snug m-0 w-full px-8 sm:px-16">
                  {currentNode?.data?.question ||
                    currentNode?.data?.title ||
                    "Choose Your Preference"}
                </h2>
              </div>

              {/* ─── OPTION CARDS (6 CARDS PER ROW ON DESKTOP, 4 ON MOBILE, ALWAYS CENTERED) ─── */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 w-full mx-auto max-w-6xl">
                {filteredOptions.map((option, oIdx) => {
                  const optTitle =
                    typeof option === "object"
                      ? option.title || option.name || option.text || option.label || ""
                      : String(option);
                  const optIconName = typeof option === "object" ? option.icon : null;
                  const IconComp = resolveOptionIcon(optTitle, optIconName, oIdx);
                  const optLogo = typeof option === "object" ? getMediaUrl(option.logo || option.image) : null;

                  const palette = CARD_PALETTES[oIdx % CARD_PALETTES.length];

                  const isMulti = Boolean(currentNode?.data?.isMultiSelect);
                  const isSelected = isMulti && selectedMultiOptions.includes(optTitle);

                  return (
                    <div
                      key={oIdx}
                      onClick={() => {
                        if (isMulti) {
                          handleToggleMultiOption(optTitle);
                        } else {
                          const storeVar =
                            currentNode?.data?.variable || currentNodeId;
                          handleSelectOption(option, storeVar);
                        }
                      }}
                      className={`relative w-[calc(25%-5px)] sm:w-28 md:w-32 lg:w-[calc(16.666%-9px)] lg:max-w-[145px] aspect-square bg-white rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2 sm:p-3 border flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all duration-200 hover:-translate-y-0.5 group shrink-0 ${isSelected
                        ? "border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/20 shadow-xs"
                        : "border-gray-200 hover:border-blue-500 hover:bg-gray-50/50"
                        }`}
                    >
                      <div className="flex flex-col items-center justify-center w-full">
                        {/* Icon Container */}
                        <div className="mb-1 sm:mb-1.5 group-hover:scale-110 transition-transform flex items-center justify-center shrink-0">
                          {optLogo ? (
                            <div className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 sm:w-8 sm:h-8 relative">
                              <Image
                                src={optLogo}
                                alt={optTitle}
                                fill
                                sizes="32px"
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <IconComp className={`w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 sm:w-8 sm:h-8 ${palette.text}`} />
                          )}
                        </div>

                        {/* Title */}
                        <div className="flex items-center justify-center w-full min-w-0 px-0.5 min-h-[22px] sm:min-h-[26px]">
                          <h3 className="text-[10px] min-[360px]:text-[11px] sm:text-[13px] font-bold text-[#0F172A] tracking-tight m-0 leading-tight w-full text-center line-clamp-2 group-hover:text-[#0B3B7E] transition-colors">
                            {optTitle}
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Multi-Select Floating / Bottom Continue Bar */}
              {currentNode?.data?.isMultiSelect && (
                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-500">
                    {selectedMultiOptions.length} option(s) selected
                  </span>
                  <button
                    type="button"
                    onClick={handleMultiSelectSubmit}
                    disabled={selectedMultiOptions.length === 0}
                    className="px-6 py-2.5 rounded-full bg-[#0B3B7E] hover:bg-[#072859] disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue with Selected</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
