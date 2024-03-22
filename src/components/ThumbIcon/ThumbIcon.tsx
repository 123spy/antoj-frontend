import {LikeOutlined} from "@ant-design/icons";
import style from "./ThumbIcon.less";
import {doThumbUsingPost} from "@/services/apis/postThumbController";
import {message} from "antd";
import {useState} from "react";
import {useModel} from "@@/exports";


const ThumbIcon = (props: { post: API.PostVO }) => {
  const {initialState, loading, refresh, setInitialState} = useModel("@@initialState");
  const {currentUser} = initialState;
  // const {post} = props;
  const [post, setPost] = useState(props?.post)
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
        });
      } else {
        setPost((post) => {
          return {...post, hasThumb: false, thumbNum: post?.thumbNum - 1};
        });
      }
    } else {
      message.error("请求失败，请再次尝试");
    }
  };

  return (<div>
    {post?.hasThumb && (
      <div style={{color: "rgb(45,181,93)", cursor: "pointer", fontSize: 18}} onClick={onThumb}>
        <LikeOutlined/>
        <span style={{marginLeft: 6}}>{post?.thumbNum}</span>
      </div>
    )}
    {!post?.hasThumb && (
      <div className={style.thumbIcon} onClick={onThumb}>
        <LikeOutlined/>
        <span style={{marginLeft: 6}}>{post?.thumbNum}</span>
      </div>
    )}
  </div>)
}

export default ThumbIcon;
