import {useEffect, useState} from "react";
// import {callRevenueStatistics} from "../../../services/api.js";
import {Line} from "@ant-design/plots";
import {callTotalPriceByYear} from "../../../services/api.js";

const RevenueStatistics = () =>{

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await callTotalPriceByYear();
            if (res && res.data) {
                // Sắp xếp dữ liệu theo năm giảm dần
                const sortedData = res.data.sort((a, b) => a.year - b.year);
                console.log(sortedData);
                setData(sortedData);
            }
        }
        fetchData();
    }, []);


    const config = {
        data,
        xField: 'year',
        yField: 'totalPrice',
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