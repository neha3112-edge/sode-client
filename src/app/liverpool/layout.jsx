import React from "react";
import { Montserrat, Anton } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export default function LiverpoolLayout({ children }) {
  return (
    <div className={`${montserrat.variable} ${anton.variable} font-sans landing-page--liverpool select-none antialiased`}>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              fontFamily:
                "var(--font-montserrat), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              colorPrimary: "#00408d",
            },
          }}
        >
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </div>
  );
}

