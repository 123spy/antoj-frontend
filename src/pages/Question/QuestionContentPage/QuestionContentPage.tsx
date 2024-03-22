import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Card, Divider, message} from 'antd';
import {useRef, useState} from 'react';
import {listQuestionVoByPageUsingPost} from "@/services/apis/questionController";
import {Link} from "@@/exports";
import {CheckCircleOutlined, SearchOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";

const QuestionContentPage = () => {
  const actionRef = useRef<ActionType>();
  const [searchText, setSearchText] = useState("");
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "",
      width: "4%",
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
        return (<div>{index + 1}.<Link to={`/question/view/${item?.id}`}>{" "}{item?.title}</Link></div>)
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
  ];

  return (
    <div style={{padding: "0 180px", marginTop: 30}}>
      <Card>
        <div style={{display: "flex", justifyContent: "center"}}>
          <Search
            size={"large"}
            value={searchText}
            onChange={(value) => {
              setSearchText(value.target.value);
            }}
            suffix={<SearchOutlined/>}
            placeholder="请输入搜索关键词"
            onSearch={() => {
              actionRef.current.reload()
            }}
            enterButton="搜索"
            style={{width: "40%"}}
          />
        </div>
        <Divider/>
        <ProTable<API.QuestionVO>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (params, sort, filter) => {
            const res = await listQuestionVoByPageUsingPost({...params, searchText: searchText});
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
      </Card>
    </div>
  )
};

export default QuestionContentPage;
