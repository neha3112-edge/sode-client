"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const ToolWizardContext = createContext(null);

export function ToolWizardProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState("suggest-course");
  const [initialAnswers, setInitialAnswers] = useState({});

  /**
   * 🚀 Open Tool Wizard with optional pre-selected category/mode
   * @param {string} slugOrMode - e.g. 'suggest-course', 'suggest-university', or flow slug
   * @param {object} answers - pre-filled variables e.g. { tool_mode: 'Suggest Course' }
   */
  const openTool = useCallback((slugOrMode = "suggest-course", answers = {}) => {
    let targetSlug = "suggest-course";
    let defaultAnswers = { ...answers };

    const lower = String(slugOrMode).toLowerCase().replace(/_/g, "-");

    if (lower.includes("course") || lower === "suggest-course") {
      targetSlug = "suggest-course";
      defaultAnswers.tool_mode = "Suggest Course";
    } else if (lower.includes("uni") || lower === "suggest-university" || lower === "suggest-me-a-university") {
      targetSlug = "suggest-course";
      defaultAnswers.tool_mode = "Suggest University";
    }

    setActiveSlug(targetSlug);
    setInitialAnswers(defaultAnswers);
    setIsOpen(true);
  }, []);

  const closeTool = useCallback(() => {
    setIsOpen(false);
    setInitialAnswers({});
  }, []);

  return (
    <ToolWizardContext.Provider
      value={{
        isOpen,
        activeSlug,
        initialAnswers,
        openTool,
        closeTool,
      }}
    >
      {children}
    </ToolWizardContext.Provider>
  );
}

export function useToolWizard() {
  const context = useContext(ToolWizardContext);
  if (!context) {
    return {
      isOpen: false,
      activeSlug: "suggest-me-a-university",
      initialAnswers: {},
      openTool: () => {},
      closeTool: () => {},
    };
  }
  return context;
}
