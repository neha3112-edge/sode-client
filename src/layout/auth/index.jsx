import React from 'react';
import { Layout } from 'antd';
import bgImage from '/assets/Images/bg_image.png';
import mobileBg from '/assets/Images/mobile_bg.png';

const { Content } = Layout;

export default function AuthLayout({ isDesktop, children }) {
    return (
        <Layout
            style={{
                backgroundImage: `url(${isDesktop ? bgImage : mobileBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
            }}
        >
            <Content
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: isDesktop ? 'row' : 'column',
                    minHeight: '100vh',
                }}
            >
                {children}
            </Content>
        </Layout>
    );
}
