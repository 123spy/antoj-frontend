import {useEffect, useState} from "react";
import {Avatar, Button, Card, Descriptions, Divider, message, Skeleton, Space, Spin, Tag} from "antd";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import {Link, useModel, useParams} from "@@/exports";
import {getQuestionVoByIdUsingGet} from "@/services/apis/questionController";
import MdViewer from "@/components/MdViewer/MdViewer";
import {CodeOutlined, FieldTimeOutlined, FileOutlined, LikeOutlined, TagOutlined} from "@ant-design/icons";
import {CODE_DEFAULT_LANGUAGE} from "@/constants/CodeConstant";
import {doSubmitUsingPost} from "@/services/apis/questionSubmitController";
import MessageShow from "@/components/MessageShow/MessageShow";
import {Typography} from 'antd';
import {history} from "@umijs/max";
import {getPostVoByIdUsingGet} from "@/services/apis/postController";
import moment from "@/plugins/moment";
import style from "./PostViewPage.less";
import {doThumbUsingPost} from "../../../services/apis/postThumbController";

const PostViewPage = () => {
  const params = useParams();
  const {id} = params;
  const [post, setPost]: { post: API.PostVO, setPost: any } = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;

  const onThumb = async () => {
    if (!currentUser || !currentUser?.id) {
      message.warning("帖子点赞需要账号登陆");
      return;
    }
    const res = await doThumbUsingPost({postId: post?.id});
    if (res?.code == 0) {
      if (res?.data === 1) {
        setPost((post) => {
          return {...post, hasThumb: true, thumbNum: post?.thumbNum + 1};
        })
      } else {
        setPost((post) => {
          return {...post, hasThumb: false, thumbNum: post?.thumbNum - 1};
        })
      }
    } else {
      message.error("请求失败，请再次尝试");
    }

  }
  const loadData = async () => {
    setIsLoading(true);
    const res = await getPostVoByIdUsingGet({id: id});
    if (res?.code === 0) {
      setPost(res?.data);
    } else {
      message.error("加载失败, 请再次刷新");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{padding: "0 220px 20px", marginTop: 20}}>
      <Skeleton loading={isLoading}>
        <Card style={{padding: "10px 30px"}}>
          <div>
            <h2 style={{
              color: "rgba(0, 0, 0, .85)",
              fontWeight: 600,
              fontSize: "30px",
              lineHeight: 1.35
            }}>{post?.title}</h2>
          </div>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <Space style={{fontSize: 16, lineHeight: "24px"}} split={<Divider type={"vertical"}/>}>
              <div>
                <Avatar size={"small"} src={post?.userVO?.avatarUrl}></Avatar>
              </div>
              <div style={{fontSize: "16px"}}>
                {post?.userVO?.userName}
              </div>
              <div>
                {moment(post?.createTime).format("L")}
              </div>
              <div>
                {post?.tags?.map((tag, index) => {
                  return (<Tag key={index} color={"blue"}>{tag}</Tag>)
                })}
              </div>
            </Space>
            <div>
              {(currentUser && ((currentUser?.id === post?.userVO?.id) || currentUser?.userRole === "admin")) && (
                <div><Link to={`/post/edit/${post?.id}`}>修改</Link></div>)}
            </div>
          </div>
          <div style={{marginTop: 30}}>
            <MdViewer value={post?.content}/>
          </div>
          <Divider></Divider>
          <div style={{marginTop: 30}}>
            <Space>
              <div style={{marginTop: 0}}>
                {
                  post?.hasThumb && (
                    <div style={{color: "rgb(45,181,93)", cursor: "pointer", fontSize: 18}} onClick={onThumb}>
                      <LikeOutlined/>
                      <span style={{marginLeft: 6}}>
                {post?.thumbNum}
              </span>
                    </div>)
                }
                {
                  !post?.hasThumb && (<div className={style.thumbIcon} onClick={onThumb}>
                    <LikeOutlined/>
                    <span style={{marginLeft: 6}}>
                {post?.thumbNum}
              </span>
                  </div>)
                }
              </div>
            </Space>
          </div>
        </Card>
      </Skeleton>
    </div>
  );
};

export default PostViewPage;
