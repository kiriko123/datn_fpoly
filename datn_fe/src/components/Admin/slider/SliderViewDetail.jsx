import { Avatar, Badge, Descriptions, Divider, Drawer, Modal, Upload } from "antd";
import moment from 'moment';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SliderViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    };

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (dataViewDetail) {
            const imgThumbnail = {
                uid: uuidv4(),
                name: dataViewDetail.imgUrl,
                status: 'done',
                url: `${import.meta.env.VITE_BACKEND_URL}/storage/slider/${dataViewDetail.imgUrl}`,
            };
            setFileList([imgThumbnail]);
        }
    }, [dataViewDetail]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        setPreviewImage(file.url);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <>
            <Drawer
                title="Slider Detail"
                width={"70vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions bordered column={2}>
                    <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Title">{dataViewDetail?.title}</Descriptions.Item>
                    <Descriptions.Item label="Description">{dataViewDetail?.description}</Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createAt).format('DD-MM-YYYY hh:mm:ss')}                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataViewDetail?.updateAt).format('DD-MM-YYYY hh:mm:ss')}                    </Descriptions.Item>
                    <Descriptions.Item label="Created By">{dataViewDetail?.createdBy}</Descriptions.Item>
                    <Descriptions.Item label="Updated By">{dataViewDetail?.updatedBy}</Descriptions.Item>
                </Descriptions>
                <Divider orientation="left">Slider Thumbnail</Divider>

                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    showUploadList={{ showRemoveIcon: false }}
                >
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel} centered>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Drawer>
        </>
    );
}

export default SliderViewDetail;
