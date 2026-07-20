"use client";

import React from "react";
import { Form, Input, Switch, InputNumber, Row, Col } from "antd";

export default function EligibilityForm({ isUpdateForm = false }) {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="Eligibility Title / Requirement"
            rules={[{ required: true, message: "Please enter eligibility criteria" }]}
          >
            <Input placeholder="e.g. Bachelor's Degree or Master's Degree..." />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. bachelors-degree, masters-degree" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="description" label="Description / Details">
        <Input.TextArea rows={3} placeholder="Eligibility details or notes..." />
      </Form.Item>

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
