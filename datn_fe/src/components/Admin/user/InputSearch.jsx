import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';

const InputSearch = (props) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: '100%',
        padding: '20px',
        background: `#fff`, // Màu cam nhạt nổi bật
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        color: '#222', // Chữ đậm với màu xám tối
        fontWeight: 'bold', // Chữ đậm
        marginBottom: '24px',
        borderRadius: '20px',
    };

    const onFinish = (values) => {
        let queryParts = [];

        // Build query parts
        if (values.fullName) {
            queryParts.push(`name~%27${values.fullName}%27`);
        }

        if (values.email) {
            queryParts.push(`email~%27${values.email}%27`);
        }

        // if (values.phone) {
        //     queryParts.push(`phone~%27${values.phone}%27`);
        // }

        // Join query parts with ' and ' if there are any
        if (queryParts.length > 0) {
            const query = `filter=${queryParts.join('%20and%20')}`;
            console.log("Search query:", query);
            props.handleSearch(query);
        }

        //remove undefined
        // https://stackoverflow.com/questions/25421233/javascript-removing-undefined-fields-from-an-object
        // Object.keys(values).forEach(key => {
        //     if (values[key] === undefined) {
        //         delete values[key];
        //     }
        // });

        // if (values && Object.keys(values).length > 0) {
        //     // https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
        //     const params = new URLSearchParams(values).toString();
        //     props.handleSearch(params);
        // }
    };


    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`fullName`}
                        label={`Name`}
                    >
                        <Input placeholder="Please input name!" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`email`}
                        label={`Email`}
                    >
                        <Input placeholder="Please input email!" />
                    </Form.Item>
                </Col>

                {/*<Col span={8}>*/}
                {/*    <Form.Item*/}
                {/*        labelCol={{ span: 24 }} //whole column*/}
                {/*        name={`phone`}*/}
                {/*        label={`Add thêm`}*/}
                {/*    >*/}
                {/*        <Input placeholder="placeholder" />*/}
                {/*    </Form.Item>*/}
                {/*</Col>*/}
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            form.resetFields();
                            props.setFilter("");
                        }}
                    >
                        Clear
                    </Button>
                    {/* <a
                        style={{ fontSize: 12 }}
                        onClick={() => {
                            setExpand(!expand);
                        }}
                    >
                        {expand ? <UpOutlined /> : <DownOutlined />} Collapse
                    </a> */}
                </Col>
            </Row>
        </Form>
    );
};


export default InputSearch;
