import React, { useCallback } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Navbar from "../components/navbar"
import Head from "../components/head"
import booksStyles from "../styles/pages/books.module.scss"
import Img from "gatsby-image"

const BooksPage = () => {
  // const [curr, setCurr] = useState(null)
  const data = useStaticQuery(graphql`
    query {
      allDirectory(
        filter: { relativeDirectory: { regex: "/images/books/" } }
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
          relativeDirectory: { regex: "/(images/books)|(books)/" }
        }
      ) {
        totalCount
        edges {
          node {
            base
            name
            relativeDirectory
            childImageSharp {
              fluid {
                originalImg
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

  let years = []
  {
    data.allDirectory.edges.map(({ node }) => years.push(node.base))
  }

  let books = []
  {
    data.allFile.edges.map(({ node }) => books.push(node))
  }

  let total = 0

  let yearsTotal = []
  {
    years.map(year => {
      books
        .filter(bookYear => bookYear.relativeDirectory.slice(13, 17) === year)
        .map(book => (total += 1))
      yearsTotal.push(total)
      total = 0
    })
  }

  return (
    <div>
      <Head title="Books" />
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <h1 className={booksStyles.bookTotal} style={{color:'white'}}>📚 Total ( {data.allFile.totalCount} )</h1>
      {years.map(year => (
        <div>
          <h1 className={booksStyles.bookTotal}>
            - {year} -
          </h1>
          <h1 className={booksStyles.bookTotal}>
            ( {yearsTotal[total]} Books )
          </h1>
          {(total += 1)}
          <section className={booksStyles.photogrid}>
            {books
              .filter(
                bookYear => bookYear.relativeDirectory.slice(13, 17) === year
              )
              .map(book => (
                <div className={booksStyles.box}>
                  <div className={booksStyles.imgBox}>
                    <img
                      src={book.childImageSharp.fluid.src}
                      alt={book.name}
                    ></img>
                    {/* <Img fluid={book.childImageSharp.fluid} /> */}
                  </div>
                </div>
              ))}
          </section>
        </div>
      ))}
    </div>
  )
}

export default BooksPage
