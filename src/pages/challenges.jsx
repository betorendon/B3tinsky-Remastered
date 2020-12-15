import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import Head from "../components/head"
import { faBug } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import blogStyles from "../styles/pages/blog.module.scss"

const ChallengesPage = () => {
  const data = useStaticQuery(graphql`
  query {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/challenges/"}}, sort: { fields: frontmatter___date, order: DESC }) {
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
  }
  `)

  return (
    <Layout>
      <Head title="Challenges" />
      <h1 className={blogStyles.title} style={{textAlign:"center"}}>
        Challenges{" "}
        {/* <span style={{ float: "right" }} >
          {" "}
          <Link to="/tags">
          <p>
            <FontAwesomeIcon icon={faBug} transform="grow-5 up-5" />
          </p>
          </Link>
        </span> */}
      </h1>
      <ol className={blogStyles.posts}>
        {data.allMarkdownRemark.edges.map((edge, index) => {
          return (
            <li key={index} className={blogStyles.post}>
              <hr />
              <Link to={`/challenges/${edge.node.fields.slug}`}>
                <h2>{edge.node.frontmatter.title}</h2>
                <p>
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
                </p>
              </Link>
            </li>
          )
        })}
      </ol>
      <hr />
    </Layout>
  )
}

export default ChallengesPage
