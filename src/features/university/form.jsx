"use client";

import React from "react";
import { Form, Input, Select, Switch, InputNumber, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function UniversityForm({ isUpdateForm = false }) {
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
            name="name"
            label="University Name"
            rules={[{ required: true, message: "Please enter university name" }]}
          >
            <Input placeholder="e.g. Golden Gate University" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. golden-gate-university" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="logoSrc"
            label="Logo Media Asset"
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select Logo Media Asset"
              loading={isMediaLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(mediaOptions) &&
                mediaOptions.map((m) => (
                  <Select.Option key={m._id} value={m._id}>
                    {m.name || m.title || m.fileName || m.url}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="imageSrc"
            label="Campus Image Media Asset"
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select Campus Image Media Asset"
              loading={isMediaLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(mediaOptions) &&
                mediaOptions.map((m) => (
                  <Select.Option key={m._id} value={m._id}>
                    {m.name || m.title || m.fileName || m.url}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} align="middle">
        <Col span={12}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="enabled"
            label="Active / Enabled"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
