import gfm from '@bytemd/plugin-gfm'
import highlightSsr from '@bytemd/plugin-highlight-ssr'
import highlight from '@bytemd/plugin-highlight'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import math from '@bytemd/plugin-math'
import mathSsr from '@bytemd/plugin-math-ssr'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'

import {Editor, Viewer} from '@bytemd/react'
import {useState} from "react";

import 'bytemd/dist/index.css'
import "github-markdown-css/github-markdown.css";
import "./FormMdEditor.less";

const plugins = [
  gfm(),
  breaks(),
  frontmatter(),
  gemoji(),
  highlight(),
  highlightSsr(),
  math(),
  mathSsr(),
  mediumZoom(),
  mermaid()
  // Add more plugins here
]

const FormMdEditor = ({value = "", onChange}) => {
  const [mdValue, setMdValue] = useState(value)

  return (
    <Editor
      placeholder={"编辑器支持MekDown、Latex文本"}
      value={mdValue}
      plugins={plugins}
      onChange={(v) => {
        setMdValue(v);
        onChange?.(v);
      }}
    />
  )
};

export default FormMdEditor;
