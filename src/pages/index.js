import React from "react"
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'
import bg from '../styles/HomeBackground.gif'
const IndexPage = () => {
  return (
    
      <div style={{
        background: `url(${bg})` ,
        backgroundRepeat: 'no-repeat',
        width: "100%",
        height: "100vh",
        backgroundSize: "cover"
      }}>
    <Layout>
      <Head title="Home"/>
      {/* <h1>Hello</h1>
      <h2>I'm Beto, a full-stack developer living in beautiful Monterrey</h2>
    <p>Need a developer? <Link to="/contact">Contact me.</Link></p> */}
    </Layout>

      </div>

  )
  
}

export default IndexPage