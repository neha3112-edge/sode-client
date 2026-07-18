import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Select, Button } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOptions } from "@/redux/options/actions";
// import {
//   selectSpecificEntityLoading,
//   selectSpecificEntityData,
// } from "@/redux/options/selectors"; // adjust if needed
export default function RolesForm() {
  // const dispatch = useDispatch();
  // const hasFetchedOptions = useRef(false);
  // const [selectedActions, setSelectedActions] = useState([]);
  // const [roleWorkspaces, setRoleWorkspaces] = useState([]);

  // // Fetch dropdown options
  // useEffect(() => {
  //   if (!hasFetchedOptions.current) {
  //     hasFetchedOptions.current = true;
  //     const keys = ["workspace"];
  //     keys.forEach((key) => dispatch(fetchOptions(key)));
  //   }
  // }, [dispatch]);

  // // Selectors
  // const workspaces =
  //   useSelector((state) => selectSpecificEntityData(state, "workspace")) || [];

  // const loadingWorkspaces = useSelector((state) =>
  //   selectSpecificEntityLoading(state, "workspace"),
  // );

  // // Dropdown Actions
  // const actionOptions = [
  //   { value: "read", label: "Read" },
  //   { value: "write", label: "Write" },
  //   { value: "create", label: "Create" },
  //   { value: "update", label: "Update" },
  //   { value: "delete", label: "Delete" },
  //   { value: "follow_up", label: "Follow Up" },
  //   { value: "sms", label: "SMS" },
  //   { value: "whatsapp", label: "WhatsApp" },
  //   { value: "email", label: "Email" },
  //   { value: "export", label: "Export" },
  //   { value: "import", label: "Import" },
  //   { value: "call", label: "Call" },
  //   { value: "universitybutton", label: "University_Button" },
  //   { value: "stage_buttons", label: "Stage_Buttons" },
  //   { value: "counselling_form", label: "Counselling_Form" },
  // ];

  // const workspacePermissionOptions = [
  //   { value: "refer", label: "Refer" },
  //   { value: "bulk_refer", label: "Bulk Refer" },
  //   { value: "bulk_stages", label: "Bulk Stages" },
  //   { value: "bulk_delete", label: "Bulk Delete" },
  //   { value: "Total_leads", label: "Total Leads" },
  //   { value: "New_leads", label: "New Leads" },
  //   { value: "Re_Enquired", label: "Re-Enquired" },
  //   { value: "UTM_Source", label: "UTM Source" },
  //   { value: "UTM_Medium", label: "UTM Medium" },
  //   { value: "UTM_Campaign", label: "UTM Campaign" },
  //   { value: "whatsapp_chat", label: "WhatsApp Chat" },
  //   { value: "Failed_Leads", label: "Failed Leads" },
  //   { value: "Source_Wise", label: "Source Wise" },
  //   { value: "User_Wise", label: "User Wise" },
  //   { value: "Source_Trans", label: "Source Trans" },
  //   { value: "Admission_Data", label: "Admission Data" },
  // ];

  // const addWorkspacePermission = () => {
  //   setRoleWorkspaces([
  //     ...roleWorkspaces,
  //     { workspaceId: "", permissions: [] },
  //   ]);
  // };

  // const handleWorkspaceChange = (index, field, value) => {
  //   const updated = [...roleWorkspaces];
  //   updated[index] = { ...updated[index], [field]: value };
  //   setRoleWorkspaces(updated);
  // };

  // const handleActionsChange = (value) => setSelectedActions(value);

  return (
    <>
      <Form.Item
        label="Role Name"
        name="name"
        rules={[{ required: true, message: "Please enter role name" }]}
      >
        <Input placeholder="Enter Role Name" />
      </Form.Item>

      <Form.Item label="Select Actions" name="actions">
        <Select
          mode="multiple"
          placeholder="Select Actions"
          value={selectedActions}
          onChange={handleActionsChange}
          showSearch
          allowClear
        >
          {actionOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input placeholder="Enter Role Description" />
      </Form.Item>

      {/* Workspace Permissions Section */}
      {/* <Form.Item label="Workspace Permissions">
        {roleWorkspaces.map((ws, index) => (
          <div
            key={index}
            style={{
              marginBottom: 16,
              padding: 12,
              border: "1px solid #eee",
              borderRadius: 6,
            }}
          >
            <Form.Item
              label="Workspace"
              name={["workspaces", index, "workspaceId"]}
              key={`workspace-${index}`}
              required
            >
              <Select
                placeholder="Select Workspace"
                loading={loadingWorkspaces}
                value={ws.workspaceId}
                onChange={(value) =>
                  handleWorkspaceChange(index, "workspaceId", value)
                }
              >
                {workspaces.map((workspace) => (
                  <Select.Option key={workspace._id} value={workspace._id}>
                    {workspace.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Permissions"
              name={["workspaces", index, "permissions"]}
              key={`permissions-${index}`}
            >
              <Select
                mode="multiple"
                placeholder="Select Permissions"
                value={ws.permissions}
                onChange={(value) =>
                  handleWorkspaceChange(index, "permissions", value)
                }
              >
                {workspacePermissionOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        ))}

        <Button onClick={addWorkspacePermission} type="dashed">
          Add Workspace Permission
        </Button> */}
      {/* </Form.Item> */}
    </>
  );
}
