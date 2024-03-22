import {useEffect, useState} from "react";
import {Button, Card, Descriptions, Divider, Input, message, Skeleton, Space, Spin, Tag} from "antd";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import {Link, useModel, useParams} from "@@/exports";
import {getQuestionVoByIdUsingGet} from "@/services/apis/questionController";
import MdViewer from "@/components/MdViewer/MdViewer";
import {CodeOutlined, FieldTimeOutlined, FileOutlined, TagOutlined} from "@ant-design/icons";
import {CODE_DEFAULT_LANGUAGE} from "@/constants/CodeConstant";
import {doDebugUsingPost, doSubmitUsingPost} from "@/services/apis/questionSubmitController";
import SubmitCard from "@/components/SubmitCard/SubmitCard";
import {Typography} from "antd";
import {history} from "@umijs/max";
import DebugCard from "@/components/DebugCard/DebugCard";

const QuestionViewPage = () => {
  const params = useParams();
  const {id} = params;
  // 保存localstorage
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [codeLanguage, setCodeLanguage] = useState(CODE_DEFAULT_LANGUAGE);
  const [code, setCode] = useState(localStorage.getItem(`${id}::${codeLanguage}`) ? localStorage.getItem(`${id}::${codeLanguage}`) : "");
  const {initialState, setInitialState} = useModel("@@initialState");
  const {currentUser} = initialState;
  const [debugLoading, setDebugLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [current, setCurrent] = useState(null);

  if (!currentUser || !currentUser?.id || currentUser?.userRole !== "admin") {
    return (
      <div>
        请先前往<Link to={"/user/login"}>登录</Link>
      </div>
    );
  }

  const loadData = async () => {
    setLoading(true);
    const res = await getQuestionVoByIdUsingGet({id: id});
    if (res?.code === 0) {
      console.log(res?.data);

      setQuestion(res?.data);

      setInput(res?.data?.inputCase)
    } else {
      message.error("加载失败, 请再次刷新");
    }
    setLoading(false);
  };


  const onQuestionDebug = async () => {
    setDebugLoading(true);
    setOutput(null);
    const values = {
      code: code,
      input: input,
      language: codeLanguage,
      questionId: id
    }
    // console.log(values);
    setCurrent("debug");
    const res = await doDebugUsingPost(values);
    // console.log(res);
  };

  const onQuestionSubmit = async () => {
    const values = {code: code, language: codeLanguage, questionId: question?.id};

    if (code === "" || code === null || code === undefined || code.length <= 70) {
      message.warning("代码异常，请重新编写再进行提交");
      return;
    }

    setCurrent("submit");
    setSubmitLoading(true);
    const res = await doSubmitUsingPost(values);
    // console.log(res);
    if (res?.code === 0) {
    } else {
      message.error("提交失败," + res?.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{padding: "0 220px 20px", marginTop: 20}}>
      <Skeleton loading={loading}>
        <Card style={{boxShadow: "0 6px 18px rgba(0, 0, 0, 0.14)"}}>
          <div>
            <Space split={<Divider style={{color: "black"}} type="vertical"/>}>
              <Typography.Link
                style={{fontSize: "17px"}}
                onClick={() => {
                  history.push(`/question/view/${question?.id}`);
                }}
              >
                <FileOutlined/>
                <span style={{color: "black", marginLeft: 6}}>题目提交</span>
              </Typography.Link>
              <Typography.Link
                style={{fontSize: "17px"}}
                onClick={() => {
                  history.push(`/question/history/${question?.id}`);
                }}
              >
                <FieldTimeOutlined style={{color: "lightblue"}}/>
                <span style={{color: "gray", marginLeft: 6}}>提交历史</span>
              </Typography.Link>
              <div>
                <Typography.Link style={{fontSize: "17px"}}>
                  <TagOutlined/>
                  <span style={{color: "black", marginLeft: 6}}>相关标签: </span>
                </Typography.Link>
                &nbsp;
                <Space>
                  {question?.tags?.map((tag, index) => {
                    return (
                      <Tag key={index} color={"blue"}>
                        {tag}
                      </Tag>
                    );
                  })}
                </Space>
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
            <CodeEditor id={question?.id} language={codeLanguage} value={code} setValue={setCode}
                        setCodeLanguage={setCodeLanguage}></CodeEditor>
          </div>
          <div style={{marginTop: 20, width: "100%", display: "flex", justifyContent: "end"}}>
            <Space>
              <Button style={{width: 100, height: 33}} type={"primary"} onClick={onQuestionDebug}>
                运行
              </Button>
              <Button style={{width: 100, height: 33, background: "rgb(45 181 93)", color: "white"}}
                      onClick={onQuestionSubmit}>
                提交
              </Button>
            </Space>
          </div>

          <div style={{marginTop: 40}}>
            {
              current === 'debug' && (
                <DebugCard input={input} setInput={setInput} debugLoading={debugLoading} setDebugLoading={setDebugLoading}
                           output={output} setOutput={setOutput}></DebugCard>)
            }
            {
              current === 'submit' && (
                <SubmitCard submitLoading={submitLoading} setSubmitLoading={setSubmitLoading}></SubmitCard>)
            }
          </div>
        </Card>
      </Skeleton>
    </div>
  )
};

export default QuestionViewPage;
