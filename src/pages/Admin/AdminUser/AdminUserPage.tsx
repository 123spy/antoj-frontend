import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProFormTextArea, ProTable, TableDropdown} from '@ant-design/pro-components';
import {Button, Dropdown, Form, message, Popconfirm, Space, Tag} from 'antd';
import {useRef, useState} from 'react';
import request from 'umi-request';
import {
  addUserUsingPost,
  deleteUserUsingPost,
  listUserByPageUsingPost,
  updateUserUsingPost
} from "../../../services/apis/userController";
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import {Link} from "@@/exports";

const AdminUserPage = () => {
  const actionRef = useRef<ActionType>();

  const onDelete = async (id) => {
    const res = await deleteUserUsingPost({id});
    if (res?.code === 0) {
      await actionRef.current.reload();
      message.success("删除成功");
    } else {
      message.error("删除失败");
    }
  }

  const columns: ProColumns<API.UserVO>[] = [
    {
      title: '#',
      valueType: "index",
      width: "5%"
    },
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      // copyable: true,
      ellipsis: true,
      tooltip: '用户名过长会自动收缩',
      render: (_, item) => {
        return (<Link to={`/user/info/${item?.id}`}>{item?.userName}</Link>)
      }
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      valueType: "avatar",
      hideInSearch: true,
      width: 120
    },
    {
      title: '用户简介',
      dataIndex: 'userProfile',
      copyable: true,
      ellipsis: true,
      tooltip: '简介过长会自动收缩'
    },
    {
      title: '用户身份',
      dataIndex: 'userRole',
      valueType: 'select',
      valueEnum: {
        admin: {
          text: '管理员',
        },
        user: {
          text: '用户',
        },
        ban: {
          text: '禁言',
        }
      },
      render: (_, item) => {
        if (item?.userRole === 'admin') {
          return (<Tag color={'orange'}>管理员</Tag>)
        }
        if (item?.userRole == 'user') {
          return (<Tag color={'green'}>用户</Tag>)
        }
        if (item?.userRole === 'ban') {
          return (<Tag color={'red'}>异常</Tag>)
        }
      }
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_, item) => {
        return (
          <Space>
            <Popconfirm
              title="删除用户"
              description="你确定要删除此用户吗?"
              onConfirm={() => onDelete(item?.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type={"link"}>删除</Button>
            </Popconfirm>
            <ModalForm
              title="新建表单"
              trigger={
                <Button type="link">
                  更新
                </Button>
              }
              autoFocusFirstInput
              modalProps={{
                destroyOnClose: true,
              }}
              submitTimeout={2000}
              onFinish={async (values) => {
                const res = await updateUserUsingPost({...values, id: item?.id});
                if (res?.code === 0) {
                  await actionRef.current.reload();
                  message.success("更新成功");
                } else {
                  message.error("更新失败");
                }
              }}
              width={800}
            >
              <ProFormText
                name="userName"
                // disabled
                label="用户名"
                initialValue={item?.userName}
                placeholder={"请输入用户名称"}
              />
              <ProFormTextArea
                // width="xs"
                name="userProfile"
                // disabled
                label="用户简介"
                initialValue={item?.userProfile}
                placeholder={"请输入用户简介"}
              />
              <ProFormText
                // width="xs"
                name="avatarUrl"
                // disabled
                label="用户头像"
                initialValue={item?.avatarUrl}
                placeholder={"请输入用户头像URL"}
              />
              <ProFormText.Password
                // width="xs"
                name="userPassword"
                // disabled
                label="用户密码"
                // initialValue={item?.userPassword}
                placeholder={"请输入用户密码"}
              />
              <ProFormSelect
                options={[
                  {
                    value: 'user',
                    label: '用户',
                  },
                  {
                    value: 'admin',
                    label: '管理员',
                  },
                  {
                    value: 'ban',
                    label: '禁言',
                  }
                ]}
                width="xs"
                name="userRole"
                label="用户身份"
                initialValue={item?.userRole}
              />
            </ModalForm>
          </Space>
        )
      }
    }
  ];

  return (
    <div>
      <ProTable<API.UserVO>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const res = await listUserByPageUsingPost({...params});
          if (res?.code === 0) {
            return {
              data: res?.data?.records,
              success: true,
              current: res?.data?.current,
              pageSize: res?.data?.size,
              total: res?.data?.total
            }
          } else {
            message.error("请求失败");
          }
          return {
            data: [],
            success: false,
          };
        }}
        columnsState={{
          persistenceKey: 'user',
          persistenceType: 'localStorage',
          defaultValue: {
            option: {fixed: 'right', disable: true},
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{showSizeChanger: true}}
        dateFormatter="string"
        toolBarRender={() => [
          <ModalForm
            trigger={
              <Button type="primary">
                <PlusOutlined/>
                新建
              </Button>
            }
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
              const res = await addUserUsingPost(values);
              if (res?.code === 0) {
                await actionRef.current.reload();
                message.success("提交成功");
              } else {
                message.error("提交失败")
              }
            }}
            width={800}
          >
            <ProFormText
              name="userName"
              // disabled
              label="用户名"
              placeholder={"请输入用户名称"}
            />
            <ProFormText
              // width="xs"
              name="userAccount"
              // disabled
              label="用户账号"
              placeholder={"请输入用户账号"}
            />
          </ModalForm>
        ]}
      />
    </div>
  )
};

export default AdminUserPage;
