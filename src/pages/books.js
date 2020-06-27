import React, {useState} from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'
import booksStyles from '../styles/pages/books.module.scss'
import Img from 'gatsby-image'

const BooksPage = () => {
    const [curr, setCurr] = useState(null);
    const data = useStaticQuery(graphql`
    query {
      allFile( filter: {
                extension : {regex: "/(jpg)|(png)/"}
                relativeDirectory: {regex: "/images/books/"
              }
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
                base64
                sizes
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
            <Head title="Books" />
            <h1>Books</h1>
            <div className={booksStyles.row}>
                <div className={booksStyles.listColumn} >
                    {data.allFile.edges.map(({node})=>(
                        <p 
                        onMouseEnter={() =>  setCurr(node.childImageSharp.fluid)}
                        onMouseLeave={() =>  setCurr(null)}
                        style={{margin:0, direction: "ltr"}}
                        >
                          {node.relativeDirectory.slice(13, 17)} -                           {node.name}
                        </p>
                    ))}
                </div>

                <div className={booksStyles.imageColumn}>
                        {curr && ( 
                        <Img fluid={curr}/> 
                        )}
                </div>

            </div>




            </Layout>
    )
}

export default BooksPage
