import {Tabs} from "antd";
import {useState} from "react";
import {Badge, Card, Space} from 'antd';
import {Link} from "react-router-dom";
import NewCard from "../components/NewCard/NewCard";
import RecommendCard from "../components/RecommendCard/RecommendCard";
import ActivityCard from "../components/ActivityCard/ActivityCard";

const HomePage = () => {
  const [currentKey, setCurrentKey] = useState("new");
  const onChange = (key: string) => {
    console.log(key);
  };

  const items = [
    {
      key: 'new',
      label: '最新',
      children: <NewCard/>,
    },
    {
      key: 'recommend',
      label: '推荐',
      children: <RecommendCard/>,
    },
    {
      key: 'activity',
      label: '活动',
      children: <ActivityCard/>,
    },
  ];

  return (
    <div id={"HomePage"} style={{height: 900}}>
      <div style={{height: 300, background: "red"}}></div>
      <div style={{padding: "0 180px", marginTop: 20}}>
        <div>
          <Tabs size={"large"} defaultActiveKey="1" items={items} onChange={onChange}/>
        </div>
      </div>
    </div>
  )
};
export default HomePage;
