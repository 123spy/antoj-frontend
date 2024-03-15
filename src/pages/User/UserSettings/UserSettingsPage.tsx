import React, {useState} from 'react';
import {HomeOutlined, LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Empty, Layout, Menu, theme} from 'antd';
import UserUpdateCard from "@/components/UserUpdateCard/UserUpdateCard";

const {Header, Content, Footer, Sider} = Layout;

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const items = [
  {
    key: "user",
    label: "基本设置",
  },
  {
    key: "safe",
    label: "安全设置"
  },
  {
    key: "account",
    label: "账号绑定"
  },
  {
    key: "message",
    label: "信息通知"
  }
];

const UserSettingsPage = () => {
  const [current, setCurrent] = useState("user");

  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  return (
    <div style={{width: "100", display: "flex", justifyContent: "center", paddingTop: 0}}>
      <div style={{width: "80%"}}>
        <Layout
          style={{
            width: "100%",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          <Sider style={{background: colorBgContainer}} width={200}>
            <Menu
              mode="inline"
              selectedKeys={[current]}
              style={{height: '100%'}}
              items={items}
              onClick={(value) => {
                setCurrent(value.key);
              }}
            />
          </Sider>
          <Content style={{padding: '0 24px'}}>
            {current === 'user' && <UserUpdateCard/>}
            {current === 'safe' && <Empty style={{marginTop: 60}}/>}
            {current === 'account' && <Empty style={{marginTop: 60}}/>}
            {current === 'message' && <Empty style={{marginTop: 60}}/>}
          </Content>
        </Layout>
      </div>
    </div>
  )
};

export default UserSettingsPage;
