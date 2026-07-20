"use client";

import React from "react";
import { Form, Input, InputNumber, Switch, Select } from "antd";

const { TextArea } = Input;

export default function FaqForm({ isUpdateForm = false }) {
  return (
    <>
      <Form.Item
        label="Question"
        name="question"
        rules={[{ required: true, message: "Please enter the FAQ question" }]}
      >
        <TextArea rows={2} placeholder="e.g., Are the degrees globally recognised?" />
      </Form.Item>

      <Form.Item
        label="Answer"
        name="answer"
        rules={[{ required: true, message: "Please enter the FAQ answer" }]}
      >
        <TextArea rows={4} placeholder="Enter the detailed answer..." />
      </Form.Item>

      <Form.Item label="Category" name="category" initialValue="general">
        <Select
          options={[
            { label: "General", value: "general" },
            { label: "Admissions", value: "admissions" },
            { label: "Fees & Scholarships", value: "fees" },
            { label: "Academic / Eligibility", value: "eligibility" },
          ]}
        />
      </Form.Item>

      <Form.Item label="Display Order" name="order" initialValue={0}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Enabled"
        name="enabled"
        valuePropName="checked"
        initialValue={true}
      >
        <Switch />
      </Form.Item>
    </>
  );
}
