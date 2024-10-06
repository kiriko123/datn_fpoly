import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, message, Divider, notification } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { callUpdateSlider, callUploadFile } from '../../../services/api';
import { v4 as uuidv4 } from 'uuid';

const SliderModalUpdate = ({ open, setOpen, dataUpdate, setDataUpdate, fetchSliders }) => {
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataThumbnail, setDataThumbnail] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    useEffect(() => {
        if (dataUpdate?.id) {
            const arrThumbnail = dataUpdate.imgUrl
                ? [{
                    uid: uuidv4(),
                    name: dataUpdate.imgUrl,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/storage/slider/${dataUpdate.imgUrl}`,
                }] : [];

            form.setFieldsValue({
                id: dataUpdate.id,
                title: dataUpdate.title,
                description: dataUpdate.description,
                imgUrl: arrThumbnail
            });
            setDataThumbnail(arrThumbnail);
        }

        return () => {
            form.resetFields();
            setDataThumbnail([]);
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
        const imgUrl = dataThumbnail[0]?.name;

        setIsSubmit(true);
        try {
            const res = await callUpdateSlider({ id, title, description, imgUrl });
            if (res && res.data) {
                message.success('Cập nhật slider thành công');
                form.resetFields();
                setDataThumbnail([]);
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
                    status: 'done',
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

    const handleRemoveFile = () => {
        setDataThumbnail([]);
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
                title="Cập nhật slider"
                open={open}
                onOk={() => form.submit()}
                onCancel={() => {
                    setOpen(false);
                    setDataUpdate(null);
                    form.resetFields();
                }}
                okText="Cập nhật"
                cancelText="Hủy"
                confirmLoading={isSubmit}
                width="50vw"
                centered
                maskClosable={false}
            >
                <Divider />
                <Form form={form} layout="vertical" onFinish={handleUpdate}>
                    <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Hình ảnh" rules={[{ required: true, message: 'Vui lòng upload hình ảnh!' }]}>
                        <Upload
                            accept="image/*"
                            customRequest={handleUploadFileThumbnail}
                            listType="picture-card"
                            fileList={dataThumbnail}
                            onPreview={handlePreview}
                            onRemove={handleRemoveFile}
                            beforeUpload={beforeUpload}
                        >
                            {dataThumbnail.length >= 1 ? null : (
                                <div>
                                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default SliderModalUpdate;
