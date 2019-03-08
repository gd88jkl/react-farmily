import React from 'react'
import { Layout, Icon } from 'antd';

const { Header } = Layout

export default class GolbalHeader extends React.Component {

    render() {
        const { isMobile, collapsed, onCollapse } = this.props
        const width = isMobile ? null : collapsed ? `calc(100% - 82px)` : `calc(100% - 256px)`
        return (
            <Header className='global-header-fixedHeader' style={{ padding: '0', width }}>
                <div className='global-header'>
                    <span className='global-header-trigger' onClick={() => onCollapse(!collapsed)}>
                        <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </span>
                    <div style={{ display: 'inline', float: 'right', padding: '0 30px'}}>登录</div>
                </div>
            </Header>
        )
    }
}