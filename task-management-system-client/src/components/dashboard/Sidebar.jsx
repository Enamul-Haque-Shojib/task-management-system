
import { Layout, Menu, Typography } from 'antd';
import { adminPaths } from '../../routes/admin.routes';
import { userPaths } from '../../routes/user.routes';
import sidebarItemsGenerator from '../../utils/sidebarItemsGenerator';
// import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
// import { adminPaths } from '../../routes/admin.routes';
// import { userPaths } from '../../routes/user.routes';
// import { useAppSelector } from '../../redux/hooks';
// import { currentToken, TAuth } from '../../redux/features/auth/authSlice';
// import { verifyToken } from '../../utils/verifyToken';



const { Sider } = Layout;
const { Title } = Typography;



const userRole = {
    ADMIN: 'admin',
    USER: 'user'
};


const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const Sidebar = () => {
    // const token = useAppSelector(currentToken);
    // let auth = null;

    // if (token) {
    //     auth = verifyToken(token);
    // }

    const auth = {role: 'admin'}

    let sidebarItems = [];

    switch (auth?.role) {
        case userRole.ADMIN:
            sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
            break;
        case userRole.USER:
            sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
            break;
        default:
            break;
    }
    return (
        <Sider
        style={siderStyle}
         breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
            console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
                                 }}
        >
                  
                  <div className="demo-logo-vertical" style={{ padding: 16, textAlign: 'center', color: 'white' }}>
                <Title level={4} style={{ color: 'white', marginBottom: 0 }}>Task Field</Title>
            </div>
                  <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={sidebarItems} />
                </Sider>
    );
};

export default Sidebar;