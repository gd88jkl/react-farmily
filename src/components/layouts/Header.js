import React from 'react'
import GlobalHeader from '@components/GlobalHeader'

const SiderMenuWrapper = React.memo(props => {
    return(
        <GlobalHeader {...props}/>
    )
})

export default SiderMenuWrapper