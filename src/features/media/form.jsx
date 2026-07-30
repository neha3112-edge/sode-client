"use client";

import React from "react";
import { Form, Input, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

/**
 * MediaForm — Pure form fields component for Media Upload & Edit.
 */
export default function MediaForm({ isUpdateForm = false }) {
  return (
    <>
      {/* File Upload / Replace File */}
      <Form.Item
        label={isUpdateForm ? "Replace Image / File (optional)" : "Select File"}
        name="file"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: !isUpdateForm, message: "Please select a file to upload" }]}
      >
        <Upload
          maxCount={1}
          beforeUpload={() => false}
          accept="image/*,application/pdf,video/*,audio/*,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        >
          <Button icon={<UploadOutlined />}>
            {isUpdateForm ? "Choose New Image / Document" : "Select Image / Document"}
          </Button>
        </Upload>
      </Form.Item>

      {/* Display Name */}
      <Form.Item
        label="Display Name"
        name="name"
        rules={[{ required: !isUpdateForm, message: "Please enter a display name" }]}
      >
        <Input placeholder="e.g. Company Logo or Banner" />
      </Form.Item>

      {/* Alt Text (SEO) */}
      <Form.Item label="Alt Text (SEO)" name="alt">
        <Input placeholder="e.g. SODE Logo PNG" />
      </Form.Item>

      {/* Storage Bucket */}
      <Form.Item label="Storage Bucket" name="bucket">
        <Select
          placeholder="Auto-detect by file type"
          allowClear
          options={[
            { label: "🔄 Auto-detect by file type (recommended)", value: "" },
            { label: "🪣 sode-media", value: "sode-media" },
            { label: "🪣 images", value: "images" },
            { label: "🪣 public-assets", value: "public-assets" },
          ]}
        />
      </Form.Item>
    </>
  );
}
