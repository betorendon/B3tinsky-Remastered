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
              fixed(width: 500, quality: 100) {
                ...GatsbyImageSharpFixed
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
        {data.allFile.edges.map(({ node }) => (
          <div className={photographyStyles.bg}>
            <Img
              fixed={node.childImageSharp.fixed}
              alt={node.name}
              objectFit="cover"
              objectPosition="50% 50%"
            />
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

export default PhotographyPage
