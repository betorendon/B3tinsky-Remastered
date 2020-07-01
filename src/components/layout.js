import React from 'react'
import Navbar from './navbar'
import '../styles/index.scss'
import layoutStyles from '../styles/components/layout.module.scss'

const Layout = (props) => {
    return (

    <div>
        <Navbar />
            <div className={layoutStyles.container}>
                <div className={layoutStyles.content}>
                    {props.children}
                </div>
            </div>
    </div>

    )
}

export default Layout