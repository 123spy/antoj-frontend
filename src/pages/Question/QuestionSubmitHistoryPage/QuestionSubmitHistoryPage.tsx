import {useEffect, useRef, useState} from "react";
import {Button, Card, Descriptions, Divider, message, Popconfirm, Skeleton, Space, Spin, Tag} from "antd";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import {history, Link, useModel, useParams} from "@@/exports";
import {getQuestionVoByIdUsingGet} from "@/services/apis/questionController";
import MdViewer from "@/components/MdViewer/MdViewer";
import {
  ClockCircleOutlined,
  CodeOutlined,
  FieldTimeOutlined,
  FileOutlined,
  PlusOutlined,
  TagOutlined
} from "@ant-design/icons";
import {CODE_DEFAULT_LANGUAGE} from "@/constants/CodeConstant";
import {doSubmitUsingPost, listQuestionSubmitByPageUsingPost} from "@/services/apis/questionSubmitController";
import MessageShow from "@/components/MessageShow/MessageShow";
import {Typography} from 'antd';
import {addUserUsingPost, listUserByPageUsingPost, updateUserUsingPost} from "@/services/apis/userController";
import {
  ActionType,
  ModalForm,
  ProColumns,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable
} from "@ant-design/pro-components";
import moment from "@/plugins/moment";

const QuestionSubmitHistoryPage = () => {
  const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;
  const params = useParams();
  const {id} = params;
  const [submitList, setSubmitList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const actionRef = useRef<ActionType>();
  // 所有状态
  // 所有语言
  // 执行用时
  // 消耗内存
  // 备注

  const columns: ProColumns<API.QuestionSubmitVO>[] = [
    {
      title: '提交状态',
      dataIndex: 'judgeInfo?.message',
      render: (_, item) => {
        if (item?.judgeInfo?.message !== 'Accepted') {
          return (<Link to={`/question/submit/${item?.id}`}
                        style={{color: "rgb(239 71 67)", fontSize: 15}}>{item?.judgeInfo?.message}</Link>)
        }
        return (<Link to={`/question/submit/${item?.id}`}
                      style={{color: "rgb(45 181 93)", fontSize: 15}}>{item?.judgeInfo?.message}</Link>)
      }
    },
    {
      title: "编程语言",
      dataIndex: 'language',
      render: (_, item) => {
        if(_ === "c_cpp") {
          return (<Tag color={"blue"}>C++</Tag>)
        }
        return (<Tag color={"blue"}>{_}</Tag>)
      }
    },
    {
      title: '消耗内存',
      dataIndex: 'judgeInfo?.memory',
      render: (_, item) => {
        if (item?.judgeInfo?.message !== 'Accepted') {
          return (<div style={{color: "#262626bf"}}>N/A</div>)
        }
        return (
          <div style={{color: "#262626bf"}}>{Math.round((item?.judgeInfo?.memory / 1024 / 1024) * 100) / 100} MB</div>)
      }
    },
    {
      title: '消耗时间',
      dataIndex: 'judgeInfo?.time',
      render: (_, item) => {
        if (item?.judgeInfo?.message !== 'Accepted') {
          return (<div style={{color: "#262626bf"}}><ClockCircleOutlined/> &nbsp; N/A</div>)
        }
        return (<div style={{color: "#262626bf"}}>
          <ClockCircleOutlined/> &nbsp; {Math.round((item?.judgeInfo?.time / 1000) * 100) / 100} s</div>)
      }
    },
    {
      title: "提交时间",
      dataIndex: "createTime",
      render: (_, item) => {
        return (<div style={{color: "#262626bf"}}>{moment(_).format("YYYY/M/D")}</div>)
      }
    }
  ];

  return (
    <div style={{padding: "0 220px 20px", marginTop: 20}}>
      <Skeleton loading={false}>
        <Card>
          <div style={{marginBottom: 30}}>
            <Space split={<Divider style={{color: "black"}} type="vertical"/>}>
              <Typography.Link style={{fontSize: "17px"}} onClick={() => {
                history.push(`/question/view/${id}`)
              }}><FileOutlined style={{color: "lightblue"}}/><span
                style={{color: "gray", marginLeft: 6}}>题目提交</span></Typography.Link>
              <Typography.Link style={{fontSize: "17px"}} onClick={() => {
                history.push(`/question/history/${id}`)
              }}><FieldTimeOutlined/><span
                style={{color: "black", marginLeft: 6}}>提交历史</span></Typography.Link>
            </Space>
          </div>
          <ProTable<API.QuestionSubmitVO>
            columns={columns}
            actionRef={actionRef}
            request={async (params, sort, filter) => {
              console.log(params);
              const values = {
                current: params.current,
                pageSize: params.pageSize,
                questionId: id,
                userId: currentUser?.id,
                sortField: "createTime",
                sortOrder: "asc"
              };
              const res = await listQuestionSubmitByPageUsingPost(values);
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
            search={false}
            pagination={{showSizeChanger: true}}
            dateFormatter="string"
            toolBarRender={false}
          />
        </Card>
      </Skeleton>
    </div>
  );
};

export default QuestionSubmitHistoryPage;
