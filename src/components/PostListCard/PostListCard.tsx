import {useEffect, useState} from "react";
import {Empty, message, Skeleton, Typography} from "antd";
import {listPostVoByPageUsingPost} from "@/services/apis/postController";
import PostCard from "../PostCard/PostCard";

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
          return <PostCard key={index} post={post}/>;
        })}
      </Skeleton>
    </div>
  );
};

export default PostListCard;
