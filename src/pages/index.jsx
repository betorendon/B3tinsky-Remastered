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
    "The honest and good man ought to be exactly like a man who smells strong, so that the bystander as soon as he comes near him must smell wheteher he choose or not - <b>Marcus Aurelius</b>",
    "Ad astra per aspera",
    "Learn how to live and you'll know how to die - <b>Morrie Schwartz</b>",
    "Ay mi madre el bicho - <b>Rodrigo Perez</b>",
    "Be tolerant with others and strict with yourself - <b>Marcus Aurelius</b>",
    "Accustom yourself not to be disregarding of what someone else has to say: as far as possible enter into the mind of the speaker - <b>Marcus Aurelius</b>",
    "Whatever time you choose is the right time. Not late, not early - <b>Marcus Aurelius</b>",
    "Frightened of change? But what can exist without it? What's closer to nature's heart? Can you take a hot bath and leave the firewood as it was? Eat food without transforming it? Can any vital process take place without something being changed? Can't you see? It's just the same with you, and just as vital to nature - <b>Marcus Aurelius</b>",
    "The universe is change, and life mere opinion - <b>Marcus Aurelius</b>",
    "Give your heart to the trade you have learnt, and draw refreshment from it - <b>Marcus Aurelius</b>",
    "To be like the rock that the waves keep crashing over. It stands unmoved and the raging of the sea falls still aroung it - <b>Marcus Aurelius</b>",
    "In everything that you do, pause and ask yourself if death is a dreadful thing because it deprives you of this - <b>Marcus Aurelius</b>",
    "A good man does not spy around for the black spots in others, but presses unswervingly on towards his mark - <b>Marcus Aurelius</b>",
    "Wealth consists not in having great possessions, but in having few wants - <b>Epictetus</b>",
    "Don't explain your philosophy. Embody it. - <b>Epictetus</b>",
    "Other people's views and troubles can be contagious. Don't sabotage yourself by unwittingly adopting negative, unproductive attitudes through your associations with others. - <b>Epictetus</b>",
    "Nature hath given men one tongue but two ears, that we may hear from others twice as much as we speak - <b>Epictetus</b>",
    "No man is free who is not master of himself - <b>Epictetus</b>",
    "The greater the difficulty, the more glory in surmounting it. Skillful pilots gain their reputation from storms and tempests - <b>Epictetus</b>",
    "No great thing is created suddenly - <b>Epictetus</b>",
    "It is unrealistic to expect people to see you as you see yourself - <b>Epictetus</b>",
    "There is no shame in making an honest effot - <b>Epictetus</b>",
    "The more we value things outside our control, the less control we have - <b>Epictetus</b>",
    "No one is ever unhappy because of someone else - <b>Epictetus</b>",
    "Tell yourself what you want to be, then act your part accordingly - <b>Epictetus</b>",
    "Let silence be your general rule; or say only what is necessary and in few words - <b>Epictetus</b>",
    "We should realize that an opinion is not easily formed unless a person says and hears the same things every day and practises them in real life - <b>Epictetus</b>",
    "Associate with people who are likely to improve you - <b>Lucius Annaeus Seneca</b>",
    "Wealth is the slave of a wise man. The master of a fool - <b>Lucius Annaeus Seneca</b>",
    "Fate leads the willing and drags along the reluctant - <b>Lucius Annaeus Seneca</b>",
    "The mind that is anxious about future events is miserable - <b>Lucius Annaeus Seneca</b>",
    "What man can you show me who places any value on his time, who reckons the worth of each day, who understands that he is dying daily? For we are mistaken when we look forward to death. The major portion of death has already passed. Whatever years be behind us are in death's hands - <b>Lucius Annaeus Seneca</b>",
    "It is of course better to know useless things than to know nothing - <b>Lucius Annaeus Seneca</b>",
    "It's not that we have little time, but more that we waste a good deal of it - <b>Lucius Annaeus Seneca</b>",
    "It is a great thing to know the season for speech and the season for silence - <b>Lucius Annaeus Seneca</b>",
    "There are more things, Lucilius, likely to frighten us than there are to crush us; we suffer more often in imagination than in reality - <b>Lucius Annaeus Seneca</b>",
    "So it is: we are not given a short life but we make it short, and we are not ill, supllied but wasteful of it - <b>Lucius Annaeus Seneca</b>",
    "All things that are still to come lie in uncertainty; live straightway! - <b>Lucius Annaeus Seneca</b>",
    "Envy of other people shows how they are unhappy. Their continual attention to others behavior shows how they are boring - <b>Lucius Annaeus Seneca</b>",
    "If you accomplish something good with hard work, the labor passes quicklym but the good endures; if you do something shameful in pursuit of pleasure, the pleasure passes quicklu, but the shame endures - <b>Gaius Musonius Rufus</b>",
    "That which exercises reason is more excellent than that which does not exercise reason; there is nothing more excellent than the universe, therefore the universe exercises reason - <b>Zeno of Citium</b>"
    

  ]
  phrases.sort(() => random() - 0.5);
  return (
    <div id="homeBackground">
      <Layout>
        <Head title="Home" />
        <div className={"typeWriterDiv"}>
        <Typewriter
          options={{loop: true, autoStart: true, strings: phrases, pauseFor: 5000, delay: 50, deleteSpeed: 10}}
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
