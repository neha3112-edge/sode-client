"use client";

import React from "react";
import { Form, Input, Switch, InputNumber, Row, Col } from "antd";

export default function EstablishedYearForm({ isUpdateForm = false }) {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="year"
            label="Established Year"
            rules={[{ required: true, message: "Please enter year e.g. 1990" }]}
          >
            <Input placeholder="e.g. 1990, 1956, 2001" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. 1990, 1956, 2001" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="title" label="Display Title / Tagline">
            <Input placeholder="e.g. Established in 1990" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="description" label="Description / Notes">
        <Input.TextArea rows={3} placeholder="Notes about this established year..." />
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
