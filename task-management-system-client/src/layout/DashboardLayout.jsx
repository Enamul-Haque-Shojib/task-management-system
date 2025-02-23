

import { Layout, theme } from 'antd';
import Sidebar from '../components/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/dashboard/Navbar';

const { Content, Footer } = Layout;



const DashboardLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    return (
  
      <Layout hasSider>
      <Sidebar></Sidebar>
      <Layout>
        <Navbar></Navbar>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              height: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
    );
};

export default DashboardLayout;