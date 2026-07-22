"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import CountryForm from "./form";
import { Tag } from "antd";

export default function CountryCmsIndex() {
  const entity = "country";

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
    PANEL_TITLE: "Country Management",
    DATATABLE_TITLE: "Global Countries",
    ADD_NEW_ENTITY: "Add New Country",
    ENTITY_NAME: "Country",
    CREATE_ENTITY: "Save Country",
    UPDATE_ENTITY: "Update Country",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<CountryForm />}
      updateForm={<CountryForm isUpdateForm={true} />}
      config={config}
    />
  );
}
