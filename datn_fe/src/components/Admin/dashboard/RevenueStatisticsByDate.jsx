import {useEffect, useState} from "react";
// import {callRevenueStatistics, callRevenueStatisticsByDate} from "../../../services/api.js";
import {Area} from "@ant-design/plots";
import {callTotalPriceByDate} from "../../../services/api.js";

const RevenueStatisticsByDate = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await callTotalPriceByDate();
            if (res && res.data) {
                const sortedData = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                console.log(sortedData);
                setData(sortedData);
            }
        }
        fetchData();
    }, []);


    const config = {
        data: data,
        xField: 'date',
        yField: 'totalPrice',
        style: {
            fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
        },
        axis: {
            y: { labelFormatter: '~s' },
        },
        line: {
            style: {
                stroke: 'darkgreen',
                strokeWidth: 2,
            },
        },
    };

    return <Area {...config} />;

}
export default RevenueStatisticsByDate;