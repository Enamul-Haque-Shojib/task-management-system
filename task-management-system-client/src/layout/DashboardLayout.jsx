

import { Layout, theme } from 'antd';
import Sidebar from '../components/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;



const DashboardLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    return (
      //   <Layout style={{ height: '100vh' }}>
      //  <Sidebar></Sidebar>
      //   <Layout>
      //     <Header style={{ padding: 0, background: colorBgContainer }} />
      //     <Content style={{ margin: '24px 16px 0' }}>
      //       <div
      //         style={{
      //           height: '100%',
      //           padding: 24,
      //           minHeight: 360,
      //           background: colorBgContainer,
      //           borderRadius: borderRadiusLG,
                
      //         }}
      //       >
      //         <Outlet />
      //       </div>
      //     </Content>
      //     <Footer style={{ textAlign: 'center' }}>
      //       Ant Design ©{new Date().getFullYear()} Created by Ant UED
      //     </Footer>
      //   </Layout>
      // </Layout>



      <Layout hasSider>
      <Sidebar></Sidebar>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
            
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