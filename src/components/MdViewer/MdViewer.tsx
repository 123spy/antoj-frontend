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

const MdViewer = (props: { value: String }) => {
  // const [value, setValue] = useState('')
  const {
    value = ""
  } = props;

  return (
    <Viewer
      value={value}
      plugins={plugins}
    />
  )
};

export default MdViewer;
