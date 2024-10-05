import {useEffect, useState} from "react";
// import { callCountBookSold } from "../../../services/api.js";
import {Column} from "@ant-design/plots";

const CountBookSold = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // const res = await callCountBookSold();
            // if (res && res.data) {
            //     const modifiedData = res.data.map(item => ({
            //         ...item,
            //         name: item.name.length > 15 ? `${item.name.slice(0, 12)}...` : item.name,
            //     }));
            //     setData(modifiedData);
            // }
            const res = [
                {
                    "name": "Tiền Đẻ Ra Tiền: Đầu Tư Tài Chính Thông Minh",
                    "soldQuantity": 3
                },
                {
                    "name": "Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn",
                    "soldQuantity": 21
                },
                {
                    "name": "Salt, Fat, Acid, Heat: Mastering the Elements of Good Cooking",
                    "soldQuantity": 29
                },
                {
                    "name": "Cẩm Nang Du Lịch - Mỹ",
                    "soldQuantity": 30
                },
                {
                    "name": "How The Body Works - Hiểu Hết Về Cơ Thể",
                    "soldQuantity": 20
                },
                {
                    "name": "Tự Học Nhạc Lý Cơ Bản",
                    "soldQuantity": 27
                },
                {
                    "name": "Truyện Tranh Đam Mỹ - Làm Dâu Nhà Sói - Hana Inu",
                    "soldQuantity": 29
                },
                {
                    "name": "Diary Of A Wimpy Kid 09: The Long Haul",
                    "soldQuantity": 34
                },
                {
                    "name": "Đại Việt Sử Ký Toàn Thư Trọn Bộ",
                    "soldQuantity": 40
                },
                {
                    "name": "Sách Tư Duy Ngược Dịch Chuyển Thế Giới",
                    "soldQuantity": 22
                },
                {
                    "name": "Graphic Design For Everyone: Understand the Building Blocks so You can Do It Yourself (Hardback)",
                    "soldQuantity": 10
                },
                {
                    "name": "test",
                    "soldQuantity": 12
                }
            ]
            const modifiedData = res.map(item => ({
                ...item,
                name: item.name.length > 15 ? `${item.name.slice(0, 12)}...` : item.name,
            }));
            setData(modifiedData);
        };
        fetchData();
    }, []);

    const config = {
        data,
        xField: 'name',
        yField: 'soldQuantity',
        shapeField: 'column25D',
        style: {
            fill: 'rgba(126, 212, 236, 0.8)',
        },
    };

    return <Column {...config} />;
};

export default CountBookSold;
