import {useEffect, useState} from "react";
// import {callRevenueStatistics} from "../../../services/api.js";
import {Line} from "@ant-design/plots";

const RevenueStatistics = () =>{

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // const res = await callRevenueStatistics();
            // if (res && res.data) {
            //     setData(res.data);
            // }
            setData(
                [
                    {
                        "year": 2022,
                        "totalRevenue": 1474600
                    },
                    {
                        "year": 2023,
                        "totalRevenue": 231000
                    },
                    {
                        "year": 2024,
                        "totalRevenue": 4049323
                    }
                ]
            )
        }
        fetchData();
    }, []);

    const config = {
        data,
        xField: 'year',
        yField: 'totalRevenue',
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },

    };
    return <Line {...config} />;
}
export default RevenueStatistics;