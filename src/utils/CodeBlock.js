import React from "react"
import Highlight, {
  defaultProps,
} from "prism-react-renderer"
import oceanicNext from "prism-react-renderer/themes/oceanicNext"
import "./CodeBlock.css"

function CodeBlock({ code, highlightedLines }) {
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language="jsx"
      theme={oceanicNext}
    >
      {({
        className,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre className={className} style={style} sx={{}}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i })

            return (
              <div
                {...lineProps}
                className={
                  highlightedLines.includes(i)
                    ? `gatsby-highlight-code-line`
                    : lineProps.className
                }
              >
                {line.map((token, key) => {
                  const tokenProps = getTokenProps({
                    token,
                    key,
                  })

                  return <span {...tokenProps} />
                })}
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}

export default CodeBlock
