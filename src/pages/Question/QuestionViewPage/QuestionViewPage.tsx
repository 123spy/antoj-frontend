import {useEffect, useState} from "react";
import {Button, Card, Descriptions, Divider, message, Skeleton, Space, Spin, Tag} from "antd";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import {Link, useModel, useParams} from "@@/exports";
import {getQuestionVoByIdUsingGet} from "@/services/apis/questionController";
import MdViewer from "@/components/MdViewer/MdViewer";
import {CodeOutlined, FieldTimeOutlined, FileOutlined, TagOutlined} from "@ant-design/icons";
import {CODE_DEFAULT_LANGUAGE} from "@/constants/CodeConstant";
import {doSubmitUsingPost} from "@/services/apis/questionSubmitController";
import MessageShow from "@/components/MessageShow/MessageShow";
import {Typography} from 'antd';
import {history} from "@umijs/max";

const QuestionViewPage = () => {
  const params = useParams();
  const {id} = params;
  const [code, setCode] = useState("");
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [codeLanguage, setCodeLanguage] = useState(CODE_DEFAULT_LANGUAGE);
  const [isSubmit, setIsSubmit] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;
  const [dataLoading, setDataLoading] = useState(false);

  if (!currentUser || !currentUser?.id || currentUser?.userRole !== 'admin') {
    return <div>请先前往<Link to={"/user/login"}>登录</Link></div>
    // window.location.href = '/404';
  }

  const loadData = async () => {
    setIsLoading(true);
    const res = await getQuestionVoByIdUsingGet({id: id});
    if (res?.code === 0) {
      setQuestion(res?.data);
    } else {
      message.error("加载失败, 请再次刷新");
    }
    setIsLoading(false);
  };

  const onQuestionSubmit = async () => {
    const values = {code: code, language: codeLanguage, questionId: question?.id};

    if (code === "" || code === null || code === undefined || code.length <= 70) {
      message.warning("代码异常，请重新编写再进行提交");
      setSubmitLoading(false);
      return;
    }

    // if (codeLanguage !== CODE_DEFAULT_LANGUAGE) {
    //   message.warning("本平台暂时只支持Java8，其他编程语言将会尽快开通，请各位用户谅解。");
    //   setSubmitLoading(false);
    //   return;
    // }

    setIsSubmit(true);
    setDataLoading(true);

    const res = await doSubmitUsingPost(values);
    console.log(res);
    if (res?.code === 0) {

    } else {
      message.error("提交失败," + res?.message);
      setIsSubmit(false);
    }

  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{padding: "0 220px 20px", marginTop: 20}}>
      <Skeleton loading={isLoading}>
        <div>
          <Card style={{boxShadow: "0 6px 18px rgba(0, 0, 0, 0.14)"}}>
            <div>
              <Space split={<Divider style={{color: "black"}} type="vertical"/>}>
                <Typography.Link style={{fontSize: "17px"}} onClick={() => {
                  history.push(`/question/view/${question?.id}`)
                }}><FileOutlined/><span
                  style={{color: "black", marginLeft: 6}}>题目提交</span></Typography.Link>
                <Typography.Link style={{fontSize: "17px"}} onClick={() => {
                  history.push(`/question/history/${question?.id}`)
                }}><FieldTimeOutlined style={{color: "lightblue"}}/><span
                  style={{color: "gray", marginLeft: 6}}>提交历史</span></Typography.Link>
                <div>
                  <Typography.Link style={{fontSize: "17px"}}><TagOutlined/><span
                    style={{color: "black", marginLeft: 6}}>相关标签: </span></Typography.Link>
                  &nbsp;
                  <Space>{question?.tags?.map((tag, index) => {
                    return (<Tag key={index} color={"blue"}>{tag}</Tag>)
                  })}</Space>
                </div>
              </Space>
            </div>
            <div style={{display: "flex", flexDirection: "column", marginTop: 20}}>
              <h1>{question?.title}</h1>
            </div>
            <div style={{marginTop: 0}}>
              <MdViewer value={question?.content}></MdViewer>
            </div>
            <div>
              <CodeEditor value={code} setValue={setCode} setCodeLanguage={setCodeLanguage}></CodeEditor>
            </div>
            <div style={{marginTop: 20, width: "100%", display: "flex", justifyContent: "end"}}>
              <Button style={{width: 100, height: 33}} type={"primary"} onClick={onQuestionSubmit}>
                提交
              </Button>
            </div>
            <div>
              {isSubmit && (
                <div style={{marginTop: 30}}>
                  <Card style={{boxShadow: "0 6px 18px rgba(0, 0, 0, 0.14)"}}>
                    <MessageShow isLoading={dataLoading} setIsLoading={setDataLoading}></MessageShow>
                  </Card>
                </div>
              )}
            </div>
          </Card>
        </div>
      </Skeleton>
    </div>
  );
};

export default QuestionViewPage;
