import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Navbar from "../components/navbar"
import Head from "../components/head"
import certificationStyles from "../styles/pages/certifications.module.scss"
import Img from "gatsby-image"

const CertificationsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allDirectory(
        filter: { relativeDirectory: { regex: "/images/certifications/" } }
        sort: { fields: base, order: DESC }
      ) {
        edges {
          node {
            relativePath
            base
            name
          }
        }
      }
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(png)/" }
          relativeDirectory: {
            regex: "/(images/certifications)|(certifications)/"
          }
        }
        sort: { fields: base, order: ASC }
      ) {
        totalCount
        edges {
          node {
            base
            name
            relativeDirectory
            childImageSharp {
              fluid {
                sizes
                aspectRatio
                srcSet
                base64
                src
                originalImg
              }
            }
          }
        }
      }
    }
  `)

  let years = []

  data.allDirectory.edges.map(({ node }) => years.push(node.base))

  let books = []

  data.allFile.edges.map(({ node }) => books.push(node))

  return (
    <div>
      <Head title="Certifications" />
      <Navbar />
      <br />
      <br />
      <br />
      <br />

      <section className={certificationStyles.photogrid}>
        {books.map((book, index) => (
          <div key={index} className={certificationStyles.image}>
            <Img fluid={book.childImageSharp.fluid} alt={book.name} />
          </div>
        ))}
      </section>
    </div>
  )
}

export default CertificationsPage
