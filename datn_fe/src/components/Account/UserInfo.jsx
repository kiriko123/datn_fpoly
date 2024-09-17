import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import {Avatar, Button, Col, Form, Input, Row, Upload, message, notification, InputNumber} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "antd";
// import { callUpdateAvatar, callUpdateUserInfo } from "../../services/api";
// import { doUpdateUserInfoAction, doUploadAvatarAction } from "../../redux/account/accountSlice";
import { useState } from "react";
import {callUpdateInfo, callUploadFile} from "../../services/api.js";
import {doUpdateUserInfoAction, doUploadAvatarAction} from "../../redux/account/accountSlice.js";

const UserInfo = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user);

    const tempAvatar = useSelector(state => state.account.tempAvatar);

    const [userAvatar, setUserAvatar] = useState(user?.imageUrl ?? "");
    const [isSubmit, setIsSubmit] = useState(false);

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/storage/avatar/${tempAvatar || user?.imageUrl}`;

    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
        const res = await callUploadFile(file, 'avatar');
        console.log(res);
        if(res && res.data){
            const newAvatar = res.data.fileName;
            dispatch(doUploadAvatarAction({ avatar: newAvatar }))
            setUserAvatar(newAvatar);
            onSuccess('ok')
        }else{
            onError('Đã có lỗi khi upload file');
        }
    };

    const propsUpload = {
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        customRequest: handleUploadAvatar,
        onChange(info) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`Upload file thành công`);
            } else if (info.file.status === 'error') {
                message.error(`Upload file thất bại`);
            }
        },
    };

    const onFinish = async (values) => {
        const { id, firstName, name, gender, age, phoneNumber, address } = values;
        console.log(values);
        console.log(userAvatar)
        setIsSubmit(true)
        const res = await callUpdateInfo({id, firstName, name, userAvatar, gender, age, phoneNumber, address});

        console.log(res);

        if (res && res.data) {
            dispatch(doUpdateUserInfoAction({
                id,
                firstName,
                name,
                imageUrl: userAvatar,
                gender,
                age,
                phoneNumber,
                address
            }));
            message.success("Cập nhật thông tin user thành công");
            localStorage.removeItem('access_token');
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }
        setIsSubmit(false)
    }

    return (
        <div style={{ minHeight: 400 }}>
            <Row>
                <Col sm={24} md={12}>
                    <Row gutter={[30, 30]}>
                        <Col span={24}>
                            <Avatar
                                size={{ xs: 32, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}
                                icon={<AntDesignOutlined />}
                                src={urlAvatar}
                                shape="circle"
                            />
                        </Col>
                        <Col span={24}>
                            <Upload {...propsUpload}>
                                <Button icon={<UploadOutlined />}>
                                    Upload Avatar
                                </Button>
                            </Upload>
                        </Col>
                    </Row>
                </Col>
                <Col sm={24} md={12}>
                    <Form
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            hidden
                            labelCol={{ span: 24 }}
                            label="Id"
                            name="id"
                            initialValue={user?.id}

                        >
                            <Input disabled hidden />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Email"
                            name="email"
                            initialValue={user?.email}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Firstname"
                            name="firstName"
                            initialValue={user?.firstName}
                            rules={[{ required: true, message: 'FirstName không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Lastname"
                            name="name"
                            initialValue={user?.name}
                            rules={[{ required: true, message: 'Lastname không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Gender"
                            name="gender"
                            initialValue={user?.gender} // Lấy giá trị gender từ Redux
                            rules={[{ required: true, message: 'Please select your gender!' }]}
                        >
                            <Radio.Group>
                                <Radio value="MALE">Male</Radio>
                                <Radio value="FEMALE">Female</Radio>
                                <Radio value="OTHER">Other</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Phone number"
                            name="phoneNumber"
                            initialValue={user?.phoneNumber}
                            rules={[{ required: true, message: 'Phone number không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Address"
                            name="address"
                            initialValue={user?.address}
                            rules={[{ required: true, message: 'Address không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Age"
                            name="age"
                            initialValue={user?.age} // Lấy giá trị age từ Redux
                            rules={[{ required: true, message: 'Please enter your age!' }]}
                        >
                            <InputNumber min={0} max={120} style={{ width: '100%' }} />
                        </Form.Item>

                        <Button loading={isSubmit} onClick={() => form.submit()}>Cập nhật</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default UserInfo;