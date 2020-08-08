import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Navbar from "../components/navbar"
import Head from "../components/head"
import photographyStyles from "../styles/pages/photography.module.scss"
import Img from "gatsby-image"

const PhotographyPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(png)/" }
          relativeDirectory: { regex: "/(images/photography)|(photography)/" }
        }
        sort: { fields: name, order: ASC }
      ) {
        edges {
          node {
            base
            name
            relativeDirectory
            childImageSharp {
              fluid {
                src
                srcSet
                base64
                originalImg
                sizes
                aspectRatio
              }
            }
          }
        }
      }
    }
  `)
  return (
    <div>
      <Head title="Photography" />
      <Navbar />
      <section className={photographyStyles.photogrid}>
        {data.allFile.edges.map(({ node }, index) => (

            <Img
              key={index}
              fluid={node.childImageSharp.fluid}
              alt={node.name}
            />
        ))}
      </section>
    </div>
  )
}

export default PhotographyPage
