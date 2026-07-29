"use client";

import React from "react";
import { Form, Input, Switch, InputNumber, Row, Col } from "antd";

export default function NaacRatingForm({ isUpdateForm = false }) {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="grade"
            label="NAAC Grade"
            rules={[{ required: true, message: "Please enter NAAC grade" }]}
          >
            <Input placeholder="e.g. NAAC A++, NAAC A+, NAAC A, NAAC B++" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. naac-a-plus-plus, naac-a-plus, naac-a" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="score" label="Score / CGPA">
            <Input placeholder="e.g. 3.66 CGPA" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="description" label="Description / Details">
        <Input.TextArea rows={3} placeholder="Details about this NAAC rating..." />
      </Form.Item>

      <Row gutter={16} align="middle">
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
