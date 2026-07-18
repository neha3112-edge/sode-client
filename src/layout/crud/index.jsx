import { useEffect, useState } from "react";
import DefaultLayout from "../default";
import SidePanel from "@/components/shared/Drawer";
import { Layout, Grid } from "antd";
import { useCrudContext } from "@/context/crud";
const { Content } = Layout;
const { useBreakpoint } = Grid;

const ContentBox = ({ children }) => {
  const { state: stateCrud, crudContextAction } = useCrudContext();
  const { isPanelClose } = stateCrud;

  const [isSidePanelClose, setSidePanel] = useState(isPanelClose);

  useEffect(() => {
    let timer;
    if (isPanelClose) {
      timer = setTimeout(() => {
        setSidePanel(isPanelClose);
      }, 200);
    } else {
      timer = setTimeout(() => {
        setSidePanel(isPanelClose);
      }, 0);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPanelClose]);

  return <Content>{children}</Content>;
};

export default function CrudLayout({
  children,
  config,
  sidePanelTopContent,
  sidePanelBottomContent,
  fixHeaderPanel,
}) {
  const screens = useBreakpoint();

  return (
    <>
      <DefaultLayout>
        <SidePanel
          config={config}
          topContent={sidePanelTopContent}
          bottomContent={sidePanelBottomContent}
          fixHeaderPanel={fixHeaderPanel}
        />
        <div>
          <ContentBox>{children}</ContentBox>
        </div>
      </DefaultLayout>
    </>
  );
}
