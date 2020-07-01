import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'

import blogStyles from '../styles/pages/blog.module.scss'

const BlogPage = () => {
  const data = useStaticQuery(graphql`
  
    query {
      allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "MMM, DD YYYY")
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
            <Head title="Blog" />
            <h1>Blog</h1>
            <ol className={blogStyles.posts}>
                {data.allMarkdownRemark.edges.map((edge)=>{
                    return (
                        <li className={blogStyles.post}>
                            <hr />
                            <Link to={`/blog/${edge.node.fields.slug}`}>
                            <h2>{edge.node.frontmatter.title}</h2>
                            <p>{edge.node.frontmatter.date}</p>
                            </Link>
                        </li>
                    )
                })}
            </ol>
            <hr />
            </Layout>
    )
}

export default BlogPage
