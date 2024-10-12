import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, message, Row, Col, Divider, notification } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { callUpdateSlider, callUploadFile } from '../../../services/api'; // Chỉnh sửa hàm gọi API tương ứng
import { v4 as uuidv4 } from 'uuid';

const SliderModalUpdate = ({ open, setOpen, dataUpdate, setDataUpdate, fetchSliders }) => {
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataThumbnail, setDataThumbnail] = useState([]); // Khởi tạo với mảng rỗng
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    useEffect(() => {
        if (dataUpdate?.id) {
            const arrThumbnail = dataUpdate.imgUrl ? [{
                uid: uuidv4(),
                name: dataUpdate.imgUrl,
                status: 'done',  // Thiết lập trạng thái là 'done' khi ảnh đã tồn tại
                url: `${import.meta.env.VITE_BACKEND_URL}/storage/slider/${dataUpdate.imgUrl}`,
            }] : [];

            // Gán giá trị cho form
            form.setFieldsValue({
                id: dataUpdate.id,
                title: dataUpdate.title,
                description: dataUpdate.description,
                imgUrl: arrThumbnail
            });

            // Cập nhật state cho dataThumbnail
            setDataThumbnail(arrThumbnail);
        }

        return () => {
            form.resetFields(); // Reset form khi component unmount
            setDataThumbnail([]); // Reset lại dataThumbnail
        };
    }, [dataUpdate, form]);

    const handleUpdate = async (values) => {
        if (dataThumbnail.length === 0) {
            notification.error({
                message: 'Lỗi validate',
                description: 'Vui lòng upload ảnh cho slider'
            });
            return;
        }

        const { id, title, description } = values;
        const imgUrl = dataThumbnail[0]?.name; // Lấy tên ảnh từ dataThumbnail

        setIsSubmit(true);
        try {
            const res = await callUpdateSlider({ id, title, description, imgUrl });
            if (res && res.data) {
                message.success('Cập nhật slider thành công');
                form.resetFields();
                setDataThumbnail([]); // Reset dataThumbnail
                setOpen(false);
                await fetchSliders();
            } else {
                throw new Error(res.message || 'Không thể cập nhật slider');
            }
        } catch (error) {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: error.message || 'Có lỗi xảy ra trong quá trình cập nhật'
            });
        } finally {
            setIsSubmit(false);
        }
    };

    const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
        setLoading(true);
        try {
            const res = await callUploadFile(file, 'slider');
            if (res && res.data) {
                setDataThumbnail([{
                    name: res.data.fileName,
                    uid: file.uid,
                    status: 'done', // Đảm bảo thêm thuộc tính status
                }]);
                onSuccess('ok');
            } else {
                throw new Error('Không thể upload file');
            }
        } catch (error) {
            onError('Đã có lỗi khi upload file');
            notification.error({ message: error.message || 'Lỗi không xác định' });
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFile = (file) => {
        setDataThumbnail([]); // Reset lại dataThumbnail khi xóa file
    };

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Hình ảnh phải nhỏ hơn 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    return (
        <>
            <Modal
                title="Update slider"
                open={open}
                onOk={() => form.submit()}
                onCancel={() => {
                    setOpen(false);
                    setDataUpdate(null);
                    form.resetFields();
                }}
                okText="Update"
                cancelText="Cancel"
                confirmLoading={isSubmit}
                width="50vw"
                centered
                maskClosable={false}
            >
                <Divider />
                <Form form={form} onFinish={handleUpdate} layout="vertical">
                    <Row gutter={15}>
                        <Col span={24}>
                            <Form.Item
                                name="id"
                                hidden
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[{ required: true, message: 'Please enter the slider title!!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true, message: 'Please enter the slider description!' }]}
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="imgUrl"
                                label="Image Slider"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => {
                                    if (Array.isArray(e)) {
                                        return e;
                                    }
                                    return e && e.fileList;
                                }}
                            >
                                <Upload
                                    name="imgUrl"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    maxCount={1}
                                    multiple={false}
                                    customRequest={handleUploadFileThumbnail}
                                    beforeUpload={beforeUpload}
                                    onRemove={handleRemoveFile}
                                    onPreview={handlePreview}
                                >
                                    <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

export default SliderModalUpdate;
