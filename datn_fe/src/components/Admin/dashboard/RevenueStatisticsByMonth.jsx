import {useEffect, useState} from "react";
import {Area} from "@ant-design/plots";
import {callTotalPriceByMonth} from "../../../services/api.js";

const RevenueStatisticsByMonth = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await callTotalPriceByMonth();
            if (res && res.data) {
                // Sắp xếp dữ liệu theo tháng giảm dần
                const sortedData = res.data.sort((a, b) => new Date(a.month) - new Date(b.month));
                console.log(sortedData);
                setData(sortedData);
            }
        }
        fetchData();
    }, []);


    const config = {
        data: data,
        xField: 'month',
        yField: 'totalPrice',
    };
    return <Area {...config} />;
}
export default RevenueStatisticsByMonth;