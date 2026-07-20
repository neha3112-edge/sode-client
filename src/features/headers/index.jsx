"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import HeaderForm from "./form";
import { Tag } from "antd";

export default function HeaderCmsIndex() {
  const entity = "header";

  const dataTableColumns = [
    {
      title: "Navigation Label",
      dataIndex: "label",
      key: "label",
      render: (text, record) => (
        <div>
          <div className="font-bold text-slate-800 text-sm">{text}</div>
          <div className="text-xs text-slate-400 font-mono">{record.href}</div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "enabled",
      key: "enabled",
      width: 100,
      render: (enabled) => (
        <Tag color={enabled !== false ? "green" : "red"}>
          {enabled !== false ? "Active" : "Disabled"}
        </Tag>
      ),
    },
    {
      title: "Sort Order",
      dataIndex: "order",
      key: "order",
      width: 100,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date) => (date ? moment(date).format("DD-MM-YYYY") : "-"),
    },
  ];

  const readColumns = [...dataTableColumns];

  const labels = {
    PANEL_TITLE: "Header Navigation Management",
    DATATABLE_TITLE: "Header Menu Items List",
    ADD_NEW_ENTITY: "Add New Header Link",
    ENTITY_NAME: "Header Navigation",
    CREATE_ENTITY: "Save Header Link",
    UPDATE_ENTITY: "Update Header Link",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<HeaderForm />}
      updateForm={<HeaderForm isUpdateForm={true} />}
      config={config}
    />
  );
}
