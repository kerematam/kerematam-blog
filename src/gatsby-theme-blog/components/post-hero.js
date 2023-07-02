import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
// import PostHeroCaption from "./post-hero-caption"
import { css } from "theme-ui"

const PostHero = ({ post }) => (
  <>
    {post?.image?.childImageSharp && (
      <>
        <GatsbyImage
        //   css={css({ pb: 100 })}
          imgStyle={{ paddingBottom: 24 }}
          image={getImage(post.image)}
          alt={post.imageAlt ? post.imageAlt : post.excerpt}
        />
        {/* <PostHeroCaption
          text={post.imageCaptionText}
          url={post.imageCaptionLink}
        /> */}
      </>
    )}
  </>
)

export default PostHero
