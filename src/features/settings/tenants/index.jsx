import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import TenantForm from "./form";
import { Switch, Avatar, Typography } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { getAssetPath } from "@/lib/utils";

const { Text } = Typography;

export default function Index() {
    const entity = "tenant";

    const dataTableColumns = [
        {
            title: "Logo",
            dataIndex: "logo",
            key: "logo",
            width: 60,
            render: (logo, record) => {
                let logoUrl = null;
                if (logo && typeof logo === "object" && logo.url) {
                    logoUrl = getAssetPath(logo.url);
                } else if (typeof logo === "string") {
                    logoUrl = logo.startsWith("http") ? logo : getAssetPath(logo);
                }
                return (
                    <Avatar
                        src={logoUrl}
                        icon={!logoUrl && <BankOutlined />}
                        shape="square"
                        className="bg-gray-100 text-gray-600"
                    />
                );
            },
        },
        {
            title: "Company Name",
            dataIndex: "name",
            key: "name",
            render: (name, record) => (
                <div>
                    <div className="font-semibold text-gray-800">{name}</div>
                    <Text type="secondary" className="text-xs">{record.slug}</Text>
                </div>
            ),
        },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Phone", dataIndex: "phone", key: "phone" },
        {
            title: "Location",
            dataIndex: "city",
            key: "location",
            render: (city, record) => {
                const cityName = city && typeof city === "object" ? city.name : city;
                const stateName = record.state && typeof record.state === "object" ? record.state.name : record.state;
                const locationParts = [cityName, stateName].filter(Boolean);
                return locationParts.length > 0 ? locationParts.join(", ") : "-";
            }
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
        PANEL_TITLE: "Tenants",
        DATATABLE_TITLE: "Tenants List",
        ADD_NEW_ENTITY: "Add New Tenant",
        ENTITY_NAME: "Tenant",
        CREATE_ENTITY: "Save Tenant",
        UPDATE_ENTITY: "Update Tenant",
    };

    const config = {
        entity,
        ...labels,
        dataTableColumns,
        readColumns,
    };

    return (
        <CrudModule
            createForm={<TenantForm />}
            updateForm={<TenantForm isUpdateForm={true} />}
            config={config}
        />
    );
}