"use client";

import React, { useEffect } from "react";
import { useToolWizard } from "@/components/tool/ToolWizardContext";
import { Container } from "@/components/common/Container";
import { Sparkles, ArrowRight, GraduationCap } from "lucide-react";

export default function SuggestCoursePage() {
  const { openTool } = useToolWizard();

  useEffect(() => {
    openTool("suggest-me-a-university", { tool_mode: "Suggest Course" });
  }, [openTool]);

  return (
    <div className="min-h-[70vh] py-16 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
      <Container>
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white mx-auto flex items-center justify-center font-bold shadow-lg shadow-blue-600/30">
            <GraduationCap size={32} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Suggest Me A Course & Career Path
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Get personalized academic and career counseling to choose the right degree, executive certification, or specialization.
          </p>

          <button
            onClick={() =>
              openTool("suggest-me-a-university", { tool_mode: "Suggest Course" })
            }
            className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3 cursor-pointer"
          >
            <span>Start AI Course Wizard</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </Container>
    </div>
  );
}
