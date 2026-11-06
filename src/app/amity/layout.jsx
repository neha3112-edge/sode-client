import React from "react";
import { Poppins } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export default function AmityLayout({ children }) {
  return (
    <div className={`${poppins.variable} font-sans landing-page--amity select-none antialiased`}>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "var(--font-poppins), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              colorPrimary: "#08417b",
            },
          }}
        >
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </div>
  );
}
