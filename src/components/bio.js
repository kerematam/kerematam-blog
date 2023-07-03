/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const socialIconStyle = { marginRight: 4 }

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            linkedin
            github
            email
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/avatar.jpg"
        width={128}
        height={128}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <p>
          {author?.summary || null}
          {` `}
          <div style={{ display: "flex" }}>
            <a href={social.github} style={socialIconStyle}>
              <StaticImage
                layout="fixed"
                formats={["auto", "webp", "avif"]}
                src="../images/github.png"
                width={48}
                height={48}
                quality={95}
                alt="Github"
              />
            </a>
            <a href={social.linkedin} style={socialIconStyle}>
              <StaticImage
                layout="fixed"
                formats={["auto", "webp", "avif"]}
                src="../images/linkedin.png"
                width={48}
                height={48}
                quality={95}
                alt="Linkedin"
              />
            </a>
            <a href={social.twitter} style={socialIconStyle}>
              <StaticImage
                layout="fixed"
                formats={["auto", "webp", "avif"]}
                src="../images/twitter.png"
                width={48}
                height={48}
                quality={95}
                alt="Twitter"
              />
            </a>
            <a href={social.email} style={socialIconStyle}>
              <StaticImage
                layout="fixed"
                formats={["auto", "webp", "avif"]}
                src="../images/gmail.png"
                width={48}
                height={48}
                quality={95}
                alt="email"
              />
            </a>
          </div>
        </p>
      )}
    </div>
  )
}

export default Bio
