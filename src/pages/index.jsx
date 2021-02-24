import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Typewriter from "typewriter-effect"
import { random } from "lodash"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

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

  const phrases = [
    "Idle hands are the devil's workshop; idle lips are his mouthpiece - Proverbs 16:27-29",
    "Dwell on the beauty of life. Watch the stars, and see yourself running with them - <b>Marcus Aurelius</b>",
    "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth - <b>Marcus Aurelius</b>",
    "It is not death that a man should fear, but he should fear never beginning to live - <b>Marcus Aurelius</b>",
    "Whenever you are about to find fault with someone, ask yourself the following question: What fault of mine most nearly resembles the one I am about to criticize - <b>Marcus Aurelius</b>",
    "How much more grievous are the consequences of anger than the causes of it - <b>Marcus Aurelius</b>",
    "Live a good life. If there are gods and they are just, then they will not care how devout you have been, but will welcome you based on the virtues you have lived by. If there are gods, but unjust, then you should not want to worship them. If there are no gods, then you will be gone, but will have lived a noble life that will live on in the memories of your loved ones - <b>Marcus Aurelius</b>",
    "Though you break your heart, men will go on as before - <b>Marcus Aurelius</b>",
    "Nowhere can man find a quieter or more untroubled retreat than in his own soul - <b>Marcus Aurelius</b>",
    "The things you think about determine the quality of your mind - <b>Marcus Aurelius</b>",
    "Life is opinion - <b>Marcus Aurelius</b>",
    "The honest and good man ought to be exactly like a man who smells strong, so that the bystander as soon as he comes near him must smell wheteher he choose or not - <b>Marcus Aurelius</b>"

  ]
  phrases.sort(() => random() - 0.5);
  return (
    <div id="homeBackground">
      <Layout>
        <Head title="Home" />
        <div className={"typeWriterDiv"}>
        <Typewriter
          options={{loop: true, autoStart: true, strings: phrases, pauseFor: 5000, delay: 50, deleteSpeed: 20}}
          className={"typeWriterStyle"}
        />

        </div>
        <h3 className={"indexH3"}>Latest Blog Posts</h3>
        <div className={"indexCard"}>
          <ul>
            {data.articles.edges.map((edge, index) => {
              return (
                <li key={index}>
                  <Link to={`/blog/${edge.node.fields.slug}`}>
                    <p style={{ textAlign: "center" }}>
                      {edge.node.frontmatter.title}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <h3 className={"indexH3"}>Latest Project</h3>
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
                    <p style={{ textAlign: "center" }}>
                      {edge.node.frontmatter.title}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <h3 className={"indexH3"}>Latest Book Read</h3>
        <div style={{ padding: "0 25%" }}>
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
