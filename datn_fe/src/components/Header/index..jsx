import React, {useState} from 'react';
import {FaReact} from 'react-icons/fa'
import {VscSearchFuzzy} from 'react-icons/vsc';
import {Divider, Badge, Drawer, message, Button, Anchor} from 'antd';
// import './header.scss';
import {useDispatch, useSelector} from 'react-redux';
import {DownOutlined} from '@ant-design/icons';
import {Dropdown, Space} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {callLogout} from "../../services/api.js";
import {doLogoutAction} from "../../redux/account/accountSlice.js";
import './index.css'
import { FaHome } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { MdContactSupport } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import {FiShoppingCart} from "react-icons/fi";


const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const role = useSelector(state => state.account.user.role.name);
    console.log("check menu", role);
    const user = useSelector(state => state.account.user);
    console.log(user);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = async () => {
        const res = await callLogout();
        console.log('logout res: ', res);
        if (res && res.statusCode === 200) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/auth');
        }
    }

    const items = [
        {
            label: <label style={{cursor: 'pointer'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <FaUserEdit />
                    <span>Edit profile</span>
                </div>
            </label>,
            key: 'account',
        },
        ...(role === 'ROLE_ADMIN' ? [{
            label: <label
                style={{cursor: 'pointer'}}
                onClick={() => navigate('/admin')}
            >
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <RiAdminFill />
                    <span>Admin page</span>
                </div>
            </label>,
            key: 'admin',
        }] : []),
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

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    return (
        <>
            <div className="container-fluid">
                <div className="header">
                    <div className="logo">
                        <i className="fas fa-bolt"></i>
                        <a href="http://google.com">好不好</a>
                    </div>
                    <div className="mobileHidden">
                        <nav>
                            <div>
                                <span onClick={() => navigate('/')}> <FaHome /> <p>Home</p></span>
                            </div>
                            <div>
                                <span onClick={() => navigate('/1')}> <BiSolidCategoryAlt /> <p>Product</p></span>
                            </div>
                            <div>
                                <span onClick={() => navigate('/2')}> <FaCartShopping /> <p>Cart</p></span>
                            </div>
                            <div>
                                <span onClick={() => navigate('/3')}> <MdContactSupport /> <p>About</p></span>
                            </div>
                            {/*<div>*/}
                            {/*<Badge*/}
                            {/*        count={0}*/}
                            {/*        size={"small"}*/}
                            {/*    >*/}
                            {/*        <FiShoppingCart className='icon-cart'/>*/}
                            {/*    </Badge>*/}
                            {/*</div>*/}
                            <div>
                                {!isAuthenticated || user === null ?
                                    <span onClick={() => navigate('/auth')}><RiLoginCircleFill /> <p>Login/Register</p></span>
                                    :
                                    <Dropdown menu={{items}} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <span style={{fontSize: '15px', display: 'flex', alignItems: 'center'}}>
                                                    <FaUserCircle />
                                                    <span>
                                                        Welcome: <span
                                                        style={{textTransform: 'uppercase'}}> {user?.name} </span>
                                                    </span>
                                                </span>
                                                <DownOutlined/>
                                            </Space>
                                        </a>
                                    </Dropdown>
                                }
                            </div>
                        </nav>
                    </div>
                    <div className="mobileVisible">
                        <Button type="primary" onClick={showDrawer}>
                            <i className="fas fa-bars"></i>
                        </Button>
                        <Drawer
                            placement="right"
                            closable={true}
                            onClose={onClose}
                            visible={visible}
                        >
                            <nav className="mobileVisible-nav">
                                <div className="mobileVisible-nav-div" onClick={() => navigate('/')}>
                                    <span><FaHome /> Home</span>
                                </div>
                                <div className="mobileVisible-nav-div" onClick={() => navigate('/1')}>
                                    <span> <BiSolidCategoryAlt /> Product</span>
                                </div>
                                <div className="mobileVisible-nav-div" onClick={() => navigate('/2')}>
                                    <span> <FaCartShopping /> Cart</span>
                                </div>
                                <div className="mobileVisible-nav-div" onClick={() => navigate('/3')}>
                                    <span> <MdContactSupport /> About</span>
                                </div>
                                {/*<div>*/}
                                {/*<Badge*/}
                                {/*        count={0}*/}
                                {/*        size={"small"}*/}
                                {/*    >*/}
                                {/*        <FiShoppingCart className='icon-cart'/>*/}
                                {/*    </Badge>*/}
                                {/*</div>*/}
                                <div>
                                    {!isAuthenticated || user === null ?
                                        <span onClick={() => navigate('/auth')}> <RiLoginCircleFill /> Login/Register</span>
                                        :
                                        <Dropdown menu={{items}} trigger={['click']}>
                                            <a style={{textDecoration: 'none', color: '#1c1f23'}} onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    <span style={{
                                                        fontSize: '15px',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}>
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
                                    }
                                </div>
                            </nav>
                        </Drawer>
                    </div>

                </div>
            </div>
        </>
    )
};

export default Header;
