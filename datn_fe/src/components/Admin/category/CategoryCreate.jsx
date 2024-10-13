import React, { useState } from 'react';
import {Col, Divider, Form, Input, message, Modal, notification, Radio, Row, Upload} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { callCreateCategory, callUploadFile } from '../../../services/api';

const CategoryModalCreate = ({ openModalCreate, setOpenModalCreate, fetchCategory }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const onFinish = async (values) => {
        if (fileList.length === 0) {
            notification.error({
                message: 'Lỗi validate',
                description: 'Vui lòng upload ảnh thumbnail'
            })
            return;
        }

        const { name, description, hot } = values;
        let thumbnail = '';

        // Kiểm tra xem fileList[0] và fileList[0].url có tồn tại không
        if (fileList[0] && fileList[0].url) {
            thumbnail = fileList[0].url.split('/').pop();
        } else if (fileList[0] && fileList[0].response && fileList[0].response.data) {
            // Nếu url không tồn tại, thử lấy từ response
            thumbnail = fileList[0].response.data.fileName;
        } else {
            notification.error({
                message: 'Lỗi',
                description: 'Không thể lấy thông tin thumbnail'
            });
            return;
        }

        setIsSubmit(true);
        try {
            const res = await callCreateCategory({ name, thumbnail, description, hot});
            if (res && res.data) {
                message.success('Thêm mới danh mục thành công');
                form.resetFields();
                setFileList([]);
                setOpenModalCreate(false);
                await fetchCategory();
            } else {
                throw new Error(res.message || 'Không thể tạo danh mục');
            }
        } catch (error) {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: error.message
            });
        } finally {
            setIsSubmit(false);
        }
    };

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error('Hình ảnh phải nhỏ hơn 10MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
        try {
            const folderName = 'category-thumbnail';
            const res = await callUploadFile(file, folderName);

            if (res && res.data) {
                const fileInfo = {
                    name: file.name,
                    uid: file.uid,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/storage/${folderName}/${res.data.fileName}`,
                    response: res // Lưu toàn bộ response để sử dụng sau này nếu cần
                };
                setFileList([fileInfo]);
                onSuccess(res, file);
            } else {
                onError('Đã có lỗi khi upload file');
            }
        } catch (error) {
            onError('Đã có lỗi khi upload file: ' + error.message);
        }
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    return (
        <>
            <Modal
                title="Thêm mới danh mục"
                open={openModalCreate}
                onOk={() => form.submit()}
                onCancel={() => {
                    form.resetFields();
                    setFileList([]);
                    setOpenModalCreate(false);
                }}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
                width={"50vw"}
                centered
                maskClosable={false}
            >
                <Divider />

                <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={15}>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tên danh mục"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Hot"
                                name="hot"
                                initialValue={'HOT'}
                                // rules={[{ required: true, message: 'Please select hot(Y/N)!' }]}
                            >
                                <Radio.Group>
                                    <Radio value="true">Yes</Radio>
                                    <Radio value="false">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Ảnh Thumbnail"
                                name="thumbnail"
                            >
                                <Upload
                                    name="thumbnail"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    fileList={fileList}
                                    maxCount={1}
                                    customRequest={handleUploadFileThumbnail}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    onPreview={handlePreview}
                                >
                                    {fileList.length >= 1 ? null : (
                                        <div>
                                            {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Modal>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

export default CategoryModalCreate;