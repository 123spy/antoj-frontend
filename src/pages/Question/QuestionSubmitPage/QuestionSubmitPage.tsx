import {history, useParams} from "@@/exports";
import {useEffect, useState} from "react";
import {CODE_DEFAULT_LANGUAGE} from "@/constants/CodeConstant";
import {getQuestionVoByIdUsingGet} from "@/services/apis/questionController";
import {Button, Card, Divider, message, Skeleton, Space, Tag, Typography} from "antd";
import {doSubmitUsingPost, getQuestionSubmitVoByIdUsingGet} from "@/services/apis/questionSubmitController";
import {FieldTimeOutlined, FileOutlined, TagOutlined} from "@ant-design/icons";
import MdViewer from "@/components/MdViewer/MdViewer";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import SubmitCard from "@/components/SubmitCard/SubmitCard";
import CodeEditorReadOnly from "@/components/CodeEditorOnly/CodeEditorReadOnly";
import moment from "moment";

const QuestionSubmitPage = () => {
  const params = useParams();
  const {id} = params;
  const [code, setCode] = useState("");
  const [questionSubmit, setQuestionSubmit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const res = await getQuestionSubmitVoByIdUsingGet({id: id});

    if (res?.code === 0) {
      setQuestionSubmit(res?.data);
    } else {
      message.error("加载失败, 请再次刷新");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const getLanguage = (language) => {
    if (language === 'c_cpp') {
      return "C++";
    }
    return language;
  }
  return (
    <div style={{padding: "0 220px 20px", marginTop: 20}}>
      <Skeleton loading={isLoading}>
        <Card>
          <div style={{fontSize: 26}}>
            {questionSubmit?.judgeInfo?.message === "Accepted" && <div style={{color: "rgb(45 181 93)"}}>通过</div>}
            {questionSubmit?.judgeInfo?.message !== "Accepted" && <div style={{color: "rgb(239 71 67)"}}>执行错误</div>}
          </div>
          <div style={{fontSize: 16, marginTop: 20}}>
            提交于: {moment(questionSubmit?.createTime).format("L")}
          </div>
          <div style={{marginTop: 10}}>
            <Space split={<Divider type={"vertical"}/>}>
              {questionSubmit?.judgeInfo?.message === "Accepted" && (
                <div>
                  <div>执行时间：{questionSubmit?.judgeInfo?.time} ms</div>
                  <div>消耗内存：
                    {Math.round((questionSubmit?.judgeInfo?.memory / 1024 / 1024) * 100) / 100} MB
                    {/*{questionSubmit?.judgeInfo?.memory}*/}
                  </div>
                </div>
              )}
              {questionSubmit?.judgeInfo?.message !== "Accepted" && (<div>
                <div>执行时间：N/A</div>
                <div>消耗内存：N/A</div>
              </div>)}
            </Space>
          </div>
          <Card title={<div style={{color: "black", fontSize: 16}}>{getLanguage(questionSubmit?.language)}</div>}
                style={{marginTop: 10}}>
            <CodeEditorReadOnly value={questionSubmit?.code}
                                language={questionSubmit?.language}></CodeEditorReadOnly>
          </Card>
        </Card>
      </Skeleton>
    </div>
  );
};

export default QuestionSubmitPage;
