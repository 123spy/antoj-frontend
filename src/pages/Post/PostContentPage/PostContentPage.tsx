import type {ActionType, ProColumns} from "@ant-design/pro-components";
import {ProTable} from "@ant-design/pro-components";
import {Avatar, Card, Divider, Empty, message, Skeleton, Space} from "antd";
import {useEffect, useRef, useState} from "react";
import {listQuestionVoByPageUsingPost} from "@/services/apis/questionController";
import {history, Link} from "@@/exports";
import {listPostVoByPageUsingPost} from "@/services/apis/postController";
import Search from "antd/es/input/Search";
import {SearchOutlined} from "@ant-design/icons";
import MdViewer from "../../../components/MdViewer/MdViewer";
import {Switch, Typography} from "antd";
import style from "./PostContentPage.less";
import moment from "../../../plugins/moment";

const {Paragraph, Text} = Typography;
const PostContentPage = () => {
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const loadData = async () => {
    setLoading(true);
    const res = await listPostVoByPageUsingPost({searchText: searchText});
    if (res?.code === 0) {
      setPostList(res?.data?.records);
    } else {
      message.error("加载失败，请刷新再尝试");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSearch = async (values) => {
    console.log(values);
    loadData();
  };

  return (
    <div style={{padding: "0 180px", marginTop: 30}}>
      <Card>
        <div style={{display: "flex", justifyContent: "center"}}>
          <Search
            value={searchText}
            onChange={(value) => {
              setSearchText(value.target.value);
            }}
            suffix={<SearchOutlined/>}
            placeholder="请输入搜索关键词"
            onSearch={onSearch}
            enterButton="搜索"
            style={{width: "40%"}}
          />
        </div>
        <div></div>
        <Divider/>
        <div style={{marginTop: 50, padding: "0 10px", minHeight: 300}}>
          <Skeleton loading={loading}>
            {postList.length === 0 && (
              <div style={{marginTop: 150}}>
                <Empty/>
              </div>
            )}
            {postList?.map((post, index) => {
              return (
                <div
                  onClick={() => {
                    history.push(`/post/view/${post?.id}`);
                  }}
                  key={post?.id}
                  style={{cursor: "pointer"}}
                >
                  <div style={{width: "100%", maxHeight: 210, overflow: "hidden"}}>
                    <div>
                      <Space align={"start"}>
                        <Avatar size={"large"} src={post?.userVO?.avatarUrl}></Avatar>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
                          <div style={{fontSize: 18}}>
                            <Link to={`/user/info/${post?.userVO?.id}`} style={{color: "black"}}>
                              {post?.userVO?.userName} |{" "}
                            </Link>
                            <span style={{color: "rgb(22,119,255)"}}>{post?.title}</span>
                          </div>
                          <div style={{fontSize: 12, color: "black"}}>{moment(post?.createTime).format("L")}</div>
                        </div>
                      </Space>
                    </div>
                    <div style={{marginTop: 6}}>
                      <Paragraph ellipsis={{rows: 2}}>{post.content}</Paragraph>
                    </div>
                  </div>
                  <Divider/>
                </div>
              );
            })}
          </Skeleton>
        </div>
      </Card>
    </div>
  );
};

export default PostContentPage;
