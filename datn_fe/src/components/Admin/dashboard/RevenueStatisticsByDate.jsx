import {useEffect, useState} from "react";
// import {callRevenueStatistics, callRevenueStatisticsByDate} from "../../../services/api.js";
import {Area} from "@ant-design/plots";

const RevenueStatisticsByDate = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // const res = await callRevenueStatisticsByDate();
            // if (res && res.data) {
            //     setData(res.data);
            // }
            setData(
                [
                    {
                        "date": "2022-09-03",
                        "totalRevenue": 0
                    },
                    {
                        "date": "2022-10-02",
                        "totalRevenue": 1474600
                    },
                    {
                        "date": "2023-10-01",
                        "totalRevenue": 231000
                    },
                    {
                        "date": "2024-05-02",
                        "totalRevenue": 292000
                    },
                    {
                        "date": "2024-10-01",
                        "totalRevenue": 626723
                    },
                    {
                        "date": "2024-10-03",
                        "totalRevenue": 2838600
                    },
                    {
                        "date": "2024-10-04",
                        "totalRevenue": 292000
                    }
                ]
            )
        }
        fetchData();
    }, []);

    const config = {
        data: data,
        xField: 'date',
        yField: 'totalRevenue',
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