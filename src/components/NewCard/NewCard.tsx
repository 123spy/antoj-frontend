import {listPostVoByPageUsingPost} from "../../services/apis/postController";
import {useEffect, useState} from "react";
import {Avatar, Divider, Empty, Skeleton, Space, Typography} from "antd";
import {history} from "../../.umi/core/history";
import {Link} from "../../.umi/exports";
import moment from "../../plugins/moment";
import PostCard from "@/components/PostCard/PostCard";

const {Paragraph, Text} = Typography;
const NewCard = () => {
  const [postList, setPostList] = useState([]);
  const loadData = async () => {
    const values = {
      current: 1,
      pageSize: 20,
      sortField: "createTime",
      sortOrder: "asc"
    };
    const res = await listPostVoByPageUsingPost(values);
    if (res?.code === 0) {
      setPostList(res?.data?.records);
    }
  }

  useEffect(() => {
    loadData()
  }, []);

  return (
    <div style={{marginBottom: 20}}>
      <Skeleton loading={false}>
        {postList.length === 0 && (
          <div style={{marginTop: 150}}>
            <Empty/>
          </div>
        )}
        {postList?.map((post, index) => {
          return (
            <PostCard key={index} post={post}/>
          );
        })}
      </Skeleton>
    </div>
  )
};

export default NewCard;
