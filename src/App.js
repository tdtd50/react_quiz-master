import { Layout, Menu } from 'antd';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';
import React, { useState } from 'react';
import SearchUser from './components/SearchUser'; // 假设这是正确的搜索组件
import UserTable from './components/UserTable';
import SearchQuestion from './components/SearchQuestion';
import QuestionTable from './components/QuestionTable';

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  // 将useState钩子移到组件内部
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');

  return (
    <>
      <Layout>
        <Header><h1 style={{ color: '#ffffff' }}>Quiz管理系统</h1></Header>
        <Layout>
          <Sider>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              onClick={({ key }) => setSelectedKey(key)}
              items={[
                { key: '1', icon: <UserOutlined />, label: '用户管理' },
                { key: '2', icon: <VideoCameraOutlined />, label: '题目管理' }
              ]}
            />
          </Sider>
          <Content>
            {selectedKey === '1' && (
              <>
                <SearchUser />
                <UserTable />
              </>
            )}
            {selectedKey === '2' && (
              <div>
                <SearchQuestion />
                <QuestionTable />
              </div>
            )}
          </Content>
        </Layout>
        <Footer style={{
          textAlign: 'center',
        }}
        >Quiz管理系统 ©2025 Created by tfzhang</Footer>
      </Layout>
    </>
  );
};

export default App;