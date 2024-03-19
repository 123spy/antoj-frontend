import React, {useEffect, useState} from "react";
import {render} from "react-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-textmate";

import "ace-builds/src-noconflict/ext-language_tools";
import {Button, Card, Divider, Modal, Select} from "antd";
import {CodeOutlined, SettingOutlined} from "@ant-design/icons";
import "./CodeEditor.less";
import {CODE_DEFAULT_LANGUAGE} from "@/constants/CodeConstant";

const CodeEditor = (props: { value: String, setValue: any, setCodeLanguage: any }) => {
  // const [value, setValue] = useState();
  const [language, setLanguage] = useState(CODE_DEFAULT_LANGUAGE);
  // props?.setCodeLanguage(language);

  const [theme, setTheme] = useState("textmate");
  const [tabSize, setTabSize] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    value = "", setValue = (value) => {
      console.log("参数传递错误", value)
    }
  } = props;

  function onChange(newValue: String) {
    // console.log("change", newValue);
    setValue(newValue);
  }

  return (
    <div>
      <Modal title="代码编辑器设置" footer={[]} open={isModalOpen} onCancel={handleCancel}>
        <Divider/>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div>编程语言</div>
          <div>
            <Select
              value={language}
              style={{width: 140}}
              onChange={(v) => {
                setLanguage(v);
                props?.setCodeLanguage(v);
              }}
              options={[
                {value: 'java', label: 'Java'},
                {value: 'c_cpp', label: 'C++'},
              ]}
            />
          </div>
        </div>
        <Divider/>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div>缩进长度</div>
          <div>
            <Select
              defaultValue="4"
              style={{width: 140}}
              onChange={(v) => {
                setTabSize(v)
              }}
              options={[
                {value: '4', label: '4'},
                {value: '2', label: '2'},
              ]}
            />
          </div>
        </div>
        <Divider/>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div>编辑器风格</div>
          <div>
            <Select
              defaultValue="textmate"
              style={{width: 140}}
              onChange={(v) => {
                setTheme(v)
              }}
              options={[
                {value: 'textmate', label: 'textmate'},
                {value: 'github', label: 'github'},
              ]}
            />
          </div>
        </div>
      </Modal>
      <Card
        className={"custom-padding-card"}
        title={<div style={{display: "flex", alignItems: "center"}}><CodeOutlined style={{color: "rgb(2,177,40)"}}/>
          <div style={{marginLeft: 10}}>
            <Select
              variant={"borderless"}
              // bordered={false}
              value={language}
              style={{width: 90}}
              onChange={(v) => {
                setLanguage(v);
                props?.setCodeLanguage(v);
              }}
              options={[
                {value: 'java', label: 'Java'},
                {value: 'c_cpp', label: 'C++'},
              ]}
            /></div>
        </div>}
        style={{marginTop: 20}}
        extra={
          <div>
            <Button onClick={showModal}>
              <SettingOutlined/>设置
            </Button>
          </div>
        }
      >
        <AceEditor
          style={{borderTop: "1px solid #ccc"}}
          width={"100%"}
          value={value}
          tabSize={tabSize}
          maxLines={200}
          minLines={30}
          mode={language}
          theme={theme}
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showPrintMargin: false,
            autoScrollEditorIntoView: true,
          }}
        />
      </Card>
    </div>
  )
};

export default CodeEditor;
