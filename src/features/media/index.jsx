"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import MediaForm from "./form";
import { Tag, Button, message, Image } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { getAssetPath } from "@/lib/utils";

export default function MediaCmsIndex() {
  const entity = "media";

  const copyUrl = (url) => {
    if (!url) return;
    const proxyUrl = getAssetPath(url);
    navigator.clipboard.writeText(proxyUrl);
    message.success("URL copied!");
  };

  const dataTableColumns = [
    {
      title: "Preview",
      dataIndex: "url",
      width: 90,
      key: "preview",
      render: (url, record) =>
        record.mimeType?.startsWith("image/") ||
        url?.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i) ? (
          <Image
            src={getAssetPath(url)}
            alt={record.alt || record.name}
            width={50}
            height={50}
            className="object-cover rounded border border-slate-200"
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
        ) : (
          <Tag color="purple" className="uppercase font-mono text-xs">
            {record.bucket || "file"}
          </Tag>
        ),
    },
    {
      title: "Name & Alt",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-bold text-slate-800 text-sm">{text}</div>
          {record.alt && (
            <div className="text-xs text-slate-400 font-normal">
              Alt: {record.alt}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Bucket & Type",
      dataIndex: "bucket",
      width: 140,
      key: "bucket",
      render: (bucket, record) => (
        <div>
          <Tag color="cyan" className="capitalize font-semibold">
            {bucket || "images"}
          </Tag>
          <div className="text-xs text-slate-400 font-mono mt-1">
            {record.mimeType || "image/png"}
          </div>
        </div>
      ),
    },
    {
      title: "Public URL",
      dataIndex: "url",
      key: "url",
      render: (url) => {
        const proxyUrl = getAssetPath(url);
        return (
          <div className="flex items-center gap-2 max-w-sm">
            <span
              className="text-xs font-mono text-blue-600 truncate flex-1"
              title={proxyUrl}
            >
              {proxyUrl}
            </span>
            <Button
              size="small"
              icon={<CopyOutlined />}
              onClick={() => copyUrl(url)}
              title="Copy URL"
            />
          </div>
        );
      },
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 90,
      render: (size) => {
        if (!size) return "-";
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
        return `${(size / (1024 * 1024)).toFixed(1)} MB`;
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
    PANEL_TITLE: "MinIO Media Library",
    DATATABLE_TITLE: "Uploaded Assets & Images",
    ADD_NEW_ENTITY: "Upload New Media",
    ENTITY_NAME: "Media",
    CREATE_ENTITY: "Upload",
    UPDATE_ENTITY: "Save Changes",
  };

  const config = {
    entity,
    ...labels,
    createEndPoint: "upload",   // POST media/upload (multipart)
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<MediaForm />}
      updateForm={<MediaForm isUpdateForm={true} />}
      config={config}
      withUpload={true}
    />
  );
}
