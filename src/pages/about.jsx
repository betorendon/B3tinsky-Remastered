import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'
import Img from 'gatsby-image'
import AboutStyles from '../styles/pages/about.module.scss'

const AboutPage = () => {
    const data = useStaticQuery(graphql`
query {
    allFile(
      filter: {
        extension: { regex: "/(jpg)/" }
        relativeDirectory: { regex: "/(styles/Images)/" }
      }
    ) {
      edges {
        node {
          base
          name
          relativeDirectory
          childImageSharp {
            fluid {
              aspectRatio
              sizes
              originalImg
              base64
              src
              srcSet
            }
          }
        }
      }
    }
  }
`)
    return (
            <Layout>
                <Head title="About" />
                <br />
                <br />
                <br />
                <br />
                    {data.allFile.edges.map(({ node }, index) => (
                    <Img 
                      key={index}
                      fluid={node.childImageSharp.fluid} 
                      style={{
                          gridColumn: "4 / 5",
                          width: "100%",
                          borderRadius: "50%",
                          boxShadow:
                          `
                          0 0 0 5px white,
                          0 0 0 10px rgb(255, 115, 0),
                          0 0 0 15px black
                          `
                        }}
                      alt="TheBert"
                    />
                    ))}

                    <br />

                    <p>I'm a Computer Science student with an interest in software & web development. I love building things and learning new stuff.</p>
                    <p>The purpose of this website is documenting my learning in a public manner (kind of like a Feynman Technique) while also giving a small glimpse into my world.</p>
                    
                    <Link to="/books"><h3><span role="img" aria-label="book">📚</span> Books</h3></Link>
                    <p>I love reading and I've always wanted to have my own library, but being in the era of eBooks I don't think thats reasonable. So, I tried making a virtual library, while also keeping count of how many I've read, all in <Link to="/books" style={{color: 'orange'}}>this page</Link>.</p>
                    
                    
                    <Link to="/photography"><h3><span role="img" aria-label="camera">📷</span> Photography</h3></Link>
                    <p>I also like photography and do it as my hobby and side job. <Link to="/photography" style={{color: 'orange'}}>Here</Link> you can see some of the projects i've done, and if you are interested in a photography session, contact me ;)</p>
                    
                    <Link to="/certifications"><h3><span role="img" aria-label="scroll">📜</span> Certifications</h3></Link>
                    <p>A humble wall to show off my <Link to="/certifications" style={{color: 'orange'}}>trophies</Link> ;D</p>
                    
                    <Link to="/horrorfilms"><h3 className={AboutStyles.showMeTheRiddle}><span role="img" aria-label="knife">🔪</span> Horror Movie Stash <span role="img" aria-label="knife">🔪</span></h3></Link>
   
            </Layout>
    )
}

export default AboutPage