"use client"; // Next.js Client Component के लिए जरूरी है

import React from "react";
import { Drawer, Tooltip } from "antd";
import moment from "moment";
import { useCrudContext } from "@/context/crud"; // ⚡ Redux हटाया, केवल CrudContext का उपयोग किया
import CollapseBox from "./CollapsedBox";

export default function SidePanel({ config, topContent, bottomContent }) {
  const { ADD_NEW_ENTITY, ENTITY_NAME, entity } = config;
  // =========================
  // CRUD CONTEXT
  // =========================
  const { state, crudContextAction } = useCrudContext();
  const { isPanelClose, isBoxCollapsed, isReadBoxOpen, current } = state; // ⚡ FIXED: Redux की जगह current को context state से निकाला
  const { panel, collapsedBox } = crudContextAction;

  const student = current;

  // =========================
  // ACTIONS
  // =========================
  const collapsePanel = () => {
    if (panel && typeof panel.close === "function") {
      panel.close();
    } else if (panel && typeof panel.collapse === "function") {
      panel.collapse();
    }
  };

  const collapsePanelBox = () => {
    if (collapsedBox && typeof collapsedBox.collapse === "function") {
      collapsedBox.collapse();
    }
  };

  // =========================
  // TITLE CONTENT
  // =========================
  const titleContent = (
    <div className="flex justify-between items-center px-2 py-1 w-full select-none">
      <span className="capitalize font-bold text-gray-700 text-sm tracking-wide">
        {ENTITY_NAME} Panel
      </span>

      {student?.createdAt && (
        <Tooltip title="Student Record Created On" placement="left">
          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md border border-blue-100">
            Created: {moment(student.createdAt).format("DD-MMM-YYYY")}
          </span>
        </Tooltip>
      )}
    </div>
  );

  // =========================
  // DYNAMIC DRAWER WIDTH
  // =========================
  let drawerWidth = 380;

  // READ VIEW WIDTH
  if (isReadBoxOpen) {
    drawerWidth = 1000;
  }

  // ENTITY BASED SPECIAL WIDTHS
  if (entity === "applications") {
    drawerWidth = 1200;
  }
  if (entity === "incentives") {
    drawerWidth = 750;
  }
  if (entity === "webhooks-generate-sode") {
    drawerWidth = 1250;
  }
  if (entity === "universities") {
    drawerWidth = 1350;
  }
  if (entity === "ivr-calls") {
    drawerWidth = 700;
  }

  return (
    <Drawer
      title={titleContent}
      placement="right"
      closable={true}
      onClose={collapsePanel}
      open={!isPanelClose}
      size={drawerWidth}
      destroyOnHidden
      styles={{
        body: {
          padding: isReadBoxOpen ? 0 : "16px",
          backgroundColor: "#FFFFFF",
        },
        header: {
          padding: "14px 16px",
          borderBottom: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        },
      }}
    >
      <div className={`transition-all duration-300 ease-in-out`}>
        <CollapseBox
          buttonTitle={ADD_NEW_ENTITY}
          isCollapsed={isBoxCollapsed}
          onCollapse={collapsePanelBox}
          topContent={topContent}
          bottomContent={bottomContent}
        />
      </div>
    </Drawer>
  );
}
