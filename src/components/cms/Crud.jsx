"use client"; // Next.js Client Component के लिए जरूरी है

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  RedoOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { Dropdown, Table, Button, Input } from "antd";
import useLanguage from "@/components/common/locale/userLanguage";
import { dataForTable } from "@/components/common/locale/dataStructure";
import { useGetDynamicListQuery } from "@/store/redux/dynamic/action"; // ⚡ FIXED: RTK Query हुक को इम्पोर्ट किया
import { useCrudContext } from "@/context/crud";
import { Undo2 } from "lucide-react";
import PageHeader from "./PageHeader";

// ==========================================
// ADD NEW ITEM BUTTON COMPONENT
// ==========================================
function AddNewItem({ config }) {
  const { crudContextAction } = useCrudContext();
  const { collapsedBox, panel } = crudContextAction;
  const { ADD_NEW_ENTITY } = config;

  const handelClick = () => {
    if (panel && typeof panel.open === "function") panel.open();
    if (collapsedBox && typeof collapsedBox.close === "function")
      collapsedBox.close();
  };

  return (
    <Button
      onClick={handelClick}
      type="primary"
      className="cursor-pointer font-semibold rounded-lg shadow-sm"
    >
      {ADD_NEW_ENTITY}
    </Button>
  );
}

// ==========================================
// MAIN DATA TABLE COMPONENT
// ==========================================
export default function DataTable({ config, extra = [] }) {
  let { entity, dataTableColumns, DATATABLE_TITLE, fields, searchConfig } =
    config;

  // पेजिनेशन और सर्च क्वेरी के लिए लोकल स्टेट्स (RTK Query पैरामीटर्स के लिए)
  const [pageOptions, setPageOptions] = useState({ page: 1, items: 10 });
  const [searchQuery, setSearchQuery] = useState("");

  const { crudContextAction, dispatch: contextDispatch } = useCrudContext();
  const { panel, collapsedBox, modal, readBox, editBox, advancedBox } =
    crudContextAction;

  const translate = useLanguage();

  const isMounted = true;

  // ==========================================
  // DATA FETCHING VIA RTK QUERY হুডস (FIXED)
  // ==========================================
  // ⚡ dynamicApi पैरामीटर्स को ऑब्जेक्ट फॉर्मेट में तैयार किया
  const queryArgs = useMemo(() => {
    const options = {
      page: pageOptions.page,
      items: pageOptions.items,
    };

    if (searchQuery) {
      options.q = searchQuery;
      options.fields = searchConfig?.searchFields || "name";
    }

    return {
      entity,
      endPoint: "list",
      options,
    };
  }, [entity, pageOptions, searchQuery, searchConfig]);

  // ⚡ RTK Query हुक को कॉल किया जो ऑटोमैटिकली कैशे, लोडिंग और डेटा होल्ड करता है
  const {
    data: apiResponse,
    isLoading: listIsLoading,
    isFetching,
    refetch,
  } = useGetDynamicListQuery(queryArgs, { skip: !isMounted });

  // आपके transformResponse के स्ट्रक्चर के अनुसार डेटा निकालना
  const dataSource = apiResponse?.items || [];
  const pagination = apiResponse?.pagination || {
    current: 1,
    pageSize: 10,
    total: 0,
  };

  // टेबल का पेज या साइज बदलने पर ट्रिगर होने वाला फंक्शन
  const handelDataTableLoad = useCallback((paginationData) => {
    setPageOptions({
      page: paginationData?.current || 1,
      items: paginationData?.pageSize || 10,
    });
  }, []);

  // 🔎 लाइव सर्च हैंडलर जो 400ms डिबाउंस के साथ भी काम कर सकता है
  const filterTable = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPageOptions((prev) => ({ ...prev, page: 1 })); // सर्च करने पर पेज 1 पर रीसेट करें
  };

  // ==========================================
  // CLICK HANDLERS (CONTEXT ACTION SYNC)
  // ==========================================
  const handleRead = (record) => {
    contextDispatch({ type: "OPEN_READ_BOX", payload: record });
    if (panel?.open) panel.open();
    if (collapsedBox?.open) collapsedBox.open();
    if (readBox?.open) readBox.open();
  };

  const handleEdit = (record) => {
    contextDispatch({ type: "OPEN_EDIT_BOX", payload: record });
    if (editBox?.open) editBox.open();
    if (panel?.open) panel.open();
    if (collapsedBox?.open) collapsedBox.open();
  };

  const handleDelete = (record) => {
    contextDispatch({ type: "OPEN_MODAL", payload: record });
    if (modal?.open) modal.open();
  };

  const handleUpdatePassword = (record) => {
    contextDispatch({ type: "OPEN_ADVANCED_BOX", payload: record });
    if (advancedBox?.open) advancedBox.open();
    if (panel?.open) panel.open();
    if (collapsedBox?.open) collapsedBox.open();
  };

  // 📥 Dropdown Actions Config
  const items = useMemo(
    () => [
      {
        label: translate("Show"),
        key: "read",
        icon: <EyeOutlined />,
      },
      {
        label: translate("Edit"),
        key: "edit",
        icon: <EditOutlined />,
      },
      {
        label: translate("Update Password"),
        key: "updatePassword",
        icon: <KeyOutlined />,
      },
      ...extra,
      {
        type: "divider",
      },
      {
        label: translate("Delete"),
        key: "delete",
        icon: <DeleteOutlined className="text-red-500" />,
        danger: true,
      },
    ],
    [translate, extra],
  );

  // ==========================================
  // COLUMNS COMPILER
  // ==========================================
  let dispatchColumns = [];
  if (fields) {
    dispatchColumns = [...dataForTable({ fields, translate })];
  } else {
    dispatchColumns = [...dataTableColumns];
  }

  const finalColumns = [
    ...dispatchColumns,
    {
      title: "Actions",
      key: "action",
      fixed: "right",
      width: 80,
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              switch (key) {
                case "read":
                  handleRead(record);
                  break;
                case "edit":
                  handleEdit(record);
                  break;
                case "delete":
                  handleDelete(record);
                  break;
                case "updatePassword":
                  handleUpdatePassword(record);
                  break;
                default:
                  break;
              }
            },
          }}
          trigger={["click"]}
        >
          <EllipsisOutlined
            style={{ cursor: "pointer", fontSize: "22px" }}
            className="text-gray-500 hover:text-blue-600 transition-colors"
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      ),
    },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4 select-none">
        <div className="flex items-center">
          <Button
            shape="circle"
            type="text"
            icon={<Undo2 size={18} />}
            onClick={() => window.history.back()}
            className="hover:bg-gray-100 flex items-center justify-center cursor-pointer"
          />
          <div className="font-medium text-gray-700 tracking-wide text-lg m-0">
            {DATATABLE_TITLE}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Input.Search
            key="searchFilterDataTable"
            onChange={filterTable}
            placeholder="Search..."
            allowClear
            className="w-64"
          />
          <Button
            onClick={() => refetch()} // ⚡ FIXED: RTK Query के कोर रिफ्रेश फ़ंक्शन का उपयोग किया
            key="btn-refresh-table"
            icon={<RedoOutlined />}
            loading={isFetching} // रिफ्रेश होते समय स्पिनर इफेक्ट
            className="rounded-lg flex items-center justify-center cursor-pointer border-gray-300 text-gray-600 hover:text-blue-600"
          >
            Refresh
          </Button>
          <AddNewItem key="btn-add-new-item" config={config} />
        </div>
      </div>
      <Table
        columns={finalColumns}
        rowKey={(item) => item._id || item.id}
        dataSource={dataSource}
        pagination={pagination}
        loading={listIsLoading}
        onChange={handelDataTableLoad}
        scroll={{ x: true }}
        size="small"
        className="truncate bg-white border border-gray-200 rounded-2xl shadow"
      />
    </div>
  );
}
