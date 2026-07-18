"use client";

import { useState, useEffect } from "react";
import { useNavContext } from "@/context/nav";
import { Drawer } from "antd";
import CollapseBox from "../shared/CollapsedBox";

export default function NavSide({
  config = {},
  topContent,
  bottomContent,
  fixHeaderPanel,
}) {
  const { ADD_NEW_ENTITY = "Add Item", ENTITY_NAME = "Workspace" } = config;
  const { state, navContextAction } = useNavContext();
  const { isPanelClose, isBoxCollapsed } = state;
  const { panel, collapsedBox } = navContextAction;

  const [opacitySider, setOpacitySider] = useState(0);
  const [paddingTopSider, setPaddingTopSider] = useState("10px");

  useEffect(() => {
    let timer;
    if (isPanelClose) {
      timer = setTimeout(() => {
        setOpacitySider(0);
        setPaddingTopSider("20px");
      }, 0);
    } else {
      timer = setTimeout(() => {
        setOpacitySider(1);
        setPaddingTopSider("0px");
      }, 50);
    }
    return () => clearTimeout(timer);
  }, [isPanelClose]);

  const collapsePanel = () => {
    if (panel && typeof panel.close === "function") {
      panel.close();
    }
  };

  const collapsePanelBox = () => {
    if (collapsedBox && typeof collapsedBox.collapse === "function") {
      collapsedBox.collapse();
    }
  };

  return (
    <Drawer
      title={
        <div className="text-start font-sans font-bold text-gray-700 tracking-wide capitalize">
          {ENTITY_NAME} Panel
        </div>
      }
      placement="right"
      onClose={collapsePanel}
      open={!isPanelClose}
      width={500}
      destroyOnClose
      styles={{
        body: {
          opacity: opacitySider,
          paddingTop: paddingTopSider,
          transition: "opacity 0.2s ease, padding-top 0.2s ease",
        },
      }}
    >
      <div className="sidePanelContent">
        <CollapseBox
          buttonTitle={ADD_NEW_ENTITY}
          isCollapsed={isBoxCollapsed}
          onCollapse={collapsePanelBox} // ⚡ लोकल रिड्यूसर एक्शन लिंक हुआ
          topContent={topContent}
          bottomContent={bottomContent}
        />
      </div>
    </Drawer>
  );
}
