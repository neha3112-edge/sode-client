"use client";

import React, { useEffect } from "react";
import { useToolWizard } from "@/components/tool/ToolWizardContext";
import { Container } from "@/components/common/Container";
import { Sparkles, ArrowRight, ShieldCheck, School } from "lucide-react";

export default function SuggestUniversityPage() {
  const { openTool } = useToolWizard();

  useEffect(() => {
    openTool("suggest-me-a-university", { tool_mode: "Suggest University" });
  }, [openTool]);

  return (
    <div className="min-h-[70vh] py-16 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
      <Container>
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 mx-auto flex items-center justify-center font-bold shadow-lg shadow-amber-400/30">
            <Sparkles size={32} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Suggest Me A University
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Discover top UGC-DEB approved online & distance universities matched with your career goals, budget, and learning preferences.
          </p>

          <button
            onClick={() =>
              openTool("suggest-me-a-university", { tool_mode: "Suggest University" })
            }
            className="px-8 py-4 rounded-2xl bg-[#1e2f4d] hover:bg-[#16243c] text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3 cursor-pointer"
          >
            <span>Start AI University Wizard</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </Container>
    </div>
  );
}
