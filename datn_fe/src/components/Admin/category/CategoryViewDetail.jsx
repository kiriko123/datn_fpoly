import { Avatar,  Descriptions, Drawer, Modal } from "antd";
import moment from 'moment';
import { AntDesignOutlined } from "@ant-design/icons";
import { useState } from 'react';

const CategoryViewDetail = (props) => {
    // eslint-disable-next-line react/prop-types
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    // State để kiểm soát modal hiển thị ảnh lớn
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    // const handleAvatarClick = () => {
    //     setIsModalOpen(true);
    // };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Drawer
                title="User Detail"
                width={"60vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions
                    bordered
                    column={2}
                >

                    <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{dataViewDetail?.name}</Descriptions.Item>
                    <Descriptions.Item label="Thumbnail">{dataViewDetail?.thumbnail}</Descriptions.Item>
                    <Descriptions.Item label="Description">{dataViewDetail?.description}</Descriptions.Item>
                    <Descriptions.Item label="Hot">{dataViewDetail?.hot}</Descriptions.Item>
                    <Descriptions.Item label="Active">
                        {dataViewDetail?.active ? 'Actived' : 'NotActive'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataViewDetail?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="CreatedBy">
                        {dataViewDetail?.createdBy}
                    </Descriptions.Item>
                    <Descriptions.Item label="UpdatedBy">
                        {dataViewDetail?.updatedBy}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>

            {/* Modal hiển thị ảnh lớn */}
            <Modal
                open={isModalOpen}
                onCancel={handleModalClose}
                footer={null}
            >
                <img
                    src={urlAvatar}
                    alt="Avatar"
                    style={{ width: '100%' }}
                />
            </Modal>
        </>
    );
}

export default CategoryViewDetail;
