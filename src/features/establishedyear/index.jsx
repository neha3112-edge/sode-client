"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import EstablishedYearForm from "./form";
import { Tag } from "antd";

export default function EstablishedYearCmsIndex() {
  const entity = "establishedyear";

  const dataTableColumns = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      render: (text, record) => (
        <div>
          <div className="font-bold text-slate-800 text-sm">{text}</div>
          <div className="text-xs text-slate-400 font-mono">/{record.slug}</div>
        </div>
      ),
    },
    {
      title: "Display Title",
      dataIndex: "title",
      key: "title",
      render: (title) => (title ? <Tag color="blue">{title}</Tag> : "-"),
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
    PANEL_TITLE: "Established Years Management",
    DATATABLE_TITLE: "Established Years",
    ADD_NEW_ENTITY: "Add New Established Year",
    ENTITY_NAME: "Established Year",
    CREATE_ENTITY: "Save Established Year",
    UPDATE_ENTITY: "Update Established Year",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<EstablishedYearForm />}
      updateForm={<EstablishedYearForm isUpdateForm={true} />}
      config={config}
    />
  );
}
