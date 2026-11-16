import React from "react";
import { Montserrat } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function EdgewoodLayout({ children }) {
  return (
    <div className={`${montserrat.variable} font-sans landing-page--edgewood select-none antialiased`}>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              fontFamily:
                "var(--font-montserrat), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              colorPrimary: "#b2171e",
            },
          }}
        >
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </div>
  );
}

