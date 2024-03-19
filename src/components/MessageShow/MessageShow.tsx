import {useState} from "react";
import {useWebSocket} from "ahooks";
import {useModel} from "@@/exports";
import {Alert, Spin} from "antd";

const MessageShow = (props: { isLoading, setIsLoading }) => {
  const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;
  const [data, setData] = useState(null);

  // useWebSocket钩子函数会在组件加载时自动连接websocket，在组件卸载时自动销毁
  useWebSocket(`ws://localhost:8080/api/websocket/${currentUser?.id}`, {
    // webSocket 连接成功回调
    onOpen: (event: WebSocketEventMap['open'], instance: WebSocket) => {
      // 连接成功，将用户token发送给后端
      // instance.send("连接成功");
    },
    // webSocket 收到消息回调
    onMessage: (message: WebSocketEventMap['message'], instance: WebSocket) => {
      console.log('websocket收到后端返回消息--', message);
      const oldData = {...JSON.parse(message?.data)};
      const newData = {...oldData, judgeInfo: JSON.parse(oldData?.judgeInfo)};
      setData(newData);
      console.log(newData);
      props.setIsLoading(false);
    },
    // 设置失败重试次数
    reconnectLimit: 2
  });

  return (
    <div>
      {/*{JSON.stringify(data)}*/}
      <Alert description={!props?.isLoading ? <div>{data?.judgeInfo?.message}</div> : <Spin/>}></Alert>
    </div>
  )
};

export default MessageShow;
