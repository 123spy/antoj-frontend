import gfm from '@bytemd/plugin-gfm'
import {Editor, Viewer} from '@bytemd/react'
import {useState} from "react";

import 'bytemd/dist/index.css'

const plugins = [
  gfm(),
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
