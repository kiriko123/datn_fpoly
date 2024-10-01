import { Avatar, Badge, Descriptions, Drawer, Modal } from "antd";
import moment from 'moment';
import { AntDesignOutlined } from "@ant-design/icons";
import { useState } from 'react';

const BrandViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    const handleAvatarClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const urlThumbnail = `${import.meta.env.VITE_BACKEND_URL}/storage/brand/${dataViewDetail?.thumbnail}`;

    return (
        <>
            <Drawer
                title="Brand Detail"
                width={"60vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Thumbnail" span={2}>
                        <Avatar
                            size={100}
                            icon={<AntDesignOutlined />}
                            src={urlThumbnail}
                            shape="circle"
                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)', margin: '0 auto', display: 'block', cursor: 'pointer' }}
                            onClick={handleAvatarClick}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{dataViewDetail?.name}</Descriptions.Item>
                    <Descriptions.Item label="Description" span={2}>{dataViewDetail?.description}</Descriptions.Item>
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

            <Modal
                open={isModalOpen}
                onCancel={handleModalClose}
                footer={null}
            >
                <img
                    src={urlThumbnail}
                    alt="Thumbnail"
                    style={{ width: '100%' }}
                />
            </Modal>
        </>
    );
}

export default BrandViewDetail;
