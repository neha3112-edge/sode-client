"use client";

import React from "react";
import { Form, Input, Switch, InputNumber, Row, Col } from "antd";

export default function NirfRankForm({ isUpdateForm = false }) {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="NIRF Rank Title"
            rules={[{ required: true, message: "Please enter rank title" }]}
          >
            <Input placeholder="e.g. Ranked #26, Top 50 Overall, Top 10 Management" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. rank-26, top-50-overall" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="rankNumber" label="Numeric Rank Number">
            <InputNumber min={1} className="w-full" placeholder="e.g. 26" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="category" label="Category" initialValue="University">
            <Input placeholder="e.g. University, Management, Overall" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="year" label="Ranking Year" initialValue="2025">
            <Input placeholder="e.g. 2025" />
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

      <Form.Item name="description" label="Description / Notes">
        <Input.TextArea rows={3} placeholder="Details about this NIRF ranking..." />
      </Form.Item>
    </>
  );
}
