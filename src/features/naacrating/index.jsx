"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import NaacRatingForm from "./form";
import { Tag } from "antd";

export default function NaacRatingCmsIndex() {
  const entity = "naacrating";

  const dataTableColumns = [
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      render: (text, record) => (
        <div>
          <div className="font-bold text-slate-800 text-sm">{text}</div>
          <div className="text-xs text-slate-400 font-mono">/{record.slug}</div>
        </div>
      ),
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      width: 140,
      render: (score) => (score ? <Tag color="gold">{score}</Tag> : "-"),
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
    PANEL_TITLE: "NAAC Rating Management",
    DATATABLE_TITLE: "NAAC Grades",
    ADD_NEW_ENTITY: "Add New NAAC Grade",
    ENTITY_NAME: "NAAC Rating",
    CREATE_ENTITY: "Save NAAC Grade",
    UPDATE_ENTITY: "Update NAAC Grade",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<NaacRatingForm />}
      updateForm={<NaacRatingForm isUpdateForm={true} />}
      config={config}
    />
  );
}
