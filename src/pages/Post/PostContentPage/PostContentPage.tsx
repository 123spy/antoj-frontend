import {Card, Divider, Empty, message, Skeleton, Typography} from "antd";
import {useEffect, useState} from "react";
import {listPostVoByPageUsingPost} from "@/services/apis/postController";
import Search from "antd/es/input/Search";
import {SearchOutlined} from "@ant-design/icons";
import PostCard from "../../../components/PostCard/PostCard";

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
        <Divider/>
        <div style={{marginTop: 50, padding: "0 10px", minHeight: 300}}>
          <Skeleton loading={loading}>
            {postList.length === 0 && (
              <div style={{marginTop: 150}}>
                <Empty/>
              </div>
            )}
            {postList?.map((post, index) => {
              return <PostCard ke={index} post={post}/>;
            })}
          </Skeleton>
        </div>
      </Card>
    </div>
  );
};

export default PostContentPage;
