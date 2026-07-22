"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import StateForm from "./form";
import { Tag } from "antd";

export default function StateCmsIndex() {
  const entity = "state";

  const dataTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-bold text-slate-800 text-sm">{text}</div>
          <div className="text-xs text-slate-400 font-mono">/{record.slug}</div>
        </div>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (country) =>
        country ? (
          <Tag color="blue">{country.name || "Country"}</Tag>
        ) : (
          <span className="text-slate-400 text-xs">-</span>
        ),
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      render: (text) => <span className="text-xs text-slate-500">{text || "-"}</span>,
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
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date) => (date ? moment(date).format("DD-MM-YYYY") : "-"),
    },
  ];

  const readColumns = [...dataTableColumns];

  const labels = {
    PANEL_TITLE: "State Management",
    DATATABLE_TITLE: "Global States",
    ADD_NEW_ENTITY: "Add New State",
    ENTITY_NAME: "State",
    CREATE_ENTITY: "Save State",
    UPDATE_ENTITY: "Update State",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<StateForm />}
      updateForm={<StateForm isUpdateForm={true} />}
      config={config}
    />
  );
}
