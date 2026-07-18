"use client";

import { Drawer, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import { useCrudStore } from "@/store/zustand/crud/store";
import { X, Check } from "lucide-react";

export default function DrawerPage() {
  // Zustand Store से स्टेट्स और एक्शन्स को सब्सक्राइब किया
  const isDrawerOpen = useCrudStore((state) => state.isDrawerOpen);
  const drawerContent = useCrudStore((state) => state.drawerContent);
  const drawerTitle = useCrudStore((state) => state.drawerTitle);
  const drawerButtonText = useCrudStore((state) => state.drawerButtonText);
  const drawerOnSave = useCrudStore((state) => state.drawerOnSave);
  const isDrawerLoading = useCrudStore((state) => state.isDrawerLoading);
  const drawer = useCrudStore((state) => state.drawer);

  // 🛠️ फ़ंक्शन: जब यूज़र सेव बटन दबाए
  const handleSaveClick = () => {
    if (drawerOnSave) {
      drawerOnSave();
    }
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={drawer.close}
      title={
        <>
          <div className="text-gray-700 text-balance font-medium px-3 capitalize">
            {drawerTitle}
          </div>
        </>
      }
      destroyOnHidden
      closeIcon={false}
      styles={{
        wrapper: {
          width: 450,
          maxWidth: "100%",
        },
        header: {
          padding: 6,
        },
        body: {
          padding: "14px",
        },
      }}
      // 📥 Lucide Icons के साथ अपडेटेड फुटर
      footer={
        <div className="flex items-center justify-start gap-1.5">
          <Button
            type="dashed"
            onClick={drawer.close}
            className="rounded-lg flex items-center gap-1 text-gray-600 border-gray-300"
            icon={<X size={14} />}
          >
            Close
          </Button>
          <Button
            type="primary"
            loading={isDrawerLoading}
            onClick={handleSaveClick}
            className="bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-1 border-none shadow-sm font-medium"
            icon={!isDrawerLoading && <Check size={14} />}
          >
            {drawerButtonText}
          </Button>
        </div>
      }
    >
      {drawerContent}
    </Drawer>
  );
}
