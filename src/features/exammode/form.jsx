"use client";

import React from "react";
import { Form, Input, Switch, InputNumber, Row, Col } from "antd";

export default function ExamModeForm({ isUpdateForm = false }) {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Exam Mode Title"
            rules={[{ required: true, message: "Please enter exam mode title" }]}
          >
            <Input placeholder="e.g. 100% Online Remote Proctored Exams, Center Based Exams" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. online-remote-proctored, center-based" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
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

      <Form.Item name="description" label="Description / Details">
        <Input.TextArea rows={3} placeholder="Details about this exam mode..." />
      </Form.Item>
    </>
  );
}
