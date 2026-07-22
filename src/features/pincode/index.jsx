"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import PincodeForm from "./form";
import { Tag } from "antd";

export default function PincodeCmsIndex() {
  const entity = "pincode";

  const dataTableColumns = [
    {
      title: "Pincode Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <span className="font-mono font-bold text-slate-800">{text}</span>,
    },
    {
      title: "City",
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
    PANEL_TITLE: "Pincode Management",
    DATATABLE_TITLE: "Global Pincodes",
    ADD_NEW_ENTITY: "Add New Pincode",
    ENTITY_NAME: "Pincode",
    CREATE_ENTITY: "Save Pincode",
    UPDATE_ENTITY: "Update Pincode",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<PincodeForm />}
      updateForm={<PincodeForm isUpdateForm={true} />}
      config={config}
    />
  );
}
