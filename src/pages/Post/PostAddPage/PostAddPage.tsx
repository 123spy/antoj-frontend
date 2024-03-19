import CodeEditor from "@/components/CodeEditor/CodeEditor";
import MdEditor from "../../../components/MdEditor/MdEditor";
import MdViewer from "@/components/MdViewer/MdViewer";
import {useState} from "react";
import React from 'react';
import {CloseOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input, InputNumber, message, Space, Typography} from 'antd';
import TagInput from "@/components/TagInput/TagInput";
import FormTagInput from "@/components/Form/FormTagInput/FormTagInput";
import FormMdEditor from "@/components/Form/FormMdEditor/FormMdEditor";
import {useModel} from "@@/exports";
import {addQuestionUsingPost} from "@/services/apis/questionController";
import {addPostUsingPost} from "@/services/apis/postController";


const PostAddPage = () => {
  const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;
  if (!currentUser || !currentUser?.id) {
    message.info("发布帖子请先登录");
    window.location.href = '/user/login';
  }
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // console.log('success', {...values, content: value});
    // const data = {...values, content: value, tags: tags};
    console.log("提交", values);

    const res = await addPostUsingPost(values);
    // console.log(res);
    if (res?.code === 0) {
      message.success('添加成功');
    } else {
      message.error("添加失败");
    }
  }

  return (
    <div style={{padding: "0 180px", marginTop: 30}}>
      <Form
        labelCol={{span: 2}}
        wrapperCol={{span: 22}}
        form={form}
        autoComplete="off"
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item name={["title"]} label="帖子标题">
          <Input placeholder={"请输入帖子标题"}/>
        </Form.Item>

        <Form.Item name={['tags']} label={"帖子标签"}>
          <FormTagInput/>
        </Form.Item>

        <Form.Item name={['content']} label={"帖子内容"}>
          <FormMdEditor/>
        </Form.Item>

        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加帖子
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};

export default PostAddPage;
