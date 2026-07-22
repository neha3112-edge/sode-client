"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import CityForm from "./form";
import { Tag } from "antd";

export default function CityCmsIndex() {
  const entity = "city";

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
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (state) =>
        state ? (
          <div>
            <Tag color="cyan">{state.name || "State"}</Tag>
            {state.country && (
              <span className="text-[10px] text-slate-400 block mt-0.5">
                ({state.country.name || "Country"})
              </span>
            )}
          </div>
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
    PANEL_TITLE: "City Management",
    DATATABLE_TITLE: "Global Cities",
    ADD_NEW_ENTITY: "Add New City",
    ENTITY_NAME: "City",
    CREATE_ENTITY: "Save City",
    UPDATE_ENTITY: "Update City",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<CityForm />}
      updateForm={<CityForm isUpdateForm={true} />}
      config={config}
    />
  );
}
