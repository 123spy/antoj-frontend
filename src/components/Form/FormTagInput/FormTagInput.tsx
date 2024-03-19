import React, {useState} from "react";
import {Input, message, Tag} from "antd";

const FormTagInput = ({value = [], onChange}) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState(value);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (tags.includes(inputValue)) {
        message.warning("标签重复");
      }
      // console.log("tags.includes(newTag)", tags.includes(inputValue));
      if (inputValue && inputValue !== '' && !tags.includes(inputValue)) {
        const newTags = [...tags, inputValue];
        setTags(newTags);
        setInputValue('');

        onChange?.(newTags);
      }
    }
  };

  // 移除标签函数（假设每个Tag都可关闭）
  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((tag, index) => tag !== tagToRemove);
    setTags(newTags);
    onChange?.(newTags);
  };

  return (
    <div>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="请输入文本并按回车添加标签"
      />
      {/* 显示已生成的标签 */}
      <div>
        {tags?.map((tag, index) => {
          // console.log(tag, index);
          return (
            <Tag color={"blue"} style={{marginTop: 9}} key={tag} closable onClose={() => removeTag(tag)}>
              {tag}
            </Tag>
          )
        })}
      </div>
    </div>
  );
};


export default FormTagInput;
