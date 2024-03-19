import {listPostThumbByListUsingPost} from "@/services/apis/postThumbController";
import {useEffect, useState} from "react";
import {Avatar, Divider, Empty, message, Skeleton, Space, Typography} from "antd";
import {Link} from "@@/exports";
import moment from "@/plugins/moment";
import {history} from "@umijs/max";
import {listPostVoByPageUsingPost} from "@/services/apis/postController";

const {Paragraph, Text} = Typography;

const PostListCard = (props: { id }) => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const res = await listPostVoByPageUsingPost({userId: props?.id});
    if (res?.code === 0) {
      setPostList(res?.data.records);
    } else {
      message.error("请求失败，请再次请求");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
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
  );
};

export default PostListCard;
