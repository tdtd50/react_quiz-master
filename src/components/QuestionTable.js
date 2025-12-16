import { Space, Table, message, Modal, Form, Input, Button, Select } from 'antd';
import React, { useState, useEffect } from 'react';

const { TextArea } = Input;
const { Option } = Select;

// 修正后的题目数据（每个题目只有一个答案）
const mockQuestionData = [
    {
        key: '1',
        id: '1',
        question: '什么是React？',
        options: ['A. 一个库', 'B. 一个框架', 'C. 一个语言'],
        answer: 'A'
    },
    {
        key: '2',
        id: '2',
        question: 'React的生命周期函数有哪些？',
        options: ['A. componentDidMount', 'B. componentDidUpdate', 'C. componentWillUnmount'],
        answer: 'A'
    },
    {
        key: '3',
        id: '3',
        question: 'React的状态管理有哪些方式？',
        options: ['A. Redux', 'B. MobX', 'C. Context API'],
        answer: 'A'
    },
    {
        key: '4',
        id: '4',
        question: 'React的性能优化手段有哪些？',
        options: ['A. 代码分割', 'B. 懒加载', 'C. 服务器端渲染'],
        answer: 'A'
    },
    {
        key: '5',
        id: '5',
        question: 'React的路由管理有哪些方式？',
        options: ['A. React Router', 'B. Next.js', 'C. Reach Router'],
        answer: 'A'
    },
    {
        key: '6',
        id: '6',
        question: 'JavaScript闭包的应用场景',
        options: ['A. 私有变量', 'B. 模块化', 'C. 防抖节流'],
        answer: 'A'
    },
    {
        key: '7',
        id: '7',
        question: 'CSS盒模型的组成部分',
        options: ['A. 内容区', 'B. 内边距', 'C. 边框', 'D. 外边距'],
        answer: 'A'
    },
    {
        key: '8',
        id: '8',
        question: 'HTTP和HTTPS的主要区别',
        options: ['A. 安全性不同', 'B. 端口不同', 'C. 是否需要证书'],
        answer: 'A'
    },
    {
        key: '9',
        id: '9',
        question: '什么是RESTful API设计原则？',
        options: ['A. 无状态', 'B. 统一接口', 'C. 客户端-服务器架构'],
        answer: 'A'
    },
    {
        key: '10',
        id: '10',
        question: 'Git工作流程的最佳实践',
        options: ['A. 频繁提交', 'B. 使用分支', 'C. 编写有意义的提交信息'],
        answer: 'A'
    }
];

const QuestionTab = ({ searchKeyword, refreshFlag }) => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: mockQuestionData.length,
        showSizeChanger: false,
        placement: 'bottomLeft',
    });
    const [loading, setLoading] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [form] = Form.useForm();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);

    // 定义表格列
    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '题目',
            dataIndex: 'question',
            key: 'question',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '选项',
            dataIndex: 'options',
            key: 'options',
            render: (options) => options.join(', ')
        },
        {
            title: '答案',
            dataIndex: 'answer',
            key: 'answer',
        },
        {
            title: '操作',
            key: 'action',
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
            let filteredData = [...mockQuestionData];
            
            // 如果有搜索关键词，进行过滤
            if (keyword && keyword.trim() !== '') {
                filteredData = mockQuestionData.filter(question => 
                    question.question.toLowerCase().includes(keyword.toLowerCase())
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

    // 编辑题目
    const handleEdit = (record) => {
        console.log('编辑题目:', record);
        setEditingQuestion(record);
        
        // 设置表单初始值
        form.setFieldsValue({
            question: record.question,
            optionA: record.options[0]?.replace('A. ', '') || '',
            optionB: record.options[1]?.replace('B. ', '') || '',
            optionC: record.options[2]?.replace('C. ', '') || '',
            optionD: record.options[3]?.replace('D. ', '') || '',
            answer: record.answer
        });
        setEditModalVisible(true);
    };

    // 保存编辑
    const handleEditSave = async () => {
        try {
            const values = await form.validateFields();
            console.log('编辑表单值:', values);
            
            // 演示模式，只显示消息
            message.success(`已更新题目：${values.question}（演示模式）`);
            setEditModalVisible(false);
            
            // 刷新数据
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };

    // 删除题目
    const handleDelete = (record) => {
        setQuestionToDelete(record);
        setDeleteModalVisible(true);
    };

    // 确认删除
    const handleDeleteConfirm = () => {
        // 演示模式，只显示消息（这里会显示删除成功的消息）
        message.success(`已删除题目：${questionToDelete.question}（演示模式）`, 2);
        setDeleteModalVisible(false);
    };

    // 页码变化时的回调
    const handleTableChange = (pag) => {
        console.log('页码变化:', pag);
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

            {/* 编辑题目模态框 */}
            <Modal
                title="编辑题目"
                open={editModalVisible}
                onOk={handleEditSave}
                onCancel={() => setEditModalVisible(false)}
                okText="保存"
                cancelText="取消"
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
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
                            <Input placeholder="选项A内容" />
                        </Form.Item>
                        
                        <Form.Item
                            name="optionB"
                            label="选项B"
                            style={{ flex: 1 }}
                        >
                            <Input placeholder="选项B内容" />
                        </Form.Item>
                        
                        <Form.Item
                            name="optionC"
                            label="选项C"
                            style={{ flex: 1 }}
                        >
                            <Input placeholder="选项C内容" />
                        </Form.Item>
                        
                        <Form.Item
                            name="optionD"
                            label="选项D"
                            style={{ flex: 1 }}
                        >
                            <Input placeholder="选项D内容" />
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
                    确定要删除题目 "{questionToDelete?.question}" 吗？
                </p>
                <p style={{ color: '#999', margin: 0 }}>
                    （演示模式，不会实际删除）
                </p>
            </Modal>
        </>
    );
};

export default QuestionTab;