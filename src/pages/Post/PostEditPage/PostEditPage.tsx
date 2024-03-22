import CodeEditor from "@/components/CodeEditor/CodeEditor";
import MdEditor from "../../../components/MdEditor/MdEditor";
import MdViewer from "@/components/MdViewer/MdViewer";
import {useEffect, useState} from "react";
import React from 'react';
import {CloseOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input, InputNumber, message, Skeleton, Space, Spin, Typography} from 'antd';
import TagInput from "@/components/TagInput/TagInput";
import FormTagInput from "@/components/Form/FormTagInput/FormTagInput";
import FormMdEditor from "@/components/Form/FormMdEditor/FormMdEditor";
import {useModel, useParams} from "@@/exports";
import {
  addQuestionUsingPost,
  getQuestionAdminVoByIdUsingGet,
  getQuestionVoByIdUsingGet, updateQuestionUsingPost
} from "@/services/apis/questionController";
import {getPostVoByIdUsingGet, updatePostUsingPost} from "@/services/apis/postController";


const PostEditPage = () => {
  const params = useParams();
  const {id} = params;
  const {initialState, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;
  const [question, setQuestion]: { question: API.QuestionAdminVO, setQuestion: any } = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  if (!currentUser || !currentUser?.id || currentUser?.userRole !== 'admin') {
    window.location.href = '/404';
  }
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // console.log('success', {...values, content: value});
    // const data = {...values, content: value, tags: tags};
    console.log("提交", values);

    const res = await updatePostUsingPost(values);
    // console.log(res);
    if (res?.code === 0) {
      message.success('更新成功');
    } else {
      message.error("更新失败");
    }
  }

  const loadData = async () => {
    setIsLoading(true);
    const res = await getPostVoByIdUsingGet({id: id});
    console.log(res);
    if (res?.code === 0) {
      setQuestion(res?.data);
    } else {
      message.error("加载失败");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div style={{padding: "0 180px", marginTop: 30}}>
      <Skeleton loading={isLoading}>
        <Form
          labelCol={{span: 2}}
          wrapperCol={{span: 22}}
          form={form}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item style={{display: "none"}} name={["id"]} label="帖子ID" initialValue={question?.id}>
            <Input disabled placeholder={"请输入帖子ID"}/>
          </Form.Item>

          <Form.Item name={["title"]} label="帖子标题" initialValue={question?.title}>
            <Input placeholder={"请输入帖子标题"}/>
          </Form.Item>

          <Form.Item name={['tags']} label={"帖子标签"} initialValue={question?.tags}>
            <FormTagInput/>
          </Form.Item>

          <Form.Item name={['content']} label={"帖子内容"} initialValue={question?.content}>
            <FormMdEditor/>
          </Form.Item>

          {
            currentUser?.userRole === "admin" && (<Form.Item shouldUpdate wrapperCol={{span: 22, offset: 2}}>
              {() => (
                <Typography>
                  <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                </Typography>
              )}
            </Form.Item>)
          }

          <Form.Item wrapperCol={{span: 22, offset: 2}}>
            <Button type="primary" htmlType="submit">
              添加帖子
            </Button>
          </Form.Item>
        </Form>
      </Skeleton>
    </div>
  )
};

export default PostEditPage;
