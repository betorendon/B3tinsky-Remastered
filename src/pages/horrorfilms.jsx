import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Head from "../components/head"
import Navbar from "../components/navbar"
import horrorStyles from "../styles/pages/horrorfilms.module.scss"

const HorrorFilmsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(png)/" }
          relativeDirectory: { regex: "/(images/horrorfilms)|(horrorfilms)/" }
        }
      ) {
        edges {
          node {
            base
            name
            relativeDirectory
            childImageSharp {
              fluid {
                originalImg
                base64
                src
                srcSet
                aspectRatio
                sizes
              }
            }
          }
        }
      }
    }
  `)
  return (
    <div>
      <Navbar />
      <Head title="Horror Films" />
      <section className={horrorStyles.photogrid}>
        {data.allFile.edges.map(({ node }, index) => (
          <div className={horrorStyles.box} key={index}>
            <div className={horrorStyles.imgBox}>
              <img src={node.childImageSharp.fluid.originalImg} alt={node.name}></img>
              <div className={horrorStyles.content}>
                <h3>{node.name.slice(0, node.name.length-7)}</h3>
                <a
                  href={`https://www.google.com/search?q=intext%3A${node.name}`}
                  className={
                    (horrorStyles.btn,
                    horrorStyles.btnDefault,
                    horrorStyles.btnD)
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Search
                </a>
              </div>
            </div>
          </div>
        ))}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </section>
    </div>
  )
}

export default HorrorFilmsPage
