import React from 'react';
import { Layout } from 'antd';
import BaseMenu from './BaseMenu'

const { Sider } = Layout;

export default class SiderMenu extends React.Component {

    render() {
        const { isMobile, collapsed, onCollapse } = this.props
        return(
            <Sider className='menu-sider menu-sider-fixSiderBar' onCollapse={() => isMobile ? null : onCollapse(!collapsed) } breakpoint='lg' width={256} collapsedWidth={82} collapsed={collapsed}>
                <div className="logo" />
                <BaseMenu />
            </Sider>
        )
    }
}