"use client"; // Next.js Client Component के लिए जरूरी है

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  RedoOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { Table, Button, Input, Space, Tooltip } from "antd";
import useLanguage from "@/components/common/locale/userLanguage";
import { dataForTable } from "@/components/common/locale/dataStructure";
import { useGetDynamicListQuery } from "@/store/redux/dynamic/action";
import { useDispatch } from "react-redux";
import { crud } from "@/store/redux/crud/slice";
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

  const [pageOptions, setPageOptions] = useState({ page: 1, items: 10 });
  const [searchQuery, setSearchQuery] = useState("");

  const { crudContextAction, dispatch: contextDispatch } = useCrudContext();
  const { panel, collapsedBox, modal, readBox, editBox, advancedBox } =
    crudContextAction;

  const translate = useLanguage();
  const isMounted = true;

  // ==========================================
  // DATA FETCHING VIA RTK QUERY
  // ==========================================
  const queryArgs = useMemo(() => {
    const options = {
      page: pageOptions.page,
      items: pageOptions.items,
    };

    if (searchQuery) {
      options.q = searchQuery;
      if (searchConfig?.searchFields) {
        options.fields = searchConfig.searchFields;
      }
    }

    return {
      entity,
      endPoint: "list",
      options,
    };
  }, [entity, pageOptions, searchQuery, searchConfig]);

  const {
    data: apiResponse,
    isLoading: listIsLoading,
    isFetching,
    refetch,
  } = useGetDynamicListQuery(queryArgs, { skip: !isMounted });

  const dataSource = apiResponse?.items || [];
  const pagination = apiResponse?.pagination || {
    current: 1,
    pageSize: 10,
    total: 0,
  };

  const handelDataTableLoad = useCallback((paginationData) => {
    setPageOptions({
      page: paginationData?.current || 1,
      items: paginationData?.pageSize || 10,
    });
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value || "");
    setPageOptions((prev) => ({ ...prev, page: 1 }));
  };

  const reduxDispatch = useDispatch();

  // ==========================================
  // CLICK HANDLERS
  // ==========================================
  const handleRead = (record) => {
    reduxDispatch(crud.currentItem({ data: record }));
    contextDispatch({ type: "OPEN_READ_BOX", payload: record });
    if (panel?.open) panel.open();
    if (collapsedBox?.open) collapsedBox.open();
    if (readBox?.open) readBox.open();
  };

  const handleEdit = (record) => {
    reduxDispatch(crud.currentItem({ data: record }));
    reduxDispatch(crud.currentAction({ actionType: "update", data: record }));
    contextDispatch({ type: "OPEN_EDIT_BOX", payload: record });
    if (editBox?.open) editBox.open();
    if (panel?.open) panel.open();
    if (collapsedBox?.open) collapsedBox.open();
  };

  const handleDelete = (record) => {
    reduxDispatch(crud.currentAction({ actionType: "delete", data: record }));
    contextDispatch({ type: "OPEN_MODAL", payload: record });
    if (modal?.open) modal.open();
  };

  const handleUpdatePassword = (record) => {
    reduxDispatch(crud.currentItem({ data: record }));
    reduxDispatch(crud.currentAction({ actionType: "update", data: record }));
    contextDispatch({ type: "OPEN_ADVANCED_BOX", payload: record });
    if (advancedBox?.open) advancedBox.open();
    if (panel?.open) panel.open();
    if (collapsedBox?.open) collapsedBox.open();
  };

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
      width: 150, // पर्याप्त स्पेस ताकि आइकन्स रैप न हों
      render: (_, record) => (
        <div className="flex items-center">
          {/* SHOW BUTTON */}
          <Tooltip title={translate("Show")}>
            <Button
              type="text"
              shape="circle"
              icon={<EyeOutlined className="text-blue-600 text-base" />}
              onClick={() => handleRead(record)}
            />
          </Tooltip>

          {/* EDIT BUTTON */}
          <Tooltip title={translate("Edit")}>
            <Button
              type="text"
              shape="circle"
              icon={<EditOutlined className="text-gray-600 text-base" />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>

          {/* UPDATE PASSWORD BUTTON */}
          <Tooltip title={translate("Update Password")}>
            <Button
              type="text"
              shape="circle"
              icon={<KeyOutlined className="text-gray-600 text-base" />}
              onClick={() => handleUpdatePassword(record)}
            />
          </Tooltip>

          {/* EXTRA BUTTONS (IF PROVIDED) */}
          {extra.map((item, idx) => {
            if (item.type === "divider") return null;
            return (
              <Tooltip title={item.label} key={idx}>
                <Button
                  type="text"
                  shape="circle"
                  icon={item.icon}
                  danger={item.danger}
                  onClick={() => item.onClick && item.onClick(record)}
                />
              </Tooltip>
            );
          })}

          {/* DELETE BUTTON */}
          <Tooltip title={translate("Delete")}>
            <Button
              type="text"
              shape="circle"
              icon={<DeleteOutlined className="text-gray-600 text-base" />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </div>
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
            onSearch={handleSearch}
            placeholder="Search..."
            allowClear
            className="w-64"
          />
          <Button
            onClick={() => refetch()}
            key="btn-refresh-table"
            icon={<RedoOutlined />}
            loading={isFetching}
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