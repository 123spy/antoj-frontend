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
import "./CodeEditorReadOnly.less";
import {CODE_DEFAULT_LANGUAGE} from "@/constants/CodeConstant";

const CodeEditor = (props: { value: String, language: String }) => {
  const {
    value = "", language = CODE_DEFAULT_LANGUAGE
  } = props;

  return (
    <div>
      <Card
        className={"custom-padding-card"}
      >
        <AceEditor
          width={"100%"}
          value={value}
          tabSize={4}
          readOnly={true}
          maxLines={200}
          minLines={30}
          mode={language}
          theme={"textmate"}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
          setOptions={{
            showPrintMargin: false,
          }}
        />
      </Card>
    </div>
  )
};

export default CodeEditor;
