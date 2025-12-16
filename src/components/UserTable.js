import { Space, Table, message, Modal, Form, Input, Button } from 'antd';
import React, { useState, useEffect } from 'react';

// 虚拟用户数据
const mockUserData = [
    { key: '1', id: '1', userName: 'John Brown', date: '2025-01-01' },
    { key: '2', id: '2', userName: 'Jim Green', date: '2025-01-02' },
    { key: '3', id: '3', userName: 'Joe Black', date: '2025-01-03' },
    { key: '4', id: '4', userName: 'Alice White', date: '2025-01-04' },
    { key: '5', id: '5', userName: 'Bob Smith', date: '2025-01-05' },
    { key: '6', id: '6', userName: 'Charlie Davis', date: '2025-01-06' },
    { key: '7', id: '7', userName: 'David Wilson', date: '2025-01-07' },
    { key: '8', id: '8', userName: 'Emma Johnson', date: '2025-01-08' },
    { key: '9', id: '9', userName: 'Frank Miller', date: '2025-01-09' },
    { key: '10', id: '10', userName: 'Grace Lee', date: '2025-01-10' },
];

const UserTable = ({ searchKeyword, refreshFlag }) => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: mockUserData.length,
        showSizeChanger: false,
        placement: 'bottomLeft',
    });
    const [loading, setLoading] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form] = Form.useForm();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // 定义表格列
    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
            render: (text) => <a>{text}</a>,
            width: 180,
        },
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
            width: 150,
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
                    <Button type="link" danger onClick={() => handleDelete(record)}>删除</Button>
                </Space>
            ),
        },
    ];

    // 模拟获取数据
    const fetchData = (page = 1, pageSize = 5, keyword = '') => {
        setLoading(true);
        
        // 模拟网络延迟
        setTimeout(() => {
            let filteredData = [...mockUserData];
            
            // 如果有搜索关键词，进行过滤
            if (keyword && keyword.trim() !== '') {
                filteredData = mockUserData.filter(user => 
                    user.userName.toLowerCase().includes(keyword.toLowerCase())
                );
            }
            
            // 计算分页数据
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const paginatedData = filteredData.slice(start, end);
            
            setData(paginatedData);
            setPagination({
                current: page,
                pageSize: pageSize,
                total: filteredData.length,
                showSizeChanger: false,
                placement: 'bottomLeft',
            });
            setLoading(false);
        }, 300); // 300ms 延迟模拟网络请求
    };

    // 编辑用户
    const handleEdit = (record) => {
        setEditingUser(record);
        form.setFieldsValue({
            username: record.userName,
            password: '',
            confirm: ''
        });
        setEditModalVisible(true);
    };

    // 保存编辑
    const handleEditSave = async () => {
        try {
            const values = await form.validateFields();
            
            // 演示模式，只显示消息
            message.success(`已更新用户信息：${values.username}（演示模式）`, 2);
            setEditModalVisible(false);
            
            // 刷新数据
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };

    // 删除用户
    const handleDelete = (record) => {
        setUserToDelete(record);
        setDeleteModalVisible(true);
    };

    // 确认删除
    const handleDeleteConfirm = () => {
        // 演示模式，只显示消息
        message.success(`已删除用户：${userToDelete.userName}（演示模式）`, 2);
        setDeleteModalVisible(false);
    };

    // 页码变化时的回调
    const handleTableChange = (pag) => {
        fetchData(pag.current, pag.pageSize, searchKeyword);
    };

    // 监听搜索关键词和刷新标志
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [searchKeyword, refreshFlag]);

    return (
        <>
            <style>{`
                .ant-pagination-item {
                    margin-right: 3px !important;
                    margin-left: 3px !important;
                }
                .ant-pagination-prev,
                .ant-pagination-next {
                    margin-right: 3px !important;
                    margin-left: 3px !important;
                }
                .ant-table-wrapper .ant-table-pagination.ant-pagination {
                    justify-content: flex-start !important;
                }
            `}</style>
            
            <Table
                columns={columns}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                rowKey="id"
                bordered
                size="middle"
            />

            {/* 编辑用户模态框 */}
            <Modal
                title="编辑用户"
                open={editModalVisible}
                onOk={handleEditSave}
                onCancel={() => setEditModalVisible(false)}
                okText="保存"
                cancelText="取消"
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[
                            { required: true, message: '请输入用户名!' },
                            { min: 2, message: '用户名至少2个字符!' },
                            { max: 20, message: '用户名最多20个字符!' },
                        ]}
                    >
                        <Input placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="新密码"
                        rules={[
                            { min: 6, message: '密码至少6个字符!' }
                        ]}
                    >
                        <Input.Password placeholder="留空表示不修改密码" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || !getFieldValue('password') || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="确认新密码" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* 删除确认弹窗 */}
            <Modal
                title="确认删除"
                open={deleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={() => setDeleteModalVisible(false)}
                okText="确定"
                cancelText="取消"
                centered
            >
                <p style={{ marginBottom: '10px' }}>
                    确定要删除用户 "{userToDelete?.userName}" 吗？
                </p>
                <p style={{ color: '#999', margin: 0 }}>
                    （演示模式，不会实际删除）
                </p>
            </Modal>
        </>
    );
};

export default UserTable;