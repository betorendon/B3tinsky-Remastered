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
      allDirectory ( filter: {
                  relativeDirectory: {regex: "/images/books/"
              }
            }
          ){
      edges {
        node {
          relativePath
          base
          name
        }
      }
      },
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
  let books = [];
  {data.allFile.edges.map(({node})=>(
    books.push({
      year: node.relativeDirectory.slice(13, 17),
      title: node.name,
      cover: node.childImageSharp.fluid
    })
  ))}
    return (
            <Layout>
            <Head title="Books" />
            <h1>Books</h1>
            <div className={booksStyles.row}>
                <div className={booksStyles.listColumn} >
                    {data.allDirectory.edges.map(({node})=>(
                      <div>
                        <h3 style={{margin:0, direction: "ltr"}}>{node.name}</h3>
                        <div>
                          {data.allFile.edges.map(({node})=>(
                          (node.relativeDirectory.slice(13, 17) == '2019') && ( 
                          <p 
                          onMouseEnter={() =>  setCurr(node.childImageSharp.fluid)}
                          onMouseLeave={() =>  setCurr(null)}
                          style={{margin:0, direction: "ltr"}}
                          >
                          {node.name}
                          </p>
                          )
                          ))}
                        </div>
                      </div>
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
