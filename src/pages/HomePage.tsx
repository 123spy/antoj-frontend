import {Tabs} from "antd";
import {useState} from "react";

const HomePage = () => {
  const [currentKey, setCurrentKey] = useState("new");
  const onChange = (key: string) => {
    console.log(key);
  };

  const items = [
    {
      key: 'new',
      label: '最新',
      children: <div>最新</div>,
    },
    {
      key: 'recommend',
      label: '推荐',
      children: <div>推荐</div>,
    },
    {
      key: 'activity',
      label: '活动',
      children: <div>活动</div>,
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
