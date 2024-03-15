import {Link} from "react-router-dom";
import {Avatar, Dropdown, MenuProps, message, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React from "react";
import {userLogoutUsingPost} from "@/services/apis/userController";
import {useModel} from "@@/exports";

const GlobalAvatar = () => {
  const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;

  const handleMenuClick = async (e) => {
    if (e.key === 'logout') {
      const res = await userLogoutUsingPost();
      if (res?.code === 0) {
        message.success("退出成功");
        setInitialState(() => {
          return {
            ...initialState,
            currentUser: {}
          }
        })
      } else {
        message.success(`退出失败, ${res.message}`);
      }
    }

    if (e.key === 'info') {
      window.location.href = `/user/info/${currentUser?.id}`
    }
  };

  const items = [
    {
      key: 'info',
      label: '用户信息',
    },
    {
      key: 'logout',
      danger: true,
      label: '用户退出',
    },
  ];

  return (<div>
    {!currentUser?.id && (
      <div>
        <Link to={"/user/login"}>登录</Link>
      </div>
    )}
    {currentUser?.id && (
      <div>
        <Dropdown menu={{items, onClick: handleMenuClick}} placement="bottom"
                  arrow={{pointAtCenter: true}}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
            </Space>
          </a>
        </Dropdown>
      </div>
    )}
  </div>)
};

export default GlobalAvatar;
