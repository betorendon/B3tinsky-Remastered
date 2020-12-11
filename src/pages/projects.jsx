import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Navbar from "../components/navbar"
import Head from "../components/head"

import projectsStyles from "../styles/pages/projects.module.scss"

const ProjectsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/projects/" } }
        sort: { fields: frontmatter___date, order: DESC }
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
    }
  `)

  return (
    <div>
      <Navbar />
      <Head title="Projects" />
      <div className={projectsStyles.container}>
        <ol className={projectsStyles.posts}>
          <h1 className={projectsStyles.title}>Projects</h1>
          <hr />
          <section className={projectsStyles.projectgrid}>
            {data.allMarkdownRemark.edges.map((edge, index) => {
              return (
                <li key={index} className={projectsStyles.post}>
                  <Link to={`/projects/${edge.node.fields.slug}`}>
                    <h1 style={{ textAlign: "center" }}>
                      {edge.node.frontmatter.title}
                    </h1>

                    <Img
                      fluid={edge.node.frontmatter.cover.childImageSharp.fluid}
                      alt={edge.node.frontmatter.title}
                    />
                    <p>{edge.node.frontmatter.description}</p>
                    {/* <p>
                  {edge.node.frontmatter.date}{" "}
                  {edge.node.frontmatter.tags
                    ? edge.node.frontmatter.tags.map((tag, i) => {
                        return (
                          <span key={i} className={`tagPill-${tag}`}>
                            <Link to={`/tags/${tag.toLowerCase()}`}>
                            {tag}
                            </Link>
                          </span>
                        )
                      })
                    : null}
                </p> */}
                  </Link>
                </li>
              )
            })}
          </section>
        </ol>
      </div>
    </div>
  )
}

export default ProjectsPage
