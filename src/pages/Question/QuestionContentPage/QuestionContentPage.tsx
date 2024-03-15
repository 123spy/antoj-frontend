import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {message} from 'antd';
import {useRef} from 'react';
import {listQuestionVoByPageUsingPost} from "@/services/apis/questionController";
import {Link} from "@@/exports";

const QuestionContentPage = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: '#',
      valueType: "index",
      width: "8%",
      align: "center"
    },
    {
      title: '题目',
      dataIndex: 'title',
      render: (_, item) => {
        return <Link to={`/question/view/${item?.id}`}>{item?.title}</Link>
      },
      width: '80%'
    },
    {
      title: '通过率',
      align: "center",
      render: (_, item) => {
        if (!item?.acceptedNum || !item?.submitNum || item?.acceptedNum == 0 || item?.submitNum == 0) {
          return 0;
        }
        return <div>{Math.floor(item?.acceptedNum * 100) / item?.submitNum}</div>;
      }
    }
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
        columnsState={{
          persistenceKey: 'user',
          persistenceType: 'localStorage',
          defaultValue: {
            option: {fixed: 'right', disable: true},
          },
        }}
        rowKey="id"
        search={false}
        options={false}
        pagination={{showSizeChanger: true}}
        dateFormatter="string"
        toolBarRender={() => []}
      />
    </div>
  )
};

export default QuestionContentPage;
