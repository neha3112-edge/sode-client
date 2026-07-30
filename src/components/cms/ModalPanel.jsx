"use client";

import React from "react";
import { Modal, Tooltip, Button } from "antd";
import moment from "moment";
import { useCrudContext } from "@/context/crud";
import CollapseBox from "./CollapsedBox";

/**
 * ModalPanel — Global CMS Form Container (Modal Mode)
 * Used when an entity config sets `openMode: "modal"` or `isModal: true`.
 * Plugs directly into global CrudContext pipeline.
 */
export default function ModalPanel({ config, topContent, bottomContent }) {
  const { ADD_NEW_ENTITY, ENTITY_NAME } = config;

  // =========================
  // CRUD CONTEXT
  // =========================
  const { state, crudContextAction } = useCrudContext();
  const { isPanelClose, isBoxCollapsed, isReadBoxOpen, current } = state;
  const { panel, collapsedBox } = crudContextAction;

  const currentRecord = current;

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
      <div className="flex items-center gap-2">
        <span className="capitalize font-semibold text-slate-800 text-base">
          {isBoxCollapsed ? `Edit ${ENTITY_NAME}` : `New ${ENTITY_NAME}`}
        </span>
      </div>

      {currentRecord?.createdAt && (
        <Tooltip title="Record Created On" placement="left">
          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md border border-blue-100">
            Created: {moment(currentRecord.createdAt).format("DD-MMM-YYYY")}
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
      <Button
        onClick={collapsePanel}
        className="rounded-xl border-slate-200 text-slate-600 font-medium hover:text-slate-800 h-9 px-4 cursor-pointer"
      >
        Cancel
      </Button>
      {!isReadBoxOpen && (
        <Button
          type="primary"
          htmlType="submit"
          form="cms-drawer-form"
          className="bg-[#4945ff] hover:!bg-[#3733dc] font-semibold rounded-xl border-none text-white h-9 px-5 shadow-xs cursor-pointer"
        >
          {isBoxCollapsed ? "Save Changes" : `Create ${ENTITY_NAME}`}
        </Button>
      )}
    </div>
  );

  return (
    <Modal
      title={titleContent}
      open={!isPanelClose}
      onCancel={collapsePanel}
      footer={footerContent}
      width={config.modalWidth || 620}
      centered
      destroyOnHidden
    >
      <div className="py-2">
        <CollapseBox
          buttonTitle={ADD_NEW_ENTITY}
          isCollapsed={isBoxCollapsed}
          onCollapse={collapsePanelBox}
          topContent={topContent}
          bottomContent={bottomContent}
        />
      </div>
    </Modal>
  );
}
