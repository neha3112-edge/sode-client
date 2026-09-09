"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useToolWizard } from "./ToolWizardContext";
import { dynamicRead, dynamicPost } from "@/services/request";
import FormWrapper from "@/components/forms/FormWrapper";
import {
  X,
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
  Download,
  Scale,
  Headphones,
  Check,
  ShieldCheck,
  Building2,
  Layers,
  Clock,
  Code2,
  Tag,
  UserCheck,
  XCircle,
} from "lucide-react";

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

export default function AutoEngineToolModal() {
  const { isOpen, activeSlug, initialAnswers, closeTool } = useToolWizard();

  const [loading, setLoading] = useState(true);
  const [workflow, setWorkflow] = useState(null);
  const [history, setHistory] = useState([]); // Array of previous nodeIds
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState(null);
  const [courses, setCourses] = useState([]);
  const [userSummary, setUserSummary] = useState(null);
  const [resultHeader, setResultHeader] = useState({
    title: "Great! Ready to discover courses that match your preferences?",
    subtitle: "List of courses",
  });
  const [selectedOtherId, setSelectedOtherId] = useState(null);
  const [otherInputText, setOtherInputText] = useState("");

  // 1. Fetch Workflow Definition on Open
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);
    setHistory([]);
    setRecommendations(null);
    setCourses([]);
    setSelectedOtherId(null);
    setOtherInputText("");

    const mergedAnswers = { ...initialAnswers };
    setAnswers(mergedAnswers);

    dynamicRead({
      entity: "tool",
      endPoint: "public/by-slug",
      slug: activeSlug,
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

        // Determine First Step Node
        const startNode =
          nodes.find((n) => n.id === "node_q1_persona") ||
          nodes.find((n) => n.id === "node_step1_persona") ||
          nodes.find((n) => n.id === "node_step1_level") ||
          nodes.find((n) => n.type !== "start") ||
          nodes[0];

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
  }, [isOpen, activeSlug, initialAnswers]);

  // Current Node Helper
  const currentNode = useMemo(() => {
    if (!workflow?.nodes || !currentNodeId) return null;
    return workflow.nodes.find((n) => n.id === currentNodeId) || null;
  }, [workflow, currentNodeId]);

  // Calculate Progress
  const progressPercent = useMemo(() => {
    if (recommendations) return 100;
    if (!history) return 10;
    return Math.min(10 + history.length * 7.5, 95);
  }, [history, recommendations]);

  // Handle Option Select (Next Step Traversal)
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

    // Call Backend Step Evaluator or compute from graph
    try {
      const edges = workflow?.edges || [];
      const nodes = workflow?.nodes || [];

      // Find edge matching branch or handle
      const outgoingEdges = edges.filter((e) => e.source === currentNodeId);
      let matchedEdge = outgoingEdges.find(
        (e) =>
          e.sourceHandle === handleId ||
          e.sourceHandle === optValue ||
          e.label === optValue ||
          (typeof option === "object" && option.id && e.sourceHandle === option.id)
      );

      if (!matchedEdge && outgoingEdges.length > 0) {
        matchedEdge = outgoingEdges.find((e) => e.sourceHandle === "default") || outgoingEdges[0];
      }

      if (matchedEdge) {
        const nextNode = nodes.find((n) => n.id === matchedEdge.target);
        if (nextNode) {
          setHistory((prev) => [...prev, currentNodeId]);
          setCurrentNodeId(nextNode.id);
          return;
        }
      }
    } catch (err) {
      console.warn("Error finding next step, fallback to API:", err);
    }
  };

  // Handle Back Button
  const handleBack = () => {
    if (history.length > 0) {
      const prevId = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentNodeId(prevId);
      setSelectedOtherId(null);
      setOtherInputText("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200">
      {/* Background Click to Dismiss */}
      <div className="absolute inset-0" onClick={closeTool} />

      {/* Main Wizard Container */}
      <div className="relative z-10 w-full max-w-4xl lg:max-w-5xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* ========================================================= */}
        {/* HEADER BAR */}
        {/* ========================================================= */}
        <div className="relative px-3.5 sm:px-6 md:px-8 py-3 sm:py-4.5 bg-gradient-to-r from-slate-900 via-[#1e2f4d] to-slate-900 text-white flex items-center justify-between gap-2.5 sm:gap-4 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3.5 min-w-0 flex-1">
            {history.length > 0 && !recommendations && (
              <button
                onClick={handleBack}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer shrink-0 aspect-square"
                title="Go Back"
              >
                <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            )}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20 shrink-0 aspect-square">
              <Sparkles size={18} className="sm:w-5 sm:h-5 text-slate-950" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-base md:text-lg font-bold tracking-tight text-white leading-tight truncate">
                {recommendations
                  ? (resultHeader.title || "Great! Ready to discover courses that match your preferences?")
                  : (workflow?.name || "Suggest Course - AI Course Wizard")}
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-300 font-medium hidden sm:block truncate">
                {recommendations
                  ? (resultHeader.subtitle || "List of courses")
                  : (workflow?.description || "100% Free AI Course & College Suggestion Wizard")}
              </p>
            </div>
          </div>

          <button
            onClick={closeTool}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 aspect-square"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>

          {/* Progress Bar under header */}
          <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-white/15">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* CONTENT BODY */}
        {/* ========================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
              <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium">Loading AI Advisor Engine...</p>
            </div>
          ) : recommendations ? (
            /* ===================================================== */
            /* 🏆 RESULTS VIEW: LIST OF COURSES & UNIVERSITY MATCHES */
            /* ===================================================== */
            <div className="space-y-8">
              {/* Header Title & Subtitle as requested */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900 via-[#1e2f4d] to-slate-900 text-white relative overflow-hidden shadow-xl border border-slate-700/40">
                <div className="relative z-10 space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles size={14} className="text-amber-400" />
                    AI Academic Recommendation
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug">
                    {resultHeader.title || "Great! Ready to discover courses that match your preferences?"}
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-200 font-medium">
                    {resultHeader.subtitle || "List of courses"}
                  </p>
                </div>
              </div>

              {/* Profile Summary Badges */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-900 font-medium">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>
                    Profile: <strong>{userSummary?.persona || answers.user_persona || "Student / Professional"}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Goal: <strong>{userSummary?.careerGoal || answers.career_goal || "Career Growth"}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Budget: <strong>{userSummary?.budget || answers.budget_preference || "Flexible"}</strong>
                  </span>
                </div>
                <span className="bg-amber-200/80 text-amber-950 px-3 py-1 rounded-full font-bold text-xs">
                  {(courses?.length || 0) > 0 ? `${courses.length} Courses Matched` : `${recommendations.length} Universities Found`}
                </span>
              </div>

              {/* ===================================================== */}
              {/* 🎓 1. LIST OF RECOMMENDED COURSES */}
              {/* ===================================================== */}
              {courses && courses.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <GraduationCap className="text-blue-600" size={20} />
                      <span>Recommended Courses For You</span>
                    </h3>
                    <span className="text-xs text-slate-500">Based on your goals & skills</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map((course, idx) => (
                      <div
                        key={course._id || idx}
                        className="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 bg-white hover:shadow-lg transition-all flex flex-col justify-between gap-4 group"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center shrink-0 transition-all font-black text-sm">
                                {course.name || "UG"}
                              </div>
                              <div>
                                <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
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
                            {course.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {course.careerFit && (
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-700">
                                🎯 {course.careerFit}
                              </span>
                            )}
                            {course.skillsHighlighted && (
                              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[10px] font-semibold text-blue-700">
                                💡 {course.skillsHighlighted}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400 font-medium">
                            UGC-DEB Accredited Programs
                          </span>
                          <a
                            href={`/courses/${course.slug || ""}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs transition-colors flex items-center gap-1"
                          >
                            <span>Explore Course</span>
                            <ChevronRight size={13} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===================================================== */}
              {/* 🏛️ 2. TOP PARTNER UNIVERSITIES */}
              {/* ===================================================== */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <School className="text-blue-600" size={20} />
                    <span>Top Partner Universities Offering These Courses</span>
                  </h3>
                  <span className="text-xs text-slate-500">Government & NAAC A+ Approved</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {recommendations.map((uni, idx) => (
                    <div
                      key={uni._id || idx}
                      className="p-5 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
                    >
                      {/* Left: Logo & Details */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center shrink-0">
                          {uni.logo ? (
                            <img
                              src={uni.logo}
                              alt={uni.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <School className="text-slate-400" size={28} />
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {uni.name}
                            </h4>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xs">
                              {uni.matchScore} Match
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                            {uni.accreditations?.map((acc, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700"
                              >
                                {acc}
                              </span>
                            ))}
                            <span>• {uni.location}</span>
                          </div>
                          <div className="text-xs text-slate-600 space-y-0.5 pt-1">
                            {uni.matchHighlights?.slice(0, 2).map((h, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-slate-700">
                                <Check size={12} className="text-emerald-600 shrink-0" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Fees & Action Buttons */}
                      <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 shrink-0">
                        <div className="text-left md:text-right">
                          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                            No-Cost EMI
                          </span>
                          <span className="text-sm font-extrabold text-blue-700">
                            {uni.emiStartingAt}
                          </span>
                        </div>
                        <a
                          href={`/universities/${uni.slug || ""}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl bg-[#1e2f4d] hover:bg-[#16243c] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
                        >
                          <span>View Details</span>
                          <ChevronRight size={14} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Free Counselling Footer CTA */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                    <Headphones size={20} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">Need 1-on-1 Expert Course Guidance?</h5>
                    <p className="text-xs text-blue-200">
                      Talk to SODE senior academic counsellor for admission support & university comparison.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => alert("Our Senior Academic Counsellor will connect with you shortly!")}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  Request Call Back 📞
                </button>
              </div>
            </div>
          ) : currentNode?.type === "tool_lead_form" ? (
            /* ===================================================== */
            /* 📋 LEAD CAPTURE FORM STEP (USING SITE FORMWRAPPER) */
            /* ===================================================== */
            <div className="max-w-lg mx-auto py-2">
              <FormWrapper
                isModal={false}
                title={currentNode.data?.title || "Almost Done! Unlock Your Course Matches"}
                subtitle={currentNode.data?.subtitle || "Enter your contact details to generate personalized courses"}
                defaultCourse={answers.course_type || answers.Course_Name || ""}
                hideCourseField={true}
                formNameOverride={`SODE_AI_Wizard_${activeSlug}`}
                sourceOverride="Website AI Course Wizard"
                submitButtonText={currentNode.data?.submitButtonText || "Submit & Discover Courses 🚀"}
                redirectUrl=""
                onSuccess={async (leadPayload) => {
                  // Fetch AI Recommendations
                  try {
                    const res = await dynamicPost({
                      entity: "tool",
                      endPoint: "public/submit",
                      body: {
                        slug: activeSlug,
                        leadData: leadPayload || {},
                        userAnswers: answers,
                      },
                    });
                    const payload = res?.result || res?.data || res;
                    setRecommendations(payload?.recommendations || []);
                    setCourses(payload?.courses || []);
                    setUserSummary(payload?.userSummary || {});
                    if (payload?.resultTitle) {
                      setResultHeader({
                        title: payload.resultTitle,
                        subtitle: payload.resultSubtitle || "List of courses",
                      });
                    }
                  } catch (err) {
                    console.error("Error fetching AI recommendations:", err);
                  }
                }}
              />
            </div>
          ) : (
            /* ===================================================== */
            /* ❓ STEP QUESTION / BRANCH SELECTION CARDS */
            /* ===================================================== */
            <div className="space-y-5 sm:space-y-8">
              {/* Question Header */}
              <div className="space-y-1.5 sm:space-y-2 text-center max-w-2xl mx-auto">
                <span className="text-[10px] sm:text-xs font-extrabold tracking-wider text-blue-600 uppercase bg-blue-50 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full inline-block">
                  {currentNode?.ui?.title || "Step"}
                </span>
                <h3 className="text-base sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {currentNode?.data?.questionText ||
                    currentNode?.ui?.subtitle ||
                    currentNode?.name}
                </h3>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 md:gap-5">
                {(
                  currentNode?.data?.options ||
                  currentNode?.data?.branches ||
                  []
                ).map((opt, idx) => {
                  const optTitle =
                    typeof opt === "object"
                      ? opt.title || opt.text || opt.label || opt.name
                      : opt;
                  const optDesc =
                    typeof opt === "object" ? opt.description : null;
                  const IconComp =
                    typeof opt === "object" && opt.icon
                      ? iconMap[opt.icon] || School
                      : School;
                  const optId = typeof opt === "object" ? opt.id || optTitle : optTitle;

                  const isOtherOption =
                    (typeof opt === "object" && opt.hasDescriptionBox) ||
                    (typeof optTitle === "string" &&
                      (optTitle.toLowerCase().includes("description box") ||
                        optTitle.toLowerCase().includes("other :") ||
                        optTitle.toLowerCase() === "other"));

                  const isSelectedOther = selectedOtherId === optId;

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (isOtherOption) {
                          setSelectedOtherId(optId);
                        } else {
                          handleSelectOption(opt, currentNode?.data?.storeVariable);
                        }
                      }}
                      className={`p-3.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border transition-all text-left flex flex-col justify-between gap-3 group cursor-pointer ${
                        isSelectedOther
                          ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-300 shadow-md"
                          : "border-slate-200 sm:border-2 hover:border-blue-600 bg-white hover:bg-blue-50/40 hover:shadow-xl hover:-translate-y-1"
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 w-full">
                        <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center shrink-0 transition-all shadow-xs group-hover:scale-105 aspect-square">
                          <IconComp size={20} className="sm:w-6 sm:h-6" strokeWidth={2.2} />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 flex-1 min-w-0">
                          <h4 className="text-xs sm:text-base md:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                            {optTitle}
                          </h4>
                          {optDesc && (
                            <p className="text-[10px] sm:text-xs md:text-[13px] text-slate-500 font-normal leading-relaxed line-clamp-2">
                              {optDesc}
                            </p>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-400 flex items-center justify-center shrink-0 transition-all group-hover:translate-x-1 aspect-square">
                          <ChevronRight size={14} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                      </div>

                      {/* Description Box if selected */}
                      {isOtherOption && isSelectedOther && (
                        <div
                          className="w-full mt-2 pt-3 border-t border-blue-200/80 space-y-2 animate-in fade-in"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="text"
                            autoFocus
                            value={otherInputText}
                            onChange={(e) => setOtherInputText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleSelectOption(
                                  opt,
                                  currentNode?.data?.storeVariable,
                                  otherInputText.trim() || optTitle
                                );
                              }
                            }}
                            placeholder="Enter your specific details here..."
                            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 placeholder-slate-400 shadow-inner"
                          />
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[10px] text-slate-400">Press Enter or click Continue</span>
                            <button
                              type="button"
                              onClick={() =>
                                handleSelectOption(
                                  opt,
                                  currentNode?.data?.storeVariable,
                                  otherInputText.trim() || optTitle
                                )
                              }
                              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>Continue</span>
                              <ChevronRight size={13} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
