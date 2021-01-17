import React, {  useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import { Table } from 'antd';
// import networkDetector from '../network-detector';
const { Header, Sider, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  
  function toggle() { setCollapsed(old => !old) }

  return (
    <Layout style={{minHeight:"100vh"}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo">React Imdb</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
            Movies
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} onClick={() => console.log('2')}>
            Favourite
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />} onClick={() => console.log('3')}>
            Watch later
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>React IMDB ©2021</Footer>
      </Layout>
    </Layout>
  );
}


export {AppLayout}
