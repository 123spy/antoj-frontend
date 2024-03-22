import {history} from "@@/core/history";
import {Avatar, Divider, Space, Typography} from "antd";
import {Link} from "@@/exports";
import moment from "@/plugins/moment";
import ThumbIcon from "@/components/ThumbIcon/ThumbIcon";

const {Paragraph, Text} = Typography;
const PostCard = (props: { post }) => {
  const {post = {}} = props;
  return (
    <>
      <div style={{display: "flex", alignItems: "start"}}>
        <div>
          <Avatar style={{cursor: "pointer"}} size={"large"} src={post?.userVO?.avatarUrl}></Avatar>
        </div>
        <div style={{marginLeft: 16}}>
          <div
            onClick={() => {
              history.push(`/post/view/${post?.id}`);
            }}
            key={post?.id}
            style={{cursor: "pointer"}}
          >
            <div style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
              <Space style={{fontSize: 18}}>
                <div style={{color: "black"}}>
                  {post?.userVO?.userName} |{" "}
                </div>
                <span style={{color: "rgb(22,119,255)"}}>{post?.title}</span>
              </Space>
              <div style={{fontSize: 15, color: "black"}}>{moment(post?.createTime).format("L")}</div>
            </div>
            <div style={{marginTop: 6}}>
              <Paragraph ellipsis={{rows: 2}}>{post.content}</Paragraph>
            </div>
          </div>
          <div>
            <Space>
              <ThumbIcon post={post}></ThumbIcon>
            </Space>
          </div>
        </div>
      </div>
      <Divider style={{marginTop: 8}}/>
    </>
  )
}

export default PostCard;
