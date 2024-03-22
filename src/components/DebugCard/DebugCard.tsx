import {useModel} from "@@/exports";
import {useState} from "react";
import {useWebSocket} from "ahooks";
import {Card, Divider, Input, Space, Spin} from "antd";
import "./DebugCard.less";
import TextArea from "antd/es/input/TextArea";

const DebugCard = (props: { input: any, setInput: any, debugLoading: any, setDebugLoading: any, output: any, setOutput: any }) => {
  const {initialState, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;
  const {input, setInput, debugLoading, setDebugLoading, output, setOutput} = props;

  // useWebSocket钩子函数会在组件加载时自动连接websocket，在组件卸载时自动销毁
  useWebSocket(`ws://localhost:8080/api/websocket/${currentUser?.id}`, {
    // webSocket 连接成功回调
    onOpen: (event: WebSocketEventMap['open'], instance: WebSocket) => {
      // 连接成功，将用户token发送给后端
      // instance.send("连接成功");
    },
    // webSocket 收到消息回调
    onMessage: (message: WebSocketEventMap['message'], instance: WebSocket) => {
      // console.log('程序Debug: ', message);
      const data = {...JSON.parse(message?.data)};
      setOutput(data);
      // console.log(data);
      setDebugLoading(false);
    },
    // 设置失败重试次数
    reconnectLimit: 2
  });

  return (
    <div>
      <Card
        title={<Space>{debugLoading ? (<div>代码运行中<Spin style={{marginLeft: 12}}/></div>) : (<div>代码调试</div>)}</Space>}>
        <TextArea
          style={{fontSize: 17}}
          value={input}
          autoSize={{minRows: 2}}
          onChange={(e) => {
            setInput(e.target.value)
          }}
        />
        <Divider/>
        <TextArea
          style={{backgroundColor: "rgb(242,243,244)", fontSize: 17}}
          readOnly
          value={output?.outputList[0]}
          autoSize={{minRows: 2, maxRows: 50}}
        />
      </Card>
    </div>)
};

export default DebugCard;
