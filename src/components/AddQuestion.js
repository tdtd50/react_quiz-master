import React, { useState } from 'react';
import { Form, Input, Button, message, Select, Space } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const AddQuestion = ({ onSuccess, onCancel }) => { // 添加 onCancel 参数
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    
    // 模拟网络延迟
    setTimeout(() => {
      console.log('提交的题目数据:', values);
      
      // 演示模式，只显示成功消息
      message.success(`已添加题目：${values.question}（演示模式）`, 2);
      
      // 重置表单
      form.resetFields();
      
      // 通知父组件添加成功
      if (onSuccess) {
        onSuccess();
      }
      
      setLoading(false);
    }, 500);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="question"
        label="题目内容"
        rules={[{ required: true, message: '请输入题目内容' }]}
      >
        <TextArea rows={3} placeholder="请输入题目内容" />
      </Form.Item>

      <Space style={{ width: '100%' }} wrap>
        <Form.Item
          name="optionA"
          label="选项A"
          style={{ flex: 1 }}
        >
          <Input placeholder="选项A" />
        </Form.Item>
        
        <Form.Item
          name="optionB"
          label="选项B"
          style={{ flex: 1 }}
        >
          <Input placeholder="选项B" />
        </Form.Item>
        
        <Form.Item
          name="optionC"
          label="选项C"
          style={{ flex: 1 }}
        >
          <Input placeholder="选项C" />
        </Form.Item>
        
        <Form.Item
          name="optionD"
          label="选项D"
          style={{ flex: 1 }}
        >
          <Input placeholder="选项D" />
        </Form.Item>
      </Space>

      <Form.Item
        name="answer"
        label="正确答案"
        rules={[{ required: true, message: '请选择正确答案' }]}
      >
        <Select placeholder="选择正确答案">
          <Option value="A">A</Option>
          <Option value="B">B</Option>
          <Option value="C">C</Option>
          <Option value="D">D</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          {/* 取消按钮在左边 */}
          <Button onClick={onCancel}>
            取消
          </Button>
          
          {/* 提交按钮在右边 */}
          <Button type="primary" htmlType="submit" loading={loading}>
            提交
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default AddQuestion;