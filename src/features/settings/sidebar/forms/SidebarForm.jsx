import React from "react";
import { Form, Input, InputNumber, Select, Switch } from "antd";

const iconLibraries = [
  "lucide",
  "fa",
  "react-fa",
  "md",
  "ai",
  "bi",
  "fi",
  "hi",
  "ri",
  "gi",
];

export default function SidebarForm() {
  return (
    <>
      <Form.Item
        label="Enabled"
        name="enabled"
        valuePropName="checked"
        initialValue={true}
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter title" }]}
      >
        <Input placeholder="Dashboard" />
      </Form.Item>

      <Form.Item
        label="Section"
        name="section"
        rules={[{ required: true, message: "Please enter section" }]}
      >
        <Input placeholder="Main Menu" />
      </Form.Item>

      <Form.Item label="Section Order" name="sectionOrder" initialValue={0}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Item Order" name="itemOrder" initialValue={0}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Icon Library"
        name={["icon", "library"]}
        initialValue="lucide"
      >
        <Select>
          {iconLibraries.map((lib) => (
            <Select.Option key={lib} value={lib}>
              {lib}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Icon Name"
        name={["icon", "name"]}
        rules={[{ required: true, message: "Please enter icon name" }]}
      >
        <Input placeholder="LayoutDashboard" />
      </Form.Item>

      <Form.Item label="Path" name="path">
        <Input placeholder="/admin/dashboard" />
      </Form.Item>

      {/* Future me Parent Sidebar dropdown laga sakte ho */}
      {/* <Form.Item label="Parent Menu" name="parentId">
        <Select
          placeholder="Select Parent"
          allowClear
          options={parentOptions}
        />
      </Form.Item> */}

      <Form.Item label="Target" name="target" initialValue="_self">
        <Select>
          <Select.Option value="_self">Same Tab (_self)</Select.Option>
          <Select.Option value="_blank">New Tab (_blank)</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Open In New Tab"
        name="newTab"
        valuePropName="checked"
        initialValue={false}
      >
        <Switch />
      </Form.Item>

      <Form.Item label="Badge Text" name={["badge", "value"]}>
        <Input placeholder="New" />
      </Form.Item>

      <Form.Item label="Badge Color" name={["badge", "color"]}>
        <Input placeholder="red / green / blue" />
      </Form.Item>

      {/* Future me Roles API se load kar lena */}
      {/* <Form.Item label="Roles" name="roles">
        <Select
          mode="multiple"
          placeholder="Select Roles"
          options={roleOptions}
        />
      </Form.Item> */}
    </>
  );
}
