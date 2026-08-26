"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const ToolWizardContext = createContext(null);

export function ToolWizardProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState("suggest-me-a-university");
  const [initialAnswers, setInitialAnswers] = useState({});

  /**
   * 🚀 Open Tool Wizard with optional pre-selected category/mode
   * @param {string} slugOrMode - e.g. 'suggest-university', 'suggest-course', or flow slug
   * @param {object} answers - pre-filled variables e.g. { tool_mode: 'Suggest University' }
   */
  const openTool = useCallback((slugOrMode = "suggest-me-a-university", answers = {}) => {
    let targetSlug = "suggest-me-a-university";
    let defaultAnswers = { ...answers };

    const lower = String(slugOrMode).toLowerCase().replace(/_/g, "-");

    if (lower.includes("uni") || lower === "suggest-university") {
      defaultAnswers.tool_mode = "Suggest University";
    } else if (lower.includes("course") || lower === "suggest-course") {
      defaultAnswers.tool_mode = "Suggest Course";
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
