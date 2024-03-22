import React from 'react';
import {Avatar, Button, Checkbox, Form, Input, message} from 'antd';
import {Link, useModel} from "@@/exports";
import {UploadOutlined} from "@ant-design/icons";
import {updateMyUserUsingPost} from "@/services/apis/userController";

const onFinish = async (values: any) => {
  const res = await updateMyUserUsingPost(values);
  if (res?.code === 0) {
    // 获取最新的用户
    message.success("更新成功");
  } else {
    message.error(`更新失败,${res.message}`);
  }
};

const UserUpdateCard = () => {

  const {initialState, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;

  if (!currentUser?.id) {
    return <div>未登录, <Link to={'/user/login'}>前往登录</Link></div>
  }

  return (
    <div style={{paddingLeft: 30, marginTop: 12}}>
      <div style={{fontSize: 20, fontWeight: 500, marginBottom: 30}}>基本设置</div>
      <div style={{display: "flex"}}>
        <div style={{width: "50%"}}>
          <Form
            onFinish={onFinish}
            style={{maxWidth: 330}}
          >
            <div style={{width: "100%"}}>
              <div style={{fontSize: 14, marginBottom: 6, color: "rgb(0, 0, 0, 0.88)"}}>用户名</div>
              <Form.Item
                initialValue={currentUser?.userName}
                name="userName"
                rules={[{required: true, message: 'Please input your username!'}]}
              >
                <Input/>
              </Form.Item>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                更新信息
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{width: "50%", paddingLeft: 104}}>
          <div style={{fontSize: 14, color: 'rgb(0,0,0,0.88)'}}>头像</div>
          <div>
            <Avatar size={140} src={currentUser?.avatarUrl}></Avatar>
          </div>
          <div style={{marginTop: 10, paddingLeft: 16}}>
            <Button icon={<UploadOutlined/>}>更换头像</Button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default UserUpdateCard;
