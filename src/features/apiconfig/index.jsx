"use strict";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import ApiConfigForm from "./form";
import { Tag } from "antd";

export default function ApiConfigCmsIndex() {
  const entity = "apiconfig";

  const dataTableColumns = [
    {
      title: "Config Name & Key",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-medium text-slate-800 text-sm">{text}</div>
          <div className="text-xs text-slate-500 font-mono font-medium">key: {record.key}</div>
        </div>
      ),
    },
    {
      title: "Method & Endpoint",
      dataIndex: "endpoint",
      key: "endpoint",
      render: (endpoint, record) => {
        const method = record.method || "POST";
        const color =
          method === "GET"
            ? "blue"
            : method === "POST"
            ? "green"
            : method === "PUT" || method === "PATCH"
            ? "orange"
            : "red";
        return (
          <div className="flex items-center gap-1.5 font-medium">
            <Tag color={color} className="font-medium text-[10px]">
              {method}
            </Tag>
            <span className="text-xs font-mono font-medium text-slate-700 truncate max-w-[180px]" title={`${record.baseUrl}${endpoint || ""}`}>
              {endpoint || record.baseUrl || "/"}
            </span>
          </div>
        );
      },
    },
    {
      title: "Trigger Action",
      dataIndex: "triggerEvent",
      key: "triggerEvent",
      width: 140,
      render: (trigger) => <Tag color="purple" className="font-medium">{trigger || "lead_submission"}</Tag>,
    },
    {
      title: "Environment",
      dataIndex: "environment",
      key: "environment",
      width: 110,
      render: (env) => {
        const color = env === "production" ? "green" : env === "staging" ? "orange" : "blue";
        return <Tag color={color} className="font-medium">{env ? env.toUpperCase() : "PROD"}</Tag>;
      },
    },
    {
      title: "Auth Type",
      dataIndex: "authType",
      key: "authType",
      width: 100,
      render: (auth) => <Tag color="cyan" className="font-medium">{auth || "apiKey"}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "enabled",
      key: "enabled",
      width: 100,
      render: (enabled) => (
        <Tag color={enabled !== false ? "green" : "red"} className="font-medium">
          {enabled !== false ? "Active" : "Disabled"}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date) => (date ? <span className="text-xs font-medium text-slate-700">{moment(date).format("DD-MM-YYYY")}</span> : "-"),
    },
  ];

  const readColumns = [...dataTableColumns];

  const labels = {
    PANEL_TITLE: "API Configuration Management",
    DATATABLE_TITLE: "API Configurations List",
    ADD_NEW_ENTITY: "Add New API Config",
    ENTITY_NAME: "API Config",
    CREATE_ENTITY: "Save API Config",
    UPDATE_ENTITY: "Update API Config",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<ApiConfigForm />}
      updateForm={<ApiConfigForm isUpdateForm={true} />}
      config={config}
    />
  );
}
