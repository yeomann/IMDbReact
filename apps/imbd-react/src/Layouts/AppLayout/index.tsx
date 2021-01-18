import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import { ClockCircleOutlined, HomeOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { hashHistory } from '@imbd-react-testing/core-components';
// import networkDetector from '../network-detector';
const { Header, Sider, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  function toggle() {
    setCollapsed((old) => !old);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo">React Imdb</div>
        <Layout.Sider>
          <Menu theme="dark" mode="inline">
            <Menu.Item
              key="1"
              icon={<HomeOutlined />}
              onClick={() => history.push('/')}
            >
              Movies
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<StarOutlined />}
              onClick={() => history.push('/favourite')}
            >
              Favourite
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<ClockCircleOutlined />}
              onClick={() => history.push('/watch-later')}
            >
              Watch later
            </Menu.Item>
          </Menu>
        </Layout.Sider>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>React IMDB ©2021</Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
