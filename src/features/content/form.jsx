"use client";

import React from "react";
import { Form, Input, Select, Switch, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function ContentForm({ isUpdateForm = false }) {
  const { data: categoryOptions = [], isLoading: isCategoriesLoading } =
    useGetDynamicOptionsQuery({
      entity: "category",
      endPoint: "options",
    });

  const { data: userOptions = [], isLoading: isUsersLoading } =
    useGetDynamicOptionsQuery({
      entity: "user",
      endPoint: "options",
    });

  const { data: mediaOptions = [], isLoading: isMediaLoading } =
    useGetDynamicOptionsQuery({
      entity: "media",
      endPoint: "options",
    });

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="Content Title"
            rules={[{ required: true, message: "Please enter content title" }]}
          >
            <Input placeholder="e.g. About SODE, Privacy Policy" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. about-us, privacy-policy" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="contentType"
            label="Content Type"
            initialValue="page"
            rules={[{ required: true, message: "Please select content type" }]}
          >
            <Select placeholder="Select type">
              <Select.Option value="page">Static Page</Select.Option>
              <Select.Option value="blog">Blog Post</Select.Option>
              <Select.Option value="policy">Legal Policy</Select.Option>
              <Select.Option value="news">News / Announcement</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="category" label="Category (Optional)">
            <Select
              placeholder="Select Category"
              loading={isCategoriesLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(categoryOptions) &&
                categoryOptions.map((cat) => (
                  <Select.Option key={cat._id} value={cat._id}>
                    {cat.name || cat.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="author" label="Author / Writer (Optional)">
            <Select
              placeholder="Select Author"
              loading={isUsersLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(userOptions) &&
                userOptions.map((user) => (
                  <Select.Option key={user._id} value={user._id}>
                    {user.fullname || user.username || user.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="image" label="Cover Image (Optional)">
            <Select
              placeholder="Select from Media Library"
              loading={isMediaLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(mediaOptions) &&
                mediaOptions.map((media) => (
                  <Select.Option key={media._id} value={media._id}>
                    {media.name || media.fileName || media.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="summary" label="Summary / Excerpt">
        <Input.TextArea rows={2} placeholder="Brief summary (used for previews)..." />
      </Form.Item>

      <Form.Item name="content" label="Body Content">
        <Input.TextArea rows={8} placeholder="Enter full body text (HTML / Markdown supported)..." />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="enabled"
            label="Active"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <div className="border-t border-slate-100 pt-4 mt-4">
        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-3">SEO Meta Tags (Optional)</span>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="metaTitle" label="Meta Title">
              <Input placeholder="SEO Title Tag" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="metaDescription" label="Meta Description">
              <Input placeholder="SEO Description Tag" />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </>
  );
}
