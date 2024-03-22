import {useState} from "react";
import {useWebSocket} from "ahooks";
import {useModel} from "@@/exports";
import {Alert, Card, Space, Spin} from "antd";
import TextArea from "antd/es/input/TextArea";

const SubmitCard = (props: { submitLoading, setSubmitLoading }) => {
  const {initialState, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;
  const [data, setData] = useState(null);
  const {submitLoading, setSubmitLoading} = props;
  // useWebSocket钩子函数会在组件加载时自动连接websocket，在组件卸载时自动销毁
  useWebSocket(`ws://localhost:8080/api/websocket/${currentUser?.id}`, {
    // webSocket 连接成功回调
    onOpen: (event: WebSocketEventMap['open'], instance: WebSocket) => {
      // 连接成功，将用户token发送给后端
      // instance.send("连接成功");
    },
    // webSocket 收到消息回调
    onMessage: (message: WebSocketEventMap['message'], instance: WebSocket) => {
      // console.log('websocket收到后端返回消息--', message);
      const oldData = {...JSON.parse(message?.data)};
      const newData = {...oldData, judgeInfo: JSON.parse(oldData?.judgeInfo)};
      setData(newData);

      setSubmitLoading(false);
    },
    // 设置失败重试次数
    reconnectLimit: 2
  });

  return (
    <div>
      <Card
        title={<Space>{submitLoading ? (<div>代码运行中<Spin style={{marginLeft: 12}}/></div>) : (<div>代码提交</div>)}</Space>}>
        <div style={{
          borderRadius: 12,
          backgroundColor: "rgb(242,243,244)",
          fontWeight: 600,
          fontSize: 20,
          padding: "20px 20px"
        }}>
          {data?.judgeInfo?.message === "Accepted" &&
            <div style={{color: "rgb(45,181,93)"}}>{data?.judgeInfo?.message}</div>}
          {data?.judgeInfo?.message !== "Accepted" && <div style={{color: "red"}}>{data?.judgeInfo?.message}</div>}
        </div>
        {/*<TextArea*/}
        {/*  style={{backgroundColor: "rgb(242,243,244)", fontSize: 17}}*/}
        {/*  value={data?.judgeInfo?.message}*/}
        {/*  autoSize={{minRows: 2}}*/}
        {/*  readOnly*/}
        {/*/>*/}
        {/*<Alert description={!props?.isLoading ? <div>{data?.judgeInfo?.message}</div> : <Spin/>}></Alert>*/}
      </Card>
    </div>
  )
};

export default SubmitCard;
