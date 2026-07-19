import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import UserForm from "./form";
import { Tag, Space, Switch } from "antd";

export default function Index() {
    const entity = "user";

    const dataTableColumns = [
        {
            title: "Enabled",
            dataIndex: "enabled",
            width: 70,
            key: "enabled",
            render: (value) => <Switch checked={value} disabled />,
        },
        { title: "Full Name", dataIndex: "fullname", key: "fullname" },
        { title: "Username", dataIndex: "username", key: "username" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Phone", dataIndex: "phone", key: "phone" },
        {
            title: "Role",
            dataIndex: ["role", "name"], // Mongoose populate की हुई 'role' ऑब्जेक्ट से नाम निकालने के लिए
            key: "role",
            render: (roleName, record) => roleName || record?.role || "-",
        },
        {
            title: "Workspaces",
            dataIndex: "workspace",
            key: "workspace",
            render: (workspaces) => (
                <Space size={[0, 4]} wrap>
                    {(workspaces || []).map((ws, index) => (
                        <Tag color="cyan" key={ws._id || index}>
                            {ws.name || ws}
                        </Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => moment(date).format("DD-MM-YYYY"),
        },
    ];

    // यदि आप Read (Detail View) के लिए अलग कॉलम रखना चाहते हैं
    const readColumns = [...dataTableColumns];

    const labels = {
        PANEL_TITLE: "Users",
        DATATABLE_TITLE: "Users List",
        ADD_NEW_ENTITY: "Add New User",
        ENTITY_NAME: "User",
        CREATE_ENTITY: "Save User",
        UPDATE_ENTITY: "Update User",
    };

    const config = {
        entity,
        ...labels,
        dataTableColumns,
        readColumns,
    };

    return (
        <CrudModule
            createForm={<UserForm />}
            updateForm={<UserForm isUpdateForm={true} />}
            config={config}
        />
    );
}