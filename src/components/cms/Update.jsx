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

  // Helper to sanitize populated objects vs sub-document arrays for Ant Design Forms
  const sanitizeFormValue = (val) => {
    if (Array.isArray(val)) {
      return val.map((item) => {
        if (item && typeof item === "object" && item !== null) {
          // If item is a sub-document object (e.g. slides, faqs, options), retain object & sanitize nested fields
          const keys = Object.keys(item);
          const isSubDocument =
            keys.length > 2 ||
            keys.some((k) =>
              [
                "title",
                "subtitle",
                "badge",
                "label",
                "description",
                "primaryCtaText",
                "secondaryCtaText",
                "question",
                "answer",
              ].includes(k)
            );

          if (isSubDocument) {
            const cleanSubDoc = { ...item };
            Object.keys(cleanSubDoc).forEach((subKey) => {
              cleanSubDoc[subKey] = sanitizeFormValue(cleanSubDoc[subKey]);
            });
            return cleanSubDoc;
          }

          // If it's a simple populated reference object (e.g. {_id, name, url}), return string _id
          if (item._id) return String(item._id);
        }
        return item;
      });
    } else if (val && typeof val === "object" && val !== null) {
      if (val._id) return String(val._id);
    }
    return val;
  };

  useEffect(() => {
    if (current) {
      const formData = { ...current };

      Object.keys(formData).forEach((key) => {
        formData[key] = sanitizeFormValue(formData[key]);
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

    // Sanitize nested populated objects
    Object.keys(cleanFields).forEach((key) => {
      cleanFields[key] = sanitizeFormValue(cleanFields[key]);
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
