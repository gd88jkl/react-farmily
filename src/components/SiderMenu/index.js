import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';

import './index.less';

const SiderMenuWrapper = React.memo(props => {
    const { isMobile, collapsed, onCollapse } = props;
    return isMobile ? (
        <Drawer visible={!collapsed} placement="left" onClose={() => onCollapse(true)} style={{ padding: 0, height: '100vh' }}>
            <SiderMenu {...props} collapsed={false} />
        </Drawer>
    ) : ( <SiderMenu {...props} /> );
});

export default SiderMenuWrapper;
