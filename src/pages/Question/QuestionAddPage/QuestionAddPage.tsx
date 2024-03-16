import CodeEditor from "@/components/CodeEditor/CodeEditor";
import MdEditor from "../../../components/MdEditor/MdEditor";
import MdViewer from "@/components/MdViewer/MdViewer";
import {useState} from "react";

const QuestionAddPage = () => {
  const [codeValue, setCodeValue] = useState("");
  const [mdValue, setMdValue] = useState("");

  return (
    <div style={{padding: "0 180px", marginTop: 30}}>
      题目添加
      <div>
        {codeValue}
        <CodeEditor value={codeValue} setValue={setCodeValue}></CodeEditor>

        {mdValue}
        <MdEditor value={mdValue} setValue={setMdValue}></MdEditor>
        <MdViewer value={mdValue}></MdViewer>
      </div>
    </div>
  )
};

export default QuestionAddPage;
