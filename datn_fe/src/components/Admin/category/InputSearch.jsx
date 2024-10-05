import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select, theme } from 'antd';

const { Option } = Select;

const InputSearch = (props) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: '100%',
        padding: '20px',
        background: `#fff`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        color: '#222',
        fontWeight: 'bold',
        marginBottom: '24px',
        borderRadius: '20px',
    };

    const onFinish = (values) => {
        let queryParts = [];

        if (values.name) {
            queryParts.push(`name~%27${values.name}%27`);
        }
        if (values.thumbnail) {
            queryParts.push(`thumbnail~%27${values.thumbnail}%27`);
        }
        if (values.description) {
            queryParts.push(`description~%27${values.description}%27`);
        }
        if (values.hot) {
            queryParts.push(`hot~%27${values.hot}%27`);
        }
        if (values.active) {
            queryParts.push(`active~%27${values.active}%27`);
        }

        if (queryParts.length > 0) {
            const query = `filter=${queryParts.join('%20and%20')}`;
            console.log("Search query:", query);
            props.handleSearch(query);
        }
    };

    return (
        <Form form={form} name="category_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>

                <Col span={6}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name="name"
                        label="Tên danh mục"
                    >
                        <Input placeholder="Nhập tên danh mục" />
                    </Form.Item>
                </Col>

                {/*<Col span={6}>*/}
                {/*    <Form.Item*/}
                {/*        labelCol={{ span: 24 }}*/}
                {/*        name="thumbnail"*/}
                {/*        label="Ảnh thu nhỏ"*/}
                {/*    >*/}
                {/*        <Input placeholder="Nhập URL ảnh thu nhỏ" />*/}
                {/*    </Form.Item>*/}
                {/*</Col>*/}

                {/*<Col span={6}>*/}
                {/*    <Form.Item*/}
                {/*        labelCol={{ span: 24 }}*/}
                {/*        name="description"*/}
                {/*        label="Mô tả"*/}
                {/*    >*/}
                {/*        <Input placeholder="Nhập mô tả danh mục" />*/}
                {/*    </Form.Item>*/}
                {/*</Col>*/}

                <Col span={6}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name="hot"
                        label="Bán chạy"
                    >
                        <Select placeholder="Chọn trạng thái bán chạy">
                            <Option value="true">Có</Option>
                            <Option value="false">Không</Option>
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name="active"
                        label="Trạng thái"
                    >
                        <Select placeholder="Chọn trạng thái">
                            <Option value="true">Actived</Option>
                            <Option value="false">Disabled</Option>
                        </Select>
                    </Form.Item>
                </Col>

            </Row>

            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Tìm kiếm
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            form.resetFields();
                            props.setFilter("");
                        }}
                    >
                        Xóa
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default InputSearch;
