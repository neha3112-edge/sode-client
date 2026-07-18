"use client"; // Next.js Client Component के लिए जरूरी है

import { useEffect, useState } from "react";
import { Layout, Card } from "antd";
import SidePanel from "@/components/layout/NavSide";
import { NavContextProvider, useNavContext } from "@/context/nav";
import { useAppContext } from "@/context/app";

const { Content } = Layout;

const ContentBox = ({ children }) => {
  const { state: stateCrud, navContextAction } = useNavContext();
  const { state: stateApp } = useAppContext();
  const { isPanelClose } = stateCrud;
  const { isNavMenuClose } = stateApp; // ग्लोबल वर्डप्रेस साइडबार की स्टेट
  const { panel } = navContextAction;

  const [isSidePanelClose, setSidePanel] = useState(isPanelClose);

  useEffect(() => {
    const timer = setTimeout(
      () => setSidePanel(isPanelClose),
      isPanelClose ? 200 : 0,
    );
    return () => clearTimeout(timer);
  }, [isPanelClose]);

  // ⚡ FIXED: वर्डप्रेस CMS स्टाइल रिस्पॉन्सिवनेस - अगर मुख्य साइडबार खुलता है (!isNavMenuClose) तो क्रड का साइड पैनल अपने आप बंद हो जाएगा
  useEffect(() => {
    if (!isNavMenuClose && panel && typeof panel.close === "function") {
      panel.close();
    }
  }, [isNavMenuClose, panel]);

  return <Content className="transition-all duration-200">{children}</Content>;
};

export default function CrudLayout({
  children,
  config,
  sidePanelTopContent,
  sidePanelBottomContent,
  fixHeaderPanel,
}) {
  return (
    <NavContextProvider>
      <Layout
        style={{ padding: "10px", background: "transparent" }}
        className="min-h-full"
      >
        <SidePanel
          config={config}
          topContent={sidePanelTopContent}
          bottomContent={sidePanelBottomContent}
          fixHeaderPanel={fixHeaderPanel}
        />
        <Card className="rounded-3xl shadow-2xl drop-shadow-lg border-none w-full">
          <ContentBox>{children}</ContentBox>
        </Card>
      </Layout>
    </NavContextProvider>
  );
}
