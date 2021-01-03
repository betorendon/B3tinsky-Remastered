import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      articles: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/posts/" } }
        sort: { fields: frontmatter___date, order: DESC }
        limit: 3
      ) {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "MMM, DD YYYY")
              tags
            }
            fields {
              slug
            }
          }
        }
      }

      projects: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/projects/" } }
        sort: { fields: frontmatter___date, order: DESC }
        limit: 1
      ) {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "MMM, DD YYYY")
              tags
              cover {
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
              description
            }

            fields {
              slug
            }
          }
        }
      }

      books: allFile(
        filter: {
          extension: { regex: "/(jpg)|(png)/" }
          absolutePath: { regex: "/(images/books)|(books)/" }
        }
        sort: { fields: birthTime, order: DESC }
        limit: 1
      ) {
        edges {
          node {
            childImageSharp {
              fluid (maxWidth: 250, quality: 100) {
                sizes
                aspectRatio
                srcSet
                base64
                src
                originalImg
                ...GatsbyImageSharpFluid
                ...GatsbyImageSharpFluidLimitPresentationSize
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div id="homeBackground">
      <Layout>
        <Head title="Home" />
        <h3 className={"indexH3"}>Latest Articles</h3>
        <div className={"indexCard"}>
          <ul>
            {data.articles.edges.map((edge, index) => {
              return (
                <li key={index}>
                  <Link to={`/blog/${edge.node.fields.slug}`}>
                    <p style={{textAlign:"center"}}>{edge.node.frontmatter.title}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <h3 className={"indexH3"}>Last Project</h3>
        <div className={"indexCard"}>
          <ul>
            {data.projects.edges.map((edge, index) => {
              return (
                <li key={index}>
                  <Link to={`/projects/${edge.node.fields.slug}`}>
                    <Img
                      fluid={edge.node.frontmatter.cover.childImageSharp.fluid}
                      alt={edge.node.frontmatter.title}
                    />
                    <p style={{textAlign:"center"}}>{edge.node.frontmatter.title}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <h3 className={"indexH3"}>Last Book</h3>
        <div style={{padding:"0 30%"}} >
        {data.books.edges.map((edge, index) => {
              return (
                    <Img
                      fluid={edge.node.childImageSharp.fluid}
                      className={"indexCard"}
                    />
              )
            })}
        </div>
      </Layout>
    </div>
  )
}

export default IndexPage
