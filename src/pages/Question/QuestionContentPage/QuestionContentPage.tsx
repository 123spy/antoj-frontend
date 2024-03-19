import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {message} from 'antd';
import {useRef} from 'react';
import {listQuestionVoByPageUsingPost} from "@/services/apis/questionController";
import {Link} from "@@/exports";
import {CheckCircleOutlined} from "@ant-design/icons";

const QuestionContentPage = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.QuestionVO>[] = [
    // {
    //   title: "#",
    //   valueType: "index",
    //   width: "8%"
    // },
    {
      title: "状态",
      width: "8%",
      render: (_, item) => {
        if (item?.hasAccept) {
          return (<div>
            <CheckCircleOutlined style={{color: "rgb(50,197,121)", fontSize: 16}}/>
          </div>)
        }
        return (<div></div>)
      }
    },
    {
      title: "题目",
      render: (_, item, index) => {
        return (<div><Link to={`/question/view/${item?.id}`}>{index + 1}. {" "}{item?.title}</Link></div>)
      }
    },
    {
      title: "通过率",
      width: "8%",
      render: (_, item) => {
        if (!item?.acceptedNum === 0 || !item?.submitNum || item?.acceptedNum === 0 || item?.submitNum === 0) {
          return <div>0 %</div>
        }
        return (<div>{(item?.acceptedNum / item?.submitNum * 100).toFixed(2)} %</div>)
      }
    }
    // {
    //   title: "通过",
    //   render: (_, item) => {
    //     if (!item?.acceptedNum === 0 || !item?.submitNum || item?.acceptedNum === 0 || item?.submitNum === 0) {
    //       return <div>0 %</div>
    //     }
    //     return (<div>{(item?.acceptedNum / item?.submitNum * 100).toFixed(2)} %</div>)
    //   }
    // },
    // {
    //   title: "状态",
    //   dataIndex: "hasAccept",
    //   align: "center",
    //   width: "8%",
    //   render: (_, item) => {
    //     if (item?.hasAccept) {
    //       return (<div>
    //         <CheckCircleOutlined style={{color: "rgb(50,197,121)", fontSize: 16}}/>
    //       </div>)
    //     }
    //     return (<div></div>)
    //   }
    // },
    // {
    //   title: '题目',
    //   width: "50%",
    //   render: (_, item) => {
    //     return <Link to={`/question/view/${item?.id}`}>{item?.title}</Link>
    //   },
    // },
  ];

  return (
    <div style={{padding: "0 180px", marginTop: 30}}>
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
        rowKey="id"
        search={false}
        options={false}
        pagination={{showSizeChanger: true}}
        toolBarRender={() => []}
      />
    </div>
  )
};

export default QuestionContentPage;
