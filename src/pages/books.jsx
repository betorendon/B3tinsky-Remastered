import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Navbar from "../components/navbar"
import Head from "../components/head"
import booksStyles from "../styles/pages/books.module.scss"
// import Img from "gatsby-image"

const BooksPage = () => {
  // const [curr, setCurr] = useState(null)
  const data = useStaticQuery(graphql`
    query {
      allDirectory(filter: { relativeDirectory: { regex: "/images/books/" } }) {
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
  // let books = [];
  // {data.allFile.edges.map(({node})=>(
  //   books.push({
  //     year: node.relativeDirectory.slice(13, 17),
  //     title: node.name,
  //     cover: node.childImageSharp.fluid.originalImg
  //   })
  // ))}
  // console.log(books);
  return (
    <div>
      <Navbar />
      <Head title="Books" />
      <section className={booksStyles.photogrid}>
        {data.allFile.edges.map(({ node }) => (
          <div className={booksStyles.box}>
            <div className={booksStyles.imgBox}>
              <img
                src={node.childImageSharp.fluid.originalImg}
                alt={node.name}
              ></img>
            </div>
          </div>
        ))}
      </section>
      <br />
      <br />
      <br />
    </div>
  )
}

export default BooksPage
