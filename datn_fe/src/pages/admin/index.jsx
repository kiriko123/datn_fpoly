import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Card, Col, Row, Statistic } from "antd";
import { UserOutlined, ShoppingCartOutlined, BookOutlined } from "@ant-design/icons";

import RevenueStatistics from "../../components/Admin/dashboard/RevenueStatistics.jsx";
import RevenueStatisticsByDate from "../../components/Admin/dashboard/RevenueStatisticsByDate.jsx";
// import {callCountAllUserOrderAndTotalPrice} from "../../services/api.js";
import CountBookSold from "../../components/Admin/dashboard/CountBookSold.jsx";

const AdminPage = () => {
    const [dataDashboard, setDataDashboard] = useState({
        totalOrder: 10,
        totalUser: 20,
        totalPrice: 9999999999,
    });

    useEffect(() => {
        initDashboard();
    }, []);

    const initDashboard = async () => {
        // const res = await callCountAllUserOrderAndTotalPrice();
        // if (res && res.data) {
        //     setDataDashboard(res.data);
        // }
    };

    const formatter = (value) => <CountUp end={value} separator="," />;

    return (
        <>
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={8}>
                    <Card
                        title={
                            <span style={{fontWeight: "bold", fontSize: "18px"}}>
                                <UserOutlined style={{marginRight: "8px"}}/>
                                Tổng Users
                            </span>
                        }
                        bordered={false}
                        style={{backgroundImage: "linear-gradient(to right, #3a7bd5, #3a6073)"}}
                    >
                        <Statistic
                            value={dataDashboard.totalUser}
                            formatter={formatter}
                            valueStyle={{fontSize: "24px", color: "#ffffff"}}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card
                        title={
                            <span style={{fontWeight: "bold", fontSize: "18px", color: "#ffffff"}}>
                                <ShoppingCartOutlined style={{marginRight: "8px", color: "#ffffff"}}/>
                                Tổng Đơn Hàng
                            </span>
                        }
                        bordered={false}
                        style={{backgroundImage: "linear-gradient(to right, #3a7bd5, #3a6073)"}}
                    >
                        <Statistic
                            value={dataDashboard.totalOrder}
                            precision={2}
                            formatter={formatter}
                            valueStyle={{fontSize: "24px", color: "#ffffff"}}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card
                        title={
                            <span style={{fontWeight: "bold", fontSize: "18px", color: "#ffffff"}}>
                                <BookOutlined style={{marginRight: "8px", color: "#ffffff"}}/>
                                Tổng doanh thu (VND)
                            </span>
                        }
                        bordered={false}
                        style={{backgroundImage: "linear-gradient(to right, #3a7bd5, #3a6073)"}}
                    >
                        <Statistic
                            value={dataDashboard.totalPrice}
                            formatter={formatter}
                            valueStyle={{fontSize: "24px", color: "#ffffff"}}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12}>
                    <h3 style={{ textAlign: "center", margin: "20px 0" }}>Biểu đồ Doanh Thu Theo Năm</h3>
                    <RevenueStatistics />
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <h3 style={{ textAlign: "center", margin: "20px 0" }}>Biểu đồ Doanh Thu Theo Ngày</h3>
                    <RevenueStatisticsByDate />
                </Col>
                <Col xs={24} sm={24} md={24}>
                    <h3 style={{ textAlign: "center", margin: "20px 0" }}>Biểu đồ số lượng bán được theo sách</h3>
                    <CountBookSold />
                </Col>
            </Row>
        </>
    );
};

export default AdminPage;
