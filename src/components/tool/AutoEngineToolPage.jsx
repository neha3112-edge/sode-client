"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  toolSlug = "",
  toolTitle = "",
  toolDescription = "",
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

  // Directly fetch recommendations: tools wali API par slug aur ?q= laga kar
  const fetchRecommendationsDirectly = useCallback(
    async (finalAnswers) => {
      setSubmitting(true);
      try {
        const answersObj = finalAnswers || answers;

        // Extract query terms from what the user selected in the tool
        const queryTokens = [];

        const isFiller = (v) => {
          if (!v || typeof v !== "string") return true;
          const s = v.toLowerCase().trim();
          return ["no preference", "other", "all", "any", "default", "none"].includes(s);
        };

        const courseVal = answersObj.course || answersObj.Course || answersObj.check_course;
        if (courseVal && typeof courseVal === "string" && !isFiller(courseVal)) {
          queryTokens.push(courseVal.trim());
        }

        const specVal = answersObj.career_goal || answersObj.Specialization || answersObj.specialization || answersObj.subcourse;
        if (specVal && typeof specVal === "string" && !isFiller(specVal)) {
          queryTokens.push(specVal.trim());
        }

        const streamVal = answersObj.last_stream || answersObj.domain || answersObj.stream || answersObj.field;
        if (streamVal && typeof streamVal === "string" && !isFiller(streamVal)) {
          queryTokens.push(streamVal.trim());
        }

        const levelVal = answersObj.course_type || answersObj.degree_level || answersObj.program_level;
        if (levelVal && typeof levelVal === "string" && !isFiller(levelVal)) {
          queryTokens.push(levelVal.trim());
        }

        Object.entries(answersObj).forEach(([k, v]) => {
          if (!v || typeof v !== "string" || ["tool_category", "selectedOption"].includes(k)) return;
          const t = v.trim();
          if (!isFiller(t) && !queryTokens.some((tok) => tok.toLowerCase() === t.toLowerCase())) {
            queryTokens.push(t);
          }
        });

        const searchQuery = queryTokens.join(" ").trim();

        // Tools wali API par slug aur ?q= lagana
        const endPointWithQ = searchQuery
          ? `public/submit?q=${encodeURIComponent(searchQuery)}`
          : "public/submit";

        const res = await dynamicPost({
          entity: "tool",
          endPoint: endPointWithQ,
          body: {
            slug: toolSlug || "",
            q: searchQuery,
            leadData: {},
            userAnswers: answersObj,
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
    },
    [toolSlug, answers]
  );

  // 1. Fetch Workflow Definition on Mount
  useEffect(() => {
    let isMounted = true;

    const loadWorkflow = async () => {
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
      setAnswers({});

      try {
        const data = await dynamicRead({
          entity: "tool",
          endPoint: "public/by-slug",
          slug: toolSlug || "",
          revalidate: 0,
        });
        if (!isMounted) return;
        const flowData = data?.result || data?.data || data;
        if (!flowData || !flowData.nodes) {
          throw new Error("Invalid flow data received");
        }
        setWorkflow(flowData);

        const nodes = flowData.nodes || [];
        const edges = flowData.edges || [];

        // Dynamic start node resolution: find the first question node via the start edge
        let startNode = null;
        const startEdge = edges.find(
          (e) => e.source === "start" || (flowData.startNodeId && e.source === flowData.startNodeId)
        );
        if (startEdge) {
          startNode = nodes.find((n) => n.id === startEdge.target);
        }

        if (!startNode && flowData.startNodeId && flowData.startNodeId !== "start") {
          startNode = nodes.find((n) => n.id === flowData.startNodeId);
        }

        // Fallback: find the first node with options that is not the 'start' trigger
        if (!startNode) {
          startNode = nodes.find(
            (n) =>
              n.id !== "start" &&
              n.type !== "start" &&
              n.data?.type !== "start" &&
              (n.data?.options?.length > 0 || n.data?.branches?.length > 0)
          );
        }

        if (!startNode) {
          startNode = nodes.find((n) => n.id !== "start" && n.type !== "start") || nodes[0];
        }

        setCurrentNodeId(startNode?.id || null);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load AutoEngine tool workflow:", err);
        if (isMounted) setLoading(false);
      }
    };

    loadWorkflow();

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

  // Tool Type Visibility Rules:
  // - Course Recommender tool -> shows Courses only
  // - University Recommender tool -> shows Universities only
  // - Eligibility Checker -> shows Eligibility Report & Universities
  const shouldShowCourses = useMemo(() => {
    if (resultPayload?.resultType === "course_list") return true;
    if (resultPayload?.resultType === "university_list" || resultPayload?.resultType === "eligibility_report") return false;
    const slug = String(toolSlug || workflow?.slug || "").toLowerCase();
    if (slug.includes("uni")) return false;
    return Boolean(courses && courses.length > 0);
  }, [resultPayload, toolSlug, workflow?.slug, courses]);

  const shouldShowUniversities = useMemo(() => {
    if (resultPayload?.resultType === "university_list" || resultPayload?.resultType === "eligibility_report") return true;
    if (resultPayload?.resultType === "course_list") return false;
    const slug = String(toolSlug || workflow?.slug || "").toLowerCase();
    if (slug.includes("course") && !slug.includes("uni")) return false;
    return Boolean(recommendations && recommendations.length > 0);
  }, [resultPayload, toolSlug, workflow?.slug, recommendations]);

  // Auto-trigger recommendation fetch if current node is an action/end/lead node
  useEffect(() => {
    if (!currentNode || loading || submitting || resultPayload) return;
    const opts = currentNode.data?.options || currentNode.data?.branches || [];
    const isEnd =
      currentNode.type === "tool_lead_form" ||
      currentNode.data?.type === "tool_lead_form" ||
      currentNode.type === "tool_recommendation" ||
      currentNode.data?.type === "tool_recommendation" ||
      currentNode.category === "ACTIONS" ||
      currentNode.id === "node_lead_form" ||
      currentNode.id?.toLowerCase().includes("lead") ||
      currentNode.id?.toLowerCase().includes("result") ||
      (!Array.isArray(opts) || opts.length === 0);

    if (isEnd && Object.keys(answers).length > 0) {
      const timer = setTimeout(() => {
        fetchRecommendationsDirectly(answers);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentNode, loading, submitting, resultPayload, answers, fetchRecommendationsDirectly]);

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
        const isEndNode =
          !nextNode ||
          nextNode.type === "tool_lead_form" ||
          nextNode.data?.type === "tool_lead_form" ||
          nextNode.type === "tool_recommendation" ||
          nextNode.data?.type === "tool_recommendation" ||
          nextNode.category === "ACTIONS" ||
          nextNode.id === "node_lead_form" ||
          nextNode.id?.toLowerCase().includes("lead") ||
          nextNode.id?.toLowerCase().includes("result") ||
          !(nextNode.data?.options?.length > 0 || nextNode.data?.branches?.length > 0);

        if (nextNode && !isEndNode) {
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
    setAnswers({});

    const nodes = workflow?.nodes || [];
    const edges = workflow?.edges || [];

    // Dynamic start node discovery from graph definition
    let startNode = null;
    const startEdge = edges.find(
      (e) => e.source === "start" || (workflow?.startNodeId && e.source === workflow.startNodeId)
    );
    if (startEdge) {
      startNode = nodes.find((n) => n.id === startEdge.target);
    }
    if (!startNode && workflow?.startNodeId && workflow.startNodeId !== "start") {
      startNode = nodes.find((n) => n.id === workflow.startNodeId);
    }
    if (!startNode) {
      startNode = nodes.find(
        (n) =>
          n.id !== "start" &&
          n.type !== "start" &&
          n.data?.type !== "start" &&
          (n.data?.options?.length > 0 || n.data?.branches?.length > 0)
      );
    }
    if (!startNode) {
      startNode = nodes.find((n) => n.id !== "start" && n.type !== "start") || nodes[0];
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
          ) : (resultPayload || recommendations) ? (
            /* ===================================================== */
            /* 🏆 RECOMMENDATIONS & REPORT VIEW */
            /* ===================================================== */
            <div className="space-y-8">
              {/* 🛡️ ELIGIBILITY BREAKDOWN (When Running Check Eligibility) */}
              {resultPayload?.criteriaChecks && resultPayload.criteriaChecks.length > 0 && (
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <h4 className="text-sm font-bold text-[#072C50] flex items-center gap-2 m-0">
                    <ShieldCheck size={18} className="text-emerald-600" />
                    <span>Eligibility Verification Breakdown</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {resultPayload.criteriaChecks.map((c, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border flex flex-col justify-between gap-1.5 ${c.status === "passed"
                          ? "bg-emerald-50/50 border-emerald-200 text-emerald-900"
                          : c.status === "provisional"
                            ? "bg-amber-50/50 border-amber-200 text-amber-900"
                            : "bg-rose-50/50 border-rose-200 text-rose-900"
                          }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold">{c.criterion}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase shrink-0 ${c.status === "passed"
                              ? "bg-emerald-100 text-emerald-800"
                              : c.status === "provisional"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-rose-100 text-rose-800"
                              }`}
                          >
                            {c.status === "passed"
                              ? "Verified"
                              : c.status === "provisional"
                                ? "Provisional"
                                : "Not Met"}
                          </span>
                        </div>
                        <p className="text-[11px] opacity-90 m-0 leading-snug">{c.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 🎓 1. RECOMMENDED COURSES (For Course Suggestion Tool) */}
              {shouldShowCourses && courses && courses.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#072C50] flex items-center gap-2">
                      <GraduationCap className="text-[#0B3B7E]" size={22} />
                      <span>Recommended Programs ({courses.length})</span>
                    </h3>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleRestart}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all shrink-0 cursor-pointer"
                      >
                        <RotateCcw size={13} />
                        <span>Restart</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {courses.map((course, idx) => {
                      const courseLogoUrl = getMediaUrl(course.logo || course.header_logo);
                      const courseTitle = course.displayName || course.name || "Program";
                      const courseActionUrl = course.actionUrl || `/courses?course=${encodeURIComponent(course.slug || "")}`;

                      return (
                        <div
                          key={course._id || idx}
                          className="bg-white border border-slate-200/90 hover:border-blue-500 rounded-xl p-3 hover:shadow-md transition-all flex flex-col justify-between group"
                        >
                          <div>
                            {/* Course Icon & Details Row */}
                            <div className="flex items-start gap-2.5">
                              {/* Direct Course Model Logo without bg / padding */}
                              <Link
                                href={courseActionUrl}
                                className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-start group-hover:scale-105 transition-transform mt-0.5"
                              >
                                {courseLogoUrl ? (
                                  <Image
                                    src={courseLogoUrl}
                                    alt={courseTitle}
                                    fill
                                    unoptimized
                                    sizes="36px"
                                    className="object-contain object-left"
                                  />
                                ) : (
                                  <span className="text-xs font-black text-[#072C50] tracking-tight">
                                    {course.name?.slice(0, 4) || "DEG"}
                                  </span>
                                )}
                              </Link>

                              {/* Course Title & Fees Range right under it */}
                              <div className="min-w-0 flex-1">
                                <Link
                                  href={courseActionUrl}
                                  className="block group-hover:text-[#0B57D0] transition-colors"
                                >
                                  <h4
                                    className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug truncate m-0 group-hover:text-[#0B57D0] transition-colors"
                                    title={courseTitle}
                                  >
                                    {courseTitle}
                                  </h4>
                                </Link>

                                {/* Fees Range directly under Course Title */}
                                <div className="mt-0.5">
                                  <span
                                    className="text-[10.5px] sm:text-[11px] font-bold text-emerald-700 block truncate"
                                    title={course.feeRange || course.startingFee || "Affordable Fees"}
                                  >
                                    {course.feeRange || course.startingFee || "Affordable Fees"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Metadata Badges: Starts below the logo in a flex row */}
                            <div className="flex items-center gap-2 mt-2 pt-0.5 text-[10px] text-slate-500 font-medium">
                              {course.duration && (
                                <span className="inline-flex items-center gap-1 text-slate-500 shrink-0">
                                  <svg className="w-3 h-3 text-slate-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                  </svg>
                                  <span>{course.duration}</span>
                                </span>
                              )}
                              {course.specializationsCount > 0 && (
                                <span className="inline-flex items-center gap-1 text-slate-500 truncate">
                                  <svg className="w-3 h-3 text-slate-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                  </svg>
                                  <span className="truncate">{course.specializationsCount} Specialisation</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Bottom Row: Only View Course → */}
                          <div className="pt-2 mt-2 border-t border-slate-100/80 flex items-center justify-end">
                            <Link
                              href={courseActionUrl}
                              className="text-[10.5px] sm:text-[11px] font-bold text-slate-900 hover:text-[#0B57D0] flex items-center gap-1 transition select-none"
                            >
                              <span>View Course</span>
                              <span className="text-[12px] leading-none transition-transform group-hover:translate-x-0.5">→</span>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 🏛️ 2. RECOMMENDED UNIVERSITIES (For University Suggestion Tool) */}
              {shouldShowUniversities && recommendations && recommendations.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#072C50] flex items-center gap-2">
                      <School className="text-[#0B3B7E]" size={22} />
                      <span>Top Matching Universities ({recommendations.length})</span>
                    </h3>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleRestart}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all shrink-0 cursor-pointer"
                      >
                        <RotateCcw size={13} />
                        <span>Restart</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {recommendations.map((uni, idx) => {
                      const uniLogoUrl = getMediaUrl(uni.logo);
                      const uniTitle = uni.name || "University";
                      const uniActionUrl = uni.actionUrl || `/universities/${uni.slug || ""}`;
                      const uniLocation =
                        uni.location ||
                        [uni.city?.name || (typeof uni.city === "string" ? uni.city : null), uni.state?.name || (typeof uni.state === "string" ? uni.state : null)]
                          .filter(Boolean)
                          .join(", ") ||
                        "India";

                      return (
                        <div
                          key={uni._id || idx}
                          className="bg-white border border-slate-200/90 hover:border-blue-500 rounded-xl p-3 hover:shadow-md transition-all flex flex-col justify-between group"
                        >
                          <div>
                            {/* University Icon & Details Row */}
                            <div className="flex items-start gap-2.5">
                              {/* Direct University Model Logo without bg / padding */}
                              <Link
                                href={uniActionUrl}
                                className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-start group-hover:scale-105 transition-transform mt-0.5"
                              >
                                {uniLogoUrl ? (
                                  <Image
                                    src={uniLogoUrl}
                                    alt={uniTitle}
                                    fill
                                    unoptimized
                                    sizes="36px"
                                    className="object-contain object-left"
                                  />
                                ) : (
                                  <span className="text-xs font-black text-[#072C50] tracking-tight">
                                    {uni.name?.slice(0, 4)?.toUpperCase() || "UNI"}
                                  </span>
                                )}
                              </Link>

                              {/* University Title & Fees directly under it */}
                              <div className="min-w-0 flex-1">
                                <Link
                                  href={uniActionUrl}
                                  className="block group-hover:text-[#0B57D0] transition-colors"
                                >
                                  <h4
                                    className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug truncate m-0 group-hover:text-[#0B57D0] transition-colors"
                                    title={uniTitle}
                                  >
                                    {uniTitle}
                                  </h4>
                                </Link>

                                {/* Fees directly under University Title */}
                                <div className="mt-0.5">
                                  <span
                                    className="text-[10.5px] sm:text-[11px] font-bold text-emerald-700 block truncate"
                                    title={uni.fees || uni.startingFee || "Affordable Fees"}
                                  >
                                    {uni.fees || uni.startingFee || "Affordable Fees"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Metadata Badges: Location & NAAC Accreditation */}
                            <div className="flex items-center gap-1.5 mt-2 pt-0.5 text-[10px] text-slate-500 font-medium">
                              {uniLocation && (
                                <span
                                  className="inline-flex items-center gap-1 text-slate-500 truncate min-w-0 flex-1"
                                  title={uniLocation}
                                >
                                  <svg className="w-3 h-3 text-slate-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                  </svg>
                                  <span className="truncate">{uniLocation}</span>
                                </span>
                              )}
                              {uni.naac && (
                                <span className="inline-flex items-center gap-0.5 text-amber-700 font-bold shrink-0">
                                  <svg className="w-3 h-3 text-amber-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span>{uni.naac}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Bottom Row: Only View University → */}
                          <div className="pt-2 mt-2 border-t border-slate-100/80 flex items-center justify-end">
                            <Link
                              href={uniActionUrl}
                              className="text-[10.5px] sm:text-[11px] font-bold text-slate-900 hover:text-[#0B57D0] flex items-center gap-1 transition select-none"
                            >
                              <span>View University</span>
                              <span className="text-[12px] leading-none transition-transform group-hover:translate-x-0.5">→</span>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ===================================================== */
            /* ❓ INTERACTIVE QUESTION CARDS (NODE TRAVERSAL) */
            /* ===================================================== */
            <div className="space-y-8">
              {/* Question Heading with Back Icon (Always aligned with Line 1) */}
              <div className="relative flex items-center justify-center w-full mb-4 sm:mb-6">
                <div className="absolute left-0 top-0 h-[20px] min-[360px]:h-[22px] sm:h-[30px] md:h-[34px] flex items-center justify-center shrink-0 z-10">
                  {history.length > 0 && !recommendations ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="p-0 text-[#072C50] hover:text-[#0B3B7E] active:scale-90 flex items-center justify-center transition-transform cursor-pointer"
                      title="Go Back to Previous Question"
                      aria-label="Back"
                    >
                      <ArrowLeft className="w-[17px] h-[17px] sm:w-5 sm:h-5" />
                    </button>
                  ) : (
                    <Link
                      href="/tools"
                      className="p-0 text-[#072C50] hover:text-[#0B3B7E] active:scale-90 flex items-center justify-center transition-transform cursor-pointer"
                      title="Back to All Tools"
                      aria-label="Back"
                    >
                      <ArrowLeft className="w-[17px] h-[17px] sm:w-5 sm:h-5" />
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
