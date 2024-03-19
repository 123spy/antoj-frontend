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
import {deletePostUsingPost, listPostVoByPageUsingPost, updatePostUsingPost} from "@/services/apis/postController";
import {Link} from "@@/exports";
import {deleteQuestionUsingPost, listQuestionVoByPageUsingPost} from "@/services/apis/questionController";
import {history} from "@umijs/max";

const AdminQuestionPage = () => {
  const actionRef = useRef<ActionType>();

  const onDelete = async (id) => {
    const res = await deleteQuestionUsingPost({id});
    if (res?.code === 0) {
      await actionRef.current.reload();
      message.success("删除成功");
    } else {
      message.error("删除失败");
    }
  }

  const columns: ProColumns<API.QuestionVO>[] = [
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
      title: '标题',
      dataIndex: 'title',
      // copyable: true,
      ellipsis: true,
      tooltip: '标题过长会自动收缩',
    },
    {
      title: "判题配置",
      hideInSearch: true,
      render: (_, item) => {
        return <div>{JSON.stringify(item?.judgeConfig)}</div>
      }
    },
    {
      title: '标签',
      dataIndex: 'tags',
      hideInSearch: true,
      ellipsis: true,
      // hideInSearch: true,
      render: (_, item) => {
        if (!item?.tags) {
          return <></>
        }
        return (
          item?.tags.map((item, index) => {
            return <Tag key={index} color={'blue'}>{item}</Tag>
          })
        )
      },
    },
    {
      title: '提交数',
      dataIndex: 'submitNum',
      hideInSearch: true,
      width: "5%"
    },
    {
      title: '通过数',
      dataIndex: 'acceptedNum',
      hideInSearch: true,
      width: "5%"
    },
    {
      title: '操作',
      hideInSearch: true,
      valueType: "option",
      render: (_, item) => {
        return (
          <Space>
            <Popconfirm
              title="删除帖子"
              description="你确定要删除此帖子吗?"
              onConfirm={() => onDelete(item?.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type={"link"}>删除</Button>
            </Popconfirm>

            <Link to={`/question/edit/${item?.id}`}>
              更新
            </Link>

          </Space>
        )
      }
    }
  ];

  return (
    <div>
      <ProTable<API.QuestionVO>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const res = await listQuestionVoByPageUsingPost({...params});
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
          <Button type={"primary"} onClick={() => {
            history.push("/question/add")
          }}><PlusOutlined/>新建</Button>
        ]}
      />
    </div>
  )
};

export default AdminQuestionPage;
