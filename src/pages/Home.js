import React from 'react'
import Media from 'react-media';
import BasicLayout from '@components/layouts/BasicLayout';

import './Home.less'

class Home extends React.Component {
    render() {
        return (
            <Media query="(max-width: 599px)">
                {isMobile => <BasicLayout isMobile={isMobile} />}
            </Media>
        )
    }
}

export default Home