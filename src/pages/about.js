import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'
import me from '../styles/Images/ItsAMe.png'

const AboutPage = () => {
    return (
            <Layout>
                <Head title="About" />
                    <h1>About Me</h1>
                    <p>I'm Beto Rendon, a Computer Science student with an interest in web & software development. I'm a horror film enthusiast (specially 80's films). I love reading and making music.</p>
                    <img src={me} style={{
                        gridColumn: "4 / 5",
                        width: "100%",
                        borderRadius: "5%"}}
                    />
                    <figcaption style={{
                        marginTop: '0.5rem',
                        display: 'flex',
                        justifyContent: 'center',
                    }}><p>The <em>Bert</em> himself.</p>
                    </figcaption>
                    <p>The purpose of this website is to document everything I learn and to serve as a small glimpse of who I am.</p>
                    
                    <Link to="/books"><h3>📚 Books</h3></Link>
                    <p>I love reading and I've always wanted to have a personal library, but I dont think its reasonable buying a physical copy of every book I read for this sole purpose, being in the era of eBooks. So, as a way of documenting every book I read each year and creating my own virtual library I made <Link to="/books" style={{color: 'orange'}}>this page</Link></p>
                    
                    <Link to="/horrorfilms"><h3>🔪 Horror Films</h3></Link>
                    <p>I developed a liking towards them when I found a list of horror films to watch during October on twitter. I collect them <Link to="/horrorfilms" style={{color: 'orange'}}>here</Link> as a small monument to my hobby, as well as remembering the ones I liked and watching them again :D</p>
                    
                    <Link to="/photography"><h3>📷 Photography</h3></Link>
                    <p>I also like photography and do it as my hobby and side job. <Link to="/photography" style={{color: 'orange'}}>Here</Link> you can see some of the projects i've done, and if you are interested in a photography session, contact me ;)</p>
                    
                    <Link to="/certifications"><h3>📜 Certifications</h3></Link>
                    <p>A humble wall to show off my <Link to="/certifications" style={{color: 'orange'}}>trophies</Link> ;D</p>
                    
            </Layout>
    )
}

export default AboutPage