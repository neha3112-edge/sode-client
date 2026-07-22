"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import LocationForm from "./form";
import { Tag } from "antd";

export default function LocationCmsIndex() {
  const entity = "location";

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
      title: "City & State",
      dataIndex: "city",
      key: "city",
      render: (city) =>
        city ? (
          <div>
            <Tag color="cyan">{city.name || "City"}</Tag>
            {city.state && (
              <span className="text-[10px] text-slate-400 block mt-0.5">
                ({city.state.name || "State"})
              </span>
            )}
          </div>
        ) : (
          <span className="text-slate-400 text-xs">-</span>
        ),
    },
    {
      title: "Pincode",
      dataIndex: "pincode",
      key: "pincode",
      width: 140,
      render: (pin) =>
        pin ? (
          <Tag color="blue">{pin.code || pin.pincode || "Code"}</Tag>
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
    PANEL_TITLE: "Location Management",
    DATATABLE_TITLE: "Global Locations",
    ADD_NEW_ENTITY: "Add New Location",
    ENTITY_NAME: "Location",
    CREATE_ENTITY: "Save Location",
    UPDATE_ENTITY: "Update Location",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<LocationForm />}
      updateForm={<LocationForm isUpdateForm={true} />}
      config={config}
    />
  );
}
