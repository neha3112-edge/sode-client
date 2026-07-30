"use client"; // Next.js Client Component के लिए जरूरी है

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  RedoOutlined,
  KeyOutlined,
  PlusOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Table, Button, Input, Space, Tooltip, Segmented, Pagination } from "antd";
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
      icon={<PlusOutlined />}
      className="cursor-pointer font-semibold rounded-xl shadow-xs bg-[#4945ff] hover:!bg-[#3733dc] border-none text-white h-9 px-4 flex items-center gap-1.5"
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

  const [pageOptions, setPageOptions] = useState({ page: 1, items: config.defaultPageSize || 10 });
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState(config.defaultViewMode || "table");

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

  const dataSource =
    apiResponse?.result || apiResponse?.items || apiResponse?.data || [];
  const pagination = {
    current:
      apiResponse?.pagination?.currentPage ||
      apiResponse?.pagination?.current ||
      1,
    pageSize:
      apiResponse?.pagination?.items ||
      apiResponse?.pagination?.pageSize ||
      10,
    total:
      apiResponse?.pagination?.totalCount ||
      apiResponse?.pagination?.total ||
      0,
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
      width: 150,
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
          {config.hasPassword && (
            <Tooltip title={translate("Update Password")}>
              <Button
                type="text"
                shape="circle"
                icon={<KeyOutlined className="text-gray-600 text-base" />}
                onClick={() => handleUpdatePassword(record)}
              />
            </Tooltip>
          )}

          {/* EXTRA BUTTONS */}
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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 select-none">
        <div className="flex items-center gap-3">
          <Button
            shape="circle"
            type="text"
            icon={<Undo2 size={18} />}
            onClick={() => window.history.back()}
            className="hover:bg-gray-100 flex items-center justify-center cursor-pointer"
          />
          <div className="font-semibold text-slate-800 tracking-tight text-xl m-0 flex items-center gap-2">
            {DATATABLE_TITLE}
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              {pagination.total} entries
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Input.Search
            key="searchFilterDataTable"
            onSearch={handleSearch}
            placeholder="Search..."
            allowClear
            className="w-64"
          />
          {config.enableGridView && (
            <Segmented
              value={viewMode}
              onChange={setViewMode}
              options={[
                { value: "grid", icon: <AppstoreOutlined /> },
                { value: "table", icon: <UnorderedListOutlined /> },
              ]}
            />
          )}
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

      {viewMode === "grid" && config.gridItemRender ? (
        <div className="space-y-4">
          <div
            className={
              config.gridClass ||
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            }
          >
            {dataSource.map((record) =>
              config.gridItemRender(record, {
                handleRead,
                handleEdit,
                handleDelete,
              })
            )}
          </div>
          {pagination.total > pagination.pageSize && (
            <div className="flex justify-end pt-2">
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={(page, pageSize) =>
                  handelDataTableLoad({ current: page, pageSize })
                }
              />
            </div>
          )}
        </div>
      ) : (
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
      )}
    </div>
  );
}