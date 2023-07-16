---
title: Gatsby Hurted Me
date: 2023-06-30
image: ./cat-in-cemetery.png
imageAlt: A beach at sunset with crashing waves.
---

![A cozy image that is grabbed from Midjourney.](./cat-in-cemetery.png "asd")
<i style="display: flex;
    justify-content: flex-end;
    font-size: 12px;
    color: var(--theme-ui-colors-muted);">A cozy image that is grabbed from Midjourney. Coz, why not?</i>

This is my developer story with Gatsby (after I had used it few years before).

**Inb4 What is Gatsby?**  
Gatsby is a Static Site Generator (SSG) tool used to quickly develop SEO-optimized web pages. At least, that was what it was supposed to be for me. But my journey wasn't as fast as I had expected.

> **_CAVEAT:_**
> Even though I've used somewhat spicy language here and a clickbait title, Gatsby is still great! Apparently, my expectations were just too high for this tool. I would definitely recommend any beginner to senior React developers to create their static site with this. I've created this blog with Gatsby and I am not moving to any other platform as long as they keep Gatsby alive.

### Story Time

It's been approximately 13 years, if not more, since I started my blog on Blogger, under the good old `blogspot.com` subdomain. While it served its purpose well, it has become dated and no longer meets my needs. The time has come to transition to a better platform.

And so my story with Gatsby began!

#### The Qucik Start Tutorial is NOT that quick

I am not a total stranger to either React or Gatsby. The last thing I would want to do is start from scratch. I can't do much with a bare minimum Gatsby project. Once I started adding more features with additional packages, I fell into an endless loop of struggles with dependency problems related to Gatsby packages. Thankfully, I pass this stage quickly and went with themes.

Here is the [link to tutorial](https://www.gatsbyjs.com/docs/quick-start/) btw.

#### I've started with oudated theme with bugs

Gatsby's official documentation suggests you use an outdated [theme](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/) for creating a blog. For example, the latest version of Gatsby is on `5.11.0`, while the theme's peer dependency is on `^4.24.7` at the time of writing. I didn't make a huge fuss about it until I realized it had FOUC (Flash of Unstyled Content) and broken style issues on mobile browsers. You can check the issue [here](https://github.com/gatsbyjs/gatsby/issues/38339). Fixing these issues is not easy to investigate and resolve. In the end, you choose Gatsby to ship fast, not to solve its issues by the time you've started.

#### Switched to boilerplate

The previous problem cost me hours of work until I realized it. Well, red flags were everywhere, but I was too blind to see them. So, instead of going with `gatsby-theme-blog`, I cloned the Gatsby [Starter Blog Boilerplate](https://github.com/gatsbyjs/gatsby-starter-blog). It wasn't outdated, but it didn't have the MDX feature out of the box. This was even more painful as I had spent some time on styling the highlighting lines of the code snippet on previous themed approach.

## What was good?

- Throughout my development journey, one thing was consistently excellent - the deployment process was super easy and free!
- It's also important to note that despite the difficulties I faced, using Gatsby was still faster than other options within my knowledge scope. Building something similar from scratch would have taken significantly more time.
