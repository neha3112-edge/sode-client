import React from "react";
import { Form, Input, InputNumber, Select, Switch } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

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
  const { data: rolesData = [], isLoading: loadingRoles } =
    useGetDynamicOptionsQuery({ entity: "role", endPoint: "options" });

  const roles = Array.isArray(rolesData)
    ? rolesData
    : Array.isArray(rolesData?.result)
    ? rolesData.result
    : Array.isArray(rolesData?.items)
    ? rolesData.items
    : [];

  return (
    <>
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
        <Select
          options={iconLibraries.map((lib) => ({ label: lib, value: lib }))}
        />
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

      <Form.Item label="Target" name="target" initialValue="_self">
        <Select
          options={[
            { label: "Same Tab (_self)", value: "_self" },
            { label: "New Tab (_blank)", value: "_blank" },
          ]}
        />
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

      <Form.Item label="Roles" name="roles">
        <Select
          mode="multiple"
          placeholder="Select Roles"
          loading={loadingRoles}
          allowClear
          optionFilterProp="label"
          options={roles.map((role) => ({
            label: role.name || role.title,
            value: String(role._id || role.id),
          }))}
        />
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
