// import { Avatar, Badge, Descriptions, Drawer, Modal } from "antd";
// import moment from 'moment';
// import { AntDesignOutlined } from "@ant-design/icons";
// import { useState } from 'react';
//
// const UserViewDetail = (props) => {
//     const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;
//
//     // State để kiểm soát modal hiển thị ảnh lớn
//     const [isModalOpen, setIsModalOpen] = useState(false);
//
//     const onClose = () => {
//         setOpenViewDetail(false);
//         setDataViewDetail(null);
//     }
//
//     const handleAvatarClick = () => {
//         setIsModalOpen(true);
//     };
//
//     const handleModalClose = () => {
//         setIsModalOpen(false);
//     };
//
//     const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/storage/category-thumbnail/${dataViewDetail?.thumbnail}`;
//
//     return (
//         <>
//             <Drawer
//                 title="Category Detail"
//                 width={"60vw"}
//                 onClose={onClose}
//                 open={openViewDetail}
//             >
//                 <Descriptions
//                     bordered
//                     column={2}
//                 >
//                     <Descriptions.Item label="Thumbnail" span={2}>
//                         <Avatar
//                             size={100}
//                             icon={<AntDesignOutlined />}
//                             src={urlAvatar}
//                             shape="circle"
//                             style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)', margin: '0 auto', display: 'block', cursor: 'pointer' }}
//                             onClick={handleAvatarClick} // Thêm sự kiện click để mở modal
//                         />
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
//                     <Descriptions.Item label="Name">{dataViewDetail?.name}</Descriptions.Item>
//                     <Descriptions.Item label="Description">{dataViewDetail?.description}</Descriptions.Item>
//                     <Descriptions.Item label="Hot">
//                         {dataViewDetail?.hot ? 'Yes' : 'No'}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Created At">
//                         {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Updated At">
//                         {moment(dataViewDetail?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="CreatedBy">
//                         {dataViewDetail?.createdBy}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="UpdatedBy">
//                         {dataViewDetail?.updatedBy}
//                     </Descriptions.Item>
//                 </Descriptions>
//             </Drawer>
//
//             {/* Modal hiển thị ảnh lớn */}
//             <Modal
//                 open={isModalOpen}
//                 onCancel={handleModalClose}
//                 footer={null}
//             >
//                 <img
//                     src={urlAvatar}
//                     alt="Avatar"
//                     style={{ width: '100%' }}
//                 />
//             </Modal>
//         </>
//     );
// }
//
// export default UserViewDetail;

import { Descriptions, Divider, Drawer, Modal, Upload} from "antd";
import moment from 'moment';
import {useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

const CategoryViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (dataViewDetail) {
            let imgThumbnail = {};
            if (dataViewDetail.thumbnail) {
                imgThumbnail = {
                    uid: uuidv4(),
                    name: dataViewDetail.thumbnail,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/storage/category-thumbnail/${dataViewDetail.thumbnail}`,
                }
            }

            setFileList([imgThumbnail])
        }
    }, [dataViewDetail])

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        setPreviewImage(file.url);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }

    return (
        <>
            <Drawer
                title="Category Detail"
                width={"70vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{dataViewDetail?.name}</Descriptions.Item>
                    <Descriptions.Item label="Description">{dataViewDetail?.description}</Descriptions.Item>
                    <Descriptions.Item label="Hot">
                        {dataViewDetail?.hot ? 'Yes' : 'No'}
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
                <Divider orientation="left" > Category Thumbnail </Divider>

                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    showUploadList={
                        { showRemoveIcon: false }
                    }
                >

                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel} centered>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Drawer>

        </>
    );
}

export default CategoryViewDetail;