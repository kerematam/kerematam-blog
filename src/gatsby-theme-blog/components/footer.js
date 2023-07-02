import * as React from "react"
import { css } from "theme-ui"

const Footer = () => (
  <footer
    css={css({
      mt: 4,
      pt: 3,
    })}
  >
    ©{new Date().getFullYear()}
  </footer>
)

export default Footer