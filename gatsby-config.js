module.exports = {
  // Customize your site metadata:
  siteMetadata: {
    title: `My Public Cheat Sheet`,
    author: `Kerem Atam`,
    description: `A tech blog by Kerem Atam`,
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/gatsbyjs`,
      },
      {
        name: `github`,
        url: `https://github.com/gatsbyjs`,
      },
    ],
    siteUrl: "http://blog.kerematam.com",
  },
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        prismPreset: `prism-okaidia`,
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
  ],
}
