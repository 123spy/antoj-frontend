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


const QuestionAddPage = () => {
  const {initialState, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;
  if (!currentUser || !currentUser?.id || currentUser?.userRole !== 'admin') {
    window.location.href = '/404';
  }
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // console.log('success', {...values, content: value});
    // const data = {...values, content: value, tags: tags};
    console.log("提交", values);

    const res = await addQuestionUsingPost(values);
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
        <Form.Item name={["title"]} label="题目标题">
          <Input placeholder={"请输入题目标题"}/>
        </Form.Item>

        <Form.Item name={['tags']} label={"题目标签"}>
          <FormTagInput/>
        </Form.Item>

        <Form.Item name={['content']} label={"题目内容"}>
          <FormMdEditor/>
        </Form.Item>

        <Form.Item label={"判题配置"}>
          <Form.Item name={['judgeConfig', 'memoryLimit']} label="内存限制(KB)">
            <InputNumber/>
          </Form.Item>
          <Form.Item name={['judgeConfig', 'stackLimit']} label="堆栈限制(KB)">
            <InputNumber/>
          </Form.Item>
          <Form.Item name={['judgeConfig', 'timeLimit']} label="时间限制(ms)">
            <InputNumber/>
          </Form.Item>
        </Form.Item>

        <Form.Item label={"判题用例"}>
          <Form.List name="judgeCase">
            {(fields, {add, remove}) => (
              <>
                {fields.map(({key, name, ...restField}) => (
                  <Card key={key} title={`样例`} style={{marginBottom: 20}}
                        extra={
                          <div onClick={() => remove(name)}
                               style={{
                                 cursor: "pointer",
                                 display: "flex",
                                 alignItems: "center",
                                 justifyItems: "center"
                               }}>
                            <MinusCircleOutlined/>
                            <div>
                              移除
                            </div>
                          </div>
                        }>
                    <div key={key} style={{display: 'flex', marginBottom: 8, flexDirection: "column"}}>
                      <Form.Item
                        style={{flex: 1}}
                        {...restField}
                        name={[name, 'input']}
                        label={"输入用例"}
                      >
                        <Input.TextArea rows={1} placeholder="输入用例"/>
                      </Form.Item>
                      <Form.Item
                        style={{flex: 1}}
                        {...restField}
                        label={"输出用例"}
                        name={[name, 'output']}
                      >
                        <Input.TextArea rows={1} placeholder="输出用例"/>
                      </Form.Item>
                      {/*<MinusCircleOutlined onClick={() => remove(name)}/>*/}
                    </div>
                  </Card>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                    添加测试用例
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        {/*<Form.Item noStyle shouldUpdate label={"判题用例"}>*/}
        {
          currentUser?.userRole === "admin" && (<Form.Item shouldUpdate label={""} wrapperCol={{span: 22, offset: 2}}>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>)
        }

        <Form.Item label={""} labelCol={{span: 2}} wrapperCol={{span: 22, offset: 2}}>
          <Button type="primary" htmlType="submit">
            添加题目
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};

export default QuestionAddPage;
