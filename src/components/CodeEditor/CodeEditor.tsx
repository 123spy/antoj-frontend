import React, {useState} from "react";
import {render} from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const CodeEditor = (props: { value: String, setValue: any }) => {
  // const [value, setValue] = useState();
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
      <AceEditor
        width={"100%"}
        value={value}
        tabSize={4}
        maxLines={200}
        minLines={30}
        mode="java"
        theme="github"
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
    </div>
  )
};

export default CodeEditor;
