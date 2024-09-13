import React, {useState} from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    UserOutlined,
    DollarCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Dropdown, Space, message} from 'antd';
import {Outlet, useNavigate, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {callLogout} from "../../services/api.js";
import {doLogoutAction} from "../../redux/account/accountSlice.js";
import './layout.scss';
import {FaUserCircle, FaUserEdit} from "react-icons/fa";
import {RiAdminFill, RiLogoutBoxFill} from "react-icons/ri";
import { FaHome } from "react-icons/fa";

const {Content, Sider} = Layout;

const items = [
    {
        label: <Link to='/admin'>Dashboard</Link>,
        key: 'dashboard',
        icon: <AppstoreOutlined/>
    },
    {
        label: <Link to='/admin/user'>Manage Users</Link>,
        key: 'user',
        icon: <UserOutlined/>,
    },
    {
        label: <Link to='/admin/book'>Manage ....</Link>,
        key: 'book',
        icon: <ExceptionOutlined/>
    },
    {
        label: <Link to='/admin/order'>Manage ....</Link>,
        key: 'order',
        icon: <DollarCircleOutlined/>
    },
];

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const user = useSelector(state => state.account.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.statusCode === 200) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/');
        }
    };

    const itemsDropdown = [
        {
            label: <label style={{cursor: 'pointer'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <FaUserEdit />
                    <span>Edit profile</span>
                </div>
            </label>,
            key: 'account',
        },
        {
            label: <label
                style={{cursor: 'pointer'}}
                onClick={() => navigate('/')}
            >
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <FaHome />
                    <span>Home page</span>
                </div>
            </label>,
            key: 'homepage',
        },
        {
            label: <label
                style={{cursor: 'pointer'}}
                onClick={() => handleLogout()}
            >
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <RiLogoutBoxFill />
                    <span>Logout</span>
                </div>
            </label>,
            key: 'logout',
        },
    ];

    return (
        <Layout
            style={{minHeight: '100vh', backgroundColor: '#001529'}} // Set background to dark theme
            className="layout-admin"
        >
            <Sider
                theme='dark'
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{backgroundColor: '#001529'}} // Ensure the sidebar matches the dark theme
            >
                <div style={{height: 32, margin: 16, textAlign: 'center', color: 'white', fontSize: 16}}>
                    Admin
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[activeMenu]}
                    mode="inline"
                    items={items}
                    onClick={(e) => setActiveMenu(e.key)}
                    style={{backgroundColor: '#001529'}} // Ensure menu background matches the dark theme
                />
            </Sider>
            <Layout>
                <div className='admin-header' style={{backgroundColor: '#001529', color: '#fff', padding: '0 16px'}}>
                    <span>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            style: {color: '#fff'}, // Icon color white for visibility
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </span>
                    <Dropdown menu={{items: itemsDropdown}} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()} style={{color: '#fff'}}>
                            <Space>
                                <span style={{fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                                                    <FaUserCircle/>
                                                    <span>
                                                        Welcome: <span
                                                        style={{textTransform: 'uppercase'}}> {user?.name} </span>
                                                    </span>
                                                </span>
                                <DownOutlined/>
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        backgroundColor: '#fff', // Light background for content area
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;
