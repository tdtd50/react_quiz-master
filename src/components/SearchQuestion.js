/* 

import React, { useState } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Button, Modal, message } from 'antd';
import AddQuestion from './AddQuestion';

const { Search } = Input;

const SearchQuestion = ({ onSearch }) => {
  const [open, setOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    message.success('题目添加成功');
    setOpen(false);
    // 触发刷新
    setRefreshFlag(prev => prev + 1);
    if (onSearch) {
      onSearch(''); // 触发重新搜索
    }
  };

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  const handleSearch = (value) => {
    console.log('搜索题目:', value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <>
      <Space direction="horizontal" style={{ margin: '16px 0 16px 16px' }}>
        <Search
          placeholder="请输入题目关键词"
          allowClear
          enterButton="查询题目"
          size="large"
          style={{ width: '300px' }}
          onSearch={handleSearch}
        />
        <Button type="primary" size="large" onClick={showModal}>
          添加题目
        </Button>
      </Space>

      <Modal
        title="添加题目"
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <AddQuestion onSuccess={handleSuccess} onCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default SearchQuestion; */

import React, { useState } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Button, Modal, message } from 'antd';
import AddQuestion from './AddQuestion';

const { Search } = Input;

const SearchQuestion = ({ onSearch }) => {
  const [open, setOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    message.success('题目添加成功！', 2);
    setOpen(false);
    // 触发刷新
    setRefreshFlag(prev => prev + 1);
    if (onSearch) {
      onSearch(''); // 触发重新搜索
    }
  };

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  const handleSearch = (value) => {
    console.log('搜索题目:', value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <>
      <Space direction="horizontal" style={{ margin: '16px 0 16px 16px' }}>
        <Search
          placeholder="请输入题目关键词"
          allowClear
          enterButton="查询题目"
          size="large"
          style={{ width: '300px' }}
          onSearch={handleSearch}
        />
        <Button type="primary" size="large" onClick={showModal}>
          添加题目
        </Button>
      </Space>

      <Modal
        title="添加题目"
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <AddQuestion onSuccess={handleSuccess} onCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default SearchQuestion;