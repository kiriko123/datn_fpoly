import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Upload, List, Avatar, Modal, message, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
    callGetSliders,
    callUpdateSlider,
    callGetSliderById,
    callCreateSlider,
    callDeleteSlider,
    callUploadFile,
} from '../../services/api';

const SliderCRUD = ({ onSliderChange }) => {
    const [form] = Form.useForm();
    const [sliders, setSliders] = useState([]);
    const [slider, setSlider] = useState({ id: null, imgUrl: '', title: '', description: '' });
    const [fileList, setFileList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchSliders();
    }, []);

    const fetchSliders = async () => {
        const response = await callGetSliders();
        setSliders(response.data || []);
    };

    const handleEdit = async (id) => {
        const response = await callGetSliderById(id);
        setSlider(response.data);
        setIsEditing(true);
        form.setFieldsValue(response.data);
        setFileList([]);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        await callDeleteSlider(id);
        fetchSliders();
        message.success('Slider deleted successfully');
        if (onSliderChange) onSliderChange();
    };

    const handleImageChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length > 0) {
            setSlider({ ...slider, imgUrl: newFileList[0].name });
        }
    };

    const handleSubmit = async (values) => {
        const newSlider = {
            ...values,
            imgUrl: fileList.length > 0 ? fileList[0].name : slider.imgUrl,
            id: isEditing ? slider.id : null,
        };

        try {
            if (isEditing) {
                await callUpdateSlider(newSlider);
                message.success('Slider updated successfully');
            } else {
                await callCreateSlider(newSlider);
                message.success('Slider created successfully');
            }
            fetchSliders();
            if (onSliderChange) onSliderChange();
            resetForm();
        } catch (error) {
            message.error('Error saving slider');
        }
    };

    const resetForm = () => {
        setSlider({ id: null, imgUrl: '', title: '', description: '' });
        setFileList([]);
        setIsEditing(false);
        form.resetFields();
        setIsModalVisible(false);
    };

    const handleUploadSliderImage = async ({ file, onSuccess, onError }) => {
        const res = await callUploadFile(file, 'avatar');
        if (res && res.data) {
            const newImage = res.data.fileName;
            setSlider({ ...slider, imgUrl: newImage });
            onSuccess('ok');
        } else {
            onError('Đã có lỗi khi upload file');
        }
    };

    const propsUpload = {
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        customRequest: handleUploadSliderImage,
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`Upload file thành công`);
            } else if (info.file.status === 'error') {
                message.error(`Upload file thất bại`);
            }
        },
    };

    return (
        <div style={{ padding: '20px' }}>
            <Card title="Quản lý Slider" bordered={false} style={{ width: '100%', margin: '0 auto', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
                <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: '20px', borderRadius: '4px' }}>
                    Thêm Slider
                </Button>

                <List
                    itemLayout="vertical" // Chuyển sang dạng vertical
                    dataSource={sliders}
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                width: '100%', margin: '0 auto', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '8px'
                            }}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        src={`${import.meta.env.VITE_BACKEND_URL}/storage/avatar/${item.imgUrl}`}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: '8px',
                                            border: '2px solid #1890ff',
                                        }}
                                    />
                                }
                                title={<span style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.title}</span>}
                                description={
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '14px', color: '#666' }}>{item.description}</span>
                                        <div style={{ marginLeft: 'auto' }}> {/* Đẩy các nút ra bên phải */}
                                            <Button type="link" onClick={() => handleEdit(item.id)} style={{ color: '#1890ff' }}>Chỉnh sửa</Button>
                                            <Button type="link" danger onClick={() => handleDelete(item.id)}>Xóa</Button>
                                        </div>
                                    </div>
                                }
                            />

                        </List.Item>
                    )}
                    style={{ marginTop: '20px' }}
                />
                <Modal
                    title={isEditing ? 'Chỉnh sửa Slider' : 'Thêm mới Slider'}
                    visible={isModalVisible}
                    onCancel={resetForm}
                    footer={null}
                    style={{ borderRadius: '8px' }}
                >
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item
                            label="Hình ảnh"
                            name="image"
                            rules={[{ required: true, message: 'Please upload an image!' }]}
                        >
                            <Upload
                                accept="image/*"
                                fileList={fileList}
                                onChange={handleImageChange}
                                showUploadList={false}
                                customRequest={handleUploadSliderImage}
                                {...propsUpload}
                            >
                                <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
                            </Upload>
                        </Form.Item>

                        {isEditing && slider.imgUrl && (
                            <img
                                src={`${import.meta.env.VITE_BACKEND_URL}/storage/avatar/${slider.imgUrl}`}
                                alt="Current Slider"
                                style={{ width: '100%', marginBottom: '10px', borderRadius: '8px' }}
                            />
                        )}

                        <Form.Item
                            label="Tiêu đề"
                            name="title"
                            rules={[{ required: true, message: 'Tiêu đề là bắt buộc!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[{ required: true, message: 'Mô tả là bắt buộc!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" block style={{ borderRadius: '4px' }}>
                            {isEditing ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                    </Form>
                </Modal>
            </Card>
        </div>
    );
};

export default SliderCRUD;
