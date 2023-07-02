/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Themed, css, Flex } from "theme-ui"
import BioContent from "./bio-content"
import github from "../../assets/github.png"
import linkedin from "../../assets/linkedin.png"
import gmail from "../../assets/gmail.png"
import twitter from "../../assets/twitter.png"


const Bio = () => {
  const data = useStaticQuery(bioQuery)
  const {
    site: {
      siteMetadata: { author },
    },
    avatar,
  } = data

  return (
    <Flex
      css={css({
        mb: 4,
        alignSelf: 'start'
        // alignItems: `center`,
      })}
    >
      <GatsbyImage
        image={avatar.childImageSharp.gatsbyImageData}
        alt={author}
        css={css({
          mr: 2,
          mb: 0,
          mt: 2,
          width: 128,
          minWidth: 128,
          borderRadius: 99999,
          transform: "scaleX(-1)"

        })}
      />
      <Themed.div css={css({ ml: 2 })}>
        <BioContent />
        <div>
          <span style={{ position: "relative", paddingLeft: "4px" }}>
            <Themed.a
              href={"https://github.com/kerematam"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt="github" />
            </Themed.a>
          </span>
          <span style={{ position: "relative", paddingLeft: "4px" }}>
            <Themed.a
              href={"https://www.linkedin.com/in/kerematam/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="linkedin" />
            </Themed.a>
          </span>
          <span
            style={{ position: "relative", top: "6px", paddingLeft: "4px" }}
          >
            <Themed.a
              href={"mailto:kerematam@gmail.com"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={gmail}
                alt="mail me"
              />
            </Themed.a>
          </span>
          <span
            style={{ position: "relative",  paddingLeft: "4px" }}
          >
            <Themed.a
              href={"https://twitter.com/kerematam"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={twitter}
                alt="twitter"
              />
            </Themed.a>
          </span>

        </div>
      </Themed.div>
    </Flex>
  )
}

const bioQuery = graphql`
  query BioQuery1 {
    site {
      siteMetadata {
        author
      }
    }
    avatar: file(absolutePath: { regex: "/avatar.(jpeg|jpg|gif|png)/" }) {
      childImageSharp {
        gatsbyImageData(width: 128, height: 128, layout: FIXED)
      }
    }
  }
`

export default Bio
