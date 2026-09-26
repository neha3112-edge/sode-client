"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { dynamicRead, dynamicPost } from "@/services/request";
import {
  ArrowLeft,
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
      {/* ─── 1. TOP DARK BLUE BANNER (Matching Tools & Accreditations) ─── */}
      <div className="w-full bg-[#072C50] h-36 sm:h-44 md:h-52" />

      {/* ─── 2. FLOATING WHITE CONTAINER CARD ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 -mt-20 sm:-mt-28 md:-mt-32 pb-16 md:pb-24">
        <article className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10 md:p-12 text-[#2D3748]">
          {/* Centered Pill Badge */}
          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-xs font-bold border border-amber-200">
              ✦ AI POWERED
            </span>
          </div>

          {/* Centered Page Title inside the card */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#072C50] text-center tracking-tight m-0 mb-3">
            {workflow?.name || toolTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-xs sm:text-sm md:text-base text-center max-w-2xl mx-auto m-0 mb-6">
            {workflow?.description || toolDescription}
          </p>

          {/* Full-width Divider Line */}
          <div className="w-full h-px bg-slate-200/90 mb-6 sm:mb-8" />

          {/* Step Progress & Navigation Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 sm:p-4">
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {history.length > 0 && !recommendations ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#072C50] text-xs font-bold border border-slate-200 transition-all cursor-pointer shadow-2xs"
                  title="Go Back to Previous Question"
                >
                  <ArrowLeft size={14} />
                  <span>Previous Step</span>
                </button>
              ) : (
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#072C50] text-xs font-bold border border-slate-200 transition-all cursor-pointer shadow-2xs"
                >
                  <ArrowLeft size={14} />
                  <span>All AI Tools</span>
                </Link>
              )}

              <span className="text-xs font-bold text-slate-700">
                {recommendations
                  ? "Academic Match Report"
                  : `Step ${history.length + 1} of 4`}
              </span>
            </div>

            <div className="w-full sm:w-64 flex items-center gap-3">
              <div className="flex-1 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-blue-600 to-[#072C50] transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-extrabold text-[#072C50] shrink-0">
                {Math.round(progressPercent)}%
              </span>
            </div>
          </div>

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
                                    src={uni.logo}
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
              {/* Question Heading */}
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-[#072C50] text-xs font-bold border border-blue-100 uppercase tracking-wide">
                  <span>{currentNode?.data?.badge || "YOUR PROFILE"}</span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#072C50] tracking-tight leading-tight m-0">
                  {currentNode?.data?.question ||
                    currentNode?.data?.title ||
                    "Choose Your Preference"}
                </h2>

                {currentNode?.data?.subtitle ? (
                  <p className="text-xs sm:text-sm text-slate-500 m-0">
                    {currentNode?.data?.subtitle}
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-400 m-0">
                    Select an option below to find universities aligned with your path.
                  </p>
                )}
              </div>

              {/* Search filter for large option lists */}
              {rawOptions.length > 8 && (
                <div className="max-w-md mx-auto relative mb-6">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#072C50] transition-colors"
                  />
                </div>
              )}

              {/* ─── GRID OF OPTION CARDS (EQUAL HEIGHT & ALIGNED LIKE TOOLSVIEW) ─── */}
              <div
                className={`grid gap-4 sm:gap-5 items-stretch ${
                  filteredOptions.length <= 4
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    : filteredOptions.length <= 6
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {filteredOptions.map((option, oIdx) => {
                  const optTitle =
                    typeof option === "object"
                      ? option.title || option.name || option.text || option.label || ""
                      : String(option);
                  const optSub =
                    typeof option === "object" ? option.subtitle || option.desc : null;
                  const optIconName = typeof option === "object" ? option.icon : null;
                  const IconComp = iconMap[optIconName] || iconMap["School"];

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
                      className={`relative bg-white rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-xl border flex flex-col items-center text-center justify-between transition-all duration-300 hover:-translate-y-1 group h-full cursor-pointer ${
                        isSelected
                          ? "border-[#0B3B7E] ring-2 ring-[#0B3B7E]/20 bg-blue-50/20"
                          : "border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      {/* Top Right Sparkle */}
                      <span
                        className={`absolute top-3.5 right-3.5 ${palette.sparkle} font-black text-xs group-hover:rotate-12 transition-transform`}
                      >
                        ✦
                      </span>

                      <div className="flex flex-col items-center w-full">
                        {/* Fixed Height Icon Container */}
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
                          <IconComp className={`w-7 h-7 ${palette.text}`} />
                        </div>

                        {/* Fixed Height Title Container */}
                        <div className="w-full min-h-8 flex items-center justify-center mb-1">
                          <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight m-0 leading-tight w-full text-center">
                            <span
                              className={`border-b-2 ${palette.underline} pb-0.5 inline-block group-hover:text-[#0B3B7E] transition-colors`}
                            >
                              {optTitle}
                            </span>
                          </h3>
                        </div>

                        {/* Fixed Height Description Container */}
                        <div className="w-full min-h-12 flex items-center justify-center">
                          <p className="text-[#64748B] text-xs leading-relaxed font-normal m-0 line-clamp-2 text-center">
                            {optSub ||
                              "Tailored university options and admission criteria"}
                          </p>
                        </div>
                      </div>

                      {/* Pinned Bottom Button */}
                      <div className="w-full mt-auto pt-4">
                        <div
                          className={`w-full py-2.5 px-4 rounded-full text-white font-bold text-xs shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer truncate ${
                            isSelected
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : "bg-[#0B3B7E] hover:bg-[#072859]"
                          }`}
                        >
                          <span className="truncate">
                            {isSelected ? "Selected ✓" : optTitle}
                          </span>
                          <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] shrink-0 group-hover:translate-x-0.5 transition-transform">
                            →
                          </span>
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

          {/* ─── 4. BOTTOM FREE COUNSELING CALLOUT CARD (Matching ToolsView) ─── */}
          <div className="mt-12 bg-gradient-to-r from-[#072C50] to-[#0D3B66] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="text-center md:text-left space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Need Personalized Guidance?</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white m-0">
                Talk to Our Expert Academic Counselors
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 m-0 max-w-xl">
                Get 100% free guidance on selecting the right university, course eligibility, fees structure, and EMI options.
              </p>
            </div>

            <Link
              href="/contact-us"
              className="bg-[#f97316] hover:bg-[#ea580c] text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-md transition-all hover:scale-105 inline-flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Get Free Consultation</span>
              <ArrowRightOutlined />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
