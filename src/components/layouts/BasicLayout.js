import React from 'react'
import { Layout, Icon, LocaleProvider } from 'antd';
import { Route, Switch } from "react-router-dom";
import zhCN from 'antd/lib/locale-provider/zh_CN';

import User from '@pages/system/user/User'
import Index from '@pages/system/Index'
import Header from '@components/layouts/Header';
import SiderMenu from '@components/SiderMenu';

import './BasicLayout.less'

const { Content } = Layout

export default class BaseLayout extends React.Component {

    state = {
        collapsed: this.props.isMobile,
    }

    handleMenuCollapse = (collapsed) => {
        this.setState({ collapsed })
    }

    render() {
        const { isMobile } = this.props
        const { collapsed } = this.state
        const paddingLeft = isMobile ? null : collapsed ? '82px' : '256px'
        return (
            <LocaleProvider locale={zhCN}>
                <Layout>
                    <SiderMenu isMobile={isMobile} collapsed={collapsed} onCollapse={this.handleMenuCollapse} />
                    <Layout style={{ minHeight: '100vh' }}>
                        <Header isMobile={isMobile} collapsed={collapsed} onCollapse={this.handleMenuCollapse} />
                        <Content style={{ paddingLeft }}>
                            <Switch>
                                <Route path='/' exact component={Index} />
                                <Route path='/home' exact component={Index} />
                                <Route path='/home/user' component={User} />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </LocaleProvider>
        )
    }
}
