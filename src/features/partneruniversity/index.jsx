"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import PartnerUniversityForm from "./form";
import { Tag } from "antd";

export default function PartnerUniversityCmsIndex() {
  const entity = "partneruniversity";

  const dataTableColumns = [
    {
      title: "University Name",
      dataIndex: "university",
      key: "university",
      render: (university, record) => {
        const u = typeof university === "object" ? university : {};
        const name = u.name || record.name || "N/A";
        const slug = u.slug || record.slug || "";
        return (
          <div>
            <div className="font-bold text-slate-800 text-sm">{name}</div>
            <div className="text-xs text-slate-400 font-mono">/{slug}</div>
          </div>
        );
      },
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
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      width: 100,
      render: (featured) => (
        <Tag color={featured ? "volcano" : "default"}>
          {featured ? "Featured" : "Standard"}
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
    PANEL_TITLE: "Partner Universities Management",
    DATATABLE_TITLE: "Website Partner Universities List",
    ADD_NEW_ENTITY: "Add New Partner University",
    ENTITY_NAME: "Partner University",
    CREATE_ENTITY: "Save Partner University",
    UPDATE_ENTITY: "Update Partner University",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<PartnerUniversityForm />}
      updateForm={<PartnerUniversityForm isUpdateForm={true} />}
      config={config}
    />
  );
}
