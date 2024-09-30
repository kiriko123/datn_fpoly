// import { Avatar,  Descriptions, Drawer, Modal } from "antd";
// import moment from 'moment';
// import { AntDesignOutlined } from "@ant-design/icons";
// import { useState } from 'react';
//
// const CategoryViewDetail = (props) => {
//     // eslint-disable-next-line react/prop-types
//     const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;
//
//     // State để kiểm soát modal hiển thị ảnh lớn
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalImageUrl, setModalImageUrl] = useState(null);
//
//     const onClose = () => {
//         setOpenViewDetail(false);
//         setDataViewDetail(null);
//     }
//
//     // const handleAvatarClick = () => {
//     //     setIsModalOpen(true);
//     // };
//
//     const handleThumbnailClick = (thumbnailUrl) => {
//         setModalImageUrl(thumbnailUrl);
//         setIsModalOpen(true);
//     };
//     const handleModalClose = () => {
//         setIsModalOpen(false);
//     };
//     // Đảm bảo URL đầy đủ cho thumbnail (cập nhật với đường dẫn đúng)
//     const urlThumbnail = `${import.meta.env.VITE_BACKEND_URL}/storage/${dataViewDetail?.thumbnail}`;
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
//
//                     <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
//                     <Descriptions.Item label="Name">{dataViewDetail?.name}</Descriptions.Item>
//                     <Descriptions.Item label="Thumbnail">
//                         {/* Hiển thị ảnh thu nhỏ và cho phép click để phóng to */}
//                         <img
//                             src={urlThumbnail}
//
//                             alt="thumbnail"
//                             style={{ width: '100px', cursor: 'pointer' }}
//                             onClick={() => handleThumbnailClick(dataViewDetail?.thumbnail)}
//                         />
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Description">{dataViewDetail?.description}</Descriptions.Item>
//                     <Descriptions.Item label="Hot">
//                         {dataViewDetail?.hot ? 'Yes' : 'No'}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Active">
//                         {dataViewDetail?.active ? 'Actived' : 'NotActive'}
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
//                     src={modalImageUrl}
//                     alt="Thumbnail"
//                     style={{ width: '100%' }}
//                 />
//             </Modal>
//         </>
//     );
// }
//
// export default CategoryViewDetail;
import { Avatar, Badge, Descriptions, Drawer, Modal } from "antd";
import moment from 'moment';
import { AntDesignOutlined } from "@ant-design/icons";
import { useState } from 'react';

const UserViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    // State để kiểm soát modal hiển thị ảnh lớn
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

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/storage/category-thumbnail/${dataViewDetail?.thumbnail}`;

    return (
        <>
            <Drawer
                title="Category Detail"
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
                            src={urlAvatar}
                            shape="circle"
                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)', margin: '0 auto', display: 'block', cursor: 'pointer' }}
                            onClick={handleAvatarClick} // Thêm sự kiện click để mở modal
                        />
                    </Descriptions.Item>
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

export default UserViewDetail;