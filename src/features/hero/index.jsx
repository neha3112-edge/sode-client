"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import HeroForm from "./form";
import { Tag, Switch } from "antd";
import { getAssetPath } from "@/lib/utils";

export default function HeroCmsIndex() {
  const entity = "hero";

  const dataTableColumns = [
    {
      title: "Active",
      dataIndex: "enabled",
      width: 75,
      key: "enabled",
      render: (value) => <Switch checked={value} disabled size="small" />,
    },
    {
      title: "Name / Identifier",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-bold text-slate-800 text-sm">{text}</div>
          <div className="text-xs text-slate-400 mt-0.5">
            Page Slug:{" "}
            <Tag color="geekblue" className="text-[10px] font-bold m-0 uppercase">
              {record.page || "home"}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Display Mode",
      dataIndex: "isCarousel",
      key: "isCarousel",
      width: 150,
      render: (isCarousel, record) =>
        isCarousel ? (
          <Tag color="purple" className="font-bold text-xs py-0.5">
            🎠 Carousel ({record.slides?.length || 0} slides)
          </Tag>
        ) : (
          <Tag color="blue" className="font-bold text-xs py-0.5">
            🖼️ Single Banner
          </Tag>
        ),
    },
    {
      title: "Main Heading",
      dataIndex: "title",
      key: "title",
      render: (text, record) => {
        const displayTitle =
          text || record.slides?.[0]?.title || "Hero Banner Title";
        return (
          <div
            className="text-xs font-semibold text-slate-700 max-w-xs line-clamp-2"
            title={displayTitle}
          >
            {displayTitle}
          </div>
        );
      },
    },
    {
      title: "Desktop & Mobile Media",
      key: "mediaAssets",
      width: 170,
      render: (_, record) => {
        const desktopObj = record.isCarousel
          ? record.slides?.[0]?.bgImage
          : record.bgImage;
        const mobileObj = record.isCarousel
          ? record.slides?.[0]?.mobileImage
          : record.mobileImage;

        const desktopUrl = getAssetPath(desktopObj);
        const mobileUrl = getAssetPath(mobileObj);

        return (
          <div className="flex items-center gap-2">
            {desktopUrl ? (
              <div className="w-8 h-8 rounded border border-slate-200 bg-slate-800 overflow-hidden" title="Desktop Background">
                <img src={desktopUrl} alt="Desktop" className="w-full h-full object-cover" />
              </div>
            ) : (
              <Tag color="default" className="text-[10px]">No Desktop</Tag>
            )}
            {mobileUrl ? (
              <div className="w-8 h-8 rounded border border-slate-200 bg-slate-800 overflow-hidden" title="Mobile Banner">
                <img src={mobileUrl} alt="Mobile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <Tag color="default" className="text-[10px]">No Mobile</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 110,
      render: (date) => (date ? moment(date).format("DD-MM-YYYY") : "-"),
    },
  ];

  const readColumns = [...dataTableColumns];

  const labels = {
    PANEL_TITLE: "Website Hero & Banners Management",
    DATATABLE_TITLE: "Hero Banners List",
    ADD_NEW_ENTITY: "Add New Hero Banner",
    ENTITY_NAME: "Hero Banner",
    CREATE_ENTITY: "Save Hero Banner",
    UPDATE_ENTITY: "Update Hero Banner",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<HeroForm />}
      updateForm={<HeroForm isUpdateForm={true} />}
      config={config}
    />
  );
}
