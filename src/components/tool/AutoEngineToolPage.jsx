"use client";

import React, { useState, useEffect, useMemo } from "react";
import { dynamicRead, dynamicPost } from "@/services/request";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import { Checkbox } from "antd";

const getMediaUrl = (obj) => obj?.url || obj?.path || obj?.src || obj || null;
const getOptionTitle = (opt) => opt?.title || opt?.name || opt?.label || opt || "";
const getOptionId = (opt) => opt?.id || getOptionTitle(opt);

// Helper to check if a node is a lead form or final action node
const isLeadOrEndNode = (n) => {
  if (!n) return true;
  const nType = (n.type || "").toLowerCase();
  const dType = (n.data?.type || "").toLowerCase();
  const nId = (n.id || "").toLowerCase();
  const category = (n.category || "").toUpperCase();
  return (
    nType === "tool_lead_form" ||
    dType === "tool_lead_form" ||
    nType === "tool_recommendation" ||
    dType === "tool_recommendation" ||
    nId.includes("lead_form") ||
    nId.includes("leadform") ||
    nId.includes("result") ||
    nId.includes("submit") ||
    category === "ACTIONS"
  );
};

// Helper to determine initial workflow start node (100% dynamic for any tool)
const getStartNode = (nodes = [], edges = [], startNodeId = null) => {
  let startNode = null;

  // 1. Direct edge from 'start' or startNodeId
  const sId = startNodeId || "start";
  const startEdge = edges.find((e) => e.source === sId || e.source === "start");
  if (startEdge) {
    startNode = nodes.find((n) => n.id === startEdge.target);
  }

  // 2. Direct startNodeId match
  if (!startNode && startNodeId) {
    startNode = nodes.find((n) => n.id === startNodeId && n.type !== "start" && n.id !== "start");
  }

  // 3. First non-start, non-action question node
  if (!startNode) {
    startNode = nodes.find(
      (n) => n.type !== "start" && n.id !== "start" && n.category !== "ACTIONS" && !isLeadOrEndNode(n)
    );
  }

  return startNode || nodes.find((n) => n.type !== "start") || nodes[0] || null;
};

// Helper to match outgoing edge from canvas connections
const findMatchingEdge = (outgoingEdges = [], optValue = "", optionObj = null, optIndex = -1, currentNodeId = "") => {
  if (!outgoingEdges || outgoingEdges.length === 0) return null;

  // Linear flow: single outgoing edge
  if (outgoingEdges.length === 1) {
    return outgoingEdges[0];
  }

  const clean = (val) => String(val || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "");
  const targetClean = clean(optValue);
  const targetRawId = String(optionObj?.id || optionObj?.value || optionObj?._id || "").trim();
  const targetRawClean = clean(targetRawId);

  // 1. Exact match on sourceHandle or label
  let matched = outgoingEdges.find((e) => {
    const s = String(e.sourceHandle || "").trim();
    const l = String(e.label || "").trim();
    return s === optValue || l === optValue || (targetRawId && (s === targetRawId || l === targetRawId));
  });
  if (matched) return matched;

  // 2. Case-insensitive / normalized alphanumeric match (e.g. 'Working Professional' vs 'working_professional')
  matched = outgoingEdges.find((e) => {
    const sClean = clean(e.sourceHandle);
    const lClean = clean(e.label);
    const idClean = clean(e.id);
    return (
      (sClean && targetClean && (sClean === targetClean || sClean.includes(targetClean) || targetClean.includes(sClean))) ||
      (lClean && targetClean && (lClean === targetClean || lClean.includes(targetClean) || targetClean.includes(lClean))) ||
      (targetRawClean && (sClean === targetRawClean || lClean === targetRawClean)) ||
      (idClean && targetClean && idClean.includes(targetClean))
    );
  });
  if (matched) return matched;

  // 3. Branch index match (handles branch_0, branch_1, source_0, source-1, etc.)
  if (optIndex >= 0) {
    matched = outgoingEdges.find((e) => {
      const s = String(e.sourceHandle || "").toLowerCase().trim();
      return (
        s === `branch_${optIndex}` ||
        s === `branch_${optIndex + 1}` ||
        s === `source_${optIndex}` ||
        s === `source_${optIndex + 1}` ||
        s === `${currentNodeId}-source-${optIndex + 1}` ||
        s === String(optIndex) ||
        s === String(optIndex + 1)
      );
    });
    if (matched) return matched;
  }

  // 4. Fallback: Default / Else / generic handle
  matched = outgoingEdges.find((e) => {
    const s = String(e.sourceHandle || "").toLowerCase().trim();
    return s === "default" || s === "else" || s === "fallback";
  });
  if (matched) return matched;

  matched = outgoingEdges.find((e) => {
    const s = String(e.sourceHandle || "").toLowerCase().trim();
    return s === "source" || s === "" || !e.sourceHandle;
  });
  if (matched) return matched;

  return outgoingEdges[0] || null;
};

export default function AutoEngineToolPage({ toolSlug = "suggest-university" }) {
  const [loading, setLoading] = useState(true);
  const [workflow, setWorkflow] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedMultiOptions, setSelectedMultiOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Directly fetch recommendations without showing lead form and immediately redirect to backend target page
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
      const targetDestination =
        payload?.redirectUrl ||
        payload?.targetPage ||
        (toolSlug?.includes("universit") ? "/universities" : "/courses");

      if (typeof window !== "undefined") {
        window.location.href = targetDestination;
      }
    } catch (err) {
      console.error("Error submitting tool answers:", err);
      const fallback = toolSlug?.includes("universit") ? "/universities" : "/courses";
      if (typeof window !== "undefined") {
        window.location.href = fallback;
      }
    }
  };

  // 1. Fetch Workflow Definition on Mount
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setSubmitting(false);
    setHistory([]);
    setSearchFilter("");
    setSelectedMultiOptions([]);
    setSelectedOption("");
    setAnswers({});

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

        const startNode = getStartNode(flowData.nodes, flowData.edges, flowData.startNodeId);
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

  // Options helpers
  const rawOptions = useMemo(() => {
    return currentNode?.data?.options || currentNode?.data?.branches || [];
  }, [currentNode]);

  const filteredOptions = useMemo(() => {
    const q = searchFilter.trim().toLowerCase();
    return q ? rawOptions.filter((opt) => getOptionTitle(opt).toLowerCase().includes(q)) : rawOptions;
  }, [rawOptions, searchFilter]);

  // Handle Option Select
  const handleSelectOption = async (option, storeVariable, customText = "") => {
    const optValue = customText || getOptionTitle(option);
    const handleId = getOptionId(option);

    // Resolve original option object and index from rawOptions
    const optIndex = rawOptions.findIndex((opt) => {
      const t = getOptionTitle(opt);
      const id = getOptionId(opt);
      return (
        t === optValue ||
        id === handleId ||
        t.toLowerCase().trim() === optValue.toLowerCase().trim() ||
        id.toLowerCase().trim() === handleId.toLowerCase().trim()
      );
    });
    const optionObj = optIndex >= 0 ? rawOptions[optIndex] : (typeof option === "object" ? option : null);

    const updatedAnswers = {
      ...answers,
      [storeVariable || currentNodeId]: optValue,
      selectedOption: handleId,
    };
    if (storeVariable) updatedAnswers[storeVariable] = optValue;

    setAnswers(updatedAnswers);
    setSearchFilter("");
    setSelectedMultiOptions([]);
    setSelectedOption("");

    try {
      const edges = workflow?.edges || [];
      const nodes = workflow?.nodes || [];

      const outgoingEdges = edges.filter((e) => e.source === currentNodeId);
      const matchedEdge = findMatchingEdge(outgoingEdges, optValue, optionObj, optIndex, currentNodeId);

      if (matchedEdge) {
        const nextNode = nodes.find((n) => n.id === matchedEdge.target);
        if (nextNode && !isLeadOrEndNode(nextNode)) {
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

  // Auto-fetch recommendations if current node is a lead form or end step
  useEffect(() => {
    if (currentNode && isLeadOrEndNode(currentNode) && !loading && !submitting) {
      fetchRecommendationsDirectly(answers);
    }
  }, [currentNode, loading, submitting]);

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

  // Clear selected options when currentNodeId changes
  useEffect(() => {
    setSelectedOption("");
    setSelectedMultiOptions([]);
  }, [currentNodeId]);

  const handleSingleSelectSubmit = async () => {
    if (!selectedOption) return;
    const storeVar = currentNode?.data?.variable || currentNodeId;
    await handleSelectOption(selectedOption, storeVar);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevNodeId = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentNodeId(prevNodeId);
      setSelectedMultiOptions([]);
      setSelectedOption("");
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      {/* ─── 1. TOP DARK BLUE BANNER ─── */}
      <div className="w-full bg-[#072C50] h-36 sm:h-44 md:h-52" />
      {/* ─── 2. FLOATING WHITE CONTAINER CARD ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 -mt-20 sm:-mt-28 md:-mt-32 pb-16 md:pb-24">
        <article className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10 md:p-12 text-[#2D3748]">
          {/* Top Bar with Back Button on Left and Centered AI Powered Badge */}
          <div className="relative flex items-center justify-center mb-2 min-h-8">
            {history.length > 0 && !submitting && (
              <button
                type="button"
                onClick={handleBack}
                className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl text-xs font-semibold text-slate-600 hover:text-[#072C50] hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            )}
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-xs font-bold border border-amber-200">
              ✦ AI POWERED
            </span>
          </div>

          {/* Body: Loading or Submitting Redirect or Questions */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-[#072C50] border-t-transparent animate-spin" />
              <p className="text-sm font-bold text-slate-700">Loading interactive tool...</p>
            </div>
          ) : submitting ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-12 h-12 rounded-full border-4 border-[#072C50] border-t-transparent animate-spin" />
              <p className="text-base font-bold text-slate-800">
                Filtering options based on your choices...
              </p>
              <p className="text-xs text-slate-500 max-w-sm">
                Redirecting you to the filtered directory matching your preferences...
              </p>
            </div>
          ) : (
            /* ===================================================== */
            /* ❓ INTERACTIVE QUESTION CARDS (NODE TRAVERSAL) */
            /* ===================================================== */
            <div className="space-y-8">
              {/* Question Heading */}
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#072C50] tracking-tight leading-tight m-0">
                  {currentNode?.data?.question ||
                    currentNode?.data?.title ||
                    "Choose Your Preference"}
                </h1>

                {currentNode?.data?.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-500 m-0">
                    {currentNode?.data?.subtitle}
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

              {/* ─── SCROLLABLE CONTAINER FOR OPTIONS ─── */}
              {rawOptions.length > 0 && (
                <div className="overflow-y-auto max-h-110 pr-1.5 sm:pr-2 py-1">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 items-stretch">
                    {filteredOptions.map((option, oIdx) => {
                      const optTitle = getOptionTitle(option);
                      const isMulti = Boolean(currentNode?.data?.isMultiSelect);
                      const isSelected = isMulti ? selectedMultiOptions.includes(optTitle) : selectedOption === optTitle;

                      return (
                        <div
                          key={oIdx}
                          onClick={() => (isMulti ? handleToggleMultiOption(optTitle) : setSelectedOption(optTitle))}
                          className={`relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border transition-all duration-200 cursor-pointer flex items-center justify-center text-center group h-[72px] sm:h-20 select-none ${isSelected
                            ? "border-[#1677ff] bg-blue-50/40 shadow-sm ring-2 ring-[#1677ff]/20"
                            : "border-slate-200 hover:border-[#1677ff]/60 hover:shadow-md hover:bg-slate-50/30"
                            }`}
                        >
                          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
                            <Checkbox checked={isSelected} className="pointer-events-none scale-95 sm:scale-100" />
                          </div>

                          <div className="w-full px-2">
                            <h2 className={`text-xs sm:text-sm font-bold tracking-tight m-0 leading-snug line-clamp-2 transition-colors ${isSelected ? "text-[#0B3B7E]" : "text-slate-800 group-hover:text-[#1677ff]"}`}>
                              {optTitle}
                            </h2>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ─── BOTTOM ACTION FOOTER (UNIFIED CONTINUE BUTTON) ─── */}
              <div className="pt-6 mt-4 flex items-center justify-end border-t border-slate-100">
                {rawOptions.length === 0 || isLeadOrEndNode(currentNode) ? (
                  <button
                    type="button"
                    onClick={() => fetchRecommendationsDirectly(answers)}
                    disabled={submitting}
                    className="px-8 py-3 rounded-xl bg-[#0B3B7E] hover:bg-[#072859] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <span>{submitting ? "Redirecting..." : "View Matching Results"}</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={currentNode?.data?.isMultiSelect ? handleMultiSelectSubmit : handleSingleSelectSubmit}
                    disabled={currentNode?.data?.isMultiSelect ? selectedMultiOptions.length === 0 : !selectedOption}
                    className="px-8 py-3 rounded-xl bg-[#0B3B7E] hover:bg-[#072859] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue</span>
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
