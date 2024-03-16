import gfm from '@bytemd/plugin-gfm'
import {Editor, Viewer} from '@bytemd/react'
import {useState} from "react";

import 'bytemd/dist/index.css'

const plugins = [
  gfm(),
  // Add more plugins here
]

const MdEditor = (props: { value: String, setValue: any }) => {
  // const [value, setValue] = useState('')
  const {
    value = "", setValue = (value) => {
      console.log("MarkDown编辑器错误", value)
    }
  } = props;

  return (
    <Editor
      value={value}
      plugins={plugins}
      onChange={(v) => {
        setValue(v)
      }}
    />
  )
};

export default MdEditor;
