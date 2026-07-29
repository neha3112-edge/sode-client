import React from "react";
import { Form, Input, Select, Switch, Button, Divider } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

const actionOptions = [
  { value: "create", label: "Create" },
  { value: "read", label: "Read" },
  { value: "update", label: "Update" },
  { value: "delete", label: "Delete" },
  { value: "write", label: "Write" },
];

export default function RolesForm() {
  // Fetch all workspaces for the dropdown
  const { data: workspacesData = [], isLoading: loadingWorkspaces } =
    useGetDynamicOptionsQuery({ entity: "workspace", endPoint: "options" });

  const workspaces = Array.isArray(workspacesData)
    ? workspacesData
    : Array.isArray(workspacesData?.result)
      ? workspacesData.result
      : [];

  return (
    <>
      <Form.Item
        label="Role Name"
        name="name"
        rules={[{ required: true, message: "Please enter role name" }]}
      >
        <Input placeholder="Enter Role Name" />
      </Form.Item>

      {/* Global Default Actions */}
      <Form.Item
        label="Default Actions (applies to all workspaces)"
        name="action"
        rules={[{ required: true, message: "Please select at least one action" }]}
      >
        <Select
          mode="multiple"
          placeholder="Select Default Actions"
          allowClear
          options={actionOptions}
        />
      </Form.Item>

      <Divider titlePlacement="left" plain style={{ fontSize: 13, color: "#888" }}>
        Workspace-wise Permission Overrides (optional)
      </Divider>

      {/* Per-Workspace Permission Overrides */}
      <Form.List name="workspace">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                style={{ display: "flex", width: "100%", alignItems: "flex-start", gap: 8, marginBottom: 8 }}
              >
                {/* Workspace Selector */}
                <Form.Item
                  {...restField}
                  name={[name, "workspaceId"]}
                  rules={[{ required: true, message: "Select workspace" }]}
                  style={{ flex: 1, marginBottom: 0 }}
                >
                  <Select
                    placeholder="Select Workspace"
                    loading={loadingWorkspaces}
                    showSearch
                    allowClear
                    optionFilterProp="label"
                    options={workspaces.map((ws) => ({
                      label: ws.name || ws.title,
                      value: String(ws._id || ws.id),
                    }))}
                  />
                </Form.Item>

                {/* Actions for this Workspace */}
                <Form.Item
                  {...restField}
                  name={[name, "action"]}
                  initialValue={["read"]}
                  rules={[{ required: true, message: "Select at least one action" }]}
                  style={{ flex: 1, marginBottom: 0 }}
                >
                  <Select
                    mode="multiple"
                    placeholder="Select Actions for this Workspace"
                    allowClear
                    options={actionOptions}
                  />
                </Form.Item>

                {/* Remove Button */}
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => remove(name)}
                  style={{ flexShrink: 0, marginTop: 4 }}
                />
              </div>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Workspace Permission
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

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
