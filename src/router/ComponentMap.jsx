import dynamic from "next/dynamic";
import { Spin } from "antd";

// ⚡ पाथ्स को @/pages से बदलकर @/views कर दिया गया है
const Roles = dynamic(() => import("@/views/Roles"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center">
      <Spin size="large" description="Loading Page..." />
    </div>
  ),
});

const SidebarPage = dynamic(() => import("@/views/Sidebar"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center">
      <Spin size="large" description="Loading Page..." />
    </div>
  ),
});

const componentMap = {
  roles: Roles,
  sidebar: SidebarPage,
  dashboard: Roles,
};

export default componentMap;
