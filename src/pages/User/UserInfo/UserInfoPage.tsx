import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Col, Descriptions, Divider, Empty, Row, Tabs, TabsProps, Tag} from 'antd';
import type {DescriptionsProps} from 'antd';
import {useModel, useParams} from "@@/exports";
import {history} from "@umijs/max";
import {PhoneOutlined} from "@ant-design/icons";
import {useSafeState} from "ahooks";
import {getUserVoByIdUsingGet} from "@/services/apis/userController";
import LiveListCard from "../../../components/LiveListCard/LiveListCard";
import PostListCard from "@/components/PostListCard/PostListCard";


const UserInfoPage = () => {

  const {id} = useParams();
  const [user, setUser] = useState(null);
  const {initialState, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;
  const [current, setCurrent] = useSafeState("post");

  const items = [
    {
      key: 'post',
      label: '文章',
    },
    {
      key: 'live',
      label: '点赞',
    }
  ];

  const loadData = async () => {
    const res = await getUserVoByIdUsingGet({id: id});
    if (res?.code === 40001) {
      history.push("/404")
    }

    if (res?.code === 0) {
      setUser(res?.data);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const onChange = (key: string) => {
    setCurrent(key);
  };

  return (
    <div style={{display: "flex", justifyContent: "center", marginTop: 30}}>
      <Row style={{width: "90%"}}>
        <Col span={7} style={{height: "fit-content", display: "flex", justifyContent: "center"}}>
          <Card style={{
            width: "75%",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
          }}>
            <div style={{width: "100%", height: "100%"}}>
              <div style={{width: "100%", marginTop: 30, marginBottom: 10, display: "flex", justifyContent: "center"}}>
                <Avatar src={user?.avatarUrl} size={90}></Avatar>
              </div>
              {/*姓名*/}
              <div style={{
                textAlign: "center",
                width: "100%",
                fontSize: 20,
                fontWeight: 500,
                color: 'rgb(0, 0, 0, 0.88)',
                marginBottom: 4
              }}>{user?.userName}</div>
              <div style={{
                textAlign: "center",
                width: "100%",
                fontSize: 14,
                color: 'rgb(0, 0, 0, 0.88)'
              }}>{user?.userProfile}</div>
              <Divider/>
              {
                (user?.id === currentUser?.id) && (
                  <div style={{marginTop: 20, width: "100%", display: "flex", justifyContent: "center"}}>
                    <Button style={{width: "60%"}} type={"primary"} onClick={() => {
                      history.push("/user/settings")
                    }}>修改信息</Button>
                  </div>)
              }
            </div>
          </Card>
        </Col>
        <Col span={17} style={{display: "flex", justifyContent: "center"}}>
          <Card style={{
            width: "100%",
            // boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
          }}
                tabList={items}
                activeTabKey={current}
                onTabChange={onChange}
          >
            {current === "live" && <LiveListCard id={id}/>}
            {current === "post" && <PostListCard id={id}/>}
            {/*{current === "live" && <LiveListCard id={id}/>}*/}
            {/*<div style={{paddingTop: 60}}>*/}
            {/*  <Empty description={"暂无数据"}></Empty>*/}
            {/*</div>*/}
          </Card>
        </Col>
      </Row>
    </div>
  )
};

export default UserInfoPage;
