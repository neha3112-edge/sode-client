import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import WorkspaceForm from "./form";
import { Switch, Tag } from "antd";

export default function Index() {
    const entity = "workspace";

    const dataTableColumns = [
        {
            title: "Workspace Name",
            dataIndex: "name",
            key: "name",
            render: (name) => <span className="font-semibold text-gray-800">{name}</span>
        },
        {
            title: "Tenant (Company)",
            dataIndex: "tenantId",
            key: "tenantId",
            render: (tenantId) => {
                if (!tenantId || (Array.isArray(tenantId) && tenantId.length === 0)) {
                    return <Tag color="red">No Tenant Assigned</Tag>;
                }
                const tenants = Array.isArray(tenantId) ? tenantId : [tenantId];
                return (
                    <>
                        {tenants.map((t) => (
                            <Tag key={t?._id || t} color="blue">
                                {t?.name || String(t)}
                            </Tag>
                        ))}
                    </>
                );
            },
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text) => text || "-"
        },
        {
            title: "Enabled",
            dataIndex: "enabled",
            width: 80,
            key: "enabled",
            render: (value) => <Switch checked={value} disabled />,
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => moment(date).format("DD-MM-YYYY"),
        },
    ];

    const readColumns = [...dataTableColumns];

    const labels = {
        PANEL_TITLE: "Workspaces",
        DATATABLE_TITLE: "Workspaces List",
        ADD_NEW_ENTITY: "Add New Workspace",
        ENTITY_NAME: "Workspace",
        CREATE_ENTITY: "Save Workspace",
        UPDATE_ENTITY: "Update Workspace",
    };

    const config = {
        entity,
        ...labels,
        dataTableColumns,
        readColumns,
    };

    return (
        <CrudModule
            createForm={<WorkspaceForm />}
            updateForm={<WorkspaceForm isUpdateForm={true} />}
            config={config}
        />
    );
}