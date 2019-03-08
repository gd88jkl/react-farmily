import React from 'react'
import { Button,Layout } from 'antd';
const {
  Header, Footer, Sider, Content,
} = Layout;

class Login extends React.Component {

    handleSubmit = ()=>{
        this.props.history.push('/home');
    }

    render() {
        return (
            <Layout>
                <Header />
                <Content>
                    <div style={{textAlign:'center',marginTop:'10px'}}>
                        <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                    </div>
                </Content>
                <Footer />
            </Layout>
            
        )
    }
}

export default Login