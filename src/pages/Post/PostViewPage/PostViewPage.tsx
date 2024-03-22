import {useEffect, useState} from "react";
import {Avatar, Button, Card, Descriptions, Divider, message, Skeleton, Space, Spin, Tag} from "antd";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import {Link, useModel, useParams} from "@@/exports";
import {getQuestionVoByIdUsingGet} from "@/services/apis/questionController";
import MdViewer from "@/components/MdViewer/MdViewer";
import {CodeOutlined, FieldTimeOutlined, FileOutlined, LikeOutlined, TagOutlined} from "@ant-design/icons";
import {CODE_DEFAULT_LANGUAGE} from "@/constants/CodeConstant";
import {doSubmitUsingPost} from "@/services/apis/questionSubmitController";
import SubmitCard from "@/components/SubmitCard/SubmitCard";
import {Typography} from "antd";
import {history} from "@umijs/max";
import {getPostVoByIdUsingGet, getRecommendByListUsingPost} from "@/services/apis/postController";
import moment from "@/plugins/moment";
import style from "./PostViewPage.less";
import {doThumbUsingPost} from "../../../services/apis/postThumbController";
import ThumbIcon from "@/components/ThumbIcon/ThumbIcon";

const {Paragraph, Text} = Typography;
const PostViewPage = () => {
  const params = useParams();
  const {id} = params;
  const [post, setPost]: { post: API.PostVO; setPost: any } = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {initialState, loading, refresh, setInitialState} = useModel("@@initialState");
  const {currentUser} = initialState;
  const [recommendPost, setRecommendPost] = useState([]);

  const loadData = async () => {
    setIsLoading(true);
    const res = await getPostVoByIdUsingGet({id: id});
    if (res?.code === 0) {
      setPost(res?.data);
      simRecommend();
    } else {
      message.error("加载失败, 请再次刷新");
    }
    setIsLoading(false);
  };
  const simRecommend = async () => {
    const res = await getRecommendByListUsingPost({postId: id, num: 5});
    if (res?.code == 0) {
      setRecommendPost(res?.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{padding: "0 180px 20px", marginTop: 20}}>
      <Skeleton loading={isLoading}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Card style={{padding: "10px 30px", width: "calc(70% - 10px)", height: "fit-content"}}>
            <div>
              <h2
                style={{
                  color: "rgba(0, 0, 0, .85)",
                  fontWeight: 600,
                  fontSize: "30px",
                  lineHeight: 1.35,
                }}
              >
                {post?.title}
              </h2>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <Space style={{fontSize: 16, lineHeight: "24px"}} split={<Divider type={"vertical"}/>}>
                <div>
                  <Avatar size={"small"} src={post?.userVO?.avatarUrl}></Avatar>
                </div>
                <div style={{fontSize: "16px"}}>{post?.userVO?.userName}</div>
                <div>{moment(post?.createTime).format("L")}</div>
                <div>
                  {post?.tags?.map((tag, index) => {
                    return (
                      <Tag key={index} color={"blue"}>
                        {tag}
                      </Tag>
                    );
                  })}
                </div>
              </Space>
              <div>
                {currentUser && (currentUser?.id === post?.userVO?.id || currentUser?.userRole === "admin") && (
                  <div>
                    <Link to={`/post/edit/${post?.id}`}>修改</Link>
                  </div>
                )}
              </div>
            </div>
            <div style={{marginTop: 30}}>
              <MdViewer value={post?.content}/>
            </div>
            <Divider></Divider>
            <div style={{marginTop: 30}}>
              <Space>
                <ThumbIcon post={post}></ThumbIcon>
              </Space>
            </div>
          </Card>
          <Card style={{width: "calc(30% - 10px)", height: "fit-content"}} title={"内容推荐"}
                extra={<Link to={"/post/content"}>{"更多内容 >>"}</Link>}>
            {recommendPost?.map((post, index) => {
              return (
                <div
                  key={post?.id}
                  style={{cursor: "pointer"}}
                  onClick={() => {
                    window.location.href = `/post/view/${post?.id}`;
                  }}
                >
                  <h5 style={{fontSize: 16, fontWeight: 600}}>{post?.title}</h5>
                  <div>
                    <Paragraph style={{color: "rgba(0, 0, 0, .45)"}} ellipsis={{rows: 2}}>
                      {post.content}
                    </Paragraph>
                  </div>
                  <Divider/>
                </div>
              );
            })}
          </Card>
        </div>
      </Skeleton>
    </div>
  );
};

export default PostViewPage;
