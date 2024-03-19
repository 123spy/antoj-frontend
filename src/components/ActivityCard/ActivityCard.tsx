import {Badge, Card} from "antd";
import {Link} from "react-router-dom";

const ActivityCard = () => {
  return (<div>
    <div style={{width: 350}}>
      <Badge.Ribbon text="最新" color={"red"}>
        <Card title="平台内测">
          <div>开放测试，注册送好礼</div>
          <div>优质Online Judge平台，在线开放。</div>
          <div>快来锻炼你的编程能力，获取百万年薪吧！</div>
          <div>
            <Link to={"/user/register"}>注册</Link>
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  </div>)
};

export default ActivityCard;
