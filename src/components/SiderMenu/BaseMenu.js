import React from 'react'
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";

const { SubMenu } = Menu
const MenuItem = Menu.Item

export default class BaseMenu extends React.Component {

    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className='left-menu' >
                <MenuItem key="1">
                    <Link to='/home'>
                        <Icon type="home" />
                        <span className="nav-text">首页</span>
                    </Link>
                </MenuItem>
                <MenuItem key="2">
                    <Link to='/home/menu'>
                        <Icon type="bars" />
                        <span className="nav-text">菜单管理</span>
                    </Link>
                </MenuItem>
                <MenuItem key="3">
                    <Link to='/home/user'>
                        <Icon type="user" />
                        <span className="nav-text">用户管理</span>
                    </Link>
                </MenuItem>
            </Menu>
        )
    }
}