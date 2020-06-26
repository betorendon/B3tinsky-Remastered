import React from 'react'
import Navbar from './navbar'
// import Header from './header'
import Footer from './footer'
import '../styles/index.scss'
import layoutStyles from '../styles/components/layout.module.scss'

const Layout = (props) => {
    return (

            <div>

            <Navbar />
        <div className={layoutStyles.container}>
            <div className={layoutStyles.content}>
            {/* <Header /> */}
            {props.children}
            </div>
            <Footer />
            </div>
        </div>

    )
}

export default Layout