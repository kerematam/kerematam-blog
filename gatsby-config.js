/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    title: `My Personal Tech Blog`,
    author: {
      name: `Kerem Atam`,
      username: `kerematam`,
      summary: `Hi! I'am a developer based in Istanbul, TR. My current
      focus is on React, but I also have interests in DIY electronics and
      Blockchain Technologies.`,
    },
    description: `This is Kerem ATAM's personal blog`,
    siteUrl: `https://dev.kerematam.com`,
    social: {
      twitter: `https://twitter.com/kerematam`,
      github: `https://github.com/kerematam`,
      email: `mailto:kerematam@gmail.com`,
      linkedin: `https://www.linkedin.com/in/kerematam/`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-2E9P1JK875"],
        pluginConfig: { head: true },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allMarkdownRemark },
            }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url:
                    site.siteMetadata.siteUrl +
                    node.fields.slug,
                  guid:
                    site.siteMetadata.siteUrl +
                    node.fields.slug,
                  custom_elements: [
                    { "content:encoded": node.html },
                  ],
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Kerem Atam's Tech Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kerem Atam's Tech Blog`,
        short_name: `Gatsby`,
        start_url: `/`,
        background_color: `#232128`,
        theme_color: `#232128`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
