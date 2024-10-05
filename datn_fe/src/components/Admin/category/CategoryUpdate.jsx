// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import {Col, Divider, Form, Input, message, Modal, notification, Row, Radio, Upload, Button} from 'antd';
import { callUpdateCategory, callUploadFile } from '../../../services/api';
import { UploadOutlined } from '@ant-design/icons';

const CategoryUpdate = (props) => {
    // eslint-disable-next-line react/prop-types
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState(null); // Lưu URL của ảnh upload
    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    // Hàm upload file (thumbnail)
    const handleUploadThumbnail = async ({ file, onSuccess, onError }) => {
        const res = await callUploadFile(file, 'category-thumbnail'); // Gọi API upload
        if (res && res.data) {
            const newThumbnail = res.data.fileName;
            setThumbnailUrl(newThumbnail); // Lưu lại URL của ảnh sau khi upload
            onSuccess('ok');
        } else {
            onError('Upload ảnh thất bại');
        }
    };

    const propsUploadThumbnail = {
        maxCount: 1,
        multiple: false,
        customRequest: handleUploadThumbnail,
        onChange(info) {
            if (info.file.status === 'done') {
                message.success('Upload ảnh thành công');
            } else if (info.file.status === 'error') {
                message.error('Upload ảnh thất bại');
            }
        },
    };

    const onFinish = async (values) => {
        const {id, name, description, hot} = values;
        setIsSubmit(true)
        const res =
            await callUpdateCategory({id, name, thumbnail:thumbnailUrl, description, hot});
        if (res && res.data) {
            message.success('Cập nhật category thành công');
            setOpenModalUpdate(false);
            // eslint-disable-next-line react/prop-types
            await props.fetchCategory()
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };

    useEffect(() => {
        form.setFieldsValue(dataUpdate)
    }, [dataUpdate])

    return (
        <>

            <Modal
                title="Cập nhật category"
                open={openModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setOpenModalUpdate(false);
                    setDataUpdate(null);
                }}
                okText={"Cập nhật"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form
                    form={form}
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    // initialValues={dataUpdate}
                >
                    {/*<Form.Item hidden labelCol={{ span: 24 }} label="Id" name="id"  rules={[{ required: true, message: 'Vui lòng nhập id!' }]}>*/}
                    {/*    <Input />*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item labelCol={{ span: 24 }} label="Name" name="name"  rules={[{ required: true, message: 'Vui lòng nhập name!' }]}>*/}
                    {/*    <Input disabled/>*/}
                    {/*</Form.Item>*/}

                    <Form.Item  label="Id" name="id" rules={[{ required: true, message: 'Vui lòng nhập ID!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item  label="Name" name="name" rules={[{ required: true, message: 'Vui lòng nhập name!' }]}>
                        <Input />
                    </Form.Item>

                    {/* Upload ảnh Thumbnail */}
                    {/*rules={[{ required: true, message: 'Thumbnail không được để trống!' }]}*/}
                    <Form.Item label="Thumbnail" name="thumbnail" >
                        <Upload {...propsUploadThumbnail}>
                            <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="Hot"
                        name="hot"
                        initialValue={'HOT'}
                        rules={[{ required: true, message: 'Please select hot(Y/N)!' }]}
                    >
                        <Radio.Group>
                            <Radio value="true">Yes</Radio>
                            <Radio value="false">No</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CategoryUpdate;
