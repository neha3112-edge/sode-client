"use client";

import { useEffect } from "react";
import { Form } from "antd";
import { useSelector } from "react-redux";
import { useCrudContext } from "@/context/crud";
import { useUpdateDynamicMutation } from "@/store/redux/dynamic/action";

export default function UpdateForm({
  config,
  formElements,
  withUpload = false,
}) {
  const { entity } = config;
  const endPoint = config?.updateEndPoint || config?.endPoint || "update";
  const { crudContextAction } = useCrudContext();
  const current = useSelector((state) => state.crud.current);
  const { panel, editBox } = crudContextAction;
  const [form] = Form.useForm();

  const [updateDynamic] = useUpdateDynamicMutation();

  useEffect(() => {
    if (current) {
      const formData = { ...current };

      // Transform nested populated objects (role: {_id}, workspace: [{_id}]) into string ObjectIds
      Object.keys(formData).forEach((key) => {
        const val = formData[key];
        if (Array.isArray(val)) {
          formData[key] = val.map((item) =>
            item && typeof item === "object" && item._id
              ? String(item._id)
              : typeof item === "string"
              ? item
              : item
          );
        } else if (val && typeof val === "object" && val._id) {
          formData[key] = String(val._id);
        }
      });

      form.setFieldsValue(formData);
    }
  }, [current, form]);

  const onSubmit = async (fieldsValue) => {
    if (fieldsValue?.file && withUpload) {
      fieldsValue.file =
        fieldsValue.file[0]?.originFileObj || fieldsValue.file;
    }

    const id = current?._id || current?.id;
    if (!id) {
      console.error("No ID found for update operation");
      return;
    }

    // Clean payload by removing immutable database fields (_id, createdAt, updatedAt, __v)
    const { _id, id: fieldId, createdAt, updatedAt, __v, ...cleanFields } =
      fieldsValue || {};

    // Sanitize nested populated objects (e.g., roles: [{_id}], parentId: {_id}) into string ObjectIds
    Object.keys(cleanFields).forEach((key) => {
      const val = cleanFields[key];
      if (Array.isArray(val)) {
        cleanFields[key] = val.map((item) =>
          item && typeof item === "object" && item._id ? String(item._id) : item
        );
      } else if (val && typeof val === "object" && val._id) {
        cleanFields[key] = String(val._id);
      }
    });

    try {
      const response = await updateDynamic({
        entity,
        endPoint,
        id,
        jsonData: cleanFields,
      }).unwrap();

      if (response && response.success !== false) {
        if (editBox && typeof editBox.close === "function") editBox.close();
        if (panel && typeof panel.close === "function") panel.close();
        form.resetFields();
      }
    } catch (error) {
      console.error("Update operation failed:", error?.message || error);
    }
  };

  return (
    <Form id="cms-drawer-form" form={form} layout="vertical" onFinish={onSubmit}>
      {formElements}
    </Form>
  );
}
