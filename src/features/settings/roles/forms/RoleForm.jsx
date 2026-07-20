import React from "react";
import { Form, Input, Select, Switch } from "antd";

const actionOptions = [
  { value: "create", label: "Create" },
  { value: "read", label: "Read" },
  { value: "update", label: "Update" },
  { value: "delete", label: "Delete" },
  { value: "write", label: "Write" },
];

export default function RolesForm() {
  return (
    <>
      <Form.Item
        label="Role Name"
        name="name"
        rules={[{ required: true, message: "Please enter role name" }]}
      >
        <Input placeholder="Enter Role Name" />
      </Form.Item>

      <Form.Item
        label="Select Actions"
        name="action"
        rules={[{ required: true, message: "Please select at least one action" }]}
      >
        <Select
          mode="multiple"
          placeholder="Select Actions"
          allowClear
          options={actionOptions}
        />
      </Form.Item>

      <Form.Item label="Description" name="des">
        <Input.TextArea rows={3} placeholder="Enter Role Description" />
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
