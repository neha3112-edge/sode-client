"use client"; // Next.js Client Component के लिए जरूरी है

import React from "react";
import { Drawer, Tooltip, Button } from "antd";
import moment from "moment";
import { useCrudContext } from "@/context/crud";
import CollapseBox from "./CollapsedBox";

export default function SidePanel({ config, topContent, bottomContent }) {
  const { ADD_NEW_ENTITY, ENTITY_NAME, entity } = config;

  // =========================
  // CRUD CONTEXT
  // =========================
  const { state, crudContextAction } = useCrudContext();
  const { isPanelClose, isBoxCollapsed, isReadBoxOpen, current } = state;
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
    <div className="flex justify-between items-center px-1 py-1 w-full select-none gap-3">
      <div className="flex items-center gap-3">
        <span className="capitalize font-medium text-gray-700 text-base tracking-wide">
          {ENTITY_NAME} Panel
        </span>
      </div>

      {student?.createdAt && (
        <Tooltip title="Record Created On" placement="left">
          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md border border-blue-100">
            Created: {moment(student.createdAt).format("DD-MMM-YYYY")}
          </span>
        </Tooltip>
      )}
    </div>
  );

  // =========================
  // FOOTER CONTENT
  // =========================
  const footerContent = (
    <div className="flex justify-end items-center gap-2 px-2 py-1 select-none">
      <Button onClick={collapsePanel} className="rounded-lg">
        Close
      </Button>
      {!isReadBoxOpen && (
        <Button
          type="primary"
          htmlType="submit"
          form="cms-drawer-form"
          className="rounded-lg font-semibold"
        >
          {isBoxCollapsed ? "Save" : "Submit"}
        </Button>
      )}
    </div>
  );

  // =========================
  // DYNAMIC DRAWER WIDTH
  // =========================
  let drawerWidth = 580;

  // READ VIEW WIDTH
  if (isReadBoxOpen) {
    drawerWidth = 1000;
  }

  // ENTITY BASED SPECIAL WIDTHS (Active Project Entities Only)
  if (entity === "universities" || entity === "university") {
    drawerWidth = 1350;
  }
  if (entity === "courses" || entity === "course" || entity === "partnercourses" || entity === "partnercourse") {
    drawerWidth = 850;
  }
  if (entity === "sitesetting") {
    drawerWidth = 800;
  }
  if (entity === "pagemeta") {
    drawerWidth = 750;
  }
  if (entity === "user" || entity === "users") {
    drawerWidth = 700;
  }
  if (
    entity === "workspace" ||
    entity === "tenant" ||
    entity === "sidebar" ||
    entity === "header"
  ) {
    drawerWidth = 650;
  }

  return (
    <Drawer
      title={titleContent}
      placement="right"
      closable={false}
      onClose={collapsePanel}
      open={!isPanelClose}
      size={drawerWidth}
      footer={footerContent}
      destroyOnHidden
      styles={{
        body: {
          padding: isReadBoxOpen ? 0 : "16px",
          backgroundColor: "#FFFFFF",
        },
        header: {
          padding: "8px 16px",
          borderBottom: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        },
        footer: {
          padding: "12px 16px",
          borderTop: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
        },
      }}
    >
      <div className="transition-all duration-300 ease-in-out">
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
