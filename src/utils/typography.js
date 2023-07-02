import Typography from "typography"
import funstonTheme from "typography-theme-funston"

const typography = new Typography({
  ...funstonTheme,
  bodyColor: "white",
  headerColor: "white",
  baseFontSize: "16px",
  baseLineHeight: 1.4,
})

export default typography
