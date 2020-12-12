import React from "react"
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
        sort: { fields: modifiedTime, order: DESC }
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

  let total = 0

  let yearsTotal = []

  years.map(year => {
    books
      .filter(bookYear => bookYear.relativeDirectory.slice(13, 17) === year)
      .map(book => (total += 1))
    yearsTotal.push(total)
    total = 0
  })

  return (
    <div>
      <Head title="Books" />
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <h1
        className={booksStyles.bookTotal}
        style={{ color: "white", fontSize: "4vw" }}
      >
        <span role="img" aria-label="books">
          📚
        </span>{" "}
        {data.allFile.totalCount}{" "}
        <span role="img" aria-label="books">
          📚
        </span>
      </h1>
      {years.map((year, index) => (
        <div key={index}>
          <h1 className={booksStyles.bookTotal}>
            [ <span style={{ color: "white" }}>{year}</span> ]{" "}
            <span style={{ fontStyle: "italic", color: "white" }}>
              {yearsTotal[total]} Books
            </span>
          </h1>

          <div style={{ display: "none" }}>{(total += 1)}</div>
          <section className={booksStyles.photogrid}>
            {books
              .filter(
                bookYear => bookYear.relativeDirectory.slice(13, 17) === year
              )
              .map((book, index) => (
                <div key={index} className={booksStyles.image}>
                  <Img fluid={book.childImageSharp.fluid} alt={book.name}/>
                </div>
              ))}
          </section>
        </div>
      ))}
    </div>
  )
}

export default BooksPage
